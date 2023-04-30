{

    let createComments = function () {
        let newCommentForm = $('.post-comments-form');
        newCommentForm.each(function (idx, e) {
            createComment($(e));
        })
    }
    let createComment = function (newCommentForm) {

        newCommentForm.submit(function (e) {
            e.preventDefault();
            let post_id = $('input[name="post"]', newCommentForm).val();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function (data) {
                    new Noty({
                        theme: 'relax',
                        text: "Comment Added",
                        type: "success",
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${post_id}`).append(newComment);
                    deleteComment($  (' .delete-comment-button', newComment));
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create Comment in DOM
    function newCommentDom(comment) {
        return $(`
            <li id="comment-${comment._id}">
                <p>
                    <small>
                        <a class = "delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                    </small>
                    ${comment.content}
                    <br>
                    <small>
                        ${comment.user.name}
                    </small>
                </p>
            </li>
        `);
    }

    // method to delete a post
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: "success",
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    console.log("---------");
                    console.log(data.data);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    function addDeleteToAll() {
        $(' .delete-post-button', '#posts-list-container>ul>li').map(function () {
            deletePost(this);
        });
    }
    createComments();
    addDeleteToAll();
}