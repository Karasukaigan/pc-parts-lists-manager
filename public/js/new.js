var table = document.getElementById('AccessoriesTable');

// 强制保存配置清单
function forceSaveList() {
    var listName = document.getElementById('listName').value;
    if (!listName) {
        listName = "配置清单_" + new Date().getTime();
    }

    var jsonData = document.getElementById('jsonOutput').value;
    if (!jsonData) {
        var listData = JSON.parse(`
        {
            "": {
              "型号": "",
              "单价": 0,
              "数量": 0
            }
          }
        `);
    } else {
        var listData = JSON.parse(jsonData);
    }

    var accessoriesListData = {
        name: listName, // 配置清单名称
        data: listData // 配置清单数据
    };

    fetch('/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accessoriesListData)
    })
        .then(response => {
            console.log(accessoriesListData);
            if (response.ok) {
                hideError();
                const forceSaveButton = document.getElementById('forceSaveButton');
                forceSaveButton.textContent = '保存成功！';
                forceSaveButton.disabled = true;
                setTimeout(function () {
                    forceSaveButton.textContent = '强制保存';
                    forceSaveButton.disabled = false;
                }, 2000);
            } else {
                showError('配置清单保存失败');
            }
        })
        .catch(error => {
            console.error(error);
            showError('配置清单保存失败');
        });
}

// 显示或隐藏JSON数据
function toggleJsonVisibility() {
    var jsonOutput = document.getElementById('jsonOutput');
    var jsonButton = document.getElementById('jsonVisibilityButton');
    var buttonContainer = document.getElementById('buttonContainer');
    var errorMessage = document.getElementById('errorMessage');
    var forceSaveButton = document.getElementById('forceSaveButton');

    if (jsonOutput.classList.contains('hide')) {
        jsonOutput.classList.remove('hide');
        jsonButton.textContent = '隐藏JSON';
        forceSaveButton.style.display = 'inline-block';
        if (errorMessage.style.display == 'none') {
            buttonContainer.style.marginBottom = '20px';
        } else {
            buttonContainer.style.marginBottom = '0';
            errorMessage.style.marginBottom = '20px';
        }
    } else {
        jsonOutput.classList.add('hide');
        jsonButton.textContent = '显示JSON';
        forceSaveButton.style.display = 'none';
        if (errorMessage.style.display == 'none') {
            buttonContainer.style.marginBottom = '50px';
        } else {
            buttonContainer.style.marginBottom = '0';
            errorMessage.style.marginBottom = '50px';
        }
    }
}

// 错误提示
function showError(message) {
    var buttonContainer = document.getElementById('buttonContainer');
    var errorMessage = document.getElementById('errorMessage');
    var jsonOutput = document.getElementById('jsonOutput');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    buttonContainer.style.marginBottom = '0px';
    if (jsonOutput.classList.contains('hide')) {
        errorMessage.style.marginBottom = '50px';
    } else {
        errorMessage.style.marginBottom = '20px';
    }
}
function hideError() {
    var buttonContainer = document.getElementById('buttonContainer');
    var errorMessage = document.getElementById('errorMessage');
    var jsonOutput = document.getElementById('jsonOutput');
    errorMessage.style.display = 'none';
    if (jsonOutput.classList.contains('hide')) {
        buttonContainer.style.marginBottom = '50px';
    } else {
        buttonContainer.style.marginBottom = '20px';
    }
}

// 计算总价
function updateTotalPrice() {
    var totalPrice = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var unitPrice = parseFloat(row.cells[2].querySelector('input').value);
        var quantity = parseInt(row.cells[3].querySelector('input').value);
        totalPrice += unitPrice * quantity;
    }

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2) + "元";
}

// 导入配置
function importList() {
    hideError();
    document.getElementById('fileInput').click();
}
function handleFileInput(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
            document.getElementById('listName').value = fileNameWithoutExtension;
            adjustInputWidth();
            applyList(jsonData);
        } catch (error) {
            showError('JSON文件格式错误');
            console.error(error);
        }
    };
    reader.readAsText(file);
}
function applyList(configData) {
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }

    for (const partName in configData) {
        if (Array.isArray(configData[partName])) {
            for (const item of configData[partName]) {
                addAccessoriesItem(partName, item);
            }
        } else {
            addAccessoriesItem(partName, configData[partName]);
        }
    }

    updateJson();
}

// 改变配置清单名称文本框宽度
function adjustInputWidth() {
    const input = document.getElementById('listName');
    const inputValue = input.value;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = getComputedStyle(input).font;
    const textWidth = context.measureText(inputValue).width;
    if (input.value == "") {
        input.style.width = '330px';
    } else {
        input.style.width = (textWidth + 10) + 'px';
    }

}
document.getElementById('listName').addEventListener('input', adjustInputWidth);
window.addEventListener('load', adjustInputWidth);

