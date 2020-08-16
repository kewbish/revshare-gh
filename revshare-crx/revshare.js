const hasSponsor = document.getElementById("sponsor-button-repo");
var starsOnly = false;
chrome.storage.sync.get("starsOnly", (v) => {
    starsOnly = v.starsOnly;
    console.log("Revshare-CRX // Executed.");
});
if (hasSponsor) {
    console.log("Revshare-CRX // Sponsored.");
    const url = window.location.href.toString();
    const fundingUrl = `${url.split("/").splice(0, 5).join("/")}/funding_links?fragment=1`;
    // fetch url for fragment page including all funding links
    fetch(fundingUrl).then((res) => {
        return res.text();
    }).then((html) => {
        const parser = new DOMParser();
        const htmlNodes = parser.parseFromString(html, 'text/html');
        // create node tree from text of fetched page
        const links = htmlNodes.querySelectorAll(".d-flex.mb-3>.flex-auto.min-width-0>a");
        // select each link
        var walletLinks = [];
        links.forEach((l) => {
            if (l.innerText.startsWith("$")) {
                walletLinks.push(l.innerText);
                // if matches the wallet pointer format
            }
        });
        if (starsOnly) {
            console.log("Revshare-CRX // Stars only.");
            var starredObj = document.getElementsByClassName("js-toggler-container js-social-container starring-container");
            starredObj = starredObj[0].innerText.split("\n")[0].trim();
            // either 'unstar', therefore starred, or 'star', therefore unstarred
        }
        if ((starsOnly && starredObj == "Unstar" || !starsOnly) && walletLinks.length > 0) {
            const chosen = walletLinks[Math.floor(Math.random() * walletLinks.length)];
            const monetizationTag = document.createElement('meta');
            monetizationTag.name = 'monetization';
            monetizationTag.content = chosen;
            document.head.appendChild(monetizationTag);
            // form meta tag, and append
        }
        fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.hawkgirl-preview+json', 'Authorization': `Bearer ${globalThis.key}` },
            body: JSON.stringify({ query: `{ repository(name: "${url.split("/")[4]}", owner: "${url.split("/")[3]}") {dependencyGraphManifests { nodes { dependencies { nodes { repository { fundingLinks { url } } } } } } } }` }),
        })
            .then(res => res.json())
            .then(res => {
                console.log("Revshare-CRX // Data: ", res);
                const allDepNodes = res.data.repository.dependencyGraphManifests.nodes;
                var allDepUrlLists = [];
                allDepNodes.forEach((el) => {
                    allDepUrlLists.push(el.dependencies.nodes);
                });
                console.log(allDepUrlLists);
                var allDepUrlNodes = [];
                allDepUrlLists.forEach((el) => {
                    el.forEach((subEl) => {
                        if (subEl.repository != null) {
                            allDepUrlNodes.push(subEl.repository.fundingLinks);
                        }
                    })
                });
                var allDepUrls = [];
                allDepUrlNodes.forEach((el) => {
                    el.forEach((subEl) => {
                        if (subEl.url.startsWith("$")) {
                            allDepUrls.push(subEl.url);
                        }
                    });
                });
            })
            .catch(err => console.error(`Revshare-CRX // Error: ${err}`));
    }).catch((err) => {
        console.error(`Revshare-CRX // Error: ${err}`);
    });
}