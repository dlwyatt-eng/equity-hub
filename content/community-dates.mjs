/** Calendar dates are civil dates in Surrey, never UTC dates inferred from a device. */
export function localDay(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
/** @template {{start:string,end:string}} T @param {{validFrom:string,validUntil:string,items:T[]}} calendar @param {string} day */
export function activeCards(calendar, day) {
  if(day < calendar.validFrom || day > calendar.validUntil) return [];
  return calendar.items.filter(c=>c.start<=day && day<=c.end).sort((a,b)=>(a.start===a.end?-1:0)-(b.start===b.end?-1:0));
}
/** @param {{start:string,end:string}} card */
export function dateLabel(card) {
 const fmt=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-CA',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
 if(card.start.endsWith('-01') && card.start.slice(0,7)===card.end.slice(0,7) && +card.end.slice(-2)>=28) return new Date(card.start+'T12:00:00Z').toLocaleDateString('en-CA',{month:'long',year:'numeric',timeZone:'UTC'});
 return card.start===card.end?fmt(card.start):fmt(card.start)+' – '+fmt(card.end);
}
