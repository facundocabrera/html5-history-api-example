$(function(){
  //
  // Update view
  //
  function updateContent(data) {
    if (data === null || $.isEmptyObject(data)) {
      data = {
      	content: "Welcome to Kittens! ... more text",
      	photo:"http://placekitten.com/300/300"
      };
    }
    
    console.log('updateContent: ', data);
    
    // update the message & the photo
    $('#content').html(data.content);
    $('#photo').attr('src', data.photo);
  }

  // 
  // Handle history automatically
  //
  $('a.pjax').click(function(event) {
    var promise = null,
        key = event.target.href.split('/').pop();

    promise = $.getJSON('json/' + key + '.json');

    promise.done(function(data) {
    
      // Store the AJAX response in the History
      // fires the statechange event, so, Don't fire the view update here!
      // just use the statechange event as a view update handler.
      History.pushState(data, document.title, event.target.href);

    });
    
    return false;
  });

  //
  // Bind to StateChange Event
  //
  History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    updateContent(State.data);
  });
});