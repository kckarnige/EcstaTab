const getLastFetch = localStorage.getItem("lastFetch") / 60000;
const getLastFetchDate = localStorage.getItem("lastFetchDate");
const UNSPLASH_API_KEY = localStorage.getItem("unsplashApiKey");
var currentDate = new Date().toISOString().split("T")[0];

if (UNSPLASH_API_KEY) {
  //Tab Icon
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById("tabIcon").setAttribute("href", "res/icons/white-256.png")
  } else {
    document.getElementById("tabIcon").setAttribute("href", "res/icons/black-256.png")
  }

  //Background Fetch Code
  function set(fetched) {
    localStorage.setItem("fetchedBgImgURL", fetched.urls.small + "");
    localStorage.setItem("unsplashApiCreditName", fetched.user.name + "");
    localStorage.setItem("unsplashApiCreditLink", fetched.links.html + "");
    document.getElementById("background").style.backgroundImage = `url(${fetched.urls.small})`;
    if (document.getElementById("imgCreator")) {
      document.getElementById("imgCreator").innerText = ("Image by " + fetched.user.name);
      document.getElementById("imgCreator").setAttribute("href", fetched.links.html);
    }

    console.log("Using fetched image");
    console.log("Image URL: " + fetched.urls.small);
    //Turn image background into Base64 data URI
    fetch(fetched.urls.small)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)

      })
        .then(dataUrl => {
          localStorage.setItem("fetchedBgImg", dataUrl + "");
        }))

    //Everything else
    console.log(getLastFetch);
    console.log(getLastFetchDate);
  }
  function getAndSet() {
    localStorage.setItem("lastFetch", Date.now());
    localStorage.setItem("lastFetchDate", new Date().toISOString().split("T")[0]);
    if (document.getElementById("root")) {
      fetch(
        `https://api.unsplash.com/photos/random/?orientation=landscape${localStorage.getItem("unsplashApiQuery")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (localStorage.getItem("fetchedBgImgURL") && window.navigator.onLine) {
            throw new Error("Couldn't fetch new image, you may need to update your key. Reusing stored image.");
          } else if (window.navigator.onLine) {
            throw new Error("Couldn't fetch new image, you may need to update your key.");
          } else {
            throw new Error("It doesn't seem you're connected to the internet.");
          }
        })
        .then((response) => set(response))
        .catch((error) => {
          console.log(error)
        });
    }
  }

  //Background Refresh
  if (getLastFetch && getLastFetchDate) {
    if (localStorage.getItem("fetchedBgImg") == undefined) {
      getAndSet();
    }
    else if (3 <= (Date.now() / 60000 - getLastFetch).toFixed(0)) {
      getAndSet();
    }
    else {
      document.getElementById("background").style.backgroundImage = `url(${localStorage.getItem("fetchedBgImg")})`;
      if (document.getElementById("imgCreator")) {
        document.getElementById("imgCreator").innerText = ("Image by " + localStorage.getItem("unsplashApiCreditName"));
        document.getElementById("imgCreator").setAttribute("href", localStorage.getItem("unsplashApiCreditLink"));
      }
      console.log(
        `Hasn't been 3 minutes (Has only been ${(Date.now() / 60000 - getLastFetch).toFixed(0)})`
      );
      console.log("Using stored image");
      console.log(localStorage.getItem("lastFetch"));
      console.log(localStorage.getItem("lastFetchDate"));
      console.log("Image URL: " + localStorage.getItem("fetchedBgImgURL"));
    }
  } else {
    getAndSet();
  }

  //Time
  if (document.getElementById("time")) {
    function time() {
      var d = new Date();
      document.getElementById("time").textContent = d.toLocaleTimeString([], {
        timeStyle: "short",
        hour12: true,
      });
      document.getElementById("time-sec").textContent = ("0" + d.getSeconds()).slice(-2);
    }
    time();
    setInterval(time, 1000);
  }
} else if (!(window.location.href.indexOf("setKey.html") > -1)) {
  location.href = "setKey.html"
}

//Reroll!
if (document.getElementsByClassName("reload")[0]) {
  var reload = document.getElementsByClassName("reload")[0]
  reload.addEventListener("click", () => {
    localStorage.removeItem("lastFetch");
    localStorage.removeItem("lastFetchDate");
    window.location.reload();
  });
}

//Settings Panel
document.getElementsByClassName("setOpen")[0].addEventListener("click", () => {
  if (!document.getElementById("settingsPanelContainer").classList.contains("panShow")) {
    document.getElementById("settingsPanelContainer").classList.add("panShow");
    document.getElementsByClassName("options")[0].style = "pointer-events: none; filter: blur(5px);";
    document.getElementsByClassName("bottomCorner")[0].style = "pointer-events: none; filter: blur(5px);";
  }
})
document.getElementsByClassName("setClose")[0].addEventListener("click", () => {
  if (document.getElementById("settingsPanelContainer").classList.contains("panShow")) {
    document.getElementById("settingsPanelContainer").classList.remove("panShow");
    document.getElementsByClassName("options")[0].style = "pointer-events: auto;";
    document.getElementsByClassName("bottomCorner")[0].style = "pointer-events: auto;";
  }
})