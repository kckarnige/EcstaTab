const getLastFetch = localStorage.getItem("lastFetch");
const getLastFetchDate = localStorage.getItem("lastFetchDate");
const UNSPLASH_API_KEY = localStorage.getItem("unsplashApiKey");
var currentDate = new Date().toISOString().split("T")[0];

if (UNSPLASH_API_KEY) {
  //Background code
  function set(fetched) {
    localStorage.setItem("fetchedBgImg", fetched.urls.small + "");
    localStorage.setItem("unsplashApiCreditName", fetched.user.name + "");
    localStorage.setItem("unsplashApiCreditLink", fetched.user.links.html + "");
    document.getElementById("background").style.backgroundImage = `url(${fetched.urls.small})`;
    if (document.getElementById("imgCreator")) {
      document.getElementById("imgCreator").innerText = ("Image by " + fetched.user.name);
      document.getElementById("imgCreator").setAttribute("href", fetched.user.links.html);
    }
    console.log("Using fetched image");
    console.log(fetched.urls.small);
    console.log(getLastFetch);
    console.log(getLastFetchDate);
  }
  function getAndSet() {
    localStorage.setItem("lastFetch", Date.now());
    localStorage.setItem(
      "lastFetchDate",
      new Date().toISOString().split("T")[0]
    );
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
          } else if (localStorage.getItem("fetchedBgImg") && window.navigator.onLine) {
            throw new Error("Couldn't fetch new image, you may need to update your key. Reusing last image.");
          } else if (window.navigator.onLine) {
            throw new Error("Couldn't fetch new image, you may need to update your key.");
          } else {
            throw new Error("It doesn't seem you're connected to the internet.");
          }})
        .then((response) => set(response))
        .catch((error) => {
          console.log(error)
        });
    }
  }

  if (getLastFetch && getLastFetchDate) {
    if (
      getLastFetch / 60000 >= Date.now() / 60000 - 2.5 ||
      getLastFetchDate != currentDate ||
      localStorage.getItem("fetchedBgImg") == undefined
    ) {
      window.onload = () => {
        document.getElementById("background").style.backgroundImage = `url(${localStorage.getItem("fetchedBgImg")})`;
        if (document.getElementById("imgCreator")) {
          document.getElementById("imgCreator").innerText = ("Image by " + localStorage.getItem("unsplashApiCreditName"));
          document.getElementById("imgCreator").setAttribute("href", localStorage.getItem("unsplashApiCreditLink"));
        }
        console.log(
          `Hasn't been 2.5 minutes (Has only been ${(
            Date.now() / 60000 -
            getLastFetch / 60000
          ).toFixed(1)}), nor has a full day passed (failsafe solution)`
        );
        console.log("Using cached image");
        console.log(localStorage.getItem("lastFetch"));
        console.log(localStorage.getItem("lastFetchDate"));
        console.log(localStorage.getItem("fetchedBgImg"));
      };
    } else {
      getAndSet();
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
      document.getElementById("time-sec").textContent = (
        "0" + d.getSeconds()
      ).slice(-2);
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
      location.reload();
    });
}