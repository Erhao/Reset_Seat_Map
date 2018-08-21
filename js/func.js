function preLoad() {
    var storage = window.localStorage;
    var is_autoReset = parseInt(storage.getItem("is_autoReset")); //number型
    var today = getDateTimeWeek();
    var week = today[2];
    var year = today[3];
    var month = today[4];
    var day = today[5];
    var headCount = parseInt(storage.getItem("headCount"));
    var bigColCount = parseInt(storage.getItem("bigColCount"));
    var deskmateCount = parseInt(storage.getItem("deskmateCount"));
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }
//从localStorage中获取数据构建indexArr和studInfoArr
    var indexArr = [];
    var studInfoArr = [];
    for (var a = 0; a < rowsCount; a++) {//每一行
        studInfoArr[a] = [];
        for (var b = 0; b < bigColCount; b++) {//每一大排
            studInfoArr[a][b] = [];
            for (var c = 0; c < deskmateCount; c++) {//同位
                var storageKey = "row" + a + "dp" + b + "de" + c;
                var storageVal = storage.getItem(storageKey);
                studInfoArr[a][b].push(storageVal);
                var aStr = a.toString();
                var bStr = b.toString();
                var cStr = c.toString();
                var index = aStr + bStr + cStr;
                indexArr.push(index);
            }
        }
    }
    if (is_autoReset === 1) {//自动重排打开
        document.getElementById("autoResetBtn").innerHTML = "已开启";
        document.getElementById("autoResetBtn").setAttribute("style", "color: green");
        document.getElementById("autoResetBtn").setAttribute("title", "点击关闭自动更新");
    } else {
        document.getElementById("autoResetBtn").innerHTML = "已关闭";
        document.getElementById("autoResetBtn").setAttribute("style", "color: red");
        document.getElementById("autoResetBtn").setAttribute("title", "点击开启自动更新");
    }
    var nowWeekOfYear = getDateTimeWeek()[2];
    console.log("In preload          nowWeekOfYear:");
    console.log(nowWeekOfYear);
    var weekOfYear = parseInt(storage.getItem("week"));
    var weekDiff = nowWeekOfYear - weekOfYear;
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }
    if (weekDiff !== 0) {//不是本周
//调用自动重排1次，自动重排符合边至中，后至前规则
        if (is_autoReset === 1) {
            newSIA = auRandomReset(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount);
            autoUpdateStor(headCount, bigColCount, deskmateCount, newSIA, rowsCount);//会先清空stor
            showInfoTable(headCount, bigColCount, deskmateCount, newSIA);
        } else {
            document.getElementById("inputDetailsFbArea").style.display = "block";
            document.getElementById("fbHeadCount").innerHTML = headCount;
            document.getElementById("fbBigColCount").innerHTML = bigColCount;
            document.getElementById("fbDeskmateCount").innerHTML = deskmateCount;
            document.getElementById("fbYear").innerHTML = year;
            document.getElementById("fbMonth").innerHTML = month;
            document.getElementById("fbDay").innerHTML = day;
            document.getElementById("fbWeek").innerHTML = week;
            alert("由于你关闭了自动更新，所以本周座次未更新！\n当前为第" + parseInt(nowWeekOfYear) + "周，即将显示在表格中的座次顺序为第" + weekOfYear + "周数据\n打开自动更新按钮查看最新座次表！");
            showInfoTable(headCount, bigColCount, deskmateCount, studInfoArr);
        }
    } else {//是本周
//            alert("是本周！");
        document.getElementById("inputDetailsFbArea").style.display = "block";
        document.getElementById("fbHeadCount").innerHTML = headCount;
        document.getElementById("fbBigColCount").innerHTML = bigColCount;
        document.getElementById("fbDeskmateCount").innerHTML = deskmateCount;
        document.getElementById("fbYear").innerHTML = year;
        document.getElementById("fbMonth").innerHTML = month;
        document.getElementById("fbDay").innerHTML = day;
        document.getElementById("fbWeek").innerHTML = week;
        showInfoTable(headCount, bigColCount, deskmateCount, studInfoArr);
    }
}

function chgAutoResetWeekly() {
    var stor = window.localStorage;
    var nowWeekOfYear = getDateTimeWeek()[2];
    var weekOfYear = parseInt(stor.getItem("week"));
    var headCount = parseInt(stor.getItem("headCount"));
    var bigColCount = parseInt(stor.getItem("bigColCount"));
    var deskmateCount = parseInt(stor.getItem("deskmateCount"));
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }

    if (document.getElementById("autoResetBtn").innerHTML === "已开启") {
        stor.setItem("is_autoReset", 0);
        document.getElementById("autoResetBtn").innerHTML = "已关闭";
        document.getElementById("autoResetBtn").setAttribute("style", "color: red");
        document.getElementById("autoResetBtn").setAttribute("title", "点击开启自动更新");
    } else if (document.getElementById("autoResetBtn").innerHTML === "已关闭") {
//        stor.setItem("is_autoReset", 1);
        document.getElementById("autoResetBtn").innerHTML = "已开启";
        document.getElementById("autoResetBtn").setAttribute("style", "color: green");
        document.getElementById("autoResetBtn").setAttribute("title", "点击关闭自动更新");
        if (weekOfYear !== nowWeekOfYear) {//相当于完善preload里的功能
            var studInfoArr = [];
            for (var a = 0; a < rowsCount; a++) {//每一行
                studInfoArr[a] = [];
                for (var b = 0; b < bigColCount; b++) {//每一大排
                    studInfoArr[a][b] = [];
                    for (var c = 0; c < deskmateCount; c++) {//同位
                        var storageKey = "row" + a + "dp" + b + "de" + c;
                        var storageVal = stor.getItem(storageKey);
                        studInfoArr[a][b].push(storageVal);
                    }
                }
            }
            newSIA = auRandomReset(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount);
            autoUpdateStor(headCount, bigColCount, deskmateCount, newSIA, rowsCount);//会先清空stor
            showInfoTable(headCount, bigColCount, deskmateCount, newSIA);
            alert("座次表已更新为最新数据！\n后台已自动更新数据，下周你将会看到新的座次！");
        }
    }
}

function showRInputDetailsArea() {//显示总人数 同位数 大排数输入框
    var is_show = document.getElementById("InputDetailsArea").style.display;
    if (is_show === 'none') {
        document.getElementById("InputDetailsArea").style.display = "block";
    } else {
        document.getElementById("InputDetailsArea").style.display = "none";
    }
}

