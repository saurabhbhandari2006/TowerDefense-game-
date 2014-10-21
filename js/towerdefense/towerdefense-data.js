window.user = {};

window.theme = {};
theme.background = "img/towerdefense/background.jpg";
theme.dropRatio = 0.93;

window.game = {};
game.startHeight = 25;
game.maxHeight = 5;

var myCards = [
    //Attack Cards
//    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/attack/ohitsuji.png"},
//    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/attack/ohitsuji.png"},
//    {name: "The Ohitsuji", category: "attack", value: "-6", cost: {red: 5, blue: 0, green: 0},"image": "img/towerdefense/attack/ohitsuji.png"},
//
//    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/attack/ballista.png"},
//    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/attack/ballista.png"},
//    {name: "The Ballista", category: "attack", value: "-8", cost: {red: 8, blue: 0, green: 0},"image": "img/towerdefense/attack/ballista.png"},
//
//    {name: "The Catapult", category: "attack", value: "-10", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/attack/catapult.png"},
//    {name: "The Catapult", category: "attack", value: "-10", cost: {red: 10, blue: 0, green: 0},"image": "img/towerdefense/attack/catapult.png"},
//
//    {name: "Siege Tower", category: "attack", value: "-12", cost: {red: 12, blue: 0, green:0 },"image": "img/towerdefense/attack/siege_tower.png"},
//    {name: "Siege Tower", category: "attack", value: "-12", cost: {red: 12, blue: 0, green:0 },"image": "img/towerdefense/attack/siege_tower.png"},
//
//    {name: "The Tosekiki", category: "attack", value: "-14", cost: {red: 14, blue: 0, green: 0},"image": "img/towerdefense/attack/tosekiki.png"},
//    {name: "The Tosekiki", category: "attack", value: "-14", cost: {red: 14, blue: 0, green: 0},"image": "img/towerdefense/attack/tosekiki.png"},
//
//    //Build Cards
//    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/build/wood_masonry.png"},
//    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/build/wood_masonry.png"},
//    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/build/wood_masonry.png"},
//    {name: "Wood Masonry", category: "build", value: "10", cost: {red: 0, blue: 10, green: 0},"image": "img/towerdefense/build/wood_masonry.png"},
//
//    {name: "Stone Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/build/stone_masonry.png"},
//    {name: "Stone Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/build/stone_masonry.png"},
//    {name: "Stone Masonry", category: "build", value: "16", cost: {red: 0, blue: 15, green: 0},"image": "img/towerdefense/build/stone_masonry.png"},
//
//    {name: "Iron Masonry", category: "build", value: "20", cost: {red: 0, blue: 20, green: 0},"image": "img/towerdefense/build/iron_masonry.png"},
//    {name: "Iron Masonry", category: "build", value: "20", cost: {red: 0, blue: 20, green: 0},"image": "img/towerdefense/build/iron_masonry.png"},
//
//    //Bonus Attack Cards
//    {name: "Earth Crawler", category: "bonus", value: "-16", cost: {red: 5, blue: 0, green: 5},"image": "img/towerdefense/attack/earth_crawler.png"},
//    {name: "Earth Crawler", category: "bonus", value: "-16", cost: {red: 5, blue: 0, green: 5},"image": "img/towerdefense/attack/earth_crawler.png"},
//
//    {name: "Firing Lore", category: "bonus", value: "-20", cost: {red: 10, blue: 0, green: 10},"image": "img/towerdefense/attack/firing_lore.png"},
//    {name: "Firing Lore", category: "bonus", value: "-20", cost: {red: 10, blue: 0, green: 10},"image": "img/towerdefense/attack/firing_lore.png"},
//
//    {name: "Fire Breather", category: "bonus", value: "-30", cost: {red: 20, blue: 0, green: 20},"image": "img/towerdefense/attack/fire_breather.png"},
//    {name: "Fire Breather", category: "bonus", value: "-30", cost: {red: 20, blue: 0, green: 20},"image": "img/towerdefense/attack/fire_breather.png"},
//
//    //Bonus Build Cards
//    {name: "Strong Belfry", category: "bonus", value: "30", cost: {red: 0, blue: 20, green: 20},"image": "img/towerdefense/build/strong_belfry.png"},
//    {name: "Strong Belfry", category: "bonus", value: "30", cost: {red: 0, blue: 20, green: 20},"image": "img/towerdefense/build/strong_belfry.png"},
//
//    {name: "Dominion Tower", category: "bonus", value: "40", cost: {red: 0, blue: 25, green: 25},"image": "img/towerdefense/build/dominion_tower.png"},
//    {name: "Dominion Tower", category: "bonus", value: "40", cost: {red: 0, blue: 25, green: 25},"image": "img/towerdefense/build/dominion_tower.png"},
//
//    //Red Resource Cards
//    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/pouch_of_rubies.png"},
//    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/pouch_of_rubies.png"},
//    {name: "Pouch of Rubies", category: "resource", value: "5", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/pouch_of_rubies.png"},
//
//    {name: "Sack of Rubies", category: "resource", value: "10", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/sack_of_rubies.png"},
//    {name: "Sack of Rubies", category: "resource", value: "10", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/sack_of_rubies.png"},
//
//    {name: "Ruby Mine", category: "resource", value: "20", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/ruby_mine.png"},
//    {name: "Ruby Mine", category: "resource", value: "20", cost: {red: -1, blue: 0, green: 0},"image": "img/towerdefense/resource/ruby_mine.png"},
//
//    //Blue Resource Cards
//    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/pouch_of_sapphires.png"},
//    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/pouch_of_sapphires.png"},
//    {name: "Pouch of Sapphires", category: "resource", value: "5", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/pouch_of_sapphires.png"},
//
//    {name: "Sack of Sapphires", category: "resource", value: "10", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/sack_of_sapphires.png"},
//    {name: "Sack of Sapphires", category: "resource", value: "10", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/sack_of_sapphires.png"},
//
//    {name: "Sapphire Mine", category: "resource", value: "20", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/sapphire_mine.png"},
//    {name: "Sapphire Mine", category: "resource", value: "20", cost: {red: 0, blue: -1, green: 0},"image": "img/towerdefense/resource/sapphire_mine.png"},
//
//    //Green Resource Cards
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"},
    {name: "Emerald Mine", category: "resource", value: "20", cost: {red: 0, blue: 0, green: -1},"image": "img/towerdefense/resource/emerald_mine.png"}
]

function shuffle(o) {
    for (var j, x, i = o.length-1; i; j =( Math.floor(Math.random() * i)+1), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};