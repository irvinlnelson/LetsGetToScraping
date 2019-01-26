$("#scrape").on("submit", function(response){

$.ajax({
  url: "/scrape",
  method: "GET"
}).then(function(result){
  for (var i = 0; i < result.length; i++){
    $("#articles".append("Headline: " + data[i].title + "Link" + data[i].link))
  }
});
})

//$.getJSON("/articles", function(data) {
    // For each one
    //for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + '<button data-id="' + data[i]._id + '" id="save-article" class="btn btn-primary" type="submit">Save Article</button>');
    //}
  //});
//}
  $("#save-article").on("click", function(){
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
        // With that done, add the note information to the page
        .then(function(data) {
          console.log(data);
        });
  })