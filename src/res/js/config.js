window.onload = () => {
    if (localStorage.getItem("fetchedBgImg")) {
        document.getElementById("background").style.backgroundImage = `url(${localStorage.getItem("fetchedBgImg")})`;
    }
    document.getElementById("setQueryBox").value = localStorage.getItem("unsplashApiQuery").replace("&query=","");
};


document.getElementById("saveSettings").onclick = () => {
    localStorage.setItem("unsplashApiQuery", "&query=" + document.getElementById("setQueryBox").value);
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    location.reload();
}
document.getElementById("resetQuery").onclick = () => {
    localStorage.setItem("unsplashApiQuery", "");
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    document.getElementById("setQueryBox").value = "";
    location.reload();
}