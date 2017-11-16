/* 27/10/2017 */

function testConsoleLog() {
    console.log('Meghivva a klien js függvény!');
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

//https://stackoverflow.com/questions/43523576/update-part-of-html-page-using-node-js-and-ejs
function ajaxUpdateTest(element) {
    var tsId = "Ez a kliens oldalról jön!";
    $.ajax({
        url: 'useradmin/ajaxUpdate',
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