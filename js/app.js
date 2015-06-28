$('#my-form').submit(function(event){
	 event.preventDefault();

	 var location = $('#location').val().split(' ').join('%20'); // Adds %20 for spaces.
	 console.log(location);

    $.ajax({
	  url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + location + "%22&format=json",
	  type:'GET',
	  data: {},
	  dataType:'jsonp',
	  success:function(data){
	  	console.log(data);

	  	var locationID = data.query.results.place[0].woeid;

		$.ajax({
		  url:"https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20"+ locationID +"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
		  type:'GET',
		  data: {},
		  dataType:'jsonp',
		  success:function(data){
		  	var temp = "It's " + data.query.results.channel.item.condition.temp + " Fahrenheit out!";
		  	var weatherText = data.query.results.channel.item.condition.text;
		  		$("#weather").html(temp + '<br/>' + weatherText);
		  	console.log(temp);
		  	console.log(weatherText);	
		  },

		  error:function(data){
		  	alert("Fuck the weather, the zombie apocolypse is here. Get your guns and women to higher ground.");
		  },
		});
	  },
	});
	return false;
});


