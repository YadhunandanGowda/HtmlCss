function loadPage(navigate){
    var path = window.location.hash;
    var indexofpath = path.indexOf("?");
    if(indexofpath != -1){
        path = path.substring(0,indexofpath);
    }
    if(navigate){
        path = navigate;
    }
    var content = $('#content');
    var handled = handleCommonPages(content, path);
    if(!handled){
        getCurrentSession(function (success, result) {
            if(success){
                session = result;
                handleSessionPages(content, path);
            }
            else{
                session = [];
                handleNonSessionPages(content, path);
            }
        });        
    }
    $(this).scrollTop(0);
}

function refreshPage(hashItem){
    window.location.href = '/' + hashItem;

}

function authGuard(onSessionIdentifiedCallback){
    if(session.name){
        onSessionIdentifiedCallback(true);
    }
    
    let fromStorage = getCurrentSession(function (success, result) {

        if(success){
            session = result;
        }
        else{
            session = [];
        }
        
        onSessionIdentifiedCallback(success);
    });
    
    
    return session;
}

function handleCommonPages(content, path){
    if(path == "#aboutus"){
        content.load("pages/common/aboutus.html");
        return true;
    }else if(path == "#contactus"){
        content.load("pages/common/contactus.html");
        return true;
    }
    else if(path == "#dealer_access"){
        content.load("pages/features/dealer_feature.html");
        return true;
    }
    else if(path == "#register_access"){
        content.load("pages/auth/register_access.html");
        return true;
    }
    else if(path == "#farmer_access"){
        content.load("pages/features/farmer_feature.html");
        return true;
    }
    else if(path == "#agent_access"){
        content.load("pages/features/agent_feature.html");
        return true;
    }
    else if(path == "#serviceprovider_access"){
        content.load("pages/features/serviceprovider_feature.html");
        return true;
    }
    else if(path == "#others_access"){
        content.load("pages/features/others_feature.html");
        return true;
    }
    else if(path == "#register_form_Agent"){
        content.load("pages/forms/register_form_Agent.html");
        return true;
    }
    else if(path == "#register_form_Farmer"){
        content.load("pages/forms/register_form_Farmer.html");
        return true;
    }
    else if(path == "#register_form_Others"){
        content.load("pages/forms/register_form_Others.html");
        return true;
    }
    else if(path.indexOf("#register_form_Category") != -1){
        path = path.replace("#",'');
        var linkpath = "pages/forms/" + path + ".html";
        content.load(linkpath);
        return true;
    }
    else if(path == "#dealer_list"){
        content.load("pages/features/dealer_list.html");
        return true;
    }
    else if(path == "#dealership_plans"){
        content.load("pages/plans/dealership_plans.html");
        return true;
    }
    else if(path == "#dealership_plans_upgrade"){
        content.load("pages/plans/dealer_upgrade_plans.html");
        return true;
    }    
    return false;
}

function handleSessionPages(content, path){
    if(path == "#change_password"){
        content.load("pages/auth/change_password.html");
    }
    else if(path == "#create_post_choose"){
        content.load("pages/posts/create_post_choose.html");
    }
    else if(path == "#create_post_address"){
        content.load("pages/posts/create_post_address.html");
    }
    else if(path == "#create_post_photo"){
        content.load("pages/posts/create_post_photo.html");
    }
    else if(path == "#Dealer_priview_listing"){
        content.load("pages/posts/Dealer_priview_listing.html");
    }
    else if(path == "#listings"){
        content.load("pages/posts/listings.html");
    }
    // else if(path == "#create_postPage"){
        
    //     content.load("pages/posts/pages/create_postPage.html?"+window.location.search);
    // }
    else if(path.indexOf("#create_postPage_") != -1){
        path = path.replace("#",'');
        var linkpath = "pages/posts/pages/" + path + ".html?"+window.location.search;
        content.load(linkpath);
        return true;
    }
    
    else{
        content.load("pages/home/home.html");
    }
}

function handleNonSessionPages(content, path){
    if(path == "#register"){
        content.load("pages/auth/register.html");
    }
    else if(path == "#verify_register"){
        content.load("pages/auth/register_verification.html");
    }
    else if(path == "#changePassword"){
        content.load("pages/auth/forgot_password.html");
    }
    else if(path == "#confirm_account"){
        content.load("pages/auth/confirm_account.html");
    }
    else if(path == "#confirmaccount_otp"){
        content.load("pages/auth/confirm_account_otp.html");
    }
    else if(path == "#changePassword_otp"){
        content.load("pages/auth/forgot_password_otp.html");
    }
    else if(path == "#changePassword_confirm"){
        content.load("pages/auth/forgot_password_confirm.html");
    }
    else{
        content.load("pages/home/prehome.html");
    }
}

function loadCustomerTestimonials() {

    $("#customers-testimonials").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: true,
        nav: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1170: {
                items: 3,
            },
        },
    });
}

function loadProfileDetails() {
    authGuard(() => {
        $(document).ready(function () {
            if(session.name){
                $('.hello_div').show();
                $('#hello_div_name').text(session.name);
                $('#hello_div_access').text(session["custom:access"]);
                $('#loginregisterdiv').hide();
            }
            else{
                $('.hello_div').hide();
                $('#loginregisterdiv').show();
            }
        });
        
    })
}

