$(document).ready(function () {

    const apiKey = '&apikey=3f7bd57b87da43583336245e74594250';

    // function clearCities() {
    // window.localStorage.clear(history-btn);
    // };

    var cityArr = JSON.parse(localStorage.getItem('cityArr')) || [];
    var city = "";
    dataGet();

    function dataset() {

        city = $('#city-Name').val().trim();
        cityArr.push(city);
        localStorage.setItem('cityArr', JSON.stringify(cityArr));
    }

    function dataGet() {

        // clearCities();

        for (var i = 0; i < cityArr.length; i++) {
            var list = $('<li>');

            list.addClass('list-group-item');
            list.css({ 'padding-right': "0px", 'padding-left': '0px', "margin-top": "4px" });

            var cityBtn = $('<button>');

            cityBtn.addClass('history-btn');
            cityBtn.attr('type', 'button');
            cityBtn.css({ 'width': '100%', 'text-align': 'center', 'font-size': '1.5rem' });
            cityBtn.text(cityArr[i]);

            list.html(cityBtn);
            $(".list-group").empty();
            $('.list-group').prepend(list);

        }
    }

    $(document).on('click', '.history-btn', function () {
        var searchCity = $(this).text();
        renderWeather(searchCity);
        fiveDay(searchCity);
    });

    $('#searchBtn').on('click', function () {
        var city = $('#city-Name').val();
        console.log(cityArr);
        dataset();
        console.log(cityArr)
        dataGet();
        console.log(cityArr)
        renderWeather(city);
        fiveDay();
    });


    $('searchBtn').keypress(function (event) {
        var key = event.which;
        if (key == 13) {
            event.preventDefault();
            dataset();
            dataGet();
            renderWeather(city);
        }
    })

    var renderWeather = function (city) {
        var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey;
        $.ajax({
            url: baseUrl,
            method: "GET",

        }).then(function (response) {
            console.log(response);
            
            var icon = response.weather[0].icon;
            var imgSrc = "https://openweathermap.org/img/wn/" + icon + ".png";
            var img = $("<img>").attr("src", imgSrc);
            img.attr('alt', response.weather[0].main);

            $("#city-Name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));

            $("#imgIcon").html(img);
            $("#temp").text(response.main.temp + "°F");
            $("#temp").wrap("<strong></strong>");
            $("#humidity").text(response.main.humidity + "%");
            $("#humidity").wrap("<strong></strong>");
            $("#wind-speed").text(response.wind.speed + " MPH");
            $("#wind-speed").wrap("<strong></strong>");

            renderUV(response);
        });
    }
    var renderUV = function (data) {
        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?" + apiKey + "&lat=" + data.coord.lat + "&lon=" + data.coord.lon;
        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log("UV Index :");
            console.log(response);
            $('#UV').text(response.value);
        });
    }
    // fiveDay();
    // renderUV();
});