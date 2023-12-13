const UNSPLASH_API_KEY = "Pa077xF0PN8DOjf2DY2DwCz09n26xcO59buzgs1EAAQ";
const getLastFetch = localStorage.getItem("lastFetch");
const getLastFetchDate = localStorage.getItem("lastFetchDate");
var currentDate = new Date().toISOString().split("T")[0];

//Background code
function getAndSet() {
    localStorage.setItem("lastFetch", Date.now());
    localStorage.setItem("lastFetchDate", new Date().toISOString().split("T")[0]);
    if (document.getElementById("root")) {
        fetch(
            "https://api.unsplash.com/photos/random/?orientation=landscape&query=asus+motherboard&featured=true",
            {
                method: "GET",
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                },
            }
        )
            .then((response) => response.json())
            .then((response) => (backgroundImgUrl = response.urls.small));
        let backgroundImgUrl;
        setTimeout(() => {
            localStorage.setItem("fetchedBgImg", backgroundImgUrl + "");
            document.body.style.backgroundImage = `url(${backgroundImgUrl})`;
            console.log("Using fetched image");
            console.log(backgroundImgUrl);
            console.log(getLastFetch);
            console.log(getLastFetchDate);
        }, 500);
    }
}

if (getLastFetch && getLastFetchDate) {
    if ((getLastFetch/60000 >= Date.now()/60000 - 5) || getLastFetchDate != currentDate || localStorage.getItem("fetchedBgImg") == undefined) {
            window.onload = () => {
                document.body.style.backgroundImage = `url(${localStorage.getItem("fetchedBgImg")})`;
                console.log(`Hasn't been 5 minutes (Has only been ${(Date.now()/60000 - getLastFetch/60000).toFixed(1)}), nor has a full day passed (failsafe solution)`);
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
function time() {
  var d = new Date();
  document.getElementById('time').textContent = d.toLocaleTimeString([], {timeStyle: 'short', hour12: true});
  document.getElementById('time-sec').textContent = ('0'+d.getSeconds()).slice(-2);
}
time();
setInterval(time, 1000);