function createInputInfoTable() {
    document.getElementById("InputDetailsArea").style.display = "none"; //隐藏三个输入框
    var headCount = parseInt(document.getElementById("headCount").value); //总人数
    var bigColCount = parseInt(document.getElementById("bigColCount").value); //大排数
    var deskmateCount = parseInt(document.getElementById("deskmateCount").value); //同位数
    //
    //输入判断
    if (isNaN(headCount) || isNaN(bigColCount) || isNaN(deskmateCount)) {
        alert("请不要遗漏表格！");
        return 0;
    }
    if (headCount < bigColCount * deskmateCount) {
        alert("您输入的数据有误，请重新输入！");
        return 0;
    }
    var inputDetailsFb = "学生总人数：<span id='fbHeadCount'>" + headCount + "</span>    大排数：<span id='fbBigColCount'>" + bigColCount + "</span>    同位数：<span id='fbDeskmateCount'>" + deskmateCount + "</span>";
//    document.getElementById("inputDetailsFbArea").style.display = "block";
    document.getElementById("fbHeadCount").innerHTML = headCount;
    document.getElementById("fbBigColCount").innerHTML = bigColCount;
    document.getElementById("fbDeskmateCount").innerHTML = deskmateCount;
    var tableArea = document.getElementById("tableArea");
    var tHeader = "<table id = 'infoTable' class = 'table table-borderd table-striped table-hover'>";
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }
//    console.log(rowsCount);
    var colsCount = parseInt(bigColCount * (deskmateCount + 1) - 1);
//    console.log(colsCount);
    var tBody = "<tr id='firstRow'><th colspan = " + colsCount + " class='text-center'>讲台</th></tr>";
    for (var i = 0; i < rowsCount; i++) {//一行
        tBody += "<tr id='row" + i + "'>"; //标记每一行 row1  row2 ...
        for (var j = 0; j < bigColCount; j++) {//一大排
            if (j === bigColCount - 1) {
                for (var k = 0; k < deskmateCount; k++) {
                    tBody += "<td id='td" + i.toString() + j.toString() + k.toString() + "'><input type='checkbox' name='chk' id='chk" + i.toString() + j.toString() + "" + k.toString() + "'/><input id='row" + i + "dp" + j + "de" + k + "' type='text' class='form-control'></td>";
                }
            } else {
                for (var k = 0; k < deskmateCount; k++) {//同位
                    tBody += "<td id='td" + i.toString() + j.toString() + k.toString() + "'><input type='checkbox' name='chk' id='chk" + i.toString() + j.toString() + k.toString() + "'/><input id='row" + i + "dp" + j + "de" + k + "' type='text' class='form-control'></td>";
                }
                tBody += "<td style='background: gray;'></td>";
            }
        }
        tBody += "</tr>";
    }
    var tFooter = "</table>";
    var table = "" + tHeader + tBody + tFooter;
    tableArea.innerHTML = table;
    document.getElementById("afterTable1").style.display = "block";
    document.getElementById("afterTable2").style.display = "block";
    document.getElementById("afterTable3").style.display = "block";
}

function getStudInfo() {//获取表格中输入的信息
    var studInfoArr = [];
    var infoTable = document.getElementById("infoTable");
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
//    console.log(fbHeadCount);
//    console.log(typeof(fbHeadCount));
    var indexArr = []; //将每个单元格的下标i j k 保存到一维数组中，供取随机数用
    var tdisnull = 0;
    for (var i = 0; i < infoTable.rows.length - 1; i++) {
        studInfoArr[i] = []; //二维
//        var rowId = "row" + i;
//        var row = document.getElementById(rowId);
        for (var j = 0; j < fbBigColCount; j++) {
            studInfoArr[i][j] = []; //三维
            for (var k = 0; k < fbDeskmateCount; k++) {
                var tdId = "row" + i + "dp" + j + "de" + k;
                var td = document.getElementById(tdId).value;
                if (td === "") {//对空值进行计数，若超过一定数量就报错
                    tdisnull += 1;
                }
//                console.log(td);
                studInfoArr[i][j].push(td);
                var iStr = i.toString();
                var jStr = j.toString();
                var kStr = k.toString();
                var index = iStr + jStr + kStr;
                indexArr.push(index);
            }
        }
    }
    if (tdisnull >= fbBigColCount * fbDeskmateCount) {
        alert("你输入的数据数量有误，请重新输入！");
        return 0;
    }
    //    console.log(studInfoArr);
    var allCellsCount = fbBigColCount * fbDeskmateCount * (infoTable.rows.length - 1);
//    showInfoTable(fbHeadCount, fbBigColCount, fbDeskmateCount, indexArr, studInfoArr);
    document.getElementById("afterTable3").style.display = "block";
    return [fbHeadCount, fbBigColCount, fbDeskmateCount, indexArr, studInfoArr];
}

function getBlackList() {//将blackList存入localstorage  第一次录入数据时调用此函数，以后editTable则调用updateBlackList
    var stor = window.localStorage;
    var chkboxs = document.getElementsByName("chk");
    var chkedCount = 0;//被选中列入黑名单的人数
    for (var c = 0; c < chkboxs.length; c++) {
        if (chkboxs[c].checked) {
            chkedCount += 1;
        }
    }
    console.log(" In getBlackList   chkedCount:");
    console.log(chkedCount);
    if (chkedCount % 2 === 0) {
        stor = window.localStorage;
        var blackListArr = [];//黑名单数组
        var infoTable = document.getElementById("infoTable");
        var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
        var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
        var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
        for (var i = 0; i < infoTable.rows.length - 1; i++) {
            for (var j = 0; j < fbBigColCount; j++) {
                for (var k = 0; k < fbDeskmateCount; k++) {
                    var tdId = "row" + i + "dp" + j + "de" + k;
                    var tdVal = document.getElementById(tdId).value;
                    //检查黑名单
                    var chkId = "chk" + i + "" + j + "" + k;
                    console.log("In getBlackList      type of chkId:");
                    console.log(typeof (chkId));
                    console.log(chkId);
                    var chkbox = document.getElementById(chkId);
                    console.log("In getBlackList         chkbox:");
                    console.log(chkbox);
                    if (chkbox.checked) {
                        blackListArr.push(tdVal);//被选中的学生姓名列进黑名单数组  新加的
                    }
                }
            }
        }
        console.log("In getBlackList      blackListArr:");
        console.log(blackListArr);
        var blackListVal = "";
        if (blackListArr.length > 0) {//黑名单数组有数据
            for (var b = 0; b < blackListArr.length; b++) {//遍历黑名单数组  形成一个包含所有黑名单的str   str中内容为人的名字
                blackListVal += blackListArr[b];
                if (b !== blackListArr.length - 1) {
                    blackListVal += ",";
                    console.log("加了一次！！！！");
                }
            }
            stor.setItem("blackList", blackListVal);//将黑名单存入localStorage
        }
    } else {//chkedCount 不为0或2
        alert("请选择偶数名学生");
    }
}

