var globalConfigData = {}; // 配置清单的JSON数据

// 复制文本
function copyText() {
    try {
        const title = document.getElementById('partsListTitle');
        const table = document.getElementById('configTable');
        const rows = table.querySelectorAll('tbody tr');
        const tfootRow = table.querySelector('tfoot tr');
        if (rows.length === 0) return;

        let csvContent = title.innerHTML + '\n';

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells).map((cell, index) => {
                const cellValue = cell.textContent.trim();
                return index === 2 ? "×" : index === 3 ? cellValue + "个，" : index === 4 ? Math.round(parseFloat(cellValue)) + "元" : index > 0 ? cellValue : cellValue + '：';
            });
            csvContent += rowData.join('') + '\n';
        });

        const tfootCells = tfootRow.querySelectorAll('td');
        const tfootData = Array.from(tfootCells).map((cell, index) => {
            const cellValue = cell.textContent.trim();
            return index === 1 ? cellValue + "元" : cellValue;
        });
        csvContent += tfootData.join('') + '\n';

        const textarea = document.createElement('textarea');
        textarea.value = csvContent;
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
            const copyButton = document.querySelector('.ant-btn[onclick="copyText()"]');
            copyButton.textContent = '复制成功！';
            copyButton.disabled = true;
            setTimeout(function () {
                copyButton.textContent = '复制文本';
                copyButton.disabled = false;
            }, 2000);
        } else {
            console.error('浏览器不支持execCommand方法或命令执行失败');
        }
    } catch (error) {
        console.error(error);
    }
}

// 截图
function takeScreenshot() {
    var formContainers = document.querySelectorAll('.form-container');
    formContainers.forEach(function (formContainer) {
        formContainer.style.display = 'none';
    });
    var footerContainer = document.getElementById('footerText');
    footerContainer.style.display = 'none';

    // 在截图前插入临时文本
    var tableWrapper = document.querySelector('.ant-table-wrapper');
    var authorText = document.createElement('div');
    // authorText.textContent = '截图来自DIY主机配置清单管理器 V' + version + ' 由鸦无量开发';
    authorText.textContent = '';
    authorText.style.textAlign = 'center';
    // authorText.style.marginTop = '10px';
    authorText.style.fontSize = '80%';
    authorText.style.color = 'lightgray';
    tableWrapper.insertAdjacentElement('afterend', authorText);

    setTimeout(function () {
        // 计算截图范围的宽度、高度
        var h1Element = document.querySelector('h1');
        var tableWrapper = document.querySelector('.ant-table-wrapper');
        var maxWidth = Math.max(h1Element.offsetWidth, tableWrapper.offsetWidth) + 80;
        var bodyHeight = document.body.scrollHeight;

        // 计算水平居中的偏移量
        var offsetX = (window.innerWidth - maxWidth) / 2;

        // 使用html2canvas库将整个页面渲染成canvas然后下载
        html2canvas(document.body, {
            width: maxWidth, // 设置截图宽度
            height: bodyHeight, // 设置截图高度
            x: offsetX, // 设置水平偏移量
        }).then(function (canvas) {
            var imageDataURL = canvas.toDataURL('image/jpeg');

            // 设置下载链接并点击下载
            var downloadLink = document.createElement('a');
            downloadLink.download = h1Element.textContent + '.jpg';
            downloadLink.href = imageDataURL;
            downloadLink.click();
            downloadLink.remove();

            authorText.remove();
            formContainers.forEach(function (formContainer) {
                formContainer.style.display = 'block';
            });
            footerContainer.style.display = 'block';
        }).catch(function (error) {
            console.error('截图失败：', error);

            authorText.remove();
            formContainers.forEach(function (formContainer) {
                formContainer.style.display = 'block';
            });
        });
    }, 500);
}

