$(function () {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";

    var html = `
      <div class="message" data-message-id = ${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${content}
          </p>
        </div>  
          ${image}
      </div>`
    return html;
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('form')[0].reset();
        var height = $('.messages')[0].scrollHeight;
        $('.messages').animate({ scrollTop: height }, 500, 'swing');
      })
      .fail(function () {
        alert('メッセージ送信に失敗しました');
      })
    return false;
  });

  var reloadMessages = function () {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");

      var group_id = $('.main-header__left-box__current-group').data('group_id')
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'get',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          if (messages.length !== 0) {
            var insertHTML = '';
            $.each(messages, function (i, message) {
              insertHTML += buildHTML(message)
            })
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
          }
        })
        .fail(function () {
          alert('error');
        });
    };
  }
  setInterval(reloadMessages, 7000);


});





