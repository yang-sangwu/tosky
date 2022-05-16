var team = document.getElementsByClassName("team_main")[0];
var pagenumber = document.getElementById("page_number");
var teamb = document.getElementsByClassName("team_b")[0];
var teamf = document.getElementsByClassName("team_fade");
var fade = document.getElementsByClassName("fade");
var teamadd = document.getElementById("team_add");
var registermain = document.getElementById("register_main");
var teamdelete = document.getElementById("team_delete");
var teamall = document.getElementsByName("team_all")[0];
var teama = document.getElementsByName("team_a");
var teamrevise = document.getElementById("team_revise_b");
var backfade = document.getElementById("backfade");
var team_back_max=document.getElementsByClassName('team_back_max')[0];
let team_b=document.getElementsByClassName('team_b')[0];
//重新newalert（）方法
var alertbox = document.getElementById("alert");
var alertfade = document.getElementById("alertfade");
var feedbackfade = document.getElementById("feedbackfade");
var alerttext = document.getElementById("alerttext");
alertfade.onclick = function () {
    feedbackfade.style.display = 'none';
    feedbackfade.style.opacity = '0';
    feedbackfade.classList.remove("fade");
    alertbox.style.top = '-250px';
}
function newalert(text) {
    feedbackfade.style.display = 'block';
    feedbackfade.style.opacity = '1';
    feedbackfade.classList.add("fade");
    alerttext.innerHTML = text;
    alertbox.style.top = '50px';
}
//重新newalert（）方法
for (let i = 0; i < teamf.length; i++) {
    fade[i].onclick = () => {
        teamf[i].style.display = "none";
        backfade.classList.remove('fade');
        backfade.style.display='none';
    }
}
teamadd.onclick = () => {
    teamf[0].style.display= "block";
    backfade.classList.add('fade');
    backfade.style.display='block';

}
function teamdeletef() {
    let choose = confirm("你确定删除选中人的信息?");
    let teamd = document.getElementsByClassName("team_delete");
    if (choose) {
        for (let i in teama) {
            if (teama[i].checked) {
                var id = teamd[i].parentNode.parentNode.children[6].innerHTML;
                $.post(`http://localhost:8080/ToSkyNews_war_exploded/users/del/${id}`,
                    { "userID": id },
                    function (date) {
                        changepage();
                    })
            }
        }
        alert("删除成功");
    }
}
//批量删除
teamdelete.onmousemove = function () {
    let c = false;
    for (let i of teama) {
        if (i.checked) {
            c = true;
        }
    }
    if (!c) {
        teamdelete.style.cursor = "not-allowed";
        teamdelete.onclick = () => {
            newalert("请勾选你要删除的对象！");
        };
    } else {
        teamdelete.style.cursor = "pointer";
        teamdelete.onclick = teamdeletef;
    }
}
//空选删除处理
function r() {
    let teamr = document.getElementsByClassName("team_revise");
    let teamd = document.getElementsByClassName("team_delete");
    let tri = document.getElementsByClassName("team_reivse_input");
    let ts = document.getElementsByName("team_sex");
    for (let n of teamd) {
        n.onclick = function () {
            let us = n.parentNode.parentNode.children[1].innerHTML;
            let id = n.parentNode.parentNode.children[6].innerHTML;
            let choose = confirm("你是否确定删除" + us + "的信息?");
            if (choose == true) {
                $.post(`http://localhost:8080/ToSkyNews_war_exploded/users/del/${id}`,
                    { "userID": id },
                    function (date) {
                        newalert(date.data);
                        changepage();
                    })
            }
        }
    }
    for (let n in teamr) {
        teamr[n].onclick = function () {
            teamf[0].style.display= "none";
            teamf[1].style.display= "block";
            backfade.classList.add('fade');
            backfade.style.display='block';
            let us = teamd[n].parentNode.parentNode.children[1].innerHTML;
            let sexn = teamd[n].parentNode.parentNode.children[3].innerHTML;
            let sex = sexn == "男" ? 0 : 1;
            let ps = teamd[n].parentNode.parentNode.children[2].innerHTML;
            let pl = teamd[n].parentNode.parentNode.children[5].innerHTML;
            let age = teamd[n].parentNode.parentNode.children[4].innerHTML;
            let id = teamd[n].parentNode.parentNode.children[6].innerHTML;
            let telephone= teamd[n].parentNode.parentNode.children[7].innerHTML;
            let signature = teamd[n].parentNode.parentNode.children[8].innerHTML;
            let picture = teamd[n].parentNode.parentNode.children[9].innerHTML;
            tri[0].value = us;
            tri[2].value = age;
            tri[1].value = ps;
            if (sex == 0) {
                ts[0].checked = true;
            } else {
                ts[1].checked = true;
            }
            teamrevise.onclick = function () {
                let tri = document.getElementsByClassName("team_reivse_input");
                let ts = document.getElementsByName("team_sex");
                let sex = ts[0].checked == true ? "男" : "女";
                var choose = confirm("你是否确定修改该成员的信息?");
                if (choose == true) {
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/updateUser',
                        {"userID": id, "username": tri[0].value, 'signature':signature,'picture':picture,
                        "telephone": telephone, "password": tri[1].value,"age": tri[2].value, "sex": sex },
                        function (date) {
                            newalert(date.data);
                            if(date.data=='修改成功！'){
                                teamf[1].style.display = "none";
                                backfade.classList.remove('fade');
                                backfade.style.display='none';
                            }
                            changepage();
                        })
                }
            }
        }
    }
}
$.get('http://localhost:8080/ToSkyNews_war_exploded/users/allUser',
    function (date) {
        let pages = date.length;
        let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
        sessionStorage.setItem('tpagen', pagen);
    })
