document.getElementById("btnAdd").disabled = true;

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
    urls.push(newUrl);
  } else {
    localStorage.setItem("urls", JSON.stringify([]));
    urls = JSON.parse(localStorage.getItem("urls"));
    urls.push(newUrl);
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
      listUrl += `<tr><td>${urls[i]}</td><td><button>Delete</button></td></tr>`;
    }

    document.getElementById("table-url").innerHTML = listUrl;
    //end show table
  });
//end show all
