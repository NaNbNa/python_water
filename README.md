project/
│
├── app.py '这是 Flask 应用程序的主入口文件。它初始化 Flask 应用程序，并注册了在 `routes` 文件夹中定义的蓝图（Blueprints）。'
├── config.py '此文件包含数据库配置，存储了连接数据库所需的配置信息'
├── models.py '此文件用于定义数据库模型。如果你的应用程序有复杂的数据模型，可以在这里定义。当前没有具体实现，作为占位符。'
├── routes/
│   ├── __init__.py '确保 routes 目录被识别为一个 Python 包'
│   ├── main_routes.py '包含主要的路由逻辑，例如主页渲染和更新操作'
│   └── field_routes.py '包含与字段操作相关的路由逻辑，例如添加、编辑和删除字段。'
├── templates/
│   └── main.html
└── static/
    └── your_static_files