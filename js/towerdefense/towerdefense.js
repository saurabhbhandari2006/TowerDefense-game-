//var blinkit;
var playerHt = 0;
var aiHt = 0;
var player_turn = true;
var red, blue, green, attack , build;
var cal_red, cal_blue, cal_green;
var comp_cal_red, comp_cal_blue, comp_cal_green;
var random_button;
var keyArray;
var player;
var card_type;
var gameDeck;
<<<<<<< HEAD
var flag=0;
var result;
=======
var draw;
var flag = 3;
>>>>>>> f98cbe1f677c3fede5fbc082078b0a6f5ca58642

$(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
//    blinkit = setInterval(blinker, 2000);
//    $('#startClicker').on('click', function () {
//        $('.gameTitle').fadeOut();
    $('.game-wrapper').fadeIn();
//        clearInterval(blinkit);
    initGame();
//    })


});

//function blinker() {
//    $('#startClicker').fadeOut(500, function () {
//        $('#startClicker').fadeIn(500);
//    });
//}

function initGame() {
    initDeck();
    initTowers();
    playerTurn();

}

function setTower(team, delta) {
    var towerHt = (team == "player") ? playerHt : aiHt;
    var teamTower = $('#' + team + '-tower');
    var newHt = Math.min(Math.max(parseInt(towerHt) + parseInt(delta), 0), parseInt(game.maxHeight * 10));
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
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state' + top + '.png" id="' + team + '-broken-towerblock" class="tower-block broken" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
        }
    }
}

<<<<<<< HEAD

function initDeck() {
    gameDeck=shuffle(myCards);
    drawCards(3);
    }

function drawCards(value) {

    result = [];
    if (flag+2 < 12){
        for (var i = 0; i < value; i++) {
            result.push(gameDeck[flag]);
            flag++;
        }}
    else
    {
        flag =0;
        initDeck();
    }
    $.each(result, function (index, elm) {
    $('.card-container').find('.cards').eq(index).append('<img id='+elm.id+'_'+elm.cost.red+'_'+elm.cost.blue+'_'+elm.cost.green+'_'+elm.value+'" src="'+elm.image+'" class="card-image"/>')
=======
function initDeck(index) {
    gameDeck=shuffle(myCards);
    drawCards();
}

function drawCards() {

    draw = [];
    if(flag+2 < 12) {
        for (var i = 0; i < 3; i++) {
            draw.push(gameDeck[flag]);
            flag++;
        }
    }
    else {
        flag = 0;
        initDeck();
    }

    $.each(draw, function(index, elm){
        $('.card-container').find('.cards').eq(index).append('<img id='+elm.id+'_'+elm.cost.red+'_'+elm.cost.blue+'_'+elm.cost.green+'_'+elm.value+'" src="'+elm.image+'" class="card-image"/>')

>>>>>>> f98cbe1f677c3fede5fbc082078b0a6f5ca58642
    });
}

function initTowers() {
    setTower('player', game.startHeight);
    setTower('ai', game.startHeight + 18);
}

function playerTurn() {
<<<<<<< HEAD
//    drawCards(1);
    $(".cards").unbind('click').click(function () {
        console.log($(this));

        cardClicked($(this).attr("id"), "player", "ai");

=======
    $(".cards").unbind('click').click(function () {
        switch($(this).attr("id")) {
            case "card1": card = draw[0]; break;
            case "card2": card = draw[1]; break;
            case "card3": card = draw[2]; break;

        }
//        if(card.category == "attack")
            console.log(card.cost);
            console.log(card.cost.red);
        cardClicked(card, "player", "ai");
>>>>>>> f98cbe1f677c3fede5fbc082078b0a6f5ca58642
    })
}

function aiTurn() {
    /* Randomly pick from one of the active cards*/
<<<<<<< HEAD
    var random = flag -(Math.floor(Math.random()*3)+flag-2)
    var card = result[random];
=======
    var random = flag - Math.floor((Math.random()*3)+(flag-2));
    var card = draw[random];
>>>>>>> f98cbe1f677c3fede5fbc082078b0a6f5ca58642
    cardClicked(card, "player", "ai");
}

function cardClicked(card, byTeam, onTeam) {

    switch(card.category) {
        case "attack": attack(onTeam, card); break;
        case "build": build(byTeam, card); break;
    }

    if (card.category == "attack") {
        attack(onTeam, card);
    } else {
        if ($card.hasClass('build')) {
            build(byTeam, parseInt(id.split("_")[2]));
        } else {
            stockUp(byTeam, parseInt(id.split("_")[2]), parseInt(id.split("_")[3]));
        }

    }
}

function attack(team, card) {
    /*attacklogic*/
    (team == "ai") ? aiTurn() : playerTurn();

}

function build(team, card) {
    /*buildlogic*/
    (team == "ai") ? playerTurn() : aiTurn();
}

function stockUp(team, card) {
    /*resource logic*/
    (team == "ai") ? playerTurn() : aiTurn();
}



/*----------------------------------------------------*/

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

function getQuestion() {
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
        bindAnswers();
    }, 1000);
}

function bindAnswers() {
    console.log("player turn in bindAnswers :- " + player_turn);
    if (player_turn == false) {

        setTimeout(function () {
            var comp_random_ans = Math.floor(Math.random() * 4);
            console.log("comp randomly answered :- " + comp_random_ans);
            var random_ans_li = $('#answerBlock').find('li').eq(comp_random_ans);
            processAnswers($(random_ans_li).attr("id").split("x")[0]);
        }, 3000);


    }

    $('.answer').unbind('click').on('click', function () {
        processAnswers($(this).attr("id").split("x")[0]);
    });
}

function processAnswers(answer) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = parseInt(data.split('||')[0]);
    console.log("cal_green", +cal_green);
    var answer_score = cal_green + answerPayoff;

//  var addplay=5;
//  $('#green').text(addplay)

    if (answerPayoff > 1) {
        $('#green_score').text(answer_score);
    }
    else {
        $('#green_score').text(answer_score);
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

function card_swape() {
    keyArray = shuffle(myCards);
    var red_val, blue_val, green_val, attack_val, build_val, card_type, card_image;
    $.each(keyArray, function (index, value) {
        red_val = eval("myCards[0]." + value + ".red");
        blue_val = eval("myCards[0]." + value + ".blue");
        green_val = eval("myCards[0]." + value + ".green");
        attack_val = eval("myCards[0]." + value + ".attack");
        build_val = eval("myCards[0]." + value + ".build");
        card_type = eval("myCards[0]." + value + ".type");
        card_image = eval("myCards[0]." + value + ".image");

//                $('.card-container').find('.cards').eq(index).append('<img data-val-type="' + card_type + '" data-val-green="' + green_val + '" data-val-build="' + build_val + '" data-val-blue="' + blue_val + '" data-val-red="' + red_val + '" src="' + value + '" data-val-attack="' + attack_val + '">');
        $('.card-container').find('.cards').eq(index).append('<img data-val-type="' + card_type + '" data-val-green="' + green_val + '"data-val-build="' + build_val + '" data-val-blue="' + blue_val + '" data-val-red="' + red_val + '" data-val-attack="' + attack_val + '" src="' + card_image + '" class="card-image"/>');

    });
}