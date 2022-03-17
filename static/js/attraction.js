
let slideIndex = 1;
// var numId = location.href;
let numId = location.pathname.split('/').pop();

// showSlides(slideIndex);
loadAttraction(numId);


// 時段選擇
const timeAM = document.getElementById("timeAM");
const timePM = document.getElementById("timePM");
const price = document.querySelector(".price");
timeAM.addEventListener("click",function(){
  if (timeAM.checked){
    price.textContent = "2000";
  }
});
timePM.addEventListener("click",function(){
  if (timePM.checked){
    price.textContent = "2500";
  }
});
rdbOrderTime()

function rdbOrderTime(){
  const rdoTime = document.getElementsByName("rdoTime");
  console.log(rdoTime)
  if(rdoTime[0].checked){
    price.textContent = "2000";
  }else if(rdoTime[1].checked){
    price.textContent = "2500";
  }else{
    price.textContent = "- - -"
  }
}

// 載入資料
function loadAttraction(id) {
  let url = "/api/attraction/"+id
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
    });
}

// 渲染畫面
function showAttractionDetail(images, name, category, mrt, picture, description, address, transport) {
  // 圖片
  const headerImg = document.querySelector(".headerImg");
  const divDot = document.querySelector(".divDot");
  for(let i=0; i<images.length; i++){
    url = images[i]
    const divImg = document.createElement("div");
    divImg.setAttribute("class","headerSlid");
    const img = document.createElement("img")
    img.setAttribute("src",url);
    divImg.appendChild(img);

    const spanDot = document.createElement("span");
    spanDot.setAttribute("class","dot")
    spanDot.setAttribute("onClick","currentSlide("+(i+1)+")")
    divDot.appendChild(spanDot);
    headerImg.insertBefore(divImg, divDot);
    divDot.append(spanDot);
  }
  showSlides(slideIndex);


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


// 點擊按鈕前/後 圖片位置
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// 點擊dot點點 圖片位置
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// 圖片輪播
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("headerSlid");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}