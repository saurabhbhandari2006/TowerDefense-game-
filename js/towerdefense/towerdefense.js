var blinkit;
var playerHt = 0;
var aiHt = 0;
var player_turn = true;
var cal_red, cal_blue, cal_green;
var player;
var gameDeck;
var draw;
var flag = 0;
var stop = false;
var newHt;
function scoreData() {
    var red_val = 50;
    var blue_val = 50;
    var green_val = 50;
    var comp_red_val = 60;
    var comp_blue_val = 60;
    var comp_green_val = 60;

    $("#red_score").text(red_val);
    $("#blue_score").text(blue_val);
    $("#green_score").text(green_val);
    $("#comp_red_score").text(comp_red_val);
    $("#comp_blue_score").text(comp_blue_val);
    $("#comp_green_score").text(comp_green_val);
}


$(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
    blinkit = setInterval(blinker, 2000);
    $('#startClicker').on('click', function () {
        $('.gameTitle').fadeOut();
        $('.stats-wrapper').fadeIn();
        $("#message").text("You win").hide();
        clearInterval(blinkit);
        initGame();
    })


});

function blinker() {
    $('#startClicker').fadeOut(500, function () {
        $('#startClicker').fadeIn(500);
    });
}

function initGame() {
    scoreData();
    initDeck();
    initTowers();
    playerTurn();
}

function setTower(team, delta) {
    var towerHt = (team == "player") ? playerHt : aiHt;
    var teamTower = $('#' + team + '-tower');
    newHt = Math.min(Math.max(parseInt(towerHt) + parseInt(delta), 0), parseInt(game.maxHeight * 10));
    var existingStoreys = Math.floor(towerHt / 10);
    var newStoreys = Math.floor(newHt / 10);
    var posx = 89;
    var posy = $('#' + team + '-tower .base').height() - 10;
    var wd = 84;
    var ht = 55;
    var i;

    teamTower.find('.broken').remove();
    teamTower.find('.cap').remove();
    if (existingStoreys > newStoreys) {
        teamTower.find('.tower-block').remove();
        existingStoreys = 0;
    }

    for (i = 1; i < newStoreys + 1; i++) {
        if (i > existingStoreys) {
            teamTower.append('<img  src="img/towerdefense/' + team + 'tower/state10.png" id="' + team + '-towerblock-' + i + '" class="tower-block" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');

        }
        ht = theme.dropRatio * ht;
        wd = theme.dropRatio * wd;
        posx += (1 - theme.dropRatio) / 2 * wd;
        posy += ht;
    }

    setTowerTop(team, (newStoreys >= game.maxHeight), (newHt % 10), posx, posy, wd);
    return (team == "player") ? (playerHt = newHt) : (aiHt = newHt)
}

