function callProtectedRest(api, callback){
    getCurrentSession(function (success, result, jwtToken) {
        if(success) {
            $.ajax({ 
                type: "GET",
                dataType: "json",
                url: API_PUBLIC_HOST + api,
                headers: {"Authorization": jwtToken},
                success: callback,
                error: callback 
             });

        }
        else{
            session = [];
            callback();
        }
    });
    
}

function callRegisterRest(api, values, callback){
    getCurrentSession(function (success, result, jwtToken) {
        if(success) {
            $.ajax({ 
                type: "POST",
                dataType: "json",
                data: JSON.stringify(values),
                url: API_PUBLIC_HOST + api,
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": jwtToken
                },
                success: callback,
                error: callback 
             });

        }
        else{
            session = [];
            callback();
        }
    });
    
}
function saveMediaRest(api, values, callback){
    getCurrentSession(function (success, result, jwtToken) {
        if(success) {
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: API_PUBLIC_HOST + api,
                data: values,
                processData: false,
                contentType: false,
                cache: false,
                headers: { 
                    "Authorization": jwtToken
                },
                timeout: 600000,
                success: callback,
                error: callback 
            });
        }
        else{
            session = [];
            callback();
            $('.loader').hide();
        }
});
}

function callPostQueryRest(api, callback){
    getCurrentSession(function (success,result, jwtToken) {
        if(success) {
            $.ajax({ 
                type: "POST",
                dataType: "json",
                url: API_PUBLIC_HOST + api,
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": jwtToken
                },
                success: callback,
                error: callback 
             });

        }
        else{
            session = [];
            callback();
        }
    });
    
}
function callGetQueryRest(api, callback){
    getCurrentSession(function (success,result, jwtToken) {
        if(success) {
            $.ajax({ 
                type: "GET",
                dataType: "json",
                url: API_PUBLIC_HOST + api,
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": jwtToken
                },
                success: callback,
                error: callback 
             });

        }
        else{
            session = [];
            callback();
        }
    });
    
}

function callDeleteQueryRest(api, callback){
    getCurrentSession(function (success,result, jwtToken) {
        if(success) {
            $.ajax({ 
                type: "DELETE",
                dataType: "json",
                url: API_PUBLIC_HOST + api,
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": jwtToken
                },
                success: callback,
                error: callback 
             });

        }
        else{
            session = [];
            callback();
        }
    });
    
}

function listUsers(){ callProtectedRest("/user/viewUser", listUsersApi);}
function listUsersPost(){ callProtectedRest("/user/viewUser", listUsersPostApi);}
function listUsersListPreview(){ callProtectedRest("/user/viewUser", listUsersListPreviewApi);}
function listAddress(){ callProtectedRest("/user/listAddress", listAddressApi);}
function listAllAddress(){ callProtectedRest("/user/listAddress", listAllAddressApi);}
function UpdateUserData(values){ callRegisterRest("/user/updateUser",values, UpdateUserDataApi);}
function UpdateAddressData(values){ callRegisterRest("/user/addAddress",values, UpdateAddressDataApi);}
function UpdateUserAccessData(values){ callRegisterRest("/user/addUserAccess",values, UpdateUserAccessDataApi);}
function SavePlanDetails(planId,withDiscount){ callPostQueryRest("/user/addUserPlan?planId="+planId+"&withDiscount="+withDiscount, SavePlanDetailsApi);}
function listUserAccess(){ callProtectedRest("/user/listUserAccess", listUserAccessApi);}
function viewUserAccess(accessId){ callGetQueryRest("/user/viewUserAccess?userAccessId=" + accessId, viewUserAccessApi);}
function listUserAccessAll(){ callProtectedRest("/user/listUserAccess", listUserAccessAllApi);}
function listUserAccessDashboard(){ callProtectedRest("/user/listUserAccess", listUserAccessDashboardApi);}
function ListCategories(values){ callRegisterRest("/category/filterCategories",values, ListCategoriesApi);}

function SaveListings(values){ callRegisterRest("/listing/saveListing",values, SaveListingApi);}
function AddMediaFiles(isDefault,listingId,mediaType,sequence,filedata){ saveMediaRest("/listing/upload?isDefault=" +
isDefault +"&listingId=" + listingId +"&mediaType=" + mediaType +"&sequence=" + sequence , filedata, AddMediaFilesApi);}

function AddYoutubeURL(listingId,metadata,fileurl){ callPostQueryRest("/mediaAccess/saveAlreadyUploadedUrl?assetId=" + listingId 
+ "&assetType=LISTING&fileUrl=" + fileurl +"&mediaType=YOUTUBE_VIDEO&metadata=" + metadata , AddYoutubeURLApi);}

function LoadListingImages(listingId){ callGetQueryRest("/listing/viewListing?listId=" + listingId, LoadListingImagesApi);}
function LoadListingposts(listingId){ callGetQueryRest("/listing/viewListing?listId=" + listingId, LoadListingpostsApi);}
function LoadListingaddress(listingId){ callGetQueryRest("/listing/viewListing?listId=" + listingId, LoadListingaddressApi);}
function LoadListingImagesPreview(listingId){ callGetQueryRest("/listing/viewListing?listId=" + listingId, LoadListingImagesPreviewApi);}
function listListings(values){ callRegisterRest("/listing/listListing",values, listAllListingsApi);}

function deleteMediaListing(id){ callDeleteQueryRest("/mediaAccess/delete?mediaAssetId=" + id, deleteMediaListingApi);}
function deleteListing(id){ callDeleteQueryRest("/listing/deleteListing?listingId=" + id, deleteListingApi);}