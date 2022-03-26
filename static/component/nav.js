checkUser();

// header
// const divTop = document.createElement("div");
const divTop = document.querySelector(".top");
const divTopContent = document.createElement("div");
divTopContent.setAttribute("class", "topContent")

const divTopTitle = document.createElement("div");
divTopTitle.setAttribute("class", "topTitle")
const pTitle = document.createElement("p");
const aTitle = document.createElement("a");
aTitle.setAttribute("href", "/");
aTitle.textContent = "台北一日遊";
pTitle.appendChild(aTitle);
divTopTitle.appendChild(pTitle);

const divTopMenu = document.createElement("div");
divTopMenu.setAttribute("class", "topMenu");
const ulTopMenu = document.createElement("ul");
ulTopMenu.setAttribute("class", "menu");

const liTopMenuBook = document.createElement("li");
const aTopMenuBook = document.createElement("a");
// aTopMenuBook.setAttribute("href", "#");
aTopMenuBook.textContent = "預定行程";
liTopMenuBook.appendChild(aTopMenuBook);
const liTopMenuSign = document.createElement("li");
const aTopMenuSign = document.createElement("a");
// aTopMenuSign.setAttribute("href", "#");
aTopMenuSign.textContent = "登入/註冊";
liTopMenuSign.appendChild(aTopMenuSign);

ulTopMenu.appendChild(liTopMenuBook) && ulTopMenu.appendChild(liTopMenuSign);
divTopMenu.appendChild(ulTopMenu);

divTopContent.appendChild(divTopTitle) && divTopContent.appendChild(divTopMenu);
divTop.appendChild(divTopContent);

const body = document.body;

// 預定行程
liTopMenuBook.addEventListener("click", function(){
    console.log("a預定行程")
})

// 登入/註冊跳窗
const divDialogBG = document.createElement("div");
divDialogBG.setAttribute("class", "divdialogBG");
const divDialog = document.createElement("div");
divDialog.setAttribute("class", "dialogSign");

// 標題
const divDialogSignTitle = document.createElement("div");
divDialogSignTitle.setAttribute("class", "dialogSignTitle");
const h3DialogSignTitle = document.createElement("h3");
h3DialogSignTitle.textContent = "登入會員帳號";
const btnCloseDialogSign = document.createElement("button");
btnCloseDialogSign.setAttribute("class", "btnCloseDialogSign");
const imgCloseDialogSign = document.createElement("img");
imgCloseDialogSign.setAttribute("src", "../static/src/icon_close.png");
btnCloseDialogSign.appendChild(imgCloseDialogSign);
divDialogSignTitle.appendChild(h3DialogSignTitle) && divDialogSignTitle.appendChild(btnCloseDialogSign);

// 註冊 div
const divDialogSignInput = document.createElement("div");
divDialogSignInput.setAttribute("class", "dialogSignInput");
// 註冊欄位 - 1
const inputdialogSignName = document.createElement("input");
inputdialogSignName.setAttribute("type", "text");
inputdialogSignName.setAttribute("placeholder", "輸入姓名");
inputdialogSignName.setAttribute("name", "signUpName");
inputdialogSignName.setAttribute("autocomplete", "off");
// 註冊欄位 - 2
const inputdialogSignEmail = document.createElement("input");
inputdialogSignEmail.setAttribute("type", "email");
inputdialogSignEmail.setAttribute("placeholder", "輸入電子郵件");
inputdialogSignEmail.setAttribute("name", "signUpEmail");
inputdialogSignEmail.setAttribute("autocomplete", "off");
// 註冊欄位 - 3
const inputdialogSignPassword = document.createElement("input");
inputdialogSignPassword.setAttribute("type", "password");
inputdialogSignPassword.setAttribute("placeholder", "輸入密碼");
inputdialogSignPassword.setAttribute("name", "signUpPassword");
inputdialogSignPassword.setAttribute("autocomplete", "off");
// 註冊按鈕
const btnDialogSign = document.createElement("button");
btnDialogSign.setAttribute("class", "btnDialogSign");
btnDialogSign.textContent = "註冊新帳戶";

divDialogSignInput.appendChild(inputdialogSignName) && divDialogSignInput.appendChild(inputdialogSignEmail) && 
divDialogSignInput.appendChild(inputdialogSignPassword) && divDialogSignInput.appendChild(btnDialogSign);

