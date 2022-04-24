function AddPostFormData(data){
    if(data != null){
     create_post = data;
    }
    else{
     var hpid = $('#hpid').val();
     var brandid = $('#brandid').val();
     var modelid = $('#modelid').val();
     var tyreid = $('#tyreid').val();
     var yearofpurchaseid = $('#yearofpurchaseid').val();
     var Registrationid = $('#Registrationid').val();
     var expectedpriceid = $('#expectedpriceid').val();
     var Descriptionid = $('#Descriptionid').val();
     var RCAvailableid = $('input[name="RCAvailable"]:checked').val();
     var inputdata = {
         "M_HP":hpid,
         "M_Brand":brandid == undefined ? "": brandid,
         "M_Model":modelid,
         "M_Condition":tyreid,
         "M_YOP":yearofpurchaseid,
         "M_RegNo":Registrationid,
         "M_ExPrice":expectedpriceid,
         "description":Descriptionid,
         "M_RC":RCAvailableid == "1" ? true : false
     }
     create_post = inputdata;
     GetLocation();
    }
}

function LoadListingpostsApi(result){
    if(result != null && result['success'] == true){
        var mediaList = result['response'];
        var metadata = [];

        if(mediaList["metadata"] != null){
            mediaList["metadata"].forEach(element => {
                metadata[element["listKey"]["name"]] = element["listValue"];
            });
        }

        $('#Descriptionid').val(mediaList["description"]);
        $('#modelid').val(metadata["M_Model"]);
        $('#yearofpurchaseid').val(metadata["M_YOP"]);
        $('#Registrationid').val(metadata["M_RegNo"]);
        $('#tyreid').val(metadata["M_Condition"]);
        $('#hpid').val(metadata["M_HP"]);
        $('#expectedpriceid').val(metadata["M_ExPrice"]);
        if(metadata["M_RC"] == true) {
            $('#RCAvailableyesid').attr("checked","");
        }
        else{
            $('#RCAvailablenoid').attr("checked","");
        }
        //PM
        $('#motorphaseid').val(metadata["PM_MotorPhase"]);
        $('#maximumheadid').val(metadata["PM_MaximumHead"]);
        $('#maximumdischargeid').val(metadata["PM_MaximumDischarge"]);
        $('#outletid').val(metadata["PM_Outlet"]);
        $('#noofstagesid').val(metadata["PM_NoOfStages"]);
        $('#motorpowerid').val(metadata["PM_MotorPower"]);
        $('#Suitablediaid').val(metadata["PM_SuitableDia"]);
        $('#itemcodeid').val(metadata["PM_ItemCode"]);
        $('#warrantyid').val(metadata["PM_Warranty"]);
        $('#priceid').val(metadata["M_ExPrice"]);
        $('#impellerid').val(metadata["PM_Impeller"]);

        $('#noofcylindersid').val(metadata['M_NOCylinders']);
        $('#enginecapacityid').val(metadata['M_EngineCapacity']);
        $('#gearboxid').val(metadata['M_Gearbox']);
        $('#clutchid').val(metadata['M_Clutch']);
        $('#ERRid').val(metadata['M_EngineRatedRPM']);
        $('#brakesid').val(metadata['M_Brakes']);
        $('#fueltankcapid').val(metadata['M_FuelTankCapacity']);
        $('#graintankid').val(metadata['M_GrainTankCapacity']);
        $('#CBW_WPWid').val(metadata['M_CBW_WPW']);
        $('#CBW_MSOid').val(metadata['M_CBW_MSO']);
        $('#paddywheatid').val(metadata['M_PaddyWheat']);
        $('#LWTid').val(metadata['M_LWT']);
        $('#LWid').val(metadata['M_LW']);
        $('#TOHid').val(metadata['M_TOH']);

        $('#liftingcapacityid').val(metadata['M_LiftingCapacity']);
        $('#wheeldriveid').val(metadata['M_WheelDrive']);
        $('#ptohpid').val(metadata['M_PTOHP']);
        $('#ptolinkageid').val(metadata['M_PTOLinkage']);
        $('#cuttingbarwidthid').val(metadata['M_CuttingBarWidth']);
        $('#overalllengthid').val(metadata['M_OverallLength']);
        $('#overallwidthid').val(metadata['M_OverallWidth']);
        $('#cuttingcapacityid').val(metadata['M_CuttingCapacity']);

        $('#baletypeid').val(metadata['M_BaleType']);
        $('#balesizeid').val(metadata['M_BaleSize']);
        $('#baleweightid').val(metadata['M_BaleWeight']);
        $('#balingcapalityid').val(metadata['M_BalingCapacity']);
        $('#twinenetid').val(metadata['M_TwineNet']);
        $('#ptorpmid').val(metadata['M_PTORPM']);
        $('#requiredpowewrid').val(metadata['M_ReqPower']); 
        $('#categoryid').val(metadata['M_Category']);
        $('#typeofimplementsid').val(metadata['M_TypeOfImplements']);
        $('#typeofcropid').val(metadata['M_TOCrop']);           

        create_post["address"] = mediaList['address'];
        create_post["description"] =mediaList["description"];
        if((metadata["M_Brand"] != null) && (metadata["M_Brand"] != "")){
            create_post["M_Brand"] =metadata["M_Brand"];
        }
        if((metadata["M_Model"] != null) && (metadata["M_Model"] != "")){
            create_post["M_Model"] =metadata["M_Model"];
        }
        if((metadata["M_YOP"] != null) && (metadata["M_YOP"] != "")){
            create_post["M_YOP"] =metadata["M_YOP"];
        }
        if((metadata["M_YOM"] != null) && (metadata["M_YOM"] != "")){
            create_post["M_YOM"] =metadata["M_YOM"];
        }
        if((metadata["M_RegNo"] != null) && (metadata["M_RegNo"] != "")){
            create_post["M_RegNo"] =metadata["M_RegNo"];
        }
        if((metadata["M_Type_Harvester"] != null) && (metadata["M_Type_Harvester"] != "")){
            create_post["M_Type_Harvester"] =metadata["M_Type_Harvester"];
        }
        if((metadata["M_ExPrice"] != null) && (metadata["M_ExPrice"] != "")){
            create_post["M_ExPrice"] =metadata["M_ExPrice"];
        }
        if((metadata["M_Condition"] != null) && (metadata["M_Condition"] != "")){
            create_post["M_Condition"] =metadata["M_Condition"];
        }
        if((metadata["M_RC"] != null) && (metadata["M_RC"] != "")){
            create_post["M_RC"] =metadata["M_RC"];
        }
        if((metadata["M_HP"] != null) && (metadata["M_HP"] != "")){
            create_post["M_HP"] =metadata["M_HP"];
        }
        if((metadata["M_TOCrop"] != null) && (metadata["M_TOCrop"] != "")){
            create_post["M_TOCrop"] =metadata["M_TOCrop"];
        }

        if((metadata["PM_MotorPhase"] != null) && (metadata["PM_MotorPhase"] != "")){
            create_post["PM_MotorPhase"] =metadata["PM_MotorPhase"];
        }
        if((metadata["PM_MaximumHead"] != null) && (metadata["PM_MaximumHead"] != "")){
            create_post["PM_MaximumHead"] =metadata["PM_MaximumHead"];
        }
        if((metadata["PM_MaximumDischarge"] != null) && (metadata["PM_MaximumDischarge"] != "")){
            create_post["PM_MaximumDischarge"] =metadata["PM_MaximumDischarge"];
        }
        if((metadata["PM_Outlet"] != null) && (metadata["PM_Outlet"] != "")){
            create_post["PM_Outlet"] =metadata["MPM_Outlet_HP"];
        }
        if((metadata["PM_NoOfStages"] != null) && (metadata["PM_NoOfStages"] != "")){
            create_post["PM_NoOfStages"] =metadata["PM_NoOfStages"];
        }
        if((metadata["PM_MotorPower"] != null) && (metadata["PM_MotorPower"] != "")){
            create_post["PM_MotorPower"] =metadata["PM_MotorPower"];
        }
        if((metadata["PM_SuitableDia"] != null) && (metadata["PM_SuitableDia"] != "")){
            create_post["PM_SuitableDia"] =metadata["PM_SuitableDia"];
        }
        if((metadata["PM_ItemCode"] != null) && (metadata["PM_ItemCode"] != "")){
            create_post["PM_ItemCode"] =metadata["PM_ItemCode"];
        }
        if((metadata["PM_Warranty"] != null) && (metadata["PM_Warranty"] != "")){
            create_post["PM_Warranty"] =metadata["PM_Warranty"];
        }
        if((metadata["PM_Impeller"] != null) && (metadata["PM_Impeller"] != "")){
            create_post["PM_Impeller"] =metadata["PM_Impeller"];
        }

        if((metadata["M_TOH"] != null) && (metadata["M_TOH"] != "")){
            create_post["M_TOH"] =metadata["M_TOH"];
        }
        if((metadata["M_NOCylinders"] != null) && (metadata["M_NOCylinders"] != "")){
            create_post["M_NOCylinders"] =metadata["M_NOCylinders"];
        }
        if((metadata["M_EngineCapacity"] != null) && (metadata["M_EngineCapacity"] != "")){
            create_post["M_EngineCapacity"] =metadata["M_EngineCapacity"];
        }
        if((metadata["M_Gearbox"] != null) && (metadata["M_Gearbox"] != "")){
            create_post["M_Gearbox"] =metadata["M_Gearbox"];
        }
        if((metadata["M_Clutch"] != null) && (metadata["M_Clutch"] != "")){
            create_post["M_Clutch"] =metadata["M_Clutch"];
        }
        if((metadata["M_EngineRatedRPM"] != null) && (metadata["M_EngineRatedRPM"] != "")){
            create_post["M_EngineRatedRPM"] =metadata["M_EngineRatedRPM"];
        }
        if((metadata["M_Brakes"] != null) && (metadata["M_Brakes"] != "")){
            create_post["M_Brakes"] =metadata["M_Brakes"];
        }
        if((metadata["M_FuelTankCapacity"] != null) && (metadata["M_FuelTankCapacity"] != "")){
            create_post["M_FuelTankCapacity"] =metadata["M_FuelTankCapacity"];
        }
        if((metadata["M_GrainTankCapacity"] != null) && (metadata["M_GrainTankCapacity"] != "")){
            create_post["M_GrainTankCapacity"] =metadata["M_GrainTankCapacity"];
        }
        if((metadata["M_CBW_WPW"] != null) && (metadata["M_CBW_WPW"] != "")){
            create_post["M_CBW_WPW"] =metadata["M_CBW_WPW"];
        }
        if((metadata["M_CBW_MSO"] != null) && (metadata["M_CBW_MSO"] != "")){
            create_post["M_CBW_MSO"] =metadata["M_CBW_MSO"];
        }
        if((metadata["M_PaddyWheat"] != null) && (metadata["M_PaddyWheat"] != "")){
            create_post["M_PaddyWheat"] =metadata["M_PaddyWheat"];
        }
        if((metadata["M_LWT"] != null) && (metadata["M_LWT"] != "")){
            create_post["M_LWT"] =metadata["M_LWT"];
        }
        if((metadata["M_LW"] != null) && (metadata["M_LW"] != "")){
            create_post["M_LW"] =metadata["M_LW"];
        }
        if((metadata["M_LiftingCapacity"] != null) && (metadata["M_LiftingCapacity"] != "")){
            create_post["M_LiftingCapacity"] =metadata["M_LiftingCapacity"];
        }
        if((metadata["M_WheelDrive"] != null) && (metadata["M_WheelDrive"] != "")){
            create_post["M_WheelDrive"] =metadata["M_WheelDrive"];
        }
        if((metadata["M_PTOHP"] != null) && (metadata["M_PTOHP"] != "")){
            create_post["M_PTOHP"] =metadata["M_PTOHP"];
        }
        if((metadata["M_PTOLinkage"] != null) && (metadata["M_PTOLinkage"] != "")){
            create_post["M_PTOLinkage"] =metadata["M_PTOLinkage"];
        }

        if((metadata["M_CuttingBarWidth"] != null) && (metadata["M_CuttingBarWidth"] != "")){
            create_post["M_CuttingBarWidth"] =metadata["M_CuttingBarWidth"];
        }
        if((metadata["M_OverallLength"] != null) && (metadata["M_OverallLength"] != "")){
            create_post["M_OverallLength"] =metadata["M_OverallLength"];
        }
        if((metadata["M_OverallWidth"] != null) && (metadata["M_OverallWidth"] != "")){
            create_post["M_OverallWidth"] =metadata["M_OverallWidth"];
        }
        if((metadata["M_CuttingCapacity"] != null) && (metadata["M_CuttingCapacity"] != "")){
            create_post["M_CuttingCapacity"] =metadata["M_CuttingCapacity"];
        }

        if((metadata["M_BaleType"] != null) && (metadata["M_BaleType"] != "")){
            create_post["M_BaleType"] =metadata["M_BaleType"];
        }
        if((metadata["M_BaleSize"] != null) && (metadata["M_BaleSize"] != "")){
            create_post["M_BaleSize"] =metadata["M_BaleSize"];
        }
        if((metadata["M_BaleWeight"] != null) && (metadata["M_BaleWeight"] != "")){
            create_post["M_BaleWeight"] =metadata["M_BaleWeight"];
        }
        if((metadata["M_BalingCapacity"] != null) && (metadata["M_BalingCapacity"] != "")){
            create_post["M_BalingCapacity"] =metadata["M_BalingCapacity"];
        }
        if((metadata["M_TwineNet"] != null) && (metadata["M_TwineNet"] != "")){
            create_post["M_TwineNet"] =metadata["M_TwineNet"];
        }
        if((metadata["M_PTORPM"] != null) && (metadata["M_PTORPM"] != "")){
            create_post["M_PTORPM"] =metadata["M_PTORPM"];
        }
        if((metadata["M_ReqPower"] != null) && (metadata["M_ReqPower"] != "")){
            create_post["M_ReqPower"] =metadata["M_ReqPower"];
        }
        if((metadata["M_Category"] != null) && (metadata["M_Category"] != "")){
            create_post["M_Category"] =metadata["M_Category"];
        }
        if((metadata["M_TypeOfImplements"] != null) && (metadata["M_TypeOfImplements"] != "")){
            create_post["M_TypeOfImplements"] =metadata["M_TypeOfImplements"];
        }
    }
}

