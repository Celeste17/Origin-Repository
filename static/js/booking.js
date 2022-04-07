checkUser();
const headerBG = document.querySelector(".headerBG");
const headerMain = document.querySelector(".headerMain");

// 檢查登入，取得名字
function checkUser() {
  let url = "/api/user"
  fetch(url)
    .then(response => response.json())
    .then(function (result) {
      if (result["data"] != null) {
        // console.log(result["data"]["name"])
        randerName(result["data"]["name"]);
        checkBooking();
      } else {
      }
    });
}

// 檢查是否有預定行程記錄
function checkBooking() {
  let url = "/api/booking"
  fetch(url)
    .then(response => response.json())
    .then(function (result) {
      if (result["data"] != null) {
        // console.log(result["data"]);
        randerContant(result["data"]);
        const footer = document.querySelector(".footer");
        footer.style.height = "";

        const btnDelete = document.querySelector(".btnDelete");
        btnDelete.addEventListener("click", function () {

          fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(function (result) {
            console.log(result)
            window.location.reload();
          })

        })
      } else {
        console.log(result["data"]);
        randerContantNull();
      }
    });
}

function randerName(username) {
  const h2Name = document.createElement("h2");
  h2Name.textContent = "您好，" + username + "，待預定行程如下：";
  headerMain.appendChild(h2Name);
}

