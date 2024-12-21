document.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    chrome.runtime.sendMessage({ src: event.target.src });
  }
});
