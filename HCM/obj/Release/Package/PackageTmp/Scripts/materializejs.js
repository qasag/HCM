$(document).ready(function(){
    $('.tabs').tabs();
  });

//$(document).ready(function(){
//	$('select').formSelect();
//});

$('.dropdown-trigger').dropdown();

$(document).ready(function(){
	$('.datepicker').datepicker();
});

$('.nav div.subnav').each(function () {
    var $subnav = $(this);
    var timeoutHandle;
    $subnav.parent().hover(function () {
        clearTimeout(timeoutHandle);
        navMouseIn($subnav)
    }, function () {
            timeoutHandle = setTimeout(function() {
                navMouseOut($subnav);
            }, 300);
    });
});

function navMouseIn($elem) {
    $elem.show('drop'); 
}
function navMouseOut($elem) {
    $elem.hide('drop'); 
}

$(document).ready(function(){
	$('.collapsible').collapsible();
});
