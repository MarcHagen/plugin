// 自动填充账号
$("#name").val("admin");
// 自动填充密码
$("#psd").val("admin");

// 每台PDU参数：IP地址，旧MAC地址，新MAC地址
// 1.获取IP地址
// 2.根据IP地址确认旧MAC地址是否正确
// 3.根据IP地址更换新MAC地址
let ip_list = [
  "192.168.22.126",
  "192.168.22.78",
  "192.168.22.142",
  "192.168.22.130",
  "192.168.22.80",
  "192.168.22.139",
  "192.168.22.77",
  "192.168.22.129",
  "192.168.22.132",
  "192.168.22.79",
];

let old_mac_list = [
  "2C:26:5F:33:D1:2E",
  "2C:26:5F:33:D1:32",
  "2C:26:5F:33:D1:37",
  "2C:26:5F:33:D1:38",
  "2C:26:5F:33:D1:3A",
  "2C:26:5F:33:D1:3B",
  "2C:26:5F:33:D1:40",
  "2C:26:5F:33:D1:43",
  "2C:26:5F:33:D1:45",
  "2C:26:5F:33:D1:48",
];

let new_mac_list = [
  "2C:26:5F:37:99:25",
  "2C:26:5F:37:99:26",
  "2C:26:5F:37:99:27",
  "2C:26:5F:37:99:28",
  "2C:26:5F:37:99:29",
  "2C:26:5F:37:99:2A",
  "2C:26:5F:37:99:2B",
  "2C:26:5F:37:99:2C",
  "2C:26:5F:37:99:2D",
  "2C:26:5F:37:99:2E",
];

// 全局索引，当前访问IP在IP地址列表中的索引
let index;
let old_address;
let macAddr;

// 如果为校正页面，则执行该项
if (location.pathname == "/correct.html") {
  // 获取主机名
  let hostname = location.hostname;
  // 获取MAC地址元素
  macAddr = $("#mac1");
  // 获取当前IP在IP地址列表中的索引
  index = ip_list.indexOf(hostname);
  // 获取当前IP对应的旧MAC地址
  old_address = old_mac_list[index];

  // // 创建按钮 点击后重置为旧的MAC地址
  // let oldBtn = document.createElement("button");
  // // 设置ID
  // oldBtn.id = "oldBtn";
  // // 按钮文本值
  // oldBtn.innerHTML = "Old";
  // // 事件监听 将该输入框的设为旧MAC地址
  // oldBtn.addEventListener("click", function () {
  //   macAddr.val(old_mac_list[index]);
  // });
  // // 将元素添加到页面DOM中
  // macAddr.parent().append(oldBtn);

  // 创建<a>元素
  let elMenubar1 = document.createElement("button");
  // <a>链接文字
  elMenubar1.innerHTML = "检查";
  elMenubar1.style = "margin-left: 20px";
  // 添加事件监听 检查当前IP对应的MAC地址是否正确
  elMenubar1.addEventListener("click", function () {
    let elMessage = document.createElement("div");
    if (old_address == macAddr.val()) {
      // 如果正确 输出成功信息
      elMessage.innerHTML = "IP Addrees was matched with MAC address!";
      elMessage.style = `background: rgb(240, 249, 235);color: rgb(103, 194, 58);padding: 20px 10px;`;
    } else {
      // 否则输出错误消息
      elMessage.innerHTML = "IP Addrees was not matched with MAC address!";
      elMessage.style = `background: rgb(254, 240, 240);color: rgb(245, 108, 108);padding: 20px 10px;`;
    }
    $("body").prepend(elMessage);
  });
  // // <a>链接样式
  // elMenubar1.style =
  //   "position: fixed; top:20px; right:160px; text-decoration: none; color:#09f";
  // 将元素添加到页面DOM中
  macAddr.parent().append(elMenubar1);

  // 创建按钮 点击后重置为新的MAC地址
  let newBtn = document.createElement("button");
  // 设置ID
  newBtn.id = "newBtn";
  newBtn.style = "margin-left: 20px";
  // 按钮文本值
  newBtn.innerHTML = "更新";
  // 事件监听 将该输入框的值设为新MAC地址
  newBtn.addEventListener("click", function () {
    macAddr.val(new_mac_list[index]);
  });
  // 将元素添加到页面DOM中
  macAddr.parent().append(newBtn);
}

// 创建<a>元素
let elMenubar = document.createElement("a");
// 指向/correct.html页面
elMenubar.href = "/system.html";
// <a>链接文字
elMenubar.innerHTML = "重启";
// <a>链接样式
elMenubar.style = "margin-left: 20px";
// 将元素添加到页面DOM中
$("#Button3").parent().append(elMenubar);

// 创建超链接列表 列出当前机房的IP链接
let listNode = document.createElement("ol");
// 设置ID
listNode.id = "iplist";
// 遍历当前机房IP列表，生成超接连列表
ip_list.forEach((item, index) => {
  let itemNode = document.createElement("li");
  let linkNode = document.createElement("a");
  linkNode.href = `http://${item}`;
  linkNode.target = "_blank";
  linkNode.text = `${item}`;
  itemNode.appendChild(linkNode);
  listNode.appendChild(itemNode);
});
// <ol>元素样式
listNode.style =
  "position: fixed; top:40px; right:50px; text-decoration: none; color:#09f; height: 600px; overflow: scroll";
// 将元素插入到页面DOM中
$("body").prepend(listNode);

if (location.pathname == "/home.html") {
  location.href = "/correct.html";
}
