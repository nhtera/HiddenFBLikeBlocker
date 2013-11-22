chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
		chrome.browserAction.setBadgeText({text: message.numberIFBlocked});
		chrome.browserAction.setTitle({ "title": "\n" + message.numberIFBlocked + " hidden Facebook like has been blocked on this tab" });
    }
);
