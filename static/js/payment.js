function tapPay() {
    // setup sdk 設定參數 (APP_ID, 'APP_KEY', 'sandbox')
    TPDirect.setupSDK(124074, 'app_4c4MpPCqnk5t8xHBZYBux4eb8ez8z0yey7BfvDbnJNScPYyIH38659kaCmn5', 'sandbox')

    // TPDirect.card.setup(config)
    // Display ccv field
    let fields = {
        number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: 'ccv'
        }
    }

    TPDirect.card.setup({
        fields: fields,
        styles: {
            // Style all elements
            'input': {
                'color': 'gray'
            },
            // Styling ccv field
            'input.ccv': {
                'font-size': '16px'
            },
            // Styling expiration-date field
            'input.expiration-date': {
                'font-size': '16px'
            },
            // Styling card-number field
            'input.card-number': {
                'font-size': '16px'
            },
            // style focus state
            ':focus': {
                'color': 'black'
            },
            // style valid state
            '.valid': {
                'color': 'green'
            },
            // style invalid state
            '.invalid': {
                'color': 'red'
            },
            // Media queries
            // Note that these apply to the iframe, not the root window.
            '@media screen and (max-width: 400px)': {
                'input': {
                    'color': 'orange'
                }
            }
        }
    })

    // onUpdate 得知目前卡片資訊的輸入狀態
    TPDirect.card.onUpdate(function (update) {
        // update.canGetPrime === true
        // --> you can call TPDirect.card.getPrime()
        if (update.canGetPrime) {
            // Enable submit Button to get prime.
            // submitButton.removeAttribute('disabled')
        } else {
            // Disable submit Button to get prime.
            // submitButton.setAttribute('disabled', true)
        }
    
        cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unionpay','unknown']
        if (update.cardType === 'visa') {
            // Handle card type visa.
        }
    
        // number 欄位是錯誤的
        if (update.status.number === 2) {
            // setNumberFormGroupToError()
        } else if (update.status.number === 0) {
            // setNumberFormGroupToSuccess()
        } else {
            // setNumberFormGroupToNormal()
        }
    
        if (update.status.expiry === 2) {
            // setNumberFormGroupToError()
        } else if (update.status.expiry === 0) {
            // setNumberFormGroupToSuccess()
        } else {
            // setNumberFormGroupToNormal()
        }
    
        if (update.status.ccv === 2) {
            // setNumberFormGroupToError()
        } else if (update.status.ccv === 0) {
            // setNumberFormGroupToSuccess()
        } else {
            // setNumberFormGroupToNormal()
        }
    })
    
}

function onSubmit(event) {
    event.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 驗證聯絡資料填寫完畢
    // 確認是否可以 getPrime
    if(document.querySelector(".contact-name").value=="" || document.querySelector(".contact-mail").value=="" || document.querySelector(".contact-phone").value==""){
        alert('請輸入完整聯絡人資料')
        return
    }else if (tappayStatus.canGetPrime === false) {
        // alert('can not get prime')
        alert('請輸入完整信用卡資料')
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            // alert('get prime error ' + result.msg)
            return
        }
        // alert('get prime 成功，prime: ' + result.card.prime)
        confirmOrder(result.card.prime);
        
        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    })
    
}

// 送出訂單至 api/orders
function confirmOrder(prime){  
    infoTime = "";
    if (document.querySelector(".info-time").textContent == "早上9點至中午12點") infoTime = "morning";
    else if (document.querySelector(".info-time").textContent == "下午1點至下午4點") infoTime = "afternoon";  
    let url = "/api/orders";
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prime": prime,
            "order": {
              "price": parseInt(document.querySelector(".info-price").textContent),
              "trip": {
                "attraction": {
                  "id": parseInt(document.querySelector(".imgheaderContentMain").alt.split("：")[1]),
                  "name": document.querySelector(".info-name").textContent.split("：")[1],
                  "address": document.querySelector(".info-address").textContent,
                  "image": document.querySelector(".imgheaderContentMain").src
                },
                "date": document.querySelector(".info-date").textContent,
                "time": infoTime
              },
              "contact": {
                "name": document.querySelector(".contact-name").value,
                "email": document.querySelector(".contact-mail").value,
                "phone": document.querySelector(".contact-phone").value
              }
            }
          })
      })
        .then(response => response.json())
        .then(function (result) {
            console.log(result)
            console.log(result["data"]["number"])
            goThankyou(result["data"]["number"])
        })
}

// 導向 thankyou 頁面
function goThankyou(paymentNumber){    
    window.location = `/thankyou?number=${paymentNumber}`;
}

// 在 booking checkBooking() 確認有資料後呼叫
// 插入payment html
function randerPayment() {
    const tpCard = document.querySelector(".tpCard");
    // tpCard.setAttribute("style","color:blue;");
    const divCard = document.createElement("div");
    divCard.setAttribute("id", "card-number");
    divCard.classList.add('tpfield');
    tpCard.appendChild(divCard);

    const tpDate = document.querySelector(".tpDate");
    const divDate = document.createElement("div");
    divDate.setAttribute("id", "card-expiration-date");
    divDate.classList.add('tpfield');
    tpDate.appendChild(divDate);

    const tpCvv = document.querySelector(".tpCvv");
    const divCvv = document.createElement("div");
    divCvv.setAttribute("id", "card-ccv");
    divCvv.classList.add('tpfield');
    tpCvv.appendChild(divCvv);
}