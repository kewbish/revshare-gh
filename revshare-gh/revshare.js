// if sponsored
const hasSponsor = document.getElementById("sponsor-button-repo");

// if starsOnly set
var starsOnly = false;
chrome.storage.sync.get("starsOnly", (v) => {
    starsOnly = v.starsOnly;
    console.log("Revshare-GH // Executed.");
});

if (hasSponsor) {
    console.log("Revshare-GH // Sponsored.");
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
            console.log("Revshare-GH // Stars only.");
            var starredObj = document.getElementsByClassName("js-toggler-container js-social-container starring-container");
            starredObj = starredObj[0].innerText.split("\n")[0].trim();
            // either 'unstar', therefore starred, or 'star', therefore unstarred
        }
        const sponsorMeta = Math.round(Math.random());
	console.log(`Revshare-GH // Dependency? ${sponsorMeta}`);
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
                        var allDepUrls = [];
                        allDepUrlNodes.forEach((el) => {
                            el.forEach((subEl) => {
                                if (subEl.url.startsWith("$")) {
                                    allDepUrls.push(subEl.url);
                                }
                            });
                        });
                    }
                    if (allDepUrls) {
                        createMeta(allDepUrls);
                    }
                    else if ((starsOnly && starredObj == "Unstar" || !starsOnly) && walletLinks.length > 0) {
                        createMeta(walletLinks);
                    	// fallback for when dependencies don't have wallet links
		    }
                })
                .catch(err => console.error(`Revshare-GH // Error: ${err}`));
        }
        else if ((starsOnly && starredObj == "Unstar" || !starsOnly) && walletLinks.length > 0) {
            createMeta(walletLinks);
        }
    }).catch((err) => {
        console.error(`Revshare-GH // Error: ${err}`);
    });
}

function createMeta(array) {
    const chosen = array[Math.floor(Math.random() * array.length)];
    const monetizationTag = document.createElement('meta');
    monetizationTag.name = 'monetization';
    monetizationTag.content = chosen;
    document.head.appendChild(monetizationTag);
    // form meta tag, and append
}
