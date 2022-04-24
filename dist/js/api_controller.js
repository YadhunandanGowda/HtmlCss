function handleCountryList(success, result){
    if(success){
       $("#language_selection").empty();
       var languages = JSON.parse(result);
       for (var i = 0; i < languages.length; i++) {
            var elm = '<li class="drop-menu-item" >' +
            '<a href="#">' +  languages[i].display +'</a>'+
            '</li>';
            $(elm).appendTo( $("#language_selection"));
        }
    }
    else{
    }
} 

function loadLanguagesApi(result){
    if(result != null && result['success'] == true){
        var lang = new Lang();
        var langArray = result['response'];
        $("#language_selection").empty();
        for (var i = 0; i < langArray.length; i++) {
            
            lang.dynamic(langArray[i].name, 'js/langpack/' + langArray[i].name+ '.json');
            $('<li/>', {
                html: $('<a/>', {
                    'onclick': "javascript:changeLanguage('" + langArray[i].name + "');",
                    // 'href': '#',
                    html: langArray[i].display
                }),
                'class': "drop-menu-item"
            }).appendTo($("#language_selection"));
        }
        lang.init({
            defaultLang: 'en',
            currentLang: Cookies.get('langCookie') || 'English'
        });
        window.lang=lang;
    }

    
}

function loadCountryCodes(){
    const url = 'https://lookup-system-resources.s3.ap-south-1.amazonaws.com/public/country/countrycodes.json';
    
    const successCb = (resp) => {
        //console.log(resp);
        var codeDetails = resp;
        $("#countryCodeId").empty();
        $("#countryCodeId_login").empty();
        $('<option data-countryCode="IN" Selected value="91">+91  &nbsp; &nbsp; &nbsp;India</option>').appendTo( $("#countryCodeId"));
        $('<option data-countryCode="IN" Selected value="91">+91  &nbsp; &nbsp; &nbsp;India</option>').appendTo( $("#countryCodeId_login"));
        for (var i = 0; i < codeDetails.length; i++) {
            var elm = '<option data-countryCode="' + codeDetails[i].countryCode + '" value="' + codeDetails[i].value + '">' + codeDetails[i].display + '</option>';
            $(elm).appendTo( $("#countryCodeId"));
            $(elm).appendTo( $("#countryCodeId_login"));
        }
    };
    
    const errorCb = (err) => {
        console.error('Error - ', err);
    };
    downloadObject(url, successCb, errorCb);
    
}

function downloadObject(url, successCb, errorCb) {
    fetch(url)
      .then(response => response.json())
      .then(successCb)
      .catch(errorCb);
}

function loadAccessProfiles(result){
    if(result != null && result['success'] == true){
        var accessArray = result['response'];
        $("#accessshowid").empty();
        localStorage['currentaccesstype'] = "";
        for (var i = 0; i < accessArray.length; i++) {
            if(accessArray[i].name == "Farmer"){
                var elm = '<li class="w-50"><div lang="en" onclick="GetAccessDetailsFarmer();" id="' + accessArray[i].id 
                + '" class="reg_btn' + [i+1] + '">' + accessArray[i].displayCode + '</div></li>'
                $(elm).appendTo( $("#accessshowid"));
            }
            else if(accessArray[i].name == "Agent"){
                var elm = '<li class="w-50"><div lang="en" onclick="GetAccessDetailsAgent();" id="' + accessArray[i].id 
                + '" class="reg_btn' + [i+1] + '">' + accessArray[i].displayCode + '</div></li>'
                $(elm).appendTo( $("#accessshowid"));
            }
            else if(accessArray[i].name == "Service Provider"){
                var elm = '<li class="w-50"><div lang="en" onclick="GetAccessDetailsServiceProvider();" id="' + accessArray[i].id 
                + '" class="reg_btn' + [i+1] + '">' + accessArray[i].displayCode + '</div></li>'
                $(elm).appendTo( $("#accessshowid"));
            }
            else if(accessArray[i].name == "Dealer"){
                var elm = '<li class="w-50"><div lang="en" onclick="GetAccessDetailsDealer();" id="' + accessArray[i].id 
                + '" class="reg_btn' + [i+1] + '">' + accessArray[i].displayCode + '</div></li>'
                $(elm).appendTo( $("#accessshowid"));
            }
            else{
                var elm = '<li class="w-100"><div lang="en" onclick="GetAccessDetailsOthers();" id="' + accessArray[i].id 
                + '" class="reg_btn' + [i+1] + '">' + accessArray[i].displayCode + '</div></li>'
                $(elm).appendTo( $("#accessshowid"));
            }
        }
    }
}

