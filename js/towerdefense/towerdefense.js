var blinkit;
var playerHt = 0;
var aiHt = 0;
var cal_red, cal_blue, cal_green;
var player;
var gameDeck;
var draw = [];
var flag = 0;
var newHt;
var gameOn;
var selectCard;
var animDeck;
var animCards;
var cardId;
var selectedCard;
var delay;

$(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
    blinkit = setInterval(blinker, 2000);
    $('#startClicker').on('click', function () {
        $('.gameTitle').fadeOut();
        $('.stats-wrapper').fadeIn();
        clearInterval(blinkit);
        statsWrapper();
    });
});
function statsWrapper(){
    $('.How').fadeIn();
    howTo();
}
function howTo() {
    blinkit = setInterval(blinker2, 2000);
    $('#start-btn').on('click', function () {
        $('.How').fadeOut();
        $('.game-wrapper').fadeIn();
        $('#cloud-container').fadeIn();
        clearInterval(blinkit);
        initGame();
    });
}

function blinker() {
    $('#startClicker').fadeOut(500, function () {
        $('#startClicker').fadeIn(500);
    });
}

function blinker2() {
    $('#start').fadeOut(500, function () {
        $('#start').fadeIn(500);
    });
}

function initGame() {
    gameOn = true;
    player = true;
    selectCard = false;

    initTowers();
    scoreData();
    initDeck();
    $(".ai").css({'opacity': 0.5})
    $('img.comp-frame-glow').hide();
    setTimeout(function () {playerTurn("new");}, 500);
}

function initTowers() {
    setTower('player', game.startHeight);
    setTower('ai', game.startHeight );
}

