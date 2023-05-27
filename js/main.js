let mode = document.getElementById("mode");
let searchField1 = document.getElementById("search1");
let searchField2 = document.getElementById("search2");
let searchIcon1 = document.getElementById("search-icon1");
let searchIcon2 = document.getElementById("search-icon2");
let avatar = document.getElementById("user-photo");
let userName = document.getElementById("user-name");
let loginName = document.getElementById("name");
let numFollowers = document.getElementById("num-followers");
let numFollowing = document.getElementById("num-following");
let loc = document.getElementById("location");
let time = document.getElementById("time");
let repo = document.querySelectorAll(".repo");
let lang = document.querySelectorAll(".type-lang");
let userImage = document.getElementById("user");
let hampurgarIcon = document.getElementById("hampurgar-menue");
let list = document.getElementById("list");

/*-------------------------------------------dark mode----------------------------------------------*/
mode.addEventListener("click", function () {
  if (document.body.classList.contains("mode")) {
    $("#user-name").css("color", "white");
    $("#name").css("color", "white");
    $(".edit").css("color", "white");
    $(".content-bar").css("color", "white");
    $(".card").css("color", "white");
    $("svg").css("fill", "white");
    $(".repo span").css("background-color", "black");
    $(".card").css("background-color", "black");
    $(".repo span").css("border", "2px solid gray");
    mode.setAttribute(
      "class",
      "fa-sharp fa-solid fa-circle-half-stroke fa-rotate-0"
    );
  } else if (!document.body.classList.contains("mode")) {
    $("#user-name").css("color", "black");
    $("#name").css("color", "black");
    $(".edit").css("color", "black");
    $(".content-bar").css("color", "black");
    $(".card").css("color", "black");
    $("svg").css("fill", "black");
    $(".repo span").css("background-color", "white");
    $(".repo span").css("border", "2px solid gray");
    $(".card").css("background-color", "white");
    mode.setAttribute(
      "class",
      "fa-sharp fa-solid fa-circle-half-stroke fa-rotate-180"
    );
    mode.style.transition = "all 0.4s ease";
  }
  document.body.classList.toggle("mode");
});
/*-------------------------------------------dark mode----------------------------------------------*/
searchIcon1.addEventListener("click", function () {
  getInfo(searchField1)
});
searchIcon2.addEventListener("click", function () {
  getInfo(searchField2)
});


/* ---------------------------------------compare functions-----------------------------------------*/
function getInfo(Field){
  fetch(`https://api.github.com/users/${Field.value}`)
  .then((req) => req.json())
  .then((res) => {
    avatar.setAttribute("src", res.avatar_url);
    userImage.style = "border-radius:50%;";
    userImage.setAttribute("src", res.avatar_url);
    userName.textContent = res.login;
    numFollowers.textContent = res.followers;
    numFollowing.textContent = res.following;
    loc.innerHTML = `<span>${res.location}.</span>`;
    time.innerHTML = `<span>${res.created_at}.</span>`;
    console.log(res.repos_url);
    fetch(`${res.repos_url}`)
      .then((request) => request.json())
      .then((response) => {
        for (let i = 0; i < 6; i++) {
          repo[i].firstElementChild.textContent = response[i]["name"];
          repo[i].lastElementChild.textContent = response[i]["visibility"];
          repo[i].firstElementChild.setAttribute(
            "href",
            response[i].html_url
          );
          lang[i].lastElementChild.textContent = response[i]["language"];
          if (response[i]["language"] == "JavaScript") {
            lang[i].firstElementChild.style = "background-color:orange;";
          } else if (response[i]["language"] == "CSS") {
            lang[i].firstElementChild.style =
              "background-color:rgb(33, 28, 84);";
          } else if (response[i]["language"] == "PHP") {
            lang[i].firstElementChild.style = "background-color:green;";
          } else {
            lang[i].firstElementChild.style = "background-color:red;";
          }
        }
      });
  });
}

/*-----------------------------------hampurgarMenue-----------------------------------------------*/
list.style = "display:none;";
let flag_hide = true;
hampurgarIcon.addEventListener("click", function () {
  if (flag_hide == true) {
    flag_hide = false;
    list.style = "display:flex;";
    hampurgarIcon.setAttribute("class","fa-solid fa-x");
  }else{
    flag_hide = true;
    list.style = "display:none;";
    hampurgarIcon.setAttribute("class","fa-solid fa-bars fa-xl");
  }
});
