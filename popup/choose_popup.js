document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("page-choice")) {
    return;
  }

  var chosenPage = "https://" + e.target.textContent;
  browser.tabs.create({
    url: chosenPage,
  });
});

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
    urls.push(newUrl);
  } else {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
    urls.push(newUrl);
  }

  localStorage.setItem("urls", JSON.stringify(urls));
  browser.runtime.reload();
});
