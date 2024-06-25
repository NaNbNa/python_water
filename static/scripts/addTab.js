
function addTab(title, url) {
    // 检查是否已存在同名标签页
    let tabId = 'tab-' + title;
    if (document.getElementById(tabId)) {
        // 切换到已存在的标签页
        $('.nav-tabs a[href="#' + tabId + '"]').tab('show');
        return;
    }

    // 创建新标签页列表项
    let tabList = document.getElementById('tabList');
    let newTab = document.createElement('li');
    newTab.className = 'nav-item';
    newTab.innerHTML = `
        <a class="nav-link" id="${tabId}-tab" data-toggle="tab" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">
            ${title} <button type="button" class="close" aria-label="Close" onclick="closeTab('${tabId}')">
                <span aria-hidden="true">&times;</span>
            </button>
        </a>
    `;
    tabList.appendChild(newTab);

    // 创建新标签页内容
    let tabContent = document.getElementById('tabContent');
    let newTabContent = document.createElement('div');
    newTabContent.className = 'tab-pane fade';
    newTabContent.id = tabId;
    newTabContent.role = 'tabpanel';
    newTabContent.setAttribute('aria-labelledby', `${tabId}-tab`);

    // 使用iframe加载页面内容
    newTabContent.innerHTML = `<iframe src="${url}" style="width: 100%; height: 80vh; border: none;"></iframe>`;
    tabContent.appendChild(newTabContent);

    // 激活新标签页
    $('.nav-tabs a[href="#' + tabId + '"]').tab('show');
}

function closeTab(tabId) {
    // 移除标签页列表项和内容
    document.getElementById(tabId).remove();
    document.getElementById(`${tabId}-tab`).parentElement.remove();

    // 如果有其他标签页，则激活第一个标签页
    let firstTab = document.querySelector('.nav-tabs .nav-item:first-child .nav-link');
    if (firstTab) {
        $(firstTab).tab('show');
    }
}


function showEditModal(Scode) {
    var iframe = document.getElementById('editFrame');
    iframe.src = 'edit.jsp?Scode=' + Scode;
    $('#editModal').modal('show');
}
function searchStations() {
    const Scode = document.getElementById('Scode').value;
    const Sname = document.getElementById('Sname').value;
    const Stype = document.getElementById('Stype').value;
    const Department = document.getElementById('Department').value;
    const River = document.getElementById('River').value;
    const Time = document.getElementById('Time').value;

    const queryParams = new URLSearchParams({
        Scode: Scode,
        Sname: Sname,
        Stype: Stype,
        Department: Department,
        River: River,
        Time: Time
    });

    fetch(`http://localhost:5000/search?${queryParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            const resultsTableBody = document.getElementById('resultsTableBody');
            resultsTableBody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.Scode}</td>
                    <td><a href="#" onclick="showEditModal('${row.Scode}')">${row.Sname}</a></td>
                    <td>${row.Station}</td>
                    <td>${row.Department}</td>
                    <td>${row.River}</td>
                    <td>${row.BuildTime}</td>
                    <td>
                        <a href="#" onclick="addTab('详细信息', 'detail.jsp?id=${row.LocationID}&Sname=${row.Sname}&Scode=${row.Scode}')">详细地址信息</a>
                        <a href="#" onclick="addTab('删除', 'delete.jsp?Scode=${row.Scode}')">删除</a>
                    </td>
                `;
                resultsTableBody.appendChild(tr);
            });
        });
}