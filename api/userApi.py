from flask import * # Blueprint ,get_data, session
import json
import mysql.connector
import sqlConnection as cnx

app_userApi = Blueprint('app_userApi',__name__)

# 使用者資料
@app_userApi.route("/api/user", methods=["GET", "POST", "PATCH", "DELETE"])
def apiUser():
	if request.method == 'POST': # 註冊一個新的使用者
		dataPost = json.loads(request.get_data())
		namePost = dataPost["name"]
		emailPost = dataPost["email"]
		passwordPost = dataPost["password"]
		if (namePost == "" or emailPost == "" or passwordPost == ""):
			return jsonify({"error": True,"message": "請填寫完整資料"})
		responses = {}
		try:
			# 連接 MySQL POOL 資料庫
			mydb = cnx.pool.get_connection()
			cursor = mydb.cursor() # 開啟游標
			sql = "SELECT * FROM member WHERE email = %s;"
			val = (emailPost,)
			cursor.execute(sql,val)
			checkReMember = cursor.fetchone()
			# print(cursor.rowcount)
			if(checkReMember==None):
				# print("無相同Email的使用者",checkReMember)
				sqlInsert = "INSERT INTO member(name, email, password) VALUES(%s, %s, %s)"
				valInsert = (namePost, emailPost, passwordPost)
				cursor.execute(sqlInsert, valInsert)
				mydb.commit()
				
				responses = jsonify({"ok": True})
			elif (checkReMember!=None):
				# print(checkReMember)
				responses = jsonify({"error": True,"message": "註冊失敗，此Mail已被註冊"})
			else:
				responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
		except:
			print("Error MySQL")
			
		finally:
			if (mydb.is_connected()):
				cursor.close()
				mydb.close()
		return responses
	elif request.method == 'PATCH': # 登入使用者帳戶
		dataPatch = json.loads(request.get_data())
		emailPatch = dataPatch["email"]
		passwordPatch = dataPatch["password"]
		# print(dataPatch)
		responses = {}
		try:
			# 連接 MySQL POOL 資料庫
			mydb = cnx.pool.get_connection()
			cursor = mydb.cursor() # 開啟游標
			sql = "SELECT * FROM member WHERE email = %s AND password = %s;"
			val = (emailPatch, passwordPatch)
			cursor.execute(sql,val)
			logInMember = cursor.fetchone()
			# print(cursor.rowcount)

			if(logInMember==None):
				# print("帳號密碼錯誤",logInMember)
				responses = jsonify({"error": True,"message": "登入失敗，帳號或密碼錯誤或其他原因"})
			elif (logInMember!=None):
				# print(logInMember)
			
				session["userID"] = logInMember[0]
				responses = jsonify({"ok": True})				
			else:
				responses = jsonify({"error": True,"message": "伺服器內部錯誤"})
			
		except:
			print("Error MySQL")
			
		finally:
			if (mydb.is_connected()):
				cursor.close()
				mydb.close()
				
		return responses
	elif request.method == 'GET': # 取得當前登入的使用者資訊
		if session.get('userID'):
			userIdGet = session.get('userID')

			try:
				# 連接 MySQL POOL 資料庫
				mydb = cnx.pool.get_connection()
				cursor = mydb.cursor() # 開啟游標
				sql = "SELECT * FROM member WHERE id = %s;"
				val = (userIdGet, )
				cursor.execute(sql,val)
				logInMember = cursor.fetchone()
				# print(cursor.rowcount)
				data = {"id": logInMember[0], "name": logInMember[1], "email": logInMember[2]}
				responses = jsonify({"data":data})
			except:
				print("Error MySQL")
			
			finally:
				if (mydb.is_connected()):
					cursor.close()
					mydb.close()
			
		else:
			responses = jsonify({"data":None})
		return responses
		

	elif request.method == 'DELETE': # 登出使用者帳戶
		session["userID"] = False
		if session.get('userID'):
			responses = jsonify({"error": True, "message": "未成功登出"})
		else:
			responses = jsonify({"ok": True})
		# responses = jsonify({"ok": "?"})
		return responses
	
	return jsonify({"error": True,"message": "其他錯誤"})
