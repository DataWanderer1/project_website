from flask import Flask,render_template
app=Flask(__name__)


menu=[
    {"name":"Samosa","price":10},
    {"name": "Chole Bhature", "price": 50},
    {"name": "Raj Kachori", "price": 30},
    {"name": "Thali", "price": 100},
    {"name":"Gulab Jamun", "price": 40},
    {"name":"Ras Madhuri", "price": 50}
]

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/restaurants")
def restaurants():
    return render_template("restaurant.html")
@app.route("/haldiram")
def haldiram():
    return render_template("haldiram.html",menu=menu)
@app.route("/coming")
def coming():
    return render_template("comingsoon.html")


if __name__=="__main__":
    app.run(debug=True)