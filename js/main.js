(function (window, $) {
  // List of locales that use right-to-left text direction
  var rtlLocales = ['ar'];

  // These are app-specific: template and selector for the main element that
  // contains the application list.
  var msgTemplate = [
    '<li class="messageNEW" dir="DIR">',
    '<p class="date">DATE</p>',
    '<p class="text">TEXT</p>',
    '</li>'
  ].join('');
  var emptyMsg = '<li class="message">No messages</li>';
  var messages = $('.messages');

  // We need the current locale (language). We can either parse the URL (the
  // locale is always the first segment of the path) or we can use Librarian's
  // lang API.
  var locale = $.librarian.lang.getLocale();
  
  // We need to get the URL of the message data. We use Librarian's files API
  // for that. The assumption is that the `messages/messages.json` file can be 
  // found in the root of the pure file broadcast directory. You can find an
  // example of the message data structure in the `example` folder in the
  // source code for this app.
  var msgsUrl = $.librarian.files.url('messages/messages.json');

  // Execute the AJAX request to fetch the messages and perform appropriate
  // operation depending on the response.
  var xhr = $.getJSON(msgsUrl);
  xhr.done(parse);
  xhr.fail(fail);

  /**
   * Get the timestamp of last check
   */
  function getLastCheck() {
    var ts = window.localStorage['messagesTS'];
    if (!ts) {
      return new Date(0);
    }
    return new Date(parseInt(ts, 10));
  }

  function setLastCheck() {
    window.localStorage['messagesTS'] = (new Date()).getTime();
  }
  
  /**
   * Parse the provided message data, and render the HTML.
   */
  function parse(data) {
    var i = 0;
    var l = data.length;
    var html = '';
    var lastCheck = getLastCheck();
    
    if (!l) {
      messages.html(emptyMsg);
      return;
    }
    
    for (; i < l; i++) {
      var message = data[i];
      if (message.lang && message.lang != locale) {
        // Ignore messages that have the locale that doesn't match the current
        // one.
        continue;
      }
      message.is_new = lastCheck < parseDate(message).getTime()
      html += renderMessage(message);
    }

    messages.html(html);
    setLastCheck();
  }

  function fail() {
    messages.html(emptyMsg);
  }

  /**
   * Convert the given message object to HTML.
   */
  function renderMessage(message) {
    return msgTemplate
      .replace('NEW', message.is_new ? ' new' : '')
      .replace('DIR', (rtlLocales[message.lang] || 'ltr'))
      .replace('DATE', formatDate(message))
      .replace('TEXT', escape(message.text));
  }

  /**
   * Givem message object, parse the date and return `Date` object
   */
  function parseDate(message) {
    return new Date(Date.parse(message.added));
  }
  
  /**
   * Given message object, parse the date and return formatted timestamp
   */
  function formatDate(message) {
    var date = parseDate(message);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var mins = date.getMinutes();
    return [year, month, day].join('-') + ' ' + [hours, mins].join(':');
  }

  /**
   * Escape HTML characters
   */
  function escape(s) {
    return s
      .replace(/>/g, '&gt;')
      .replace(/</g, '&lt;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/&/g, '&amp;');
  }

}(this, jQuery));
