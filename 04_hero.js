/**
 * It's time to create a hero to dispatch these pesky monsters.
 *
 * Copy your code from the previous exercise.
 *
 * Add a SETTER method to your LivingThing class named "setHealth" that lets you update the value
 * of the "health" property.
 *
 * Now, create a NEW object called "Hero" that EXTENDS the LivingThing class.
 *
 * NOTE: Check out the following to figure out how to extend an object
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
 *
 * Add a method to the Hero class named "attack" that takes as a parameter a LivingThing object.
 * The method should do three things:
 * 1. Reduce the LivingThing object's health by a random value between 0 and 10.
 * 2. Reduce the hero's health by a random value between 0 and 10.
 * 3. Print out how much damage the monster and hero did to each other.
 *
 * NOTE: To point you in the right direction: check out
 * the getRandomInt function on this page:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * Give the Hero object another method named "fight" that takes as a parameter an array of LivingThing objects
 * and does the following:
 *  - For each LivingThing object in the array, call the "attack" method so the hero can attack the monster.
 *     - But, don't attack if the LivingThing is already dead!
 *  - Repeat the process until all the monsters or the hero is dead.
 *
 * Finally, you will need to instantiate your hero object with the name into a variable named "hero". Give them 100 health and a
 * name of your choice.
 */


 (function(){
    //@see https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
    'use strict';

    ///////////////////////////
    // Put your code here!
    ///////////////////////////

    //  constructor for LivingThing
    function LivingThing(monsterName, monsterHealth) {
      let name = monsterName;
      let health = monsterHealth;

      this.isAlive = function(){
        return (health > 0);
      }
      // getter for name
      this.getName = function() {
        return name;
      }
      // getter for health
      this.getHealth = function() {
        return health;
      }
      // setter for health
      this.setHealth = function(newHealth) {
        health = newHealth;
      }
    }

    // random integer between min and max inclusive to be used in attack method
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    //  create new class of Hero extending LivingThing
    function Hero (heroName, heroHealth) {
      LivingThing.call(this, heroName, heroHealth)   //  this is same as "extends"

      //  method for hero to attack monster
      this.attack = function(monster) {   //  this is a new method for Hero only
        //  random damage from 0 to 10 for hero and monster
        let heroDamage = getRandomIntInclusive(0, 10);
        let monsterDamage = getRandomIntInclusive(0, 10);

        //  set new health by subtracting damage
        monster.setHealth(monster.getHealth() - monsterDamage);
        this.setHealth(this.getHealth() - heroDamage);

        //  output damage and remaining health for hero and monster
        //  if health is 0 or less, output that character has perished
        if (this.getHealth() > 0){
          console.log(this.getName() + " took " + heroDamage + " damage points and now has " + this.getHealth() + " points");
        } else {
          console.log(this.getName() + " took " + heroDamage + " damage points and now has perished. Damn!");
        }

        if (monster.getHealth() > 0){
          console.log(monster.getName() + " took " + heroDamage + " damage points and now has " + monster.getHealth() + " points");
        } else {
          console.log(monster.getName() + " took " + heroDamage + " damage points and now has perished. Yeah!");
        }

      }

      //  method for hero to fight an array of monsters
      this.fight = function(arrayOfMonsters) {

        //  loop over passed in array of monsters
        for (let i=0; i < arrayOfMonsters.length; i++) {

          // keep attacking while both combatants are alive
          while (arrayOfMonsters[i].isAlive() && this.isAlive()) {
            this.attack(arrayOfMonsters[i]);

          }
        }
      }
    }

    //  instantiate a Hero
    let Hero1 = new Hero("DareDevil", 100);
    // instantiate a few monsters
    let Rat = new LivingThing("Rat", 5);
    let Goblin = new LivingThing("Goblin", 30);
    let Ogre = new LivingThing("Ogre", 60);

    // build array of monsters
    let monsters = [Rat, Goblin, Ogre];


    //The code below should work when you are done
    console.log("A hero emerges!");

    console.log("The noble " + Hero1.getName() + " has vowed to defeat the monsters and save the realm");
    console.log("Will they be victorious?");

    Hero1.fight(monsters);

    if (Hero1.isAlive()) {
        console.log("The hero, " + Hero1.getName() + ", prevailed!");
    }
    else {
        console.log(Hero1.getName() + " was bested by the monsters. We are doomed");
    }

})();
