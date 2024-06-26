from flask import Blueprint, request, jsonify
import mysql.connector
from config import db_config

field_routes = Blueprint('fields', __name__)

# 表字段增删改
@field_routes.route('/addField', methods=['POST'])
def add_field():
    field_name = request.form['fieldName']
    field_type = request.form['fieldType']
    is_null = request.form.get('isNull') == 'on'

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        add_column_sql = f"ALTER TABLE YourTableName ADD COLUMN {field_name} {field_type}"
        if not is_null:
            add_column_sql += " NOT NULL"

        cursor.execute(add_column_sql)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'success': True})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)})


@field_routes.route('/editField', methods=['POST'])
def edit_field():
    old_field_name = request.form['oldFieldName']
    new_field_name = request.form['newFieldName']
    new_field_type = request.form['newFieldType']
    new_is_null = request.form.get('newIsNull') == 'on'

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        alter_column_sql = f"ALTER TABLE YourTableName CHANGE {old_field_name} {new_field_name} {new_field_type}"
        if not new_is_null:
            alter_column_sql += " NOT NULL"

        cursor.execute(alter_column_sql)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'success': True})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)})


@field_routes.route('/deleteField', methods=['POST'])
def delete_field():
    field_name = request.form['deleteFieldName']

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        drop_column_sql = f"ALTER TABLE YourTableName DROP COLUMN {field_name}"

        cursor.execute(drop_column_sql)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'success': True})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)})