function setTowerTop(team, cap, top, posx, posy, wd) {
    var teamTower = $('#' + team + '-tower');
    if (cap) {
        teamTower.append('<img src="img/towerdefense/' + team + 'tower/top.png" id="' + team + '-cap" class="tower-block cap" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
    } else {
        if (top != 0) {
            if (top % 2 != 0) {
                top--;
            }
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state' + top + '.png" id="' + team + '-broken-towerblock" class="tower-block broken" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
        }
    }
}

function initDeck(index) {
    gameDeck = shuffle(myCards);
    drawCards();
}

function drawCards() {

    draw = [];
    if (flag + 2 < 12) {
        for (var i = 0; i < 3; i++) {
            draw.push(gameDeck[flag]);
            flag++;
        }
    }
    else {
        flag = 0;
        initDeck();
    }

    $.each(draw, function (index, elm) {
        $('.card-container').find('.cards').eq(index).append('<img id=' + elm.id + '_' + elm.cost.red + '_' + elm.cost.blue + '_' + elm.cost.green + '_' + elm.value + '" src="' + elm.image + '" class="card-image"/>')

    });
}

function initTowers() {
    setTower('player', game.startHeight);
    setTower('ai', game.startHeight );
}

function playerTurn() {

    $(".cards").unbind('click').click(function () {
        switch ($(this).attr("id")) {
            case "card1":
                card = draw[0];
                break;
            case "card2":
                card = draw[1];
                break;
            case "card3":
                card = draw[2];
                break;

        }

        console.log("Player's Card:");
        console.log(card);
        console.log(" ");

        if (checkCost("player", draw[0]) || checkCost("player", draw[1]) || checkCost("player", draw[2])) {
            if (checkCost("player", card)) {
                cardClicked(card, "player", "ai");


            } else {
                $("#message").text("Not enough Resources").fadeIn(1000).fadeOut(1000);
                playerTurn();
                //display message saying card cannot be selected and select different card and re-call playerTurn()
            }
        } else {
            console.log("Cant pick any of the cards from the draw thus re-drawing");
            emptyDeck();
            drawCards();
            playerTurn();
            $("#message").text("re-drawing cards").fadeIn(1000).fadeOut(1000);
            //display message saying re-drawing cards and call playerTurn() again
        }


    })
}

function aiTurn() {

    /* Randomly pick from one of the active cards*/
    var random = Math.floor((Math.random() * 3));
    var card = draw[random];

    console.log("Computer's Card:");
    console.log(card);
    console.log(" ");

    if (checkCost("ai", draw[0]) || checkCost("ai", draw[1]) || checkCost("ai", draw[2])) {
        if (checkCost("ai", card)) {
            cardClicked(card, "ai", "player");
        } else {
            aiTurn();
        }
    } else {
        emptyDeck();
        drawCards();
        aiTurn();
    }

}

function cardClicked(card, byTeam, onTeam) {

    switch (card.category) {
        case "attack":
            attack(onTeam, card);
            if (aiHt <= 0) {

                $("#message").text("You win").fadeIn(2000).fadeOut(2000);
                   setTimeout(function () {
                    $('.gameTitle').fadeIn(2000);
                    $('.stats-wrapper').fadeOut();
                    initGame();
                }, 3000);

            }
            if (playerHt <= 0) {
                $("#message").text("Game Over").fadeIn(2000).fadeOut(2000);
                setTimeout(function () {
                    $('.gameTitle').fadeIn(2000);
                    $('.stats-wrapper').fadeOut();
                    initGame();
                }, 3000);

            }
            switchTurn(byTeam);
            break;
        case "build":
            build(byTeam, card);
            switchTurn(byTeam);
            break;
        case "green":
            green(byTeam, onTeam, card);
            switchTurn(byTeam);
            break;
        case "resource":
            stockUp(byTeam);
            break;
    }
}

function attack(team, card) {
    if (team == "ai") {
        cal_red = $("#red_score").text() - parseInt(card.cost.red);
        $("#red_score").text(cal_red);
        cal_green = $("#green_score").text() - parseInt(card.cost.green);
        $("#green_score").text(cal_green);
        setTower("ai", card.value);
        $("#ai-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");


    } else {
        cal_red = $("#comp_red_score").text() - parseInt(card.cost.red);
        $("#comp_red_score").text(cal_red);
        cal_green = $("#comp_red_score").text() - parseInt(card.cost.green);
        $("#comp_red_score").text(cal_green);
        setTower("player", card.value);
        $("#player-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");


    }

}

function build(team, card) {
    if (team == "ai") {
        cal_blue = $("#comp_blue_score").text() - parseInt(card.cost.blue);
        $("#comp_blue_score").text(cal_blue);
        setTower("ai", card.value);
        $("#ai-tower-effect").find('.build_image').show().delay(1000).fadeOut();
        $.ionSound.play("build");

    } else {
        cal_blue = $("#blue_score").text() - parseInt(card.cost.blue);
        $("#blue_score").text(cal_blue);
        setTower("player", card.value);
        $("#player-tower-effect").find('.build_image').show().delay(1000).fadeOut();
        $.ionSound.play("build");
    }
}

function green(byTeam, onTeam, card) {
    if (card.cost.red > 0)
        attack(onTeam, card);
    else
        build(byTeam, card);
}

function stockUp(team, card) {
    if (team == "ai") {
        getQuestion("ai");
    } else {
        getQuestion("player");
    }
}

function checkCost(team, card) {
    if (team == "player") {
        cal_red = $("#red_score").text() - card.cost.red;
        cal_blue = $("#blue_score").text() - card.cost.blue;
        cal_green = $("#green_score").text() - card.cost.green;

        if (cal_red > 0 && cal_blue > 0 && cal_green > 0)
            return true;

        else

            return false;
    } else {
        cal_red = $("#comp_red_score").text() - card.cost.red;
        cal_blue = $("#comp_blue_score").text() - card.cost.blue;
        cal_green = $("#comp_green_score").text() - card.cost.green;

        if (cal_red > 0 && cal_blue > 0 && cal_green > 0)
            return true;
        else

            return false;
    }
}

function emptyDeck() {
    $(".cards").empty()
}

function getQuestion(team) {
    //console.log("card_type in getQuest():- " + card_type);
    //console.log("player_turn in getQuest() :- " + player_turn);


    var list = quiz.questions[Math.floor(Math.random() * 3)];
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var data = list[randomnum];
    setTimeout(function () {

        $("#quiz-content").show();
        $('#qquestion').fadeIn();
        $('#qprompt').fadeIn();
        $('#answerBlock').fadeIn();


        $('#qcard').fadeIn();
        $('#qquestion').html(data.name);
        $('#qid').html(data.id);
        $('#optax').html('<div class="answer-bullet" id="bulletA">A</div>' + data.opta);
        $('#optbx').html('<div class="answer-bullet" id="bulletB">B</div>' + data.optb);
        $('#optcx').html('<div class="answer-bullet" id="bulletC">C</div>' + data.optc);
        $('#optdx').html('<div class="answer-bullet" id="bulletD">D</div>' + data.optd);
        bindAnswers(team);
    }, 1000);
}

function bindAnswers(team) {
    console.log("player turn in bindAnswers :- " + team);
    if (team == "ai") {

        setTimeout(function () {
            var comp_random_ans = Math.floor(Math.random() * 4);
            console.log("comp randomly answered :- " + comp_random_ans);
            var random_ans_li = $('#answerBlock').find('li').eq(comp_random_ans);
            processAnswers($(random_ans_li).attr("id").split("x")[0], team);
        }, 3000);

        switchTurn(team);
    }

    $('.answer').unbind('click').on('click', function () {
        console.log($(this).attr("id").split("x")[0]);
        processAnswers($(this).attr("id").split("x")[0], team);
        switchTurn(team);
    });
}

function processAnswers(answer, team) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = parseInt(data.split('||')[0]);
    var answer_score_red = cal_red + answerPayoff;
    var answer_score_blue = cal_blue + answerPayoff;
    var answer_score_green = cal_red + answerPayoff;

//  var addplay=5;
//  $('#green').text(addplay)

    if (answerPayoff > 1) {
        if (team == "ai") {
            $('#comp_red_score').text(answer_score_red);
            $('#comp_blue_score').text(answer_score_blue);
            $('#comp_green_score').text(answer_score_green);
        } else {
            $('#red_score').text(answer_score_red);
            $('#blue_score').text(answer_score_blue);
            $('#green_score').text(answer_score_green);
        }
    }

    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'>" + resultMsg + "<br/>The correct answer is: <h3 style='color:darkred;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();
    setTimeout(function () {
        $("#quiz-content").hide();
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
    }, 3000);

}

