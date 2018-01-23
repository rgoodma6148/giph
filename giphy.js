var seasons =["Summer", "Spring", "Fall", "Winter"];

function createButtons (){
$("#buttons").empty();
for (var i= 0; i < seasons.length; i++){
$("#buttons").append("<button button-name='" + seasons[i] + "'>" + seasons[i] + "</button>");
console.log("Current Buttons: " + seasons[i]);
	}
};



createButtons ();
function createNewButton () {
var newButtonText= $("#add-season").val();
console.log("New Button: " + newButtonText);

seasons.push(newButtonText);

	createButtons();
	event.preventDefault();
	$("#add-season").val("");
	};

$("#buttons").on("click", "button", function(event) {
event.preventDefault();
$("#display-seasons").empty();

var buttonText = $(this).attr("button-name");
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=vpA5777pO1zfXbaH4sCGAfraSqMOohNo";

	$.ajax ({
	url: queryUrl,
  method: "GET"
	})

	.done(function(response) {

		console.log("Response:" + response);

		for (var i = 0; i < response.data.length; i++) {
    var newDiv= $("<div />").addClass("divContainer");
    var newImg = $("<img class='giphy' />");
    var rating= response.data[i].rating;
		var p= $("<p>").text("Rated " + rating);



            newImg.attr("data-state", "still")

                .attr("data-still", response.data[i].images.fixed_height_small_still.url)

                .attr("data-anim", response.data[i].images.fixed_height_small.url)

                .attr("src", response.data[i].images.fixed_height_small_still.url)


			newDiv.append(newImg).append(p);

            $("#display-seasons").append(newDiv);

		}
	});

});

$("#display-seasons").on("click", ".giphy", function(event) {
	event.preventDefault();

	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");

	if (gifState == "still") {

		$(this).attr("src", animUrl).attr("ata-state", "animate");
	} else {

		$(this).attr("src", stillUrl).attr("data-state", "still");
	}
});


$("#download-button").on("click", function(event){
	event.preventDefault();
	console.log("added");
	createNewButton();
});