function updateBlackList() {//除第一次输入数据，其他所有更新BL都是调用此函数
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
    if (parseInt(fbHeadCount) % parseInt(fbBigColCount * fbDeskmateCount)) {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount)); //行数
    }
    //取出原来localstorage中的BL元素
    var stor = window.localStorage;
    var blInStorArr = [];
    var blInStor = "";
    var storKeysArr = [];
    for (var s = 0; s < stor.length; s++) {
        storKeysArr.push(stor.key(s));
    }
    var flag = 0;
    for (var b = 0; b < storKeysArr.length; b++) {//原先localstorage中有blackList一项
//        console.log("storage中有blackList");
        if (storKeysArr[b] === "blackList") {
            flag = 1;
        }
    }
    //以上是检测LS中有无BL
    addBlChkbox();

    if (flag) {
        blInStor = stor.getItem("blackList");
        blInStorArr = blInStor.split(",");
    }
    //遍历table
    checkedCount = 0;
    var newBlArr = [];
    for (var i = 0; i < rowsCount; i++) {
        for (var j = 0; j < fbBigColCount; j++) {
            for (var k = 0; k < fbDeskmateCount; k++) {
                tdInputId = "row" + i.toString() + "dp" + j.toString() + "de" + k.toString();
                chkboxId = "chk" + i.toString() + j.toString() + k.toString();
                var chkbox = document.getElementById(chkboxId);
                if (chkbox.checked) {//checkbox被选中
                    //判断此单元格的值是否是localstorage中的值
                    flag2 = 1;
                    var tdinputVal = document.getElementById(tdInputId).value;
                    for (var c = 0; c < blInStorArr.length; c++) {
                        if (blInStorArr[c] === tdinputVal) {
                            flag2 = 0;
                            break;
                        }
                    }
                    if (flag2) {
                        newBlArr.push(tdinputVal);//发现在LS的BL中没有的值，添加到newBlArr
                    }
                }
            }
        }
    }
    if (oldBlInStorArr !== "") {
        var oldBlInStorArr = blInStorArr;
        for (var i = 0; i < rowsCount; i++) {
            for (var j = 0; j < fbBigColCount; j++) {
                for (var k = 0; k < fbDeskmateCount; k++) {
                    tdInputId2 = "row" + i.toString() + "dp" + j.toString() + "de" + k.toString();
                    chkboxId2 = "chk" + i.toString() + j.toString() + k.toString();
                    var chkbox2 = document.getElementById(chkboxId2);
                    for (var f = 0; f < oldBlInStorArr.length; f++) {
                        if (oldBlInStorArr[f] === document.getElementById(tdInputId2).value && chkbox2.checked === false) {
                            oldBlInStorArr.slice(f, 1);
                        }
                    }
                }
            }
        }
        blInStorArr = oldBlInStorArr;
    }




    if (blInStor !== "" && newBlArr.length > 0) {
        blInStor += ",";
    }
    if (newBlArr.length > 0) {
        for (var n = 0; n < newBlArr.length; n++) {
            blInStor += newBlArr[n];
            if (n !== newBlArr.length - 1) {
                blInStor += ",";
            }
        }
    }
    stor.setItem("blackList", blInStor);
}

function preAbRandomReset() {//执行完全随机重排
    if (gSI = getStudInfo()) {
        var HC = gSI[0];
        var BCC = gSI[1];
        var DC = gSI[2];
        var idxA = gSI[3];
        var sIA = gSI[4];
        var newSIA = abRandomReset(HC, BCC, DC, idxA, sIA);
        console.log("In preAbRandomReset         newSIA:");
        console.log(newSIA);
        var chkedSIA = chkDeskmate(HC, BCC, DC, newSIA);
        showInfoTable(HC, BCC, DC, newSIA);
    }
}

function abRandomReset(headCount, bigColCount, deskmateCount, indexArr, studInfoArr) {//对数组进行操作
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }
    var studInfo_temp;
    var newStudInfoArr = [];
    for (var l = 0; l < rowsCount; l++) {//每一行
        newStudInfoArr[l] = [];
        for (var m = 0; m < bigColCount; m++) {//一大排
            newStudInfoArr[l][m] = [];
            for (var n = 0; n < deskmateCount; n++) {
//                console.log("l:" + l + "   m:" + m + "  n:" + n);
                if (l === rowsCount - 1) {//如果是最后一行
                    var randomIndexOfIndexArr = parseInt(Math.random() * indexArr.length); //下标，比如3
//                        console.log(randomIndexOfIndexArr);
                    var randomIndex = indexArr[randomIndexOfIndexArr]; //比如101
//                        console.log(randomIndex);
                    var ijkIndexArr = randomIndex.split("");
                    var i = ijkIndexArr[0];
                    var j = ijkIndexArr[1];
                    var k = ijkIndexArr[2];
                    studInfo_temp = studInfoArr[i][j][k];
                    newStudInfoArr[l][m].push(studInfo_temp);
                    indexArr.splice(randomIndexOfIndexArr, 1); //从indexArr中删除101元素
                } else {//如果不是最后一行,出现空值则丢弃
                    var randomIndexOfIndexArr = parseInt(Math.random() * indexArr.length); //下标，比如3
                    var randomIndex = indexArr[randomIndexOfIndexArr]; //比如101
                    var ijkIndexArr = randomIndex.split("");
                    var i = ijkIndexArr[0];
                    var j = ijkIndexArr[1];
                    var k = ijkIndexArr[2];
                    studInfo_temp = studInfoArr[i][j][k];
                    while (studInfo_temp === "") {//空值
                        randomIndexOfIndexArr = parseInt(Math.random() * indexArr.length); //下标，比如3
                        randomIndex = indexArr[randomIndexOfIndexArr]; //比如101
                        ijkIndexArr = randomIndex.split("");
                        i = ijkIndexArr[0];
                        j = ijkIndexArr[1];
                        k = ijkIndexArr[2];
                        studInfo_temp = studInfoArr[i][j][k];
                    }
                    newStudInfoArr[l][m].push(studInfo_temp);
                    indexArr.splice(randomIndexOfIndexArr, 1); //从indexArr中删除101元素
                }
            }
        }
    }
    return newStudInfoArr;
}//randomReset();

function auRandomReset(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount) {//自动重排，对数组进行操作
    if (rowsCount === 4 || rowsCount > 6) {
        return b2f1(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount);//
    } else {//rowsCount == 3,5,6
        return b2f2(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount);//
    }
}

