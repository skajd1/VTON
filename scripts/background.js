chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.src) {
    chrome.runtime.sendMessage({ src: message.src });
  }
});
