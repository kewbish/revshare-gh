document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stars-only").addEventListener("click", setStar);
    chrome.storage.sync.get("starsOnly", (v) => {
        document.getElementById("stars-only").checked = v.starsOnly;
    });
    document.getElementById("pat").addEventListener("input", setPat);
    chrome.storage.sync.get("pat", (pat) => {
        if (pat) {
            document.getElementById("pat").value = pat;
        }
    });
});

function setStar() {
    const checked = document.getElementById("stars-only");
    console.log(checked.checked);
    chrome.storage.sync.set({ starsOnly: checked.checked }, () => {
    });
}

function setPat() {
    const token = document.getElementById("pat");
    console.log(token.value);
    chrome.storage.sync.set({ pat: token.value }, () => {});
}
