var version = "1.0.0"; // 版本号
var defaultAuthor = ""; // 默认作者，用于打印配置清单，可以自行修改
var defaultNote = ""; // 默认备注，用于打印配置清单，可以自行修改

function updatePageTitleWithVersion(version) {
    var currentTitle = document.title;
    var indexV = currentTitle.indexOf('V');
    if (indexV !== -1) {
        var updatedTitle = currentTitle.substring(0, indexV) + 'V' + version + currentTitle.substring(indexV + 1);
        document.title = updatedTitle;
    }
}

window.addEventListener('load', function() {
    updatePageTitleWithVersion(version);
});