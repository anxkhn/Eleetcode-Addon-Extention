chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'loadProblems') {
    if (sender.tab.url === 'https://leetcode-importer.onrender.com/login') {
      fetch('https://leetcode.com/api/problems/all/')
      .then(response => response.text())
      .then(htmlContent => {
        fetch('https://leetcode-importer.onrender.com/login_with_extention', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ htmlContent: htmlContent })
        })
        .then(response => {
          console.log('HTML content sent to Flask backend');
          sendResponse({ success: true, response: response });
        })
        .catch(error => {
          console.error('Error sending HTML content to Flask backend:', error);
          sendResponse({ success: false, error: error });
        });
      })
      .catch(error => {
        console.error('Error fetching HTML content from leetcode.com:', error);
        sendResponse({ success: false, error: error });
      });
    } else {
      console.log('Button clicked on a different page');
    }
    return true;
  }
});
