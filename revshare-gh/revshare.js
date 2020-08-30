// if sponsored
const hasSponsor = document.getElementById("sponsor-button-repo");

// if starsOnly set
var starsOnly = false;
chrome.storage.sync.get("starsOnly", (v) => {
    starsOnly = v.starsOnly;
    console.log("Revshare-GH // Executed.");
});

// links variables
var walletLinks = [];
var allDepUrls = [];

// url
const url = window.location.href.toString();

function createMeta(array) {
    const chosen = array[Math.floor(Math.random() * array.length)];
    const monetizationTag = document.createElement('meta');
    monetizationTag.name = 'monetization';
    monetizationTag.content = chosen;
    document.head.appendChild(monetizationTag);
    // form meta tag, and append
}

function getFundingLinks() {
    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${globalThis.key}`
        },
        body: JSON.stringify({
            query: `{ repository(name: "${url.split("/")[4]}", owner: "${url.split("/")[3]}")  { fundingLinks { url } } }`
        }),
    }).then((res) => res.json()).then((res) => {
        const links = res.data.repository.fundingLinks;
        // select each link
        links.forEach((l) => {
            if (l.url.startsWith("$")) {
                walletLinks.push(l.url);
                // if matches the wallet pointer format
            }
        });
        if (starsOnly) {
            console.log("Revshare-GH // Stars only.");
            var starredObj = document.getElementsByClassName("js-toggler-container js-social-container starring-container");
            starredObj = starredObj[0].innerText.split("\n")[0].trim();
            // either 'unstar', therefore starred, or 'star', therefore unstarred
        }
    });

}

function getDepLinks() {
    const url = window.location.href.toString();
    return fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.hawkgirl-preview+json',
                'Authorization': `Bearer ${globalThis.key}`
            },
            body: JSON.stringify({
                query: `{ repository(name: "${url.split("/")[4]}", owner: "${url.split("/")[3]}") {dependencyGraphManifests { nodes { dependencies { nodes { repository { fundingLinks { url } } } } } } } }`
            }),
        })
        .then(res => res.json())
        .then(res => {
            console.log("Revshare-CRX // Data: ", res);
            const allDepNodes = res.data.repository.dependencyGraphManifests.nodes;
            if (allDepNodes.length > 0) {
                allDepNodes.forEach((el) => {
                    allDepUrlLists = el.dependencies.nodes;
                    allDepUrlNodes = [];
                    allDepUrlLists.forEach((el) => {
                        el.forEach((subEl) => {
                            if (subEl.repository != null) {
                                allDepUrlNodes.push(subEl.repository.fundingLinks);
                            }
                        });
                    });
                });
                allDepUrls = [];
                allDepUrlNodes.forEach((el) => {
                    el.forEach((subEl) => {
                        if (subEl.url.startsWith("$")) {
                            allDepUrls.push(subEl.url);
                        }
                    });
                });
            }
        });

}

if (hasSponsor) {
    console.log("Revshare-GH // Sponsored");
    getFundingLinks().then(() => {
        const sponsorMeta = Math.round(Math.random());
        console.log(`Revshare-GH // Dependency? ${sponsorMeta}`);
        if (sponsorMeta) {
            getDepLinks().then(() => {
                if (allDepUrls) {
                    createMeta(allDepUrls);
                } else if (walletLinks) {
                    // fallback when dependencies empty
                    createMeta(walletLinks);
                }
            });
        } else if (walletLinks) {
            createMeta(walletLinks);
        }
    });
}