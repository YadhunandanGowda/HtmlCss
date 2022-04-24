function SaveListingApi(result){
    if(result != null && result['success'] == true){
        var listArray = result['response'];
        refreshPage('#create_post_photo?ListingId=' + listArray["id"]);
        // localStorage["currentlistingId"] = listArray["id"];
    }
    else{
        alert(result['responseJSON']['message']);
    }
    //refreshPage('#create_post_photo?ListingId=');
}

function LoadListingImagesPreviewApi(result){
    if(result != null && result['success'] == true){
        if(result['response']["categoryId"] != null){
            var categoryid = result['response']["categoryId"];
            $("#editPostId").attr("href", "javascript:refreshPage('#create_postPage_" + getPageForCategory(categoryid) +"?ListingId=" + getUrlParameter('ListingId')+"')");
        }
        else{
            alert("CategoryId not set for this Listing");
        }
        var metadata = [];
        if(result['response']["metadata"] != null){
            result['response']["metadata"].forEach(element => {
                metadata[element["listKey"]["name"]] = element["listValue"];
            });
        }
        
        $('#priceprevid').text(metadata["M_ExPrice"]);
        if(metadata["M_Brand"] != "" && metadata["M_Brand"] != null){
            ViewBrandDetails(metadata["M_Brand"]);
        } 
        $('#YOPprevid').text(metadata["M_YOP"] ? metadata["M_YOP"].split("-")[0]:"");
        $('#modelprevid').text(metadata["M_Model"]);
        $('#hpprevid').text(metadata["M_HP"]);

        if(result['response']["metadata"] != null){
            result['response']["metadata"].forEach(ele =>{
                var tblrow = document.createElement("tr");
                var tbldata = document.createElement("td");
                var tbldata1 = document.createElement("td");
                //tbldata.width = "40%";
                tbldata.innerHTML = getdetailnames(ele.listKey.name);
                tbldata1.setAttribute('lang',"en");
                tbldata.setAttribute('lang',"en");
                if(ele.listKey.name == "M_Brand"){
                    tbldata1.innerHTML = ele.listValue;
                    tbldata1.id = "branddid";
                }
                else{
                    tbldata1.innerHTML = ele.listValue == "true"? "Yes":ele.listValue == "false"? "No":ele.listValue;
                }
                tblrow.appendChild(tbldata);
                tblrow.appendChild(tbldata1);
                document.getElementById("detailsprevid").appendChild(tblrow);
            });
        }

        var mediaList = result['response']["mediaAccessList"];
        var imagemedia = mediaList.filter(function (n){
            return n.mediaType == "IMAGE";
        });
        var videomedia = mediaList.filter(function (n){
            return n.mediaType == "VIDEO";
        });
        $(".carousel-indicators").empty();
        $(".carousel-inner").empty();
        $("#tabmenuId").empty();
        
        for(var i=0; mediaList.length > 0 && i<mediaList.length; i++){
            previewCarouselMedia(mediaList[i],i);
        }
    }
}

function uploadFiles(){
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    data.append("file", form[0].files[0])
 
    AddMediaFiles(true,getUrlParameter("ListingId"),"IMAGE","2",data)
}

function uploadFilesVideo(){
    var form = $('#fileUploadForm1')[0];
    var data = new FormData(form);
    data.append("file", form[0].files[0])
 
    AddMediaFiles(true,getUrlParameter("ListingId"),"VIDEO","2",data)
}

function AddMediaFilesApi(result){
    if(result != null && result['success'] == true){
        var listArray = result['response'];
        LoadListingImages(listArray["assetId"]);
    }
}

function AddYoutubeURLApi(result){
    if(result != null && result['success'] == true){
        alert("Youtube link added successfully !!");
        LoadListingImages(getUrlParameter("ListingId"));
    }
    else{
        alert(result['responseJSON']['message']);
    }
}

function LoadListingImagesApi(result){
    if(result != null && result['success'] == true){
        var mediaList = result['response']["mediaAccessList"];
        var imagemedia = mediaList.filter(function (n){
            return n.mediaType == "IMAGE";
        });
        var videomedia = mediaList.filter(function (n){
            return n.mediaType == "VIDEO";
        });
        var youtubemedia = mediaList.filter(function (n){
            return n.mediaType == "YOUTUBE_VIDEO";
        });
        if(videomedia.length > 0){
            $('.youtube_url').prop('disabled', true);
        }
        else{
            $('.youtube_url').prop('disabled', false);
        }
        $("#dealer_photos_listId").empty();

        if(imagemedia.length > 0){
            for(var i=0; i<imagemedia.length; i++){
                previewImage(imagemedia[i]);
            }
        }
        $("#dealer_videos_listId").empty();

        if(videomedia.length > 0){
            $('#dealer_videos_listId').show();
            previewVideo(videomedia[0]);
        }
        else{
            $('#dealer_videos_listId').hide();
        }

        $("#existingyoutubrurlid").empty();
        if(youtubemedia.length > 0){
            $("#existingyoutubrurlid").text(youtubemedia[0].url);
            $("#existingyoutubrurlid").val(youtubemedia[0].id);
            $("#existingyoutubrurlid").attr('href',youtubemedia[0].url);
            $(".youtubeurldelete").show();
        }
        else{
            $(".youtubeurldelete").hide();
        }
       
    }
    $('.loader').hide();
}