// 复制JSON数据到剪切板
function copyJSON() {
    if (Object.keys(globalConfigData).length === 0) return;
    try {
        const jsonString = JSON.stringify(globalConfigData, null, 2);
        const cleanedJsonString = jsonString.replace(/\n/g, '').replace(/\s+/g, ' ');
        const textarea = document.createElement('textarea');
        textarea.value = cleanedJsonString;
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
            const copyButton = document.querySelector('.ant-btn[onclick="copyJSON()"]');
            copyButton.textContent = '复制成功！';
            copyButton.disabled = true;
            setTimeout(function () {
                copyButton.textContent = '复制JSON';
                copyButton.disabled = false;
            }, 2000);
        } else {
            console.error('浏览器不支持execCommand方法或命令执行失败');
        }
    } catch (error) {
        console.error(error);
    }
}

// 打印配置清单
function printTable() {
    // 隐藏不需要被打印的元素
    var formContainers = document.querySelectorAll('.form-container');
    formContainers.forEach(function (formContainer) {
        formContainer.style.display = 'none';
    });

    // 插入临时文本
    var tableWrapper = document.querySelector('.ant-table-wrapper');
    var configTable = document.querySelector('.config-table');
    var authorText = document.createElement('div');
    authorText.textContent = '作者：' + defaultAuthor;
    authorText.style.width = configTable.offsetWidth + 'px';
    authorText.style.marginTop = '20px';
    var dateText = document.createElement('div');
    var currentDate = new Date().toISOString().slice(0, 10);
    dateText.textContent = '日期：' + currentDate;
    dateText.style.width = configTable.offsetWidth + 'px';
    dateText.style.marginTop = '20px';
    var remarkText = document.createElement('div');
    remarkText.textContent = '备注：' + defaultNote;
    remarkText.style.width = configTable.offsetWidth + 'px';
    remarkText.style.marginTop = '20px';
    tableWrapper.insertAdjacentElement('afterend', remarkText);
    tableWrapper.insertAdjacentElement('afterend', dateText);
    tableWrapper.insertAdjacentElement('afterend', authorText);
    var footer = document.getElementById('footerText');
    var originalFooterText = footer.innerHTML;
    footer.innerHTML = 'DIY主机配置清单管理器 V' + version + ' 由鸦无量开发';

    // 执行打印操作
    window.print();

    // 删除临时文本
    authorText.remove();
    dateText.remove();
    remarkText.remove();
    footer.innerHTML = originalFooterText;

    // 打印完成后显示被隐藏的元素
    formContainers.forEach(function (formContainer) {
        formContainer.style.display = 'block';
    });
}

