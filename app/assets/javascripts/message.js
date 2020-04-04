$(function () {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";

    var html = `
      <div class="message" data-id = ${message.id}>
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
});