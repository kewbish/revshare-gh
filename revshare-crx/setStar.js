document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stars-only").addEventListener("click", setStar);
    chrome.storage.sync.get("starsOnly", (v) => {
        document.getElementById("stars-only").checked = v.starsOnly;
    });
});

function setStar() {
    const checked = document.getElementById("stars-only");
    console.log(checked.checked);
    chrome.storage.sync.set({ starsOnly: checked.checked }, () => {
    });
}