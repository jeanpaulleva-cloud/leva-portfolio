// build.js — generates the individual system landing pages for drleva.com.
// Run: `node build.js`. Emits /systems.css, /favicon.svg, and /<slug>/index.html for each system.
// To add or edit a system, change the SYSTEMS array below and re-run. Plain English only.
const fs = require('fs');
const path = require('path');

const SYSTEMS = [
  { slug:`sms-agent`, name:`Bilingual AI Patient Agent`,
    tagline:`Texts your patients back in seconds — day or night, in English or Spanish.`,
    tag:`live since Feb 14, 2026`,
    problem:`Patients text the practice at all hours asking about prices, hours, and appointments — and a busy front desk can't always answer fast. Slow replies lose bookings, and Spanish-speaking patients often wait even longer.`,
    built:`I built an AI assistant that answers patient texts automatically, around the clock, in both English and Spanish. It reads each message, looks up that patient's real history and the real open appointment times, books or cancels the appointment, and texts back — usually in under a minute. Patients feel like they're texting a very fast, very informed front desk.`,
    how:[`A patient text comes in. Junk, reactions, and "stop" requests are filtered out first, so the AI only spends effort on real questions.`,`The AI pulls up the patient's file, checks their existing appointments, figures out their language, and notices if they're asking about price — all in a few seconds.`,`It uses a set of 12 connected tools to look things up for real instead of guessing: open appointment times, pricing, locations, and answers to common questions.`,`When a patient says yes to a time, it books the appointment straight into the practice's medical-records system and texts a full confirmation. When they ask to cancel, it cancels — and double-checks it really went through.`,`Every outgoing text passes one shared safety check first: has the patient opted out, is a staff member already handling this, are the dates real, and are we about to repeat ourselves.`],
    result:`Patients get accurate, personal answers in 10 to 25 seconds at any hour, the practice books appointments without staff lifting a finger, and the whole thing runs for roughly $60 to $120 a month in AI costs.`,
    facts:[`Live since February 14, 2026`,`English and Spanish — even mixed mid-conversation`,`Typical day: 50 to 100 incoming texts`,`Responds in about 10 to 25 seconds`,`Books directly into the records system; can also cancel`,`Steps aside for 2 hours the moment a staff member takes over`,`~$60 to $120/month in AI costs for ~2,000 messages`],
    forYou:`If your front desk is buried in repetitive texts — especially in two languages — this shows an after-hours assistant that books real appointments and quietly hands off to your team the moment a human steps in.` },

  { slug:`practice-os`, name:`The Practice OS`,
    tagline:`One app the whole office runs on — every day, from one screen.`,
    tag:`in daily use`,
    problem:`My team was jumping between a half-dozen separate programs all day — one for patient records, another for scheduling, another for letters, another for follow-up — and things slipped through the cracks. Nobody had a single place to see what was actually happening in the practice.`,
    built:`I built one in-house app that the whole office signs into and works from all day. It pulls everything together — scheduling, patient records, clinical notes, doctor's letters, follow-up calls, financing offers, and the front desk's daily list — into about twenty simple screens, and it runs on the same patient information we already had instead of forcing anyone to re-enter it.`,
    how:[`Staff at the office are signed in automatically; from anywhere else, one password gets you in for two weeks at a time.`,`Each screen does one job — booking surgeries, writing a clearance letter, recording a visit note, working the day's follow-up list — so it stays simple to use.`,`It reads live from our existing patient database and scheduling system, so what you see is always current and nobody copies information between programs.`,`Letters (clearance, return-to-work, fit-to-fly, school and travel notes) fill themselves in from the patient's file and print or download in seconds.`,`Everyone sees the same shared to-do list across every computer, so two people never duplicate work and nothing falls off the radar.`],
    result:`The office now runs the day out of one place instead of bouncing between programs, and it's in daily use across the whole team. New tools get added as a new screen without disturbing anything that already works.`,
    facts:[`One app, ~20 screens, one login for the whole team`,`Auto-login at the office; a password works from anywhere`,`Reads live from the existing records — no double entry`,`Generates clearance, return-to-work, fit-to-fly, school & travel letters`,`Built and run in-house — no per-seat software fees`],
    forYou:`Most practices pay for and juggle five or six disconnected programs — this shows that one practice can run the whole front and back office from a single app built around the records you already keep.` },

  { slug:`automation-fleet`, name:`The Automation Fleet`,
    tagline:`Around 97 quiet helpers doing the office busywork, around the clock — run by one person.`,
    tag:`always on`,
    problem:`A busy practice runs on hundreds of small, repetitive jobs every day — answering texts, chasing no-shows, confirming bookings, updating records, tracking ads. Hiring people to do all of it is expensive and slow, and the work still slips through the cracks after hours.`,
    built:`I built a fleet of roughly 97 small automations that quietly do the office's repetitive work 24 hours a day. They answer patient texts, recover missed appointments, log every phone call, keep records up to date, and watch over the ads — all connected so the tools share information automatically, with no one copying data between systems. One person runs the whole thing.`,
    how:[`Each automation is a tiny worker with one job — like "text back anyone who left a voicemail" or "check every 30 minutes if a patient needs a follow-up" — and they hand off to each other.`,`When a patient texts, the system reads it in seconds, figures out what they want in English or Spanish, looks up their history, and writes a personalized reply with no human involved.`,`Every phone call is automatically written down, checked for tone, and turned into a confirmation text if someone booked.`,`The tools all talk to each other: the phone system, the patient database, the ad accounts, the calendar, and payments stay in sync on their own.`,`A health check runs every few hours to make sure all the helpers are still working, and alerts go out the moment something breaks.`],
    result:`The fleet runs all day and night and saves the practice hundreds of hours of staff work a year. It costs roughly $80 a month to run — a fraction of what the same work would cost in staff and software.`,
    facts:[`Roughly 97 automations running 24/7`,`Run and maintained by one person`,`Connects ~15 outside tools so they share data automatically`,`Around $80/month to operate`,`Saves hundreds of staff hours per year`,`Replaced a $2,000/month texting tool with a custom system`],
    forYou:`If your practice is paying staff and a stack of subscriptions to do repetitive busywork, a connected fleet of small automations can quietly handle most of it around the clock for a fraction of the cost.` },

  { slug:`ads-recovery`, name:`Google Ads Recovery`,
    tagline:`Our online ads quietly stopped bringing in patients. I found out why in an afternoon — and brought them back.`,
    tag:`recovered`,
    problem:`For about two weeks, the practice's Google ads were running and spending money but bringing in almost nobody — roughly $1,500 spent with zero new patient inquiries. The kind of slow leak that's easy to miss until you go looking.`,
    built:`I dug into our own meeting recordings and ad history to find the one approach that had actually worked before — an automated, Google-managed ad style that once brought in around 57 inquiries a week. Then I rebuilt the ad accounts around it: turned the proven campaigns back on, fixed two ads pointing to broken or missing pages, and shifted the money away from the version that was wasting it. I also set clear check-in dates so we'd know fast if it slipped again.`,
    how:[`I reviewed recordings of past marketing meetings, and every single one pointed to the same winning ad style — the one Google's own system optimizes automatically.`,`The old winning campaigns were paused, not deleted, so all their learning history was intact. I switched them back on instead of starting from scratch.`,`I found two ads sending clicks to a page that didn't exist and a page that was never published — and pointed them at real, working pages with proper tracking.`,`I moved the daily budget off the failing ads and onto the proven ones, while keeping a small backup ad running just in case.`,`I set 5 clear check-in dates over two weeks with go/no-go targets, so the decision to keep spending is based on real results, not hope.`],
    result:`The ad campaigns that once produced strong, low-cost patient inquiries are running again — pointed at working pages, properly tracked, and watched on a schedule so a quiet failure can't go unnoticed for weeks again. The whole rebuild took a single afternoon.`,
    facts:[`~$1,500 spent over ~12 days with zero inquiries before the fix`,`The recovered ad style historically brought ~57 inquiries/week at ~$13–16 each`,`6 specific fixes — campaigns re-enabled, broken pages corrected, budget shifted`,`Rebuilt in a single afternoon by reusing proven campaigns`,`5 scheduled check-in dates over 14 days to catch any slip early`],
    forYou:`If your online ads are running but the new-patient phone has gone quiet, the cause is often a hidden break — broken links, the wrong ad type, or budget on the wrong campaign — and it can be found and fixed in hours, not months.` },

  { slug:`call-intelligence`, name:`Call Intelligence`,
    tagline:`Every phone call becomes a clear note in the patient's file — within minutes, automatically.`,
    tag:`every call`,
    problem:`Front-desk calls are where patients say what they actually want — and most of it evaporates the second the call ends. Nobody has time to write up every call, so the details, the questions, and the buying signals get lost.`,
    built:`I built a system that quietly listens to every phone call and turns it into a clear, written summary in the patient's file within minutes — no one has to take notes. It captures what the patient is interested in, how serious they are, any concern they raised, and exactly what the staff should do next.`,
    how:[`Right after a call ends, the system reads the conversation and matches it to the patient's existing record, so it knows both what was said and who was calling.`,`It figures out which treatment the patient asked about (it recognizes 11 categories, in English and Spanish), spots concerns like cost, and rates how ready the patient is to book.`,`It writes all of this into a tidy note in the patient file — including a short, plain list of next steps for whoever picks it up.`,`If a patient sounds upset, it instantly flags the team so someone can step in fast.`,`Even if the smart summary can't be generated, a built-in backup still writes a useful note telling staff what to do — so a call never lands as a blank.`,`Quiet, very short, or silent calls are skipped, and the doctors' own calls are left out, so the file only fills with notes that matter.`],
    result:`Staff open a patient's file and immediately see what happened, what the patient wants, and what to do next — no call gets forgotten. The same notes feed the practice's reminder texts, follow-ups, and no-show recovery, so every other system works from the same accurate picture.`,
    facts:[`Turns every phone call into a written note within minutes`,`Recognizes 11 treatment categories in English and Spanish`,`Writes the summary, the next steps, and 18 details into each record`,`The same notes feed 14 other automations across the practice`,`Flags upset patients to the team right away`,`A nightly safety check sweeps for any missed calls`],
    forYou:`If your front desk is busy, this captures the patient details that normally vanish after every call — turning your phone line into a reliable, searchable record without adding a single minute of staff work.` },

  { slug:`integration-spine`, name:`The Connector`,
    tagline:`The wiring that lets our AI book a real appointment in a records system that was never built to let it.`,
    tag:`the plumbing`,
    problem:`Our medical-records system is a closed box — it has no easy, reliable way for our own software to read the schedule or book an appointment. So when our AI texts a patient "Thursday at 2 works — booked," that only means something if it can actually reach into the records system and put it on the calendar.`,
    built:`I built the connector that lets every other system we run talk to the medical-records system in plain, dependable terms: check who's free, find an open slot, create a real appointment, pull a patient's history. It's the quiet layer underneath the texting AI, the staff dashboard, and the booking tools — the thing that turns "the AI said it booked you" into an appointment that's actually on the schedule.`,
    how:[`When the AI agrees on a time with a patient, the connector creates the appointment directly in the records system — no clunky scheduling link, no front-desk re-typing.`,`It reads the live schedule so the AI never offers a time that's already taken or a day we're closed.`,`It carries patient details both ways, so a text conversation, the records system, and the patient database all stay in sync.`,`We run our own copy of this wiring on hardware we control, instead of depending on an outside vendor's server we couldn't see or fix.`,`It's built to fail safely: if the connection ever hiccups, the patient still gets a clean fallback instead of a broken or duplicate booking.`],
    result:`Patients can now book and reschedule by text and have it land as a real appointment in seconds, with no staff member in the middle. The practice owns the wiring instead of renting a fragile one — which also clears the path to drop a costly outside connector.`,
    facts:[`The records system has no reliable built-in way for outside software to book into it`,`The previous outside connector had 13 documented problems and ran on a server we didn't control`,`That connector cost ~$3,500/month on top of the records-system license`,`Bookings are created directly in the records system, not via a scheduling link`,`Checks the live schedule first, so closed days and taken slots are blocked`],
    forYou:`If your records system won't talk to anything, the highest-leverage thing you can build isn't another app — it's the connector that makes everything you already own finally work together.` },

  { slug:`clinical-scribe`, name:`Clinical Scribe`,
    tagline:`I talk to the patient. The note writes itself.`,
    tag:`on iPad`,
    problem:`Writing up a visit after the patient leaves eats an hour a day and pulls attention away from the person in the room. And the obvious shortcut — just record it on the iPad — quietly fails: the moment the screen locks or you switch apps, the tablet stops listening, so half the visit goes missing without anyone noticing.`,
    built:`I built a recording tool that listens to an in-person visit on an iPad and writes the doctor's note for me automatically — in plain English, even when the conversation switches between English and Spanish. It quietly solves the screen-lock problem so the recording doesn't vanish, and it drops a clean summary straight onto the patient's record.`,
    how:[`I pick today's patient from the schedule and tap Start — the screen stays calm and plain, with no obvious recording light a patient might notice.`,`It listens through the whole visit, even when the talk flips between English and Spanish, and tells apart who's speaking — the doctor versus the patient.`,`When I tap Done, it writes a short, plain-English summary: the patient's concerns, the plan, prices and key dates pulled out, and even real quotes the patient said.`,`Before anything saves, it shows the patient's name in big letters and makes me confirm twice — so a note can never land on the wrong chart.`,`The finished note and the audio go straight onto the patient's record, and a copy of each day's visits is filed away automatically.`],
    result:`The note is written before the patient is out the door, so I stay focused on the person in front of me instead of paperwork — and nothing from the visit slips through the cracks.`,
    facts:[`Records a visit, or imports one from the phone's voice-memo app`,`Understands conversations that mix English and Spanish; writes the note in English`,`Survives the screen locking or app-switching by saving in short pieces`,`Two-tap name confirmation so notes never go on the wrong chart`,`Sign a consent or book a follow-up mid-visit without stopping the recording`,`On/off switch; keeps the audio private on the record`],
    forYou:`If your team still types up notes after every visit, this hands that hour back to the doctor and keeps the record complete — without buying new hardware beyond the iPad you already have.` },

  { slug:`ai-tooling`, name:`My Quality-Control Tools`,
    tagline:`I built the tools that check my own work — so I can move fast without breaking things.`,
    tag:`my edge`,
    problem:`Building automations quickly is easy. Building them quickly without quietly introducing mistakes is the hard part — and a single missed flaw in a system that texts patients or moves money can cause real damage before anyone notices.`,
    built:`I built a set of AI helpers whose only job is to catch my own mistakes before they go live. One sends a team of AI inspectors through my work to hunt for errors, another puts a plan in front of a panel of different AIs to argue over its weak spots, and a third quietly grades the quality of every patient message my systems send. Together they let me ship fast and still sleep at night.`,
    how:[`The bug hunter splits the work across a team of specialist AI inspectors — each one looks for a different kind of problem (broken logic, security holes, things built but never turned on, things that look fine but quietly fail).`,`A quick scan flags the riskiest files first, so each inspector goes straight to where mistakes are most likely to hide.`,`The plan reviewer hands the same plan to three different AI models from three companies, has each score and critique it independently, then shows me where they agree (act) and where they disagree (stop and decide).`,`It keeps rewriting and re-scoring the plan over a few rounds until it hits a quality bar, with a fresh-eyes pass so a model can't rubber-stamp its own earlier feedback.`,`The nightly quality grader has a second AI silently score every patient reply; if quality slips or the daily cost runs over a cap, it shuts itself off automatically.`],
    result:`I can build and change systems far faster than usual because the checking is automated and thorough instead of slow and manual. Real problems — undocumented live systems, safety gaps, a silent data-loss error — get caught and listed for fixing instead of discovered the hard way.`,
    facts:[`The bug hunter runs 16 specialist AI inspectors in parallel`,`Inspectors must point to a problem by exact file and line — guessing is forbidden`,`The plan reviewer uses three independent AI models from three companies`,`It rewrites and re-scores a plan over multiple rounds until it passes`,`Any real secret it stumbles on is masked; patient details are stripped first`,`The message grader has a ~$5/day cost cap that disables it if it runs too hot`],
    forYou:`Any practice serious about AI needs the unglamorous safety layer too — the same automated reviewers that catch my mistakes can audit and harden the automations a practice already relies on.` },

  { slug:`dealsnap`, name:`DealSnap`,
    tagline:`Snap a photo of the paper sheet. The record creates itself.`,
    tag:`from a photo`,
    problem:`After every patient visit, our coordinator has to copy the handwritten sheet into our patient database by hand. It takes a couple of minutes each time, she does it 15 to 20 times a day, and it's easy to type the wrong name or file the patient under the wrong category.`,
    built:`I built a phone and tablet app that turns a photo of the patient sheet into a finished record. The coordinator takes a picture, AI reads the handwriting, figures out which treatment category and stage it belongs in, finds the matching patient, and creates the record. The whole thing takes about 30 seconds instead of a few minutes.`,
    how:[`The coordinator unlocks the app with a PIN and photographs the patient sheet (plus an optional receipt for payment details).`,`AI reads the photo and pulls out the name, the treatment discussed, the dollar amount, and any payment made.`,`It sorts the patient into the right one of nine treatment categories and the right stage, and detects whether a deposit was paid.`,`It looks the patient up in our database and double-checks against our medical-records system so it links to the right person.`,`The coordinator sees a pre-filled form, fixes anything that looks off, and taps once to save.`],
    result:`A task that used to take two to three minutes per patient now takes about 30 seconds, cutting roughly an hour of daily typing down to about ten minutes. Every record lands in the right place, linked to the right patient.`,
    facts:[`About 30 seconds from photo to finished record`,`Sorts into 9 treatment categories automatically`,`Native iPhone and iPad app, PIN-protected`,`Optional second photo reads the payment receipt`,`Built and tested; in final stages awaiting app-store approval`],
    forYou:`If your front desk re-types visit notes into a database all day, the same photo-to-record approach can give that hour back without changing how staff work on paper.` },

  { slug:`lead-integrity`, name:`Lead Integrity`,
    tagline:`"We reached the patient" should be a fact, not a checkbox.`,
    tag:`proof, not claims`,
    problem:`In a busy practice, a follow-up task gets marked "done" the moment someone says they handled it — but nobody checks whether the patient actually booked, showed up, or paid. So real leads quietly slip through while the to-do list looks clean.`,
    built:`I built a system that verifies every patient follow-up against the two things that can't lie: the phone and the calendar. Before a task is allowed to close, it checks our scheduling system to see if that patient really booked, really came in, or really paid — and if they didn't, the task reopens so someone actually follows up. It also stops the team from calling people who already booked.`,
    how:[`Before closing any follow-up, it looks the patient up in our scheduling system — the booking calendar is treated as the final word, not someone's memory.`,`If the calendar shows a real upcoming appointment, the task closes as "booked." If it shows the patient came in or paid, it closes as "handled." Anything else stays open.`,`Patients who already booked are taken off the call list automatically, so the team never wastes a call on someone already on the schedule.`,`Leads that were marked done but never really booked get reopened and routed to a real follow-up instead of disappearing.`,`Genuinely promising leads are protected — the system never quietly writes off someone who's still showing interest.`],
    result:`The to-do list finally reflects reality: a closed task means the patient was actually reached and booked, not just that someone clicked a button. Leads stop falling through the cracks, and the team stops wasting calls on people who already have an appointment.`,
    facts:[`Every follow-up is checked against the scheduling calendar before it can close`,`Checks three real outcomes: booked, showed up, or paid`,`Patients who already booked are removed from the call list automatically`,`Tasks that were never truly handled get reopened, not deleted`,`Promising leads are protected from being written off by mistake`],
    forYou:`If your team closes follow-up tasks on the honor system, this is how you turn "we called them" into something you can actually verify — and recover the leads that were quietly being lost.` },

  { slug:`scribesnap`, name:`ScribeSnap`,
    tagline:`Hold a key, talk, and your words land as clean text — anywhere on screen.`,
    tag:`dictation`,
    problem:`Typing notes between patients eats time I don't have, and bolting words onto a keyboard all day is slow and exhausting. I wanted to just talk and have tidy text appear wherever I was already working.`,
    built:`I built a small Mac app that lives quietly in the menu bar. I hold a key, speak naturally, let go — and a moment later cleaned-up text drops into whatever I had open, whether that's a patient chart, a message, or an email. No copy-paste, no switching windows. I use it on my own Mac every day.`,
    how:[`Hold the Fn key (or Option+Space), talk, then release — that's the whole interaction.`,`A small indicator at the bottom of the screen shows it's listening, so I'm never guessing.`,`It turns my speech into text, tidies up the punctuation and filler words, and drops it right where my cursor already was.`,`A quick accidental tap is ignored with a gentle "hold while speaking" nudge, so I never send half a word.`,`If a paste ever misses, it keeps the last text ready to retry or copy — nothing gets lost.`],
    result:`Dictating instead of typing is far faster and far less tiring across a busy clinic day. Words show up clean and in place, so I stay in whatever I'm doing instead of stopping to type.`,
    facts:[`Runs as a Mac menu-bar app — keeps working with the window closed`,`Push-to-talk: hold a key, speak, release; text pastes at your cursor`,`Works in any app — chart, messages, email, notes`,`Cleans up filler and punctuation automatically before pasting`,`In daily use on my own Mac since May 2026`],
    forYou:`Most of a clinician's day is spent typing into screens — a hold-and-talk tool like this gives that time back without changing a single system you already use.` },
];

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Outfit:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a0a0c"/><circle cx="32" cy="32" r="30" fill="none" stroke="#36e3b0" stroke-opacity="0.25"/><text x="32" y="42" font-family="Georgia, serif" font-size="30" font-style="italic" fill="#36e3b0" text-anchor="middle">JL</text></svg>
`;

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#08080a;--bg2:#0d0d11;--text:#f3f3ef;--text-dim:#a0a0ac;--text-faint:#56565f;--accent:#36e3b0;--accent-muted:#4da38f;--line:rgba(255,255,255,.09);--line-soft:rgba(255,255,255,.05);--serif:'Newsreader',Georgia,serif;--sans:'Outfit',-apple-system,sans-serif;--mono:'JetBrains Mono',monospace}
html{font-size:16px;scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-weight:300;line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;position:relative;min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(54,227,176,.06),transparent 60%)}
body::after{content:'';position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:.04;mix-blend-mode:screen;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
main,header,footer{position:relative;z-index:1}
.sysnav{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:26px 7vw;max-width:1120px;margin:0 auto}
.sysnav a{font-family:var(--mono);font-size:12px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;color:var(--text-faint);transition:color .3s}
.sysnav a:hover{color:var(--text)}
.sysnav-cta{color:var(--accent)!important}
.sys-hero{max-width:880px;margin:0 auto;padding:64px 7vw 46px}
.sys-num{font-family:var(--mono);font-size:12px;letter-spacing:2px;color:var(--text-faint);margin-bottom:18px}
.sys-tag{font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:22px}
.sys-hero h1{font-family:var(--serif);font-weight:400;font-size:clamp(40px,7vw,76px);line-height:1.02;letter-spacing:-0.03em;margin-bottom:24px}
.sys-tagline{font-size:clamp(19px,2.6vw,26px);font-weight:300;color:var(--text-dim);max-width:640px;line-height:1.45}
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:34px}
.chip{font-family:var(--mono);font-size:11px;letter-spacing:.3px;color:var(--text-dim);background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:8px;padding:7px 12px;line-height:1.3}
.sys-body{max-width:760px;margin:0 auto;padding:30px 7vw 0}
.sys-sec{padding:34px 0;border-top:1px solid var(--line-soft)}
.sys-l{font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-muted);margin-bottom:14px}
.sys-l--accent{color:var(--accent)}
.sys-sec>p{font-size:18px;line-height:1.7;color:var(--text-dim);font-weight:300}
.how{list-style:none;display:flex;flex-direction:column;gap:18px;counter-reset:s}
.how li{position:relative;padding-left:44px;font-size:16px;line-height:1.65;color:var(--text-dim);counter-increment:s}
.how li::before{content:counter(s,decimal-leading-zero);position:absolute;left:0;top:0;font-family:var(--mono);font-size:11px;color:var(--accent);border:1px solid var(--line);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center}
.sys-foryou{margin-top:34px;background:linear-gradient(180deg,rgba(54,227,176,.05),rgba(54,227,176,.015));border:1px solid rgba(54,227,176,.18);border-radius:18px;padding:28px 30px}
.sys-foryou p{font-family:var(--serif);font-style:italic;font-weight:300;font-size:19px;line-height:1.5;color:var(--text)}
.sys-nav2{max-width:760px;margin:30px auto 0;padding:0 7vw;display:flex;justify-content:space-between;gap:16px;align-items:center}
.sys-nav2 a{font-family:var(--mono);font-size:11px;letter-spacing:.5px;color:var(--text-faint);text-decoration:none;max-width:38%;transition:color .3s}
.sys-nav2 a:hover{color:var(--accent)}
.sys-nav2-all{color:var(--text-dim)!important;text-transform:uppercase;letter-spacing:1.5px;text-align:center}
.sys-cta{max-width:760px;margin:80px auto 0;padding:72px 7vw;text-align:center;border-top:1px solid var(--line-soft)}
.sys-cta h2{font-family:var(--serif);font-weight:400;font-size:clamp(28px,4vw,42px);letter-spacing:-0.02em;margin-bottom:16px}
.sys-cta p{color:var(--text-dim);max-width:480px;margin:0 auto 28px}
.cta-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;border-radius:100px;border:1px solid var(--accent);color:var(--accent);text-decoration:none;font-family:var(--mono);font-size:13px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s}
.cta-btn:hover{background:var(--accent);color:var(--bg);box-shadow:0 0 40px rgba(54,227,176,.4)}
.sys-foot{text-align:center;padding:54px 7vw;font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--text-faint);border-top:1px solid var(--line-soft);margin-top:30px}
@media(max-width:600px){.sys-nav2{flex-direction:column;align-items:flex-start;gap:12px}.sys-nav2 a{max-width:100%}.sys-sec>p{font-size:16px}.sys-foryou{padding:24px 22px}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}`;

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function attr(s){ return esc(s).replace(/"/g,'&quot;'); }

function page(s, prev, next, i){
  const facts = s.facts.map(f=>`<span class="chip">${esc(f)}</span>`).join('');
  const how = s.how.map(h=>`<li>${esc(h)}</li>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(s.name)} — Jean-Paul Leva</title>
<meta name="description" content="${attr(s.tagline)}">
<meta property="og:title" content="${attr(s.name)} — Jean-Paul Leva">
<meta property="og:description" content="${attr(s.tagline)}">
<meta property="og:type" content="article">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script src="/gate.js"></script>
${FONTS}
<link rel="stylesheet" href="/systems.css">
</head>
<body>
<header class="sysnav">
  <a class="sysnav-back" href="/">&larr; Jean-Paul Leva</a>
  <a class="sysnav-cta" href="mailto:drleva@drleva.com?subject=AI%20for%20my%20practice">Work with me &rarr;</a>
</header>
<main>
  <section class="sys-hero">
    <div class="sys-num">${String(i+1).padStart(2,'0')} / 11</div>
    <div class="sys-tag">${esc(s.tag)}</div>
    <h1>${esc(s.name)}</h1>
    <p class="sys-tagline">${esc(s.tagline)}</p>
    <div class="chips">${facts}</div>
  </section>
  <section class="sys-body">
    <div class="sys-sec"><div class="sys-l">The problem</div><p>${esc(s.problem)}</p></div>
    <div class="sys-sec"><div class="sys-l">What I built</div><p>${esc(s.built)}</p></div>
    <div class="sys-sec"><div class="sys-l">How it works</div><ol class="how">${how}</ol></div>
    <div class="sys-sec"><div class="sys-l">The result</div><p>${esc(s.result)}</p></div>
    <div class="sys-foryou"><div class="sys-l sys-l--accent">For your practice</div><p>${esc(s.forYou)}</p></div>
  </section>
  <nav class="sys-nav2">
    <a href="/${prev.slug}/">&larr; ${esc(prev.name)}</a>
    <a class="sys-nav2-all" href="/#systems">All systems</a>
    <a href="/${next.slug}/">${esc(next.name)} &rarr;</a>
  </nav>
  <section class="sys-cta">
    <h2>Want something like this in your practice?</h2>
    <p>I help practices build their own AI — owned in-house, not rented from an agency.</p>
    <a class="cta-btn" href="mailto:drleva@drleva.com?subject=AI%20for%20my%20practice">Start a conversation &rarr;</a>
  </section>
</main>
<footer class="sys-foot">&copy; 2026 Jean-Paul Leva &middot; Leva Medical</footer>
</body>
</html>
`;
}

const ROOT = __dirname;
fs.writeFileSync(path.join(ROOT,'systems.css'), CSS);
fs.writeFileSync(path.join(ROOT,'favicon.svg'), FAVICON);
SYSTEMS.forEach((s,i)=>{
  const prev = SYSTEMS[(i-1+SYSTEMS.length)%SYSTEMS.length];
  const next = SYSTEMS[(i+1)%SYSTEMS.length];
  const dir = path.join(ROOT, s.slug);
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir,'index.html'), page(s, prev, next, i));
});
console.log('Built systems.css, favicon.svg, and ' + SYSTEMS.length + ' system pages: ' + SYSTEMS.map(s=>s.slug).join(', '));
