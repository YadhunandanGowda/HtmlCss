
let weeks = { week1: [], week2: [], week3: [], week4: [], week5: [], week6: [] };
let selectedMonth ;
let selectedYear ;

//calendar creation function
function createCalendar(month, year) {
    $("table.calendar-sec").empty()
    selectedMonth = month;
    selectedYear = year;
    weeks["week1"] = []; weeks["week2"] = []; weeks["week3"] = []; weeks["week4"] = []; weeks["week5"] = []; weeks["week6"] = [];
    let inc = 1;
    let week;
    let lastDayoftheMonth = new Date(year, month+1, 0);
    for (i = 1; i <= lastDayoftheMonth.getUTCDate() + 1; i++) {
        let date = new Date(year, +month, i);
        if (date.getUTCDay() == 6) {
            if (date.getDate() != 1 && date.getUTCDay() == 6) {
                inc = inc + 1;
                week = "week" + inc;
            } else {
                week = "week" + inc;
            }
        } else {
            week = "week" + inc;
        }
        weeks[week].push(date);
    }
    let header = $("<thead>");
    header.append("<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>");
    let parent = $("<tbody>");
    
    for (i = 1; i <= 6; i++) {
        let child = $("<tr>");
        if (i == 1) {
            if (weeks["week" + i].length != 7) {
                for (c = 1; c <= (7 - weeks["week" + i].length); c++) {
                    child.append("<td></td>");
                }
            }
        }
        for (j = 0; j < weeks["week" + i].length; j++) {
            child.append("<td><p>" + weeks["week" + i][j].getDate() + "</p></td>");
        }

        if (i == 5) {
            if ((weeks["week" + i].length != 7 && weeks["week" + i].length != 0)) {
                for (c = 1; c <= (7 - weeks["week" + i].length); c++) {
                    child.append("<td></td>");
                }
            }
        }
        if (i == 6) {
            if ((weeks["week" + i].length != 7 && weeks["week" + i].length != 0)) {
                for (c = 1; c <= (7 - weeks["week" + i].length); c++) {
                    child.append("<td></td>");
                }
            }
        }
        if(weeks["week" + i].length !=0) {
            parent.append(child);
        }
    }

    $("table.calendar-sec").append(header);
    $("table.calendar-sec").append(parent);

    let sel;
    switch (month) {
        case 0 : {
            sel = "Jan " + year;
            break;
        }
        case 1 : {
            sel = "Feb " + year;
            break;
        }
        case 2 : {
            sel = "Mar " + year;
            break;
        }
        case 3 : {
            sel = "Apr " + year;
            break;
        }
        case 4 : {
            sel = "May " + year;
            break;
        }
        case 5 : {
            sel = "Jun " + year;
            break;
        }
        case 6 : {
            sel = "Jul " + year;
            break;
        }
        case 7 : {
            sel = "Aug " + year;
            break;
        }
        case 8 : {
            sel = "Sep " + year;
            break;
        }
        case 9 : {
            sel = "Oct " + year;
            break;
        }
        case 10 : {
            sel = "Nov " + year;
            break;
        }
        case 11 : {
            sel = "Dec " + year;
            break;
        }
    }

    $(".selector p.year-month").text(sel);
};

//on ready function
$(document).on("ready", function(){
    let date = new Date();
    createCalendar( date.getMonth(), date.getFullYear());
})


//next function
$(document).on("click", ".selector .next", function(){
    if(+selectedMonth == 11) {
        selectedYear = +selectedYear + 1;
        selectedMonth = 0;
    }else {
        selectedMonth++;
    }
    createCalendar( selectedMonth, selectedYear);
})


//prev function
$(document).on("click", ".selector .prev", function(){
    if(+selectedMonth == 0) {
        selectedYear = +selectedYear - 1;
        selectedMonth = 11;
    }else {
        selectedMonth--;
    }
    createCalendar( selectedMonth, selectedYear);
})