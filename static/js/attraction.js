let slideIndex = 0;
// var numId = location.href;
let numId = location.pathname.split('/').pop();

loadAttraction(numId);

const allImg = document.querySelector(".allImg");
const btnImgLeft = document.querySelector(".btnImgLeft");
const btnImgRight = document.querySelector(".btnImgRight");
const dot = document.querySelector(".dot");

// adjustSlides(slideIndex);
let timer = window.setInterval(showSlides, 4000);

// 時段選擇
const inputOrderDate = document.getElementById("inputOrderDate");
const timeAM = document.getElementById("timeAM");
const timePM = document.getElementById("timePM");
const price = document.querySelector(".price");
let orderDepTime = "morning";

let today = new Date(), d=today.getDate(), m=today.getMonth()+1, y=today.getFullYear(),todayDate;
if(d < 10) d="0"+d;
if(m < 10) m="0"+m;
todayDate = y+"-"+m+"-"+d;

inputOrderDate.value = todayDate;
inputOrderDate.setAttribute("min",todayDate);

timeAM.addEventListener("click", function () {
  if (timeAM.checked) {
    price.textContent = "2000";
    orderDepTime = "morning";
  }
});
timePM.addEventListener("click", function () {
  if (timePM.checked) {
    price.textContent = "2500";
    orderDepTime = "afternoon";
  }
});
rdbOrderTime()

function rdbOrderTime() {
  const rdoTime = document.getElementsByName("rdoTime");
  // console.log(rdoTime)
  if (rdoTime[0].checked) {
    price.textContent = "2000";
  } else if (rdoTime[1].checked) {
    price.textContent = "2500";
  } else {
    price.textContent = "- - -"
  }
}

// 點擊開始預訂行程按鈕
const btnOrder = document.querySelector(".btnOrder");
checkUser();

// 檢查是否有登入 & 監聽「開始預訂行程」按鈕
function checkUser() {
  let url = "/api/user"
  fetch(url)
    .then(response => response.json())
    .then(function (result) {
      if(result["data"]!=null){
        // console.log("有登入")
        btnOrder.addEventListener("click", function(){
          btnOrder.setAttribute("href", "/booking");
          // console.log(window.location.pathname.split( '/' )[2]);
          // console.log(inputOrderDate.value);
          // console.log(orderDepTime);
          // console.log(price.innerText);
          // data = {
          //   "attractionId": Number(window.location.pathname.split( '/' )[2]),
          //   "date": inputOrderDate.value,
          //   "time": orderDepTime,
          //   "price": Number(price.innerText)
          // }
          // console.log(data);

          let url = "/api/booking"
          fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  'attractionId': `${Number(window.location.pathname.split( '/' )[2])}`,
                  'date': `${inputOrderDate.value}`,
                  'time': `${orderDepTime}`,
                  'price': `${Number(price.innerText)}`
              })
          })
          .then(response => response.json())
          .then(function (result) {
              // console.log(result)
              if(result["ok"]){
                window.location='/booking';
              }else if(result["error"]){
                console.log(result)
                divDialogReactIn.textContent = result["message"];
                divDialogReactIn.style.display = "flex";
                divDialogReactIn.style.color = "red";
                divDialog.insertBefore(divDialogReactIn, divChangeDialogSignIn)
              }
              
          })

          // window.location='/booking';
        })
      }else{
        // console.log("沒有登入")
        btnOrder.addEventListener("click", function(){
              divDialogBG.style.display = "block";
              divDialog.style.display = "block";
              divDialogSignInputIn.style.display = "block";
              divChangeDialogSignIn.style.display = "flex";
              divDialogSignInput.style.display = "none";
              divChangeDialogSign.style.display = "none";
              divDialogReact.style.display = "none";
              divDialogReactIn.style.display = "none";
          })
      }
    });
}

// 載入資料
function loadAttraction(id) {
  let url = "/api/attraction/" + id
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // console.log(myJson);
      let attName = myJson["data"]["name"]
      let attCate = myJson["data"]["category"]
      let attMrt = myJson["data"]["mrt"]
      let attPic = myJson["data"]["picture"]
      let attDescri = myJson["data"]["description"]
      let attAddr = myJson["data"]["address"]
      let attTrans = myJson["data"]["transport"]
      let attImgs = myJson["data"]["images"]
      showAttractionDetail(attImgs, attName, attCate, attMrt, attPic, attDescri, attAddr, attTrans)

    }).catch(function() {
      window.location.replace('/');
    });
}

