function btnPostClicked() {
    var content = $("#txtPostContent").text();
    var author = $("#txtUsername").val();
    var attachedFile = $("#inputFile");
    var generatedId;

    if (content == "") {
        $("#lblPostResult").text("Write something first!");
        $("#lblPostResult").addClass("w3-animate-zoom");
        return;
    }

    var formData = new FormData();

    if (content == "") {
        $("#lblPostResult").text("Write something first!");
        return;
    }

    if (author == "") { author = "Unknown"; }

    var files = attachedFile[0].files;

    if (files.length > 0) {
        for (var x = 0; x < files.length; x++) {
            formData.append("file" + x, files[x]);
        }
    }

    formData.append("content", content);
    formData.append("author", author);

    $.ajax({
        url: '/Posts/CreateService',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            btnPostClicked_Success(result);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}


function btnPostClicked_Success(generatedId) {
    $("#txtPostContent").text("");

    if (generatedId == 0) { return; }

    $.ajax({
        url: '/Posts/Details_Partial',
        type: 'GET',
        dataType: 'json',
        // we set cache: false because GET requests are often cached by browsers
        // IE is particularly aggressive in that respect
        cache: false,
        data: {
            PostId: generatedId
        },
        success: function (view) {
            $("#txtPostContent").text("sucess");
        },
        error: function (xhr, status, error) {
            //alert(xhr.responseText);
            $("#postsContainer").prepend(xhr.responseText);
            $("#lblPostResult").text("");
            $("#imgToAttach").css({ visibility: "hidden" });
            $("#inputFile").val("");
            $("#imgToAttach").removeAttr('src').replaceWith($("#imgToAttach").clone());
        }
    });
}

function btnLikeClicked(context, postId) {

    $.ajax({
        url: '/Posts/LikePost',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: { PostId: postId },
        success: function (result) {
            btnLikeClicked_Success(context, result);
        },
        error: function (xhr, status, error) {
            btnLikeClicked_Fail(xhr, status, error);
        }
    });

}

function btnLikeClicked_Success(context, result) {
    context.lastChild.textContent = " Like +" + result;
}

function btnLikeClicked_Fail(xhr, status, error) {
    alert(xhr.responseText);
}