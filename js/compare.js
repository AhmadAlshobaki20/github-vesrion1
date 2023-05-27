// declare variables 
let vs = document.getElementById("vs");
let btnCompare = document.querySelector("button");
let memberOne = document.getElementById("member1");
let memberTwo = document.getElementById("member2");
let firstField = document.getElementById("first-name");
let secondField = document.getElementById("second-name");
let img1 = document.getElementById("user-photo1");
let img2 = document.getElementById("user-photo2");
let firstName = document.getElementById("name1");
let firstNameRepos = document.getElementById("repos1");
let firstNameFollows = document.getElementById("follow1");
let secondName = document.getElementById("name2");
let secondNameRepos = document.getElementById("repos2");
let secondNameFollows = document.getElementById("follow2");
let result = document.getElementById("result");
let vector = document.getElementById("vector");
let hampurgarIcon = document.getElementById("hamburgar-menue");
let list = document.getElementById("list");
// modification style 
memberOne.style = "visibility:hidden";
memberTwo.style = "visibility:hidden";
vs.style = "visibility:hidden";


btnCompare.addEventListener("click", function () {

if(firstField.value.length != 0 && secondField.value.length != 0){
  memberOne.style = "visibility:visible;";
  memberTwo.style = "visibility:visible;";
  rotate();

  fetch(`https://api.github.com/users/${firstField.value}`)
    .then((req) => req.json())
    .then((res) => {
      img1.setAttribute("src", res.avatar_url);
      firstName.textContent = res.login;
      firstNameRepos.textContent = res.public_repos + " repos";
      firstNameFollows.textContent = res.followers + " followers";
    
      // store the data into variable  
      let user1Name = res.login;
      let user1Repos = +res.public_repos;
      let user1Followers = +res.followers;
        
      fetch(`https://api.github.com/users/${secondField.value}`)
        .then((req) => req.json())
        .then((res) => {
          img2.setAttribute("src", res.avatar_url);
          secondName.textContent = res.login;
          secondNameRepos.textContent = res.public_repos + " repos";
          secondNameFollows.textContent = res.followers + " followers";
          
          // store the data into variable 
          let user2Name = res.login;
          let user2Repos = +res.public_repos; 
          let user2Followers = +res.followers;

          // check who is winner ?  
          setTimeout(function time(){
            if(user1Repos > user2Repos){
              vs.setAttribute("src","../image/winner.png");
              result.textContent = user1Name
            }else if(user1Repos < user2Repos){
              result.textContent = user2Name
              vs.setAttribute("src","../image/winner.png");
            }else{
              if(user1Followers > user2Followers){
                vs.setAttribute("src","../image/winner.png");
                result.textContent = user1Name
              }else if(user1Followers < user2Followers){
              vs.setAttribute("src","../image/winner.png");
              result.textContent = user2Name
              }else{
                vs.setAttribute("src","../image/equal.png")
                result.textContent = "Tie";
              }
            }
          }, 2000);
        }); //inner fetch
    }); //outer fetch
  }
});

// rotate vs
function rotate() {
  for (let i = 0; i <= 360; i += 90) {
    vs.style = `rotate:${i}deg; transition:all 2s ease`;
    memberOne.style = `rotate:${-i}deg; transition:all 2s ease`;
    memberTwo.style = `rotate:${-i}deg; transition:all 2s ease`;
    console.log(vs.getAttribute("style"));
  }
}
// hampurgarMenue;
list.style = "display:none;";
let flag_hide = true;
hampurgarIcon.addEventListener("click", function () {
  if (flag_hide == true) {
    flag_hide = false;
    list.style = "display:flex;";
  }else{
    flag_hide = true;
    list.style = "display:none;";
  }
});