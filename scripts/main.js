chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      //console.log("Hello. This message was sent from scripts/main.js");

      patterns = ['OULD OF ', 'OULDN\'T OF '];
      max_pattern_length = 11;
      var entered_string = '';

      function trim_string_to_length() {
        if (entered_string.length > max_pattern_length) {
          length_diff = entered_string.length - max_pattern_length;
          entered_string = entered_string.substr(length_diff);
        }
      }

      function add_character(event) {
        key_char = String.fromCharCode(event.charCode).toUpperCase();
        //console.log(key_char);
        entered_string += key_char;
        trim_string_to_length();
        //console.log(entered_string);
      }

      function remove_character(event) {
        if (entered_string.length > 0) {
          entered_string = entered_string.substr(0, entered_string.length - 1);
          trim_string_to_length();
        }
        //console.log(entered_string);
      }

      function check_patterns() {
        for (var i = 0, size = patterns.length; i < size; i++) {
          var pattern = patterns[i];
          if (entered_string.indexOf(pattern) > -1) {
            console.log('Found pattern: ' + pattern);
            setTimeout(function(){alert('No! "HAVE" not "OF"! Damnit!')}, 500);
            entered_string = '';
            return false;
          }
        }
        return true;
      }

      $('input').keypress(function (event) {
            add_character(event);
            return check_patterns();
          }
      );

      $('textarea').keypress(function (event) {
            add_character(event);
            return check_patterns();
          }
      );

      $(document).keyup(function (event) {
            if (event.keyCode == 8) {
              //console.log('backspace trapped');
              remove_character(event)
              return check_patterns();
            }
          }
      );

      // ----------------------------------------------------------

    }
  }, 10);
});
