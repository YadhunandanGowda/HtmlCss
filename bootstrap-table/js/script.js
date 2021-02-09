$(document).ready(function () {

    // header js code starts

    $('#app-logo').on('click', function () {
        $(this).hide('slow');
        $(this).siblings('.options').show('slow');
    })

    $('header .options .profile-pic .outer-pp').on('click', function () {
        $(this).siblings('.logout-popup').fadeToggle();
        $(this).parents('.profile-pic').toggleClass('active');
    })

    $('header .options .profile-pic .logout-popup .cls-btn').on('click', function () {
        $(this).parents('.profile-pic').removeClass('active');
        $(this).parents('.logout-popup').fadeOut();
    })


    $(document).mouseup(function (e) {
        var container = $("header .options .profile-pic .logout-popup");
        if (!$('header .options .profile-pic img').is(e.target) && !$('header .options .profile-pic').is(e.target) && !container.is(e.target) && container.has(e.target).length === 0) {
            container.parents('.profile-pic').removeClass('active');
            container.fadeOut();
        }
    });


    // header js code ends 

    // Resources Search Page JS Starts

    // date picker code

    $('.resource-search-landing .datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('.datepicker').on('changeDate', function (ev) {
        $(this).datepicker('hide');
    });

    //Form Submit code

    $('.resource-search-landing .submit').on('click', function () {

        $('.validate-error').html('');
        var formValidationStatus = 0;
        if ($('#primary-skill').val() == null) {
            formValidationStatus = 1;
            $('#primary-skill').siblings('.validate-error').html("Please enter Primary Skill");
        }

        if ($('#secondary-skill').val() == null) {
            formValidationStatus = 1;
            $('#secondary-skill').siblings('.validate-error').html("Please enter Secondary Skill");
        }

        if (formValidationStatus == 0) {
            return false
        } else {
            // submit the form
        }
    });

    $('.resource-search-landing .form-cls-btn ').on('click', function () {
        $(this).toggleClass('show');
        $('.resource-search-landing .form-blk').toggleClass('show');
        $('.validate-error').html('');
    })

    //multiselect and autosearch initialization

    $(".resource-search-landing #primary-skill, .resource-search-landing #secondary-skill").chosen({
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!"
    });

    //resource page table initialization

    $('.resource-search-landing #resource-search-table').bootstrapTable({
        pagination: true,
        showColumns: true,
        showColumnsToggleAll: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    //selectpicker dropdown hide

    $('.selectpicker').on('changed.bs.select', function () {
        if ($(this).siblings('.dropdown-menu').hasClass('show')) {
            $(this).siblings('.dropdown-menu').removeClass('show')
        }
    })
    // Resources Search Page JS Ends




    // Open requisition Page JS Starts

    //Table initialization

    $('.open-requisition-landing #tech-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.open-requisition-landing #bu-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.open-requisition-landing #requisition-view').bootstrapTable({
        pagination: true,
        sortable: true,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    //nav tab click and active

    $('.open-requisition-landing .navbar ul.navbar-nav li').on('click', function () {
        if ($(this).attr('data-name') != 'requisition-view') {
            $(this).parents('ul.nav').children('li').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            })
            $(this).addClass('active');
            $('.open-requisition-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.open-requisition-landing .tbl-cntr').find('#' + $(this).attr('data-name')).parents('.individual-tbl').addClass('active');
        }
    })

    // on click req number go to req view

    $('.open-requisition-landing #tech-stack, .open-requisition-landing #bu-stack ').on('click', 'td', function (row, $el, field) {
        if (row.currentTarget.className == 'req-no') {
            // alert($(row.currentTarget).find('a').text())


            $('.open-requisition-landing .navbar ul.navbar-nav li').each(function (index, item) {

                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
                if ($(item).attr('data-name') == 'requisition-view') {
                    $(item).addClass('active');
                }
            })

            $('.open-requisition-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.open-requisition-landing .tbl-cntr').find('#requisition-view').parents('.individual-tbl').addClass('active');

            $('html, body').animate({ scrollTop: 0 }, 0);
        }

    })

    // Open requisition Page JS Ends


    // Close requisition Page JS Starts

    //Table initialization

    $('.close-requisition-landing #tech-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.close-requisition-landing #bu-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.close-requisition-landing #requisition-view').bootstrapTable({
        pagination: true,
        sortable: true,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });


    // date picker code

    $('.close-requisition-landing .datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });

    //nav tab click and active

    $('.close-requisition-landing .navbar ul.navbar-nav li').on('click', function () {
        if ($(this).attr('data-name') != 'requisition-view') {
            $(this).parents('ul.nav').children('li').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            })
            $(this).addClass('active');
            $('.close-requisition-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.close-requisition-landing .tbl-cntr').find('#' + $(this).attr('data-name')).parents('.individual-tbl').addClass('active');
        }
    })

    // on click req number go to req view


    $('.close-requisition-landing #tech-stack, .close-requisition-landing #bu-stack').on('click', 'td', function (row, $el, field) {
        if (row.currentTarget.className == 'req-no') {
            // alert($(row.currentTarget).find('a').text())


            $('.close-requisition-landing .navbar ul.navbar-nav li').each(function (index, item) {

                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
                if ($(item).attr('data-name') == 'requisition-view') {
                    $(item).addClass('active');
                }
            })

            $('.close-requisition-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.close-requisition-landing .tbl-cntr').find('#requisition-view').parents('.individual-tbl').addClass('active');

            $('html, body').animate({ scrollTop: 0 }, 0);
        }

    })

    // Close requisition Page JS Ends


    // Code details Page JS Starts

    $('.code-details-landing .options ul li a').on('click', function () {
        let current = $(this).parent('li');
        $(this).parents('ul').children('li').each(function (index, item) {
            if ($(item).hasClass('active')) {
                $(item).removeClass('active');
            }
        });
        $(this).parent('li').addClass('active');

        $('.code-details-landing .details-section .child-details').each(function (index, item) {
            if ($(item).hasClass('active')) {
                $(item).removeClass('active');
            }

            if ($(item).attr('data-name') == $(current).attr('data-name')) {
                $(item).addClass('active');
            }
        });
    })

    $('.code-details-landing .search-result-section #search-result-table').bootstrapTable({
        pagination: true,
        sortable: true,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.code-details-landing .search-result-section .navbar ul.navbar-nav li').on('click', function () {
        $(this).parents('ul.nav').children('li').each(function (index, item) {
            if ($(item).hasClass('active')) {
                $(item).removeClass('active');
            }
        })
        $(this).addClass('active');
    })



    $(".code-details-landing .details-section .search-result-section .tbl-cntr table tbody tr td input").on('change', function () {
        if (this.checked) {
            if (!$('.code-details-landing .details-section .search-result-section .sbmt-btns').hasClass('show')) {
                $('.code-details-landing .details-section .search-result-section .sbmt-btns').addClass('show');
                $('.code-details-landing .details-section .search-result-section .sbmt-btns').find('button').each(function (index, item) {
                    $(item).attr('disabled', false);
                })
            }
        } else {
            let noneChecked = 0;
            $(this).parents('tbody').find('input').each(function (index, item) {
                if (item.checked) {
                    noneChecked = 1;
                }
            })
            if (noneChecked == 0) {
                $('.code-details-landing .details-section .search-result-section .sbmt-btns').removeClass('show');
                $('.code-details-landing .details-section .search-result-section .sbmt-btns').find('button').each(function (index, item) {
                    $(item).attr('disabled', true);
                })
            }
        }
    });
    

    $('.code-details-landing .details-section .proposed-resources-section .tbl-cntr #proposed-resource-table').bootstrapTable({
        pagination: true,
        sortable: true,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.code-details-landing .details-section .proposed-resources-section .tbl-cntr tbody td span.edit').on('click', function () {
        $(this).hide(slow);
        $(this).siblings('.update, .cancel').show(slow);
        $(this).parents('td').animate({ 'min-width': '105px' }, 300);
        $(this).parents('tr').find('select, textarea').each(function (index, item) {
            $(item).attr('disabled', false);
        })
    })


    $('.code-details-landing .details-section .proposed-resources-section .tbl-cntr tbody td span.update').on('click', function () {
        $(this).hide(slow);
        $(this).siblings('.edit').show(slow);
        $(this).siblings('.cancel').hide(slow);
        $(this).parents('td').animate({ 'min-width': '80px' }, 300);
        $(this).parents('tr').find('select, textarea').each(function (index, item) {
            $(item).attr('disabled', true);
        })
    })

    $('.code-details-landing .details-section .proposed-resources-section .tbl-cntr tbody td span.cancel').on('click', function () {
        $(this).hide(slow);
        $(this).siblings('.edit').show(slow);
        $(this).siblings('.update').hide(slow);
        $(this).parents('td').animate({ 'min-width': '80px' }, 300);
        $(this).parents('tr').find('select, textarea').each(function (index, item) {
            $(item).attr('disabled', true);
        })
    })


    // Code details Page JS Ends


    // Proposed Resources Page JS Starts

    $('.proposed-resources-landing .tbl-cntr #proposed-resource-table').bootstrapTable({
        pagination: true,
        sortable: false,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    // $(".proposed-resources-landing .tbl-cntr table tbody tr td input").on('change', function () {
    //     if (this.checked) {
    //         if (!$('.proposed-resources-landing .sbmt-btns').hasClass('show')) {
    //             $('.proposed-resources-landing .sbmt-btns').addClass('show');
    //         }
    //     } else {
    //         let noneChecked = 0;
    //         $(this).parents('tbody').find('input').each(function (index, item) {
    //             if (item.checked) {
    //                 noneChecked = 1;
    //             }
    //         })
    //         if (noneChecked == 0) {
    //             $('.proposed-resources-landing .sbmt-btns').removeClass('show');
    //         }
    //     }
    // });

    // $('.proposed-resources-landing .tbl-cntr #proposed-resource-table tbody tr').on('swiperight', function () {
    //     if ($(window).width() < 900) {
    //         if ($(this).hasClass('right-swipe')) {
    //             $(this).removeClass('right-swipe');
    //             return false;
    //         }
    //         // $('.proposed-resources-landing .tbl-cntr tbody td span.accept').css('height', $(this).height());
    //         $(this).addClass('left-swipe');
    //     }
    // });

    // $('.proposed-resources-landing .tbl-cntr #proposed-resource-table tbody tr').on('swipeleft', function () {
    //     if ($(window).width() < 900) {
    //         if ($(this).hasClass('left-swipe')) {
    //             $(this).removeClass('left-swipe');
    //             return false;
    //         }
    //         // $('.proposed-resources-landing .tbl-cntr tbody td span.reject').css('height', $(this).height());
    //         $(this).addClass('right-swipe');
    //     }
    // });

    function proposedResourcesRowEdit() {
        $('.proposed-resources-landing .tbl-cntr tbody td span.edit').on('click', function () {
            $(this).hide(300);
            $(this).siblings('.update, .cancel').show(300);
            $(this).parents('td').animate({ 'min-width': '105px' }, 300);
            $(this).parents('tr').find('select, textarea').each(function (index, item) {
                $(item).attr('disabled', false);
            })
        })
    }


    function proposedResourcesRowUpdate(){
        $('.proposed-resources-landing .tbl-cntr tbody td span.update').on('click', function () {
            $(this).hide();
            $(this).siblings('.edit').show();
            $(this).siblings('.cancel').hide();
            $(this).parents('td').animate({ 'min-width': '80px' }, 300);
            $(this).parents('tr').find('select, textarea').each(function (index, item) {
                $(item).attr('disabled', true);
            })
        })

    }

    function proposedResourcesRowCancel() {
        $('.proposed-resources-landing .tbl-cntr tbody td span.cancel').on('click', function () {
            $(this).hide();
            $(this).siblings('.edit').show();
            $(this).siblings('.update').hide();
            $(this).parents('td').animate({ 'min-width': '80px' }, 300);
            $(this).parents('tr').find('select, textarea').each(function (index, item) {
                $(item).attr('disabled', true);
            })
        })

    }

    proposedResourcesRowEdit();
    proposedResourcesRowUpdate();
    proposedResourcesRowCancel();

    
    $('.proposed-resources-landing .tbl-cntr #proposed-resource-table').on('column-switch.bs.table', function(a,b) {
        proposedResourcesRowEdit();
        proposedResourcesRowUpdate();
        proposedResourcesRowCancel();
    });
    // Proposed Resources Page JS Ends


    // View joiners pipeline JS Starts

    let months = []

    function getDaysInMonth(year, mon, m) {
        let month = [];
        let week = 1;
        let days = [];
        let monthNum = 0 + m;
        let thisMonth = '';


        switch (mon) {
            case 0: thisMonth = "January";
                break;
            case 1: thisMonth = "February";
                break;
            case 2: thisMonth = "March";
                break;
            case 3: thisMonth = "April";
                break;
            case 4: thisMonth = "May";
                break;
            case 5: thisMonth = "June";
                break;
            case 6: thisMonth = "July";
                break;
            case 7: thisMonth = "August";
                break;
            case 8: thisMonth = "September";
                break;
            case 9: thisMonth = "October";
                break;
            case 10: thisMonth = "November";
                break;
            case 11: thisMonth = "December";
                break;
        }

        let date = new Date(Date.UTC(year, mon));

        while (date.getMonth() === mon) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        month["week" + week] = []
        months['month' + monthNum] = []
        for (i = 0; i < days.length; i++) {

            if (days[i].getUTCDay() > 0 && days[i].getUTCDay() < 6) {

                let weekday = '';
                switch (days[i].getUTCDay()) {
                    case 0:
                        weekday = "Sun";
                        break;
                    case 1:
                        weekday = "Mon";
                        break;
                    case 2:
                        weekday = "Tue";
                        break;
                    case 3:
                        weekday = "Wed";
                        break;
                    case 4:
                        weekday = "Thu";
                        break;
                    case 5:
                        weekday = "Fri";
                        break;
                    case 6:
                        weekday = "Sat";
                }

                month["week" + week].push({
                    "date": days[i].getUTCDate(),
                    "week": weekday,
                    "month": days[i].getUTCMonth() + 1,
                    "year": days[i].getUTCFullYear()
                })
            }
            if (days[i].getUTCDay() == 0 && i > 1 && i < days.length - 1) {
                week = week + 1;
                month["week" + week] = []
            }
            months['month' + monthNum] = { 'month': thisMonth + ' ' + year, 'info': month };
        }

    }

    function getMonths() {
        for (let i = 0; i < 3; i++) {

            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + i;
            let currentYear = currentDate.getFullYear();

            if (currentMonth == 12) {
                currentMonth = 0;
                currentYear = currentYear + 1;
            }

            getDaysInMonth(currentYear, currentMonth, i);

        }
    }

    getMonths();

    for (i = 0; i < 3; i++) {

        let month = $("<div><h3 class='text-center'>" + months['month' + i]['month'] + "</h3></div>").addClass('slick-child month');
        let completeWeek = $('<div/>').addClass('completeWeek');

        for (j = 1; j <= 5; j++) {
            let week = $("<div><h4 class='text-center'>" + ['week ' + j] + "</h4></div>").addClass('week');
            let allDays = $('<div/>').addClass('alldays');
            if (months['month' + i]['info']['week' + j] != undefined) {
                for (y = 0; y < months['month' + i]['info']['week' + j].length; y++) {
                    let aDay = $("<p><span class='date'>" + months['month' + i]['info']['week' + j][y]['date'] + "</span><span class='weekday'>" + months['month' + i]['info']['week' + j][y]['week'] + "</span>").attr('date-info', months['month' + i]['info']['week' + j][y]['date'] + '/' + months['month' + i]['info']['week' + j][y]['month'] + '/' + months['month' + i]['info']['week' + j][y]['year'])
                    allDays.append(aDay)
                    allDays.appendTo(week);
                }
            } else {
                break;
            }

            completeWeek.append(week).appendTo(month);
        }

        month.appendTo('.view-joiners-pipeline-landing .calendar');

    }

    $('.view-joiners-pipeline-landing .calendar').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        infinite: false,
        draggable: false,
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
    });

    if ($(window).width() < 1025) {


        $('.view-joiners-pipeline-landing .calendar .completeWeek').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            infinite: false
        });
    }

    $('.view-joiners-pipeline-landing .calendar .month .completeWeek p').on('click', function () {
        alert("selected date - " + $(this).attr('date-info'));
    })


    //nav tab click and active

    $('.view-joiners-pipeline-landing .navbar ul.navbar-nav li').on('click', function () {
        if ($(this).attr('data-name') != 'requisition-view') {
            $(this).parents('ul.nav').children('li').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            })
            $(this).addClass('active');
            $('.view-joiners-pipeline-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.view-joiners-pipeline-landing .tbl-cntr').find('#' + $(this).attr('data-name')).parents('.individual-tbl').addClass('active');
        }
    })


    $('.view-joiners-pipeline-landing #tech-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.view-joiners-pipeline-landing #bu-stack').bootstrapTable({
        pagination: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.view-joiners-pipeline-landing #requisition-view').bootstrapTable({
        pagination: true,
        sortable: true,
        showColumns: true,
        showColumnsToggleAll: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    // on click req number go to req view


    $('.view-joiners-pipeline-landing #tech-stack, .view-joiners-pipeline-landing #bu-stack').on('click', 'td', function (row, $el, field) {
        if (row.currentTarget.className == 'req-no') {
            // alert($(row.currentTarget).find('a').text())


            $('.view-joiners-pipeline-landing .navbar ul.navbar-nav li').each(function (index, item) {

                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
                if ($(item).attr('data-name') == 'requisition-view') {
                    $(item).addClass('active');
                }
            })

            $('.view-joiners-pipeline-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.view-joiners-pipeline-landing .tbl-cntr').find('#requisition-view').parents('.individual-tbl').addClass('active');

            $('html, body').animate({ scrollTop: 0 }, 0);
        }

    })

    // document.onreadystatechange = function () {
    // console.log(document.readyState);
    // if (state == 'interactive') {
    //      document.getElementById('contents').style.visibility="hidden";
    // } else if (state == 'complete') {
    //     setTimeout(function(){
    //        document.getElementById('interactive');
    //        document.getElementById('load').style.visibility="hidden";
    //        document.getElementById('contents').style.visibility="visible";
    //     },1000);
    // }
    //   }

    // View joiners pipeline JS Ends

    // CEG page JS Starts

    
    //nav tab click and active

    $('.ceg-main-landing .navbar ul.navbar-nav li').on('click', function () {
            $(this).parents('ul.nav').children('li').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            })
            $(this).addClass('active');
            $('.ceg-main-landing .tbl-cntr').children('.individual-tbl').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            $('.ceg-main-landing .tbl-cntr').find('#' + $(this).attr('data-name')).parents('.individual-tbl').addClass('active');
    })


    $('.ceg-main-landing #identified-resources').bootstrapTable({
        pagination: true,
        showColumns: true,
        showColumnsToggleAll: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.ceg-main-landing #available-roaster').bootstrapTable({
        pagination: true,
        showColumns: true,
        showColumnsToggleAll: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.ceg-main-landing #resigned-exited-cases').bootstrapTable({
        pagination: true,
        showColumns: true,
        showColumnsToggleAll: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    $('.ceg-main-landing #overall-deployment').bootstrapTable({
        pagination: true,
        showColumns: true,
        showColumnsToggleAll: true,
        sortable: true,
        pageSize: 10,
        pageList: [10, 25, 50, 100, 'ALL']
    });

    // CEG page JS Ends

    
    // common js code starts 

    //Table mobile view row expand

    $('.tbl-cntr tbody tr td span.view-more').on('click', function () {
        if ($(window).width() < 900) {
            $(this).parents('tbody').find('tr').each(function (index, item) {
                if ($(item).hasClass('more')) {
                    $(item).removeClass('more')
                }
            });
            $(this).parents('tr').addClass('more')
            $('html, body').animate({ scrollTop: $(this).parents('tr').offset().top - 75 }, 500);
        }
    })

    // $('.inner').on('click', function(){
    //     $(this).toggleClass('flip');
    // })

    // common js code ends 
})

document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        //  document.getElementById('contents').style.visibility="hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('preloader').style.display = "none";
        }, 1000);
    }
}

