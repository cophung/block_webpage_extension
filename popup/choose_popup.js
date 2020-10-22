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

  let httpUrl = `http://www.${newUrl}/*`;
  let httpsUrl = `https://www.${newUrl}/*`;

  let urls = JSON.parse(localStorage.getItem("urls"));

  if (urls) {
    urls.push(httpUrl, httpsUrl);
  } else {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
    urls.push(httpUrl, httpsUrl);
  }

  localStorage.setItem("urls", JSON.stringify(urls));
  browser.runtime.reload();
});