// 註冊 -> 登入
const divChangeDialogSign = document.createElement("div");
divChangeDialogSign.setAttribute("class", "changeDialogSign");
const pChangeDialogSign = document.createElement("p");
const aChangeDialogSign = document.createElement("a");
// aChangeDialogSign.setAttribute("href", "#");
aChangeDialogSign.textContent = "點此登入";
pChangeDialogSign.textContent = "已有帳戶了？";
pChangeDialogSign.appendChild(aChangeDialogSign);
divChangeDialogSign.appendChild(pChangeDialogSign);

// 執行訊息 - 註冊
const divDialogReact = document.createElement("div");
divDialogReact.setAttribute("class", "dialogReact");
const pDialogReact = document.createElement("p");
pDialogReact.textContent = "錯誤註冊";
divDialogReact.appendChild(pDialogReact);

// 登入 div
const divDialogSignInputIn = document.createElement("div");
divDialogSignInputIn.setAttribute("class", "dialogSignInput");
// 登入欄位 - 1
const inputdialogSignEmailIn = document.createElement("input");
inputdialogSignEmailIn.setAttribute("type", "email");
inputdialogSignEmailIn.setAttribute("placeholder", "輸入電子信箱");
inputdialogSignEmailIn.setAttribute("name", "signInPassword");
// 登入欄位 - 2
const inputdialogSignPasswordIn = document.createElement("input");
inputdialogSignPasswordIn.setAttribute("type", "password");
inputdialogSignPasswordIn.setAttribute("placeholder", "輸入密碼");
inputdialogSignPasswordIn.setAttribute("name", "signInPassword");
// 登入按鈕
const btnDialogSignIn = document.createElement("button");
btnDialogSignIn.setAttribute("class", "btnDialogSign");
btnDialogSignIn.textContent = "登入新帳戶";

divDialogSignInputIn.appendChild(inputdialogSignEmailIn) && divDialogSignInputIn.appendChild(inputdialogSignPasswordIn) && 
divDialogSignInputIn.appendChild(btnDialogSignIn);

// 登入 -> 註冊
const divChangeDialogSignIn = document.createElement("div");
divChangeDialogSignIn.setAttribute("class", "changeDialogSign");
const pChangeDialogSignIn = document.createElement("p");
const aChangeDialogSignIn = document.createElement("a");
// aChangeDialogSignIn.setAttribute("href", "#");
aChangeDialogSignIn.textContent = "點此註冊";
pChangeDialogSignIn.textContent = "還沒有帳戶了？";
pChangeDialogSignIn.appendChild(aChangeDialogSignIn);
divChangeDialogSignIn.appendChild(pChangeDialogSignIn);

// 執行訊息 - 登入
const divDialogReactIn = document.createElement("div");
divDialogReactIn.setAttribute("class", "dialogReact");
const pDialogReactIn = document.createElement("p");
pDialogReactIn.textContent = "錯誤登入";
divDialogReactIn.appendChild(pDialogReactIn);

divDialog.appendChild(divDialogSignTitle) && 
divDialog.appendChild(divDialogSignInput) &&
divDialog.appendChild(divChangeDialogSign) &&
divDialog.appendChild(divDialogSignInputIn) &&
divDialog.appendChild(divChangeDialogSignIn);

divDialog.insertBefore(divDialogReact, divChangeDialogSign);
divDialog.insertBefore(divDialogReactIn, divChangeDialogSignIn);

divDialogBG.appendChild(divDialog);

body.appendChild(divDialogBG);

// 點擊 登入註冊
// liTopMenuSign.addEventListener("click", function(){
//     divDialogBG.style.display = "block";
//     divDialog.style.display = "block";
//     divDialogSignInputIn.style.display = "block";
//     divChangeDialogSignIn.style.display = "flex";
//     divDialogSignInput.style.display = "none";
//     divChangeDialogSign.style.display = "none";

//    divDialogReact.style.display = "none";
//    divDialogReactIn.style.display = "none";
// })

// 登入 -> 註冊
aChangeDialogSignIn.addEventListener("click",function(){
    // 顯示註冊畫面 & 隱藏登入畫面
    h3DialogSignTitle.textContent = "註冊會員帳號";
    divDialogSignInput.style.display = "block";
    divChangeDialogSign.style.display = "flex";
    divDialogSignInputIn.style.display = "none";
    divChangeDialogSignIn.style.display = "none";    

    clrInput();
})

