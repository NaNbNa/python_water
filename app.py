# from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
# import mysql.connector
# import urllib.parse
#
# app = Flask(__name__)
#
# # Database configuration
# db_config = {
#     'user': 'root',
#     'password': '123456',
#     'host': 'localhost',
#     'database': '三峡',
# }
#
#
# @app.route('/')
# def index():
#     return render_template('main.html')
#
#
# # 示例数据
# stations = [
#     {'Scode': '001', 'Sname': '站点1', 'Stype': '类型1', 'Department': '单位1', 'River': '河流1', 'BuildTime': '2020-01-01', 'Address': '地址1', 'El': '111.11', 'Nl': '22.22', 'Actions': '操作'},
#     {'Scode': '002', 'Sname': '站点2', 'Stype': '类型2', 'Department': '单位2', 'River': '河流2', 'BuildTime': '2020-02-01', 'Address': '地址2', 'El': '112.22', 'Nl': '23.33', 'Actions': '操作'},
#     # 更多数据行...
# ]
#
#
# @app.route('/update', methods=['POST'])
# def update():
#     Scode = request.form['Scode']
#     for station in stations:
#         if station['Scode'] == Scode:
#             station['Sname'] = request.form['Sname']
#             station['Stype'] = request.form['Stype']
#             station['Department'] = request.form['Department']
#             station['River'] = request.form['River']
#             station['Address'] = request.form['address']
#             station['El'] = request.form['el']
#             station['Nl'] = request.form['nl']
#             station['BuildTime'] = request.form['Time']
#             break
#     return redirect(url_for('index'))
#
#
# @app.route('/search', methods=['POST'])
# def search():
#     data = request.json
#     Sname = data.get('Sname')
#     Scode = data.get('Scode')
#     Stype = data.get('Stype')
#     Department = data.get('Department')
#     River = data.get('River')
#     Time = data.get('Time')
#
#     conn = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="password",
#         database="三峡"
#     )
#     cursor = conn.cursor(dictionary=True)
#
#     query = """
#     SELECT S.Scode, S.Sname, T.Station, D.Department, R.River, S.BuildTime, L.LocationID
#     FROM StationInfo S
#     JOIN StationType T ON S.TypeID = T.TypeID
#     JOIN Department D ON S.DepartmentID = D.DepartmentID
#     JOIN River R ON S.RiverID = R.RiverID
#     JOIN location L ON S.LocationID = L.LocationID
#     WHERE 1=1
#     """
#     params = []
#     if Scode:
#         query += " AND S.Scode = %s"
#         params.append(Scode)
#     if Sname:
#         query += " AND S.Sname = %s"
#         params.append(Sname)
#     if Stype:
#         query += " AND T.Station = %s"
#         params.append(Stype)
#     if Department:
#         query += " AND D.Department = %s"
#         params.append(Department)
#     if River:
#         query += " AND R.River = %s"
#         params.append(River)
#     if Time:
#         query += " AND S.BuildTime >= %s"
#         params.append(Time)
#
#     cursor.execute(query, params)
#     results = cursor.fetchall()
#
#     cursor.close()
#     conn.close()
#
#     return jsonify(results)
#
#
# # 增加表字段
# @app.route('/addField', methods=['POST'])
# def add_field():
#     field_name = request.form['fieldName']
#     field_type = request.form['fieldType']
#     is_null = request.form.get('isNull') == 'on'
#
#     try:
#         conn = mysql.connector.connect(**db_config)
#         cursor = conn.cursor()
#
#         # 动态构建 SQL 语句以添加新字段
#         add_column_sql = f"ALTER TABLE YourTableName ADD COLUMN {field_name} {field_type}"
#         if not is_null:
#             add_column_sql += " NOT NULL"
#
#         cursor.execute(add_column_sql)
#         conn.commit()
#
#         cursor.close()
#         conn.close()
#
#         return jsonify({'success': True})
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'success': False, 'error': str(e)})
#
#
# @app.route('/editField', methods=['POST'])
# def edit_field():
#     old_field_name = request.form['oldFieldName']
#     new_field_name = request.form['newFieldName']
#     new_field_type = request.form['newFieldType']
#     new_is_null = request.form.get('newIsNull') == 'on'
#
#     try:
#         conn = mysql.connector.connect(**db_config)
#         cursor = conn.cursor()
#
#         alter_column_sql = f"ALTER TABLE YourTableName CHANGE {old_field_name} {new_field_name} {new_field_type}"
#         if not new_is_null:
#             alter_column_sql += " NOT NULL"
#
#         cursor.execute(alter_column_sql)
#         conn.commit()
#
#         cursor.close()
#         conn.close()
#
#         return jsonify({'success': True})
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'success': False, 'error': str(e)})
#
# @app.route('/deleteField', methods=['POST'])
# def delete_field():
#     field_name = request.form['deleteFieldName']
#
#     try:
#         conn = mysql.connector.connect(**db_config)
#         cursor = conn.cursor()
#
#         drop_column_sql = f"ALTER TABLE YourTableName DROP COLUMN {field_name}"
#
#         cursor.execute(drop_column_sql)
#         conn.commit()
#
#         cursor.close()
#         conn.close()
#
#         return jsonify({'success': True})
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'success': False, 'error': str(e)})
#
#
# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask
from routes.main_routes import main_routes
from routes.field_routes import field_routes

app = Flask(__name__)
# app.secret_key = 'your_secret_key'

# Register blueprints
app.register_blueprint(main_routes)
app.register_blueprint(field_routes)

if __name__ == '__main__':
    app.run(debug=True)

