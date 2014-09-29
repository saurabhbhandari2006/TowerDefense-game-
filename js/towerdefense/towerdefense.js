var blinkit;
var playerHt = 0;
var aiHt = 0;
var cal_red, cal_blue, cal_green;
var player;
var gameDeck;
var draw;
var flag = 0;
var newHt;
var player_turn = true;
var animDeck;
var animCards;

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
    $(".ai").css({'opacity': 0.5})
    $('img.comp-frame-glow').hide();
    getCards();
// $(".player").css({'box-shadow': '10px 10px 5px #888'});
    playerTurn();
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
        cardEnlarge($(this).attr("id"));
//        if(player_turn) {
//            switch ($(this).attr("id")) {
//                case "card1":
//                    card = draw[0];
//                    break;
//                case "card2":
//                    card = draw[1];
//                    break;
//                case "card3":
//                    card = draw[2];
//                    break;
//            }
//            player_turn = false;
//
//            if (checkCost("player", draw[0]) || checkCost("player", draw[1]) || checkCost("player", draw[2])) {
//                if (checkCost("player", card)) {
//                    cardClicked(card, "player", "ai");
//                } else {
//                    $("#message").text("Not enough Resources").fadeIn(1000).fadeOut(1000);
//                    player_turn = true;
//                    playerTurn();
//                }
//            } else {
//                $("#message").text("Re-drawing Cards").fadeIn(1000).fadeOut(1000);
//                emptyDeck();
//                drawCards();
//                playerTurn();
//            }
//        }
    })
}