function loadCategoryLists(result){
    if(result != null && result['success'] == true){
        var categoryArray = result['response'];
        if(localStorage['currentaccesstype'] != ""){
            var res = [];
            categoryArray.map(function(v){
                if(v["accessId"] == localStorage['currentaccesstype']){
                    res.push(v);
                }
                return res;
            });
            categoryArray = res;
            if(localStorage['currentaccesstype'] == "1"){
                $("#select_dealership").text("SERVICE");
            }
            else{
                $("#select_dealership").text("DEALERSHIP");
            }
        }
        $("#dealershipListsId").empty();
        for (var i = 0; i < categoryArray.length; i++) {
            $('<a/>', {
                'onclick': "javascript:loadDealerForm('" + categoryArray[i].name + "," + categoryArray[i].id + "');javascript:loadFormPage('" + categoryArray[i].displayCode + "');",
                'class': "select_div",
                html: '<i class="fas fa-user roundboxuser"></i><p lang="en">' + categoryArray[i].displayCode + '</p>'
            }).appendTo($("#dealershipListsId"));
        }
    }
}

function loadDealerForm(category){
    var categoryarr = category.split(',');
    if(categoryarr[0] == "Farmer" || categoryarr[0] == "Others" || categoryarr[0] == "Agent"){
        refreshPage('#register_form_' + categoryarr[0]);
        localStorage['currentcategoryid'] ="";
    }
    else{
        localStorage['currentcategoryid'] = categoryarr[1];
    }
    localStorage['formlandingtext'] = categoryarr[0];
}
function loadFormPage(categorycode){
    var category = categorycode.split('.');
    refreshPage('#register_form_Category_' + category[1]);
}

function changeLanguage(data){
    window.lang.change(data);
    window.lang.currentLang = data;
} 

function GetCategoryList(type){
    if(type == "Dealer"){
        localStorage['currentaccesstype'] = "4";
    }
    else if(type == "ST"){
        localStorage['currentaccesstype'] = "1";
        }
    else{
        localStorage['currentaccesstype'] = "";
    }
    refreshPage('#dealer_list');
}

function listUsersApi(result){
    if(result != undefined && result['response'].length != 0){
        var profileData = result['response'];
        $('#nameId').val(profileData.name);
        if(profileData.name != '' && profileData.name != null){
            $('#nameId').prop('disabled', true);
        }
        $('#phoneId').val(profileData.phoneNumber);
        if(profileData.phoneNumber != '' && profileData.phoneNumber != null){
            $('#phoneId').prop('disabled', true);
        }
        $('#emailId').val(profileData.email);
        if(profileData.email != '' && profileData.email != null){
            $('#emailId').prop('disabled', true);
        }
        $('#referalcodeId').val(profileData.referral_code);
        if(profileData.referral_code != '' && profileData.referral_code != null){
            $('#referalcodeId').prop('disabled', true);
        }
        

        listUserAccessAll();
    }
}

