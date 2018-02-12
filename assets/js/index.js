jQuery(document).ready(function($){
  var selected = [];
	var $timeline_block = $('.cd-timeline-block');
  var $menu_items = $('.menu-item');

  // select or unselect menu items
  var disable = function(item) { $(item).addClass('disabled'); };
  var enable = function(item) { $(item).removeClass('disabled'); };

  // show or hide timeline items
  var updateTimeline = function(type) {
    $timeline_block.each(function(){
      if (selected.length == 0) return $(this).show();
      var type = $(this).attr('class').split(/\s+/)[1];
      if ($.inArray(type,selected) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  };

  // select or unselect all menu items
  var disableMenu = function() {
    $menu_items.each(function() {
      disable(this);
    });
  };
  var enableMenu = function() {
    $menu_items.each(function() {
      enable(this);
    });
  };

  // check if menu item is disabled
  var isDisabled = function(item) {
    return $(item).hasClass('disabled');
  };

	//hide timeline blocks which are outside the viewport
	//$timeline_block.each(function(){
		//if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			//$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		//}
	//});

	//on scolling, show/animate timeline blocks when enter the viewport
	//$(window).on('scroll', function(){
		//$timeline_block.each(function(){
			//if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				//$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			//}
		//});
	//});

  var addType = function(item){
    var classes = $(item).attr('class').split(/\s+/);
    selected.push(classes[1]);
  };

  var removeType = function(item){
    var classes = $(item).attr('class').split(/\s+/);
    var index = selected.indexOf(classes[1]);
    if (index>-1) {
      selected.splice(index,1);
    }
  };

  var select = function(item){
    enable(item);
    addType(item);
  };

  var unselect = function(item){
    if (selected.length == 0) {
      disableMenu();
      enable(item);
      addType(item);
    } else {
      disable(item);
      removeType(item);
    }
    if (selected.length == 0) enableMenu();
  };

  $menu_items.each(function(){
    $(this).click(function(){
      if (isDisabled(this)) {
        select(this);
      } else {
        unselect(this);
      }
      updateTimeline();
    });
  });
});
