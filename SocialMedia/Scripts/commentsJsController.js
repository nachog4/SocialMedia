function btnCommentClicked(id) {
    if ($("#CommentsSection" + id).css("display") == "none") {
        $("#CommentsSection" + id).css({ display: "block" });
    } else {
        $("#CommentsSection" + id).css({ display: "none" });
    }
}

function SubmitComment(context) {
    var extractedPostId = context.id.replace("txtComment", "");

    var formData = new FormData();

    //getCookie("username")
    var author = $("#txtUsername").val();
    if (author == "") { author = "Unknown"; }

    formData.append("PostId", extractedPostId);
    formData.append("content", context.value);
    formData.append("author", author);

    $.ajax({
        url: '/Comments/CreateService',
        type: 'POST',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
            SubmitComment_Success(extractedPostId, result)
        },
        error: function (xhr, status, error) {
            SubmitComment_Fail(xhr, status, error);
        }
    });
}

function SubmitComment_Success(postId, result) {

    $.ajax({
        url: '/Comments/Details_Partial',
        type: 'GET',
        dataType: 'json',
        cache: false,
        data: {
            CommentId: result
        },
        success: function (view) {
            $("#txtPostContent").text("sucess");
        },
        error: function (xhr, status, error) {
            //alert(xhr.responseText);
            $("#PreviousCommentsSection" + postId).prepend(xhr.responseText);
            $("#txtComment" + postId).text("");
        }
    });

    $("#txtComment" + postId).val("");
}

function SubmitComment_Fail(xhr, status, error) {
    alert(xhr.responseText);
}
