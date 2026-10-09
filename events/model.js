/* Expected direct drops; independent of the UI and of game state. */
const EventModel = (() => {
  function plan(drop, minutes, months, days, kph, bonus, doubleChance) {
    if(![minutes,months,days,kph,bonus,doubleChance].every(Number.isFinite) || minutes<=0 || months<0 || days<=0 || kph<0 || bonus< -100 || doubleChance<0 || doubleChance>100) throw new Error('Invalid farming inputs');
    const required = Math.ceil(months * days * 24 * 60 / minutes);
    const chance = Math.min(1, Math.max(0, drop.c * (1 + bonus / 100)));
    const rate = kph * chance * (drop.q[0] + drop.q[1]) / 2 * (1 + doubleChance / 100);
    return {required,chance,rate,hours:required===0?0:rate>0?required/rate:Infinity};
  }
  function duration(hours) {
    if(!Number.isFinite(hours)) return 'Unreachable';
    const total = Math.ceil(hours * 60);
    return `${Math.floor(total/1440).toLocaleString()}d ${Math.floor(total%1440/60)}h ${total%60}m`;
  }
  return {plan,duration};
})();
if(typeof module !== 'undefined') module.exports = EventModel;
