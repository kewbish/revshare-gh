document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stars-only").addEventListener("click", setStar);
    chrome.storage.sync.get("starsOnly", (v) => {
        document.getElementById("stars-only").checked = v.starsOnly;
    });
    document.getElementById("pat").addEventListener("blur", setPat);
    chrome.storage.sync.get("pat", (pat) => {
        if (pat) {
            document.getElementById("pat").value = parseInt(pat.pat);
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
    chrome.storage.sync.set({ pat: parseInt(token.value, 10) }, () => {});
}
