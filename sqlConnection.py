import mysql.connector
from mysql.connector import pooling

# 原本的：連接 MySQL 資料庫
# dbconfig = mysql.connector.connect(
#     host = "127.0.0.1",
#     database = "we_travel",
#     user = "root",
#     password = ""
# )
# print(mydb)            #確認連線成功
# cursor = mydb.cursor() # 開啟游標

# 連接 MySQL POOL 資料庫
dbconfig = {
    "host" : "127.0.0.1",
    "database" : "we_travel",
    "user" : "root",
    "password" : ""
}

pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "mypool",
    pool_size = 5,
    pool_reset_session = True, # 連接 pool 時重置 session variables
    autocommit = True, 
    **dbconfig
    )