function aiTurn() {
    if(player_turn == false) {
        /* Randomly pick from one of the active cards*/
        var random = Math.floor((Math.random() * 3));
        var card = draw[random];

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
}

function cardClicked(card, byTeam, onTeam) {
    switch (card.category) {
        case "attack":
            attack(onTeam, card);
            if (aiHt <= 0) {
                setTimeout(function(){
                    $("#message").text("You win").fadeIn(1000).fadeOut(2000) ;
                },3000);
                setTimeout(function(){
                    $("#message").html("<a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").fadeIn(1000);

                },6000);
                break;
//                setTimeout(function () {
//                    $('.gameTitle').fadeIn(2000);
//                    $('.stats-wrapper').fadeOut();
//                    initGame();
//                }, 3000);
            }
            if (playerHt <= 0) {
                $("#message").html("You Loose!! <br/> Game Over").fadeIn(1000).fadeOut(2000);
                setTimeout(function(){
                    $("#message").html("<a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").fadeIn(1000);

                },3000);
//                $("#message").html("<a href='' style='text-decoration: none;'>Click Here<a/> to Play Again").fadeIn(1000);
                break;
//                setTimeout(function () {
//                    $('.gameTitle').fadeIn(2000);
//                    $('.stats-wrapper').fadeOut();
//                    initGame();
//                }, 3000);
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
        $("#message").text("You Dealt " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
        setTower("ai", card.value);
        $("#ai-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");
    } else {
        cal_red = $("#comp_red_score").text() - parseInt(card.cost.red);
        $("#comp_red_score").text(cal_red);
        cal_green = $("#comp_red_score").text() - parseInt(card.cost.green);
        $("#comp_red_score").text(cal_green);
        $("#message").text("You Took " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
        setTower("player", card.value);
        $("#player-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
        $.ionSound.play("blast");
    }
}

function build(team, card) {
    if (team == "ai") {
        cal_blue = $("#comp_blue_score").text() - parseInt(card.cost.blue);
        $("#comp_blue_score").text(cal_blue);
        cal_green = $("#comp_red_score").text() - parseInt(card.cost.green);
        $("#comp_red_score").text(cal_green);
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
    }, 250);
}

function bindAnswers(team) {
    if (team == "ai") {
        setTimeout(function () {
            var comp_random_ans = Math.floor(Math.random() * 4);
            var random_ans_li = $('#answerBlock').find('li').eq(comp_random_ans);
            processAnswers($(random_ans_li).attr("id").split("x")[0], team);
        }, 2000);
        switchTurn(team);
    }
    $('.answer').unbind('click').on('click', function () {
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

    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'> <h4 style='color: whitesmoke;'>" + resultMsg + "!! The correct answer is: </h4> <h3 style='color:#3399FF;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();
    setTimeout(function () {
        $("#quiz-content").hide();
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
    }, 1500);
    setTimeout(function(){
        if (answerPayoff > 1) {
            if (team == "ai") {
                $("#message").text("Opponent gained " + answerPayoff + " Resources").css("color","#009933").fadeIn(1000).fadeOut(2000);
                $('#comp_red_score').text(answer_score_red);
                $('#comp_blue_score').text(answer_score_blue);
                $('#comp_green_score').text(answer_score_green);
            } else {
                $("#message").text("You gained " + answerPayoff + " Resources").css("color","#009933").fadeIn(1000).fadeOut(2000);
                $('#red_score').text(answer_score_red);
                $('#blue_score').text(answer_score_blue);
                $('#green_score').text(answer_score_green);
            }
        }
    }, 1500)
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
        setTimeout(function(){player_turn = true;}, 5000)
        setTimeout(function(){$(".ai").css({'opacity': 0.5});}, 5000);
        setTimeout(function() {$('img.comp-frame-glow').hide();}, 5000);
        setTimeout(function(){$(".player").css({'opacity': 1});}, 5000);
        setTimeout(function() {$('img.player-frame-glow').show();}, 5000);
        setTimeout(emptyDeck, 5000);
        setTimeout(drawCards, 5000);
        setTimeout(playerTurn, 5000);
    } else {
        player_turn = false;
        setTimeout(function(){$(".ai").css({'opacity': 1});}, 5000);
        setTimeout(function() {$('img.comp-frame-glow').show();}, 5000);
        setTimeout(function(){$(".player").css({'opacity': 0.5});}, 5000);
        setTimeout(function() {$('img.player-frame-glow').hide();}, 5000);
        setTimeout(emptyDeck, 5000);
        setTimeout(drawCards, 5000);
        setTimeout(aiTurn, 5000);
    }
}


















function getCards() {
    console.log("getCards called");
    animCards = [];
    drawCards();
    showDeck(function() {
        cardsDraw(function() {
            fadeDrawCards(function() {
                showCards(function() {
                    $(".cards").unbind('click').click(function () {
                        cardEnlarge($(this).attr("id"));
//                        cardsToDeck(function(){hideDeck()});
    //                    hideDeck(function() {
                           // emptyAnim();
    //                    });
                    });
                });
            });
        });
    });
// setTimeout(function(){showDeck()},2000);
// setTimeout(function(){cardsDraw()},4500);
// setTimeout(function(){showCards()},5500);
// setTimeout(function(){hideDeck()},6600);
// setTimeout(function(){emptyAnimDeck()},7000);
}

function showDeck(callback){
//console.log("showDeck starts");
    $( "#card1" ).animate({opacity: 1,height: "toggle"}, 1);
    $( "#card2" ).animate({opacity: 1,height: "toggle"}, 1);
    $( "#card3" ).animate({opacity: 1,height: "toggle"}, 1);
    $("#anim").append('<div id="animDeck"></div>');
    animDeck = $("#animDeck").append('<img id="deckImage" style="width: 100%;height: 100%" src="img/towerdefense/cardres.png"/>').css({width: "10%", height: "21%", left: "47.1%",zIndex:"3"}).fadeIn(2000, function() {
//console.log("showDeck ends");
        callback();
    });
    var newDiv1 = animDeck.clone().insertAfter(animDeck);
    var newDiv2 = animDeck.clone().insertAfter(animDeck);
    var newDiv3 = animDeck.clone().insertAfter(animDeck);
    animCards = [newDiv3, newDiv2, newDiv1];
//console.log(animCards);
}
function cardsDraw(callback){
//console.log("cardsDraw starts");
    animCards[0].fadeTo("5000",1);
    animCards[1].fadeTo("5000",1);
    animCards[2].fadeTo("5000",1);
    setTimeout(function(){
        animCards[0].animate({left:"-=10.47%",top:"+=51.2%"},500);
        setTimeout(function() {animCards[1].animate({top:"+=51.2%"},500);}, 500);
        setTimeout(function() {animCards[2].animate({left:"+=10.46%",top:"+=51.2%"},500);}, 1000);
        setTimeout(callback, 1500);
    },600);
}
function fadeDrawCards(callback) {
//console.log("fadeDrawCards starts");
    animCards[0].animate({opacity: 1,height: "toggle"}, 1000);
    animCards[1].animate({opacity: 1,height: "toggle"}, 1000);
    animCards[2].animate({opacity: 1,height: "toggle"}, 1000);
//console.log("fadeDrawCards ends");
    setTimeout(callback, 800);
}
function showCards(callback) {
//console.log("showCards starts");
    $( "#card1" ).animate({opacity: 1,height: "toggle"}, 1000);
    $( "#card2" ).animate({opacity: 1,height: "toggle"}, 1000);
    $( "#card3" ).animate({opacity: 1,height: "toggle"}, 1000);
//console.log("showCards ends");
    setTimeout(callback, 1000);
}
function hideDeck(callback) {
//console.log("hideDeck starts");
    animDeck.fadeOut(2000, function() {
//console.log("hideDeck ends");
        callback();});
}
function emptyAnim() {
//console.log("emptyAnimDeck starts");
    $("#anim").empty();
//console.log("emptyAnimDeck ends");
}

function cardsToDeck(callback){

    animCards[0] = animCards[0].css({zIndex:"2"});
    animCards[1] = animCards[1].css({zIndex:"2"});
    animCards[2] = animCards[2].css({zIndex:"2"});

    switch(callback) {
        case "card1":
            animCards[0] = animCards[0].css({visibility:"hidden"});
            $( "#card2" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card3" ).animate({opacity: 1,height: "toggle"}, 500);
            break;

        case "card2":

            $( "#card1" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card3" ).animate({opacity: 1,height: "toggle"}, 500);
            animCards[1] = animCards[1].css({visibility:"hidden"});
            break;

        case "card3":

            $( "#card1" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card2" ).animate({opacity: 1,height: "toggle"}, 500);
            animCards[2] = animCards[2].css({visibility:"hidden"});
            break;
    }



   setTimeout(function(){
       animCards[0].animate({opacity: 1,height: "toggle"}, 500);
       animCards[1].animate({opacity: 1,height: "toggle"}, 500);
       animCards[2].animate({opacity: 1,height: "toggle"}, 500);
       setTimeout(function(){
           animCards[0].animate({left:"+=10.47%"},500);
           animCards[2].animate({left:"-=10.46%"},500);
   },510);
       setTimeout(function(){
           animCards[0].animate({top:"-=51.2%"},500)
           animCards[1].animate({top:"-=51.2%"},500)
           animCards[2].animate({top:"-=51.2%"},500)
       },1100);
       setTimeout(function(){
           animCards[0].fadeOut(0);
           animCards[1].fadeOut(0);
           animCards[2].fadeOut(0);
       },1700);
   },550);
    setTimeout(callback, 2000);
}


    function cardEnlarge(cardId){

        var img = "#"+cardId;
        var oldDiv1 = $(img);

        var newDiv1 = oldDiv1.clone().insertAfter(oldDiv1);

        oldDiv1.toggle();
//    newDiv1.append("#deck1");

        console.log(cardId);

        switch(cardId) {
            case "card1":
                newDiv1.animate({top:"-200%",left:"28%",width:"50%",height:"180%"});
                break;

            case "card2":
                newDiv1.animate({top:"-200%",left:"28%",width:"50%",height:"180%"});
                break;

            case "card3":
                newDiv1.animate({top:"-200%",left:"28%",width:"50%",height:"180%"});
                break;
        }

        newDiv1.append('<img id="close" src="img/towerdefense/close.png"style="bottom: 10%;right: 30%;position: absolute" />' +
            '<img id="btn" src="img/towerdefense/tick.png"style="bottom: 10%;left: 30%;position: absolute" />');


        $("#btn").click(function () {
            newDiv1.animate({top:"-113%",left: "129%",width:"10%",height:"30%"}, 500);
            setTimeout(function(){cardsToDeck(cardId);},600);
            $("#btn").hide();
            $("#close").hide();
            newDiv1.fadeOut(500);
//            oldDiv1.toggle();
        });

        $("#close").click(function () {
            switch(cardId) {
                case "card1":
                    newDiv1.animate({left: "13%", width: "24%", height: "86%",top:"7%"});;
                    break;

                case "card2":
                    newDiv1.animate({left: "38%", width: "24%", height: "86%",top:"7%"});
                    break;

                case "card3":
                    newDiv1.animate({left: "63%", width: "24%", height: "86%",top:"7%"});
                    break;
            }

// setTimeout(function(){newDiv1.animate({opacity:"1",height:"toggle"},0)},1500);
            $("#btn").hide();
            $("#close").hide();
            setTimeout(function(){oldDiv1.animate({opacity:"1",height:"toggle"},0)},1500);
        });



    }