function headerDetails() {
    authGuard(() => {
        $(document).ready(function () {
            if(session.name){
                
                $('#header_notifications').show();
                $('#header_profile').show();
                $('#header_name').text(session.name);
                $('#header_name_popup').text(session.name);
                $('#header_phone_number_popup').text(session.phone_number);
                
            }
            else{
                $('#header_notifications').hide();
                $('#header_profile').hide();
            }
        });
        
    })
}

function setSession(user){
    session = user.attribute;
}

function launchLoginModal(){

}

function handleRegisterResult(phone_number, success, result){
   
    selected_phone_number = phone_number;
    if(success){
        refreshPage('#verify_register');
    }
    else{
        if((result + "").includes('UsernameExistsException')) {
            $('#register_error').show();
            $('#register_error').text("Your phone number already exists. Please login or try resetting password.");
            
        }
        else{
            $('#register_error').show();
            $('#register_error').text(result.message);
        }
        
    }
}

function handleLogout(){
    session = [];
    localStorage["CurrentUserPlanId"] ="";
    localStorage['currentaccessid'] ="";
    window.location.reload(true);
    window.location.href = "/";
}

function handleLoginResult(phone_number, success, result){
   
    if(success){
        session = result.attributes;
        //check if user has access registered
        listUserAccess();
        
    }
    else{
        if(result.message.trim() == "User is not confirmed."){
            //$('#login_popup').modal('hide');
            // window.location.href = "/";
            $('#modalcloseid').click();
            // $('#login_error').show();
            // $('#login_error').text(result.message.trim() + " Please close this popup and verify the OTP sent now.");
            ResendSignUp(phone_number);
        }
        else{
            $('#login_error').show();
            $('#login_error').text(result.message.trim());
        }
    }    
}

function verifyOTP(){
    password_verification_code = $('#otp_letter1').val() 
                    +''+$('#otp_letter2').val()+''+$('#otp_letter3').val()
                    +''+$('#otp_letter4').val()+''+$('#otp_letter5').val()+''+$('#otp_letter6').val();
    if(password_verification_code.trim().length !=6){
        
        $('#resentotpmsg').show();
        $('#resentotpmsg').text("Please enter the OTP.");
    }
    else{
        $('#resentotpmsg').hide();
        $('#resentotpmsg').text("");
        confirmSignUp(selected_phone_number, password_verification_code, (success, result) => {
            if(success){
                selected_phone_number = result;
                if(localStorage["userpass"]){
                    signIn(result, localStorage["userpass"], handleLoginResult);
                }
                localStorage["userpass"] = "";
                //window.location.href = "/";
                //refreshPage('#register_access');
            }
            else{
                localStorage["userpass"] = "";
                if(result.message == 'User cannot be confirmed. Current status is CONFIRMED'){
                    window.location.href = "/";
                    //refreshPage('#register_access');
                }
                else{
                    $('#resentotpmsg').show();
                    $('#resentotpmsg').text("Invalid OTP.");
                }
            }
        });
    }
    
}

function handle_changePassword(success, result){
        if(success){
            alert("Password changed successfully!");
            window.location.href = "/";
        }
        else{
            $('#chpassword_41_error').show();
            $('#chpassword_41_error').text(result.message);
        }   
}

function setPhoneNumber(phone_number_div){
    document.getElementById(phone_number_div).innerText = selected_phone_number;
}

function handle_changePassword_initiate(success, result){
    if(success){
        refreshPage('#changePassword_otp');
        selected_phone_number = result;
        password_verification_username = result;
    }
    else{
        $('#chpassword_1_error').show();
        $('#chpassword_1_error').text(result.message);
    }
}

function handle_ConfirmAccount_initiate(success, result){
    if(success){
        refreshPage('#confirmaccount_otp');
        selected_phone_number = result;
        password_verification_username = result;
    }
    else{
        $('#confrmaccount_error').show();
        $('#confrmaccount_error').text(result.message);
    }
}

function handle_changePassword_finalize(success, result){
    if(success){
        window.location.href = "/";
    }
    else{
        $('#chpassword_3_error').show();
        $('#chpassword_3_error').text(result.message);
    }
}

function handle_ConfirmAccount_finalize(success, result){
    if(success){
        window.location.href = "/";
    }
    else{
        $('#confrmaccount_3_error').show();
        $('#confrmaccount_3_error').text(result.message);
    }
}

function GetAccessDetailsAgent(){
    localStorage['currentaccesstype'] = "2";
    refreshPage('#agent_access');
}
function GetAccessDetailsFarmer(){
    localStorage['currentaccesstype'] = "3";
    refreshPage('#farmer_access');
}
function GetAccessDetailsDealer(){
    localStorage['currentaccesstype'] = "4";
    refreshPage('#dealer_access');
}
function GetAccessDetailsServiceProvider(){
    localStorage['currentaccesstype'] = "1";
    refreshPage('#serviceprovider_access');
}
function GetAccessDetailsOthers(){
    localStorage['currentaccesstype'] = "5";
    refreshPage('#others_access');
}

function printJWT(a, b, c) {
    prompt("Copy to clipboard: Ctrl+C, Enter", c);
    
}