//测试用！preb2f()
function preb2f() {//每周自动重排
    var gSI = getStudInfo();
    var HC = gSI[0];    //headCount
    var BCC = gSI[1];   //bigColCount
    var DC = gSI[2];    //deskmateCount
    var idxA = gSI[3];  //indexArr
    var sIA = gSI[4];   //studInfoArr
    if (parseInt(HC) % parseInt(BCC * DC)) {
        var rowsCount = parseInt(HC / (BCC * DC) + 1); //行数
    } else {
        var rowsCount = parseInt(HC / (BCC * DC)); //行数
    }
    if (rowsCount === 4 || rowsCount > 6) {
        sIA2 = b2f1(HC, BCC, DC, sIA, rowsCount);//sIA2是studInfoArr
    } else {//rowsCount == 3,5,6
        sIA2 = b2f2(HC, BCC, DC, sIA, rowsCount);//sIA2是studInfoArr
    }
    console.log("In preb2f");
    console.log("---------------");
    console.log(sIA2);
    console.log(HC);
    console.log(BCC);
    console.log(DC);
    showInfoTable(HC, BCC, DC, sIA2);
}

function b2f2(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount) {
    console.log(parseInt(3 / 2));//1
    console.log(parseInt(5 / 2));//2
    var rowb = [];
    for (var i = rowsCount - 1; i > parseInt(rowsCount / 2); i--) {//把后几排的数据遍历保存为一个数组
        for (var j = 0; j < bigColCount; j++) {
            for (var k = 0; k < deskmateCount; k++) {
                rowb.push(i.toString() + j.toString() + k.toString());
            }
        }
    }
    console.log("rowb: ");
    console.log(rowb);
    var rowf = [];
    for (var l = 0; l <= parseInt(rowsCount / 2); l++) {//把前几排的数据遍历保存为一个数组
        for (var m = 0; m < bigColCount; m++) {
            for (var n = 0; n < deskmateCount; n++) {
                rowf.push(l.toString() + m.toString() + n.toString());
            }
        }
    }
    console.log("rowf: ");
    console.log(rowf);
    var rows = rowf.concat(rowb);
    console.log(rows);
    //随机选择 交换
    for (var r = 0; r < rowb.length; r++) {//从rowf里选出rowb.length个元素
        var randomIndexf = parseInt(Math.random() * rowf.length);
        var llmmnnIndexArr = rowf[randomIndexf].split("");
        var ll = llmmnnIndexArr[0];
        var mm = llmmnnIndexArr[1];
        var nn = llmmnnIndexArr[2];
        var tempData = studInfoArr[ll][mm][nn];
        var iijjkkIndexArr = rowb[r].split("");
        var ii = iijjkkIndexArr[0];
        var jj = iijjkkIndexArr[1];
        var kk = iijjkkIndexArr[2];
        studInfoArr[ll][mm][nn] = studInfoArr[ii][jj][kk];
        studInfoArr[ii][jj][kk] = tempData;
        rowf.splice(randomIndexf, 1);
    }
    //rowf剩下的没动过位置的再相互交换
//    console.log(rowf);
    for (var s = 0; s < parseInt(rowf.length / 2); s++) {
        var abcIndexArr = rowf[s].split("");
        var a = abcIndexArr[0];
        var b = abcIndexArr[1];
        var c = abcIndexArr[2];
        var tempData = studInfoArr[a][b][c];

        var defIndex = rowf[rowf.length - 1 - s].split("");
        var d = defIndex[0];
        var e = defIndex[1];
        var f = defIndex[2];
        studInfoArr[a][b][c] = studInfoArr[d][e][f];
        studInfoArr[d][e][f] = tempData;
    }
    return chkDeskmate(headCount, bigColCount, deskmateCount, studInfoArr);
}

