var projectName = 'random-quote-machine';
// generate an hex rgb color index for each api call
function randomColor() {
    var arr = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var col = "#";
    for (var i = 0; i < 6; i++) {
        col += arr[randomIndex(0, 15)];
    }
    return col;
}

// a function to get a random number from 1 to 6
function randomIndex(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

// intro animation
function introAnim() {
    $("#quote-box").animate({ maxWidth: 500 }, 1000); $("#quote-box").animate({ minHeight: 100 }, 500, function () { $("#tquote,#new-quote").animate({ opacity: 1 }, 500, pushQuote); });
}

//random select quote
function pushQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            $("#text").animate({ opacity: 0 }, 500, function () {
                $("#text").animate({ opacity: 1 }, 500);
                $("#text").html("<i class='fa fa-quote-left'></i> " + data.quoteText);
            });
            $("#author").animate({ opacity: 0 }, 500, function () {
                $("#author").animate({ opacity: 1 }, 500);
                $("#author").text("- " + data.quoteAuthor);
            });
            // updating link and colors
            var col = randomColor();
            $("#tweet-quote").attr("href", 'https://twitter.com/intent/tweet?text=' + data.quoteText);
            $(".btn").css("background-color", col);
            $("body").css("background-color", col); $("#quote-box").css("color", col);

        },
        xhrFields: {
            withCredentials: false
        }
    });
}


$(document).ready(function () {
    introAnim();
    // pushQuote();
    $("#new-quote").on("click", function () {
        pushQuote();
    });
});