// 註冊 -> 登入
aChangeDialogSign.addEventListener("click",function(){
    // 顯示登入畫面 & 隱藏註冊畫面
    h3DialogSignTitle.textContent = "登入會員帳號";
    divDialogSignInputIn.style.display = "block";
    divChangeDialogSignIn.style.display = "flex";
    divDialogSignInput.style.display = "none";
    divChangeDialogSign.style.display = "none";

    clrInput();
})

// 檢查是否有登入
function checkUser() {
    let url = "/api/user"
    fetch(url)
      .then(response => response.json())
      .then(function (result) {
        if(result["data"]!=null){
            aTopMenuSign.textContent = "登出系統";
            liTopMenuSign.addEventListener("click", function(){
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(function (result) {
                    console.log(result)
                    refresh();
                })
            })
        }else{
            aTopMenuSign.textContent = "登入/註冊";
            liTopMenuSign.addEventListener("click", function(){
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

// 關閉跳窗
btnCloseDialogSign.addEventListener("click", function(){
    // console.log("關閉");
    divDialogBG.style.display = "none";
    divDialog.style.display = "none";
})

// 點擊登入按鈕 -> PATCH
btnDialogSignIn.addEventListener("click", function(){
    signInEmail = inputdialogSignEmailIn.value;
    signInPassword = inputdialogSignPasswordIn.value;

    let url = "/api/user"
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': `${signInEmail}`,
            'password': `${signInPassword}`
        })
    })
    .then(response => response.json())
    .then(function (result) {
        // console.log(result)
        if(result["ok"]){
            refresh()
        }else if(result["error"]){
            divDialogReactIn.textContent = result["message"];
            divDialogReactIn.style.display = "flex";
            divDialogReactIn.style.color = "red";
            divDialog.insertBefore(divDialogReactIn, divChangeDialogSignIn)
        }
        
    })
})

// 點擊註冊按鈕 -> POST
btnDialogSign.addEventListener("click", function(){
    signUpName = inputdialogSignName.value
    signUpEmail = inputdialogSignEmail.value;
    signUpPassword = inputdialogSignPassword.value;
    
    let url = "/api/user"
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': `${signUpName}`,
            'email': `${signUpEmail}`,
            'password': `${signUpPassword}`
        })
    })
    .then(response => response.json())
    .then(function (result) {
        // console.log(result)
        if(result["ok"]){
            divDialogReact.textContent = "註冊成功";
            clrInput();
        }else if(result["error"]){
            divDialogReact.textContent = result["message"];
            inputdialogSignPassword.value = "";
        }
        divDialogReact.style.display = "flex";
        divDialogReact.style.color = "red";
        divDialog.insertBefore(divDialogReact, divChangeDialogSign);
    })
})

// 重新載入頁面
function refresh(){
    window.location.reload();
}

// 清除 input 以及 執行訊息
function clrInput(){
    // 清除登入填寫資料
    inputdialogSignEmailIn.value = "";
    inputdialogSignPasswordIn.value = "";
    divDialogReactIn.style.display = "none";
    // 清除註冊填寫資料
    inputdialogSignName.value = "";
    inputdialogSignEmail.value = "";
    inputdialogSignPassword.value = "";
    divDialogReact.style.display = "none";
}

// html 格式 - header
// <div class="top">
// <div class="topContent">
//     <div class="topTitle">
//         <p><a href="/">台北一日遊</a></p>
//     </div>
//     <div class="topMenu">
//         <ul class="menu">
//             <li><a href="#">預定行程</a></li>
//             <li><a href="#">登入/註冊</a></li>
//         </ul>
//     </div>
// </div>
// </div> 


// html 格式 - 登入/註冊跳窗
{/* 
    <div class="dialogBG">
        <div class="dialogSign">
            <div class="dialogSignTitle">
                <h3>註冊會員帳號</h3>
                <button class="btnCloseDialogSign"><img src="../static/src/icon_close.png"></button>
            </div>
            <div class="dialogSignInput">
                <input type="text" placeholder="輸入姓名" >
                <input type="text" placeholder="輸入電子郵件" >
                <input type="text" placeholder="輸入密碼" >
                <button class="btnDialogSign">註冊新帳戶</button>
            </div>
            <div class="dialogReact">
                <p>執行訊息</p>
            </div>
            <div class="changeDialogSign">
                <p>已有帳戶了？<a href="#">點此登入</a></p>
            </div>
        </div>
    </div>
*/}
