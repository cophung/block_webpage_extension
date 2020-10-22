let manifest = browser.runtime.getManifest();
let listUrl = ["https://www.youtube.com/*", "https://thanhnien.vn/*"];

function blockSite(requestDetails) {
  browser.notifications.create("", {
    title: `${manifest.name}`,
    iconUrl: browser.runtime.getURL("icons/icon-60.png"),
    message: `Trang ${requestDetails.url.slice(0, -1)} của bạn đã bị chặn`,
    type: "basic",
  });
  return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
  blockSite,
  {
    urls: listUrl,
  },
  ["blocking"]
);
