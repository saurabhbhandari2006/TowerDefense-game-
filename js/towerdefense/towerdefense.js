var blinkit;
var playerHt = 0;
var aiHt = 0;
var cal_red, cal_blue, cal_green;
var player;
var gameDeck;
var draw;
var flag = 0;
var newHt;
var player;
var gameOn;
var selectCard;



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
    gameOn = true;
    player = false;
    selectCard = false;

    initTowers();
    scoreData();
    initDeck();
    $(".ai").css({'opacity': 0.5})
    $('img.comp-frame-glow').hide();
    playerTurn();
}

function initTowers() {
    setTower('player', game.startHeight);
    setTower('ai', game.startHeight );
}

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

function initDeck() {
    gameDeck = shuffle(myCards);
    draw = [];
}

function setTower(team, delta) {
    var towerHt = (team == "player") ? playerHt : aiHt;
    var teamTower = $('#' + team + '-tower');
    newHt = Math.min(Math.max(parseInt(towerHt) + parseInt(delta), 0), parseInt(game.maxHeight * 10));
    var existingStoreys = Math.floor(towerHt / 10);
    var newStoreys = Math.floor(newHt / 10);

    if($( window ).width() <= 640) {
        var posx = 63;
        var wd = 56;
        var ht = 40;
    } else {
        var posx = 89;
        var wd = 84;
        var ht = 55;
    }

    var posy = $('#' + team + '-tower .base').height() - 10;

    var i;

    teamTower.find('.broken').remove();
    teamTower.find('.cap').remove();
    if (existingStoreys > newStoreys) {
        teamTower.find('.tower-block').remove();
        existingStoreys = 0;
    }
    for (i = 1; i < newStoreys + 1; i++) {
        if (i > existingStoreys) {
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state10.png" id="' + team + '-towerblock-' + i + '" class="tower-block" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
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

function showInstructions() {
    //onclick start : showDeck(), cardsDraw(), drawCards(); showCards(); hideDeck();
}

function getCards() {
    showDeck();
    cardsDraw();
    fadeDrawCards();
    drawCards();
    showCards();
    hideDeck();
}

function checkFlag() {
    if (flag+2 < gameDeck.length)
        return true;
    else
        return false;
}

function initDraw() {
    console.log("checking flag");
    if (checkFlag()) {
        for (var i = 0; i < 3; i++) {
            draw.push(gameDeck[flag]);
            flag++;
        }
    } else {
        console.log("Re-shuffling Deck");
        flag = 0;
        initDeck();
        initDraw();
    }
}

function showDeck() {}

function cardsDraw() {}

function fadeDrawCards() {}

function drawCards() {
    $.each(draw, function (index, elm) {
        $('.card-container').find('.cards').eq(index).append('<img id=' + elm.id + '_' + elm.cost.red + '_' + elm.cost.blue + '_' + elm.cost.green + '_' + elm.value + '" src="' + elm.image + '" class="card-image"/>')
    });
    console.log("gameDeck");
    console.log(gameDeck);
    console.log("gameDeck.length");
    console.log(gameDeck.length);
    console.log("draw");
    console.log(draw);

}

function showCards() {}

function hideDeck() {}

function startTurn() {
    //display player's / ai's turn
    //animate respective player
    //call playerTurn() / aiTurn()
}

function playerTurn() {
    console.log("Player:");
    initDraw();
    if(validateDraw("player")) {
        console.log("getting Cards");
        console.log(draw);
        getCards();
        player = true;
    }
    else {
        $("#message").text("Re-drawing Cards").fadeIn(1000).fadeOut(1000);
        playerTurn();
    }

    $(".cards").unbind('click').click(function () {
        if(player) {
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
            
            //growSelectCard()
            //shrinkSelectCard()
            
            player = false;

            if (checkCost("player", card)) {
                cardClicked(card, "player", "ai");
            } else {
                $("#message").text("Not enough Resources").fadeIn(1000).fadeOut(1000);
                player = true;
                playerTurn();
            }
        }
    })
}

function aiTurn() {
    if(player == false) {
        console.log("AI:");
        initDraw();
        if(validateDraw("ai")) {

            getCards();

            var random = Math.floor((Math.random() * 3));
            var card = draw[random];

            if (checkCost("ai", card)) {
                setTimeout(function() {cardClicked(card, "ai", "player");}, 2000);
            } else {
                aiTurn();
            }
        } else {aiTurn();}
    }
}

function validateDraw(team) {
    if (checkCost(team, draw[0]) || checkCost(team, draw[1]) || checkCost(team, draw[2])) {
        return true;
    } else {
        $("#message").text("Re-drawing Cards").fadeIn(1000).fadeOut(1000);
        return false;
    }
}

function cardClick() {
    //animate card
    //call cardClicked() on select
    //call reselectCard() when cancel
}

function reselectCard() {
    //fade grown image
    //display message to reselect card
}

function cardClicked(card, byTeam, onTeam) {
    switch (card.category) {
        case "attack":
            attack(byTeam, onTeam, card);
            break;
        case "build":
            build(byTeam, card);
            if(gameOn) {switchTurn(byTeam);}
            break;
        case "bonus":
            bonus(byTeam, onTeam, card);
            if(gameOn) {switchTurn(byTeam);}
            break;
        case "resource":
            stockUp(byTeam, onTeam, card);
            break;
    }
}

function attack(byTeam, onTeam, card) {
    if (onTeam == "ai") {
        cal_red = $("#red_score").text() - parseInt(card.cost.red);
        $("#red_score").text(cal_red);
        cal_green = $("#green_score").text() - parseInt(card.cost.green);
        $("#green_score").text(cal_green);
        $("#message").text("You Dealt " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
        setTower("ai", card.value);
        $("#ai-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");
    } else {
        cal_red = $("#comp_red_score").text() - parseInt(card.cost.red);
        $("#comp_red_score").text(cal_red);
        cal_green = $("#comp_green_score").text() - parseInt(card.cost.green);
        $("#comp_green_score").text(cal_green);
        $("#message").text("You Took " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
        setTower("player", card.value);
        $("#player-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");
    }
    checkWin();
    if(gameOn) {switchTurn(byTeam);}
}

function checkWin() {
    if (aiHt <= 0) {
        setTimeout(function(){
            $("#message").text("You win").fadeIn(1000).fadeOut(2000) ;
        },3000);
        setTimeout(function(){
            $("#message").html("<a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").fadeIn(1000);
        },6000);
        gameOn = false;
    }
    if (playerHt <= 0) {
        $("#message").html("You Loose!! <br/> Game Over").fadeIn(1000).fadeOut(2000);
        setTimeout(function(){
            $("#message").html("<a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").fadeIn(1000);

        },3000);
        gameOn = false;
    }

    playerAnimOff();
}

function build(byTeam, card) {
    if (byTeam == "ai") {
        cal_blue = $("#comp_blue_score").text() - parseInt(card.cost.blue);
        $("#comp_blue_score").text(cal_blue);
        cal_green = $("#comp_green_score").text() - parseInt(card.cost.green);
        $("#comp_green_score").text(cal_green);
        $("#message").text("Opponent Built Tower by " + card.value).css("color","#3399FF").fadeIn(1000).fadeOut(2000);
        setTower("ai", card.value);
        $("#ai-tower-effect").find('.build_image').show().delay(1000).fadeOut();
        $.ionSound.play("build");
    } else {
        cal_blue = $("#blue_score").text() - parseInt(card.cost.blue);
        $("#blue_score").text(cal_blue);
        cal_green = $("#green_score").text() - parseInt(card.cost.green);
        $("#green_score").text(cal_green);
        $("#message").text("You Built Tower by " + card.value).css("color","#3399FF").fadeIn(1000).fadeOut(2000);
        setTower("player", card.value);
        $("#player-tower-effect").find('.build_image').show().delay(1000).fadeOut();
        $.ionSound.play("build");
    }
}

function bonus(byTeam, onTeam, card) {
    if(card.cost.red > 0){
        attack(byTeam, onTeam, card);
    } else {
        build(byTeam, card);
    }
}

function stockUp(byTeam, onTeam, card) {
    if(card.cost.red == -1) {
        stockRed(byTeam, card);
        if(gameOn) {switchTurn(byTeam);}
    } else {
        if(card.cost.blue == -1) {
            stockBlue(byTeam, card);
            if(gameOn) {switchTurn(byTeam);}
        } else {
            stockGreen(byTeam, card);
        }
    }
}

function stockRed(byTeam, card) {
    if(byTeam == "ai") {
        cal_red = parseInt($("#comp_red_score").text()) + parseInt(card.value);
        $("#comp_red_score").text(cal_red);
        $("#message").text("Opponent gained  " + card.value + " Rubies").css("color","red").fadeIn(1000).fadeOut(2000);
    } else {
        cal_red =  parseInt($("#red_score").text()) + parseInt(card.value);
        $("#red_score").text(cal_red);
        $("#message").text("You gained  " + card.value + " Rubies").css("color","red").fadeIn(1000).fadeOut(2000);
    }
}

function stockBlue(byTeam, card) {
    if(byTeam == "ai") {
        cal_blue = parseInt($("#comp_blue_score").text()) + parseInt(card.value);
        $("#comp_blue_score").text(cal_blue);
        $("#message").text("Opponent gained  " + card.value + " Sapphires").css("color","#3399FF").fadeIn(1000).fadeOut(2000);
    } else {
        cal_blue =  parseInt($("#blue_score").text()) + parseInt(card.value);
        $("#blue_score").text(cal_blue);
        $("#message").text("You gained  " + card.value + " Sapphires").css("color","#3399FF").fadeIn(1000).fadeOut(2000);
    }
}

function stockGreen(byTeam, card) {
    if(byTeam == "ai") {
        getQuestion(byTeam, card, "ai");
    } else {
        getQuestion(byTeam, card, "player");
    }

}

function checkCost(team, card) {
    if (team == "player") {
        console.log("checking card");
        cal_red = $("#red_score").text() - card.cost.red;
        cal_blue = $("#blue_score").text() - card.cost.blue;
        cal_green = $("#green_score").text() - card.cost.green;
        if (cal_red > 0 && cal_blue > 0 && cal_green > 0)
            return true;
        else
            return false;
    } else {
        console.log("checking card");
        cal_red = $("#comp_red_score").text() - card.cost.red;
        cal_blue = $("#comp_blue_score").text() - card.cost.blue;
        cal_green = $("#comp_green_score").text() - card.cost.green;
        if (cal_red > 0 && cal_blue > 0 && cal_green > 0)
            return true;
        else
            return false;
    }
}

function emptyDraw() {
    draw = [];
    $(".cards").empty();
}

function getQuestion(byTeam, card, chance) {
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
        bindAnswers(byTeam, card, chance);
    }, 250);
}

function bindAnswers(byTeam, card, chance) {
    if (byTeam == "ai") {
        setTimeout(function () {
            var comp_random_ans = Math.floor(Math.random() * 4);
            var random_ans_li = $('#answerBlock').find('li').eq(comp_random_ans);
            processAnswers($(random_ans_li).attr("id").split("x")[0], byTeam, card);
        }, 2000);
    }
    $('.answer').unbind('click').on('click', function () {
        if(chance == "player")
            processAnswers($(this).attr("id").split("x")[0], byTeam, card);
    });
}

function processAnswers(answer, byTeam, card) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = parseInt(card.value);

    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'> <h4 style='color: whitesmoke;'>" + resultMsg + "!! The correct answer is: </h4> <h3 style='color:#3399FF;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();
    setTimeout(function () {
        $("#quiz-content").hide();
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
    }, 1500);
    setTimeout(function(){
        if (answerPayoff > 0) {
            if (byTeam == "ai") {
                $("#message").text("Opponent gained  " + card.value + " Emeralds").css("color","#009933").fadeIn(1000).fadeOut(2000);
                cal_green = parseInt($("#comp_green_score").text()) + answerPayoff;
                $("#comp_green_score").text(cal_green);
            } else {
                $("#message").text("You gained  " + card.value + " Emeralds").css("color","#009933").fadeIn(1000).fadeOut(2000);
                cal_green = parseInt($("#green_score").text()) + answerPayoff;
                $("#green_score").text(cal_green);
            }
        }
        if(gameOn) {switchTurn(byTeam);}

    }, 1500);

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
        animSwitchTurn(from);
        setTimeout(playerTurn, 5000);
    } else {
        player = false;
        animSwitchTurn(from);
        setTimeout(aiTurn, 5000);
    }
}

function animSwitchTurn(from) {
    if (from == "ai") {
        setTimeout(function(){player = true;}, 5000)
        setTimeout(function(){$(".ai").css({'opacity': 0.5});}, 5000);
        setTimeout(function() {$('img.comp-frame-glow').hide();}, 5000);
        setTimeout(function(){$(".player").css({'opacity': 1});}, 5000);
        setTimeout(function() {$('img.player-frame-glow').show();}, 5000);
    } else {
        setTimeout(function(){$(".ai").css({'opacity': 1});}, 5000);
        setTimeout(function() {$('img.comp-frame-glow').show();}, 5000);
        setTimeout(function(){$(".player").css({'opacity': 0.5});}, 5000);
        setTimeout(function() {$('img.player-frame-glow').hide();}, 5000);
    }
}

function playerAnimOff() {
    $(".ai").css({'opacity': 0.5});
    $('img.comp-frame-glow').hide();

    $(".player").css({'opacity': 0.5});
    $('img.player-frame-glow').hide();
}
