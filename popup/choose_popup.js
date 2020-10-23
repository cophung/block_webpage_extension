document.getElementById("btnAdd").disabled = true;

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("show-all-choice")) {
    return;
  }

  let urls = JSON.parse(localStorage.getItem("urls"));
  let listUrl = "";

  if (!urls) {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
  }

  for (let i = 0; i < urls.length; i++) {
    listUrl += "<li>" + urls[i] + "</li>";
  }

  document.getElementById("list-url").innerHTML = listUrl;
});

document.getElementById("newUrl").addEventListener("change", function () {
  if (document.getElementById("newUrl").value === "") {
    document.getElementById("btnAdd").disabled = true;
  } else {
    document.getElementById("btnAdd").disabled = false;
  }
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
