var HiddenFBLikeBlocker = HiddenFBLikeBlocker || {};

HiddenFBLikeBlocker.Storage = HiddenFBLikeBlocker.Storage || {};

// Sets an item
HiddenFBLikeBlocker.Storage.setItem = function(item, value)
{
  window.localStorage.setItem(item, value);
};

// Returns an item
HiddenFBLikeBlocker.Storage.getItem = function(item)
{
  return window.localStorage.getItem(item);
};

// Clears the data on a tab
HiddenFBLikeBlocker.Storage.clearTabData = function(tabId)
{
  window.localStorage.removeItem(tabId);

  HiddenFBLikeBlocker.Storage.updateBadgeText(tabId);
};


// Handles a tab updating
HiddenFBLikeBlocker.Storage.tabUpdated = function(tabId, properties)
{
  // If there are no properties or the status is loading
  if(!properties || properties.status == "loading")
  {
    HiddenFBLikeBlocker.Storage.clearTabData(tabId);
  }
};

HiddenFBLikeBlocker.Storage.updateBadgeText = function(tabId){
	var count = HiddenFBLikeBlocker.Storage.getItem(tabId);
	if(!count)
	{
		HiddenFBLikeBlocker.Storage.setBadgeText(tabId, 0);
	} else {
		HiddenFBLikeBlocker.Storage.setBadgeText(tabId, count);
	}
}

// Handles a tab selection changing
HiddenFBLikeBlocker.Storage.tabSelectionChanged = function(tabId)
{
  HiddenFBLikeBlocker.Storage.updateBadgeText(tabId);
};

HiddenFBLikeBlocker.Storage.setBadgeText = function(tabId, counter)
{
	HiddenFBLikeBlocker.Storage.setItem(tabId, counter);
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	chrome.browserAction.setBadgeText({text: "" + counter});
	chrome.browserAction.setTitle({ "title": "\n" + counter + " hidden Facebook like has been blocked on this tab" });
};

chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
		HiddenFBLikeBlocker.Storage.setBadgeText(sender.tab.id, message.numberIFBlocked);
    }
);

chrome.tabs.onRemoved.addListener(HiddenFBLikeBlocker.Storage.tabUpdated);
chrome.tabs.onSelectionChanged.addListener(HiddenFBLikeBlocker.Storage.tabSelectionChanged);
chrome.tabs.onUpdated.addListener(HiddenFBLikeBlocker.Storage.tabUpdated);