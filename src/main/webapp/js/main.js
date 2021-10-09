$(function () {

    let canvas = $("#graph-canvas");
    let maxCanvasFill = 5;
    let currentCanvasFill = 0;

    $(document).ready(function () {
        $('input:checkbox').click(function () {
            $('input:checkbox').not(this).prop('checked', false);
        });
    });

    function killSwitch() {
        $("div.cursor").replaceWith("<video id=\"player\" controls></video>");
        player.src = "media/udied.mp4";
        player.load();
        player.play();
    }

    window.onload = function () {
        let cursedCursorElms = document.getElementsByName("cursed");
        for (var i = 0; i < cursedCursorElms.length; i++) {
            cursedCursorElms[i].addEventListener("click", function (event) {
                killSwitch();
            })
        }
    }

    function validateNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
    }

    function validateX() {
        if ($("input[type='radio'][name='x']:checked").val()) {
            return true;
        } else {
            $("#error-info").text("Select an X value!")
            return false;
        }
    }

    function validateY() {

        const Y_MIN = -3;
        const Y_MAX = 3;

        let y = $('#y').val().replace(',', '.');

        if (!y.isEmptyObject && validateNumber(y) && (y > Y_MIN) && (y < Y_MAX)) {
            return true;
        } else {
            $("#error-info").text("Enter a valid Y value in the range from -3 to 3")
            return false;
        }
    }

    function validateR() {
        if ($('input[type="checkbox"]:checked').length == 1) {
            return true;
        } else {
            $("#error-info").text("Select one R value!")
            return false;
        }
    }

    function validateForm() {
        return validateR() && validateX() && validateY();
    }

    function clearCanvas() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    function paintPoint(x, y) {
        let context = canvas.getContext('2d');
        if (currentCanvasFill > maxCanvasFill)
            clearCanvas();
        context.globalAlpha = 0.85;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI*2);
        context.fillStyle = "#cca484";
        context.strokeStyle = "#5b504f";
    }

    $("#send").on("click", function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    $("#clean-button").on("click", function (event) {
        $("#c-id").val("true");
    });

    canvas.on("click", function (event) {
        if (!validateR()) return;

    });
});