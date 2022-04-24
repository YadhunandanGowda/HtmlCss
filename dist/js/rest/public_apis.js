function callRest(api, callback){
    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: API_PUBLIC_HOST + api,
        success: callback,
        error: callback 
     });
}
function callPostRest(api, values, callback){
    $.ajax({ 
        type: "POST",
        dataType: "json",
        data: JSON.stringify(values),
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: API_PUBLIC_HOST + api,
        success: callback,
        error: callback 
     });
}

function loadLanguages(){ callRest("/lookup/language", loadLanguagesApi);}
function loadAccess(){ callRest("/lookup/access", loadAccessProfiles);}
function loadPlanLists(values){ callPostRest("/plan/list",values, loadPlanListsApi);}
function loadPlanListsUpgrade(values){ callPostRest("/plan/list",values, loadPlanListsUpgradeApi);}
function loadCategorys(){ callRest("/lookup/category", loadCategoryLists);}
function listCountry(){ callRest("/lookup/location?type=COUNTRY", listCountryApi);}
function listStates(id){ callRest("/lookup/location?query=" + id + "&type=STATE", listStatesApi);}
function listDistrict(id){ callRest("/lookup/location?query=" + id + "&type=DISTRICT", listDistrictApi);}
function listTehsil(id){ callRest("/lookup/location?query=" + id + "&type=TEHSIL", listTehsilApi);}
function listBrands(group){ callRest("/lookup/brands?group=" + group , listBrandsApi);}
function listCategoryTree(categoryId){ callRest("/lookup/getCategoryTree?categoryId=" + categoryId , listCategoryTreeApi);}
function ViewBrandDetails(brandId){ callRest("/lookup/viewBrand?brandId=" + brandId , ViewBrandDetailsApi);}
