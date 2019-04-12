var topics = ["barstool", "ezekiel elliott", "kevin durant", "lebron james", "batman", "tony romo"];

$(document).ready(function () {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();
        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-success");
            newButton.text(topics[i]);
            newButton.attr("data-name", topics[i]);
            $("#allbuttons").append(newButton);
    
        }
    }
   
    $("#addbutton").on("click", function (event) {

        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if (addedData != "") {
            topics.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }

    });
   
    $(document).on("click", ".itembutton", displayInfo);

    function displayInfo() {
        var itemName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=sports+" + itemName + "&rating=g&limit=10&api_key=qjFxu5atMh8ac6HoyhWZX6FyzvgyMnTD";
        $("#mainimages").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var dataImage = $("<img>");
                dataImage.attr("src", results[i].images.fixed_height_still.url);
                dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                dataImage.attr("data-animate", results[i].images.fixed_height.url);
                dataImage.addClass("gif");
                dataImage.attr("data-state", "still");


               
                var gifRating = results[i].rating;
                var divRating = $("<p>").text("Rating: " + gifRating);

                
                $("#mainimages").append(dataImage);
                $("#mainimages").append(divRating);
            }
        });
    }
    
    $("#mainimages").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})