function listAddressApi(result){
    if(result != undefined && result['response'].length != 0){
        var addressData = result['response'].filter(function (n){
            return n.isPrimary == true;
        });
        if(addressData.length > 0){
            $('#ismultipleaddressid').show();
            localStorage["isPrimaryaddnotrpresent"] = false;
        }
        else{
            $('#ismultipleaddressid').hide();
            localStorage["isPrimaryaddnotrpresent"] = true;
        }
        var filteredprimaryaddress = addressData[addressData.length - 1];
        if(filteredprimaryaddress != undefined){
            $('#pincodeid').val(filteredprimaryaddress.pincode);
            if(filteredprimaryaddress.pincode != ''){
                $('#pincodeid').prop('disabled', true);
            }
            listStates(filteredprimaryaddress.country);
            listDistrict(filteredprimaryaddress.state);
            listTehsil(filteredprimaryaddress.district);
            setTimeout(
                function() 
                {
                    $('#countryid').val(filteredprimaryaddress.country);
                    if(filteredprimaryaddress.country != ''){
                        $('#countryid').prop('disabled', true);
                    }
                    $('#stateid').val(filteredprimaryaddress.state);
                    if(filteredprimaryaddress.state != ''){
                        $('#stateid').prop('disabled', true);
                    }
                    $('#districtid').val(filteredprimaryaddress.district);
                    if(filteredprimaryaddress.district != ''){
                        $('#districtid').prop('disabled', true);
                    }
                    $('#tehsilid').val(filteredprimaryaddress.tehsil);
                    if(filteredprimaryaddress.tehsil != ''){
                        $('#tehsilid').prop('disabled', true);
                    }
                }, 300);
            
            $('#address2Id').val(filteredprimaryaddress.houseNoStreet);
            if(filteredprimaryaddress.houseNoStreet != ''){
                $('#address2Id').prop('disabled', true);
            }
            $('#address1Id').val(filteredprimaryaddress.villageCity);
            if(filteredprimaryaddress.villageCity != ''){
                $('#address1Id').prop('disabled', true);
            }
        }
    }
}

function ClearAddressFields(){
    $("#addressfieldsid :input").prop('disabled', false);
    $("#addressfieldsid :input").val('');
    if($('#countryid').val() == ""){
        $('#countryid').val("98");
        listStates("98");
    }
}

function listUserAccessAllApi(result){
    if(result != undefined && result['response'].length != 0){
        if(localStorage['currentcategoryid'] != undefined && localStorage['currentcategoryid'] != ""){
            var listdata = result['response'].filter(function (n){
                return n.category_id == localStorage['currentcategoryid'];
            });
            if(listdata.length > 0){
                var access_id = listdata[0].access_id;
                viewUserAccess(access_id);
                
            }
        }
        else{
            var listdata = result['response'];
            if(listdata.length > 0){
                var access_id = listdata[0].access_id;
                viewUserAccess(access_id);
            }
        }
    }
}

function viewUserAccessApi(result){
    if(result != undefined && result['response'].length != 0){
        var listdata = result['response']['metadataMap'];
        $('#gstnumberId').val(listdata["GST"]);
        if(listdata["GST"] != '' && listdata["GST"] != null){
            $('#gstnumberId').prop('disabled', true);
        }
        $('#organizationnameid').val(listdata['Organisation_Name']);
        if(listdata['Organisation_Name'] != '' && listdata['Organisation_Name'] != null){
            $('#organizationnameid').prop('disabled', true);
        }
        var accessId = result['response']['accessId'];
        localStorage['currentaccessid'] = accessId;
    }
}

function listUserAccessApi(result){
    if(result != undefined){
        if(result['response'].length == 0){
            $('#modalcloseid').click();
            refreshPage('#register_access');
            headerDetails();
        }
        else{
            localStorage["CurrentUserPlanId"] = result['response']['plan_id'];
            window.location.href = "/";
        }
    }
}

function listCountryApi(result){
    if(result != null && result['success'] == true){
        var countryArray = result['response'];
        $("#countryid").empty();
        $('<option/>', {
            html: " "
        }).appendTo($("#countryid"));
        for (var i = 0; i < countryArray.length; i++) {
            $('<option/>', {
                'value': countryArray[i].id,
                'Id': countryArray[i].id,
                'lang': "en",
                html: countryArray[i].displayCode
            }).appendTo($("#countryid"));
        }
        // Set default country to India
        if($('#countryid').val() == ""){
            $('#countryid').val("98");
            listStates("98");
        }
        
    }
}

function listStatesApi(result){
    if(result != null && result['success'] == true){
        var stateArray = result['response'];
        $("#stateid").empty();
        $('<option/>', {
            html: " "
        }).appendTo($("#stateid"));
        for (var i = 0; i < stateArray.length; i++) {
            $('<option/>', {
                'value': stateArray[i].id,
                'Id': stateArray[i].id,
                'lang': "en",
                html: stateArray[i].displayCode
            }).appendTo($("#stateid"));
        }
    }
}

