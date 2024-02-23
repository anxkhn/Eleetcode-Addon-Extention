console.log("Content script loaded");

var loadButton = document.getElementById('load');

if (loadButton) {
  loadButton.addEventListener('click', function() {
    console.log("Clicked");
    chrome.runtime.sendMessage({ action: 'loadProblems' }, function(response) {
      console.log('Message sent to background script');
      if (response && response.success) {
        console.log('Problems successfully loaded:', response);
        window.location.href = 'http://127.0.0.1:5000/profile';
      } else {
        console.log('Problems failed to load:', response.error);
      }
    });
  });
}