function previewVideo(file) {
    var maindiv = document.createElement('source');
    maindiv.src = file.url;
    maindiv.type = "video/mp4";

    var deletediv = document.createElement('div');
    deletediv.className = "change";
    deletediv.id = file.id;
    var deletelink = document.createElement('a');
    deletelink.setAttribute('style',"margin-left: 8px;");
    deletelink.innerHTML ='<i class="fas fa-trash-alt  top-0"></i>';
    deletelink.setAttribute('onclick',"deleteMediaListing('" + file.id + "');removedeletebutton('" + file.id + "');");
    deletediv.appendChild(deletelink);


    document.getElementById("dealer_videos_listId").appendChild(maindiv);
    document.getElementById("dealer_videos_listId").parentNode.insertBefore(deletediv, document.getElementById("dealer_videos_listId").nextSibling);
}

function removedeletebutton(id){
    document.getElementById(id).remove();
}

function previewImage(file) {
    var thumbimg = document.createElement('img');
    thumbimg.src = file.url;
    var maindiv = document.createElement('div');
    maindiv.className = "dealer_photos";

    var deletediv = document.createElement('div');
    deletediv.className = "change";
    var deletelink = document.createElement('a');
    deletelink.className = "deletelinkphoto";
    deletelink.innerHTML = "Delete";
    deletelink.setAttribute('onclick',"deleteMediaListing('" + file.id + "');");
    deletediv.appendChild(deletelink);

    maindiv.appendChild(thumbimg);
    maindiv.appendChild(deletediv);
    document.getElementById("dealer_photos_listId").appendChild(maindiv);
}



function ViewBrandDetailsApi(result){
    if(result != null && result['success'] == true){
        $('#brandprevid').text(result['response']['displayCode']);
        $('#branddid').text(result['response']['displayCode']);
    }
    loadLanguages();
}

function previewCarouselMedia(file,i) {
    var mainbutton = document.createElement('button');
    mainbutton.type = "button";
    mainbutton.setAttribute('data-bs-target',"#carouselExampleIndicators");
    mainbutton.setAttribute('data-bs-slide-to',i);
    mainbutton.setAttribute('aria-current',"true");
    mainbutton.setAttribute('aria-label',"Slide " + i);
    if(i<1){
        mainbutton.className = "active";
    }

    var maindiv = document.createElement('div');
    if(i<1){
        maindiv.className = "carousel-item active";
    }
    else{
        maindiv.className = "carousel-item";
    }
    var newanchr = document.createElement('a');

    if(file.mediaType == "IMAGE"){
        var newimg = document.createElement('img');
        newimg.setAttribute('src',file.url);
        newimg.className = "d-block w-100";
        newimg.setAttribute('alt','slider_img');
        newanchr.appendChild(newimg);
        maindiv.appendChild(newanchr);
    }
    else if(file.mediaType == "VIDEO"){
        var videodiv = document.createElement('video');
        videodiv.setAttribute('controls',"");
        videodiv.setAttribute('style',"width: 100%;height: 100%;");
        var sourcediv = document.createElement('source');
        sourcediv.src = file.url;
        sourcediv.type = "video/mp4";
        videodiv.appendChild(sourcediv);
        maindiv.appendChild(videodiv);
    }
    else{
        var videodiv = document.createElement('video');
        videodiv.setAttribute('controls',true);
        videodiv.setAttribute('style',"width: 100%;height: 100%;");
        var sourcediv = document.createElement('source');
        sourcediv.src = file.url;
        sourcediv.type = "video/mp4";
        videodiv.appendChild(sourcediv);
        maindiv.appendChild(videodiv);
    }

    var mainlist = document.createElement('li');
    mainlist.setAttribute('data-tab',"slide-1");
    
    if(i<1){
        mainlist.className = "tab-link active-menu";
    }
    else{
        mainlist.className = "tab-link";
    }
    if(file.mediaType == "IMAGE"){
        var newimg = document.createElement('img');
        newimg.setAttribute('src',file.url);
        newimg.className = "tab_img_s";
        mainlist.appendChild(newimg);
    }
    else if(file.mediaType == "VIDEO"){
        var videodiv = document.createElement('video');
        videodiv.setAttribute('style',"width: 120px;height: 90px;");
        videodiv.setAttribute('controls',"");
        var sourcediv = document.createElement('source');
        sourcediv.src = file.url;
        sourcediv.type = "video/mp4";
        videodiv.appendChild(sourcediv);
        mainlist.appendChild(videodiv);
    }
    else{
        var videodiv = document.createElement('video');
        videodiv.setAttribute('style',"width: 120px;height: 90px;");
        videodiv.setAttribute('controls',true);
        var sourcediv = document.createElement('source');
        sourcediv.src = file.url;
        sourcediv.type = "video/mp4";
        videodiv.appendChild(sourcediv);
        mainlist.appendChild(videodiv);
    }
    
    document.getElementsByClassName("carousel-indicators")[0].appendChild(mainbutton);
    document.getElementsByClassName("carousel-inner")[0].appendChild(maindiv);
    document.getElementById("tabmenuId").appendChild(mainlist);
}

