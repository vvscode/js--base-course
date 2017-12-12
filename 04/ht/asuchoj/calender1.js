/**
 * Created by sherstyuk on 12.12.2017.
 */
  (function() {
    var id = "calendar1";
    document.write('<div class="calendarBox" id="' + id + '"> </div>');
    new ShowCalender({
      el: "#" + id,
      allowChangeMonth:true,
      allowAddTasks:true,
      allowRemoveTasks:true,
      showMonth:true,
      date:  '2017, 11'})
  })();
