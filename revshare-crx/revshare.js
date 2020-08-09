const hasSponsor = document.getElementById("sponsor-button-repo");
if (hasSponsor) {
    console.log("Revshare-CRX // Sponsored.");
}

const url = location.href.split("/").slice(3, 5);
const defBranch = document.getElementById("branch-select-menu") ? document.getElementById("branch-select-menu").children[0].children[1].innerHTML : null;
const repoSpon = `https://raw.githubusercontent.com/${url.join("/")}/${defBranch}/.github/FUNDING.yml`;
const orgSpon = `https://raw.githubusercontent.com/${url[0]}/.github/${defBranch}/FUNDING.yml`