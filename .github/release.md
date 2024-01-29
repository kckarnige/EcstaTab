<h1 align="center">Local Install Build</h1>
<br>

<p align="center">For those who can't build it themselves for one reason or another, here you go!</p>
<h1></h1>

[![firefox](https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/en-US/firefox/addon/ecstatab/)
[![chromium](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chromewebstore.google.com/detail/ecsta/jpdnfbcjclmhlebikidldibdlgjindpl)

### Installation
<details>
  <summary>Firefox</summary>

  1. Copy the `manifest.xpi.json` file to the `src` directory

  2. Rename it to `manifest.json`
  <details>
  <summary>3. Open your extension settings and click on the gear icon</summary>
  
  ![help1](./help1.png)
  </details>

  4. Click "Debug Add-ons"

  5. Click "Load temporary Add-on..." and find the `src` directory
</details>

<details>
  <summary>Chromium</summary>

  1. Copy the `manifest.crx.json` file to the `src` directory

  2. Rename it to `manifest.json`
  
  3. Open your extension settings

  4. Toggle developer mode *(Usually located on the same page)*

  5. Click "Load unpacked" and find the `src` directory
</details>