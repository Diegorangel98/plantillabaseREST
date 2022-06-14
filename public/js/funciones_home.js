$(document).ready(inicializarEventos);

function inicializarEventos()
{
    inicio();
}
let btn_login;
let formLogin;
let correo;
let password;

function login()
{
    if(!correo.val() || !password.val())
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese todos los datos',
            timer: 1000,
            timerProgressBar: true
        });
    }

    $.ajax({
        url: "http://localhost:8080/api/auth/login",
        type: "POST",
        data: {
            correo: correo.val(),
            password: password.val()
        },
        success: function (data) {
            console.log(data);
        }
    });
}


function inicio() {
    console.log("inicio");
    btn_login = $("#btn_login");
    formLogin = $("#formLogin");
    correo = $("#correo");
    password = $("#password");


    btn_login.click(login);
}