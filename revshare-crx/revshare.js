const hasSponsor = document.getElementById("sponsor-button-repo");
var starsOnly = false;
chrome.storage.sync.get("starsOnly", (v) => {
    starsOnly = v.starsOnly;
    console.log("Revshare-CRX // Executed.");
});
if (hasSponsor) {
    console.log("Revshare-CRX // Sponsored.");
    const url = window.location.href.toString();
    // fetch url for fragment page including all funding links
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${globalThis.key}` },
        body: JSON.stringify({ query: `{ repository(name: "${url.split("/")[4]}", owner: "${url.split("/")[3]}")  { fundingLinks { url } } }` }),
    }).then((res) => res.json()
    ).then((res) => {
        const links = res.data.repository.fundingLinks;
        // select each link
        var walletLinks = [];
        links.forEach((l) => {
            if (l.url.startsWith("$")) {
                walletLinks.push(l.url);
                // if matches the wallet pointer format
            }
        });
        if (starsOnly) {
            console.log("Revshare-CRX // Stars only.");
            var starredObj = document.getElementsByClassName("js-toggler-container js-social-container starring-container");
            starredObj = starredObj[0].innerText.split("\n")[0].trim();
            // either 'unstar', therefore starred, or 'star', therefore unstarred
        }
        const sponsorMeta = Math.round(Math.random());
        console.log(sponsorMeta);
        if (sponsorMeta) {
            fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.hawkgirl-preview+json', 'Authorization': `Bearer ${globalThis.key}` },
                body: JSON.stringify({ query: `{ repository(name: "${url.split("/")[4]}", owner: "${url.split("/")[3]}") {dependencyGraphManifests { nodes { dependencies { nodes { repository { fundingLinks { url } } } } } } } }` }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log("Revshare-CRX // Data: ", res);
                    const allDepNodes = res.data.repository.dependencyGraphManifests.nodes;
                    // allDepNodes.forEach((el) => {
                    //     allDepUrlLists = el.dependencies.nodes;
                    //     allDepUrlNodes = [];
                    //     allDepUrlLists.forEach((el) => {
                    //         el.forEach((subEl) => {
                    //             if (subEl.repository != null) {
                    //                 allDepUrlNodes.push(subEl.repository.fundingLinks);
                    //             }
                    //         });
                    //     });
                    // });
                    // var allDepUrls = [];
                    // allDepUrlNodes.forEach((el) => {
                    //     el.forEach((subEl) => {
                    //         if (subEl.url.startsWith("$")) {
                    //             allDepUrls.push(subEl.url);
                    //         }
                    //     });
                    // });
                    var allDepUrlLists = [];
                    allDepNodes.forEach((el) => {
                        allDepUrlLists.push(el.dependencies.nodes);
                    });
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
                    if (allDepUrls.length > 0) {
                        const chosen = allDepUrls[Math.floor(Math.random() * allDepUrls.length)];
                        createMeta(chosen);
                    }
                })
                .catch(err => console.error(`Revshare-CRX // Error: ${err}`));
        }
        else if ((starsOnly && starredObj == "Unstar" || !starsOnly) && walletLinks.length > 0) {
            chosen = walletLinks[Math.floor(Math.random() * walletLinks.length)];
            createMeta(chosen);
        }
    }).catch((err) => {
        console.error(`Revshare-CRX // Error: ${err}`);
    });
}

function createMeta(chosen) {
    const monetizationTag = document.createElement('meta');
    monetizationTag.name = 'monetization';
    monetizationTag.content = chosen;
    document.head.appendChild(monetizationTag);
    // form meta tag, and append
}