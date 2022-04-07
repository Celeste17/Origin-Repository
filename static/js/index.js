const inputKeyword = document.querySelector(".inputKeyword");
const btnSearch = document.querySelector(".btnSearch");
const ul = document.querySelector(".attractions");

let page = 0;
let around = false;
let keyword = "";
loadImage();

// 搜尋按鈕
btnSearch.addEventListener("click", function(){
  keyword = inputKeyword.value
  console.log(keyword)
  ul.innerHTML=""
  page=0
  loadImage()
})

// 載入更多
window.addEventListener("DOMContentLoaded", function() {
  // 選定頁面中 footer
  const footer = document.querySelector(".footer");

  const footerHeight = function() {
    const {top, bottom} = footer.getBoundingClientRect();
    heightToBottom = window.innerHeight-top;
    console.log(top+" , "+bottom+" , "+window.innerHeight)
    // 設定footer高度
    footer.style.height = heightToBottom+"px";
  }
  footerHeight();
  
  const lazyLoad = function() {
    const {top, bottom} = footer.getBoundingClientRect();
    // console.log(top+" , "+bottom+" , "+window.innerHeight)
    // console.log(footer.getBoundingClientRect().top , footer.getBoundingClientRect().bottom)
    
    // 確認footer是否進到可視範圍 
    ////// && footer.getBoundingClientRect().bottom >= 0
    if ((footer.getBoundingClientRect().top <= window.innerHeight)) {
      if (!around){
        if(page != null){
          loadImage();
        }
        around = true;
        // 設定footer高度
        footer.style.height = "";
      }
    }
  }

  // 註冊 scroll 事件監聽器，使用者滑動頁面觸發 lazyLoad 
  window.addEventListener("scroll", lazyLoad)
})


// 載入資料
function loadImage(){
  let url = ""
    if(keyword==""){
      // console.log(page)
      // url = '/api/attractions?page='+page+'&keyword='+keyword
      url = '/api/attractions?page='+page
    }else{
      // console.log(page)
      // url = '/api/attractions?page='+page
      url = '/api/attractions?page='+page+'&keyword='+keyword
    }
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // console.log(myJson);
      // console.log(myJson["data"][0].images[0]);
      // console.log(myJson["data"].length);
      // console.log("nextPage："+myJson["nextPage"])
      if(myJson["data"]){
         myJson["data"].forEach(function(item,index){
            // console.log(index, item.name, item.category, item.mrt, item.images[0]);
            showAttraction(item.name, item.category, item.mrt, item.images[0], item.id)
        })
      }else{
        // const divPhoto = document.querySelector(".photo");
        const pError = document.createElement("p");
        pError.textContent = myJson["message"]
        ul.setAttribute("style","display:flex; justify-content: center; padding:30px")
        ul.appendChild(pError);
        around = false;
      }
      
      page = myJson["nextPage"]
    });
  }

// 渲染畫面
function showAttraction(name, category, mrt, picture, id){
    const pMRT = document.createElement("p");
    const pCat = document.createElement("p");
    const divP = document.createElement("div");
    const pName = document.createElement("p");
    const divImg = document.createElement("div");
    const li = document.createElement("li");
    const a = document.createElement("a");

    pMRT.textContent = mrt
    pCat.textContent =category
    divP.setAttribute("class", "category")
    pName.setAttribute("class","attractionName")
    pName.textContent = name
    divImg.setAttribute("class", "adjustPic")
    divImg.setAttribute("style", "background-image: url(" + picture + ");")
    
    url = "/attraction/"+id
    a.setAttribute("href", url)
    a.setAttribute("class","gotoDetail")
    ul.setAttribute("style"," padding-top: 55px; padding-bottom: 25px;")

    divP.appendChild(pMRT) && divP.appendChild(pCat);
    li.appendChild(divImg) && li.appendChild(pName) &&li.appendChild(divP);
    a.appendChild(li);
    ul.appendChild(a);
    // ul.appendChild(li);
    around = false;
}





// // const divPhoto = document.querySelector(".photo");
// // 響鈴條件：設定和控制在哪些情況下，呼叫 callback 函式
// let options = { // root: divPhoto,
//                 rootMargin: "-100px",
//                 threshold:0.6
//               }

// // 條件達成做什麼：符合設定條件下，目標進入或離開 viewport 時觸發此 callback 函式
// let callback = (entries, observer) => {
//   // entries 能拿到所有目標元素進出(intersect)變化的資訊
//   entries.forEach(entry => {
//     // 取得每個 entry 資訊做一些處理或工作
//     if (entry.isIntersecting) {
//       //  只在目標元素進入 viewport 時執行這裡的工作
//       console.log("entry")
//     } else {
//       // 只在目標元素離開 viewport 時執行這裡的工作
//       console.log("exit")
//       loadImage(1)
//     }
//   })
// }

// let observer = new IntersectionObserver(callback, options)
// //  選定要觀察的對象
// const footer = document.querySelector(".footer");
// // 設定觀察
// observer.observe(footer)