function b2f1(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount) {// 适合rowsCount == 4 or rowsCount > 6      后至前
    var colsCount = parseInt(bigColCount * deskmateCount); //总列数
//从每一行随机选取colsCount - 2个前滚一行，其余2个前滚两行
//    studInfoArr1 = getStudInfo()[4];
//    console.log(studInfoArr);
    var roll2LineArr = [];
    for (var i = 0; i < rowsCount / 2; i++) {//一次
        var temp1 = getChgData(i, bigColCount, deskmateCount); //取第一行的数据
        var temp2 = getChgData((rowsCount - 1 - i), bigColCount, deskmateCount); //取最后一行的数据
        var temp3 = getChgData(i + 1, bigColCount, deskmateCount);
//        for (var t1 in temp1[1]) {//push进一维数组
//            roll2LineArr.push(temp1[1][t1]);
//        }
//        for (var t2 in temp2[1]) {//push进一维数组
//            roll2LineArr.push(temp2[1][t2]);
//        }
//        console.log("iiiiiiiii = " + i);
//        console.log("roll2LineArr   ");
//        console.log(roll2LineArr);
//        console.log("roll2LineArr[0][1]: aaaaaaaa" + roll2LineArr[0][1]);
//        console.log(" ");
//        console.log("*****************;");
//        for (var x in roll2LineArr) {
//            console.log(x, roll2LineArr[x]);
//        }
//        console.log("*****************;");
//        console.log(" ");


        //整行乱序前滚
//        console.log("temp1[0]:  ");
        for (var k = 0; k < temp1[0].length; k++) {//"401"     
            var lmnIndexArr = temp1[0][k].split("");
            var l = lmnIndexArr[0];
            var m = lmnIndexArr[1];
            var n = lmnIndexArr[2];
            var tempBigData = studInfoArr[l][m][n];
            var opqIndexArr = temp2[0][k].split("");
            var o = opqIndexArr[0];
            var p = opqIndexArr[1];
            var q = opqIndexArr[2];
//            console.log(o,p,q);
//            console.log("studInfoArr[o][p][q]:");
//            console.log(studInfoArr[o][p][q]);
            studInfoArr[l][m][n] = studInfoArr[o][p][q]; //将最后一行的数据复制给第一行

            studInfoArr[o][p][q] = tempBigData;
        }


        //相邻两排交换 01   23  45  67
        rowsCount2 = rowsCount;
        if (rowsCount2 % 2 === 0) {//偶数行2468
            if (rowsCount2 / 2 % 2 === 0) {
                roll2LineArr.push(temp1[1]);//["001", "011"]
                roll2LineArr.push(temp2[1]);//["701", "710"]
                console.log("rosCount/2 is even number");
                if ((i + 1) % 2 === 0) {//相邻行交换temp1[1]和temp2[1]的值，相邻两行的i值为i-1和i
                    console.log(roll2LineArr);
//roll2LineArr  [["000", "010"], ["701", "711"], ["110", "111"], ["600", "610"]]
//                  0               1               2               3
                    for (var j = 0; j < roll2LineArr.length / 2; j++) {//交换2次
                        console.log("交换了一次！！    " + i);
                        for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
                            console.log("roll2LineArr[" + k + "]:" + roll2LineArr[k]);
                            var abcIndexArr = roll2LineArr[j][k].split("");
                            var a = abcIndexArr[0];
                            var b = abcIndexArr[1];
                            var c = abcIndexArr[2];
                            var tempSmallData = studInfoArr[a][b][c];
                            var defIndexArr = roll2LineArr[j + 2][k].split("");
                            var d = defIndexArr[0];
                            var e = defIndexArr[1];
                            var f = defIndexArr[2];
                            studInfoArr[a][b][c] = studInfoArr[d][e][f];
                            studInfoArr[d][e][f] = tempSmallData;
                        }
                    }
                    roll2LineArr = [];
                } else {
                    console.log(i + " is not suitable!");
                }
            } else {//rowsCount2 / 2 % 2 != 0   7       rowsCount / 2是奇数
                console.log("rowsCount/2 is a odd number");
                if (i < parseInt(rowsCount / 2 - 1)) {//除中间三行外的头行和尾行
                    roll2LineArr.push(temp1[1]);//["001", "011"]
                    roll2LineArr.push(temp2[1]);//["701", "710"]
                    if ((i + 1) % 2 === 0) {//相邻行交换temp1[1]和temp2[1]的值，相邻两行的i值为i-1和i
//roll2LineArr  [["400", "410"], ["000", "021"], ["310", "300"], ["101", "111"]]
//                  0               1               2               3
                        console.log("roll2LineArr:");
                        console.log(roll2LineArr);
                        for (var j = 0; j < roll2LineArr.length / 2; j++) {//交换2次
                            console.log("roll2LineArr.length:" + roll2LineArr.length);
                            console.log("交换了一次！！！！！   " + i);
                            for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
//                        console.log("temp1[1].length:");
//                        console.log(temp1[1].length);
//                        console.log("j: " + j + "     k:" + k);
//                            console.log(roll2LineArr[j][r]);
                                var abcIndexArr = roll2LineArr[j][k].split("");
                                var a = abcIndexArr[0];
                                var b = abcIndexArr[1];
                                var c = abcIndexArr[2];
                                var tempSmallData = studInfoArr[a][b][c];
                                var defIndexArr = roll2LineArr[j + 2][k].split("");
                                var d = defIndexArr[0];
                                var e = defIndexArr[1];
                                var f = defIndexArr[2];
                                studInfoArr[a][b][c] = studInfoArr[d][e][f];
                                studInfoArr[d][e][f] = tempSmallData;
                            }
                        }
                        roll2LineArr = [];
                    } else {
                        console.log(i + " is not suitable!");
                    }
                } else {//中间三行交换  i == 2      i == 3   此else会进两次
//                        console.log(parseInt(rowsCount / 2 - 1));
//                        console.log("是中间i上一个！！！！！！！！！！ma??????????" + i);
                    roll2LineArr.push(temp1[1]);//["001", "011"] i
                    roll2LineArr.push(temp3[1]);//["701", "710"] i+1
                    //roll2LineArr   [["201", "211"], ["301", "310"]]
                    //                     0               1
                    for (var j = 0; j < 1; j++) {//交换2次
                        console.log("交换了一次！！！！！   " + i);
                        for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
//                        console.log("temp1[1].length:");
//                        console.log(temp1[1].length);
//                        console.log("j: " + j + "     k:" + k);
//                            console.log(roll2LineArr[j][r]);
                            var abcIndexArr = roll2LineArr[j][k].split("");
                            var a = abcIndexArr[0];
                            var b = abcIndexArr[1];
                            var c = abcIndexArr[2];
                            var tempSmallData = studInfoArr[a][b][c];
                            var defIndexArr = roll2LineArr[j + 1][k].split("");
                            var d = defIndexArr[0];
                            var e = defIndexArr[1];
                            var f = defIndexArr[2];
                            studInfoArr[a][b][c] = studInfoArr[d][e][f];
                            studInfoArr[d][e][f] = tempSmallData;
                        }
                    }
                    roll2LineArr = [];

                }
            }



        } else {//奇数行  rowsCount是奇数



            rowsCount2 -= 1;
            if (rowsCount2 / 2 % 2 === 0) {//条件判断，例如9
                console.log("rosCount/2 is a even number");
                roll2LineArr.push(temp1[1]);//["001", "011"]
                roll2LineArr.push(temp2[1]);//["701", "710"]
                if ((i + 1) % 2 === 0) {//相邻行交换temp1[1]和temp2[1]的值，相邻两行的i值为i-1和i
//roll2LineArr  [["000", "010"], ["801", "811"], ["110", "111"], ["700", "710"]]
//                  0               1               2               3
                    console.log("roll2LineArr:");
                    console.log(roll2LineArr);
                    for (var j = 0; j < roll2LineArr.length / 2; j++) {//交换2次
                        console.log("roll2LineArr.length:" + roll2LineArr.length);
                        console.log("交换了一次！！！！！   " + i);
                        for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
//                        console.log("temp1[1].length:");
//                        console.log(temp1[1].length);
//                        console.log("j: " + j + "     k:" + k);
//                            console.log(roll2LineArr[j][r]);
                            var abcIndexArr = roll2LineArr[j][k].split("");
                            var a = abcIndexArr[0];
                            var b = abcIndexArr[1];
                            var c = abcIndexArr[2];
                            var tempSmallData = studInfoArr[a][b][c];
                            var defIndexArr = roll2LineArr[j + 2][k].split("");
                            var d = defIndexArr[0];
                            var e = defIndexArr[1];
                            var f = defIndexArr[2];
                            studInfoArr[a][b][c] = studInfoArr[d][e][f];
                            studInfoArr[d][e][f] = tempSmallData;
                        }
                    }
                    roll2LineArr = [];
                } else {
                    console.log(i + " is not suitable!");
                }
            } else {//rowsCount2 / 2 % 2 != 0   7       rowsCount / 2是奇数
                console.log("rowsCount/2 is a odd number");
                if (i < parseInt(rowsCount / 2 - 1)) {//除中间三行外的头行和尾行
                    roll2LineArr.push(temp1[1]);//["001", "011"]
                    roll2LineArr.push(temp2[1]);//["701", "710"]
                    if ((i + 1) % 2 === 0) {//相邻行交换temp1[1]和temp2[1]的值，相邻两行的i值为i-1和i
//roll2LineArr  [["400", "410"], ["000", "021"], ["310", "300"], ["101", "111"]]
//                  0               1               2               3
                        console.log("roll2LineArr:");
                        console.log(roll2LineArr);
                        for (var j = 0; j < roll2LineArr.length / 2; j++) {//交换2次
                            console.log("roll2LineArr.length:" + roll2LineArr.length);
                            console.log("交换了一次！！！！！   " + i);
                            for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
//                        console.log("temp1[1].length:");
//                        console.log(temp1[1].length);
//                        console.log("j: " + j + "     k:" + k);
//                            console.log(roll2LineArr[j][r]);
                                var abcIndexArr = roll2LineArr[j][k].split("");
                                var a = abcIndexArr[0];
                                var b = abcIndexArr[1];
                                var c = abcIndexArr[2];
                                var tempSmallData = studInfoArr[a][b][c];
                                var defIndexArr = roll2LineArr[j + 2][k].split("");
                                var d = defIndexArr[0];
                                var e = defIndexArr[1];
                                var f = defIndexArr[2];
                                studInfoArr[a][b][c] = studInfoArr[d][e][f];
                                studInfoArr[d][e][f] = tempSmallData;
                            }
                        }
                        roll2LineArr = [];
                    } else {
                        console.log(i + " is not suitable!");
                    }
                } else {//中间三行交换  i == 2      i == 3   此else会进两次
//                        console.log(parseInt(rowsCount / 2 - 1));
//                        console.log("是中间i上一个！！！！！！！！！！ma??????????" + i);
                    roll2LineArr.push(temp1[1]);//["001", "011"] i
                    roll2LineArr.push(temp3[1]);//["701", "710"] i+1
                    //roll2LineArr   [["201", "211"], ["301", "310"]]
                    //                     0               1
                    for (var j = 0; j < 1; j++) {//交换2次
                        console.log("交换了一次！！！！！   " + i);
                        for (var k = 0; k < temp1[1].length; k++) {//每次交换temp1[1].length个  2个数据
//                        console.log("temp1[1].length:");
//                        console.log(temp1[1].length);
//                        console.log("j: " + j + "     k:" + k);
//                            console.log(roll2LineArr[j][r]);
                            var abcIndexArr = roll2LineArr[j][k].split("");
                            var a = abcIndexArr[0];
                            var b = abcIndexArr[1];
                            var c = abcIndexArr[2];
                            var tempSmallData = studInfoArr[a][b][c];
                            var defIndexArr = roll2LineArr[j + 1][k].split("");
                            var d = defIndexArr[0];
                            var e = defIndexArr[1];
                            var f = defIndexArr[2];
                            studInfoArr[a][b][c] = studInfoArr[d][e][f];
                            studInfoArr[d][e][f] = tempSmallData;
                        }
                    }
                    roll2LineArr = [];
                }
            }
        }
    }
    return chkDeskmate(headCount, bigColCount, deskmateCount, studInfoArr);
}

