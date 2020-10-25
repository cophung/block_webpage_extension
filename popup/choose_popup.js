let manifest = browser.runtime.getManifest();

let btnAdd = document.getElementById("btn-add");
let btnDel = document.getElementById("btn-delete");
let docNewUrl = document.getElementById("new-url");
let docDelUrl = document.getElementById("url-delete");
let btnShowAll = document.getElementById("show-all");
let tableUrl = document.getElementById("table-url");

btnAdd.disabled = true;
btnDel.disabled = true;

function browserNof(id, newUrl, event) {
  browser.notifications.create(id, {
    title: `${manifest.name}`,
    iconUrl: browser.runtime.getURL("icons/icon-60.png"),
    message: `Trang ${newUrl} ${event}`,
    type: "basic",
  });
}

//begin input new url
btnAdd.addEventListener("click", function () {
  let newUrl = docNewUrl.value;
  let urls = JSON.parse(localStorage.getItem("urls"));
  let patternHttps = /https/gim;
  let resultHttps = patternHttps.test(newUrl); //test exist https

  newUrl = newUrl.replace(/\s/g, "");

  if (!resultHttps) {
    newUrl = "https://" + newUrl + "/";
  }

  if (urls) {
    if (urls.find((item) => item === newUrl)) {
      browserNof("handlePopup", newUrl, "đã tồn tại trong danh sách chặn");
    } else {
      urls.push(newUrl);
      browserNof("handlePopup", newUrl, "đã được thêm vào danh sách chặn");
    }
  } else {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
    urls.push(newUrl);
    browserNof("handlePopup", newUrl, "đã được thêm vào danh sách chặn");
  }

  localStorage.setItem("urls", JSON.stringify(urls));

  browser.runtime.reload();
});
//end input new url

//begin button add
docNewUrl.addEventListener("change", function () {
  if (docNewUrl.value === "") {
    btnAdd.disabled = true;
  } else {
    btnAdd.disabled = false;
  }
});
//end button add

//begin show all
btnShowAll.addEventListener("click", function () {
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

  tableUrl.innerHTML = listUrl;
  //end show table
});
//end show all

//begin button delete
docDelUrl.addEventListener("change", function () {
  if (docDelUrl.value === "") {
    btnDel.disabled = true;
  } else {
    btnDel.disabled = false;
  }
});
//end button delete

//begin input delete url
btnDel.addEventListener("click", function () {
  let urlDelete = docDelUrl.value;
  let urls = JSON.parse(localStorage.getItem("urls"));
  let patternHttps = /https/gim;
  let resultHttps = patternHttps.test(urlDelete); //test exist https

  urlDelete = urlDelete.replace(/\s/g, "");

  if (!resultHttps) {
    urlDelete = "https://" + urlDelete + "/";
  }

  if (urls) {
    let result = urls.find((item) => item === urlDelete);
    if (result !== undefined) {
      let newArrayUrls = urls.filter((item) => item !== urlDelete);
      localStorage.setItem("urls", JSON.stringify(newArrayUrls));
      browserNof("handlePopup", urlDelete, "đã được xóa khỏi danh sách chặn");
    } else {
      browserNof("handlePopup", urlDelete, "không có trong danh sách chặn");
    }
  } else {
    browserNof("handlePopup", urlDelete, "không có trong danh sách chặn");
  }

  browser.runtime.reload();
});
//end input delete url
