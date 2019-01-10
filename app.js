
$(document).ready(function() {

    // Define initial variables
var topics = [];
console.log(topics);




function displayTopTen() {
    var searchCountry = $(this).data("search");
    console.log(searchCountry);
       
    // Call to Giphy API
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchCountry + "&api_key=b8gF3vpZA0Eyy44SCMK3fHd2hgskQVKw&limit=10&rating=pg";
     console.log(queryURL);
        
        $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var showDiv = $("<div>");

            var rating = results[i].rating;
            var showImage = $("<img>");
            var animatedImage = results[i].images.fixed_height.url;
            var staticImage = results[i].images.fixed_height_still.url;
            var p =$("<p>").text("Rating: " + rating);

            showImage.attr("src", staticImage);
            showImage.addClass("countryGiphy");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticImage);
            showImage.attr("data-animate", animatedImage);
            showDiv.append(p);
            showDiv.append(showImage);
            $("#results").prepend(showDiv);
            console.log(queryURL);
    }
});
}

// Adds button for new input
$("#add-country").on("click", function(event) {
    event.preventDefault();
    var newGif = $("#countryInput").val().trim();
    topics.push(newGif);
    $("#countryInput").val('');
    renderButtons();
});


function renderButtons() {
    $("#buttonHolder").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifButton = $('<button class="btn btn-info">');
        gifButton.attr("id", "show");
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#buttonHolder").append(gifButton);
    }
}

renderButtons();

$(document).on("click", "#show", displayTopTen);
$(document).on("click", "#add-country", displayTopTen);
$(document).on("click", "countryGiphy", pausePlayGifs);

function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("date-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    }



}); // ENDING
