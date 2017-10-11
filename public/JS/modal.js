function updateModal(index) {
    $("#dynamiqueUserNameBabble").html(timeline[index].user_name);
    $("#dynamiqueContent").html(timeline[index].babble);
    $("#dynamiqueTime").html(moments[index]);
    $("#dynamiqueUserPic").attr("src", timeline[index].user_id.picProfile);
    $("#dynamiqueReply").attr("src", timeline[index].reply.length);
    $("#dynamiqueLike").attr("src", timeline[index].like.length);
    $("#parent-modal").val(timeline[index]._id);

    const currentReplies = timeline[index].reply;
    currentReplies.forEach(createReplyHtml)
}


function createReplyHtml(reply) {
    console.log("reply", reply);
    console.log(reply.length);




    $('#babbleModal').before(`
<div id="modalSecondParent" class="tweets card-content p-x-1">
  <article id ="modalThirdParent" class="media tweet">
      <figure class="media-left">
          <p class="image is-64x64 is-circle">
              <a href="" class=""><img id="dynamiqueReplyUserPic" src="" alt="picture"></a>
          </p>
      </figure>
      <div class="media-content">
          <div class="content">
              <p class="tweet-meta">
                  <a href="" class="has-text-dark">
                      <strong id="dynamiqueReplyUserNameBabble">${reply.user_name}</strong></a>
                  <small id="dynamiqueReplyTime" class="media-right has-text-grey-light"></small>
              </p>
              <p id="dynamiqueReplyContent" class="tweet-body has-text-grey">
                ${reply.babble}
              </p>
          </div>
          <nav class="media-right">
              <div class="level-right">
                  <a class="level-item has-text-grey-light">
                      <span class="icon is-small"><i class="fa fa-reply modal-button" data-target="#modal"></i></span>
                      <small id="dynamiqueReplyReply"> </small>
                  </a>
                  <a class="level-item has-text-grey-light">
                      <span class="icon is-small"><i class="fa fa-thumbs-o-up"></i></span>
                      <small id="dynamiqueReplyLike">110000</small></a>
          </nav>
          </div>
  </article>
  </div>
</div>`)




    // $("#dynamiqueReplyUserNameBabble").html(reply.user_name);
    // $("#dynamiqueReplyContent").html(reply.babble);
    //$("#dynamiqueReplyTime").html(moments[index]);
    //$("#dynamiqueReplyUserPic").attr("src", reply.user_name.user_id.picProfile);
    //$("#dynamiqueReplyReply").attr("src", reply.reply.length);
    // $("#dynamiqueReplyLike").attr("src", reply.like.length);



}





// modal BUTTON
$(".modal-button").click(function() {
    let current = $(this).attr("id");
    updateModal(current);
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this)
        .parent()
        .removeClass("is-active");
});

$(".modal-background").click(function() {
    $("html").removeClass("is-clipped");
    $(this)
        .parent()
        .removeClass("is-active");
});


function submitform() {
    document.thumb.submit();
}