// 刷新页面
function clearPage() {
    if (confirm("确认清空当前配置清单？")) {
        window.location.reload();
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/refresh", true);
    xmlHttp.send();
}

// 添加一行配件
function addAccessoriesItem(partName = '', item = { '型号': '', '单价': 0, '数量': 0 }) {
    hideError();
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = `<input type="text" required value="${partName}" oninput="updateJson()">`;
    cell2.innerHTML = `<input type="text" required value="${item['型号']}" oninput="updateJson()">`;
    cell3.innerHTML = `<input type="number" min="0" required value="${item['单价']}" oninput="updateJson()">`;
    cell4.innerHTML = `<input type="number" min="0" required value="${item['数量']}" oninput="updateJson()">`;
    cell5.innerHTML = `
        <button onclick="moveUp(this)">上移</button>
        <button onclick="moveDown(this)">下移</button>
        <button onclick="removeAccessoriesItem(this)">删除</button>
    `;
}

// 删除此行配件
function removeAccessoriesItem(button) {
    hideError();
    var row = button.parentNode.parentNode;
    if (table.rows.length > 2) {
        row.parentNode.removeChild(row);
        updateJson();
    }
}

function moveUp(button) {
    var row = button.parentNode.parentNode;
    var previousRow = row.previousElementSibling;
    if (previousRow && previousRow.tagName === "TR" && table.rows[0] !== previousRow) {
        swapRows(row, previousRow);
    }
}

function moveDown(button) {
    var row = button.parentNode.parentNode;
    var nextRow = row.nextElementSibling;
    if (nextRow && nextRow.tagName === "TR") {
        swapRows(row, nextRow);
    }
}

function swapRows(row1, row2) {
    var parent = row1.parentNode;
    var index1 = Array.prototype.indexOf.call(parent.children, row1);
    var index2 = Array.prototype.indexOf.call(parent.children, row2);

    if (index1 > index2) {
        // 交换行的位置
        row2.replaceWith(row1);
        parent.insertBefore(row2, row1);
    } else {
        // 交换行的位置
        row1.replaceWith(row2);
        parent.insertBefore(row1, row2);
    }

    // 交换输入元素的值
    var tempValues = [];
    for (var i = 0; i < row1.cells.length - 1; i++) {
        var temp = row1.cells[i].querySelector('input').value;
        row1.cells[i].querySelector('input').value = row2.cells[i].querySelector('input').value;
        row2.cells[i].querySelector('input').value = temp;
    }

    updateJson();
}

// 更新JSON
function updateJson() {
    var data = {};
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var partName = row.cells[0].querySelector('input').value;
        var item = {
            型号: row.cells[1].querySelector('input').value,
            单价: parseFloat(row.cells[2].querySelector('input').value),
            数量: parseInt(row.cells[3].querySelector('input').value)
        };

        if (Array.isArray(data[partName])) {
            data[partName].push(item);
        } else if (data[partName]) {
            var existingItem = data[partName];
            data[partName] = [existingItem, item];
        } else {
            data[partName] = item;
        }
    }
    var jsonData = JSON.stringify(data, null, 2);
    document.getElementById('jsonOutput').textContent = jsonData;

    updateTotalPrice();
}

// 保存配置清单
function saveList() {
    var listName = document.getElementById('listName').value;
    if (!listName) {
        showError('未填写配置清单名称');
        return;
    }

    var isValid = true;

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var inputs = row.getElementsByTagName('input');

        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].value.trim() === '') {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            showError('存在未填写的数据');
            return;
        }

        var price = parseFloat(inputs[2].value);
        var quantity = parseInt(inputs[3].value);

        if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        var jsonData = document.getElementById('jsonOutput').value;
        var listData = JSON.parse(jsonData);
        var accessoriesListData = {
            name: listName, // 配置清单名称
            data: listData // 配置清单数据
        };

        fetch('/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accessoriesListData)
        })
            .then(response => {
                console.log(accessoriesListData);
                if (response.ok) {
                    hideError();
                    const saveButton = document.getElementById('saveButton');
                    saveButton.textContent = '保存成功！';
                    saveButton.disabled = true;
                    setTimeout(function () {
                        saveButton.textContent = '保存新配置清单';
                        saveButton.disabled = false;
                    }, 2000);
                } else {
                    showError('配置清单保存失败');
                }
            })
            .catch(error => {
                console.error(error);
                showError('配置清单保存失败');
            });
    } else {
        showError('配件单价或数量出现数值错误');
    }
}