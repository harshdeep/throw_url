function save_options() {
  var server = document.getElementById('server').value;
  localStorage['server'] = server;

  var status = document.getElementById('status');
  status.innerHTML = 'Options saved';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

function restore_options() {
  var server = localStorage['server'];
  if (server == undefined) {
    return;
  }
  document.getElementById('server').value = server;
}

document.addEventListener(
  'DOMContentLoaded',
  function() {
    restore_options();
    document.querySelector('button').addEventListener(
      'click',
      save_options
    )
  }
);
