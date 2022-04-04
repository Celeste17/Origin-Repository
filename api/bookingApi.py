from flask import * # Blueprint ,get_data, session
import json
import mysql.connector
import sqlConnection as cnx
import datetime

app_bookingApi = Blueprint('app_bookingApi',__name__)

# 使用者資料
@app_bookingApi.route("/api/booking", methods=["GET", "POST", "DELETE"])
def apiBooking():
	if request.method == 'POST': # 建立新的預定行程
		dataPost = json.loads(request.get_data())
		attractionIdPost = dataPost["attractionId"]
		datePost = dataPost["date"]
		timePost = dataPost["time"]
		pricePost = dataPost["price"]
		if session.get('userID'):
			userIdGet = session.get('userID')
			print(userIdGet)
			try:
				# 連接 MySQL POOL 資料庫
				mydb = cnx.pool.get_connection()
				cursor = mydb.cursor() # 開啟游標

				sql = "SELECT count(*) FROM orders WHERE member_id = %s;"
				val = (userIdGet,)
				cursor.execute(sql,val)
				checkMemberHasOrders = cursor.fetchone()
				print(checkMemberHasOrders)
				# print(cursor.rowcount)
				responses = jsonify({"error": True,"message": "..........."})
				if(checkMemberHasOrders[0] > 0):
					# print("已經有orders，UPDATE", checkMemberHasOrders)	
					sqlUpdate = "UPDATE `orders` SET `attraction_id`=%s, `dep_date`=%s, `dep_time`=%s, `price`=%s WHERE member_id = %s;"
					valUpdate = (attractionIdPost, datePost, timePost, pricePost, userIdGet)
					cursor.execute(sqlUpdate, valUpdate)
					mydb.commit()				
					responses = jsonify({"ok": True})
				elif (checkMemberHasOrders[0] == 0):
					sqlInsert = "INSERT INTO `orders`(`member_id`, `attraction_id`, `dep_date`, `dep_time`, `price`) VALUES (%s, %s, %s, %s, %s);"
					valInsert = (userIdGet, attractionIdPost, datePost, timePost, pricePost)
					cursor.execute(sqlInsert, valInsert)
					mydb.commit()
					responses = jsonify({"ok": True})
				else:
					responses = jsonify({"error": True,"message": "建立失敗，輸入不正確或其他原因"})
			except:
				print("Error MySQL")
				responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
			finally:
				if (mydb.is_connected()):
					cursor.close()
					mydb.close()
		else:
			print("未登入")
			responses = jsonify({"error": True,"message": "未登入系統，拒絕存取"})
		return responses
	elif request.method == 'GET': # 取得尚未確認下單的預定行程
		if session.get('userID'):
			userIdGet = session.get('userID')
			try:
				# 連接 MySQL POOL 資料庫
				mydb = cnx.pool.get_connection()
				cursor = mydb.cursor() # 開啟游標
				sql = "SELECT o.attraction_id, a.name, a.address, a.images, o.dep_date, o.dep_time, o.price FROM orders AS o INNER JOIN attraction AS a ON o.attraction_id = a.id WHERE member_id = %s;"
				val = (userIdGet,)
				cursor.execute(sql, val)
				checkAlreadyOrders = cursor.fetchone()
				# print(checkAlreadyOrders)
				if(checkAlreadyOrders != None):
					data = {
						"attraction": {
							"id": checkAlreadyOrders[0],
							"name": checkAlreadyOrders[1],
							"address": checkAlreadyOrders[2],
							"image": checkAlreadyOrders[3].split(" , ")[0]
						},
						"date": checkAlreadyOrders[4].strftime('%Y-%m-%d'),
						"time": checkAlreadyOrders[5],
						"price": checkAlreadyOrders[6]
					}
					responses = jsonify({"data": data})
				else:
					responses = jsonify({"data":None})
			except:
				print("Error MySQL")
				responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
			finally:
				if (mydb.is_connected()):
					cursor.close()
					mydb.close()
			
		else:
			responses = jsonify({"error": True,"message": "未登入系統，拒絕存取"})
		return responses
	elif request.method == 'DELETE': # 刪除目前的預定行程
		if session.get('userID'):
			userIdGet = session.get('userID')
			try:
				# 連接 MySQL POOL 資料庫
				mydb = cnx.pool.get_connection()
				cursor = mydb.cursor() # 開啟游標
				sql = "DELETE FROM `orders` WHERE member_id = %s;"
				val = (userIdGet,)
				cursor.execute(sql, val)
				print(cursor.rowcount)
				responses = jsonify({"ok":True})
			except:
				print("Error MySQL")
				responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
			finally:
				if (mydb.is_connected()):
					cursor.close()
					mydb.close()
			
		else:
			responses = jsonify({"error": True,"message": "未登入系統，拒絕存取"})
		return responses
		