function getChgData(rowNum, bigColCount, deskmateCount) {//获取rowNum行的被挑选出来的colsCount-2个数据
    var colsCount = parseInt(bigColCount * deskmateCount); //总列数
    var rowTemp = [];
    for (var j = 0; j < bigColCount; j++) {
        for (var k = 0; k < deskmateCount; k++) {
            var studInfoArrIndex = rowNum.toString() + j.toString() + k.toString();
            rowTemp.push(studInfoArrIndex); //将每一行的colsCount个数组下标存入数组rowTemp
        }
    }
//    console.log("rowTemp:");
//    console.log(rowTemp);
    var roll1Line = [];
//        var roll1LineData = [];
    var roll2Line = [];
//        var roll2LineData = [];
    for (var r = 0; r < colsCount - 2; r++) {//生成colsCount - 2个随机数push进roll1Line，用作挑选rowTemp数组中随机数的下标
        var randomIndex = parseInt(Math.random() * rowTemp.length);
        roll1Line.push(rowTemp[randomIndex]);
        rowTemp.splice(randomIndex, 1);
    }
//    console.log("r1l:");
//    console.log(roll1Line);
//        console.log(roll1LineData);


    roll2Line = rowTemp; //只有两个元素
    roll1Line = roll1Line.concat(roll2Line);
//        for (var s = 0; s < roll2Line.length; s++) {
//            var ijkIndexArr = roll2Line[s].split("");
//            var i = ijkIndexArr[0];
//            var j = ijkIndexArr[1];
//            var k = ijkIndexArr[2];
//            roll2LineData.push(studInfoArr[i][j][k]);
//        }
//    console.log("r1l after add:");
//    console.log(roll1Line);
//    console.log("r2l:");
//    console.log(roll2Line);
//        console.log(roll2LineData);
//    console.log("+++++++++++++++");

//    console.log(((num-1)/2/2)%2 === 0);

    return [roll1Line, roll2Line]; //r1包含乱序的整行数据下标，r2只包含两个随机下标
}

function showInfoTable(headCount, bigColCount, deskmateCount, studInfoArr) {
    var colsCount = parseInt(bigColCount * (deskmateCount + 1)); //总列数
    if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
    }
    console.log("In showInfoTable       studInfoArr:");
//    console.log(rowsCount);
    console.log(studInfoArr);
//    console.log(studInfoArr[0][0][0]);
    var tHeader = "<table id = 'infoTable' class = 'table table-borderd table-striped table-hover'>";
    var tBody = "<tr id=''><th colspan = " + colsCount + " class='text-center'>讲台</th></tr>";
    for (var l = 0; l < rowsCount; l++) {//每一行
        tBody += "<tr id='row" + l + "'>"; //标记每一行 row1  row2 ...
        for (var m = 0; m < bigColCount; m++) {//一大排
            if (m === bigColCount - 1) {//最后一排
                for (var n = 0; n < deskmateCount; n++) {
                    var studInfo = studInfoArr[l][m][n];
                    tBody += "<td id='td" + l.toString() + m.toString() + n.toString() + "'><input id='row" + l + "dp" + m + "de" + n + "' type='text' value='" + studInfo + "' readonly='readonly' class='form-control text-center'></td>";
                }
            } else {//前几排
                for (var n = 0; n < deskmateCount; n++) {
                    var studInfo = studInfoArr[l][m][n];
                    tBody += "<td id='td" + l.toString() + m.toString() + n.toString() + "'><input id='row" + l + "dp" + m + "de" + n + "' type='text' value='" + studInfo + "' readonly='readonly' class='form-control text-center'></td>";
                }
                tBody += "<td style='background: gray;'></td>";
            }

        }
    }
    tBody += "</tr>";
    var tFooter = "</table>";
    var table = "" + tHeader + tBody + tFooter;
    document.getElementById("tableArea").innerHTML = "";
    document.getElementById("tableArea").innerHTML = table;
}

