window.onload = () => {
    document.getElementById("setQueryBox").value = localStorage.getItem("unsplashApiQuery").replace("&query=", "");
    document.getElementById("setKeyBox").value = localStorage.getItem("unsplashApiKey");
};

//Save Query
document.getElementById("saveSettings").addEventListener("click", () => {
    localStorage.setItem("unsplashApiQuery", "&query=" + document.getElementById("setQueryBox").value);
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    parent.location.reload();
})
//Save Key
document.getElementById("saveKey").addEventListener("click", () => {
    if (document.getElementById("setKeyBox").value.length == 43) {
        localStorage.setItem("unsplashApiKey", document.getElementById("setKeyBox").value);
        alert(`Successfully set!`);
        parent.location.reload();
    } else {
        alert(`Must be a 43 character Unsplash access key.`);
    }
})

//Reset Query
document.getElementById("resetQuery").addEventListener("click", () => {
    localStorage.setItem("unsplashApiQuery", "");
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    document.getElementById("setQueryBox").value = "";
    parent.location.reload();
})
//Hard Reset
document.getElementById("hardReset").addEventListener("click", () => {
    if (confirm("Only use this as a last resort, try hitting the reload button first!" + `
` + "Are you sure you wanna do this?")) {
        localStorage.removeItem("unsplashApiQuery");
        localStorage.removeItem("lastFetch");
        localStorage.removeItem("lastFetchDate");
        localStorage.removeItem("unsplashApiKey");
        parent.location.reload();
    }
})

//Close Panel
document.getElementsByClassName("settings")[0].addEventListener("click", () => {
    parent.document.getElementById("settingsPanelContainer").style.display = "none"
    parent.document.getElementsByClassName("options")[0].style.display = "block";
    setTimeout(() => { parent.silly = false }, 10)
})