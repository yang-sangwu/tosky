var toregister = document.getElementById("to_register");
var landmain = document.getElementById("land_main");
var main = document.getElementsByClassName("main")[0];
var toland = document.getElementsByClassName("to_land");
var passwordinput = document.getElementById("land_password");
let land = document.getElementById("land");
let eye = document.getElementById("eye");
var fa = document.getElementsByClassName("fa")[0];
var land_password = document.getElementById("land_password");
function landf() {
    let id = document.getElementById("land_id").value;
    let ps = document.getElementById("land_password").value;
    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/sign', { "managerName": id, "password": ps },
        function (date) {
            if (date.data == "success") {
                alert("登录成功");
                window.location.assign("../templates/users-main.html");
                sessionStorage.setItem("tousers", '1');
            }
            else if (id == '' || ps == '') {
                alert("请输入完整信息！");

            }
            else {
                alert("您输入的账号或密码错误！");
            }
        })
}
//登录栏目
land.onclick = landf;
passwordinput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        landf();
    }
});
var open = true;
fa.onclick = function () {
    if (open) {
        fa.classList.remove("fa-eye");
        fa.classList.add("fa-eye-slash");
        fa.classList.add("fa-eye");
        fa.classList.remove("fa-eye-slash");
        land_password.type = "text";
        open = false;
    }
    else {
        fa.classList.remove("fa-eye");
        fa.classList.add("fa-eye-slash");
        land_password.type = "password";
        open = true;
    }
}