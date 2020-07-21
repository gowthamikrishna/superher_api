var express = require("express");
var router = express.Router();
const SUPER_HEROES = [
  "SUPERMAN",
  "THOR",
  "ROBIN",
  "IRONMAN",
  "GHOSTRIDER",
  "CAPTAINAMERICA",
  "FLASH",
  "WOLVERINE",
  "BATMAN",
  "HULK",
  "BLADE",
  "PHANTOM",
  "SPIDERMAN",
  "BLACKWIDOW",
  "HELLBOY",
  "PUNISHER",
];
const keypad = {
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
};
//check char sequnce possible for SUPER_HERO
let checkSuperHeroPossiblity = (str, superheroName) => {
  let isPossible = true;
  [...superheroName].forEach((ch) => {
    let chIndex = str.indexOf(ch);
    if (chIndex < 0) {
      isPossible = false;
      return;
    } else {
      str.replace(ch, "#");
    }
  });
  return isPossible;
};
let findSuperHeroByCode = (code) => {
  var superUserToReturn = "No Superuser Found";
  if (!code) {
    return superUserToReturn;
  } else {
    let eligibleSH = SUPER_HEROES.filter((sh) => sh.length === code.length);
    let superSetOfTranslated = "";
    [...code].forEach((num) => {
      superSetOfTranslated = superSetOfTranslated + keypad[num];
    });

    if (eligibleSH) {
      eligibleSH.forEach((superHero) => {
        console.log(superSetOfTranslated, superHero);
        let isPossible = checkSuperHeroPossiblity(
          superSetOfTranslated,
          superHero
        );
        if (isPossible) {
          superUserToReturn = superHero;
          return;
        }
      });
    }
  }
  return superUserToReturn;
};

/* GET users listing. */
router.get("/superhero/:code", function (req, res) {
  let superHero = findSuperHeroByCode(req.params.code);
  res.send(`${superHero}`);
});

module.exports = router;
