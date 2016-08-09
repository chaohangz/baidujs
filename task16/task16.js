/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById("city");
var air = document.getElementById("air");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("city").value.replace(/(^\s*) || (\s*$)/g, "");
    var city_re1 = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
    var city_re2 = /^[a-zA-Z]+$/;
    if (!city_re1.test(city) && !city_re2.test(city)) {
        alert("城市名必须是中文或英文");
        return false;
    }
    var air = document.getElementById("air").value.replace(/(^\s*) || (\s*$)/g, "");
    var air_re = /^[0-9]+$/;
    if (!air_re.test(air)) {
        alert("空气质量指数必须是整数");
        return false;
    }
    aqiData[city] = air;
    //alert("数据已添加");
}
/**
 * 渲染aqi-table表格
 */
/**
我写的，下面那个是别人写的。
function renderAqiList() {
    city = city.value;
    if (city && aqiData[city]){
        var table = document.getElementById("aqi-table");
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var city_text = document.createTextNode(city);
        var td2 = document.createElement("td");
        var air = document.createTextNode(aqiData[city]);
        var btn = document.createElement("button");
        var del = document.createTextNode("删除");
        btn.className = "del-btn";
        table.appendChild(tr);
        tr.appendChild(td1);
        td1.appendChild(city_text);
        tr.appendChild(td2);
        td2.appendChild(air);
        tr.appendChild(btn);
        btn.appendChild(del);

        //为动态创建的class绑定click事件
        var delbtn = document.getElementsByClassName("del-btn");
        for (i = 0; i < delbtn.length; i++) {
            delbtn[i].addEventListener('click', delBtnHandle);
        }
    }
}
**/
function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    //这一句是重点，用来判断是删除还是添加，如果city为true则添加，city为false则删除
    //innerHTML 会覆盖掉之前的html，所以不用担心每添加一个city都会全部循环一次导致重复
    //我之前所用的createElement则会导致重复
    document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
/**
function delBtnHandle() {
    // do sth.
    //alert("是否删除当前数据");
    this.parentNode.parentNode.removeChild(this.parentNode);
    var city = this.parentNode.firstChild.firstChild.nodeValue;
    delete aqiData[city];

    //renderAqiList();
}
*/
function delBtnHandle(city) {
    delete aqiData[city];
    renderAqiList();
}


function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    var addbtn = document.getElementById("add-btn");
    if (addbtn) {
        addbtn.addEventListener('click', addBtnHandle);
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    //以下为网友的方法，我的方法把del按钮绑定放在renderAqiList函数下
    //这句有点难度，不是很理解
    //target返回触发事件的节点。call设置函数的参数。dataset.city获取city值。如果该节点是button，则绑定delBtnHandle函数并附参数
    document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null,event.target.dataset.city);
    })
}

init();