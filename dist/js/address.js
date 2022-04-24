function listAllAddressApi(result){
    if(result != undefined && result['response'].length != 0){
        var addressDataPrimary = result['response'].filter(function (n){
            return n.isPrimary == true;
        });
        var addressDataOthers = result['response'].filter(function (n){
            return n.isPrimary == false;
        });
        $("#primaryaddressid").empty();
        $("#otheraddressid").empty();
        if(addressDataPrimary.length > 0){
            var namediv = document.createElement("h4");
            namediv.innerHTML = addressDataPrimary[0]['name'];
            var addressdiv = document.createElement("p");
            addressdiv.innerHTML = addressDataPrimary[0]['houseNoStreet'] + ", <br />" +
            addressDataPrimary[0]['villageCity'] + ", " + '<a lang="en">'+ addressDataPrimary[0]['display_code_tehsil']+ "</a>, <br />"
            + '<a lang="en">'+ addressDataPrimary[0]['display_code_district'] + "</a>, " + '<a lang="en">'+ addressDataPrimary[0]['display_code_state'] + " </a> - " +
            addressDataPrimary[0]['pincode'] +  ", <br />" +
            '<a lang="en">'+ addressDataPrimary[0]['display_code_country'] + "</a>";

            var addressmaindiv = document.createElement("div");
            //addressmaindiv.id = addressDataPrimary[0]["id"];
            addressmaindiv.appendChild(namediv);
            addressmaindiv.appendChild(addressdiv);

            var anchrdiv = document.createElement("a");
            anchrdiv.innerHTML = '<button onclick="setSelectedAddress(this)" class="select_address" id="' + addressDataPrimary[0]['id'] 
            + '">Select this Address</button>';
            addressmaindiv.appendChild(anchrdiv);
            
            document.getElementById("primaryaddressid").appendChild(addressmaindiv);
        }

        if(addressDataOthers.length > 0){
            addressDataOthers.forEach(element => {
                var maindiv = document.createElement("div");
                maindiv.className = "col-md-6";
                maindiv.setAttribute('style',"width: 42%;");
                //maindiv.id = element['id'];
                var childmaindiv = document.createElement("div");
                childmaindiv.className = "contect_in";

                var namediv = document.createElement("h4");
                namediv.innerHTML = element['name'];
                var addressdiv = document.createElement("p");
                addressdiv.innerHTML = element['houseNoStreet'] + ", <br />" +
                element['villageCity'] + ", " + '<a lang="en">'+ element['display_code_tehsil']+ "</a>, <br />"
                + '<a lang="en">'+ element['display_code_district'] + "</a>, " + '<a lang="en">'+ element['display_code_state'] + " </a> - " +
                element['pincode'] +  ", <br />" +
                '<a lang="en">'+ element['display_code_country'] + "</a>";

                childmaindiv.appendChild(namediv);
                childmaindiv.appendChild(addressdiv);
                maindiv.appendChild(childmaindiv);

                var adddeletediv = document.createElement("div");
                adddeletediv.className = "d-flex";
                adddeletediv.innerHTML = '<a><button onclick="setSelectedAddress(this)" class="select_add_mul" id="' + element['id'] +
                '">Select this address</button></a>' +
                '<a class="select_edit" href=""><i class="fas fa-pencil-alt"></i></a><a class="select_deleate" href="">' +
                '<i class="fas fa-trash-alt"></i></a>'

                maindiv.appendChild(adddeletediv);

                document.getElementById("otheraddressid").appendChild(maindiv);
            });
        }
        if(getUrlParameter("ListingId") != ""){
            LoadListingaddress(getUrlParameter("ListingId"));
        }
        loadLanguages();
    }
    $('.loader').hide();
}

function setSelectedAddress(rr){
    //set other address as not selected
    $('.select_address').attr("class","select_add_mul");
    rr.className = 'select_address';
}

function LoadListingaddressApi(result){
    if(result != null && result['success'] == true && result['response']['address'] != null){
        var addressId = result['response']['address'];

        $('.select_address').attr("class","select_add_mul");
        var elem = document.getElementById(addressId);
        elem.className = "select_address";
    }
}

function AddNewAddress(inputdata){
    var useraddressdata = 
    {
        "country": inputdata["countryid"],
        "detectedLocation": "",
        "district": inputdata["districtid"],
        "email": inputdata["email"],
        "houseNoStreet": inputdata["address2"],
        "id": "",
        "isPrimary": false,
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
    UpdateAddressData(useraddressdata);
}