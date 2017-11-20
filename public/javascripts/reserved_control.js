/* 27/10/2017 */

function testConsoleLog() {
    console.log('Meghivva a klien js függvény!');
}

//form elküldése javascript-ből: a document.getElementById -t kell alkalmazni
//https://www.formget.com/javascript-submit-form/
function loginValidate(formElement) {        
    var form = document.getElementById("login-form");
    if (form !== null) {
        var loginemail = form[0].value;
        var loginpassword = form[1].value;
        if (loginemail === "" || loginpassword === "") {
            document.getElementById("login-error-msg").innerHTML = "A felhasználó név, vagy jelszó hiányzik!";
        } else {
            form.action = window.location.href + 'login';
            form.submit();
        }
    }
    return false;
}

//https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
function useradminFormValidate(formElement) {

    var pathname = window.location.pathname;
    var url = window.location.href;    
    var form = $(formElement);
    if (form !== undefined) {
                                
    }
    //form.action = window.location.href + '/saveUserForm';
    //form.submit();

    return false;
}

//ajax example
//https://stackoverflow.com/questions/43523576/update-part-of-html-page-using-node-js-and-ejs
//ajax példa
//https://stackoverflow.com/questions/41665948/passing-variable-from-jquery-ajax-to-nodejs
function ajaxUpdateTest(element) {
    var tsId = "Ez a kliens oldalról jön!";
    $.ajax({
        url: 'useradmin/ajaxUpdateTest',
        type: 'post',
        data: {
            str: tsId
        },        
        success: function (data) {
            $('#holder').html(data.testText);
        }
    });

    //lehet így is, működik
    //$.ajax({
    //    url: "useradmin/ajaxUpdate",
    //    type: "POST",
    //    data: {
    //        str: tsId
    //    }
    //})
    //.done(function (data) {
    //    console.log("Sample of data:", data);
    //    $('#holder').html(data.testText);
    //});
}