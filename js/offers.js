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
    72: new Offer(logo="/images/banks/Loanonline.svg", url="{offer}&offer_id=72", sa="25000 PHP", interest="0.1%"),
    73: new Offer(logo="/images/banks/finbro.svg", url="{offer}&offer_id=73", sa="50000 PHP", interest="0.01%"),
    74: new Offer(logo="/images/banks/Cash-Express.png.svg", url="{offer}&offer_id=74", sa="20000 PHP", interest="1%"),
    75: new Offer(logo="/images/banks/Kviku.svg", url="{offer}&offer_id=75", sa="25000 PHP", interest="0.01%"),
    76: new Offer(logo="/images/banks/moneycat.svg", url="{offer}&offer_id=76", sa="25000 PHP", interest="0.1%"),
    // 77: new Offer(logo="/images/banks/digido_2.png.svg", url="{offer}&offer_id=77", sa="25000 PHP", interest="0.1%"),
    83: new Offer(logo="/images/banks/binixo.svg", url="{offer}&offer_id=83", sa="25000 PHP", interest="0.1%"),
    84: new Offer(logo="/images/banks/mazilla.svg", url="{offer}&offer_id=84", sa="30000 PHP", interest="0.1%"),
    85: new Offer(logo="/images/banks/pesoredee.svg", url="{offer}&offer_id=85", sa="20000 PHP", interest="0.1%"),
};

document.addEventListener("DOMContentLoaded", function() {
    // Получаем список оферов из URL
    const urlParams = new URLSearchParams(window.location.search);
    var offersIds = urlParams.get("offers_ids");  // например, "zaimerkz,moneymankz,onecreditkz"
    if (!offersIds) {
        offersIds="72 73 74 75 76 83 84 85";
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