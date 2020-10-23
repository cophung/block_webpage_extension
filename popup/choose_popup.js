let manifest = browser.runtime.getManifest();

document.getElementById("btnAdd").disabled = true;
document.getElementById("btn-delete").disabled = true;

//begin input new url
document.getElementById("btnAdd").addEventListener("click", function () {
  let newUrl = document.getElementById("newUrl").value;
  let urls = JSON.parse(localStorage.getItem("urls"));

  let patternHttps = /https/gim;
  newUrl = newUrl.replace(/\s/g, "");
  let resultHttps = patternHttps.test(newUrl);

  if (!resultHttps) {
    newUrl = "https://" + newUrl + "/";
  }

  if (urls) {
    if (urls.find((item) => item === newUrl)) {
      browser.notifications.create("", {
        title: `${manifest.name}`,
        iconUrl: browser.runtime.getURL("icons/icon-60.png"),
        message: `Trang ${newUrl} của bạn đã tồn tại trong danh sách chặn`,
        type: "basic",
      });
    } else {
      urls.push(newUrl);
      browser.notifications.create("", {
        title: `${manifest.name}`,
        iconUrl: browser.runtime.getURL("icons/icon-60.png"),
        message: `Trang ${newUrl} của bạn đã được thêm vào danh sách chặn`,
        type: "basic",
      });
    }
  } else {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
    urls.push(newUrl);
    browser.notifications.create("", {
      title: `${manifest.name}`,
      iconUrl: browser.runtime.getURL("icons/icon-60.png"),
      message: `Trang ${newUrl} của bạn đã được thêm vào danh sách chặn`,
      type: "basic",
    });
  }

  localStorage.setItem("urls", JSON.stringify(urls));

  browser.runtime.reload();
});
//end input new url

//begin button add
document.getElementById("newUrl").addEventListener("change", function () {
  if (document.getElementById("newUrl").value === "") {
    document.getElementById("btnAdd").disabled = true;
  } else {
    document.getElementById("btnAdd").disabled = false;
  }
});
//end button add

//begin show all
document
  .getElementsByClassName("show-all")[0]
  .addEventListener("click", function () {
    //begin show table
    let urls = JSON.parse(localStorage.getItem("urls"));
    let listUrl = "";

    if (!urls) {
      localStorage.setItem("urls", JSON.stringify([]));
      urls = JSON.parse(localStorage.getItem("urls"));
    }

    for (let i = 0; i < urls.length; i++) {
      listUrl += `<tr><td>${urls[i]}</td></tr>`;
    }

    document.getElementById("table-url").innerHTML = listUrl;
    //end show table
  });
//end show all

//begin button delete
document.getElementById("url-delete").addEventListener("change", function () {
  if (document.getElementById("url-delete").value === "") {
    document.getElementById("btn-delete").disabled = true;
  } else {
    document.getElementById("btn-delete").disabled = false;
  }
});
//end button delete

//begin input delete url
document.getElementById("btn-delete").addEventListener("click", function () {
  let urlDelete = document.getElementById("url-delete").value;
  let urls = JSON.parse(localStorage.getItem("urls"));

  let patternHttps = /https/gim;
  urlDelete = urlDelete.replace(/\s/g, "");
  let resultHttps = patternHttps.test(urlDelete);

  if (!resultHttps) {
    urlDelete = "https://" + urlDelete + "/";
  }

  if (urls) {
    let result = urls.find((item) => item === urlDelete);
    if (result !== undefined) {
      let newArrayUrls = urls.filter((item) => item !== urlDelete);
      localStorage.setItem("urls", JSON.stringify(newArrayUrls));

      browser.notifications.create("", {
        title: `${manifest.name}`,
        iconUrl: browser.runtime.getURL("icons/icon-60.png"),
        message: `Trang ${urlDelete} đã được xóa khỏi danh sách chặn`,
        type: "basic",
      });
    } else {
      browser.notifications.create("", {
        title: `${manifest.name}`,
        iconUrl: browser.runtime.getURL("icons/icon-60.png"),
        message: `Trang ${urlDelete} của bạn không có trong danh sách chặn`,
        type: "basic",
      });
    }
  } else {
    browser.notifications.create("", {
      title: `${manifest.name}`,
      iconUrl: browser.runtime.getURL("icons/icon-60.png"),
      message: `Trang ${urlDelete} của bạn không có trong danh sách chặn`,
      type: "basic",
    });
  }

  browser.runtime.reload();
});
//end input delete url
