let manifest = browser.runtime.getManifest();

function blockSite(requestDetails) {
  browser.notifications.create("urlBlocked", {
    title: `${manifest.name}`,
    iconUrl: browser.runtime.getURL("icons/icon-60.png"),
    message: `Trang ${requestDetails.url.slice(0, -1)} của bạn đã bị chặn`,
    type: "basic",
  });

  setTimeout(function () {
    browser.notifications.clear("urlBlocked");
  }, 3000);

  return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
  blockSite,
  {
    urls: JSON.parse(localStorage.getItem("urls")),
  },
  ["blocking"]
);
