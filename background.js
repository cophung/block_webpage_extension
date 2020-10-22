let listUrl = ["https://www.youtube.com/*", "https://thanhnien.vn/*"];

function blockSite(requestDetails) {
  console.log("Loading: " + requestDetails.url);
  return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
  blockSite,
  {
    urls: listUrl,
  },
  ["blocking"]
);