// 导出为CSV
function exportToCSV() {
    const table = document.getElementById('configTable');
    const rows = table.querySelectorAll('tr');

    // 构建CSV内容
    let csvContent = 'data:text/csv;charset=utf-8,';
    const headerRow = Array.from(rows[0].querySelectorAll('th')).map(cell => cell.innerText);
    const headerCSV = headerRow.join(',');
    csvContent += headerCSV + '\r\n';
    for (let i = 1; i < rows.length; i++) {
        const rowData = Array.from(rows[i].querySelectorAll('td')).map(cell => cell.innerText);
        const rowCSV = rowData.join(',');
        csvContent += rowCSV + '\r\n';
    }

    // 获取文件名
    const selectedConfig = document.getElementById('filename').value;
    const fileName = `${selectedConfig}.csv`;

    // 创建并下载CSV文件
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 跳转到创建配置清单页面
function createNewConfig() {
    window.location.href = '/new';
}

// 删除指定配置清单
function deleteConfig() {
    const selectedConfig = document.getElementById('filename').value;
    if (selectedConfig) {
        const confirmDelete = confirm(`确认删除配置清单 ${selectedConfig} 吗？`);
        if (confirmDelete) {
            fetch(`/delete?filename=${selectedConfig}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        location.reload(); // 刷新页面
                    } else {
                        console.error('配置清单删除失败');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}

// 加载配置清单
function loadConfig() {
    const filenameInput = document.getElementById('filename');
    const filename = filenameInput.value.trim();
    if (!filename) {
        console.error('配置清单名为空');
        return;
    }
    
    var printButton = document.querySelector('.ant-btn[onclick="printTable()"]');
    var exportButton = document.querySelector('.ant-btn[onclick="exportToCSV()"]');
    var copyButton = document.querySelector('.ant-btn[onclick="copyJSON()"]');
    var screenshotButton = document.querySelector('.ant-btn[onclick="takeScreenshot()"]');
    var copyTextButton = document.querySelector('.ant-btn[onclick="copyText()"]');
    printButton.disabled = false;
    exportButton.disabled = false;
    copyButton.disabled = false;
    screenshotButton.disabled = false;
    copyTextButton.disabled = false;

    document.querySelector('h1').innerText = filename;

    fetch(`json/${filename}.json`)
        .then(response => response.json())
        .then(data => {
            globalConfigData = data;

            const tableBody = document.querySelector('#configTable tbody');
            tableBody.innerHTML = '';
            const tableFoot = document.querySelector('tfoot');
            tableFoot.innerHTML = '';

            let total = 0;

            for (const [part, details] of Object.entries(data)) {
                const row = document.createElement('tr');
                const partCell = document.createElement('td');
                partCell.textContent = part;
                row.appendChild(partCell);

                if (Array.isArray(details)) {
                    for (let i = 0; i < details.length; i++) {
                        const item = details[i];
                        const { 型号, 单价, 数量 } = item;

                        const row = document.createElement('tr');

                        const devicePartCell = document.createElement('td');
                        devicePartCell.textContent = `${part}${i + 1}`;
                        row.appendChild(devicePartCell);

                        const modelCell = document.createElement('td');
                        modelCell.textContent = 型号;
                        row.appendChild(modelCell);

                        const priceCell = document.createElement('td');
                        priceCell.textContent = 单价.toFixed(2);
                        row.appendChild(priceCell);

                        const quantityCell = document.createElement('td');
                        quantityCell.textContent = 数量;
                        row.appendChild(quantityCell);

                        const totalCell = document.createElement('td');
                        const totalPrice = 单价 * 数量;
                        totalCell.textContent = totalPrice.toFixed(2);
                        row.appendChild(totalCell);

                        total += totalPrice;

                        document.querySelector('tbody').appendChild(row);
                    }
                } else {
                    const { 型号, 单价, 数量 } = details;
                    const modelCell = document.createElement('td');
                    modelCell.textContent = 型号;
                    row.appendChild(modelCell);

                    const priceCell = document.createElement('td');
                    priceCell.textContent = 单价.toFixed(2);
                    row.appendChild(priceCell);

                    const quantityCell = document.createElement('td');
                    quantityCell.textContent = 数量;
                    row.appendChild(quantityCell);

                    const totalCell = document.createElement('td');
                    const totalPrice = 单价 * 数量;
                    totalCell.textContent = totalPrice.toFixed(2);
                    row.appendChild(totalCell);

                    total += totalPrice;

                    document.querySelector('tbody').appendChild(row);
                }
            }

            const totalRow = document.createElement('tr');
            const totalCell = document.createElement('td');
            totalCell.colSpan = 4;
            totalCell.textContent = '总价';
            totalRow.appendChild(totalCell);

            const grandTotalCell = document.createElement('td');
            grandTotalCell.textContent = total.toFixed(2);
            totalRow.appendChild(grandTotalCell);

            document.querySelector('tfoot').appendChild(totalRow);
        })
        .catch(error => console.error(error));
}

// 获取所有配置清单（在json目录下）
fetch('/json')
    .then(response => response.json())
    .then(data => {
        const filenameSelect = document.getElementById('filename');

        data.sort((a, b) => {
            const numA = parseInt(a.match(/^\d+/), 10);
            const numB = parseInt(b.match(/^\d+/), 10);
            return numA - numB;
        });

        for (const filename of data) {
            const option = document.createElement('option');
            option.value = filename;
            option.textContent = filename;
            filenameSelect.appendChild(option);
        }
    })
    .catch(error => console.error(error));