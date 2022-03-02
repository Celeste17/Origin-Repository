import json
import mysql.connector
import bisect

# 連接 MySQL/MariaDB 資料庫
mydb = mysql.connector.connect(
    host = "127.0.0.1",
    database = "we_travel",
    user = "root",
    password = "0117"
)

# print(mydb)            #確認連線成功
cursor = mydb.cursor() # 開啟游標

with open("./data/taipei-attractions.json", encoding='utf-8') as f:
    data = json.load(f)
    # print(type(data))
    # print(data["result"]["results"][1]["stitle"])
    
    for i in data["result"]["results"]:
        attraId = i["_id"]
        stitle = i["stitle"]
        CAT2 = i["CAT2"]
        xbody = i["xbody"]
        address = i["address"]
        info = i["info"]
        MRT = i["MRT"]
        latitude = i["latitude"]
        longitude = i["longitude"]
        # print(i["file"].lower())

        # 圖片過濾 JPG、PNG
        image = ""
        file = i["file"].lower()
        str = "http"
        # print(file.split(str))
        for j in file.split(str):
            # print(j)
            if '.png' in j or '.jpg' in j:
                url = "http" + j
                image += url +" , "
        # print(image)

        # print((attraId, stitle, CAT2, xbody, address, info, MRT, latitude, longitude, image))

        #新增至資料庫
        sql = "INSERT INTO attraction(id, name, category, description, address, transport, mrt, latitude, longitude, images) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (attraId, stitle, CAT2, xbody, address, info, MRT, latitude, longitude, image)
        cursor.execute(sql, val)
        mydb.commit()
        print(cursor.rowcount, "新增資料成功")
        

# 關閉游標與資料庫連線
cursor.close()
mydb.close()
