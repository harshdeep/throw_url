function update_status(msg) {
  var status = document.getElementById('status');
  status.innerHTML = msg;
}

function show_check_settings() {
  update_status(
    'Please check your <a href=options.html>settings</a>.'
  );
}

function throw_url() {
  chrome.tabs.getSelected(null, function(tab) {
    if (!/^http/.test(tab.url)) {
      update_status('We can only throw http or https urls');
      return;
    }
    var server = localStorage['server'];
    if (server == undefined) {
      show_check_settings();
    }
    var url = 'http://' + server + '/throw?url=' + encodeURIComponent(tab.url);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    var timeout = setTimeout(show_check_settings, 1000);
    req.onreadystatechange = function() {
      if (req.readyState == req.DONE) {
        if (req.status == 200) {
          clearTimeout(timeout);
          update_status("Threw URL " + tab.url);
        } else {
          show_check_settings();
        }
      }
    }
    req.send();
  });
}

document.addEventListener(
  'DOMContentLoaded',
  throw_url
);
