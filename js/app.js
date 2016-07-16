$(document).ready(function() {
    $("#search-form").submit(function(event) {
        event.preventDefault();
        var userInput = $("#query").val();
        getResults(userInput);
    });

    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyD7y-IwGNkpZIIwE5K8IymLFM6HZAYNsiY",
                q: userSearchTerm,
                type: "video"
            },
            function(receivedApiData) {
                console.log(receivedApiData);
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                } else {
                    displaySearchResults(receivedApiData.items);
                }
            });
    }

    function displaySearchResults(videosArray) {
        var html = "";
        $.each(videosArray, function(videosArrayKey, videosArrayValue) {
            html += "<li>";
            html += "<p>" + videosArrayValue.snippet.title + "</p>";
            html += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            html += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
            html += "</a>";
            html += "</li>";
        });
        $("#search-results ul").html(html);
    }
});