// 渲染畫面
function showAttractionDetail(images, name, category, mrt, picture, description, address, transport) {
  // 圖片
  // const headerImg = document.querySelector(".headerImg");
  const divDot = document.querySelector(".divDot");
  // const allImg = document.querySelector(".allImg");
  for (let i = 0; i < images.length; i++) {
    url = images[i]
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "headerSlid");
    const img = document.createElement("img")
    img.setAttribute("src", url);
    divImg.appendChild(img);

    const spanDot = document.createElement("span");
    spanDot.setAttribute("class", "dot")
    spanDot.setAttribute("onClick", "currentSlide(" + (i + 1) + ")")
    divDot.appendChild(spanDot);
    // headerImg.insertBefore(divImg, divDot);
    allImg.appendChild(divImg);
  }
  adjustSlides(slideIndex + 1);


  // 景點名稱、類別、捷運站
  const headerTextAll = document.querySelector(".headerTextAll");
  const headerOrder = document.querySelector(".headerOrder");
  const h1Title = document.createElement("h1");
  h1Title.textContent = name;
  headerTextAll.insertBefore(h1Title, headerOrder);
  const divSubTitle = document.createElement("div");
  divSubTitle.setAttribute("class", "headerSubTitle")
  const pCate = document.createElement("p");
  const pAt = document.createElement("p");
  const pMrt = document.createElement("p");
  pCate.textContent = category;
  pAt.textContent = " at ";
  pMrt.textContent = mrt;
  divSubTitle.appendChild(pCate) && divSubTitle.appendChild(pAt) && divSubTitle.appendChild(pMrt);
  headerTextAll.insertBefore(divSubTitle, headerOrder);

  // 說明文字、地址、交通方式
  const middleBG = document.querySelector(".middleBG");
  const pDescr = document.createElement("p");
  pDescr.textContent = description;
  const divAddress = document.createElement("div");
  const h3Address = document.createElement("h3");
  const pAddress = document.createElement("p");
  h3Address.textContent = "景點地址：";
  pAddress.textContent = address;
  divAddress.appendChild(h3Address) && divAddress.appendChild(pAddress)
  const divTransport = document.createElement("div");
  const h3Transport = document.createElement("h3");
  const pTransport = document.createElement("p");
  h3Transport.textContent = "交通方式：";
  pTransport.textContent = transport;
  divTransport.appendChild(h3Transport) && divTransport.appendChild(pTransport)
  middleBG.appendChild(pDescr) && middleBG.appendChild(divAddress) && middleBG.appendChild(divTransport)
}



// 滑鼠移入停止輪播
allImg.addEventListener("mouseover", function () {
  // console.log("進入圖片")
  clearInterval(timer)
})
btnImgLeft.addEventListener("mouseover", function () {
  // console.log("進入按鈕左")
  clearInterval(timer)
})
btnImgRight.addEventListener("mouseover", function () {
  // console.log("進入按鈕右")
  clearInterval(timer)
})
if (dot) {
  dot.addEventListener("mouseover", function () {
    console.log("進入下方點點")
    clearInterval(timer)
  })
}
// 滑鼠移出繼續輪播
allImg.addEventListener("mouseout", function () {
  // console.log("離開圖片")
  clearInterval(timer)
  timer = window.setInterval(showSlides, 4000);
})

// 點擊按鈕前/後 圖片位置
function plusSlides(n) {
  clearInterval(timer)
  adjustSlides(slideIndex += n);
  timer = window.setInterval(showSlides, 4000);
}

// 點擊dot點點 圖片位置
function currentSlide(n) {
  clearInterval(timer)
  adjustSlides(slideIndex = n);
  timer = window.setInterval(showSlides, 4000);
}

// 圖片自動輪播
function showSlides(n) {
  // console.log("自動", n)
  let i;
  let slides = document.getElementsByClassName("headerSlid");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
  slideIndex++;

  // 最後一張圖片 右滑
  if (slideIndex > slides.length - 1) {
    slideIndex = 0
  }
}

// 圖片手動輪播
function adjustSlides(n) {
  // console.log("手動",n);
  let slides = document.getElementsByClassName("headerSlid");
  let dots = document.getElementsByClassName("dot");
  if (n) {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    // 最後一張圖片 右滑
    if (n > slides.length - 1) {
      slideIndex = 0
    }
    // 第一張圖片 左滑
    if (n < 0) {
      slideIndex = slides.length - 1
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
  } else {
    adjustSlides(n - 1);
  }

}