function listDistrictApi(result){
    if(result != null && result['success'] == true){
        var districtArray = result['response'];
        $("#districtid").empty();
        $('<option/>', {
            html: " "
        }).appendTo($("#districtid"));
        for (var i = 0; i < districtArray.length; i++) {
            $('<option/>', {
                'value': districtArray[i].id,
                'Id': districtArray[i].id,
                'lang': "en",
                html: districtArray[i].displayCode
            }).appendTo($("#districtid"));
        }
    }
}

function listTehsilApi(result){
    if(result != null && result['success'] == true){
        var tehsilArray = result['response'];
        $("#tehsilid").empty();
        $('<option/>', {
            html: " "
        }).appendTo($("#tehsilid"));
        for (var i = 0; i < tehsilArray.length; i++) {
            $('<option/>', {
                'value': tehsilArray[i].id,
                'Id': tehsilArray[i].id,
                'lang': "en",
                html: tehsilArray[i].displayCode
            }).appendTo($("#tehsilid"));
        }
    }
}
function listBrandsApi(result){
    if(result != null && result['success'] == true){
        var brandsArray = result['response'];
        $("#brandid").empty();
        for (var i = 0; i < brandsArray.length; i++) {
            $('<option/>', {
                'value': brandsArray[i].id,
                'lang': "en",
                html: brandsArray[i].displayCode
            }).appendTo($("#brandid"));
        }
    }
}

function UpdateProfileDetails(inputdata){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    var userdata = 
    {
        "access": localStorage['currentaccesstype'],
        "email": inputdata["email"],
        "enabled": true,
        "gst_no": (inputdata["gstnumberId"] == "" || inputdata["gstnumberId"] == null) ? "":inputdata["gstnumberId"],
        "name": inputdata["name"],
        "org_name": inputdata["organizationnameid"],
        "phoneNumber": inputdata["phone"],
        "referral_code": inputdata["referalcodeId"],
        "referral_type": "",
        "userId": ""
    }
    var useraddressdata = 
    {
        "country": inputdata["countryid"],
        "detectedLocation": "",
        "district": inputdata["districtid"],
        "email": inputdata["email"],
        "houseNoStreet": inputdata["address2"],
        "id": "",
        "isPrimary": localStorage["isPrimaryaddnotrpresent"],
        "name": inputdata["name"],
        "new": true,
        "parentUserId": "",
        "phoneNumber": inputdata["phone"],
        "phoneNumberVerified": true,
        "pincode": inputdata["pincodeid"],
        "state": inputdata["stateid"],
        "tehsil": inputdata["tehsilid"],
        "userId": "",
        "villageCity": inputdata["address1"]
    }
    var useraccessdata = 
        {
            "accessId": localStorage['currentaccesstype'],
            "categoryId": localStorage['currentcategoryid'],
            "metadata": [
                {
                  "accessKey": "GST",
                  "accessValue": (inputdata["gstnumberId"] == "" || inputdata["gstnumberId"] == null) ? "":inputdata["gstnumberId"]
                },
                {
                    "accessKey": "DoctorLicence",
                    "accessValue": (inputdata["licensenumberid"] == "" || inputdata["licensenumberid"] == null) ? "":inputdata["licensenumberid"]
                  },
                  {
                    "accessKey": "Organisation_Name",
                    "accessValue": (inputdata["organizationnameid"] == "" || inputdata["organizationnameid"] == null) ? "":inputdata["organizationnameid"]
                  },
                  {
                    "accessKey": "DoctorClinic",
                    "accessValue": (inputdata["degreecrftId"] == "" || inputdata["degreecrftId"] == null) ? "":inputdata["degreecrftId"]
                  },
                  {
                    "accessKey": "NameOfStudFarm",
                    "accessValue": (inputdata["studfarmid"] == "" || inputdata["studfarmid"] == null) ? "":inputdata["studfarmid"]
                  },
                  {
                    "accessKey": "NameOfFarm",
                    "accessValue": (inputdata["farmnameid"] == "" || inputdata["farmnameid"] == null) ? "":inputdata["farmnameid"]
                  },
                  {
                    "accessKey": "NameOfFather",
                    "accessValue": (inputdata["FathersNameId"] == "" || inputdata["FathersNameId"] == null) ? "":inputdata["FathersNameId"]
                  },
                  {
                    "accessKey": "BusinessType",
                    "accessValue": (inputdata["businesstypeid"] == "" || inputdata["businesstypeid"] == null) ? "":inputdata["businesstypeid"]
                  },
                  {
                    "accessKey": "Service",
                    "accessValue": (inputdata["serviceid"] == "" || inputdata["serviceid"] == null) ? "":inputdata["serviceid"]
                  },
                  {
                    "accessKey": "Experience",
                    "accessValue": (inputdata["ExperienceId"] == "" || inputdata["ExperienceId"] == null) ? "":inputdata["ExperienceId"]
                  }
              ]
        }
    
    UpdateUserData(userdata);
    UpdateAddressData(useraddressdata);
    UpdateUserAccessData(useraccessdata);
}

