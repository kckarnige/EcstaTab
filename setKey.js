window.onload = () => {
    document.getElementById("setKeyBox").value =
        localStorage.getItem("unsplashApiKey");
};
document.body.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        if (document.getElementById("setKeyBox").value.length == 43) {
            localStorage.setItem(
                "unsplashApiKey",
                document.getElementById("setKeyBox").value
            );
            alert(`Successfully set!`);
        } else {
            alert(`Must be a 43 character Unsplash access key.`);
        }
    }
});
