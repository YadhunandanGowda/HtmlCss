function getPathParameters(){
    var path = window.location.hash;
    var indexofParentCategoryId = path.indexOf("?");
    return path.substring(indexofParentCategoryId);
}

function getUrlParameter(sParam) {
    var hashdata = window.location.hash;
    var sPageURL = hashdata.substring(hashdata.indexOf("?") + 1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return "";
};