function UpdateUserDataApi(result){
    //alert(result);
    if(result != null && result['success'] == true){
        console.log("Saved user data.");
    }else{
        console.log("Error in saving user data.");
    }
}
function UpdateAddressDataApi(result){
    //alert(result);
    if(result != null && result['success'] == true){
        listAllAddress();
        console.log("Saved user address data.");
    }else{
        console.log("Error in saving user address data.");
    }
}
function UpdateUserAccessDataApi(result){
    //alert(result);
    if(result != null && result['success'] == true){
        console.log("Saved user access data.");
        // show Plans
        refreshPage('#dealership_plans');
    }
    else{
        console.log("Error in saving user access data.");
    }
}
function LoadPlanData(){
    var data = {
    "category_id": localStorage['currentcategoryid'],
    "is_active": "true",
    "planType": "CATEGORY"
    }
    loadPlanLists(data);
}
function LoadPlanDataUpgrade(){
    var data = {
        "category_id": localStorage['currentcategoryid'],
        "is_active": "true",
        "planType": "CATEGORY"
        }
        loadPlanListsUpgrade(data);
}

function loadPlanListsApi(result){
    if(result != null && result['success'] == true){
        var planArray = result['response'];
        
        $("#plandetailsId").empty();
        for (var i = 0; i < planArray.length; i++) {
            $('<div/>', {
                html: $('<div/>', {
                    html: '<div lang="en" class="plan_type">' + planArray[i].displayCode  
                    + '</div><div class="line_plan"></div><div class="round_"></div><div class="plan_price">₹ <b>' +  
                    planArray[i].price  +'</b></div><div class="months">for ' +
                    planArray[i].tenure + 
                    ' days</div><div class="plan_cou">' + 
                    planArray[i].listing +
                    '</div><div class="listings">Listings</div><div data-bs-toggle="modal" data-bs-target="#plan_more_popup" class="more_deat"><a>More Details</a></div><div class="arrow_b"></div><a><button onclick="SavePlanDetails(' + 
                    '\''+ planArray[i].id + '\''+ ',' + false + 
                    ')" class="plan_btn"><span>SELECT</span></button></a>'
                    ,'class': "recblurgrey plan_main_box plan" + (i+1)                    
                }),
                'class': "col-md-2"
            }).appendTo($("#plandetailsId"));
        }
    }
}

