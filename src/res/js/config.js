document.getElementById("background").style.background = "transparent";
document.getElementById("root").style.background = "rgba(255,255,255,0.05)";
document.getElementById("root").style.backdropFilter = "blur(15px)";
document.body.style.background = "transparent";

window.onload = () => {
    document.getElementById("setQueryBox").value = localStorage.getItem("unsplashApiQuery").replace("&query=","");
};


document.getElementById("saveSettings").addEventListener("click", () => {
    localStorage.setItem("unsplashApiQuery", "&query=" + document.getElementById("setQueryBox").value);
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    parent.location.reload();
})
document.getElementById("resetQuery").addEventListener("click", () => {
    localStorage.setItem("unsplashApiQuery", "");
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    document.getElementById("setQueryBox").value = "";
    parent.location.reload();
})
document.getElementsByClassName("settings")[0].addEventListener("click", () => {
    parent.document.getElementById("settingsPanelContainer").style.display = "none"
    parent.document.getElementsByClassName("options")[0].style.display = "block";
})