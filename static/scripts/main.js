// 示例数据填充
const sampleData = [
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    { Scode: '001', Sname: '站点1', Stype: '类型1', Department: '单位1', River: '河流1', BuildTime: '2020-01-01', Actions: '操作' },
    { Scode: '002', Sname: '站点2', Stype: '类型2', Department: '单位2', River: '河流2', BuildTime: '2020-02-01', Actions: '操作' },
    // 更多数据行...
];

document.addEventListener('DOMContentLoaded', function () {
    /* 添加表的数据行*/
    addDataRow(sampleData);

    /*表字段按钮增删改响应事件-----*/
    document.getElementById('btn1').addEventListener('click', function () {
        console.log('添加按钮被点击');
        //alert('添加按钮被点击');
    });
    document.getElementById('btn2').addEventListener('click', function () {
        console.log('修改按钮被点击');
        $('#editFieldModal').modal('show');
    });

    document.getElementById('btn3').addEventListener('click', function () {
        console.log('删除按钮被点击');
        $('#deleteFieldModal').modal('show');
    });
    /*表字段按钮增删改响应事件----*/

    /*查询数据项*/
    document.querySelector('.btn-primary').addEventListener('click', function () {
        searchStations();
    });
    document.getElementById('btn1').addEventListener('click', function () {
        console.log('添加按钮被点击');
        // No alert needed as we are opening a modal
    });

    /*添加表字段*/
    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('/addField', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('字段添加成功');
                // Optionally, close the modal
                $('#addModal').modal('hide');
                // Reload or update the table to show the new field
                // location.reload(); // or implement a function to update the table dynamically
            } else {
                alert('字段添加失败: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('字段添加失败');
        });
    });

    /*修改表字段*/
    document.getElementById('editFieldForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('/editField', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('字段修改成功');
                $('#editFieldModal').modal('hide');
                // 更新界面或执行其他操作
            } else {
                alert('字段修改失败: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('字段修改失败');
        });
    });

    /*删除表字段*/
    document.getElementById('deleteFieldForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('/deleteField', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('字段删除成功');
                $('#deleteFieldModal').modal('hide');
                // 更新界面或执行其他操作
            } else {
                alert('字段删除失败: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('字段删除失败');
        });
});

});


/*显示数据项*/
function addDataRow(data) {
    const resultsTableBody = document.getElementById('resultsTableBody');

    data.forEach(row => {
        const dataRow = document.createElement('tr');

        dataRow.innerHTML = `
            <td>${row.Scode}</td>
            <td><a href="#" onclick="openEditModal('${row.Scode}', '${row.Sname}', '${row.Stype}', '${row.Department}', '${row.River}', '${row.BuildTime}', '${row.Address}', '${row.El}', '${row.Nl}')">${row.Sname}</a></td>
            <td>${row.Stype}</td>
            <td>${row.Department}</td>
            <td>${row.River}</td>
            <td>${row.BuildTime}</td>
            <td><a href="#" class="btn btn-sm btn-primary">${row.Actions}</a></td>
        `;

        resultsTableBody.appendChild(dataRow);
    });
}
/*修改数据项*/
function openEditModal(Scode, Sname, Stype, Department, River, BuildTime, Address, El, Nl) {
    document.getElementById('modalScode').value = Scode;
    document.getElementById('modalSname').value = Sname;
    document.getElementById('modalStype').value = Stype;
    document.getElementById('modalDepartment').value = Department;
    document.getElementById('modalRiver').value = River;
    document.getElementById('modalAddress').value = Address;
    document.getElementById('modalEl').value = El;
    document.getElementById('modalNl').value = Nl;
    document.getElementById('modalTime').value = BuildTime;

    $('#editModal').modal('show');
}
/*查询数据项*/
function searchStations() {
    // 显示加载指示器
    document.getElementById('loadingSpinner').style.display = 'inline-block';

    // 获取查询参数
    const Sname = document.getElementById('Sname').value;
    const Scode = document.getElementById('Scode').value;
    const Stype = document.getElementById('Stype').value;
    const Department = document.getElementById('Department').value;
    const River = document.getElementById('River').value;
    const Time = document.getElementById('Time').value;

    // 发送查询请求
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Sname, Scode, Stype, Department, River, Time }),
    })
    .then(response => response.json())
    .then(data => {
        // 填充结果到表格中
        const resultsTableBody = document.getElementById('resultsTableBody');
        resultsTableBody.innerHTML = ''; // 清空表格
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Scode}</td>
                <td>${row.Sname}</td>
                <td>${row.Stype}</td>
                <td>${row.Department}</td>
                <td>${row.River}</td>
                <td>${row.BuildTime}</td>
                <td>
                    <a href='detail.jsp?id=${row.LocationID}&Sname=${row.Sname}&Scode=${row.Scode}'>详细地址信息</a>&nbsp;
                    <a href='edit.jsp?Scode=${row.Scode}&Sname=${row.Sname}'>修改</a>&nbsp;
                    <a href='delete.jsp?Scode=${row.Scode}'>删除</a>
                </td>
            `;
            resultsTableBody.appendChild(tr);
        });

        // 隐藏加载指示器
        document.getElementById('loadingSpinner').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);

        // 隐藏加载指示器
        document.getElementById('loadingSpinner').style.display = 'none';
    });
}




