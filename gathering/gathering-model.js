/* Pure calculator functions. Bonuses are fractions, time is seconds. */
const GatheringModel = (() => {
  function gearBonus(piece, rarity) {
    return piece ? piece.treasureFind + (rarity.mult - 1) * piece.treasureScale : 0;
  }
  function calculate(data, {skill, resourceIndex, pet = false, gear = [], tool = '', hours = 1, actionSeconds = null}) {
    const resources = data.resources[skill];
    if(!resources || !Number.isInteger(resourceIndex) || !resources[resourceIndex]) throw Error('Choose a valid resource.');
    if(!Number.isFinite(hours) || hours < 0) throw Error('Enter a gathering time of zero or more hours.');
    if(actionSeconds !== null && (!Number.isFinite(actionSeconds) || actionSeconds <= 0)) throw Error('Action time must be greater than zero, or left blank.');
    const seen = new Set();
    const set = data.sets[skill];
    if(tool && !set.tools.includes(tool)) throw Error('Choose a matching set tool.');
    let setPieces = tool ? 1 : 0;
    let gearTotal = 0;
    for(const selection of gear) {
      if(!selection.name) continue;
      const piece = data.gear.find(g => g.name === selection.name && g.skillOf === skill);
      const rarity = data.rarities.find(r => r.tier === selection.tier);
      if(!piece || !rarity || seen.has(piece.slot)) throw Error('Choose one matching armor piece per slot and a valid rarity.');
      seen.add(piece.slot);
      gearTotal += gearBonus(piece, rarity);
      if(piece.bossSet === set.id) setPieces++;
    }
    const resource = resources[resourceIndex];
    const maximumLevel = resources[resources.length - 1].level;
    const levelFactor = 0.35 + 0.65 * resource.level / maximumLevel;
    const petBonus = pet ? data.pets.find(p => p.skill === skill).bonus.treasure_find : 0;
    const setSpeed = setPieces >= 6 ? 0.15 : setPieces >= 3 ? 0.05 : 0;
    const bossPet = data.pets.find(p => p.name === set.pet).bonus;
    const perkKey = ['wc_triple','fish_pearl','mine_gem'].find(k => bossPet[k]);
    const setPerk = setPieces >= 6 ? bossPet[perkKey] / 2 : 0;
    const petPerk = pet ? bossPet[perkKey] : 0;
    const combinedPerk = setPerk + petPerk;
    // Set perks affect speed, logs, pearls or loose gems. They do not include
    // treasure_find; do not multiply rare-container rates by speed or perks.
    const hourly = data.rates[skill] * levelFactor * (1 + petBonus) * (1 + gearTotal);
    const expected = hourly * hours;
    // Remove floating point dust before displaying the stochastic rounding.
    const roundedExpected = Math.round(expected * 1e10) / 1e10;
    const offlineWhole = Math.floor(roundedExpected);
    const offlineFraction = roundedExpected - offlineWhole;
    const chance = actionSeconds === null ? null : Math.min(1, hourly * actionSeconds / 3600);
    return {hourly, perMinute:hourly/60, secondsPerDrop:3600/hourly, expected, levelFactor, gearTotal, petBonus,
      setPieces, setSpeed, setPerk, petPerk, combinedPerk, perkKey,
      extraPerHour:perkKey==='wc_triple'?null:combinedPerk*levelFactor,
      offlineWhole, offlineFraction, chance, activeHourly:chance === null ? null : chance * 3600 / actionSeconds};
  }
  return {gearBonus, calculate};
})();
if(typeof module !== 'undefined') module.exports = GatheringModel;
