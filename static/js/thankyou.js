checkUser();

// 檢查登入
function checkUser() {
    let url = "/api/user"
    fetch(url)
      .then(response => response.json())
      .then(function (result) {
        if (result["data"] != null) {
            let orderNumber = window.location.search.split('=')[1];
            getPaymentStatus(orderNumber)
        } else {
            window.location= '/'; 
        }
      });
  }


function getPaymentStatus(number){
    let url = "api/order/" + number
    fetch(url)
      .then(response => response.json())
      .then(function (result) {
        //   console.log(result)
        if (result["data"] != null) {
            randerThanks(result["data"]);
        } else {
            randerThanksNull();
        }
      });
}

function randerThanks(payData){
    const imgTitle = document.querySelector(".imgTitle");
    const h1PayTitle = document.querySelector(".payTitle");
    const pPayId = document.querySelector(".payId");
    const pPayStatus = document.querySelector(".payStatus");
    const pRember = document.querySelector(".rember");

    pPayId.textContent = payData["number"];
    pPayStatus.textContent = payData["status"]

    if(payData["status"] == "已付款"){
        h1PayTitle.textContent = "行程預定成功";
        imgTitle.setAttribute("src","../static/src/payChecked.png")
    }else if (payData["status"] == "未付款"){
        h1PayTitle.textContent = "行程預定尚未完成";
        imgTitle.setAttribute("src","../static/src/payWarning.png")
        pRember.textContent="請記住此編號，盡快完成付款動作";
    }
}

function randerThanksNull(){
    const imgTitle = document.querySelector(".imgTitle");
    const h1PayTitle = document.querySelector(".payTitle");
    const pPayId = document.querySelector(".payId");
    const pPayStatus = document.querySelector(".payStatus");
    const pRember = document.querySelector(".rember");

    imgTitle.setAttribute("src","../static/src/payQuestion.png")
    h1PayTitle.textContent = "未找到此行程"
    pPayId.textContent = "未找到此行程";
    pPayStatus.textContent ="未找到此行程";
    pRember.textContent="";
}

// 調整 footer 高度
window.addEventListener("DOMContentLoaded", function () {
    // 選定頁面中 footer
    const footer = document.querySelector(".footer");
  
    const footerHeight = function () {
      const { top, bottom } = footer.getBoundingClientRect();
      heightToBottom = window.innerHeight - top;
      // console.log(top+" , "+bottom+" , "+window.innerHeight)
      // 設定footer高度
      footer.style.height = heightToBottom + "px";
    }
  
    footerHeight();
    window.addEventListener("resize", footerHeight);
})