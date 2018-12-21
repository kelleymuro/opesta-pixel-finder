
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

// Message to send
const message = { greeting: 'SET_BADGE_TEXT', text: '1' };

// Click event handler
const handleClick = event => {
  // sendMessage returns a Promise,
  // so you can optionally use "then"
  // to handle the response
  sendMessage(message).then(message => {
    // Log the greeting sent back from background.js
    console.log('message from background.js:', message);
  });
};


const bad_message = { greeting: 'REMOVE_BADGE'};

// Click event handler
const handleNoPixel = event => {
  // sendMessage returns a Promise,
  // so you can optionally use "then"
  // to handle the response
  sendMessage(bad_message).then(message => {
    // Log the greeting sent back from background.js
    console.log('message from background.js:', message);
  });
};

// Create a simple button to send message
var opesta = document.getElementById('opesta-sdk');
if (opesta) {
  window.onload = handleClick;
} else {
  window.onload = handleNoPixel;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch( request.action) {
    case "Recheck" :
      // Create a simple button to send message
      var opesta = document.getElementById('opesta-sdk');
      console.log(opesta);

      if (opesta) {
        handleClick();
      } else {
        handleNoPixel();
        console.log('No pixel');
      }

      sendResponse({});
      break;
  }
})

// const button = document.createElement('button');
// button.innerText = 'Set Badge Text';
// button.onclick = handleClick;
// document.body.append(button);
