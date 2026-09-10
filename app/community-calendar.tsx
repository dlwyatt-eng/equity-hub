"use client";
import { useEffect, useRef, useState } from "react";
import calendar from "../content/community-calendar-2026-27.json";
import { activeCards, localDay, dateLabel } from "../content/community-dates.mjs";
import "./community-calendar.css";
type Card = typeof calendar.items[number];
const bands=["K–3","4–5","6–7"];
const months=Array.from({length:12},(_,i)=>{ const d=new Date(Date.UTC(2026,8+i,1));return {value:d.toISOString().slice(0,7),label:d.toLocaleDateString('en-CA',{month:'long',year:'numeric',timeZone:'UTC'})}; });
function useDay(){const [day,setDay]=useState(localDay);useEffect(()=>{const update=()=>setDay(localDay());const id=window.setInterval(update,60000);document.addEventListener('visibilitychange',update);return ()=>{clearInterval(id);document.removeEventListener('visibilitychange',update);};},[]);return day;}
function Source({id}:{id:string}){const s=calendar.sources[id as keyof typeof calendar.sources];return <a href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>;}
export function CommunityToday({onOpen}:{onOpen:(id?:string)=>void}){
 const day=useDay();const cards=activeCards(calendar,day);
 if(!cards.length)return <div className="community-quiet"><button onClick={()=>onOpen()}>Explore the community &amp; belonging calendar →</button></div>;
 return <aside className="community-today" aria-labelledby="community-today-title"><div><small>{day} · Surrey</small><h2 id="community-today-title">Community &amp; Culture Today</h2><p>Notice, explore, or carry on. Your choice.</p></div><div className="community-today-options">{cards.map(c=><button key={c.id} onClick={()=>onOpen(c.id)}><small>{c.kind}{c.dateNote.includes('Anticipated')?' · anticipated':''}</small><strong>{c.title}</strong><span>Explore a short card →</span></button>)}</div></aside>;
}
export function CommunityCalendar({initialCardId,onLesson,largeText,onLargeText}:{initialCardId:string|null;onLesson:(id:string)=>void;largeText:boolean;onLargeText:()=>void}){
 const day=useDay();const [month,setMonth]=useState(day>=calendar.validFrom&&day<=calendar.validUntil?day.slice(0,7):'2026-09');const [selected,setSelected]=useState<Card|null>(null);const [band,setBand]=useState('K–3');const [projecting,setProjecting]=useState(false);const [screen,setScreen]=useState(0);const ref=useRef<HTMLDialogElement>(null);
 const open=(c:Card)=>{setSelected(c);setBand(c.minBand??'K–3');setScreen(0);};
 useEffect(()=>{const c=calendar.items.find(c=>c.id===initialCardId);if(c){setSelected(c);setBand(c.minBand??'K–3');setMonth(c.start.slice(0,7));}},[initialCardId]);
 useEffect(()=>{if(selected&&!ref.current?.open)ref.current?.showModal();},[selected]);
 useEffect(()=>{if(!selected)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[selected]);
 const close=()=>{ref.current?.close();setSelected(null);setProjecting(false);};
 const connect=(id:string)=>{close();onLesson(id);};
 const visible=calendar.items.filter(c=>month==='all'||(c.start.slice(0,7)<=month&&c.end.slice(0,7)>=month));
 const young=selected?.minBand&&band!=='6–7';
 return <section id="community-calendar" className="community-calendar" aria-labelledby="community-calendar-title">
 <header className="community-heading"><div><p className="community-kicker">Canada · British Columbia · Surrey · K–7</p><h2 id="community-calendar-title">Many stories.<br/><em>Ways to belong.</em></h2><p>One question, two minutes, or a deeper inquiry. These invitations are here when they help.</p></div><img src="/images/multilingual-welcome.webp" alt="" width="1536" height="1024"/></header>
 <details className="community-guidance"><summary>Before sharing a card: care, choice &amp; date notes</summary><div className="community-guidance-grid"><div><h3>Invite; never appoint a spokesperson.</h3><p>Never unexpectedly ask, “Can you tell us what your people do?” Students can share their own experiences or pass. Do not infer religion, language, migration history or family practices from a name or appearance.</p><p>Some people are secular; religious traditions also vary internally. Learn about observances without asking children to pray, fast, perform rituals or disclose beliefs.</p></div><div><h3>Indigenous learning has distinct responsibilities.</h3><p>Use specific Nation-led voices and local school guidance. Celebration, commemoration, rights and ongoing responsibilities are different. Avoid pan-Indigenous crafts, ceremony simulations or treating Nations as another immigrant culture.</p><p>Teachers preview sources before projecting. Some links are background reading or archived programmes. No student account or device is needed for a card.</p></div><div><h3>Dates belong to a particular year.</h3><p>Reviewed September 10, 2026 for September 2026–August 2027. Islamic dates are anticipated; Jewish dates often begin at sunset. Confirm community dates before planning attendance or accommodations.</p><p>After August 31, 2027, home-screen suggestions pause until annual review. Cards remain available for learning.</p><Source id="surrey"/><Source id="canada"/></div></div></details>
 {day>calendar.validUntil&&<p className="community-review-notice" role="status">This is the 2026–27 calendar. Dates need review before use for a new school year. Today’s suggestions are paused.</p>}
 <div className="community-filter"><label htmlFor="community-month">Explore a month</label><select id="community-month" value={month} onChange={e=>setMonth(e.target.value)}>{months.map(m=><option key={m.value} value={m.value}>{m.label}</option>)}<option value="all">Whole school year</option></select><span role="status">{visible.length} optional cards</span></div>
 <div className="community-card-grid">{visible.map(c=><article className={`community-teaser${c.kind.includes('responsibility')?' responsibility':''}`} key={c.id}><p className="community-kicker">{dateLabel(c)}</p><h3>{c.title}</h3><p>{c.minBand?'Teacher-selected remembrance for Grades 6–7. Younger pathways focus on belonging.':c.what}</p><span>{c.kind}</span><button aria-label={`Open ${c.title} card`} onClick={()=>open(c)}>Explore →</button></article>)}</div>
 {!visible.length&&<p className="community-empty">No featured card this month. There is no need to fill every day. Revisit a story or choose another month when it fits.</p>}
 <p className="community-year-note">Summer dates are optional planning references. Communities belong in learning all year, beyond the dates listed here.</p>
 <dialog ref={ref} aria-labelledby="community-card-title" className={`community-dialog${projecting?' community-projecting':''}`} onCancel={e=>{e.preventDefault();if(projecting)setProjecting(false);else close();}} onClose={()=>{setSelected(null);setProjecting(false);}}>
 {selected&&<><div className="community-dialog-tools"><button onClick={close}>← Back to calendar</button><button aria-pressed={largeText} onClick={onLargeText}>{largeText?'Standard print':'Large print'}</button><button onClick={()=>{setScreen(0);setProjecting(!projecting);}}>{projecting?'Exit projection':'Project card'}</button></div>
 <div className="community-card-body"><p className="community-kicker">{selected.kind} · {dateLabel(selected)}</p><h2 id="community-card-title">{selected.title}</h2>
 {!projecting&&<div className="community-band-choice" aria-label="Choose a grade pathway">{bands.map(b=><button key={b} aria-pressed={b===band} onClick={()=>setBand(b)}>{b}</button>)}</div>}
 {young?<section><h3>A belonging pathway for {band}</h3><p>{selected.deeper[bands.indexOf(band)]}</p><button onClick={()=>connect('belonging-built')}>Open Belonging is built →</button></section>:<>
 {(!projecting||screen===0)&&<section className="community-short"><h3>What is it?</h3><p>{selected.what}</p><h3>Why might it matter in Canada?</h3><p>{selected.canada}</p></section>}
 {(!projecting||screen===1)&&<section className="community-fact"><h3>One thing worth knowing</h3><p>{selected.fact}</p></section>}
 {(!projecting||screen===2)&&<section className="community-explore"><p className="community-kicker">Explore · 2–5 minutes · {band}</p><h3>Try one question.</h3><p>{band==='K–3'?selected.deeper[0]:selected.explore}</p><p className="community-choice">You can speak, draw, write or pass.</p></section>}
 {!projecting&&<><section className="community-voices"><h3>Whose voices can we hear?</h3>{selected.voices.map(id=><Source key={id} id={id}/>)}<p>Teacher: preview one relevant part. Sources may include adult background reading.</p></section><details className="community-deeper"><summary>Go deeper · {band} · about 20 minutes</summary><p>{selected.deeper[bands.indexOf(band)]}</p><p>Explore a teacher-selected source (5 minutes). Talk, draw or write (10 minutes). Share an insight and a respectful next step (5 minutes).</p><button onClick={()=>connect(selected.lesson)}>Open the connected Hub lesson →</button></details></>}
 </>}
 {selected.dateNote&&(!projecting||screen===0)&&<p className="community-date-context">{selected.dateNote}</p>}
 {!projecting&&<div className="community-date-note"><h3>Date source &amp; teaching note</h3><Source id={selected.dateSource}/><p>Never ask a student to represent a community. Sharing is voluntary.</p></div>}</div>
 {projecting&&!young&&<div className="community-projection-controls"><button disabled={screen===0} onClick={()=>{setScreen(screen-1);ref.current?.scrollTo(0,0);}}>← Previous</button><span aria-live="polite">{screen+1} / 3</span><button onClick={()=>{if(screen<2)setScreen(screen+1);else setProjecting(false);ref.current?.scrollTo(0,0);}}>{screen<2?'Next →':'Finish'}</button></div>}
 </>}
 </dialog></section>;
}
