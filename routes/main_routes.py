from flask import Blueprint, render_template, request, redirect, url_for, jsonify
import mysql.connector
from config import db_config

main_routes = Blueprint('main', __name__)

# 示例数据
stations = [
    {'Scode': '001', 'Sname': '站点1', 'Stype': '类型1', 'Department': '单位1', 'River': '河流1', 'BuildTime': '2020-01-01', 'Address': '地址1', 'El': '111.11', 'Nl': '22.22', 'Actions': '操作'},
    {'Scode': '002', 'Sname': '站点2', 'Stype': '类型2', 'Department': '单位2', 'River': '河流2', 'BuildTime': '2020-02-01', 'Address': '地址2', 'El': '112.22', 'Nl': '23.33', 'Actions': '操作'},
    # 更多数据行...
]


@main_routes.route('/')
def index():
    return render_template('main.html')


@main_routes.route('/update', methods=['POST'])
def update():
    Scode = request.form['Scode']
    for station in stations:
        if station['Scode'] == Scode:
            station['Sname'] = request.form['Sname']
            station['Stype'] = request.form['Stype']
            station['Department'] = request.form['Department']
            station['River'] = request.form['River']
            station['Address'] = request.form['address']
            station['El'] = request.form['el']
            station['Nl'] = request.form['nl']
            station['BuildTime'] = request.form['Time']
            break
    return redirect(url_for('main.index'))


@main_routes.route('/search', methods=['POST'])
def search():
    data = request.json
    Sname = data.get('Sname')
    Scode = data.get('Scode')
    Stype = data.get('Stype')
    Department = data.get('Department')
    River = data.get('River')
    Time = data.get('Time')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT S.Scode, S.Sname, T.Station, D.Department, R.River, S.BuildTime, L.LocationID
    FROM StationInfo S
    JOIN StationType T ON S.TypeID = T.TypeID
    JOIN Department D ON S.DepartmentID = D.DepartmentID
    JOIN River R ON S.RiverID = R.RiverID
    JOIN location L ON S.LocationID = L.LocationID
    WHERE 1=1
    """
    params = []
    if Scode:
        query += " AND S.Scode = %s"
        params.append(Scode)
    if Sname:
        query += " AND S.Sname = %s"
        params.append(Sname)
    if Stype:
        query += " AND T.Station = %s"
        params.append(Stype)
    if Department:
        query += " AND D.Department = %s"
        params.append(Department)
    if River:
        query += " AND R.River = %s"
        params.append(River)
    if Time:
        query += " AND S.BuildTime >= %s"
        params.append(Time)

    cursor.execute(query, params)
    results = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(results)
