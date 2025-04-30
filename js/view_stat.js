function buildThresholdList() {
  let thresholds = [];
  let numSteps = 4;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function respondToVisibility(element, callback) {
  var options = {
	root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(entry);
    });
  }, options);

  observer.observe(element);
}

function visibilityChangeHandler(el) {
	// console.log(el.intersectionRatio);
	const isVisible = el.intersectionRatio > 0.5;
	
	if (isVisible) {
		let offerKey = el.target.querySelector('.offer-key').innerText;
		
		if (offerKey && offerKey.length && !viewedOffers.includes(offerKey)) {
			viewedOffers.push(offerKey);
			// console.log(viewedOffers);
		}
	}
}

function sendViews() {
	const offers = viewedOffers.filter(x => !sentOffers.includes(x));
	if (!offers.length || isSendingViews) {
		return;
	}
	
	isSendingViews = true;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/add_views_stat");

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
		  // console.log(xhr.responseText);
		  
		  sentOffers = sentOffers.concat(offers);
		  
		  isSendingViews = false;
	   }};

	xhr.send(JSON.stringify({
		'keys': offers,
		'source': currentSub,
		'fp': window.fpData ? window.fpData.uniq_code : null
	}));
}

/*function sendClick(offerBlock) {
	let offerKey = offerBlock.querySelector('.offer-key').innerText;
	
	if (!offerKey || !offerKey.length) {
		return;
	}
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/add_clicks_stat");

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
		  // console.log(xhr.responseText);
	   }};

	xhr.send(JSON.stringify({
		'key': offerKey,
		'source': currentSub,
		'web_id': currentWebId
	}));
}*/

let viewedOffers = [];
let sentOffers = [];
let isSendingViews = false;
let currentSub = document.currentScript.getAttribute('source');;

function addStat(offersSelector) {
	document.querySelectorAll(offersSelector).forEach((offerBlock) => {
		respondToVisibility(offerBlock, visibilityChangeHandler);
		
		/*offerBlock.querySelectorAll('a').forEach(linkEl => {
		  linkEl.addEventListener('click', () => sendClick(offerBlock));
		});*/
	});
	
	// document.querySelectorAll(".mb-custom")
	
	setInterval(sendViews, 500);
};