window.onload = () => {
    if (localStorage.getItem("unsplashApiKey")) {
        document.getElementById("setKeyBox").value =
            localStorage.getItem("unsplashApiKey");
    } else {
        document.getElementById("cornerButton").classList.add("hide");
    }
    if (!localStorage.getItem("unsplashApiQuery")) {
        localStorage.setItem("unsplashApiQuery", "&query=sea")
    }
};
document.body.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        if (document.getElementById("setKeyBox").value.length == 43) {
            localStorage.setItem(
                "unsplashApiKey",
                document.getElementById("setKeyBox").value
            );
            alert(`Successfully set!`);
            document.getElementById("cornerButton").classList.remove("hide");
        } else {
            alert(`Must be a 43 character Unsplash access key.`);
        }
    }
});
