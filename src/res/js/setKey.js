window.onload = () => {
    if (window.location == window.parent.location) {
        document.body.style.backgroundImage = "url('res/background.jpg')";
        document.getElementById("root").style.backgroundColor = "rgba(44, 44, 44, 0.25) !important";
    }
    if (localStorage.getItem("unsplashApiKey")) {
        document.getElementById("setKeyBox").value =
            localStorage.getItem("unsplashApiKey");
    }
    if (!localStorage.getItem("unsplashApiQuery")) {
        localStorage.setItem("unsplashApiQuery", "&query=ocean")
    }
};
document.getElementById("saveKey").addEventListener("click", () => {
    if (document.getElementById("setKeyBox").value.length == 43) {
        localStorage.setItem(
            "unsplashApiKey",
            document.getElementById("setKeyBox").value
        );
        alert(`Successfully set!`);
        location.href = "index.html"
    } else {
        alert(`Must be a 43 character Unsplash access key.`);
    }
});