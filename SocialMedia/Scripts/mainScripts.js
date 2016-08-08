$(document).ready(function () {
    $("#btnPost").click(function () {
        btnPostClicked();
    });

    //$(".likeButton").click(function () {
    //    btnLikeClicked(this);
    //})

    // $("#inputFile").change(function () {
    //     previewAttachedFile(this);
    // });

    checkCookie();

    $("#txtUsername").change(function () {
        setCookie("username", $("#txtUsername").val(), 365);
    })

    //$(".TxtCommentInput").keydown(function (e) {
    //    if (e.keyCode == 13) {
    //        SubmitComment(this, e);
    //    } 
    //})

    accordionClick('accordionMyPhotos');
    
});


function displayImageModal(element) {
    $("#imageModal").attr("src", element.src);
    $("#imagesModal").css({display: "block"});
}

function previewAttachedFile(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgToAttach').css({ visibility: "visible" });
            $('#imgToAttach').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        $("#txtUsername").val(user);
    } 
}

function detectEnterComment(event, context) {
    if (event.keyCode == 13) {
        SubmitComment(context);
    }
}