function chkDeskmate(headCount, bigColCount, deskmateCount, studInfoArr) {
    //对studInfoArr操作, 对重排后的表格进行检查，若存在blackList中两个人是同位的情况则进行调动
    stor = window.localStorage;
    //以下17行为检测localstorage中有没有blackList
    var storKeysArr = [];
    for (var s = 0; s < stor.length; s++) {
        storKeysArr.push(stor.key(s));
    }
    console.log("In updateBlackList        storKeysArr:");
    console.log(storKeysArr);
    var flag = 0;
    for (var b = 0; b < storKeysArr.length; b++) {//原先localstorage中有blackList一项
//        console.log("storage中有blackList");
        if (storKeysArr[b] === "blackList") {
            flag = 1;
        }
    }
    if (flag) {//localStorage中有blackList
        blInStor = stor.getItem("blackList");
        blInStorArr = blInStor.split(",");
        var bl1 = [];
        var bl2 = [];
        for (var blIndex = 0; blIndex < blInStorArr.length; blIndex++) {//将黑名单中的同位分置两个数组中
            if (blIndex % 2 === 0) {
                bl1.push(blInStorArr[blIndex]);
            } else {
                bl2.push(blInStorArr[blIndex]);
            }
        }
        if (parseInt(headCount) % parseInt(bigColCount * deskmateCount)) {
            var rowsCount = parseInt(headCount / (bigColCount * deskmateCount) + 1); //行数
        } else {
            var rowsCount = parseInt(headCount / (bigColCount * deskmateCount)); //行数
        }
        var colsCount = parseInt(bigColCount * deskmateCount);

        for (var i = 0; i < rowsCount; i++) {
            for (var j = 0; j < bigColCount; j++) {
                for (var k = 0; k < deskmateCount - 1; k++) {
                    for (var blIdx = 0; blIdx < bl1.length; blIdx++) {
                        if ((studInfoArr[i][j][k] === bl1[blIdx] && studInfoArr[i][j][k + 1] === bl2[blIdx]) || (studInfoArr[i][j][k] === bl2[blIdx] && studInfoArr[i][j][k + 1] === bl1[blIdx])) {
                            var centerCol = colsCount / 2;
                            if (j <= centerCol) {//黑名单发生在奇数列的中间列
                                var tempData = studInfoArr[i][j][k + 1];
                                studInfoArr[i][j][k + 1] = studInfoArr[i][colsCount - 1][k + 1];//与本行最后一排的最后一个交换，即挪到最边上
                                studInfoArr[i][colsCount - 1][k + 1] = tempData;
                            } else {//黑名单发生在奇数列的中间列之后
                                var tempData = studInfoArr[i][j][k + 1];
                                studInfoArr[i][j][k + 1] = studInfoArr[i][0][k];//挪到最左边
                                studInfoArr[i][0][k] = tempData;
                            }
                        } else {
                            console.log("In chkDeskmate         11 in chkDeskmate:");
                            console.log(studInfoArr);
                            return studInfoArr;
                        }
                    }
                }
            }
        }
    }
    console.log("In chkDeskmate         studInfoArr:");
    console.log(studInfoArr);
    return studInfoArr;
}

function autoReset() {//自动重排，更新local Storage中的内容、
    var storage = window.localStorage;
    storage.clear();
    var weekOfYear = getDateTimeWeek()[2];
//    document.getElementById("autoResetBtn").setAttribute("disabled", "disabled");
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
    if (parseInt(fbHeadCount) % parseInt(fbBigColCount * fbDeskmateCount)) {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount)); //行数
    }
    storage.setItem("week", weekOfYear);
    storage.setItem("is_autoReset", 1);
    document.getElementById("autoResetBtn").innerHTML = "已开启";
    document.getElementById("autoResetBtn").setAttribute("style", "color: green");
    document.getElementById("autoResetBtn").setAttribute("title", "点击关闭自动更新");
    storage.setItem("headCount", fbHeadCount);
    storage.setItem("bigColCount", fbBigColCount);
    storage.setItem("deskmateCount", fbDeskmateCount);
    var table = document.getElementById("infoTable");
    if (table !== null) {
        for (var l = 0; l < rowsCount; l++) {//每一行
            for (var m = 0; m < fbBigColCount; m++) {//一大排
                for (var n = 0; n < fbDeskmateCount; n++) {//同位
                    var tdId = "row" + l + "dp" + m + "de" + n;
                    var tdVal = document.getElementById(tdId).value;
                    storage.setItem(tdId, tdVal);
                }
            }
        }
        alert("后台数据更新成功！\n已为你打开自动更新，下周你将会看到新的座次！");
    } else {
        alert("你还没有生成表格");
    }
}

function autoUpdateStor(headCount, bigColCount, deskmateCount, studInfoArr, rowsCount) {
    console.log("In autoUpdateStor                 studInfoArr:");
    console.log(studInfoArr);
    var storage = window.localStorage;
    storage.clear();
    var weekOfYear = getDateTimeWeek()[2];
    storage.setItem("week", weekOfYear);
    storage.setItem("is_autoReset", 1);
    document.getElementById("autoResetBtn").innerHTML = "已开启";
    document.getElementById("autoResetBtn").setAttribute("style", "color: green");
    document.getElementById("autoResetBtn").setAttribute("title", "点击关闭自动更新");
    storage.setItem("headCount", headCount);
    storage.setItem("bigColCount", bigColCount);
    storage.setItem("deskmateCount", deskmateCount);
    for (var l = 0; l < rowsCount; l++) {//每一行
        for (var m = 0; m < bigColCount; m++) {//一大排
            for (var n = 0; n < deskmateCount; n++) {//同位
                var tdInputId = "row" + l + "dp" + m + "de" + n;
                var lmnIndex = l.toString() + m.toString() + n.toString();
                storage.setItem(tdInputId, studInfoArr[l][m][n]);
            }
        }
    }
}

function editTable() {//移除readonly = 'readonly'属性     为每一个单元格添加checkbox
    var stor = window.localStorage;
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
    if (parseInt(fbHeadCount) % parseInt(fbBigColCount * fbDeskmateCount)) {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount)); //行数
    }
    var firstTdId = "row0dp0de0";
    var is_readonly = document.getElementById(firstTdId).getAttribute("readonly");

    //检测LS中有没有BL
    var storKeysArr = [];
    for (var s = 0; s < stor.length; s++) {
        storKeysArr.push(stor.key(s));//将所有stor中的key推进数组storKeysArr
    }
    console.log("In updateBlackList        storKeysArr:");
    console.log(storKeysArr);
    var flag = 0;
    for (var b = 0; b < storKeysArr.length; b++) {//原先localstorage中有blackList一项
//        console.log("storage中有blackList");
        if (storKeysArr[b] === "blackList") {
            flag = 1;
        }
    }