function AddPostData(addressid){
    //create the metadata

    var metadataobj = [];
    Object.keys(create_post).forEach(function(key) {
        if(key != "address" && key != "description" && key != "location"){
            var metadataobj1 = [];
            obj =  {
                "listKey": {
                    "name": key
                  },
                "listValue": create_post[key]
                }
            metadataobj.push(obj);
            
        }
      });

    create_post["address"] = addressid;
    
    var listdata =
    {
        "address": addressid,
        "categoryId": getUrlParameter('ParentCategoryId'),
        "description": create_post["description"],
        "id": getUrlParameter("ListingId"),
        "isActive": true,
        "location": "",
        "mediaAccessList": [
            {
            }
          ],
        "message_for_the_update": "",
        "metadata": metadataobj,
        "price": create_post["M_ExPrice"] ? create_post["M_ExPrice"] : 0,
        "title": "",
        "userPlanId": getUrlParameter('UserPlanId')
    }
    SaveListings(listdata);
}
function GetLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    create_post["location"]  = position.coords.latitude + "," + position.coords.longitude;
}

function getdetailnames(id){
    if(id == "M_Brand"){
        return "Brand";
    }
    else if(id == "M_Model"){
        return "Model";
    }
    else if(id == "M_YOM"){
        return "Year Of Manufacturer";
    }
    else if(id == "M_YOP"){
        return "Year Of Purchase";
    }
    else if(id == "M_RegNo"){
        return "Registration Number";
    }
    else if(id == "M_Type_Harvester"){
        return "Type Of Harvester";
    }
    else if(id == "M_ExPrice"){
        return "Expected Price";
    }
    else if(id == "M_RC"){
        return "RC Available";
    }
    else if(id == "M_HP"){
        return "Required HP";
    }
    else if(id == "description"){
        return "Description";
    }
    else if(id == "M_Condition"){
        return "Tyre Condition";
    }
    else if(id == "PM_MotorPhase"){
        return "Motor Phase";
    }
    else if(id == "PM_MaximumHead"){
        return "Maximum Head";
    }
    else if(id == "PM_MaximumDischarge"){
        return "Maximum Discharge";
    }
    else if(id == "PM_Outlet"){
        return "Outlet";
    }
    else if(id == "PM_NoOfStages"){
        return "No Of Stages";
    }
    else if(id == "PM_MotorPower"){
        return "Motor Power";
    }
    else if(id == "PM_SuitableDia"){
        return "Suitable For (Dia)";
    }
    else if(id == "PM_ItemCode"){
        return "Item Code";
    }
    else if(id == "PM_Warranty"){
        return "Warranty";
    }
    else if(id == "PM_Impeller"){
        return "Impeller Material";
    }
    return id;
}