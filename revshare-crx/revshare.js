const hasSponsor = document.getElementById("sponsor-button-repo");
var starsOnly = false;
chrome.storage.sync.get("starsOnly", (v) => {
    starsOnly = v.starsOnly;
});
if (starsOnly) {
    console.log("Revshare-CRX // Stars only.");
    var starredObj = document.querySelectorAll(".js-toggler-container.js-social-container.starring-container");
    console.log(starredObj);
}
if (hasSponsor) {
    console.log("Revshare-CRX // Sponsored.");
    const fundingUrl = `${location.href.split("/").splice(0, 5).join("/")}/funding_links?fragment=1`;
    fetch(fundingUrl).then((res) => {
        return res.text();
    }).then((html) => {
        const parser = new DOMParser();
        const htmlNodes = parser.parseFromString(html, 'text/html');
        const links = htmlNodes.querySelectorAll(".d-flex.mb-3>.flex-auto.min-width-0>a");
        var walletLinks = [];
        links.forEach((l) => {
            if (l.innerText.startsWith("$")) {
                walletLinks.push(l.innerText);
            }
        });
        const chosen = walletLinks[Math.floor(Math.random() * walletLinks.length)];
        const monetizationTag = document.createElement('meta');
        monetizationTag.name = 'monetization';
        monetizationTag.content = chosen;
        document.head.appendChild(monetizationTag);
    }).catch((err) => {
        console.error(`Revshare-CRX // Error: ${err}`);
    });
}