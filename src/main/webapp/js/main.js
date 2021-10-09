$(function () {

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
        if ($("input[type='radio'][name='x']:checked").val() || $("#x-hid").val()) {
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
        } else if ($("#y-hid").val() && $("#y-hid").val() > Y_MIN && $("#y-hid").val() < Y_MAX) {
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

    $("#send").on("click", function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    $("#clean-button").on("click", function (event) {
        $("#c-id").val("true");
    });

    $("#graph-svg").on("click", function (event) {
        if (!validateR()) return;
        let curR = $('input[type=checkbox][name=r]:checked').val();
        let canvasX = (event.offsetX - 165) / 165 * curR;
        let canvasY = (165 - event.offsetY) / 165 * curR;
        $("#x-hid").val(canvasX);
        $("#y-hid").val(canvasY);
        $("#send").click();
    });

    $('input[type=checkbox][name=r]').change(function () {
        let pointers = $("[name='pointer']");
        let curR = $('input[type=checkbox][name=r]:checked').val();
        let initX;
        let initY;
        let moveX;
        let moveY;
        for (let i = 0; i < pointers.length; i++) {
            initX = pointers[i].dataset.x;
            initY = pointers[i].dataset.y;
            moveX = 180 + 150 * initX / Math.abs(curR);
            moveY = 180 - 150 * initY / Math.abs(curR);
            $(pointers[i]).animate({
                cx: moveX,
                cy: moveY
            }, {duration: 500, queue: false});
        }
    });

});