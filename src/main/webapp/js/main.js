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
        drawPoint(100, 100);
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

    // function clearCanvas() {
    //     canvas[0].getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // }

    // function paintPoint(x, y) {
    //     let context = canvas[0].getContext('2d');
    //     if (currentCanvasFill > maxCanvasFill)
    //         clearCanvas();
    //     context.globalAlpha = 0.85;
    //     context.beginPath();
    //     context.arc(x, y, 10, 0, Math.PI*2);
    //     context.fillStyle = "#cca484";
    //     context.strokeStyle = "#5b504f";
    //     currentCanvasFill += 1;
    // }

    // function computeMovement(x, coef, r) {
    //     return 180 + coef * x * 150 / Math.abs(r);
    // }

    // function drawPoint(x,y) {
    //     let cloned = $("#pointer")[0].cloneNode(true);
    //     cloned.opacity = 1;
    //     $("#graph-svg")[0].appendChild(cloned);
    //     cloned.animate({
    //         cx: 180 + x,
    //         cy: 180 + y
    //     }, 2000);
    // }

    $("#send").on("click", function (event) {
        if (!validateForm()) {
            alert("INvalid!")
            event.preventDefault();
        } else {
            // let x = $("input[type='radio'][name='x']:checked").val();
            // let y = $('#y').val().replace(',', '.');
            // let r = $('input[type="checkbox"]:checked').val();
            // drawPoint(computeMovement(x, 1, r), computeMovement(y, -1, r));
        }
    });

    $("#clean-button").on("click", function (event) {
        $("#c-id").val("true");
    });

    $('input[type=checkbox][name=r]').change(function () {
        let pointers = document.getElementsByName("pointer");
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
            alert(moveX);
            alert(moveY);
            pointers[i].setAttribute("cx", moveX);
            pointers[i].setAttribute("cy", moveY);
            // initR = pointers[i].dataset.r;
            // pointers[i].animate({
            //     cx: 180 + moveX,
            //     cy: 180 - moveY
            // }, {duration: 500, queue: false});
        }
    });

});