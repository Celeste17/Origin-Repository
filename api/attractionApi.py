from flask import * # Blueprint
import json

import mysql.connector
import sqlConnection as cnx

app_attractionApi = Blueprint('app_attractionApi',__name__)

# 取得景點資料
@app_attractionApi.route("/api/attractions")
def apiAttractions():
	page = request.args.get("page", "0")
	keyword = request.args.get("keyword")
	nextPage = 0

	try:
		# 連接 MySQL POOL 資料庫
		mydb = cnx.pool.get_connection()
		cursor = mydb.cursor() # 開啟游標

		if (keyword)  :
		
			sql = "SELECT * FROM attraction WHERE name LIKE %s LIMIT %s,%s"
			nameKeyword = "%" + keyword + "%"

			# 總共筆數
			sqlCount =  "SELECT count(*) FROM attraction WHERE name LIKE %s"
			valCount = (nameKeyword,)
			cursor.execute(sqlCount,valCount)
			count = cursor.fetchone()
			if count[0] == 0:
				return jsonify({"error":True, "message":"查無此關鍵字"})
				# return jsonify({"nextPage" : None, "data" : []})
			pageCount = count[0]//12
			countInPage = countPage(count, pageCount)
			# 設計 cursor 的 value
			prepage = str(int(page)-1)
			if int(page) == 0 :
				val = (nameKeyword, 0, countInPage[page])
			elif int(page) > 0 and int(page) < pageCount:
				val = (nameKeyword, countInPage[prepage], 12)
			elif int(page) == pageCount:
				finalCount = countInPage[page] - countInPage[prepage]
				val = (nameKeyword, countInPage[prepage], finalCount)
			else:
				return jsonify({"error":True, "message":"未搜尋到資料，可查閱其他頁面"})
				# return jsonify({"nextPage" : None, "data" : []})
		elif keyword == None :
			sql = "SELECT * FROM attraction LIMIT %s,%s"

			# 總共筆數
			sqlCount =  "SELECT count(*) FROM attraction"
			cursor.execute(sqlCount)
			count = cursor.fetchone()
			if count[0] == 0:
				return jsonify({"error":True, "message":"查無此關鍵字"})
				# return jsonify({"nextPage" : None, "data" : []})
			pageCount = count[0]//12
			countInPage = countPage(count, pageCount)
			# 設計 cursor 的 value
			prepage = str(int(page)-1)
			if int(page) == 0 :
				val = (0, countInPage[page])
			elif int(page) > 0 and int(page) < pageCount:
				val = (countInPage[prepage], 12)
			elif int(page) == pageCount:
				finalCount = countInPage[page] - countInPage[prepage]
				val = (countInPage[prepage], finalCount)
			else:
				return jsonify({"error":True, "message":"未搜尋到資料，可查閱其他頁面"})
				# return jsonify({"nextPage" : None, "data" : []})
		else:
			return jsonify({"error":True, "message":"伺服器內部錯誤"}),500

		# val = (nameKeyword,0,12)
		# print(val)
		cursor.execute(sql, val)
		result = cursor.fetchall()
		# 將資料存入 data list
		data = []
		for i in range(len(result)):
			# print(i)
			if(result):
				images = result[i][9].split(" , ")
				# print("筆數:", len(images))
				del images[-1]
				dataInfo = {
					"id" : result[i][0],
					"name" : result[i][1],
					"category" : result[i][2],
					"description" : result[i][3],
					"address" : result[i][4],
					"transport" : result[i][5],
					"mrt" : result[i][6],
					"latitude" : result[i][7],
					"longitude" : result[i][8],
					"images" : images
				}
			else:
				dataInfo = None
			data.append(dataInfo)
		
		# 計算 nextPage
		maxCountInPage = int(max(countInPage.keys()))
		if int(page) < maxCountInPage and maxCountInPage != 0:
			nextPage = int(page)+1
		else:
			nextPage = None

		# 輸出	
		if(data):
			return jsonify({"nextPage" : nextPage, "data" : data})
		else:
			return jsonify({"error":True, "message":"伺服器內部錯誤"}),500
	except:
		print("Error MySQL")
	finally:
		if (mydb.is_connected()):
			cursor.close()
			mydb.close()


# 計算各頁資料筆數  page=0.val=0-12 / page=1.val=13-24
def countPage(count, pageCount):
	countInPage = {}  
	for j in range(pageCount+1):
		# print(j)
		if count[0] < (j+1)*12:
			countInPage[str(j)] = count[0]
		else:
			countInPage[str(j)] = (j+1)*12
	# print(countInPage)
	# print(max(countInPage.keys()))
	# print(type(max(countInPage.keys())))
	return countInPage 

# 根據景點編號取得景點資料
@app_attractionApi.route("/api/attraction/<attractionId>")
def apiAttractions_id(attractionId):

	try:
		# 連接 MySQL POOL 資料庫
		mydb = cnx.pool.get_connection()
		cursor = mydb.cursor() # 開啟游標

		sql = "SELECT * FROM attraction WHERE id = %s"
		val = (attractionId,)
		cursor.execute(sql, val)
		result = cursor.fetchone()
		# print(result)

		# 將資料存入 data 
		if (result):
			images = result[9].split(" , ")
			# print("筆數:", len(images))
			del images[-1]
			dataInfo = {
				"id" : result[0],
				"name" : result[1],
				"category" : result[2],
				"description" : result[3],
				"address" : result[4],
				"transport" : result[5],
				"mrt" : result[6],
				"latitude" : result[7],
				"longitude" : result[8],
				"images" : images
			}
			return jsonify({"data" : dataInfo})
		elif (result == None):
			dataInfo = None
			return jsonify({"error":True, "message":"無此景點編號"}),404
		else:
			return jsonify({"error":True, "message":"伺服器內部錯誤"}),500	
	except:
		print("Error MySQL")
	finally:
		if (mydb.is_connected()):
			cursor.close()
			mydb.close()