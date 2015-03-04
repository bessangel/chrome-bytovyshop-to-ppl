/*
*/

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'a_objednavka.php' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

 
/**
 * [openPPLPage Open klient.ppl.cz page for create new post
 * @param  {object} person - e.g {"email":"test@seznam.cz","firma":"AAA","jmeno":"Dana Daa","ulice":"Chodský 180","mesto":"NY","psc":"34815","tel":"123456","varsymb":"150320","total":"3.080,00"}
 * @return {void}
 */
 function openPPLPage(person){
		  console.log("In background.js=> person:" + person)
	    chrome.tabs.create({
			url: "http://klient.ppl.cz/zasilka.aspx?loadedControl=zasilkaNew",
			active: true
			},
			function(tab){
				chrome.tabs.executeScript(tab.id, {code:"var person=" + JSON.stringify(person) })
				chrome.tabs.executeScript(tab.id, {file:"jquery.js"})
				chrome.tabs.executeScript(tab.id, {file:"ppl.js"})
			}
		);

}

// Listener returned message from bytovyshop-action.js after click on icon PPL in omnipage
chrome.runtime.onMessage.addListener(function(request,sender,response) {
	if(request.person){
		openPPLPage(request.person);
	}
});

// Listener for click on "Export do PPL" button on page http://www.bytovyshop.cz/a_objednavka.php?id=*
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
	 if(request.person){
			openPPLPage(request.person)
	 }
  });


// Listener of click on icon-button in url string (omnibox)
chrome.pageAction.onClicked.addListener(function(tab) {
  // We can only inject scripts to find the title on pages loaded with http
  // and https so for all other pages, we don't ask for the title.
	chrome.tabs.executeScript(null, {file: "bytovyshop-action.js"});
});
