const clearYoutube = ({ id, url }) => {
  const isYouTube = url && url.includes("youtube.com/watch");

  if (isYouTube) {
    chrome.tabs.executeScript(id, { file: "src/inject.js" });
  }
};

const setIcon = enabled => () =>
  chrome.browserAction.setIcon({
    path: enabled ? "assets/enabled.png" : "assets/disabled.png"
  });

chrome.browserAction.onClicked.addListener(() =>
  chrome.storage.local.get(["enabled"], ({ enabled }) =>
    chrome.storage.local.set({ enabled: !enabled }, setIcon(!enabled))
  )
);

// https://developer.chrome.com/extensions/tabs#event-onUpdated
// callback :: (Int, { status :: 'loading' | 'complete' }) -> Void
chrome.tabs.onUpdated.addListener((tabId, { status }) => {
  if (status === "complete") {
    chrome.storage.local.get(
      ["enabled"],
      ({ enabled }) => enabled && chrome.tabs.get(tabId, clearYoutube)
    );
  }
});
