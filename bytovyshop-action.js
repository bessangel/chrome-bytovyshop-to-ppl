/**
*/
var extensionId = chrome.runtime.id;
chrome.runtime.sendMessage(extensionId,{"person":getAddress()},null)
