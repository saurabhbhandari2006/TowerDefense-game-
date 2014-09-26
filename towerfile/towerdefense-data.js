window.user = {};

window.theme = {};
theme.background = "img/towerdefense/background.jpg";
theme.dropRatio = 0.93;

window.game = {};
game.startHeight = 50;
game.maxHeight = 5;

var myCards = [
    {name: "Battering Ram", category: "attack", value: "-6", cost: {red: 6, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "Battering Ram", category: "attack", value: "-6", cost: {red: 6, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "Battering Ram", category: "attack", value: "-6", cost: {red: 6, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "Catapult", category: "attack", value: "-12", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "Catapult", category: "attack", value: "-12", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "Trebuchet", category: "attack", value: "-20", cost: {red: 15, blue: 0, green:0 },"image": "img/towerdefense/cardred.png"},
    {name: "Trebuchet", category: "attack", value: "-20", cost: {red: 15, blue: 0, green:0 },"image": "img/towerdefense/cardred.png"},

    {name: "Mortar", category: "attack", value: "-14", cost: {red: 12, blue: 0, green: 5},"image": "img/towerdefense/cardred.png"},
    {name: "Mortar", category: "attack", value: "-14", cost: {red: 12, blue: 0, green: 5},"image": "img/towerdefense/cardred.png"},

    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Fortified Tower", category: "build", value: "10", cost: {red: 0, blue: 5, green: 0},"image": "img/towerdefense/cardblue.png"},

    {name: "Bailey", category: "build", value: "20", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Bailey", category: "build", value: "20", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Bailey", category: "build", value: "20", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Bailey", category: "build", value: "20", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Belfry", category: "build", value: "30", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Belfry", category: "build", value: "30", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/cardblue.png"},

    {name: "Firing lore", category: "attack", value: "-20", cost: {red: 7, blue: 0, green: 7},"image": "img/towerdefense/cardgreen.png"},

    {name: "The Mangonel", category: "attack", value: "-30", cost: {red: 10, blue: 0, green: 10},"image": "img/towerdefense/cardgreen.png"},

    {name: "Blood Mortar", category: "attack", value: "-40", cost: {red: 20, blue: 0, green: 20},"image": "img/towerdefense/cardgreen.png"},

    {name: "Strong Belfry", category: "build", value: "50", cost: {red: 0, blue: 20, green: 20},"image": "img/towerdefense/cardgreen.png"},

    {name: "Dominion Tower", category: "build", value: "40", cost: {red: 0, blue: 10, green: 20},"image": "img/towerdefense/cardgreen.png"},

    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Resource Card",category: "resource", value: "0", cost: {red: 0, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"}

]

function shuffle(o) {
    for (var j, x, i = o.length; i; j =( Math.floor(Math.random() * i)+1), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};