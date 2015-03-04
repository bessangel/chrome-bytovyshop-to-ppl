/*
*/


var extensionId = chrome.runtime.id;

function getAddress(){
	// console.log("JQuery version:" +jQuery().jquery)
	var addr =jQuery('#obsah b:contains("DORUČOVACÍ ADRESA")').parent().text().split("\n").slice(1)
	// var email = jQuery('#obsah b:contains("E-mail")')[0].parentNode.innerText.split(' ').slice(1).join(" ")
	var email = jQuery(jQuery('#obsah b:contains("E-mail")').get(0)).parent().text().split(' ').slice(1).join(" ")
	var tel = jQuery(jQuery('#obsah b:contains("Telefon")').get(0)).parent().text().split(' ').slice(1).join(" ")
	var mobile = jQuery(jQuery('#obsah b:contains("Mobil")').get(0)).parent().text().split(' ').slice(1).join("")
	var varsymb = jQuery(jQuery('#obsah b:contains("Variabilní symbol")').get(0)).parent().text().split(' ')[2]
	var total = jQuery(jQuery('#obsah b:contains("Cena po zaokrouhlení")').get(0)).parent().parent().children().get(1).innerText.split(" ")[0].replace('.','')
	var person = {}
	person.email=email
	person.firma = addr[0]
	person.jmeno = addr[1]
	person.ulice=addr[2]
	person.mesto=addr[3]
	person.psc=addr[4]

	person.tel= mobile.length>0? mobile : tel;
	person.varsymb = varsymb
	person.total = total
	return person
}

var person = JSON.stringify(getAddress())
console.log(person)

var btnnew = $('a[href*="a_nova_polozka.php?id="]').after('<a href=\'javascript:chrome.runtime.sendMessage("'+extensionId+'",{"person":'+person+'},null)\'  class="stdButton">' +
	'<img src="chrome-extension://'+extensionId+'/icon128.png" alt="Export v PPL" style="width: 90px;"/></a>');