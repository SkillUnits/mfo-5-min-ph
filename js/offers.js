class Offer {
    constructor(logo, url, duration, interest) {
        this.logo = logo;
        this.url = url;
        this.duration = duration;
        this.interest = interest;
    }
}

const moneySymbols = ["💵", "💰", "💸", "💳", "💶", "💷"];

// Динамически загружаем только те оферы, которые есть в массиве offerIdsArray
const offersData = {
    10: new Offer(logo="/images/banks/zaimer.png", url="{offer}&offer_id=10", duration="12 months", interest="0.1%"),
    12: new Offer(logo="/images/banks/moneymankz.svg", url="{offer}&offer_id=12", duration="30 days", interest="0.01%"),
    13: new Offer(logo="/images/banks/onecreditkz.svg", url="{offer}&offer_id=13", duration="20 days", interest="0.01%"),
    14: new Offer(logo="/images/banks/credity360.png", url="{offer}&offer_id=14", duration="30 days", interest="0.01%"),
    15: new Offer(logo="/images/banks/creditbarkz.svg", url="{offer}&offer_id=15", duration="30 days", interest="0.1%"),
    16: new Offer(logo="/images/banks/creditpluskz.svg", url="{offer}&offer_id=16", duration="30 days", interest="0.1%"),
    20: new Offer(logo="/images/banks/acreditkz.png", url="{offer}&offer_id=20", duration="25 days", interest="0.01%"),
    23: new Offer(logo="/images/banks/turbomoneykz.png", url="{offer}&offer_id=23", duration="20 days", interest="0.1%"),
    24: new Offer(logo="/images/banks/gmoneykz.svg", url="{offer}&offer_id=24", duration="20 days", interest="0.29%"),

    21: new Offer(logo="/images/banks/finlitekz.svg", url="{offer}&offer_id=21", duration="30 days", interest="0.01%"),
    22: new Offer(logo="/images/banks/cashradarkz.svg", url="{offer}&offer_id=22", duration="30 days", interest="0.01%"),
    25: new Offer(logo="/images/banks/easycashkz.svg", url="{offer}&offer_id=25", duration="60 days", interest="0.1%"),
    26: new Offer(logo="/images/banks/excashkz.svg", url="{offer}&offer_id=26", duration="180 days", interest="0.1%"),
    27: new Offer(logo="/images/banks/fincashkz.svg", url="{offer}&offer_id=27", duration="180 days", interest="0.1%"),
};

document.addEventListener("DOMContentLoaded", function() {
    // Получаем список оферов из URL
    const urlParams = new URLSearchParams(window.location.search);
    var offersIds = urlParams.get("offers_ids");  // например, "zaimerkz,moneymankz,onecreditkz"
    if (!offersIds) {
        offersIds="13 21 22 20 10 12 14 16";
    }

    const offerIdsArray = offersIds.split(' ');
    const offersWrapper = document.querySelector("#offers_list");
    var idx = 0;
    offerIdsArray.forEach(offerId => {
        const offerData = offersData[offerId];
        if (offerData) {
            randomSymbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];

            if(idx == 0 || idx == 1) {
                labelDiv = `<div class="label red">Best for you</div>`;
            } else if(idx == 2) {
                labelDiv = `<div class="label yellow">Fast delivery</div>`;
            } else {
                labelDiv = '';
            }

            if(idx == 0) {
                color="#b8d8be"
            } else {
                color="#e5e5e5"
            }

            const offerElement = document.createElement("div");
            offerElement.setAttribute("id", `offer-${offerId}`);
            offerElement.classList.add("offer", "offer-block-new");
            offerElement.style.backgroundColor = color;
            offerElement.innerHTML = `
            <div class="offer-key" style="display: none;">${offerId}</div>
            ${labelDiv}
            <a class="body-card-logo" href="${offerData.url}" onclick="return goUrl(this, '${offerId}');" target="_blank">
                <img src="${offerData.logo}" class="offer-logo" alt="${offerId}">
            </a>
            <ul class="offer-info">
                <li>
                <span class="text">Term up to:</span>
                <span class="bold">${offerData.duration}</span>
                </li>
                <li>
                <span class="text">Rate:</span>
                <span class="bold colored">${offerData.interest}</span>
                </li>
            </ul>
            <div class="general_button_wrapper">
                <div class="button">
                <a class="btn-main" target="_blank" href="${offerData.url}" onclick="return goUrl(this, '${offerId}');">
                    Get ${randomSymbol}
                </a>
                </div>
            </div>
            `;
            offersWrapper.appendChild(offerElement);
            
            idx++;
        }
    });
});