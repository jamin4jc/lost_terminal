var max_time_left = 6480;
var time_left = max_time_left;

function reset_timer(to_time) {
  time_left = to_time;
  count_down();
}
  
function padToLength(value, length) {
  value = value + '';
  while (value.length < length) value = ' ' + value;
  return value;
}

function convert_to_timer(total_seconds,digits) {
  var seconds_left = total_seconds % 60;
  var minutes_left = Math.floor(time_left / 60);
  var timer_digits = (minutes_left * 100) + seconds_left;

  return padToLength(timer_digits, digits);
}

function count_down() { 
  if (time_left > 0)
  {	    
    window.setTimeout('count_down();',1000);
    $('#timer li').solari(convert_to_timer(time_left,5));
    time_left = time_left - 1;
  }
  else
  {
    youre_all_dead();
  }
}

function youre_all_dead() {
  $('#timer li').solari('UHHOH')
}

$(function() {
  var entries = [];

  $('#add_entries_link').click(function() { 
    $('#new_entries').val('');
    setTimeout(function() { $('#entries_form :text').trigger('select') }, 0);
    return false;
  });

  $('#entries_form').submit(function() { 
    if ($('#new_entries').val() == '4 8 15 16 23 42')
    {
      pick(1,5000);    
      $('#new_entries').val('');
    }
    return false;
  });

  function toNumber(value) {
    var num = parseInt(value, 10);
    return (num + '' === 'NaN') ? null : num;
  }

  function pick(count, duration) {
    $('#winners ul').prepend('<li><span></span></li>');
    
    var timer = $('#timer li');
    timer.solari(padToLength(max_time_left, 5), duration);
    time_left = max_time_left;
  }
});

$.fn.appendSorted = function(item) {
  if (this.is(':empty')) return this.append(item);

  var itemValue = parseInt($(item).html(), 10);

  var cursor = this.children(':first');
  while (parseInt(cursor.html(), 10) < itemValue) {
    cursor = cursor.next();
  }

  if (cursor.length) cursor.before(item);
  else this.append(item);

  return this;
};
