$(document).ready(function () {
    var topics = ["Cats", "Dogs", "LOL", "Bootcamp", "Majestic", "Meme", "Party", "Random", "Banana", "Pineapple", "Tango", "Flip Flip", "Potato", "Super Mario Maker", "Devil May Cry", "Dark Souls", "Portal", "Star Wars", "Alien vs Predator", "Super Smash Bros", "Fire Emblem", "Bravely Default", "Street Fighter"];

    // separated function to append buttons to saved terms
    
    $("#addButton").on("click", function (event) {
        event.preventDefault();
        
        //To get information from search bar
        var topic = $("#searchTerm").val().trim();
        if($("#searchTerm").val().trim() !== "" && $("#searchTerm").val().trim() !== " "){
            topics.push(topic);
            addButtons(topic);

            // Used to clear out search bar
            $("#searchTerm").val(""); 
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=WjSOaIXp1jZ9NyPTasy7pRqV91MO4snm&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;
            $("#gifBox").empty();
            //currently pulling results
            // console.log(result);

            //Sets condition of only r and pg-13 pictures to load up
            for (var i = 0; i < result.length; i++) {
                if (result[i].rating !== "r") {
                    // Add if you want to block pg-13 as well...
                    // We're not kids here
                    // && result[i].rating !== "pg-13"
                    var gifDiv = $("<div>");
                    var rating = result[i].rating.toUpperCase();
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    topicImage.attr("src", result[i].images.fixed_height.url);
                    gifDiv.addClass('card float-left m-2')
                    gifDiv.append(topicImage);
                    gifDiv.append(p);
                    $("#gifBox").prepend(gifDiv);
                }
            }
        });
        };
    });

    //Used to pull property listed under 'data-name'
    $(document).on("click", ".termSearch", displayGifs);
    $(document).on("click", ".termSearch", displayGifs)

    // So that the page loads with buttons loaded in
    addButtons();

// List of Functions
// ==========================================================
    function addButtons() {
        $("#savedTerm").empty();
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass('btn btn-info btn-sm m-1 termSearch');
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#savedTerm").append(newButton);
        }
    }

    function displayGifs() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=WjSOaIXp1jZ9NyPTasy7pRqV91MO4snm&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;
            $("#gifBox").empty();
            //currently pulling results
            // console.log(result);

            //Sets condition of only r and pg-13 pictures to load up
            for (var i = 0; i < result.length; i++) {
                if (result[i].rating !== "r") {
                    // Add if you want to block pg-13 as well...
                    // We're not kids here
                    // && result[i].rating !== "pg-13"
                    var gifDiv = $("<div>");
                    var rating = result[i].rating.toUpperCase();
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    topicImage.attr("src", result[i].images.fixed_height.url);
                    gifDiv.addClass('card float-left m-2')
                    gifDiv.append(topicImage);
                    gifDiv.append(p);
                    
                    $("#gifBox").prepend(gifDiv);
                }
            }
        });
    };
});