function scoreData() {
    var red_val = 10;
    var blue_val = 20;
    var green_val = 0;
    var comp_red_val = 10;
    var comp_blue_val = 20;
    var comp_green_val = 0;
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

function checkFlag() {
    if (flag+2 < gameDeck.length)
        return true;
    else
        return false;
}

function initDraw() {
    emptyDraw();
    if (checkFlag()) {
        for (var i = 0; i < 3; i++) {
            draw.push(gameDeck[flag]);
            flag++;
        }
    } else {
        console.log("reshuffling");
        flag = 0;
        initDeck();
        initDraw();

    }
}

function getCards() {
    console.log("getCards called");
    animCards = [];
    emptyAnim();
    drawCards();
    showDeck(function() {
        cardsDraw(function() {
            fadeDrawCards(function() {
                showCards(function() {
                    hideDeck();
                });
            });
        });
    });
}

function toggleCards(op, resource) {
    if(resource == "resource") {
        $("#"+cardId).animate({opacity: 1,height: "toggle"}, 1);
    } else {
        $( "#card1" ).animate({opacity: op,height: "toggle"}, 1);
        $( "#card2" ).animate({opacity: op,height: "toggle"}, 1);
        $( "#card3" ).animate({opacity: op,height: "toggle"}, 1);
    }
}

function drawCards() {
    $.each(draw, function (index, elm) {
        $('.card-container').find('.cards').eq(index).append('<img id=' + elm.id + '_' + elm.cost.red + '_' + elm.cost.blue + '_' + elm.cost.green + '_' + elm.value + '" src="' + elm.image + '" class="card-image"/>')
    });
}

function showDeck(callback){
    //console.log("showDeck starts");
    toggleCards(1);
    $("#anim").append('<div id="animDeck"></div>');
    animDeck = $("#animDeck").append('<img id="deckImage" style="width: 100%;height: 100%" src="img/towerdefense/card_back.png"/>').css({width: "10%", height: "21%", left: "47.1%", zIndex:"3"}).fadeIn(2000);
    setTimeout(function() {
        var newDiv1 = animDeck.clone().insertAfter(animDeck);
        var newDiv2 = animDeck.clone().insertAfter(animDeck);
        var newDiv3 = animDeck.clone().insertAfter(animDeck);
        animCards = [newDiv3, newDiv2, newDiv1];
        callback();
    }, 1500);
}

function cardsDraw(callback){
    //console.log("cardsDraw starts");
    animCards[0].fadeTo("5000",1);
    animCards[1].fadeTo("5000",1);
    animCards[2].fadeTo("5000",1);
    setTimeout(function(){
        animCards[2].animate({left:"-=10.47%",top:"+=51.2%"},300);
        setTimeout(function() {animCards[1].animate({top:"+=51.2%"},300);}, 300);
        setTimeout(function() {animCards[0].animate({left:"+=10.46%",top:"+=51.2%"},300);}, 600);
        setTimeout(callback, 900);
    },600);

}

function fadeDrawCards(callback) {
    //console.log("fadeDrawCards starts");
    animCards[2].animate({opacity: 1,height: "toggle"}, 700);
    animCards[1].animate({opacity: 1,height: "toggle"}, 700);
    animCards[0].animate({opacity: 1,height: "toggle"}, 700);
    //console.log("fadeDrawCards ends");
    setTimeout(callback, 500);
}

function showCards(callback) {
    //console.log("showCards starts");
    $( "#card1" ).animate({opacity: 1,height: "toggle"}, 700);
    $( "#card2" ).animate({opacity: 1,height: "toggle"}, 700);
    $( "#card3" ).animate({opacity: 1,height: "toggle"}, 700);
    //console.log("showCards ends");
    setTimeout(callback, 1000);
}

function hideDeck() {
    animDeck.fadeOut(1000);
}

function emptyAnim() {
    $("#anim").empty();
}



function playerTurn(call) {
    if(call == "new") {
        delay = 3000;
        setTimeout(function() {
            $("#message").text("Player's Turn").css("color","white").fadeIn(1000).fadeOut(2000);
        }, 500);
    } else {
        delay = 0;
    }

    setTimeout(function() {
        console.log("Player:");

        if(call != "resource")
            initDraw();

        setTimeout(function() {
            if(validateDraw("player")) {
                player = true;
                if(call != "resource")
                    getCards();

            } else {
                flag = flag+3;
                playerTurn();
            }
        }, 500);

        $(".cards").unbind('click').click(function () {
            if(player) {
                player = false;
                cardId = $(this).attr("id");
                switch (cardId) {
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

                if (checkCost("player", card)) {
                    cardEnlarge("player", function() {
                        cardClicked(card, "player", "ai", function() {
                            if(gameOn) switchTurn("player");
                        });
                    });
//                $.when(cardClicked(card, "player", "ai")).done(function(){switchTurn("player");});
                } else {
                    $("#message").text("Not enough Resources").fadeIn(1000).fadeOut(1000);
                    player = true;
                    setTimeout(function() {playerTurn("resource");}, 1000);
                }
            }
        })
    }, delay);

}

function aiTurn(call) {
    if(call == "new") {
        delay = 3000;
        setTimeout(function() {
            $("#message").text("Opponent's Turn").css("color","white").fadeIn(1000).fadeOut(2000);
        }, 500);
    } else {delay = 0;}

    setTimeout(function() {
        if(player == false) {
            console.log("AI:");

            if(call != "resource")
                initDraw();

            setTimeout(function() {
                if(validateDraw("ai")) {

                    var random = Math.floor((Math.random() * 3));
                    var card = draw[random];
                    cardId = "card"+(random+1);

                    if(checkCost("ai", card)) {
                        getCards();
                    } else {
                        aiTurn("resource");
                    }


                    setTimeout(function() {
                        if (checkCost("ai", card)) {
                            cardEnlarge("ai", function() {
                                cardClicked(card, "ai", "player", function() {
                                    if(gameOn) switchTurn("ai");
                                });
                            });
                        }
                    }, 8000)

                } else {aiTurn();}
            }, 500);
        }
    }, delay);

}

function validateDraw(team) {
    if (checkCost(team, draw[0]) || checkCost(team, draw[1]) || checkCost(team, draw[2])) {
        return true;
    } else {
//        $("#message").text("Re-drawing Cards").fadeIn(1000).fadeOut(1000);
        return false;
    }
}

function cardClicked(card, byTeam, onTeam, callback) {
    console.log("cardClicked called by "+byTeam);
    switch (card.category) {
        case "attack":
            attack(byTeam, onTeam, card, callback);
            break;
        case "build":
            build(byTeam, card, callback);
            break;
        case "bonus":
            bonus(byTeam, onTeam, card, callback);
            break;
        case "resource":
            stockUp(byTeam, onTeam, card, callback);
            break;
    }
}

function checkWin(callback) {
    $(".cards").eq(3).remove();
    console.log("checking win");
    if (aiHt <= 0) {
        setTimeout(function(){
            $("#message").html("You Win!! <br /><a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").css("color","#3399FF").fadeIn(1000);
        },3000);
        gameOn = false;
    }
    if (playerHt <= 0) {
        setTimeout(function(){
            $("#message").html("You Loose!! <br /><a href='' style='text-decoration: underline; color: whitesmoke; '>Click Here<a/> to Play Again").css("color","red").fadeIn(1000);
        },3000);
        gameOn = false;
    }

    setTimeout(callback, 1000);
}

function attack(byTeam, onTeam, card, callback) {
    console.log("attack called by "+byTeam);
    if (onTeam == "ai") {
        cardMoveRight();
        setTimeout(function() {
            cal_red = $("#red_score").text() - parseInt(card.cost.red);
            $("#red_score").text(cal_red);
            cal_green = $("#green_score").text() - parseInt(card.cost.green);
            $("#green_score").text(cal_green);
            $("#message").text("You Dealt " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
            setTower("ai", card.value);
            $("#ai-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
            $.ionSound.play("blast");
        }, 1000);

    } else {
        cardMoveLeft();
        setTimeout(function() {
            cal_red = $("#comp_red_score").text() - parseInt(card.cost.red);
            $("#comp_red_score").text(cal_red);
            cal_green = $("#comp_green_score").text() - parseInt(card.cost.green);
            $("#comp_green_score").text(cal_green);
            $("#message").text("You Took " + parseInt(card.value *(-1)) + " Damage").css("color","red").fadeIn(1000).fadeOut(2000);
            setTower("player", card.value);
            $("#player-tower-effect").find('.build_image1').show().delay(1000).fadeOut();
            $.ionSound.play("blast");
        }, 1000);

    }

    setTimeout(function() {checkWin(callback);}, 3000);
}

function build(byTeam, card, callback) {
    console.log("build called by "+byTeam);
    if (byTeam == "ai") {
        cardMoveRight();
        setTimeout(function() {
            cal_blue = $("#comp_blue_score").text() - parseInt(card.cost.blue);
            $("#comp_blue_score").text(cal_blue);
            cal_green = $("#comp_green_score").text() - parseInt(card.cost.green);
            $("#comp_green_score").text(cal_green);
            $("#message").text("Opponent Built Tower by " + card.value).css("color","#3399FF").fadeIn(1000).fadeOut(2000);
            setTower("ai", card.value);
            $("#ai-tower-effect").find('.build_image').show().delay(1000).fadeOut();
            $.ionSound.play("build");
        }, 1000);

    } else {
        cardMoveLeft();
        setTimeout(function() {
            cal_blue = $("#blue_score").text() - parseInt(card.cost.blue);
            $("#blue_score").text(cal_blue);
            cal_green = $("#green_score").text() - parseInt(card.cost.green);
            $("#green_score").text(cal_green);
            $("#message").text("You Built Tower by " + card.value).css("color","#3399FF").fadeIn(1000).fadeOut(2000);
            setTower("player", card.value);
            $("#player-tower-effect").find('.build_image').show().delay(1000).fadeOut();
            $.ionSound.play("build");
        }, 1000);

    }

    setTimeout(function() {checkWin(callback);}, 3000);
}

function bonus(byTeam, onTeam, card, callback) {
    console.log("bonus called by "+byTeam);
    if(card.cost.red > 0){
        attack(byTeam, onTeam, card, callback);
    } else {
        build(byTeam, card, callback);
    }
}

function stockUp(byTeam, onTeam, card, callback) {
    console.log("stovkUp called by "+byTeam);
    if(card.cost.red == -1) {
        stockRed(byTeam, card, callback);
    } else {
        if(card.cost.blue == -1) {
            stockBlue(byTeam, card, callback);
        } else {
            stockGreen(byTeam, card, callback);
        }
    }
}

function stockRed(byTeam, card, callback) {
    console.log("stockRed called by "+byTeam);
    if(byTeam == "ai") {
        redResRight();
        setTimeout(function() {
            cal_red = parseInt($("#comp_red_score").text()) + parseInt(card.value);
            $("#comp_red_score").text(cal_red);
            $("#message").text("Opponent gained  " + card.value + " Rubies").css("color","red").fadeIn(1000).fadeOut(2000);
        }, 1000);

    } else {
        redResLeft();
        setTimeout(function() {
            cal_red =  parseInt($("#red_score").text()) + parseInt(card.value);
            $("#red_score").text(cal_red);
            $("#message").text("You gained  " + card.value + " Rubies").css("color","red").fadeIn(1000).fadeOut(2000);
        }, 1000);

    }

    setTimeout(function() {checkWin(callback);}, 4000);
}

function stockBlue(byTeam, card, callback) {
    console.log("stovkBlue called by "+byTeam);
    if(byTeam == "ai") {
        blueResRight();
        setTimeout(function() {
            cal_blue = parseInt($("#comp_blue_score").text()) + parseInt(card.value);
            $("#comp_blue_score").text(cal_blue);
            $("#message").text("Opponent gained  " + card.value + " Sapphires").css("color","#3399FF").fadeIn(1000).fadeOut(2000);
        }, 1000);

    } else {
        blueResLeft();
        setTimeout(function() {
            cal_blue =  parseInt($("#blue_score").text()) + parseInt(card.value);
            $("#blue_score").text(cal_blue);
            $("#message").text("You gained  " + card.value + " Sapphires").css("color","#3399FF").fadeIn(1000).fadeOut(2000);
        }, 1000);

    }

    setTimeout(function() {checkWin(callback);}, 4000);
}

function stockGreen(byTeam, card, callback) {
    console.log("stockGreen called by "+byTeam);
    if(byTeam == "ai") {
        selectedCard.css({'opacity': 0.5});
        getQuestion(byTeam, card, "ai", callback);
    } else {
        selectedCard.css({'opacity': 0.5});
        getQuestion(byTeam, card, "player", callback);
    }

}



function checkCost(team, card) {
    if (team == "player") {
        //console.log("checking card");
        cal_red = parseInt($("#red_score").text()) - card.cost.red;
        cal_blue = parseInt($("#blue_score").text()) - card.cost.blue;
        cal_green = parseInt($("#green_score").text()) - card.cost.green;
        if (cal_red >= 0 && cal_blue >= 0 && cal_green >= 0)
            return true;
        else
            return false;
    } else {
        //console.log("checking card");
        cal_red = parseInt($("#comp_red_score").text()) - card.cost.red;
        cal_blue = parseInt($("#comp_blue_score").text()) - card.cost.blue;
        cal_green = parseInt($("#comp_green_score").text()) - card.cost.green;
        if (cal_red >= 0 && cal_blue >= 0 && cal_green >= 0)
            return true;
        else
            return false;
    }
}

function emptyDraw() {
    draw = [];
    $(".cards").empty();
}

function getQuestion(byTeam, card, chance, callback) {
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
        bindAnswers(byTeam, card, chance, callback);
    }, 250);
}

function bindAnswers(byTeam, card, chance, callback) {
    if (byTeam == "ai") {
        setTimeout(function () {
            var comp_random_ans = Math.floor(Math.random() * 4);
            var random_ans_li = $('#answerBlock').find('li').eq(comp_random_ans);
            processAnswers($(random_ans_li).attr("id").split("x")[0], byTeam, card, callback);
        }, 2000);
    }
    $('.answer').unbind('click').on('click', function () {
        if(chance == "player")
            processAnswers($(this).attr("id").split("x")[0], byTeam, card, callback);
    });
}

function processAnswers(answer, byTeam, card, callback) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = 0;
    if(data.split('||')[0] != 0)
        answerPayoff = parseInt(card.value);

    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'> <h4 style='color: whitesmoke;'>" + resultMsg + "!! The correct answer is: </h4> <h3 style='color:#3399FF;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();

    setTimeout(function () {
        $("#quiz-content").hide();
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
        selectedCard.css({'opacity': 1});
    }, 1500);
    setTimeout(function(){
        console.log(answerPayoff);
        if (answerPayoff > 0) {
            if (byTeam == "ai") {
                greenResRight();
                setTimeout(function() {
                    $("#message").text("Opponent gained  " + card.value + " Emeralds").css("color","#009933").fadeIn(1000).fadeOut(2000);
                    cal_green = parseInt($("#comp_green_score").text()) + answerPayoff;
                    $("#comp_green_score").text(cal_green);
                }, 1000);

            } else {
                greenResLeft();
                setTimeout(function() {
                    $("#message").text("You gained  " + card.value + " Emeralds").css("color","#009933").fadeIn(1000).fadeOut(2000);
                    cal_green = parseInt($("#green_score").text()) + answerPayoff;
                    $("#green_score").text(cal_green);
                }, 1000);

            }

            setTimeout(function() {checkWin(callback);}, 3000);

        } else {
            console.log("shrinking");
            cardShrink();
            setTimeout(function() {
                toggleCards(1,"resource");
                $(".cards").eq(3).remove();
                cardId = "";
                checkWin(callback);
            }, 300);
        }
    }, 2000);

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
    console.log("switching turn from "+from);
    console.log("checking player: "+player);
    deckFadeIn(function() {
        cardsToDeck(function() {
            hideDeck();
        });
    });
    setTimeout(function() {
        if (from == "player") {
            animSwitchTurn(from, function() {
                player = false;
                aiTurn("new");
            });
        } else {
            animSwitchTurn(from, function() {
                player = true;
                playerTurn("new");
            });
        }
    }, 4000);
}

function animSwitchTurn(from, callback) {
    console.log("animating switching turn");
    if (from == "player") {
        $(".ai").css({'opacity': 1});
        $('img.comp-frame-glow').show();
        $(".player").css({'opacity': 0.5});
        $('img.player-frame-glow').hide();
    } else {
        $(".ai").css({'opacity': 0.5});
        $('img.comp-frame-glow').hide();
        $(".player").css({'opacity': 1});
        $('img.player-frame-glow').show();
    }

    console.log("switching turn");

    callback();
}

function playerAnimOff() {
    $(".ai").css({'opacity': 0.5});
    $('img.comp-frame-glow').hide();

    $(".player").css({'opacity': 0.5});
    $('img.player-frame-glow').hide();
}

function cardEnlarge(chance, callback){
    var img = "#"+cardId;
    var oldDiv1 = $(img);
    console.log(oldDiv1);
    selectedCard = oldDiv1.clone();
    $(".card-container").append(selectedCard);
//    console.log(selectedCard.attr("id",cardId+"cardx"));
//    console.log(selectedCard.attr("id"));
    oldDiv1.toggle();
    console.log(cardId);
    selectedCard.animate({top:"-200%",left:"28%",width:"50%",height:"180%"});

    selectedCard.append('<img class="buttons" id="close" src="img/towerdefense/close.png"style="bottom: 6%;right: 30%;position: absolute" />' +
        '<img class="buttons" id="btn" src="img/towerdefense/tick.png"style="bottom: 6%;left: 30%;position: absolute" />');

    $("#close").unbind('click').click(function () {
        player = true;
        cardShrink();
        setTimeout(function() {
            $(".cards").eq(3).remove();
        }, 400);
    })

    $("#btn").click(function () {
        if(chance == "player") {
            callback();
        }
    });

    if(chance == "ai") {
        setTimeout(function(){
            callback();
        },600);
    }
}

function cardShrink() {
    switch(cardId) {
        case "card1":
            selectedCard.animate({left: "13%", width: "24%", height: "86%",top:"7%"});
            break;

        case "card2":
            selectedCard.animate({left: "38%", width: "24%", height: "86%",top:"7%"});
            break;

        case "card3":
            selectedCard.animate({left: "63%", width: "24%", height: "86%",top:"7%"});
            break;
    }

    $("#btn").hide();
    $("#close").hide();
    setTimeout(function(){
//        $(".cards").eq(3).remove();
        $("#"+cardId).animate({opacity:"1",height:"toggle"},0);
    },400);
}

function cardsToDeck(callback){

    animCards[0] = animCards[0].css({zIndex:"2"});
    animCards[1] = animCards[1].css({zIndex:"2"});
    animCards[2] = animCards[2].css({zIndex:"2"});

    switch(cardId) {
        case "card1":
            animCards[2] = animCards[2].css({visibility:"hidden"});
            $( "#card2" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card3" ).animate({opacity: 1,height: "toggle"}, 500);
            break;

        case "card2":
            animCards[1] = animCards[1].css({visibility:"hidden"});
            $( "#card1" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card3" ).animate({opacity: 1,height: "toggle"}, 500);
            break;

        case "card3":
            animCards[0] = animCards[0].css({visibility:"hidden"});
            $( "#card1" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card2" ).animate({opacity: 1,height: "toggle"}, 500);
            break;

        default:
            $( "#card1" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card2" ).animate({opacity: 1,height: "toggle"}, 500);
            $( "#card3" ).animate({opacity: 1,height: "toggle"}, 500);
    }



    setTimeout(function(){
        animCards[2].animate({opacity: 1,height: "toggle"}, 500);
        animCards[1].animate({opacity: 1,height: "toggle"}, 500);
        animCards[0].animate({opacity: 1,height: "toggle"}, 500);
        setTimeout(function(){
            animCards[2].animate({left:"+=10.47%"},500);
            animCards[0].animate({left:"-=10.46%"},500);
        },510);
        setTimeout(function(){
            animCards[2].animate({top:"-=51.2%"},500)
            animCards[1].animate({top:"-=51.2%"},500)
            animCards[0].animate({top:"-=51.2%"},500)
        },1100);
        setTimeout(function(){
            animCards[2].fadeOut(0);
            animCards[1].fadeOut(0);
            animCards[0].fadeOut(0);
            toggleCards(0);
            callback();
        },1700);
    },550);
}

function deckFadeIn(callback) {
    animDeck.fadeIn(1000);
    setTimeout(callback, 1000);
}

function cardMoveRight() {
    console.log("moving right");
    $("#btn").hide();
    $("#close").hide();
    selectedCard.animate({top: "-113%", left: "129%", width: "10%", height: "30%"}, 500);
    selectedCard.fadeOut(500);
    setTimeout(function () {
        $(".cards").eq(3).remove();
    }, 1000);
}

function cardMoveLeft() {
    console.log("moving left");
    $("#btn").hide();
    $("#close").hide();
    selectedCard.animate({top: "-113%", left: "-48%", width: "10%", height: "30%"}, 500);
    selectedCard.fadeOut(500);
    setTimeout(function () {
        $(".cards").eq(3).remove();
    }, 1000);
}

function redResLeft() {
    selectedCard.css('z-index',4).animate({top: "28.3%", left: "-17.3%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();
}

function blueResLeft() {
    selectedCard.css('z-index',4).animate({top: "56.3%", left: "-17.3%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();

}

function greenResLeft() {
    selectedCard.css('z-index',4).animate({top: "81.3%", left: "-12%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();


}

function redResRight() {
    selectedCard.css('z-index',4).animate({top: "28.3%", left: "114.3%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();

}

function blueResRight() {
    selectedCard.css('z-index',4).animate({top: "57.3%", left: "114.3%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();
}

function greenResRight() {
    selectedCard.css('z-index',4).animate({top: "79.3%", left: "109.3%", width: "2%", height: "6%"}, 1000).fadeOut();
    $("#btn").hide();
    $("#close").hide();
}