function deleteMediaListingApi(result){
    if(result != undefined && result['success']== true){
        alert("Media Deleted successfully !");
        LoadListingImages(getUrlParameter("ListingId"));
    }
    else{
        alert(result['responseJSON']['message']);
    }
}

function listUsersListPreviewApi(result){
    if(result != undefined && result['response'].length != 0){
        var profileData = result['response'];
        $('#sellernameid').text(profileData.name);
        if(profileData.name != '' && profileData.name != null){
            $('#sellernameid').prop('disabled', true);
        }
        
        
        $('#sellerphoneid').text(profileData.phoneNumber);
        if(profileData.phoneNumber != '' && profileData.phoneNumber != null){
            $('#sellerphoneid').prop('disabled', true);
        }
        $('#emailid').text(profileData.email);
        if(profileData.email != '' && profileData.email != null){
            $('#emailid').prop('disabled', true);
        }
    }
}

function listAllListingsApi(result){
    $("#listings_container").empty();
    $('#listingcountid').text("");
    var listings_container = document.getElementById("listings_container");

    if(result != undefined && result['response'].length != 0){
        var allListings = result['response'];

        if(allListings.length > 0){
        $('#listingcountid').text("( " + allListings.length +" )");
            for (var i = 0; i < allListings.length; i++) {

                var div3 = document.createElement("div");
                div3.className = "col-md-4";
                listings_container.appendChild(div3);

                var div4 = document.createElement("div");
                div4.className = "ruselt_call_box";
                div3.appendChild(div4);

                var img = document.createElement("img");
                img.src = ((allListings[i]["thumbnailUrl"] == null) || (allListings[i]["thumbnailUrl"].indexOf(".mp4") >= 0))
                ? "images/green_tector.png" : allListings[i]["thumbnailUrl"];
                div4.appendChild(img);

                    var div41 = document.createElement("h5");
                    div41.innerHTML = "<b>₹" + allListings[i].price+ "</b>";
                    div4.appendChild(div41);


                    var div42 = document.createElement("div");
                    div42.className = "d-flex full_100";

                        var div421 = document.createElement("div");
                        div421.className = "w-50 acre";
                        div421.innerHTML = '<span class="black"><b>Mahindra</b></span> - 2019 <br> YUVO 415 D, 45 HP</div>';
                        div42.appendChild(div421);

                        var div422 = document.createElement("div");
                        div422.className = "w-50 locat text-center";
                        div422.innerHTML= '<a href=""><button >Add on plans</button></a>  <span>Expiring in ' + allListings[i]["plan_days_remaining"] +'  days</span>';
                        div42.appendChild(div422);

                    div4.appendChild(div42);


                var div5 = document.createElement("div");
                div5.className = "s-red_bottom flex_table green_tector mt-2";


                    var div51 = document.createElement("div");
                    div51.className = "w-50 text-left";

                    var div511 = document.createElement("a");
                    div511.href = "javascript: refreshPage('#Dealer_priview_listing?ListingId=" + allListings[i].id + "');";
                    div511.innerHTML = '<i class="fas fa-pencil-alt top-0"></i>';
                    div511.className = "select_deleate";
                    div51.appendChild(div511);

                    var div512 = document.createElement("a");
                    div512.href = "javascript:deleteListing('" + allListings[i].id +"');";
                    div512.innerHTML = '<i class="fas fa-trash-alt  top-0"></i>';
                    div512.className = "select_deleate";
                    div51.appendChild(div512);
                    div5.appendChild(div51);

                

                    var div52 = document.createElement("div");
                    div52.className = "w-50 text-right";
                    div52.innerHTML = '<p><a class="color_green" href="">SUBMIT</a></p>';
                    div5.appendChild(div52);

                div4.appendChild(div5);
            
                }
        }
    }
}

function deleteListingApi(result){
    if(result != undefined && result['success']== true){
        var values = 
            {
                "_active": true,
                "category_id": 0,
                "listing_id": "",
                "plan_id": "",
                "user_id": ""
            }
        listListings(values);
    }
    else{
        alert(result['responseJSON']['message']);
    }

}