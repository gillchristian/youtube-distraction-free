const clearYoutube = ({ id, url }) => {
  const isYouTube = url && url.includes("youtube.com/watch");

  if (isYouTube) {
    chrome.tabs.executeScript(id, { file: "inject.js" });
  }
};

// https://developer.chrome.com/extensions/browserAction#event-onClicked
// tabsTab :: { id :: Maybe Int }
// callback :: tabs.Tab -> Void
chrome.browserAction.onClicked.addListener(({ id }) =>
  chrome.tabs.get(id, clearYoutube)
);

// https://developer.chrome.com/extensions/tabs#event-onActivated
// callback :: { tabId :: Int } -> Void
chrome.tabs.onActivated.addListener(({ tabId }) =>
  chrome.tabs.get(tabId, clearYoutube)
);
