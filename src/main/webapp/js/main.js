// $(function () {

document.addEventListener('DOMContentLoaded', function () {
    let checkboxes = document.getElementsByName("r");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", function () {
            // checkboxes = document.getElementsByName("r");
            Array.prototype.forEach.call(checkboxes, function (e) {
                e.checked = false;
            });
            this.checked = true;
        });
        checkboxes[i].addEventListener("click", function () {
            let pointers = document.querySelectorAll("[name='pointer']");
            let curR = parseFloat(document.querySelector('input[type=checkbox][name=r]:checked').value);
            let initX;
            let initY;
            let moveX;
            let moveY;
            let initR;
            let hit;
            let size = document.getElementById("graph-svg").getBoundingClientRect().width;
            let snippet = (size - size / 6) / 2;
            for (let i = 0; i < pointers.length; i++) {
                initX = pointers[i].dataset.x;
                initY = pointers[i].dataset.y;
                initR = pointers[i].dataset.r;
                hit = pointers[i].dataset.hit;
                moveX = size / 2 + snippet * initX / Math.abs(curR);
                moveY = size / 2 - snippet * initY / Math.abs(curR);
                if (calculateHit(initX, initY, curR)) {
                    pointers[i].style.fill = "#A4CC84";
                } else pointers[i].style.fill = "#cca484";
                // $(pointers[i]).animate({
                //     cx: moveX,
                //     cy: moveY
                // }, {duration: 500, queue: false});
                pointers[i].setAttribute("cx", moveX);
                pointers[i].setAttribute("cy", moveY);
            }
        })
    }
    document.getElementById("send").addEventListener("click", function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
    document.getElementById("clean-button").addEventListener("click", function (event) {
        document.getElementById("c-id").value = true;
    });
    document.getElementById("graph-svg").addEventListener("click", function (event) {
        if (!validateR()) return;
        let size = document.getElementById("graph-svg").getBoundingClientRect().width;
        let snippet = (size - size / 12) / 2;
        let curR = document.querySelector('input[type=checkbox][name=r]:checked').value;
        let canvasX = (event.offsetX - snippet) / snippet * curR;
        let canvasY = (snippet - event.offsetY) / snippet * curR;
        document.getElementById("x-hid").value = parseFloat(canvasX);
        document.getElementById("y-hid").value = parseFloat(canvasY);
        document.getElementById("send").click();
    });
});
// document.onreadystatechange = function () {

// }

function calculateHit(x, y, r) {
    return calculateSectionOne(x, y, r) || calculateSectionTwo(x, y, r) || calculateSectionThree(x, y, r);
}

function calculateSectionOne(x, y, r) {
    return y >= 0 && x >= 0 && x <= r && Math.sqrt(x * x + y * y) <= r;
}

function calculateSectionTwo(x, y, r) {
    return y >= 0 && x <= 0 && Math.abs(x) <= r && y <= (parseFloat(x) + parseFloat(r)) && y <= r;
}

function calculateSectionThree(x, y, r) {
    return y <= 0 && x <= 0 && Math.abs(x) <= r && Math.abs(y) <= r;
}

function validateNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}

function validateX() {
    if (document.querySelector('input[name="x"]:checked') || document.getElementById("x-hid").value) {
        return true;
    } else {
        document.getElementById("error-info").innerHTML = "Select an X value!";
        return false;
    }
}

function validateY() {

    const Y_MIN = -3;
    const Y_MAX = 3;

    let y = document.getElementById("y").value.replace(',', '.');

    if (!y.isEmptyObject && validateNumber(y) && (y > Y_MIN) && (y < Y_MAX)) {
        return true;
    } else if (document.getElementById("y-hid").value && document.getElementById("y-hid").value > Y_MIN && document.getElementById("y-hid").value < Y_MAX) {
        return true;
    } else {
        document.getElementById("error-info").innerHTML = "Enter a valid Y value in the range from -3 to 3";
        return false;
    }
}

function validateR() {
    if (document.querySelectorAll('input[type="checkbox"]:checked').length == 1) {
        return true;
    } else {
        document.getElementById("error-info").innerHTML = "Select one R value!";
        return false;
    }
}

function validateForm() {
    return validateR() && validateX() && validateY();
}

// $(document).ready(function () {
//     $('input:checkbox').click(function () {
//         $('input:checkbox').not(this).prop('checked', false);
//     });
// });

// function killSwitch() {
//     $("div.cursor").replaceWith("<video id=\"player\" controls></video>");
//     player.src = "media/udied.mp4";
//     player.load();
//     player.play();
// }

// window.onload = function () {
//     let cursedCursorElms = document.getElementsByName("cursed");
//     for (var i = 0; i < cursedCursorElms.length; i++) {
//         cursedCursorElms[i].addEventListener("click", function (event) {
//             killSwitch();
//         })
//     }
// }


// $("#send").on("click", function (event) {
//     if (!validateForm()) {
//         event.preventDefault();
//     }
// });

// $("#clean-button").on("click", function (event) {
//     $("#c-id").val("true");
// });

// $("#graph-svg").on("click", function (event) {
//     if (!validateR()) return;
//     let size = document.getElementById("graph-svg").width;
//     let snippet = (size - size / 12) / 2;
//     let curR = $('input[type=checkbox][name=r]:checked').val();
//     let canvasX = (event.offsetX - snippet) / snippet * curR;
//     let canvasY = (snippet - event.offsetY) / snippet * curR;
//     $("#x-hid").val(canvasX);
//     $("#y-hid").val(canvasY);
//     $("#send").click();
// });

// $('input[type=checkbox][name=r]').change(function () {
//     let pointers = $("[name='pointer']");
//     let curR = parseFloat($('input[type=checkbox][name=r]:checked').val());
//     let initX;
//     let initY;
//     let moveX;
//     let moveY;
//     let initR;
//     let hit;
//     let size = document.getElementById("graph-svg").width;
//     let snippet = (size - size / 6) / 2;
//     for (let i = 0; i < pointers.length; i++) {
//         initX = pointers[i].dataset.x;
//         initY = pointers[i].dataset.y;
//         initR = pointers[i].dataset.r;
//         hit = pointers[i].dataset.hit;
//         moveX = size / 2 + snippet * initX / Math.abs(curR);
//         moveY = size / 2 - snippet * initY / Math.abs(curR);
//         if (calculateHit(initX, initY, curR)) {
//             pointers[i].style.fill = "#A4CC84";
//         } else pointers[i].style.fill = "#cca484";
//         $(pointers[i]).animate({
//             cx: moveX,
//             cy: moveY
//         }, {duration: 500, queue: false});
//     }
// });

// });