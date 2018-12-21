// Set up an event listener for runtime messages
listenForMessage((message, sender) => {
  switch (message.greeting) {
    case 'SET_BADGE_TEXT':
      console.log('message from content.js:', message);
      chrome.browserAction.setBadgeText({ text: message.text });
      return { greeting: 'BADGE_TEXT_WAS_SET' };
    case 'REMOVE_BADGE':
      chrome.browserAction.setBadgeText({ text: ''});
      return { greeting: 'BADGE_TEXT_WAS_REMOVED' };
    default: // do nothing
  }
});

chrome.tabs.onActivated.addListener(activeInfo => { //Fired when an active tab is changed
    chrome.tabs.query({'active':true,'currentWindow':true},function(tabs){//Gives details of the active tab in the current window.
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "Recheck"
      }, function(response){});
    })
});
