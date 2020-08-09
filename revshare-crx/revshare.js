const hasSponsor = document.getElementById("sponsor-button-repo");
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
    }).catch((err) => {
        console.warn(`Revshare-CRX // Error: ${err}`);
    });
}