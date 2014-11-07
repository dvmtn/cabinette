(function(){
  window.cabinette.Highlighter = function(){
    var links = {};

    var init = function(){
      $(cabinette).on('highlight', highlight);
    }

    var unset_active = function(){
      $('.cell.active').removeClass('active');
      $('path').attr('class', function(index, classNames) {
        return classNames.replace('active', '');
      });
    };

    var set_active = function(selected){
      var classes = selected.attr('class').split(/\s+/);
      var journies = _.select(classes, function(klass){
        return (klass.match(/journey_/));
      });
      var activate = journies.join(' ');

      $('.cell.' + activate).addClass('active');
      $('path.' + activate).attr('class', function(index, classNames) {
        return classNames + ' active';
      });
    };

    var highlight = function(event, element_id){
      var selected = $('#'+element_id);
      if(selected.attr('class').match(/active/)){
        unset_active();
      }else{
        unset_active();
        set_active(selected);
      }
    };

    init();
  };
}());
