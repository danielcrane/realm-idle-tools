/* Personal recovery snapshot from the saved combat-planner export, 2 October 2026.
   Only an absent or untouched default profile is restored; existing edits win. */
(function(root){
  'use strict';
  const M=typeof module!=='undefined'?require('./model.js'):root.CharacterProfile;
  const snapshot={
  "version": 1,
  "name": "My Adventurer",
  "skills": {
    "attack": {
      "level": 30,
      "xp": null
    },
    "strength": {
      "level": 30,
      "xp": null
    },
    "defense": {
      "level": 130,
      "xp": null
    },
    "ranged": {
      "level": 30,
      "xp": null
    },
    "magic": {
      "level": 130,
      "xp": null
    },
    "woodcutting": {
      "level": 1,
      "xp": null
    },
    "mining": {
      "level": 1,
      "xp": null
    },
    "fishing": {
      "level": 1,
      "xp": null
    },
    "cooking": {
      "level": 1,
      "xp": null
    },
    "smithing": {
      "level": 1,
      "xp": null
    },
    "crafting": {
      "level": 1,
      "xp": null
    },
    "alchemy": {
      "level": 1,
      "xp": null
    },
    "arcane_arts": {
      "level": 1,
      "xp": null
    },
    "divinity": {
      "level": 130,
      "xp": null
    },
    "thieving": {
      "level": 1,
      "xp": null
    }
  },
  "pets": [
    "Drowned Colossus Pet"
  ],
  "museum": {
    "mode": "manual",
    "items": {},
    "manual": {
      "melee": {
        "str": 0.098,
        "atk": 0.098,
        "def": 0.1158,
        "dr": 0.0579
      },
      "ranged": {
        "rng": 0.1358,
        "rngBonus": 290,
        "def": 0.0464,
        "lifesteal": 0.0044
      },
      "magic": {
        "mag": 0.23329999999999998,
        "def": 0.124,
        "dr": 0.062
      }
    }
  },
  "combatSets": [
    {
      "id": "combat-planner-magic-2026-10-02",
      "name": "Magic - Combat Planner",
      "skill": null,
      "equipment": {
        "weapon": {
          "name": "Abyssweave Staff",
          "rarity": 15
        },
        "helm": {
          "name": "Ashlyn's Crown",
          "rarity": 16
        },
        "body": {
          "name": "Ashlyn's Robe",
          "rarity": 14
        },
        "legs": {
          "name": "Abyssweave Pants",
          "rarity": 16
        },
        "boots": {
          "name": "Abyssweave Boots",
          "rarity": 12
        },
        "gloves": {
          "name": "Ashlyn's Silk Gloves",
          "rarity": 14
        },
        "ring1": {
          "name": "Aeonweave Ring",
          "rarity": 9
        },
        "ring2": {
          "name": "Aeonweave Ring",
          "rarity": 7
        },
        "cape": {
          "name": "Aeonweave Cape",
          "rarity": 9
        },
        "ammo": {
          "name": "Frost Covenant Rune",
          "rarity": 1
        },
        "amulet": {
          "name": "Aeonweave Amulet",
          "rarity": 8
        }
      },
      "tool": null,
      "pet": "Drowned Colossus Pet",
      "blessing": "absolute_zero"
    }
  ],
  "skillingSets": [],
  "account": {
    "vip": true,
    "vipPlus": true,
    "communityTier": 4,
    "bosses": [
      "meadow_boss",
      "dungeon_boss",
      "volcano_boss",
      "abyssal_boss",
      "ruins_boss",
      "frost_boss",
      "shadow_boss",
      "forest_boss"
    ],
    "tomes": [],
    "killLog": {
      "Relic Dragon": 4,
      "Relic Wraith": 2
    }
  }
};
  function recover(saved){
    const current=saved===null?null:M.validate(saved);
    if(current&&JSON.stringify(current)!==JSON.stringify(M.defaults()))return {profile:current,restored:false};
    return {profile:M.validate(snapshot),restored:true};
  }
  const api={recover};
  if(typeof module!=='undefined')module.exports=api;else root.CharacterProfileRecovery=api;
})(globalThis);
