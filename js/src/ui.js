(function(){
  window.cabinette.UI = function(){
    var utils;

    var init = function(){
      utils = window.cabinette.utils;

      $('body').on({
        change: find
      }, '.finder');

      $('#display').on({
        click: cell_clicked
      }, '.cell');
      
      $(cabinette).on('populate_finder', populate_finder);

      $(window).bind('resize', _.debounce(
        function() {
          $(cabinette).trigger('resize');
        }, 50)
      );
    };

    var cell_clicked = function(event){
      var cell = $(event.currentTarget);
      var id = cell.prop('id');
      $(cabinette).trigger('highlight', id);
    };

    var find = function(event){
      var company_name = $(event.currentTarget).val();
      $(cabinette).trigger('highlight', company_name);
    };

    var value_to_option = function(value){
      var opt_value;
      if(value.id){
        opt_value = value.id;
      }else{
        opt_value = value.name;
      }
      return '<option value="' + utils.string_to_id(opt_value) + '">' + value.name + '</option>';
    };

    var value_to_option_group = function(values, group_name){
      var output_html = "<optgroup label='"+ group_name +"'>";
      output_html += _.map(values, value_to_option).join("\n");
      output_html += "</optgroup>";
      return output_html;
    };

    var populate_finder = function(event, options){
      var options_string = _.map(options.data, value_to_option_group).join('\n');
      $('.finder').html(options_string);
      if(window.innerWidth > 767){
        $('.finder').chosen({width: '400px'});
      }
      options.complete(options_string);
    };

    init();
  };
}());
