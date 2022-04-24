function getPageForCategory(categoryId){
    if((categoryId >= 20 && categoryId <= 22)||(categoryId >= 59 && categoryId <= 61)){
        return "Balers";
    }
    else if(categoryId >= 4 && categoryId <= 14)
    {
        return "harvester";
    }
    else if(categoryId >= 43 && categoryId <= 53)
    {
        return "harvester_traders";
    }
    else if((categoryId >= 16 && categoryId <= 18)||(categoryId >= 55 && categoryId <= 57))
    {
        return "reaper";
    }
    else if((categoryId >= 24 && categoryId <= 39)||(categoryId >= 63 && categoryId <= 78))
    {
        return "FI";
    }
    else if(categoryId == 2)
    {
        return "tractor";
    }
    else if(categoryId == 41)
    {
        return "tractor_trader";
    }
    else if((categoryId >= 81 && categoryId <= 85) || (categoryId >= 87 && categoryId <= 90)
    || (categoryId >= 92 && categoryId <= 96))
    {
        return "tyre";
    }
    else if((categoryId >= 115 && categoryId <= 117) || (categoryId >= 119 && categoryId <= 121)
    || (categoryId >= 123 && categoryId <= 124))
    {
        return "property";
    }
    else if(categoryId < 40){
        return categoryId;
    }
    else if(categoryId > 182 && categoryId < 188)
    {
        return "horse";
    }
    else if(categoryId >= 107 && categoryId <= 112)
    {
        return "crop";
    }
    else if(categoryId == 101)
    {
        return "horse";
    }
    else if(categoryId == 125)
    {
        return "fruits_veg";
    }
    else if(categoryId == 105)
    {
        return "dog";
    }
    else if(categoryId == 98)
    {
        return "cow";
    }
    else if(categoryId == 99)
    {
        return "ox";
    }
    else if((categoryId >= 128 && categoryId <= 130) || (categoryId >= 132 && categoryId <= 134)
    || (categoryId >= 136 && categoryId <= 138)){
        return "pumpmotor";
    }
    else if((categoryId > 141 && categoryId < 149) || (categoryId >= 151 && categoryId <= 160)
    || (categoryId >= 162 && categoryId <= 165)){
        return "livestock_feed";
    }
    else if(categoryId > 171 && categoryId < 174){
        return "biomass_trader";
    }
    else if(categoryId > 176 && categoryId < 181){
        return "silage";
    }
    else if(categoryId == 100)
    {
        return "buffalo";
    }
    else if(categoryId == 167)
    {
        return "PFS";
    }
    else if(categoryId == 168)
    {
        return "milk_diary";
    }
    else if(categoryId == 169)
    {
        return "milk_plant";
    }
    else if(categoryId == 103)
    {
        return "goat";
    }
    else if(categoryId == 104)
    {
        return "sheep";
    }
    else if(categoryId == 102)
    {
        return "camel";
    }
    else{
        return "general";
    }
}

function checkboxStatusChange() {
    var multiselect = document.getElementById("mySelectLabel");
    var multiselectOption = multiselect.getElementsByTagName('option')[0];
  
    var values = [];
    var checkboxes = document.getElementById("mySelectOptions");
    var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
  
    for (const item of checkedCheckboxes) {
      var checkboxValue = item.getAttribute('value');
      values.push(checkboxValue);
    }
  
    var dropdownValue = "Nothing is selected";
    if (values.length > 0) {
      dropdownValue = values.join(', ');
    }
  
    multiselectOption.innerText = dropdownValue;
  }
  
  function toggleCheckboxArea(onlyHide = false) {
    var checkboxes = document.getElementById("mySelectOptions");
    var displayValue = checkboxes.style.display;
  
    if (displayValue != "block") {
      if (onlyHide == false) {
        checkboxes.style.display = "block";
      }
    } else {
      checkboxes.style.display = "none";
    }
  }