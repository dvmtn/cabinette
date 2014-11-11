(function(){
  window.cabinette.Highlighter = function(){
    var init = function(){
      $(cabinette).on('highlight', highlight);
    };

    var unset_path = function(path_selector){
      path_selector.attr('class', function(index, classNames) {
        return classNames.replace('active', '');
      });
    };

    var unset_active = function(){
      $('.cell.selected').removeClass('selected');
      $('.cell.active').removeClass('active');
      unset_path($('path'));
    };

    var selectors_for_journies = function(prefix, journies){
      var selectors = [];
      _.each(journies, function(journey){
        selectors.push(prefix + '.' + journey);
      });
      return selectors.join(', ');
    };

    var set_active = function(selected){
      selected.addClass('selected');
      var classes = selected.attr('class').split(/\s+/);
      var journies = _.select(classes, function(klass){
        return (klass.match(/journey_/));
      });
      $(selectors_for_journies('.cell', journies)).addClass('active');
      $(selectors_for_journies('path', journies)).attr('class', function(index, classNames) {
        return classNames + ' active';
      });

      if(selected.parent().prop('id') === 'capital_providers'){
        siblings = selected.siblings('.active');
        siblings.removeClass('active');
        _.each(siblings, function(sibling){
          unset_path( $('path.active.from_' + sibling.id) );
        });
      }
    };

    var highlight = function(event, element_id){
      var selected = $('#' + element_id);
      unset_active();
      set_active(selected);
    };

    init();
  };
}());
