window.onload = () => {
    document.getElementById("setQueryBox").value = localStorage.getItem("unsplashApiQuery").replace("&query=","");
};


document.getElementById("saveSettings").onclick = () => {
    localStorage.setItem("unsplashApiQuery", "&query=" + document.getElementById("setQueryBox").value);
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    alert(`Successfully saved!`);
}
document.getElementById("resetQuery").onclick = () => {
    localStorage.setItem("unsplashApiQuery", "");
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    document.getElementById("setQueryBox").value = "";
    alert(`Successfully reset!`);
}