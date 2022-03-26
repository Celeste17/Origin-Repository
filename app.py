from flask import * # Blueprint
import json
from api.attractionApi import app_attractionApi
from api.userApi import app_userApi

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False  # 解決中文亂碼
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config['JSON_SORT_KEYS'] = False
app.secret_key="celesteSecret" # 設定 Session 密鑰：可以填寫任何字串但不告訴別人

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

app.register_blueprint(app_attractionApi)
app.register_blueprint(app_userApi)

# app.debug = True
app.run(port=3000)
