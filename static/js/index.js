// const inputKeyword = document.querySelector(".inputKeyword");
// const body = document.querySelector("body");
const divPhoto = document.querySelector(".photo");

window.addEventListener("scroll", function(e){
    const {top, bottom} = divPhoto.getBoundingClientRect();
    if(bottom <= 10){
        console.log("底端")
    }else if(top <= this.window.innerHeight){
        console.log("進入")
    }
    console.log(top+" , "+bottom)
})


// 載入第一頁景點
fetch('/api/attractions?page=0')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    // console.log(myJson);
    // console.log(myJson["data"][0].images[0]);
    // console.log(myJson["data"].length);
    console.log("nextPage："+myJson["nextPage"])
    myJson["data"].forEach(function(item,index){
        // console.log(index, item.name, item.category, item.mrt, item.images[0]);
        showAttraction(item.name, item.category, item.mrt, item.images[0])
    })
  });

function showAttraction(name, category, mrt, picture){
    const pMRT = document.createElement("p");
    const pCat = document.createElement("p");
    const divP = document.createElement("div");
    const pName = document.createElement("p");
    // const img = document.createElement("img");
    const divImg = document.createElement("div");
    const li = document.createElement("li");
    const ul = document.querySelector(".attractions");

    pMRT.textContent = mrt
    pCat.textContent =category
    divP.setAttribute("class", "category")
    pName.setAttribute("class","attractionName")
    pName.textContent = name
    // img.setAttribute("src", picture)
    divImg.setAttribute("class", "adjustPic")
    divImg.setAttribute("style", "background-image: url(" + picture + ");")


    divP.appendChild(pMRT) && divP.appendChild(pCat);
    li.appendChild(divImg) && li.appendChild(pName) &&li.appendChild(divP);
    ul.appendChild(li);
}



// const inputKeyword = document.querySelector(".inputKeyword");
// const attractions = document.querySelector(".attractions");

// url = "/api/members?username=" + username
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         }).then(function (result) {
//             // console.log(result)
//             showResult(result)
//         })


// function fetchAttraction(){
//     url = "/api/attractions"
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         }).then(function (result) {
//             console.log(result)
//             // showResult(result)
//         })
// }
