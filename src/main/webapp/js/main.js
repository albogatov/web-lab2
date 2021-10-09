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
        // let cleaner = document.getElementById("clean");
        // cleaner.addEventListener("click", function (event) {
        //     $('#result-table tr').slice(1).remove();
        // })
        // let formReset = document.getElementById("res");
        // formReset.addEventListener("click", function (event) {
        //     $('#y-field').removeClass("text-error");
        //     $('#x-field').removeClass("text-error");
        //     $('#r-field').removeClass("text-error");
        //     $('#pointer').animate({
        //         cx: 180,
        //         cy: 180
        //     }, 2000);
        // })
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
// $(document).ready(function () {
//     $.ajax({
//         url: "php/restoration.php",
//         async: true,
//         type: "GET",
//         success: function (response) {
//             let table = document.getElementById("result-table");
//             table.insertAdjacentHTML('beforeend', response);
//         }
//     })
// })

// $(document).ready(function () {
//     $('#clean').on('click', function (e) {
//         e.preventDefault();
//         console.log("here")
//         $.ajax({
//             url: "php/erase.php",
//             async: true,
//             type: "GET",
//             data: {},
//             cache: false,
//             success: function (response) {
//                 $('#result-table tr').slice(1).remove();
//             },
//             error: function (xhr) {
//
//             }
//         });
//     })
// })

// $("#input-form").on("submit", function (event) {
//     event.preventDefault();
//     if (!validateForm()) {
//         // alert("Incorrect");
//         return;
//     }
// //            let x = $('input[name=x]:checked', '#myForm').val();
// //            let y = $('#y').val();
// //			let r = $('input[name="r"]:checked').val();
//     $.ajax({
//         url: "php/main.php",
//         type: "post",
//         async: true,
//         data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
//         dataType: "json",
//         cache: false,
//         success: function (data) {
//             let moveX;
//             let moveY;
//             let snippet;
//             response = JSON.parse(data);
//             if (response.valid) {
//                 snippet = 150 / response.rvalue;
//                 moveX = response.xvalue * snippet * response.rvalue / Math.abs(response.rvalue);
//                 moveY = -1 * response.yvalue * snippet * response.rvalue / Math.abs(response.rvalue);
//                 nextRow = "<tr>";
//                 nextRow += "<td>" + response.xvalue + "</td>";
//                 nextRow += "<td>" + response.yvalue + "</td>";
//                 nextRow += "<td>" + response.rvalue + "</td>";
//                 nextRow += "<td>" + response.currenttime + "</td>";
//                 nextRow += "<td>" + response.executiontime + "</td>";
//                 nextRow += "<td>" + response.hit + "</td>";
//                 nextRow += "</tr>";
//                 $("#result-table").append(nextRow);
//                 $('#pointer').animate({
//                     cx: 180 + moveX,
//                     cy: 180 + moveY
//                 }, 2000);
//             } else alert("Unexpected error has occured");
//         },
//         error: function (jqXHR, exception) {
//             let msg = '';
//             if (jqXHR.status === 0) {
//                 msg = 'Not connect.\n Verify Network.';
//             } else if (jqXHR.status == 404) {
//                 msg = 'Requested page not found. [404]';
//             } else if (jqXHR.status == 500) {
//                 msg = 'Internal Server Error [500].';
//             } else if (exception === 'parsererror') {
//                 msg = 'Requested JSON parse failed.';
//             } else if (exception === 'timeout') {
//                 msg = 'Time out error.';
//             } else if (exception === 'abort') {
//                 msg = 'Ajax request aborted.';
//             } else {
//                 msg = 'Uncaught Error.\n' + jqXHR.responseText;
//             }
//             console.log(msg);
//         }
//     });
// })
});