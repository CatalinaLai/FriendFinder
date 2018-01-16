var starterFriends = require("../data/friends.js");

module.exports = function (app){
    
    app.get("/api/friends", function (req, res) {
        res.json(starterFriends);
    });

    app.post('/api/friends', function (req, res) {
        var newFriendScoreArray = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;
        var count = 0;

        for (var i = 0; i < starterFriends.length; i++) {
            var scoresDiff = 0;

            for (var j = 0; j < newFriendScoreArray.length; j++) {
                scoresDiff += (Math.abs(parseInt(starterFriends[i].scores[j]) - parseInt(newFriendScoreArray[j])));
            }

            scoresArray.push(scoresDiff);
        }

        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        var yourMatch = starterFriends[bestMatch];
        res.json(yourMatch);
        starterFriends.push(req.body);
    });

};