document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stars-only").addEventListener("click", setStar);
});

function setStar() {
    const checked = document.getElementById("stars-only");
    chrome.storage.sync.set({ "starsOnly": checked.checked }, () => {
        console.log("Saved as " + checked.checked);
    });
}