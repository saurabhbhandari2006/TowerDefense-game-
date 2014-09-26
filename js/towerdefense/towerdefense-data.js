window.user = {};

window.theme = {};
theme.background = "img/towerdefense/background.jpg";
theme.dropRatio = 0.93;

window.game = {};
game.startHeight = 50;
game.maxHeight = 5;

var myCards = [
    //Attack Cards
    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "The Catapult", category: "attack", value: "-10", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Catapult", category: "attack", value: "-10", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    {name: "Siege Tower", category: "attack", value: "-12", cost: {red: 12, blue: 0, green:0 },"image": "img/towerdefense/cardred.png"},
    {name: "Siege Tower", category: "attack", value: "-12", cost: {red: 12, blue: 0, green:0 },"image": "img/towerdefense/cardred.png"},

    {name: "The Tosekiki", category: "attack", value: "-14", cost: {red: 14, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},
    {name: "The Tosekiki", category: "attack", value: "-14", cost: {red: 14, blue: 0, green: 0},"image": "img/towerdefense/cardred.png"},

    //Build Cards
    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/cardblue.png"},

    {name: "Brick Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Brick Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Brick Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/cardblue.png"},

    {name: "Stone Masonry", category: "build", value: "20", cost: {red: 0, blue: 20, green: 0},"image": "img/towerdefense/cardblue.png"},
    {name: "Stone Masonry", category: "build", value: "20", cost: {red: 0, blue: 20, green: 0},"image": "img/towerdefense/cardblue.png"},

    //Bonus Attack Cards
    {name: "Firing Lore", category: "bonus", value: "-16", cost: {red: 5, blue: 0, green: 5},"image": "img/towerdefense/cardgreen.png"},
    {name: "Firing Lore", category: "bonus", value: "-16", cost: {red: 5, blue: 0, green: 5},"image": "img/towerdefense/cardgreen.png"},

    {name: "The Mangonel", category: "bonus", value: "-20", cost: {red: 10, blue: 0, green: 10},"image": "img/towerdefense/cardgreen.png"},
    {name: "The Mangonel", category: "bonus", value: "-20", cost: {red: 10, blue: 0, green: 10},"image": "img/towerdefense/cardgreen.png"},

    {name: "Blood Mortar", category: "bonus", value: "-30", cost: {red: 20, blue: 0, green: 20},"image": "img/towerdefense/cardgreen.png"},
    {name: "Blood Mortar", category: "bonus", value: "-30", cost: {red: 20, blue: 0, green: 20},"image": "img/towerdefense/cardgreen.png"},

    //Bonus Build Cards
    {name: "Strong Belfry 1", category: "bonus", value: "30", cost: {red: 0, blue: 20, green: 20},"image": "img/towerdefense/cardgreen.png"},
    {name: "Strong Belfry 2", category: "bonus", value: "30", cost: {red: 0, blue: 20, green: 20},"image": "img/towerdefense/cardgreen.png"},
    {name: "Dominion Tower 3", category: "bonus", value: "40", cost: {red: 0, blue: 25, green: 25},"image": "img/towerdefense/cardgreen.png"},
    {name: "Dominion Tower 4", category: "bonus", value: "40", cost: {red: 0, blue: 25, green: 25},"image": "img/towerdefense/cardgreen.png"},

    //Red Resource Cards
    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},

    {name: "Sack of Rubies", category: "resource", value: "10", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Sack of Rubies", category: "resource", value: "10", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},

    {name: "Ruby Mine", category: "resource", value: "20", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Ruby Mine", category: "resource", value: "20", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/cardres.png"},

    //Blue Resource Cards
    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},

    {name: "Sack of Sapphires", category: "resource", value: "10", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Sack of Sapphires", category: "resource", value: "10", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},

    {name: "Sapphire Mine", category: "resource", value: "20", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},
    {name: "Sapphire Mine", category: "resource", value: "20", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/cardres.png"},

    //Green Resource Cards
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/cardres.png"}
]

function shuffle(o) {
    for (var j, x, i = o.length-1; i; j =( Math.floor(Math.random() * i)+1), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};