$.ionSound({
    sounds: [
        "blast",
        "build"
    ],
    path: "sounds/quizspin/",
    multiPlay: true,
    volume: "1.0"
});

function switchTurn(from) {
    if (from == "ai") {
        emptyDeck();
        drawCards();
        playerTurn();

    } else {
        setTimeout(emptyDeck, 4000);
        setTimeout(drawCards, 4000);
        setTimeout(aiTurn, 4000);
    }

}


/*----------------------------------------------------*/

//if (player_turn == true) {
//    $(".cards").unbind('click').click(function () {
//        card_click($(this), event);
//        console.log("on .cards click, player_turn :- " + player_turn);
////        player_turn = false;
//
//    });
//}
//
//
//function card_click(thisobj) {
//
//    card_type = $(thisobj).find('img').attr("data-val-type");
//    console.log("card_type in card_click :- " + card_type);
//
//    red = $(thisobj).find('img').attr("data-val-red");
//    blue = $(thisobj).find('img').attr("data-val-blue");
//    green = $(thisobj).find('img').attr("data-val-green");
//
//    attack = $(thisobj).find('img').attr("data-val-attack");
//    build = $(thisobj).find('img').attr("data-val-build");
//    cal_red = $("#red_score").text() - parseInt(red);
//    cal_blue = $("#blue_score").text() - parseInt(blue);
//    cal_green = $("#green_score").text() - parseInt(green);
//    comp_cal_red = $("#comp_red_score").text() - parseInt(red);
//    comp_cal_blue = $("#comp_blue_score").text() - parseInt(blue);
//    comp_cal_green = $("#comp_green_score").text() - parseInt(green);
//
//
//    if (player_turn == true) {
//        $("#red_score").text(cal_red);
//        $("#blue_score").text(cal_blue);
//        $("#green_score").text(cal_green);
//    }
//    else {
//        $("#comp_red_score").text(comp_cal_red);
//        $("#comp_blue_score").text(comp_cal_blue);
//        $("#comp_green_score").text(comp_cal_green);
//    }
//
//    console.log("card_type :- " + card_type);
//    console.log("player_turn :- " + player_turn);
//
//    switch (card_type) {
//        case "attack":
//            if (player_turn == true) {
//                setTower("ai", attack);
//                $("#ai-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
//                $.ionSound.play("blast");
//
//            }
//            else {
//                setTower("player", attack);
//                $("#player-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
//                $.ionSound.play("blast");
//            }
//            break;
//        case "build":
//            if (player_turn == true) {
//                setTower("player", build);
//                $("#player-tower-effect").find('.build_image').show().delay(1000).fadeOut();
//                $.ionSound.play("build");
//            }
//            else {
//                setTower("ai", build);
//                $("#ai-tower-effect").find('.build_image').show().delay(1000).fadeOut();
//                $.ionSound.play("build");
//            }
//            break;
//        case "resource":
//            getQuestion();
//            break;
//
//    }
//    player_turn=false;
//    if (player_turn == false) {
////        player_turn = true;
//        $(".cards").empty();
//        card_swape();
//
//        console.log("card type b4 comp_click :- " + card_type);
//        console.log("player_turn b4 comp_click :- " + player_turn);
//
//        setTimeout(comp_click, 4000);
//    }
//
//}
//
//function comp_click() {
//    console.log("computer click");
//    random_button = $(".card-container").find(".cards")[Math.floor(3 * Math.random())];
////    console.log("random_button :- " + $(random_button).attr('class'));
//    card_click($(random_button), 'click');
//    player_turn=true;
//
//}