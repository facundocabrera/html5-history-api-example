$(document).ready(function(){
  //
  // Update view
  //
  function updateContent(data) {
    if (data === null) {
      return;
    }
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
      // Update the view.
      updateContent(data);
      
      // Store the AJAX response in the History
      History.pushState(data, document.title, event.target.href);
    });
    
    return false;
  });

  //
  // Initial setup because after change the content using javascript we need 
  // to rebuilt it.
  //
  History.pushState({
      content: "Welcome to Kittens! ... more text",
      photo:"http://placekitten.com/300/300"
    }, document.title, '/'
  );

  // 
  // Bind to StateChange Event
  //
  History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    
    console.log('statechange data: ', State.data);

    updateContent(State.data);
  });
});