function randerContant(data) {
  console.log(data);
  // header
  const divHeaderContent = document.createElement("div");
  divHeaderContent.setAttribute("class", "headerContent");

  const divHeaderContentMain = document.createElement("div");
  divHeaderContentMain.setAttribute("class", "headerContentMain");
  const imgheaderContentMain = document.createElement("img");
  imgheaderContentMain.setAttribute("class", "imgheaderContentMain");
  imgheaderContentMain.setAttribute("src", data["attraction"]["image"]);
  divHeaderContentMain.appendChild(imgheaderContentMain);

  const divHeaderInfo = document.createElement("div");
  divHeaderInfo.setAttribute("class", "headerInfo");
  const h1HeaderInfo = document.createElement("h1");
  h1HeaderInfo.textContent = "台北一日遊：景點名稱";

  const divHeaderInfoData1 = document.createElement("div");
  divHeaderInfoData1.setAttribute("class", "headerInfoData");
  const h3HeaderInfoData1 = document.createElement("h3");
  const pHeaderInfoData1 = document.createElement("p");
  h3HeaderInfoData1.textContent = "日期：";
  pHeaderInfoData1.textContent = data["date"];
  divHeaderInfoData1.appendChild(h3HeaderInfoData1) && divHeaderInfoData1.appendChild(pHeaderInfoData1);

  const divHeaderInfoData2 = document.createElement("div");
  divHeaderInfoData2.setAttribute("class", "headerInfoData");
  const h3HeaderInfoData2 = document.createElement("h3");
  const pHeaderInfoData2 = document.createElement("p");
  h3HeaderInfoData2.textContent = "時間：";
  if (data["time"] == "morning") pHeaderInfoData2.textContent = "早上9點至中午12點";
  else if (data["time"] == "afternoon") pHeaderInfoData2.textContent = "下午1點至下午4點";
  divHeaderInfoData2.appendChild(h3HeaderInfoData2) && divHeaderInfoData2.appendChild(pHeaderInfoData2);

  const divHeaderInfoData3 = document.createElement("div");
  divHeaderInfoData3.setAttribute("class", "headerInfoData");
  const h3HeaderInfoData3 = document.createElement("h3");
  const pHeaderInfoData3 = document.createElement("p");
  h3HeaderInfoData3.textContent = "費用：";
  pHeaderInfoData3.textContent = data["price"];
  divHeaderInfoData3.appendChild(h3HeaderInfoData3) && divHeaderInfoData3.appendChild(pHeaderInfoData3);

  const divHeaderInfoData4 = document.createElement("div");
  divHeaderInfoData4.setAttribute("class", "headerInfoData");
  const h3HeaderInfoData4 = document.createElement("h3");
  const pHeaderInfoData4 = document.createElement("p");
  h3HeaderInfoData4.textContent = "地點：";
  pHeaderInfoData4.textContent = data["attraction"]["address"];
  divHeaderInfoData4.appendChild(h3HeaderInfoData4) && divHeaderInfoData4.appendChild(pHeaderInfoData4);

  const divHeaderDelete = document.createElement("div");
  divHeaderDelete.setAttribute("class", "headerDelete");
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btnDelete");
  const imgDelete = document.createElement("img");
  imgDelete.setAttribute("class", "imgDelete");
  imgDelete.setAttribute("src", "../static/src/icon_delete.png");
  btnDelete.appendChild(imgDelete);
  divHeaderDelete.appendChild(btnDelete);

  divHeaderInfo.appendChild(h1HeaderInfo) && divHeaderInfo.appendChild(divHeaderInfoData1) && divHeaderInfo.appendChild(divHeaderInfoData2) && divHeaderInfo.appendChild(divHeaderInfoData3) && divHeaderInfo.appendChild(divHeaderInfoData4);
  divHeaderContent.appendChild(divHeaderContentMain) && divHeaderContent.appendChild(divHeaderInfo);
  headerMain.appendChild(divHeaderContent);
  headerBG.appendChild(divHeaderDelete);

  // middle-1
  const divMiddleA = document.querySelector(".middleA");
  const divMiddleBG_A = document.createElement("div");
  divMiddleBG_A.setAttribute("class", "middleBG")
  const h2Middle_A = document.createElement("h2");
  h2Middle_A.textContent = "您的聯絡資訊";

  const divMiddleInfoDataA1 = document.createElement("div")
  divMiddleInfoDataA1.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataA1 = document.createElement("h3");
  const inputMiddleInfoDataA1 = document.createElement("input");
  h3MiddleInfoDataA1.textContent = "聯絡姓名：";
  divMiddleInfoDataA1.appendChild(h3MiddleInfoDataA1) && divMiddleInfoDataA1.appendChild(inputMiddleInfoDataA1);

  const divMiddleInfoDataA2 = document.createElement("div");
  divMiddleInfoDataA2.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataA2 = document.createElement("h3");
  const inputMiddleInfoDataA2 = document.createElement("input");
  h3MiddleInfoDataA2.textContent = "聯絡信箱：";
  divMiddleInfoDataA2.appendChild(h3MiddleInfoDataA2) && divMiddleInfoDataA2.appendChild(inputMiddleInfoDataA2);

  const divMiddleInfoDataA3 = document.createElement("div");
  divMiddleInfoDataA3.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataA3 = document.createElement("h3");
  const inputMiddleInfoDataA3 = document.createElement("input");
  h3MiddleInfoDataA3.textContent = "手機號碼：";
  divMiddleInfoDataA3.appendChild(h3MiddleInfoDataA3) && divMiddleInfoDataA3.appendChild(inputMiddleInfoDataA3);

  divMiddleBG_A.appendChild(h2Middle_A) && divMiddleBG_A.appendChild(divMiddleInfoDataA1) && divMiddleBG_A.appendChild(divMiddleInfoDataA2) && divMiddleBG_A.appendChild(divMiddleInfoDataA3);
  divMiddleA.appendChild(divMiddleBG_A);

  // middle-2
  const divMiddleB = document.querySelector(".middleB");
  const divMiddleBG_B = document.createElement("div");
  divMiddleBG_B.setAttribute("class", "middleBG")
  const h2Middle_B = document.createElement("h2");
  h2Middle_B.textContent = "信用卡付款資訊";

  const divMiddleInfoDataB1 = document.createElement("div")
  divMiddleInfoDataB1.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataB1 = document.createElement("h3");
  const inputMiddleInfoDataB1 = document.createElement("input");
  h3MiddleInfoDataB1.textContent = "卡片號碼：";
  inputMiddleInfoDataB1.setAttribute("placeholder", "**** **** **** ****");
  divMiddleInfoDataB1.appendChild(h3MiddleInfoDataB1) && divMiddleInfoDataB1.appendChild(inputMiddleInfoDataB1);

  const divMiddleInfoDataB2 = document.createElement("div");
  divMiddleInfoDataB2.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataB2 = document.createElement("h3");
  const inputMiddleInfoDataB2 = document.createElement("input");
  h3MiddleInfoDataB2.textContent = "過期時間：";
  inputMiddleInfoDataB2.setAttribute("placeholder", "MM/YY");
  divMiddleInfoDataB2.appendChild(h3MiddleInfoDataB2) && divMiddleInfoDataB2.appendChild(inputMiddleInfoDataB2);

  const divMiddleInfoDataB3 = document.createElement("div");
  divMiddleInfoDataB3.setAttribute("class", "middleInfoData")
  const h3MiddleInfoDataB3 = document.createElement("h3");
  const inputMiddleInfoDataB3 = document.createElement("input");
  h3MiddleInfoDataB3.textContent = "驗證密碼：";
  inputMiddleInfoDataB3.setAttribute("placeholder", "CVV");
  divMiddleInfoDataB3.appendChild(h3MiddleInfoDataB3) && divMiddleInfoDataB3.appendChild(inputMiddleInfoDataB3);

  divMiddleBG_B.appendChild(h2Middle_B) && divMiddleBG_B.appendChild(divMiddleInfoDataB1) && divMiddleBG_B.appendChild(divMiddleInfoDataB2) && divMiddleBG_B.appendChild(divMiddleInfoDataB3);
  divMiddleB.appendChild(divMiddleBG_B);

  // confirm
  const confirm = document.querySelector(".confirm");
  const divConfirmBG = document.createElement("div");
  divConfirmBG.setAttribute("class", "confirmBG");
  const pConfirmPrice = document.createElement("p");
  pConfirmPrice.textContent = "總價：新台幣" + data["price"] + "元";
  const btnConfirm = document.createElement("button");
  btnConfirm.textContent = "確認訂購並付款";

  divConfirmBG.appendChild(pConfirmPrice) && divConfirmBG.appendChild(btnConfirm);
  confirm.appendChild(divConfirmBG);
}

function randerContantNull() {
  const pNull = document.createElement("p");
  pNull.setAttribute("class", "nothing")
  pNull.textContent = "目前沒有任何待預定的行程";
  headerMain.appendChild(pNull);
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