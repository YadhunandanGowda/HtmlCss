$(".start").draggable({
    axis: "x",
    revert: true,
    containment: "body"
});

$('.dest').droppable({
    drop: function() {
        $(".start").draggable("option", "revert", false);
        alert('dropped')
    }
})