function loadPlanListsUpgradeApi(result){
    if(result != null && result['success'] == true){
        var planArray = result['response'];
        
        $("#upgradeplandetailsId").empty();
        $('<div class="col-md-2"><div class="recblurgrey plan_main_box plan1"></br></br></br><div><span class="greatoffers">GREAT </span><span class="greatoffers" style="font-size: 30px;font-weight: 10;">OFFERS</span></div></br></br><div style="width: 100px;padding-top: 10px;font-weight: bold;"></div><button class="plan_btn greatoffersbottom" style="height: 362px !important;"><span>TIME LIMITED OFFERS</br></br><span>ONLY</span></br></br><span style="font-size: 24px;">FOR YOU <svg style="margin-top: -3px;" width="12" height="30" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.986283 18.9975C1.63901 19.6681 2.69796 19.6675 3.34996 18.9957L11.0865 11.0245C11.6378 10.4564 11.6378 9.54359 11.0865 8.97551L3.34996 1.00429C2.69737 0.331905 1.6371 0.331905 0.984515 1.00429C0.340139 1.66821 0.340059 2.73432 0.984275 3.39834C0.984355 3.39843 0.984435 3.39851 0.984515 3.39859L7.38713 10.0046L0.975205 16.611C0.340152 17.2653 0.339374 18.3426 0.986283 18.9975Z" fill="#222222" stroke="#222222"/></svg></span></button></div></div>').appendTo($("#upgradeplandetailsId"));
        for (var i = 0; i < planArray.length; i++) {
            if(planArray[i].planGroup != "Free"){
                $('<div/>', {
                    html: $('<div/>', {
                        html: '<div lang="en" class="plan_type">' + planArray[i].displayCode  
                        + '</div><div class="line_plan"></div><div class="round_"></div><div class="plan_price">₹ <b>' +  
                        planArray[i].discountedPrice  +'</b></div><div class="months">for ' +
                        planArray[i].discountedTenure + 
                        ' days</div><div class="plan_cou">' + 
                        planArray[i].discountedListing +
                        '</div><div class="listings">Listings</div><div data-bs-toggle="modal" data-bs-target="#plan_more_popup" class="more_deat"><a>More Details</a></div><div class="arrow_b"></div><a><button onclick="SavePlanDetails(' + 
                        '\''+ planArray[i].id + '\''+ ',' + false + 
                        ')" class="plan_btn"><span>SELECT</span></button></a>'
                        ,'class': "recblurgrey plan_main_box plan" + (i+1)                    
                    }),
                    'class': "col-md-2"
                }).appendTo($("#upgradeplandetailsId"));
            }
        }
    }
}

function SavePlanDetailsApi(result){
    if(result != null && result['success'] == true){
        alert(result['message']);
        window.location.href = "/";
    }
}

function loadCategories(categoryId){
    var values = [];
    var path = window.location.hash;
    var indexofParentCategoryId = path.indexOf("ParentCategoryId=");
    var indexofUserPlanId = path.indexOf("&UserPlanId=");
    
    
    if(categoryId == undefined && indexofParentCategoryId != -1){
        categoryId = path.substring(indexofParentCategoryId + 17, indexofUserPlanId);
    }
    else{
        breadcrumb.pop();
        localStorage["breadcrumb"] = breadcrumb;
    }
    if(categoryId == undefined || categoryId == ""){
    values ={
            "access": localStorage['currentaccessid'],
            "is_active": true
        }
    }
    else{
        values ={
            "parent_id": categoryId,
            "is_active": true,
            "level": -1
        }
    }
    listCategoryTree(categoryId);
    //<p class="page_titall">Machinery  <i class="fas fa-chevron-right"></i> Tractor</p>
    ListCategories(values);
}
function createCategoryAndPlanUrlFromPath(childCategoryId){
    var path = window.location.hash;
    var indexofParentCategoryId = path.indexOf("ParentCategoryId=");
    var indexofUserPlanId = path.indexOf("&UserPlanId=");

    var url = '#create_post_choose?ParentCategoryId=' +  childCategoryId;
    url = url + path.substring(indexofUserPlanId);

    return url;
}

function listCategoryTreeApi(result){
    if(result != null && result['success'] == true){
        var categoryTree = result['response'];
        //Update the BreadCrumb
        categoryTree.forEach(element => {
            $('<h lang="en">' + element["displayCode"] + ' </h><i class="fas fa-chevron-right" style="margin-right: 8px;"> </i>').appendTo($("#breadcrumbid"));
        });
    }
}