//遍历每个用户的单个删除与信息修改
var a = teamb.getElementsByTagName("a");
var page = teamb.getElementsByTagName("input")[0];
var fpage_number = teamb.getElementsByTagName("span")[1];
function changepage() {
    let p = page.value;
    let pager = (p - 1) * 10;
    if (0 < p && p <= parseInt(sessionStorage.getItem('tpagen'))) {
        a[1].innerText = p;
        $.get('http://localhost:8080/ToSkyNews_war_exploded/users/allUser',
            function (date) {
                let pages = date.length;
                let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
                fpage_number.innerHTML = "总共有" + pages + "个用户,总共" + pagen + "页";
                sessionStorage.setItem('tpagen', pagen);
            })
        //获取用户数与总页数；
        $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryPagingUser',
            { 'column': pager, 'total': "10" },
            function (date) {
                team.innerHTML = "<tr class='tmt'><th class='ms'><input type='checkbox' onchange='s()' name='team_all' value='all'></th>" +
                    "<th class='ms'>用户名</th>" +
                    " <th class='ml' style='display: none;'>密码</th>" +
                    "<th class='ms'>性别</th>" +
                    "<th class='ms'>年龄</th>" +
                    "<th class='ml'>账号</th>" +
                    "<th class='ml'  style='display: none;'>操作码</th>" +
                    "<th class='ml'>邮箱</th>" +
                    "<th class='ml'>操作</td></tr>";
                for (let n = 0; n < date.length; n++) {
                    team.innerHTML += "<tr><td class='ms'><input type='checkbox' name='team_a' value='all'></td>" +
                        "<td class='ms'>" + date[n].username + "</td>" +
                        "<td class='ml' style='display: none;'>" + date[n].password + "</td>" +
                        "<td class='ms'>" + date[n].sex + "</td>" +
                        "<td class='ms'>" + date[n].age + "</td>" +
                        "<td class='ml'>" + date[n].account + "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].userID + "</td>" +
                        "<td class='ml'>" + date[n].telephone + "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].signature+ "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].picture + "</td>" +
                        "<td class='ml'><a class='mr team_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>" +
                        "<a class='md team_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
                    let ms = document.getElementsByClassName("ms");
                    let ml = document.getElementsByClassName("ml");
                    for (let i of ms) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                    for (let i of ml) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                }
                //获取一页的用户信息
                r();
            })
    } else if (page.value == ""||sessionStorage.getItem('tpagen')==null) { } 
    else {
        newalert("请输入合理的页数！");
    }
}
a[2].onclick = () => {
    let n = parseInt(a[1].innerHTML);
    if (n > 1 && n < 11) {
        a[1].innerHTML -= 1;
        page.value = a[1].innerHTML;
        changepage();
    }
}
a[0].onclick = () => {
    let n = parseInt(a[1].innerHTML);
    if (n > 0 && n < sessionStorage.getItem('tpagen')) {
        a[1].innerHTML = n + 1;
        page.value = a[1].innerHTML;
        changepage();
    }
}
$("#add_number").click(function () {
    let input = document.getElementsByClassName("registerinput");
    let have=0;
    for(let n of input){
        if(n.value==''){
            newalert("请输入完整内容！");
            have=1;
            break;
        };
    }
    if(have==0){
        var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var mailJudge=mailLimit.test(input[2].value);
        if(mailJudge==true){
            $.post('http://localhost:8080/ToSkyNews_war_exploded/users/addUser',
            {
                "username": input[0].value, "age": '8', "password": input[1].value,
                "picture": 'https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg',
                "sex": '男', "signature": '无', "telephone": input[2].value
            },
            function (date) {
                if (date.message == "success") {
                    newalert("添加成功!");
                    for (let n of input) {
                        n.value = "";
                        backfade.classList.remove('fade');
                        backfade.style.display='none';
                    }
    
                    changepage();
                } else {
                    newalert(date.message);
                }
            })
        }else{
            newalert('您的邮箱格式输入错误!');
        }
    }
});
//添加新用户
//获取验证码
function s() {
    const teamall = document.getElementsByName("team_all")[0];
    if (teamall.checked) {
        for (let n of teama) {
            n.checked = true;
        }
    }
    else if (teamall.checked == false) {
        for (let n of teama) {
            n.checked = false;
        }
    }
}
//实现全选功能
function teamfind() {
    let name = document.getElementsByClassName("team_find_input")[0].value;
    if (name == '') {
        newalert("请输入搜索内容!");
    } else {
        $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryVagueUser', { 'thing': name },
            function (date) {
                team.innerHTML = "<tr class='tmt'><th class='ms'><input type='checkbox' onchange='s()' name='team_all' value='all'></th>" +
                    "<th class='ms'>用户名</th>" +
                    " <th class='ml' style='display: none;'>密码</th>" +
                    "<th class='ms'>性别</th>" +
                    "<th class='ms'>年龄</th>" +
                    "<th class='ml'>电话</th>" +
                    "<th class='ml'  style='display: none;'>操作码</th>" +
                    "<th class='ml'>邮箱</th>" +
                    "<th class='ml'>操作</td></tr>";
                for (let n = 0; n < date.length; n++) {
                    team.innerHTML += "<tr><td class='ms'><input type='checkbox' name='team_a' value='all'></td>" +
                        "<td class='ms'>" + date[n].username + "</td>" +
                        "<td class='ml' style='display: none;'>" + date[n].password + "</td>" +
                        "<td class='ms'>" + date[n].sex + "</td>" +
                        "<td class='ms'>" + date[n].age + "</td>" +
                        "<td class='ml'>" + date[n].account + "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].userID + "</td>" +
                        "<td class='ml'>" + date[n].telephone + "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].signature+ "</td>" +
                        "<td class='ml'  style='display: none;'>" + date[n].picture + "</td>" +
                        "<td class='ml'><a class='mr team_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>" +
                        "<a class='md team_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
                    let ms = document.getElementsByClassName("ms");
                    let ml = document.getElementsByClassName("ml");
                    for (let i of ms) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                    for (let i of ml) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                }
                //获取一页的用户信息
                r();
            })
        team_b.style.display='none';
        team_back_max.style.display='block';
    }
}
//查找页面栏目
function backpagen1(){
    changepage();
    team_b.style.display=' flex';
    team_back_max.style.display='none';
}
changepage();

