import sqlite3
from flask import Flask,render_template,request
app=Flask(__name__)


initial_menu=[
       {"name":"Samosa","price":10},
       {"name": "Chole Bhature", "price": 50},
       {"name": "Raj Kachori", "price": 30},
       {"name": "Thali", "price": 100},
       {"name":"Gulab Jamun", "price": 40},
       {"name":"Ras Madhuri", "price": 50}
 ]

def get_db_connection():
    conn=sqlite3.connect("haldiram.db")
    conn.row_factory=sqlite3.Row
    return conn

def init_db():
    conn=get_db_connection()

    conn.execute("""CREATE TABLE IF NOT EXISTS orders(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL)"""
    )

    conn.execute("""CREATE TABLE IF NOT EXISTS menu(
    food_id INTEGER PRIMARY KEY AUTOINCREMENT,
    food_name TEXT NOT NULL,
    price INTEGER NOT NULL)""")


    result=conn.execute(""" SELECT count(*) as count from menu """).fetchone()
    print(result["count"])
    if result["count"]==0:
        for food in initial_menu:
            conn.execute("""
                   Insert into menu(name,price)
                   values (?,?) """, (food["name"],food["price"])
                   )

    conn.execute("""CREATE TABLE IF NOT EXISTS order_item(
    order_id INTEGER,
    food_id INTEGER,
    food_quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(food_id) REFERENCES menu(food_id))""")
    
    conn.commit()
    conn.close()


@app.route("/")
def home():
    return render_template("index.html")
@app.route("/restaurants")
def restaurants():
    return render_template("restaurant.html")
@app.route("/haldiram")
def haldiram():
    conn=get_db_connection()
    menu=conn.execute("""SELECT * from menu""").fetchall()
    conn.close()
    return render_template("haldiram.html",menu=menu)
@app.route("/coming")
def coming():
    return render_template("comingsoon.html")
@app.route("/order", methods=["POST"])
def order():
    name=request.form["customer-name"]
    phone=request.form["customer-phone"]
    address=request.form["customer-address"]

    conn=get_db_connection()
    conn.execute("""INSERT INTO orders (customer_name,customer_phone,customer_address)
                    VALUES (?,?,?)""", (name,phone,address))

    conn.commit()
    conn.close()
    return "Order received!"

@app.route("/orders")
def show_orders():
    conn=get_db_connection()
    orders=conn.execute("""SELECT * FROM orders""").fetchall()
    conn.close()
    return render_template("orders.html",orders=orders)

if __name__=="__main__":
    init_db()
    app.run(debug=True)