function ListCategoriesApi(result){
    if(result != null && result['success'] == true){
        var categoryData = result['response'];
            $("#categorycontainerId").empty();
            if(categoryData.length == 0){
                if(open_createpost){
                    open_createpost = false;
                    var categoryId = getUrlParameter("ParentCategoryId");
                    listCategoryTree(categoryId);
                    refreshPage("#create_postPage_"+ getPageForCategory(categoryId) + getPathParameters());
                }
                else{
                    open_createpost = true;
                    breadcrumb.pop();
                    localStorage["breadcrumb"] = breadcrumb;
                    history.back();
                }
                
            }
            else{
                if(getUrlParameter("ParentCategoryId") == 1){
                    breadcrumb.pop();
                }
                // $("#breadcrumbid").text(localStorage["categoryName"] + "  ");
                // breadcrumb.forEach(element => {
                //     $('<i class="fas fa-chevron-right"></i> <b>' + element + '</b>').appendTo($("#breadcrumbid"));
                // });
                
                for (var i = 0; i < categoryData.length; i++) {
            
                    var maindiv = document.createElement("div");
                    maindiv.className = "col-md-3";
                    maindiv.setAttribute('style',"text-align: center;padding-bottom: 10px;");
                    maindiv.setAttribute('onclick',"refreshPage('"+createCategoryAndPlanUrlFromPath(categoryData[i].id) + "'); updatebreadcrumb('"+categoryData[i].name + "','" + categoryData[i].id +"');");
                    var imgboxdiv = document.createElement("a");
                    imgboxdiv.className ="machine_img_box";
                    var imgelem = document.createElement("img");
                    imgelem.src = S3_HOST + categoryData[i].thumbnail_url;
                    imgelem.setAttribute('onerror',"this.onerror=null; this.src = '"+S3_HOST + "/category/catagory1.png'");
                    var textelem = document.createElement("p");
                    textelem.innerHTML = '<p lang="en">' + categoryData[i].displayCode + '</p>';
        
                    imgboxdiv.appendChild(imgelem);
                    imgboxdiv.appendChild(textelem);
                    maindiv.appendChild(imgboxdiv);
                    document.getElementById("categorycontainerId").appendChild(maindiv);
                }
            }
            loadLanguages();
        
    }else{
        console.log("Error in saving user address data.");
    }
}

function updatebreadcrumb(name,id){
    breadcrumb.push(name);
    localStorage["breadcrumb"] = breadcrumb;
    localStorage["currentpostcategoryid"] = id;
}


function listUsersPostApi(result){
    if(result != undefined && result['response'].length != 0){
        var profileData = result['response'];
        $('#nameId').val(profileData.name);
        $('#phoneId').val(profileData.phoneNumber);
    }
}

function listUserAccessDashboardApi(result){
    if(result != undefined && result['response'].length != 0){
        $("#hello_div_access").empty();
        var listdata = result['response'];
        const ids = listdata.map(o => o.access_id)
        listdata = listdata.filter(({access_id}, index) => !ids.includes(access_id, index + 1))
        user_category_list = listdata;
        if(listdata.length > 0){
            setDashboardData(listdata[0].access_id);
            for(var i=0; i<listdata.length; i++){
                $('<option/>', {
                    'value': listdata[i].access_id,
                    'planid':listdata[i].plan_id,
                    'user_plan_id':listdata[i].user_plan_id,
                    'categoryname':listdata[i].category_name,
                    'Id': listdata[i].access_id,
                    'categoryId':listdata[i].category_id,
                    'lang': "en",
                    html: listdata[i].category_display_code
                }).appendTo($("#hello_div_access"));
            }
            //localStorage['currentcategoryid'] = listdata[0]["category_id"];
            // localStorage["CurrentUserPlanId"] = listdata[0]["plan_id"];
        }

    
        listUserAccessAll();
    }
}

function openCategorySelect(){
    var id = $("#hello_div_access").val();
    
    var url = '#create_post_choose?ParentCategoryId=' +  document.getElementById(id).getAttribute("categoryId");
    url = url + "&UserPlanId=" +  document.getElementById(id).getAttribute("user_plan_id");
    localStorage["categoryName"] =  document.getElementById(id).getAttribute("categoryname");
    refreshPage(url);
}


function setDashboardData(id){
    var selectedData = user_category_list.filter(function (n){
        return n.access_id == id;
    });
    $('#plandashboardid').empty();
    var textelem = document.createElement("p");
    textelem.innerHTML = '<b lang="en">' + selectedData[0]["plan_display_code"] + '</b> - expiring in <b>' + selectedData[0]["plan_days_remaining"]+ '</b> days';

    document.getElementById("plandashboardid").appendChild(textelem);
    $('#remaininglistingid').text(selectedData[0]["plan_listing_remaining"]);
}