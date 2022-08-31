#pip install MySQL-python

import mysql.connector
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="pwd"
)

print(mydb)