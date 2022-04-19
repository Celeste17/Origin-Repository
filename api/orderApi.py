from flask import * # Blueprint ,get_data, session
import json
import mysql.connector
import sqlConnection as cnx
from datetime import datetime

import urllib.request as req

app_orderApi = Blueprint('app_orderApi',__name__)

# 訂單 -> 建立新的訂單，並完成付款程序
@app_orderApi.route("/api/orders", methods=["POST"])
def apiOrders():
	dataPost = json.loads(request.get_data())
	primePost = dataPost["prime"]
	attractionIdPost = dataPost["order"]["trip"]["attraction"]["id"]
	depDatePost = dataPost["order"]["trip"]["date"]
	depTimePost = dataPost["order"]["trip"]["time"]
	pricePost = dataPost["order"]["price"]
	contactNamePost = dataPost["order"]["contact"]["name"]
	contactEmailPost = dataPost["order"]["contact"]["email"]
	contactPhonePost = dataPost["order"]["contact"]["phone"]
	# print(attractionIdPost, type(attractionIdPost), depDatePost, type(depDatePost), depTimePost, type(depTimePost))
	# print(type(primePost), type(pricePost), type(contactPhonePost), type(contactNamePost), type(contactEmailPost))
	if(contactNamePost=="" or contactEmailPost=="" or contactPhonePost==""):
		return jsonify({"error": True, "message": "訂單建立失敗，輸入不正確或其他原因"})
	# print(pricePost)
	userID = session.get('userID')
	print(userID)
	if (session.get('userID')!=None):
		try:
			# 連接 MySQL POOL 資料庫
			mydb = cnx.pool.get_connection()
			cursor = mydb.cursor() # 開啟游標
			sql = "SELECT * FROM `orders` WHERE member_id = %s;"
			val = (userID,)
			cursor.execute(sql, val)
			orders = cursor.fetchone()
			# print(orders, " 影響欄位：",cursor.rowcount)

			now = datetime.now()
			paymentID = now.strftime("%Y") + now.strftime("%m") + now.strftime("%d") + now.strftime("%H") + now.strftime("%M") + now.strftime("%S") + str(attractionIdPost) + str(userID)
			
			# depDate str -> datetime
			depDate = datetime.strptime(depDatePost, "%Y-%m-%d")

			# 新增一筆 payment
			sqlInsert = "INSERT INTO `payment` (`id`, `member_id`, `attraction_id`, `dep_date`, `dep_time`, `contact_name`, `contact_mail`, `contact_phone`, `create_time`, `total_amount`, `payment_status`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
			valInsert = (paymentID, userID, attractionIdPost, depDate, depTimePost, contactNamePost, contactEmailPost, contactPhonePost, now, pricePost, "未付款")
			cursor.execute(sqlInsert, valInsert)
			mydb.commit()

			# 刪除一筆 orders
			sqlDelete = "DELETE FROM `orders` WHERE member_id = %s;"
			valDelete = (userID,)
			cursor.execute(sqlDelete, valDelete)

			# 呼叫 TapPay 提供的付款 API，提供必要付款資訊，完成付款動作。
			tappayUrl = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime'
			tappayHeaders = {
			    'Content-Type': 'application/json',
			    'x-api-key': 'partner_Hyhzp83YOiYVxvDvSTZnmyfeVpU0cyY1xuD4DuNe88WeTjLkNTBngZoQ'
			}
			
			requestData = {
			    "prime": primePost,
			    "partner_key": "partner_Hyhzp83YOiYVxvDvSTZnmyfeVpU0cyY1xuD4DuNe88WeTjLkNTBngZoQ",
			    "merchant_id": "celeste_CTBC",
			    "details":"TapPay Test",
			    "amount": pricePost,
			    "cardholder": {
			        "phone_number": contactPhonePost,
			        "name": contactNamePost,
			        "email": contactEmailPost,
			        "zip_code": "100",
			        "address": "台北市天龍區芝麻街1號1樓",
			        "national_id": "A123456789"
			    },
			    "remember": True
			}
			tappayRequest = req.Request(
			    tappayUrl, 
			    headers = tappayHeaders, 
			    data = json.dumps(requestData).encode('utf-8')
			)
			with req.urlopen(tappayRequest) as response:
			    tappayInfo = json.load(response)

			# 付款成功 status = 0
			if(tappayInfo["status"] == 0):
			    sqlUpdate = "UPDATE `payment` SET `payment_status`='已付款', `payment_time`=%s  WHERE `id`= %s"
			    valUpdate = (now, paymentID)
			    cursor.execute(sqlUpdate, valUpdate)
			    status = tappayInfo["status"]
			    message = "付款成功"
			else:
			    status = tappayInfo["status"]
			    message = tappayInfo["msg"]
			data = {
				"number": paymentID,
				"payment": {
					"status": status,
					"message": message
				}
			}
			responses = jsonify({"data": data})
		except:
			print("Error MySQL")
			responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
		finally:
			if (mydb.is_connected()):
				cursor.close()
				mydb.close()
	else:
		responses = jsonify({"error": True, "message": "未登入系統，拒絕存取"})
	return responses

# 訂單 -> 根據訂單編號取得訂單資訊
@app_orderApi.route("/api/order/<orderNumber>", methods=["GET"])
def apiOrderNumber(orderNumber):
	userID = session.get('userID')
	print(userID)
	if (session.get('userID')!=None):
		try:
			# 連接 MySQL POOL 資料庫
			mydb = cnx.pool.get_connection()
			cursor = mydb.cursor() # 開啟游標
			sql = "SELECT p.*, a.name, a.address, a.images FROM payment AS p INNER JOIN attraction AS a ON p.attraction_id = a.id WHERE (p.member_id = %s) AND p.id = %s;"
			val = (userID, orderNumber)
			cursor.execute(sql, val)
			payment = cursor.fetchone()
			print(payment)

			if(payment!=None):
				data = {
					"number": orderNumber,
					"price": payment[10],
					"trip": {
					"attraction": {
						"id": payment[2],
						"name": payment[12],
						"address": payment[13],
						"image": payment[14].split(" , ")[0]
					},
					"date": payment[3],
					"time": payment[4]
					},
					"contact": {
					"name": payment[5],
					"email": payment[6],
					"phone": payment[7]
					},
					"status": payment[11]
				}
			else:
				data = None
			
			
			responses = jsonify({"data": data})
			# responses = jsonify({"data": True})
		except:
			print("Error MySQL")
			responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
		finally:
			if (mydb.is_connected()):
				cursor.close()
				mydb.close()
	else:
		responses = jsonify({"error": True, "message": "未登入系統，拒絕存取"})
	return responses