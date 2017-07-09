//initialize variables
//array with movie titles.
var topics = ["movies", "tv shows", "anime", "video games"];
// buttons & gifs variables for button and gif ID's in HTML
var query = 0;
var buttons; 
var gifs;
var inputForm;
var apiKey = "71e8838299a442a2bbc53bde3a88589b";

//functions
//creating buttons with inline styles 
var makeButton = function() {
	for (i = 0; i < topics.length; i++) {
		var buttons = $('<input type="button" class="imgBtn"style="color: white;\
						background-color: teal; border: none; border-radius: 5px;\
				 		padding: 5px; margin: 5px;" id="button' + i + '" value="'+ topics[i] + '"</input>');
		buttons.appendTo('#buttons');
	}

}
//capture input from form, append input to array to create a button 
	$(".btn").click(function(event) {
			event.preventDefault();
	
			var btnInput = $("#addTopic").val().trim();
			topics.push(btnInput);

			$("#buttons").empty();
			makeButton();

			$("#addTopic").val("");
	});


makeButton();

//ajax Giphy 
	$(document).on("click", ".imgBtn", function(event) {

	 	var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + $(this).val() + "&rating=g&limit=10";
			$.get(queryUrl, function(response) {

					for(i = 0; i < response.data.length; i++) {		
							var newVal = response.data[i].images;
							var newImg = $("<img>").attr("src", response.data[i].images.original_still.url);
							$(newImg).attr("class", "gifBtn").attr("data-state", "still");
							$(newImg).val(newVal);
							$("#gifs").append(newImg);
					}
	   		 });

		});		
	$(document).on("click", ".gifBtn", function(event) {
		if($(this).attr("data-state") === "still") {
			var newVal = $(this).val();
			$(this).attr("data-state", "animate").attr("src", newVal.original.url);
			
		} else {
			var newVal = $(this).val();
			$(this).attr("data-state", "still").attr("src", newVal.original_still.url);
		}

	});
