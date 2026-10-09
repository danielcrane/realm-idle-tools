'use strict';
const ForgeModel=(()=>{
 const {data,rules}=typeof module!=='undefined'?require('./source-data.js'):{data:FORGE_DATA,rules:ForgeSource};
 const integer=(v,label='Quantity')=>{if(!/^\d{1,30}$/.test(String(v)))throw Error(label+' must be a non-negative whole number (up to 30 digits).');return BigInt(v);};
 function input(name,inventory,target,quantity,budget){
  const item=data.items.find(i=>i.name===name);if(!item)throw Error('This item is not eligible for forging.');
  if(!Number.isInteger(target)||target<1||target>21)throw Error('Target rarity must be between Common (1) and Primordial (21).');
  const inv=Array.from({length:22},(_,t)=>integer(inventory[t]??0,'Inventory'));
  const count=integer(quantity,'Target quantity');if(count<1n)throw Error('Target quantity must be at least 1.');
  const gold=budget===''||budget==null?null:integer(budget,'Gold budget');return {item,inv,target,count,gold};
 }
 // Reserve existing copies from the target downward, recursively forge only deficits.
 // Missing copies are supplied at Common, so the conditional chain is fully specified.
 function chain(item,inv,target,count){
  const needs=Array(22).fill(0n),merges=Array(22).fill(0n);needs[target]=count;
  for(let t=target;t>1;t--){const deficit=needs[t]>inv[t]?needs[t]-inv[t]:0n;merges[t-1]=deficit;needs[t-1]=deficit*BigInt(rules.getForgeQty(t-1));}
  const missing=needs[1]>inv[1]?needs[1]-inv[1]:0n,after=inv.slice();after[1]+=missing;
  let totalGold=0n;const ops=[];
  for(let t=1;t<target;t++)if(merges[t]){const qty=merges[t],used=qty*BigInt(rules.getForgeQty(t)),costEach=BigInt(rules.getForgeCost(item.materialTier,t)),gold=costEach*qty;after[t]-=used;after[t+1]+=qty;totalGold+=gold;ops.push({fromTier:t,qty,used,costEach,gold});}
  const leftovers=after.slice();leftovers[target]-=count;
  return {missing,totalGold,ops,after,leftovers,count};
 }
 function capacity(inv,target){let carry=inv[1];for(let t=1;t<target;t++)carry=inv[t+1]+carry/BigInt(rules.getForgeQty(t));return carry;}
 function plan(name,inventory,target,quantity,budget){
  const {item,inv,count,gold}=input(name,inventory,target,quantity,budget),required=chain(item,inv,target,count),available=capacity(inv,target);
  let lo=0n,hi=available;
  while(lo<hi){const mid=(lo+hi+1n)/2n,p=chain(item,inv,target,mid);if(gold===null||p.totalGold<=gold)lo=mid;else hi=mid-1n;}
  const achievable=lo,now=chain(item,inv,target,achievable<count?achievable:count);
  return {item,target,count,budget:gold,required,available,achievable,now,canReach:required.missing===0n&&(gold===null||required.totalGold<=gold),goldShortfall:gold===null||gold>=required.totalGold?0n:required.totalGold-gold};
 }
 function stats(item,tier){const mult=data.rarities[tier-1].mult;if(item.kind==='tool')return [{label:'Gathering speed',value:rules.toolSpeed(item.definition,mult).toFixed(2)+'×'},{label:'Required '+item.skill+' level',value:String(item.definition.level)}];return rules.equipmentStats(item.definition,mult);}
 return {data,rules,integer,input,chain,capacity,plan,stats};
})();
if(typeof module!=='undefined')module.exports=ForgeModel;