//    if (flag) {
//        var blackList = stor.getItem("blackList").split(",");
//    }
    for (var l = 0; l < rowsCount; l++) {//每一行
        for (var m = 0; m < fbBigColCount; m++) {//一大排
            for (var n = 0; n < fbDeskmateCount; n++) {//同位
                var tdInputId = "row" + l + "dp" + m + "de" + n;
                var lmnIndex = l.toString() + m.toString() + n.toString();
                var tdId = "td" + lmnIndex;
                var tdVal = document.getElementById(tdInputId).value;
                if (is_readonly) {//不可编辑状态
                    document.getElementById(tdInputId).removeAttribute("readonly");
                    //添加checkbox
//                    if (flag) {
//                        var chkbox = document.createElement("input");
//                        chkbox.type = "checkbox";
//                        chkbox.name = "chk";
//                        chkbox.id = "chk" + lmnIndex;
//                        for (var b = 0; b < blackList.length; b++) {
//                            if (blackList[b] === tdVal) {
//                                console.log("相等了！！！！！！！");
//                                chkbox.checked = true;
//                            }
//                        }
//                        document.getElementById(tdId).appendChild(chkbox);
//                        //显示更新blackList按钮
//                        document.getElementById("afterTable5").style.display = "block";
//                    }
                } else {//可编辑状态
                    document.getElementById(tdInputId).setAttribute("readonly", "readonly");
//                    if (flag) {
//                        //移除checkbox
//                        var chkbox = document.getElementById("chk" + lmnIndex);
//                        document.getElementById(tdId).removeChild(chkbox);
//                        //隐藏更新blackList按钮
//                        document.getElementById("afterTable5").style.display = "none";
//                    }
                }
            }
        }
    }
    var is_readonly2 = document.getElementById(firstTdId).getAttribute("readonly");
    if (!is_readonly2) {
        document.getElementById("afterTable2").style.display = "none";
        document.getElementById("afterTable3").style.display = "none";
        document.getElementById("afterTable4").style.display = "none";
        if (flag) {
            document.getElementById("afterTable5").style.display = "block";
        }
        document.getElementById("afterTable6").style.display = "block";
    } else {
        document.getElementById("afterTable2").style.display = "block";
        document.getElementById("afterTable3").style.display = "block";
        document.getElementById("afterTable4").style.display = "block";
        document.getElementById("afterTable5").style.display = "none";
        document.getElementById("afterTable6").style.display = "none";
    }
}

function addBlChkbox() {
    var infoTable = document.getElementById("infoTable");
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
    if (parseInt(fbHeadCount) % parseInt(fbBigColCount * fbDeskmateCount)) {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount)); //行数
    }
    for (var l = 0; l < rowsCount; l++) {//每一行
        for (var m = 0; m < fbBigColCount; m++) {//一大排
            for (var n = 0; n < fbDeskmateCount; n++) {//同位
                var lmnIndex = l.toString() + m.toString() + n.toString();
                var tdId = "td" + lmnIndex;
                //添加checkbox
                var chkbox = document.createElement("input");
                
                
                
                
//  8-12
//  blacklist问题  分成两部分，一部分添加chkbox并在添加时检测是否是LS中的值（一下注释就是在进行这种尝试），另一部分是在添加完成之后检测chkbox有无被选中，以及被选中的chkbox与LS中的值的差别问题，最后生成新的LS值并存入LS
//  updateBlackList负责第二部分，addBlChkbox负责第一部分，getBlackList只负责录入数据时的存入LS工作
                
                
                
//                tdInputId = "row" + i.toString() + "dp" + j.toString() + "de" + k.toString();
//                chkboxId = "chk" + i.toString() + j.toString() + k.toString();
//                var chkbox = document.getElementById(chkboxId);
//                if (chkbox.checked) {//checkbox被选中
//                    //判断此单元格的值是否是localstorage中的值
//                    flag2 = 1;
//                    var tdinputVal = document.getElementById(tdInputId).value;
//                    for (var c = 0; c < blInStorArr.length; c++) {
//                        if (blInStorArr[c] === tdinputVal) {
//                            flag2 = 0;
//                            break;
//                        }
//                    }
//                    if (flag2) {
//                        newBlArr.push(tdinputVal);//发现在LS的BL中没有的值，添加到newBlArr
//                    }
//                }





                
                
                chkbox.type = "checkbox";
                chkbox.name = "chk";
                chkbox.id = "chk" + lmnIndex;
                document.getElementById(tdId).appendChild(chkbox);
            }
        }
    }
    document.getElementById("afterTable6").style.display = "none";
//    document.getElementById("afterTable7").style.display = "block";
}

function exportToCsv() {
    var dateTimeWeek = getDateTimeWeek();
    var date = dateTimeWeek[1];
    var WeekOfYear = dateTimeWeek[2];
    var fbHeadCount = parseInt(document.getElementById("fbHeadCount").innerHTML);
    var fbBigColCount = parseInt(document.getElementById("fbBigColCount").innerHTML);
    var fbDeskmateCount = parseInt(document.getElementById("fbDeskmateCount").innerHTML);
    if (parseInt(fbHeadCount) % parseInt(fbBigColCount * fbDeskmateCount)) {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount) + 1); //行数
    } else {
        var rowsCount = parseInt(fbHeadCount / (fbBigColCount * fbDeskmateCount)); //行数
    }
    var csvRows = [];
    var table = document.getElementById("infoTable");
    if (table !== null) {
        for (var l = 0; l < rowsCount; l++) {//每一行
            for (var m = 0; m < fbBigColCount; m++) {//一大排
                for (var n = 0; n < fbDeskmateCount; n++) {//同位
                    var tdId = "row" + l + "dp" + m + "de" + n;
                    var tdVal = document.getElementById(tdId).value;
                    csvRows.push(tdId + "," + tdVal);
                }
            }
        }
        var fileName = date + "-第" + WeekOfYear + "周";
        var csvString = csvRows.join(";"); //一个算式作为一行
        var a = document.createElement('a');
        a.href = 'data:attachment/csv,' + encodeURI(csvString);
        a.target = "_blank";
        a.download = fileName + '.csv';
        document.body.appendChild(a); //创建a标签
        a.click();
        document.body.removeChild(a); //获取下载链接之后删除a标签
    } else {
        alert("你还没有生成表格");
    }
}

function getDateTimeWeek() {//获取日期时间，用作csv文件名，基本同saveToCsv()
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = parseInt(myDate.getMonth() + 1);
    if (month < 10) {
        month = "0" + month;
    }
    var day = myDate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hour = myDate.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minute = myDate.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    var datetime = "Exercise - " + year + month + day + hour + minute;
    var date = "" + year + month + day;
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    var rq = d1 - d2;
    var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
    var week = Math.ceil(s1 / 7);
//    alert("今天是本年第" + s1 + "天，第" + s2 + "周");
    return [datetime, date, week, year, month, day];
}
