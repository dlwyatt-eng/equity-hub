"use client";
/* eslint-disable @next/next/no-img-element -- compressed local WebP assets are used for predictable projector rendering. */

import { useEffect, useState } from "react";

type View = "home" | "teach" | "plan" | "issues" | "action" | "library";
type Tone = "leaf" | "sun" | "sky" | "berry" | "coral" | "sand";

type LessonStep = {
  label: string;
  time: string;
  title: string;
  prompt: string;
  directions: string[];
  options?: string[];
  maxChoices?: number;
  cards?: { title: string; text: string }[];
  links?: { label: string; href: string }[];
  image?: string;
  imageAlt?: string;
  artSpark?: string;
  visual?: "decision" | "representation" | "participation" | "source-check" | "governance" | "ai-lens" | "evidence-spectrum";
};

type Lesson = {
  id: string;
  title: string;
  shortTitle: string;
  question: string;
  timing: string;
  length: string;
  grades: string;
  tone: Tone;
  use: string;
  activity: string;
  product: string;
  materials: string;
  formats: string[];
  printable: {
    title: string;
    href: string;
    bwHref: string;
    includes: string;
  };
  steps: LessonStep[];
  teacher: {
    prepare: string[];
    moves: string[];
    care: string;
    curriculum: string[];
    evidence: string;
    sources?: { label: string; href: string }[];
    adaptations?: { band: string; move: string }[];
  };
};

type Runway = {
  month: string;
  event: string;
  start: string;
  create: string;
  share: string;
  date: string;
  lesson?: string;
  startAt?: number;
  href?: string;
  cta?: string;
  priority: "Core" | "Featured" | "Choice" | "Plan";
};

const lessons: Lesson[] = [
  {
    id: "belonging-built",
    title: "Belonging is built",
    shortTitle: "Belonging",
    question: "What helps everyone join in and be themselves?",
    timing: "Sept. 8–15; assemble after classes settle",
    length: "45–55 min or 2 × 25 min",
    grades: "K–7 adaptable",
    tone: "leaf",
    use: "Build shared language for belonging, access, and student voice.",
    activity: "Compare fairness, rank six belonging actions, then develop one full-page action picture",
    product: "One full-page action studio per student, two or three class commitments, and a check-back date",
    materials: "Projector · one group reference page · one full-page student studio per learner · crayons or markers",
    formats: ["Same-or-fair look", "Action ranking", "Full-page action studio"],
    printable: {
      title: "Belonging Action Studio",
      href: "/downloads/lesson-belonging-builder.pdf",
      bwHref: "/downloads/lesson-belonging-builder-black-white.pdf",
      includes: "Group action-card reference + one full-page student action studio + teacher quick start",
    },
    steps: [
      {
        label: "LOOK",
        time: "4 min",
        title: "Which side feels fair?",
        prompt: "Which side gives more students a real way to learn?",
        directions: ["Look quietly.", "Point to clues that prove it."],
        image: "/images/same-versus-fair.webp",
        imageAlt: "Two classroom scenes compare one handwritten task for everyone with flexible ways to read, listen, write, draw, or speak.",
      },
      {
        label: "RANK",
        time: "8 min",
        title: "What would help this week?",
        prompt: "Which three actions should we practise first?",
        directions: ["Study all six picture cards.", "Choose and explain three to practise first. All six still matter."],
        options: ["Invite", "Listen", "Explain", "Offer choices", "Make space", "Say names with care"],
        maxChoices: 3,
      },
      {
        label: "DISCUSS",
        time: "8 min",
        title: "Same, fair, or it depends?",
        prompt: "Does fairness always mean everyone gets the same thing?",
        directions: ["Move to a corner or tap a choice.", "Use one example as proof."],
        options: ["SAME", "FAIR", "IT DEPENDS"],
        maxChoices: 1,
      },
      {
        label: "DRAW",
        time: "20 min",
        title: "Develop one action on a full page",
        prompt: "What would your action look and sound like in a real classroom moment?",
        directions: ["Choose one real action and draw it happening in the large space.", "Add labels, explain who it helps and why, then name one first move you can try."],
        artSpark: "Use the full page. Make the action—not just a symbol—easy to understand without needing you to explain it aloud.",
      },
      {
        label: "SHARE",
        time: "7 min",
        title: "Choose what we will practise",
        prompt: "Which two or three actions will we notice this week?",
        directions: ["Students choose whether to share their page with a partner, teacher, or the class.", "Tally the actions without ranking artwork.", "Choose two or three actions to practise first and set a one-week check-back."],
        image: "/images/hero-belonging-built.webp",
        imageAlt: "Students and an adult creating a welcoming learning space with visual supports, flexible choices, and clear paths.",
      },
    ],
    teacher: {
      prepare: [
        "Print page 1 once per group and page 2 once per student. Keep page 2 full size; do not print four pages per sheet.",
        "Open the linked B.C. video page and cue Episode 4, ‘Inclusion 2.0: Teaching to Diversity,’ before class.",
        "Pre-cut action cards only if cutting may be a barrier; set three room corners: same, fair, it depends.",
        "During Grade 6 rotation, keep each named full-page studio with the student's handoff materials. Revisit the pages only after classes are set.",
      ],
      moves: ["Ask “What makes you say that?”", "Separate barriers from personal deficits.", "Invite several ways to contribute."],
      care: "Students may draw on fictional or general examples. Nobody needs to disclose an identity, diagnosis, or personal experience.",
      curriculum: ["Social Studies: systems and participation", "Language Arts: exchanging ideas", "ADST: design for users", "Career Education: community responsibility"],
      evidence: "One full-page action studio per student, two or three class commitments, and a one-week check-back date; optional student-chosen SpacesEDU photo.",
      sources: [
        { label: "B.C. video — Episode 4: Teaching to Diversity", href: "https://www2.gov.bc.ca/gov/content/education-training/k-12/teach/resources-for-teachers/inclusive-education/videos" },
      ],
    },
  },
  {
    id: "voice-and-rules",
    title: "Whose voice shapes the rules?",
    shortTitle: "Voice & rules",
    question: "How can a community make decisions so people can be heard, represented, and included?",
    timing: "Sept. 8–Oct. 23; choose one short route",
    length: "15 min, 45 min, or 2 × 40 min",
    grades: "K–12 adaptable; core screens Grades 3–8",
    tone: "sun",
    use: "Use the Surrey election as a real equity case: who is heard, whose perspective is missing, and how voice continues after voting.",
    activity: "Choose a route: fair class decision, Surrey recreation-centre case, campaign-source check, trustee challenge, or post-election check-in",
    product: "Only when useful: a reasoned recommendation, one question for a decision-maker, or a participation route",
    materials: "Projector · selected student pages · pencils · direct sources already linked",
    formats: ["15-min discussion", "Surrey decision lab", "Trustee voice challenge"],
    printable: {
      title: "Who Gets Heard? Surrey Voice Lab",
      href: "/downloads/lesson-fair-decision-lab.pdf",
      bwHref: "/downloads/lesson-fair-decision-lab-black-white.pdf",
      includes: "Four student pages + teacher route map: class choice, Surrey case, representation, source check, trustee voice, and participation",
    },
    steps: [
      {
        label: "CHOOSE",
        time: "4 min",
        title: "Gallery walk or small-group showcase?",
        prompt: "How should we share our next class project?",
        directions: ["Choose before reading the new-information cards.", "Record one reason for your first choice."],
        options: ["Gallery walk", "Small-group showcase"],
        maxChoices: 1,
        image: "/images/voice-and-rules.webp",
        imageAlt: "Students use several fair ways to share ideas and make a group decision, including talking circles, voting, and anonymous responses.",
      },
      {
        label: "REVEAL",
        time: "7 min",
        title: "Reveal new information",
        prompt: "What did our first choice not consider?",
        directions: ["Uncover one new-information card.", "Choose: keep, switch, combine or redesign, or learn more."],
        options: ["Keep", "Switch", "Combine or redesign", "Learn more"],
        maxChoices: 1,
        cards: [
          { title: "MOVEMENT + CROWD", text: "Busy movement can make it hard to focus, see, hear, or move safely." },
          { title: "LIVE SPEAKING", text: "Some students need preparation time or another way to explain their work." },
          { title: "VOICE MISSING", text: "Nobody asked what would help creators and visitors participate." },
        ],
      },
      {
        label: "ROUTE",
        time: "12 min",
        title: "Use every checkpoint",
        prompt: "How can we redesign the sharing plan so more students can participate?",
        directions: ["Talk through all five checkpoints.", "Record which checkpoint changed your plan."],
        options: ["Hear", "Check", "Redesign", "Decide", "Review"],
        visual: "decision",
      },
      {
        label: "BUILD",
        time: "18 min",
        title: "Write a rule for fair decisions",
        prompt: "When is a group decision ready to try?",
        directions: ["Use evidence from the changed plan.", "Finish: A decision is ready to try when…"],
        artSpark: "Follow the printed route: HEAR → CHECK → REDESIGN → DECIDE → REVIEW. No cutting is needed.",
      },
      {
        label: "REVIEW",
        time: "8 min",
        title: "Plan the review",
        prompt: "What should we check after we try the plan?",
        directions: ["Name who might still face a barrier.", "Choose when and how the class will check back.", "Mark what students influence, what the teacher decides, and what needs school approval."],
      },
      {
        label: "SURREY CASE",
        time: "15 min",
        title: "One recreation centre. Where should it go?",
        prompt: "Should the city prioritize population, travel distance, greatest need, geographic fairness—or a combination?",
        directions: ["Compare all four evidence cards; the place names are fictional.", "Choose a location or request one missing piece of evidence.", "Be ready to revise. There is no single correct answer."],
        cards: [
          { title: "AREA A · GROWTH", text: "Many new homes and young families; one small centre already serves the area." },
          { title: "AREA B · DISTANCE", text: "Residents travel the farthest to reach indoor recreation; bus trips can require transfers." },
          { title: "AREA C · ACCESS", text: "The area has more facilities, but users report physical and sensory barriers." },
          { title: "AREA D · SPACE", text: "A suitable public site is available, but fewer people live nearby today." },
        ],
        visual: "decision",
        links: [
          { label: "Surrey recreation facilities", href: "https://www.surrey.ca/parks-recreation/recreation-facilities" },
          { label: "Surrey Accessibility Action Plan", href: "https://www.surrey.ca/about-surrey/accessibility-services/accessibility-action-plan" },
        ],
      },
      {
        label: "MISSING",
        time: "10 min",
        title: "Whose perspective is missing?",
        prompt: "Who should be consulted before the recreation-centre decision is made?",
        directions: ["Choose one role or community not yet heard.", "Write one respectful question for people with that experience.", "Remember: no group has only one opinion."],
        options: ["Children", "Teens", "Seniors", "Disabled people", "Newcomers", "Renters", "Transit users", "Indigenous Nations", "People without housing"],
        maxChoices: 2,
        visual: "representation",
      },
      {
        label: "REPRESENT",
        time: "15–25 min",
        title: "What does representation look like?",
        prompt: "Which experiences, issues, communities, and perspectives appear in the campaign—and which are hard to find?",
        directions: ["Use the official candidate list only after September 11.", "Sample the same amount of material for each candidate or organization.", "Track issues and evidence—not private family views or a demographic scorecard."],
        visual: "representation",
        links: [
          { label: "Official Surrey candidates", href: "https://www.surrey.ca/city-government/2026-municipal-election/candidates" },
          { label: "Roles of elected positions", href: "https://www.surrey.ca/city-government/2026-municipal-election/candidates/elected-positions-roles-responsibilities" },
        ],
      },
      {
        label: "TRUSTEES",
        time: "15–25 min",
        title: "Who represents students?",
        prompt: "What should a school trustee hear from young people before making district-wide decisions?",
        directions: ["Choose one school experience trustees should understand.", "Gather input in more than one way; do not claim every student agrees.", "Create one finding, one question, and one realistic recommendation."],
        cards: [
          { title: "A FINDING", text: "A pattern supported by anonymous input, observation, or another appropriate source." },
          { title: "A QUESTION", text: "Something students need a trustee or the board to explain, investigate, or consider." },
          { title: "A RECOMMENDATION", text: "A specific idea plus who benefits, what support it needs, and how to report back." },
        ],
        visual: "participation",
        links: [
          { label: "Surrey Student Voice example", href: "https://www.surreyschools.ca/_ci/p/168658" },
          { label: "Board meetings & how the public communicates", href: "https://www.surreyschools.ca/board-meetings" },
          { label: "What trustees do", href: "https://www.surreyschools.ca/considering-a-run-for-school-trustee--surrey-schools-is-hosting-an-information-session-for-prospective-candidates-.207571" },
        ],
      },
      {
        label: "SOURCE CHECK",
        time: "15–25 min",
        title: "What kind of message is this?",
        prompt: "Fact, opinion, claim, evidence, campaign promise, or prediction? How do we know?",
        directions: ["Name the message type before deciding whether you agree.", "Find the strongest available evidence.", "Label the source: government information, news reporting, candidate material, opinion, or advertising."],
        visual: "source-check",
        links: [
          { label: "CIVIX classroom resources", href: "https://studentvote.ca/canada/resources/" },
          { label: "City election information", href: "https://www.surrey.ca/city-government/2026-municipal-election" },
          { label: "Elections Canada — AI and inaccurate information", href: "https://www.elections.ca/content.aspx?dir=int&document=dig&lang=e&section=vot" },
        ],
      },
      {
        label: "AI EQUITY LENS",
        time: "15–25 min · optional",
        title: "A powerful tool—or AI news story—enters the community",
        prompt: "Who benefits, who bears the costs, who has power, and who is missing?",
        directions: ["Choose one ready dilemma card or one teacher-opened current event; no AI account is needed.", "Separate fact, claim, value, prediction, and unknown. AI learns patterns from human-created information, but do not assume every system has the same bias—look for evidence about this one.", "Revise the idea so more people can benefit without carrying costs they never agreed to."],
        cards: [
          { title: "WHAT HAPPENED?", text: "Who is affected? What evidence do we have? What remains uncertain?" },
          { title: "POWER + DISTRIBUTION", text: "Who controls it, benefits, bears costs, gets heard, or is missing?" },
          { title: "WHAT NEXT?", text: "Who should decide, who can challenge it, and what would make it more equitable?" },
        ],
        visual: "ai-lens",
        links: [
          { label: "Colour dilemma cards", href: "/downloads/ai-equity-dilemma-cards.pdf" },
          { label: "Low-ink B&W cards", href: "/downloads/ai-equity-dilemma-cards-black-white.pdf" },
        ],
      },
      {
        label: "AI RULES COUNCIL",
        time: "30–45 min · optional",
        title: "Who needs a seat at the table?",
        prompt: "Your community must set rules for a powerful AI system. Who should help decide?",
        directions: ["Give each group a role card and one dilemma.", "Each group proposes one benefit to protect, one harm to prevent, one right to challenge a decision, and one way to check results.", "Add someone who is not in the room but will still be affected."],
        options: ["Students", "Families", "Workers", "Businesses", "Scientists", "Disability advocates", "Indigenous governments", "Environmental advocates", "Government", "Future generations"],
        maxChoices: 3,
        visual: "decision",
      },
      {
        label: "POWER + CHECKS",
        time: "15–25 min · optional",
        title: "Who can challenge an AI decision?",
        prompt: "If a system affects school support, hiring, health care, or public safety, what checks should exist?",
        directions: ["Design a route that includes notice, a human explanation, a safe appeal, a correction, and a later fairness check.", "Assign responsibility to specific people or institutions.", "Test the route from the perspective of someone with less money, time, language access, or power."],
        cards: [
          { title: "CURRENT", text: "AI tools already translate, recommend, describe images, recognize patterns, and generate media." },
          { title: "EMERGING", text: "New capabilities and uses are being tested; evidence and rules are still developing." },
          { title: "PREDICTION", text: "A reasoned claim about what may happen—not a fact about the future." },
          { title: "HYPOTHETICAL", text: "A possibility used to test values and rules. We do not know whether it will happen." },
        ],
        visual: "evidence-spectrum",
      },
      {
        label: "PARTICIPATE",
        time: "10–15 min",
        title: "Voting is one piece",
        prompt: "How can children and youth influence public decisions before they are old enough to vote?",
        directions: ["Choose one participation route that fits the issue and decision-maker.", "Name what response or change you would check for.", "Do not promise an outcome you cannot control."],
        options: ["Survey", "Student council", "Proposal", "Journalism", "Public consultation", "Community group", "Meeting", "Petition", "Peaceful demonstration", "Volunteer"],
        maxChoices: 2,
        visual: "participation",
        links: [
          { label: "How Surrey residents can address council", href: "https://www.surrey.ca/city-government/council-meetings" },
          { label: "Public notices & participation", href: "https://www.surrey.ca/city-government/public-notices" },
        ],
      },
      {
        label: "AFTER",
        time: "15 min",
        title: "Election day is not the finish line",
        prompt: "What should the new council and school board listen to, explain, and report back about?",
        directions: ["Separate the result from what happens next.", "Choose one campaign issue and identify the official who or body that can act.", "Set a later date to check decisions, budgets, meetings, or progress."],
        cards: [
          { title: "RESULT", text: "Who was elected? This answers who holds the office—not whether every need is now represented." },
          { title: "ACCOUNTABILITY", text: "What decision, promise, question, or community need should be followed?" },
          { title: "NEXT CHECK", text: "Which public meeting, board update, budget, policy, or community response will provide evidence?" },
        ],
        visual: "participation",
        links: [
          { label: "City election page & updates", href: "https://www.surrey.ca/city-government/2026-municipal-election" },
          { label: "Surrey council meetings", href: "https://www.surrey.ca/city-government/council-meetings" },
          { label: "Surrey Board meetings", href: "https://www.surreyschools.ca/board-meetings" },
        ],
      },
    ],
    teacher: {
      prepare: [
        "Choose a route; do not run all screens in one sitting. The AI Equity Lens and AI Rules Council are optional routes inside this power-and-participation lesson—not a separate unit.",
        "For a current event, open one credible source yourself and use the on-screen three-card routine. Students should not search an open web or test personal information in AI.",
        "Print only the pages the route uses. Page 1 supports Screens 1–5; pages 2–4 support the Surrey election route.",
        "Use the official candidate list only after nominations close September 11. Preview any candidate material and compare equal samples.",
        "Keep Classroom OS for election mechanics. Here, centre access, missing perspectives, representation, participation, and accountability.",
      ],
      moves: ["Ask who set the choices, whose experience is missing, and what evidence could change a mind.", "Separate representation by ideas, experience, community, interest, and perspective from simple identity counting.", "Keep returning to: output, response, change, and next check."],
      care: "Stay non-partisan. Never ask students to disclose family voting, defend a group, rank identities, or treat a community as if everyone agrees. Use hypothetical cases when a live issue is unsafe or too personal.",
      curriculum: ["Social Studies: government, representation, power, and participation", "Language Arts: claims, evidence, perspective, and discussion", "Career Education: community participation"],
      evidence: "A changed recommendation with reasons; a missing-perspective question; a source label; a trustee message; or a realistic participation and follow-up route. A product is optional.",
      sources: [
        { label: "City of Surrey – 2026 municipal election", href: "https://www.surrey.ca/city-government/2026-municipal-election" },
        { label: "Official Surrey candidate list – use after Sept. 11", href: "https://www.surrey.ca/city-government/2026-municipal-election/candidates" },
        { label: "Student Vote / CIVIX classroom resources", href: "https://studentvote.ca/canada/resources/" },
        { label: "Surrey Schools – Student Voice example", href: "https://www.surreyschools.ca/_ci/p/168658" },
        { label: "Surrey Schools – board meetings and public communication", href: "https://www.surreyschools.ca/board-meetings" },
        { label: "Elections Canada – AI and inaccurate information", href: "https://www.elections.ca/content.aspx?dir=int&document=dig&lang=e&section=vot" },
        { label: "Canadian Human Rights Commission – AI bias and discrimination", href: "https://www.chrc-ccdp.gc.ca/resources/publications/canadian-human-rights-commissions-2024-report-parliament" },
        { label: "Office of the Privacy Commissioner – Canadian privacy principles for generative AI", href: "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/" },
      ],
      adaptations: [
        { band: "K–2", move: "Use one classroom or playground choice: Who gets a turn to speak? What would make the choice fairer?" },
        { band: "3–5", move: "Use the recreation-centre cards, missing-perspective prompt, and Voting Is One Piece visual." },
        { band: "6–8", move: "Add candidate issue sampling, source labels, trustee recommendation, and follow-up." },
        { band: "9–12", move: "Compare policy trade-offs, institutions, systemic participation barriers, and accountability evidence." },
      ],
    },
  },
  {
    id: "truth-place-responsibility",
    title: "Truth, place & responsibility",
    shortTitle: "Truth & place",
    question: "What should we learn and do because we live on this land?",
    timing: "Sept. 15–29, leading to Orange Shirt Day",
    length: "2–3 × 40 min",
    grades: "Grades 4–7; K–3 teacher-led",
    tone: "coral",
    use: "Move beyond a one-day observance toward truth, living Nations, relationships, and responsibility.",
    activity: "Compare two provided Surrey maps, learn from one local First Nations source, then create a credited response",
    product: "A source-credited visual response, one next learning action, and a check-back date",
    materials: "Projector · linked maps · one selected local source · student pack · art materials",
    formats: ["Two-map look", "Source study", "Credited visual response"],
    printable: {
      title: "Truth, Place & Responsibility",
      href: "/downloads/lesson-truth-place-responsibility.pdf",
      bwHref: "/downloads/lesson-truth-place-responsibility-black-white.pdf",
      includes: "Two student pages + teacher quick start: source study, credited visual-layout choices, and dated responsibility",
    },
    steps: [
      {
        label: "MAP",
        time: "8 min",
        title: "Two maps of this place",
        prompt: "What does each map help us notice? What does neither map show?",
        directions: ["Locate Surrey on both provided maps.", "Notice one difference in what each map was made to show."],
        links: [
          { label: "First Peoples’ Map of B.C.", href: "https://maps.fpcc.ca/" },
          { label: "City of Surrey maps", href: "https://www.surrey.ca/services-payments/online-services/maps-cosmos" },
        ],
      },
      {
        label: "OPEN",
        time: "15–25 min",
        title: "Who is teaching us?",
        prompt: "What does the creator want learners to understand?",
        directions: ["Record the creator, title, and Nation or community.", "Look or listen twice before writing."],
        links: [
          { label: "Katzie First Nation — Who We Are", href: "https://katzie.ca/who-we-are/" },
          { label: "Semiahmoo First Nation — Community page", href: "https://www.semiahmoofirstnation.ca/" },
          { label: "Kwantlen First Nation — Official site", href: "https://www.kwantlenfn.ca/" },
        ],
      },
      {
        label: "CONNECT",
        time: "15 min",
        title: "What is strong and living today?",
        prompt: "Which exact detail supports your learning?",
        directions: ["Notice language, family, land, culture, community, or joy.", "Write or sketch one source detail."],
      },
      {
        label: "CREATE",
        time: "30–45 min",
        title: "Choose a visual layout",
        prompt: "What did this source teach us about this place, past and present?",
        directions: ["Show one exact detail, one thing that continues today, and one next question.", "Use only what the source supports and credit who taught you."],
        image: "/images/artivism-gallery.webp",
        imageAlt: "A colourful school artivism gallery with student-made posters, symbols, collage, and sculpture communicating care, fairness, belonging, and action.",
        artSpark: "Use ordinary scenes, place details, lettering, a timeline, or collage. Do not copy sacred or Nation-specific designs.",
      },
      {
        label: "GOVERNANCE",
        time: "10–20 min · optional",
        title: "Governments in relationship—not a ladder",
        prompt: "What changes when we understand First Nations as governments with inherent rights, laws, authority, and distinct governance systems?",
        directions: ["Open one local Nation’s own governance source.", "Notice the terms that Nation uses for its governance.", "Ask how governments may relate, negotiate, make agreements, or hold different responsibilities."],
        visual: "governance",
        links: [
          { label: "Katzie governance", href: "https://katzie.ca/governance/" },
          { label: "Kwantlen custom hereditary governance", href: "https://kwantlenfn.ca/court-ruling-2026/" },
          { label: "Semiahmoo Chief and Council", href: "https://www.semiahmoofirstnation.ca/chief-and-council" },
        ],
      },
      {
        label: "KNOWLEDGE + CONSENT",
        time: "10–20 min · optional",
        title: "Online does not mean free to take",
        prompt: "Who should decide whether community-held knowledge can be used to train or answer through AI?",
        directions: ["Begin with the First Nations principles of OCAP® source; do not ask an AI to imitate an Indigenous voice.", "Compare being able to access information with having consent to reuse it.", "Name who owns, controls, accesses, and possesses the information—and what remains for the Nation to decide."],
        cards: [
          { title: "ACCESS", text: "Someone can find the information online." },
          { title: "CONSENT", text: "The people or Nation with authority agreed to this use." },
          { title: "RESPONSIBILITY", text: "The user follows the community’s protocols and credits the source." },
        ],
        links: [{ label: "FNIGC — First Nations principles of OCAP®", href: "https://fnigc.ca/ocap-training/" }],
      },
      {
        label: "COMMIT",
        time: "5 min",
        title: "Choose our next learning action",
        prompt: "What is one small action our class can complete and check?",
        directions: ["Choose from the provided class actions.", "Add a date when we will check what happened."],
      },
    ],
    teacher: {
      prepare: [
        "Print student pages 1–2 per student or pair and set out art materials.",
        "Preview the two exact maps linked on Step 1; no resource search is needed.",
        "Choose one of the three local Nation sources shown on Step 2 and preview it for grade fit.",
        "Choose two or three realistic class actions from the linked NCTR ReconciliACTION Plans.",
        "Use the optional governance screen only when it supports the learning. Do not present First Nations as a fourth level underneath Canadian governments; governance differs by Nation.",
      ],
      moves: ["Use present tense for living Nations.", "Credit the specific voice and community.", "Pair difficult truth with strength, resistance, language, family, and continuity."],
      care: "Do not simulate residential schools, ask students to role-play trauma, or ask Indigenous students to speak for a community.",
      curriculum: ["Social Studies: First Peoples and colonial policies", "Language Arts: story and perspective", "Arts Education: communicating meaning"],
      evidence: "A source-credited gallery panel plus one dated class commitment.",
      sources: [
        { label: "First Peoples’ Map of B.C.", href: "https://maps.fpcc.ca/" },
        { label: "NCTR – ReconciliACTION Plans", href: "https://nctr.ca/education/reconciliaction-plans/" },
        { label: "Katzie First Nation – Who We Are", href: "https://katzie.ca/who-we-are/" },
        { label: "Semiahmoo First Nation – Community page", href: "https://www.semiahmoofirstnation.ca/" },
        { label: "Katzie First Nation – Governance", href: "https://katzie.ca/governance/" },
        { label: "Kwantlen First Nation – Custom hereditary governance statement", href: "https://kwantlenfn.ca/court-ruling-2026/" },
        { label: "FNIGC – First Nations principles of OCAP®", href: "https://fnigc.ca/ocap-training/" },
      ],
      adaptations: [
        { band: "K–2", move: "Learn that Nations make decisions for their communities; use one Nation-created story or image chosen by the teacher." },
        { band: "3–5", move: "Compare what two maps were created to show; name that First Nations are governments, not a level below the city." },
        { band: "6–8", move: "Study one Nation’s own governance language and one real relationship or agreement." },
        { band: "9–12", move: "Examine inherent rights, self-government, traditional and elected systems, and jurisdiction using Nation-authored sources." },
      ],
    },
  },
  {
    id: "rights-in-our-room",
    title: "Rights in our room",
    shortTitle: "Children’s rights",
    question: "What rights belong to every child?",
    timing: "Before Nov. 20; brief revisit Dec. 10",
    length: "55–65 min or 2 × 30 min",
    grades: "Grades 3–7",
    tone: "sky",
    use: "Connect human rights to students’ daily lives without turning rights into rewards.",
    activity: "Spot a right, solve the Rights Repair Mystery, then repair a fictional case in a comic",
    product: "A four-frame Rights Repair comic",
    materials: "Projected scene · Rights Repair card set · comic page · scissors optional",
    formats: ["Rights mystery", "Match pairs", "Repair comic"],
    printable: {
      title: "Rights Repair Mystery",
      href: "/downloads/lesson-rights-in-our-room.pdf",
      bwHref: "/downloads/lesson-rights-in-our-room-black-white.pdf",
      includes: "Two student pages + teacher quick start: rights-and-adult matches, fictional scenarios, and repair comic",
    },
    steps: [
      {
        label: "SPOT",
        time: "7 min",
        title: "Rights Repair Mystery",
        prompt: "Where is a right supported—or blocked?",
        directions: ["Find three clues.", "Say what makes each clue matter."],
        image: "/images/children-rights-in-action.webp",
        imageAlt: "Children learning, sharing ideas, receiving care, playing, and joining activities in accessible ways across a classroom and schoolyard.",
      },
      {
        label: "MATCH",
        time: "12 min",
        title: "Rights need responsible adults",
        prompt: "Which adult or system action protects each right?",
        directions: ["Match six pairs.", "Explain one match."],
        options: ["Safety", "Learning", "Voice", "Identity", "Play", "Care"],
      },
      {
        label: "SOLVE",
        time: "10 min",
        title: "Open one fictional case",
        prompt: "Which right may be affected, and what should an adult or school find out or change?",
        directions: ["Choose one fictional class case; nobody shares a personal story.", "Name what adults should ask, check, or change."],
        options: ["A class video has no captions", "A playground rule is made without checking how it affects safe play", "A student’s full name is repeatedly ignored"],
        maxChoices: 1,
      },
      {
        label: "COMIC",
        time: "20 min",
        title: "Make a Rights Repair comic",
        prompt: "How can an adult or school change the story?",
        directions: ["Show the right and who listens.", "End with an adult or system change."],
        artSpark: "Four frames: PROBLEM → RIGHT → ADULT OR SCHOOL ACTION → THE RIGHT IS SUPPORTED. Use the speech-bubble bank if helpful.",
      },
      {
        label: "SHARE",
        time: "6 min",
        title: "One right we protect together",
        prompt: "Which class practice should we keep or improve?",
        directions: ["Share one comic clue.", "Choose one practical class action."],
      },
      {
        label: "PRIVACY DILEMMA",
        time: "10–15 min · optional",
        title: "Safer—or watched all the time?",
        prompt: "A school proposes AI cameras to identify ‘suspicious behaviour.’ What rights, evidence, and limits matter?",
        directions: ["Name the promised benefit before judging it.", "Ask what data are collected, who can see them, how errors are challenged, and whether less intrusive options could work.", "Decide what adults must prove before any trial—and what would stop the system."],
        visual: "ai-lens",
        links: [{ label: "Privacy Commissioner — children, education technology and privacy", href: "https://www.priv.gc.ca/en/about-the-opc/what-we-do/provincial-and-territorial-collaboration/joint-resolutions-with-provinces-and-territories/res_20251008_edtech/" }],
      },
    ],
    teacher: {
      prepare: [
        "Print student page 1 once per group and page 2 once per student; pre-cut the match cards if helpful.",
        "Open the linked UNICEF Canada elementary children’s-rights resources before class.",
        "Use one fictional case from the lesson: a video without captions, a playground rule made without checking how it affects safe play, or a student’s full name repeatedly ignored.",
      ],
      moves: ["Clarify that rights are universal, not earned by good behaviour.", "Name adult and institutional responsibilities.", "Keep scenarios fictional."],
      care: "Avoid asking students to disclose violations or family experiences. Remind students how to reach a trusted adult privately.",
      curriculum: ["Social Studies: human rights", "Language Arts: explaining and responding", "Career Education: well-being and community"],
      evidence: "Six matched right/adult-responsibility pairs and a four-frame comic showing an adult or school repair.",
      sources: [{ label: "UNICEF Canada – Elementary children’s-rights resources", href: "https://www.unicef.ca/en/elementary-resources" }],
    },
  },
  {
    id: "barrier-detectives",
    title: "Barrier detectives",
    shortTitle: "Access design",
    question: "When does the place or task create the problem?",
    timing: "Late November, after Children’s Rights",
    length: "45–60 min",
    grades: "Grades 3–7",
    tone: "berry",
    use: "Teach accessibility through observation, user-centred design, and multiple ways to participate.",
    activity: "Try a 30-second mini-task, match barriers to tools, then complete an Access Makeover",
    product: "A Ways-to-Join menu for one real class task",
    materials: "Student pack · pencil or highlighter · one real upcoming task",
    formats: ["30-second mini-task", "Barrier-to-tool match", "Access Makeover"],
    printable: {
      title: "Access Makeover Lab",
      href: "/downloads/lesson-barrier-detectives.pdf",
      bwHref: "/downloads/lesson-barrier-detectives-black-white.pdf",
      includes: "Two student pages + teacher quick start: 30-second mini-task, access-tool match, and Ways-to-Join menu",
    },
    steps: [
      {
        label: "TRY",
        time: "5 min",
        title: "Try the mini-task for 30 seconds",
        prompt: "Which instructions create barriers?",
        directions: ["This task is designed badly on purpose. Test it for only 30 seconds.", "Circle words that create barriers. Do not judge yourself or another person."],
        image: "/images/same-versus-fair.webp",
        imageAlt: "Two classroom scenes compare one handwritten task for everyone with flexible ways to read, listen, write, draw, or speak.",
      },
      {
        label: "MATCH",
        time: "10 min",
        title: "Match tools to exact barriers",
        prompt: "Which two choices would remove barriers while keeping the learning goal?",
        directions: ["Choose two tools from page 1.", "Explain which exact barrier each tool removes."],
        options: ["Listen", "See a model", "Pair", "Quiet space", "Checklist", "Choose a response"],
        maxChoices: 2,
      },
      {
        label: "BUILD",
        time: "20 min",
        title: "Build a Ways-to-Join menu",
        prompt: "How can students get information, do the work, and show learning in more than one way?",
        directions: ["Use the real task and learning goal your teacher provides.", "Choose only options the class can actually use."],
        options: ["Read, listen, watch, or see a model", "Solo, pair, group, or quiet space", "Write, draw, speak, or build"],
        artSpark: "Keep the learning goal the same. Change how students can enter, participate, or respond.",
      },
      {
        label: "TEST",
        time: "10 min",
        title: "Can a partner understand the menu?",
        prompt: "Are the choices clear, realistic, and connected to the same learning goal?",
        directions: ["A partner marks: clear directions, real choices, same learning goal.", "Revise one part that is unclear or unavailable."],
      },
      {
        label: "USE",
        time: "5 min",
        title: "Build the class version",
        prompt: "Which useful parts should we combine and test on the next task?",
        directions: ["Combine clear choices that are genuinely available.", "Teacher posts the final menu with the real task.", "Check after use: what helped, and what still needs changing?"],
      },
      {
        label: "AI ACCESS CHECK",
        time: "12–20 min · optional",
        title: "A tool can remove one barrier and create another",
        prompt: "When would an AI support widen access—and what conditions would make it fair?",
        directions: ["Match one tool to a real barrier: speech-to-text, text-to-speech, image description, translation, reading support, or adaptive navigation.", "Check accuracy, privacy, human choice, cost, device and internet access, and whether the user can reject or correct it.", "Decide: use, redesign, provide another option, or do not use."],
        options: ["Speech-to-text", "Text-to-speech", "Image description", "Translation", "Reading support", "Navigation support"],
        maxChoices: 1,
        visual: "ai-lens",
        links: [{ label: "Accessibility Standards Canada — accessible and equitable AI", href: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/accessible-and-equitable-artificial-intelligence-systems" }],
      },
    ],
    teacher: {
      prepare: [
        "Print student pages 1–2 once per group. Bring one real upcoming task, its student-friendly learning goal, and only choices that are genuinely available.",
        "Open the linked Rick Hansen Foundation School Program before class.",
        "Open the linked B.C. Inclusive & Responsive Learning videos and choose one brief example to connect after the makeover.",
      ],
      moves: ["Use “barrier” and “access” more than “special need.”", "Avoid disability simulations.", "Value expertise from lived experience without requiring disclosure."],
      care: "Students may contribute without identifying their own disability, diagnosis, or support plan.",
      curriculum: ["ADST: user-centred design", "Social Studies: equity and inclusion", "Language Arts: communicating ideas"],
      evidence: "A peer-tested Ways-to-Join menu attached to a real class task; optional SpacesEDU photo and reflection.",
      sources: [
        { label: "Rick Hansen Foundation – School Program", href: "https://www.rickhansen.com/schools-communities/school-program" },
        { label: "B.C. Inclusive & Responsive Learning videos", href: "https://www2.gov.bc.ca/gov/content/education-training/k-12/teach/resources-for-teachers/inclusive-education/videos" },
        { label: "Accessibility Standards Canada – accessible and equitable AI systems", href: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/accessible-and-equitable-artificial-intelligence-systems" },
      ],
    },
  },
  {
    id: "many-languages",
    title: "Pictures, words & welcome",
    shortTitle: "Wayfinding & welcome",
    question: "How can pictures and clear words help more people find their way?",
    timing: "Late October, or when a real navigation need appears",
    length: "45–60 min",
    grades: "Grades 3–7",
    tone: "sky",
    use: "Explore visual and school-approved multilingual wayfinding without turning students into translators.",
    activity: "Test six picture signs, try two visual strategies, then revise one real school sign",
    product: "A peer-tested mock-up for one real navigation need; approved translated wording only when provided",
    materials: "Projected image · student pack · assigned school place · markers",
    formats: ["Picture-sign test", "Two visual drafts", "Partner revision"],
    printable: {
      title: "Signs Everyone Can Understand",
      href: "/downloads/lesson-our-languages-our-welcome.pdf",
      bwHref: "/downloads/lesson-our-languages-our-welcome-black-white.pdf",
      includes: "Two student pages + teacher quick start: picture-sign test, two drafts, partner guess, and visible revision",
    },
    steps: [
      {
        label: "GUESS",
        time: "7 min",
        title: "What does each picture sign mean?",
        prompt: "Can you identify each school place from the picture alone?",
        directions: ["Look at one picture at a time before seeing the teacher key.", "Write a guess, then mark clear or revise."],
        image: "/images/multilingual-welcome.webp",
        imageAlt: "Students follow colourful picture symbols and floor paths to find school spaces and use several nonverbal ways to ask for help.",
      },
      {
        label: "NOTICE",
        time: "8 min",
        title: "Which visual clue did the work?",
        prompt: "What made a sign clear—or confusing?",
        directions: ["Point to the clue that supported your guess.", "Choose one sign that needs revision."],
        options: ["Object", "Person doing an action", "Arrow", "Landmark", "Shape or border", "Short label"],
      },
      {
        label: "DESIGN",
        time: "15–25 min",
        title: "Try two picture strategies",
        prompt: "How can a new student understand the school place before reading?",
        directions: ["Try an object or place picture.", "Try a person doing an action, an arrow, or a landmark."],
        artSpark: "Use strong contrast and the full space. Save words until after the picture test.",
      },
      {
        label: "TEST",
        time: "8 min",
        title: "Test before adding words",
        prompt: "Can a partner guess the place from the picture alone?",
        directions: ["Partner records a guess and marks sure or unsure.", "Designer makes one visible revision."],
      },
      {
        label: "LABEL",
        time: "5 min",
        title: "Add a school-approved label",
        prompt: "What short school-approved label would make the sign clearer?",
        directions: ["Add one clear label already used by the school.", "If your teacher provides an approved translation, add it too; classmates are not translators."],
      },
      {
        label: "TRANSLATION TEST",
        time: "10–15 min · optional",
        title: "Fast access still needs a check",
        prompt: "An AI translator helps a newcomer join immediately. When is that enough—and when must a person verify it?",
        directions: ["Sort uses into low stakes and high stakes.", "For each, decide who checks accuracy and how a person can ask for help or correction.", "Keep translation available as support; never make a multilingual student responsible for checking it."],
        cards: [
          { title: "LOWER STAKES", text: "A welcome greeting, classroom label, or rough first understanding." },
          { title: "HIGHER STAKES", text: "Safety, health, consent, discipline, rights, or a decision affecting someone." },
        ],
        links: [{ label: "UNESCO — AI and the right to education", href: "https://www.unesco.org/en/articles/what-you-need-know-about-ai-and-right-education" }],
      },
    ],
    teacher: {
      prepare: [
        "Print student page 1 once per group and page 2 once per student or pair; keep the page 1 teacher key hidden during the first test.",
        "Open the linked Surrey Schools Welcome Centre page before class.",
        "Assign one real space or routine and obtain any approved translated wording before class. Show final mock-ups to administration before public display.",
      ],
      moves: ["Have partners test the picture before students add any words.", "Ask which visual clue carried meaning and which revision improved access.", "Celebrate multilingualism without asking students to translate; no school list captures every language or community."],
      care: "No student is responsible for teaching, translating, pronouncing, or representing a language or community.",
      curriculum: ["Language Arts: audience and communication", "Social Studies: identity and community", "ADST: user-centred design"],
      evidence: "A peer-tested wayfinding mock-up with a clear picture, school-approved wording, and one documented revision.",
      sources: [
        { label: "Surrey Schools Welcome Centre", href: "https://www.surreyschools.ca/welcomecentre" },
        { label: "Accessible Canada – Wayfinding and signage", href: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/can-asc-24-wayfinding-and-signage/9-definitions-symbols-and-abbreviations" },
      ],
    },
  },
  {
    id: "responding-to-racism",
    title: "Interrupt, support, report, repair",
    shortTitle: "Responding to racism",
    question: "What can we do when racist words or actions hurt someone?",
    timing: "January, after class norms and the school help route are clear",
    length: "35–45 min",
    grades: "Grades 4–7",
    tone: "sun",
    use: "Practise safe responses without asking students to reenact personal harm.",
    activity: "Sort eight safe choices into Four Moves, then make a Pocket Response Guide",
    product: "A four-part Pocket Response Guide",
    materials: "Four Moves cards · pocket-guide page · pencil or markers · scissors optional",
    formats: ["Fictional scenario", "Four Moves sort", "Pocket guide"],
    printable: {
      title: "Four Moves + Pocket Guide",
      href: "/downloads/lesson-responding-to-racism.pdf",
      bwHref: "/downloads/lesson-responding-to-racism-black-white.pdf",
      includes: "Two student pages + teacher quick start: Four Moves cards, safe-choice route, and Pocket Response Guide",
    },
    steps: [
      {
        label: "NOTICE",
        time: "4 min",
        title: "What happened here?",
        prompt: "During group work, one student makes fun of another student’s name. A few students laugh or go quiet.",
        directions: ["Name what people did.", "Do not make up details about the students."],
      },
      {
        label: "SAFETY",
        time: "7 min",
        title: "No one has to confront alone",
        prompt: "Which next move is safe and useful in this situation?",
        directions: ["Name possible effects without guessing personal details.", "If interrupting feels unsafe, move to support and adult help."],
      },
      {
        label: "SEQUENCE",
        time: "10 min",
        title: "Build a Four Moves route",
        prompt: "Which actions are safe and useful now? What must happen next?",
        directions: ["Sort the numbered choices under the four moves.", "Explain your order; more than one safe route may work."],
        options: ["INTERRUPT", "SUPPORT", "REPORT", "REPAIR"],
      },
      {
        label: "MAKE",
        time: "15 min",
        title: "Make a Pocket Response Guide",
        prompt: "What could you safely say or do?",
        directions: ["Write one brief interruption only if it feels safe.", "Write a support offer that lets the student choose.", "Fill in the actual school adults and places where you can get help."],
        options: ["That’s not okay.", "Names deserve respect.", "Want to sit or work with me?", "Are you okay? What do you need?", "I can go with you to tell an adult."],
        artSpark: "Fold into four parts if helpful: INTERRUPT → SUPPORT → REPORT → REPAIR. Nobody reenacts the harm.",
      },
      {
        label: "KNOW",
        time: "5 min",
        title: "Stopping is not the end",
        prompt: "What must change after the harmful words stop?",
        directions: ["Include changed behaviour and adult follow-through.", "The student who was hurt never has to explain, accept an apology, or join a repair conversation."],
        links: [
          { label: "Walnut Road Code of Conduct", href: "https://www.surreyschools.ca/walnutroad/code-of-conduct" },
          { label: "PSST — private reporting", href: "https://www.surreyschools.ca/safeschools/psst-protecting-surrey-schools-together" },
        ],
      },
    ],
    teacher: {
      prepare: [
        "Print student page 1 once per group and page 2 once per student; pre-cut the numbered cards if helpful. No role-play is needed.",
        "Open the linked B.C. Curriculum Anti-Racism Guide for Teachers before class.",
        "Pre-fill two real Walnut Road adult roles or places where students can get help; open the school Code of Conduct and PSST route.",
      ],
      moves: ["Name the harm clearly.", "Do not ask the targeted student to educate others.", "Emphasize adult responsibility and follow-through."],
      care: "Students may pass and use a private check-in. Do not invite public disclosures, require repair from the harmed student, or turn a live incident into class debate.",
      curriculum: ["Language Arts: communication and response", "Social Studies: discrimination and systems", "Career Education: well-being and help-seeking"],
      evidence: "A safe Four Moves route and Pocket Response Guide with consent-based support and trusted-adult follow-through.",
      sources: [
        { label: "B.C. Curriculum – Anti-Racism: A Guide for Teachers", href: "https://curriculum.gov.bc.ca/curriculum/anti-racism" },
        { label: "B.C. Human Rights – Human Rights 101 learner kit", href: "https://bchumanrights.ca/resources/video-series/introducing-human-rights/" },
        { label: "Walnut Road – Code of Conduct", href: "https://www.surreyschools.ca/walnutroad/code-of-conduct" },
        { label: "Surrey Schools – PSST private reporting", href: "https://www.surreyschools.ca/safeschools/psst-protecting-surrey-schools-together" },
      ],
    },
  },
  {
    id: "barriers-overlap",
    title: "When barriers stack",
    shortTitle: "Barriers stack",
    question: "What happens when more than one barrier affects someone?",
    timing: "After Barrier Detectives; best in February or March",
    length: "45–55 min",
    grades: "Grades 5–7",
    tone: "berry",
    use: "Make intersectionality concrete through one school-event design scenario.",
    activity: "Mark required access basics, then use six planning points for extra ways to participate",
    product: "A fictional event plan with access basics, chosen enhancements, one unanswered question, and people to consult",
    materials: "Student pack · pencils · projected Community Night facts",
    formats: ["Barrier chain", "No-cut access budget", "Consultation check"],
    printable: {
      title: "Access Budget Challenge",
      href: "/downloads/lesson-when-barriers-overlap.pdf",
      bwHref: "/downloads/lesson-when-barriers-overlap-black-white.pdf",
      includes: "Two student pages + teacher quick start: barrier chain, no-cut budget ledger, remaining-barrier check",
    },
    steps: [
      {
        label: "STACK",
        time: "7 min",
        title: "A fictional event still being planned",
        prompt: "How could two barriers make the event much harder?",
        directions: ["Connect two conditions.", "Do not invent someone’s identity."],
        image: "/images/intersectionality-community.webp",
        imageAlt: "Students and community members connected through overlapping circles, pathways, and different ways of participating.",
      },
      {
        label: "CHAIN",
        time: "8 min",
        title: "Connect two barriers",
        prompt: "What new participation problem appears when two barriers happen together?",
        directions: ["Copy two facts from the fictional event.", "Describe the participation problem, then write one question organizers should ask."],
        options: ["One time only", "Advance sign-up", "Long written invitation", "One language", "No ingredient information", "Loud or crowded room", "One way to participate"],
        maxChoices: 2,
      },
      {
        label: "BUILD",
        time: "18 min",
        title: "Basics first. Then spend six points.",
        prompt: "Which access basics are required, and which extra choices widen participation?",
        directions: ["Check every required access basic before spending points.", "Choose enhancements and record the total out of six."],
        cards: [
          { title: "REQUIRED BASICS", text: "Accessible route · a way to join without paying · ingredient/allergen information · safe emergency route" },
          { title: "ENHANCEMENTS", text: "Two times · picture signs · approved translation · quiet zone · seated/standing choices · take-home summary" },
        ],
        options: ["Two times – 2", "Picture signs – 1", "Approved translation – 2", "Quiet zone – 2", "Seated or standing – 1", "Take-home summary – 2"],
      },
      {
        label: "CHECK",
        time: "10 min",
        title: "Which barrier remains?",
        prompt: "Which participation barrier is still present, and what should organizers ask before finalizing?",
        directions: ["Name the barrier, not an identity.", "Name a role or group with relevant experience; no classmate represents anyone."],
      },
      {
        label: "AI + ENVIRONMENT",
        time: "15–25 min · optional",
        title: "Benefits here. Costs where?",
        prompt: "A data centre brings jobs and digital services but needs electricity, equipment, land, and cooling. What should the community ask?",
        directions: ["Map who receives jobs, services, revenue, electricity demand, water demand, extraction impacts, and e-waste.", "Use evidence for both costs and credible environmental benefits; AI is neither a climate solution by itself nor the whole climate problem.", "Propose one rule for community consent, monitoring, or sharing benefits."],
        cards: [
          { title: "BENEFITS", text: "Jobs · services · research · possible energy-system or environmental tools" },
          { title: "COSTS", text: "Electricity · equipment and minerals · land · cooling · waste" },
          { title: "POWER", text: "Who chooses the site, energy source, limits, reporting, and community benefits?" },
        ],
        links: [{ label: "International Energy Agency — Energy and AI", href: "https://www.iea.org/reports/energy-and-ai" }],
      },
      {
        label: "FINAL",
        time: "8 min",
        title: "Finish one access plan",
        prompt: "Which selected enhancements and consultation steps belong in the final plan?",
        directions: ["Combine required basics and enhancements without exceeding six points.", "Keep the unanswered question visible instead of claiming the plan is perfect."],
      },
    ],
    teacher: {
      prepare: [
        "Print student pages 1–2 once per group and provide pencils; no cutting or loose counters are needed.",
        "Open the linked B.C. Human Rights Commissioner intersectionality page before class.",
        "Open the linked B.C. Human Rights public-services page and project the pack’s fictional Community Night facts.",
      ],
      moves: ["Keep the focus on interacting conditions and systems.", "Do not turn identities into a checklist.", "Ask who should shape the redesign."],
      care: "Students analyze a fictional event. They do not need to disclose family income, disability, religion, migration, or language experiences.",
      curriculum: ["Social Studies: systems and equity", "ADST: design for diverse users", "Language Arts: connecting and explaining ideas"],
      evidence: "A plan with every required access basic, a correct six-point total, one unanswered question, and people to consult.",
      sources: [
        { label: "B.C. Human Rights Commissioner – Intersectionality", href: "https://bchumanrights.ca/glossary/intersectionality/" },
        { label: "B.C. Human Rights – Rights in public services", href: "https://bchumanrights.ca/human-rights/rights-and-responsibilities/rights-under-the-code-regarding-services/" },
      ],
    },
  },
  {
    id: "concern-to-action",
    title: "From concern to action",
    shortTitle: "Take action",
    question: "How can students help with a real issue in a useful, caring way?",
    timing: "Early March: Steps 1–3; return to Steps 4–6 after an issue is chosen",
    length: "1 planning block + later project sessions",
    grades: "Grades 4–7",
    tone: "sand",
    use: "Move from a strong feeling to listening, evidence, realistic influence, and accountable action.",
    activity: "Choose a sourced pathway, compare three ready action ideas, then plan the product that fits",
    product: "A sourced action proposal, an approved student product, and a scheduled follow-up",
    materials: "Student pack · one ready pathway · provided source links · making materials later",
    formats: ["Ready pathway sources", "0/1/2 action check", "Product + follow-up"],
    printable: {
      title: "Will It Help? Action Studio",
      href: "/downloads/lesson-concern-to-action.pdf",
      bwHref: "/downloads/lesson-concern-to-action-black-white.pdf",
      includes: "Two student pages + teacher quick start: source check, action comparison, branching product plan, and follow-up",
    },
    steps: [
      {
        label: "LEARN",
        time: "15 min",
        title: "Choose one ready pathway",
        prompt: "What do its direct sources say is needed now?",
        directions: ["Open the matching project in Student Action Studio; its direct sources and three starting actions are ready.", "Record one verified fact, one current request or recommendation, and who is guiding it."],
        image: "/images/student-voice-club.webp",
        imageAlt: "Students gather ideas, listen, choose a priority, create a useful response, and report what changed.",
        links: [
          { label: "Student action toolkit", href: "/downloads/from-concern-to-action-student-toolkit.pdf" },
          { label: "Walnut Road — Code of Conduct", href: "https://www.surreyschools.ca/walnutroad/code-of-conduct" },
          { label: "City of Surrey — Climate Action Tracker", href: "https://climateactiontracker.surrey.ca/" },
          { label: "BC SPCA — Bird-window case", href: "https://spca.bc.ca/news/striking-bird-window-collisions/" },
        ],
      },
      {
        label: "COMPARE",
        time: "12 min",
        title: "Compare three real actions",
        prompt: "Which action is guided by the need, useful to the audience, and possible to finish?",
        directions: ["Score the three issue-specific action cards 0, 1, or 2 for each check.", "Include one tempting action that does not match the current request."],
      },
      {
        label: "CHOOSE",
        time: "15 min",
        title: "Choose the right product",
        prompt: "Does this action need artwork, a letter, a collection plan, a short presentation, or a design change?",
        directions: ["Choose the format that best reaches the real audience.", "Name what the audience can actually do."],
        options: ["Artwork", "Letter", "Collection plan", "Short presentation", "Design change"],
        maxChoices: 1,
      },
      {
        label: "BUILD",
        time: "30–45 min",
        title: "Build the approved product",
        prompt: "How will the product stay accurate, useful, and easy for its audience to use?",
        directions: ["Use one verified fact, one clear request, and the format that fits.", "Complete the adult check before sharing, sending, collecting, or changing anything."],
        image: "/images/artivism-gallery.webp",
        imageAlt: "A colourful school artivism gallery with posters, symbols, collage, and sculpture communicating care, fairness, belonging, and action.",
        artSpark: "If art fits the action, choose Before → After, One Powerful Object, or Repeat a Shape. Art is one possible tool, not the required outcome.",
      },
      {
        label: "ACT",
        time: "20–60 min",
        title: "Deliver the approved action",
        prompt: "Who will receive it, and what are they being asked to do?",
        directions: ["Use the approved school route and assigned roles.", "Record exactly what was made, sent, shared, collected, or changed."],
      },
      {
        label: "CHECK",
        time: "10 min",
        title: "What will we check—and when?",
        prompt: "What was delivered, what response came back, and what change—if any—can we show?",
        directions: ["Set a follow-up date one or two weeks after sharing.", "Do not count views, posters, or people reached alone as proof the issue improved."],
      },
    ],
    teacher: {
      prepare: [
        "Print student pages 1–2 once per group. In Student Action Studio, select one ready pathway with direct sources and three starting action ideas; no resource search is needed.",
        "Before spring break, teach only LEARN, COMPARE, and CHOOSE. Return to BUILD, ACT, and CHECK after the class or club selects its spring issue.",
        "Confirm adult permission before any public message, contact, collection, fundraising, or change to a shared space.",
      ],
      moves: ["Slow students down before action.", "Distinguish awareness from measurable change.", "Require a report-back."],
      care: "No student is asked to disclose a personal experience or speak for a group or community. Adults remain responsible for safety, privacy, outside contact, approval, and public promises.",
      curriculum: ["Social Studies: civic participation", "Language Arts: research and communication", "ADST: design cycle", "Career Education: collaboration"],
      evidence: "Source notes, a completed action comparison, the fitting approved product, and a follow-up record separating output, response, and change.",
      sources: [
        { label: "Walnut Road – Code of Conduct", href: "https://www.surreyschools.ca/walnutroad/code-of-conduct" },
        { label: "City of Surrey – Climate Action Tracker", href: "https://climateactiontracker.surrey.ca/" },
        { label: "BC SPCA – Bird-window collisions", href: "https://spca.bc.ca/news/striking-bird-window-collisions/" },
        { label: "Local student action toolkit", href: "/downloads/from-concern-to-action-student-toolkit.pdf" },
        { label: "International Energy Agency – Energy and AI", href: "https://www.iea.org/reports/energy-and-ai" },
      ],
    },
  },
  {
    id: "animal-welfare",
    title: "Animals need us to learn first",
    shortTitle: "BC SPCA pathway",
    question: "Which action would really help animals?",
    timing: "Launch week of Mar. 30; continue April–May",
    length: "3–6 lessons + project",
    grades: "Grades 3–7",
    tone: "coral",
    use: "Prepare a student-chosen BC SPCA or animal-welfare project grounded in current needs.",
    activity: "Use one provided BC SPCA case card, identify a need and current recommendation, then compare three actions",
    product: "A source-backed team proposal, an approved action or artifact, and a scheduled result check",
    materials: "Student pack · one direct BC SPCA case source · pencil · projector",
    formats: ["Assigned case card", "Y / ? / N action test", "Action + follow-up"],
    printable: {
      title: "Help or Hype? Animal Action Lab",
      href: "/downloads/lesson-animal-welfare-evidence-lab.pdf",
      bwHref: "/downloads/lesson-animal-welfare-evidence-lab-black-white.pdf",
      includes: "Two student pages + teacher quick start: specific BC SPCA case, action test, flexible pitch, and follow-up",
    },
    steps: [
      {
        label: "CASE",
        time: "10 min",
        title: "Open one assigned case card",
        prompt: "Which animal-welfare need will your team investigate?",
        directions: ["Your teacher assigns one case per team; all three appear in the final gallery.", "Circle the need and predict what the BC SPCA may recommend."],
        options: ["Hen housing learning extension", "Bird-window collisions", "Hot-car safety"],
        maxChoices: 1,
        cards: [
          { title: "HEN HOUSING — LEARN", text: "Grades 6–9 extension: compare conditions with the Five Freedoms. Do not invent a current action request." },
          { title: "BIRD WINDOWS", text: "Spring safety case: learn why collisions happen and which changes experts recommend." },
          { title: "HOT CARS", text: "Late-spring safety case: learn the risk, the adult reporting route, and what not to do." },
        ],
        image: "/images/animal-welfare-learning.webp",
        imageAlt: "Students sort picture cards about food, water, shelter, health, care, and habitat while looking at companion, farm, and British Columbia wildlife images.",
      },
      {
        label: "SOURCE",
        time: "25–40 min",
        title: "Learn before choosing an action",
        prompt: "What need does this source explain, and is a current recommendation or request stated?",
        directions: ["Write one welfare fact in your own words.", "Record the recommendation or request—or write ‘not stated’—plus the exact page title and date."],
        links: [
          { label: "Hen housing — Home Sweet Home (Grades 6–9)", href: "https://spca.bc.ca/wp-content/uploads/2026/02/teacher-activity-home-sweet-home-6-9.pdf" },
          { label: "Bird-window collisions — facts + actions", href: "https://spca.bc.ca/news/striking-bird-window-collisions/" },
          { label: "Hot-car safety — facts + adult route", href: "https://spca.bc.ca/news/bc-spca-urges-public-keep-animals-out-of-hot-vehicles/" },
        ],
      },
      {
        label: "SCORE",
        time: "15 min",
        title: "Test exactly three actions",
        prompt: "Is each action asked for now, helpful, safe and approved, and possible to finish?",
        directions: ["Choose three issue-specific action rows only.", "Write Y = yes, ? = unsure, or N = not yet for every check."],
        options: ["Teach a verified safety message", "Send one specific request", "Make expert-approved art or signage", "Collect only with a written wish list", "Fundraise only if approved", "Make an expert-approved school safety change"],
        maxChoices: 3,
      },
      {
        label: "PROPOSE",
        time: "30 min",
        title: "Build one verified proposal",
        prompt: "Does the evidence support action now—or more learning first?",
        directions: ["Create a one-card proposal or learning panel that may be presented live, read by a partner or teacher, or recorded.", "If no current request is stated, mark what must be checked before action. Get adult approval before acting."],
        artSpark: "Create an Animal Advocate panel: REAL NEED · MYTH CORRECTED · EVIDENCE · OUR ACTION. No sad or graphic images.",
      },
      {
        label: "ACT",
        time: "20–60 min",
        title: "Carry out the approved action",
        prompt: "Who will receive it, and what is each team member responsible for?",
        directions: ["Use the approved school route; adults handle outside contact and money.", "Record exactly what the team made, delivered, or changed."],
      },
      {
        label: "CHECK",
        time: "20 min",
        title: "Show what we did and what came back",
        prompt: "What was delivered, what response came back, and what change—if any—can we show?",
        directions: ["Separate what we made, the response received, and any change observed.", "If change is not known yet, schedule the next check instead of claiming success."],
      },
    ],
    teacher: {
      prepare: [
        "Print student pages 1–2 once per team and assign one of the three direct case sources shown on Step 2.",
        "Preview the assigned BC SPCA source for the exact grade and skip distressing details or images.",
        "Get school approval before contact, collections, fundraising, signage, or any change to school windows or grounds.",
      ],
      moves: ["Keep the project broader than fundraising.", "Require source checking and a defined audience.", "Treat the hen case as a learning extension unless a current BC SPCA request is confirmed.", "Let students choose roles beyond public speaking."],
      care: "Students do not investigate cruelty, confront owners, handle wildlife, alter habitat, or disclose family pet or food experiences. Concerns go privately to an adult.",
      curriculum: ["Language Arts: source use and persuasion", "ADST: project design", "Career Education: collaboration", "Science or Math only when the selected case and evidence support them"],
      evidence: "Dated source notes, three action checks, an approved proposal or artifact, and a follow-up separating output, response, and change.",
      sources: [
        { label: "BC SPCA – Hen housing: Home Sweet Home (Grades 6–9)", href: "https://spca.bc.ca/wp-content/uploads/2026/02/teacher-activity-home-sweet-home-6-9.pdf" },
        { label: "BC SPCA – Bird-window collisions", href: "https://spca.bc.ca/news/striking-bird-window-collisions/" },
        { label: "BC SPCA – Hot-car safety", href: "https://spca.bc.ca/news/bc-spca-urges-public-keep-animals-out-of-hot-vehicles/" },
      ],
    },
  },
];

const runways: Runway[] = [
  { month: "SEPT", event: "Belonging during Grade 6 rotation", start: "Sept. 8–11", create: "One full-page belonging action", share: "Choose class commitments Sept. 14–15", date: "Opening weeks", lesson: "belonging-built", priority: "Core" },
  { month: "SEPT", event: "Truth, place & Orange Shirt Day", start: "Sept. 15", create: "Sept. 17–24", share: "Sept. 28–29", date: "Orange Shirt Day Sept. 29 · school closed Sept. 30", lesson: "truth-place-responsibility", priority: "Core" },
  { month: "SEPT", event: "Voice beyond voting — quick discussion", start: "Sept. 8 onward", create: "Choose one realistic route", share: "No product required", date: "Build participation language before campaigns", lesson: "voice-and-rules", startAt: 12, cta: "Project the 15-minute visual →", priority: "Choice" },
  { month: "SEPT", event: "Official candidates & representation", start: "After Sept. 11", create: "Sample equal amounts of candidate material", share: "One pattern + one missing question", date: "Nominations close and candidates are declared Sept. 11", lesson: "voice-and-rules", startAt: 7, cta: "Open representation screens →", priority: "Choice" },
  { month: "OCT", event: "Surrey election equity lab + Student Vote", start: "Oct. 5", create: "Oct. 6–9 & 13–15", share: "Oct. 16", date: "Election Oct. 17", lesson: "voice-and-rules", startAt: 5, cta: "Open the Surrey equity route →", priority: "Core" },
  { month: "OCT", event: "After the election: accountability", start: "Oct. 19", create: "Choose one issue to follow", share: "Set a later evidence check", date: "Official results due by Oct. 21", lesson: "voice-and-rules", startAt: 13, cta: "Open the post-election screen →", priority: "Choice" },
  { month: "OCT", event: "Pictures, words & school wayfinding", start: "Oct. 26", create: "Oct. 27–Nov. 3", share: "Nov. 4–5", date: "Use when a real navigation need appears", lesson: "many-languages", priority: "Choice" },
  { month: "NOV", event: "National Child Day", start: "Nov. 9", create: "Nov. 12–18", share: "Nov. 19–20", date: "Nov. 20", lesson: "rights-in-our-room", priority: "Core" },
  { month: "NOV", event: "Disability awareness & access", start: "Nov. 23", create: "Nov. 24–Dec. 1", share: "Dec. 2–3", date: "Dec. 3", lesson: "barrier-detectives", priority: "Core" },
  { month: "DEC", event: "Human Rights Day: revisit & connect", start: "Dec. 7", create: "Revisit one comic", share: "Check one class action Dec. 10", date: "Dec. 10", lesson: "rights-in-our-room", startAt: 4, cta: "Open the revisit screen →", priority: "Choice" },
  { month: "JAN", event: "Safe responses to racism", start: "Week of Jan. 4", create: "Jan. 5–7", share: "Practise Jan. 8", date: "After routines restart", lesson: "responding-to-racism", priority: "Core" },
  { month: "JAN", event: "Black excellence & Black histories", start: "Jan. 11", create: "Begin Jan. 15", share: "Continue through February", date: "Jan. 15 + February", href: "https://bcblackhistory.ca/learning-centre/", cta: "Open B.C. learning source ↗", priority: "Plan" },
  { month: "FEB", event: "When barriers overlap", start: "Feb. 1", create: "Feb. 2–10", share: "Feb. 11", date: "Advanced extension after rights + access", lesson: "barriers-overlap", priority: "Choice" },
  { month: "FEB", event: "Pink Shirt Day: belonging check-in", start: "Feb. 15", create: "Update one class action", share: "Feb. 22–24", date: "Pink Shirt Day Feb. 24", lesson: "belonging-built", startAt: 4, cta: "Open the check-in screen →", priority: "Choice" },
  { month: "MAR", event: "Action Studio: planning launch", start: "Mar. 5", create: "Teach LEARN → COMPARE → CHOOSE", share: "Issue + plan ready Mar. 12", date: "Pause before BUILD until a spring issue is chosen", lesson: "concern-to-action", cta: "Teach planning Steps 1–3 →", priority: "Core" },
  { month: "APR", event: "Animal welfare & BC SPCA pathway", start: "Week of Mar. 30", create: "April–early May", share: "May 10–14", date: "Featured spring option after Action Studio", lesson: "animal-welfare", priority: "Featured" },
  { month: "APR", event: "Earth Day connection — no second big project", start: "Use current spring work", create: "Add a local climate link only if it fits", share: "Apr. 22", date: "Earth Day Apr. 22", href: "https://climateactiontracker.surrey.ca/", cta: "Open Surrey’s climate tracker ↗", priority: "Choice" },
  { month: "MAY", event: "Pride & inclusive belonging", start: "May 17", create: "Choose one exact grade-fit source in advance", share: "June", date: "Pride Month", href: "https://www.sogieducation.org/resourceguide", cta: "Open SOGI resource guide ↗", priority: "Plan" },
];

const yearStages = [
  { n: "1", when: "SEPT–OCT", title: "Build the class", detail: "Belonging → truth & place → fair voice → wayfinding" },
  { n: "2", when: "NOV–JAN", title: "Practise rights and safety", detail: "Children’s rights → access → safe responses" },
  { n: "3", when: "FEB–MAR", title: "Connect systems", detail: "Overlapping barriers → useful action planning" },
  { n: "4", when: "APR–JUNE", title: "Act, check, report", detail: "Chosen spring action (BC SPCA featured) → honest follow-up · optional Earth/Pride connections" },
];

const lessonOrder = [
  "belonging-built",
  "truth-place-responsibility",
  "voice-and-rules",
  "many-languages",
  "rights-in-our-room",
  "barrier-detectives",
  "responding-to-racism",
  "barriers-overlap",
  "concern-to-action",
  "animal-welfare",
];

const issueAreas = [
  { title: "Belonging & identity", question: "Who can participate as themselves?", move: "Build a class belonging mural.", lesson: "belonging-built", tone: "leaf" as Tone, icon: "◎" },
  { title: "Community & wayfinding", question: "How can pictures and clear words help more people find their way?", move: "Test and revise one real school sign.", lesson: "many-languages", tone: "sky" as Tone, icon: "▤" },
  { title: "Power, democracy & technology", question: "Who gets heard—and who checks powerful decisions?", move: "Investigate a public decision or an AI dilemma.", lesson: "voice-and-rules", tone: "sun" as Tone, icon: "◇" },
  { title: "Indigenous rights & place", question: "Whose authority and knowledge live here?", move: "Learn from authentic voices.", lesson: "truth-place-responsibility", tone: "coral" as Tone, icon: "◌" },
  { title: "Children’s & human rights", question: "What belongs to every person?", move: "Audit how rights are supported.", lesson: "rights-in-our-room", tone: "sky" as Tone, icon: "✦" },
  { title: "Disability & access", question: "Which condition creates the barrier?", move: "Design access from the start.", lesson: "barrier-detectives", tone: "berry" as Tone, icon: "△" },
  { title: "Intersectionality", question: "How can barriers stack?", move: "Design a fictional event with access basics first.", lesson: "barriers-overlap", tone: "berry" as Tone, icon: "⊙" },
  { title: "Racism & representation", question: "Whose story, safety, or opportunity is affected?", move: "Interrupt, support, report, and repair.", lesson: "responding-to-racism", tone: "sun" as Tone, icon: "≋" },
  { title: "Climate & community", question: "Who is affected—and who can change it?", move: "Plan a local solutionary action.", lesson: "concern-to-action", tone: "leaf" as Tone, icon: "≈" },
  { title: "Animals & the BC SPCA", question: "What action would actually help?", move: "Verify a need, act, and report back.", lesson: "animal-welfare", tone: "coral" as Tone, icon: "♧" },
];

const actionProjects = [
  {
    id: "school",
    title: "Improve belonging at school",
    start: "Listen to students in more than one way.",
    proof: "A barrier changes and students can explain the difference.",
    sources: [
      { label: "Walnut Road Code of Conduct", href: "https://www.surreyschools.ca/walnutroad/code-of-conduct" },
      { label: "B.C. safe, caring & inclusive schools", href: "https://www2.gov.bc.ca/gov/content/erase/diversity-and-inclusion" },
    ],
    actions: ["Gather anonymous input and propose one realistic participation change.", "Redesign one real class routine or task, then test it.", "Make a generic ‘be kind’ poster without checking a barrier or audience."],
  },
  {
    id: "spca",
    title: "BC SPCA / animal welfare",
    start: "Use one provided BC SPCA case and direct source before choosing an action.",
    proof: "The team separates what it delivered, the response received, and any change observed.",
    sources: [
      { label: "Bird-window collisions", href: "https://spca.bc.ca/news/striking-bird-window-collisions/" },
      { label: "Hot-car safety", href: "https://spca.bc.ca/news/bc-spca-urges-public-keep-animals-out-of-hot-vehicles/" },
    ],
    actions: ["Teach one source-verified safety message to a defined audience.", "Propose one expert-approved school safety change.", "Start a collection without a confirmed current wish list."],
  },
  {
    id: "access",
    title: "Accessibility improvement",
    start: "Audit one real task, message, event, or space.",
    proof: "More people can enter, understand, participate, or choose.",
    sources: [
      { label: "Rick Hansen School Program", href: "https://www.rickhansen.com/schools-communities/school-program" },
      { label: "B.C. Human Rights — public services", href: "https://bchumanrights.ca/human-rights/rights-and-responsibilities/rights-under-the-code-regarding-services/" },
    ],
    actions: ["Audit and peer-test one real task, message, or route.", "Send one documented barrier and doable request to the person who can decide.", "Buy or build a tool before asking users what would help."],
  },
  {
    id: "climate",
    title: "Local climate action",
    start: "Find a school or neighbourhood condition students can influence.",
    proof: "Track a concrete change, not only awareness.",
    sources: [
      { label: "Surrey Climate Action Tracker", href: "https://climateactiontracker.surrey.ca/" },
      { label: "Surrey Climate Change Action Strategy", href: "https://www.surrey.ca/about-surrey/sustainability/climate-change-action-strategy" },
    ],
    actions: ["Connect one school condition to a current Surrey action, then propose a school-scale change.", "Collect baseline data and test one small approved change.", "Make climate posters without naming an audience or next action."],
  },
  {
    id: "voice",
    title: "Student voice campaign",
    start: "Gather broad input without promising a result.",
    proof: "Decision-makers respond and students hear what happens next.",
    sources: [
      { label: "City of Surrey 2026 election", href: "https://www.surrey.ca/city-government/2026-municipal-election" },
      { label: "Surrey Schools Student Voice example", href: "https://www.surreyschools.ca/_ci/p/168658" },
      { label: "Board meetings & public communication", href: "https://www.surreyschools.ca/board-meetings" },
    ],
    actions: ["Gather anonymous input in more than one way before proposing one change.", "Share one pattern, question, and realistic recommendation with the real decision-maker, then report back.", "Hold a vote on a decision students do not control."],
  },
  {
    id: "technology",
    title: "Equitable AI use at school",
    start: "Investigate how students and adults might benefit, what could go wrong, and who would be affected before proposing a rule.",
    sources: [
      { label: "Accessibility Standards Canada — equitable AI", href: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/accessible-and-equitable-artificial-intelligence-systems" },
      { label: "Privacy Commissioner — children and education technology", href: "https://www.priv.gc.ca/en/about-the-opc/what-we-do/provincial-and-territorial-collaboration/joint-resolutions-with-provinces-and-territories/res_20251008_edtech/" },
    ],
    actions: ["Gather anonymous student and staff input, including benefits, barriers, worries, and missing voices.", "Propose one school AI-use recommendation with access, privacy, human choice, an appeal route, and a review date.", "Demand that the school use—or ban—all AI before investigating needs, evidence, and who can decide."],
  },
];

const actionSteps = [
  { n: "01", title: "Listen", question: "What are people noticing, experiencing, or asking for?", tool: "Survey · conversation · observation · anonymous ideas" },
  { n: "02", title: "Learn", question: "What do reliable sources and people already working on this issue say?", tool: "Source check · authentic voices · missing perspectives" },
  { n: "03", title: "Choose", question: "What is important, safe, inclusive, realistic, and useful?", tool: "Compare options · check permissions · choose a small first win" },
  { n: "04", title: "Plan", question: "Who will do what, by when, for whom, and with what support?", tool: "Roles · timeline · audience · materials · approval" },
  { n: "05", title: "Act", question: "How will we communicate clearly and protect dignity?", tool: "Create · invite · advocate · collect · teach · redesign" },
  { n: "06", title: "Report", question: "What did we deliver, what response came back, and what actually changed?", tool: "Output · response · change or unknown · next check" },
];

const downloads = [
  { title: "Belonging & Learner Voice Toolkit", detail: "Facilitator guide + five write, draw, and colour graphic organizers", colour: "/downloads/belonging-learner-voice-toolkit.pdf", bw: "/downloads/belonging-learner-voice-toolkit.pdf", type: "Flexible K–12 toolkit" },
  { title: "AI Equity Dilemma Cards", detail: "Eight discussion cards + AI Rules Council + evidence sorter + teacher quick start", colour: "/downloads/ai-equity-dilemma-cards.pdf", bw: "/downloads/ai-equity-dilemma-cards-black-white.pdf", type: "Reusable discussion kit" },
  { title: "From Concern to Action", detail: "8-page student project toolkit", colour: "/downloads/from-concern-to-action-student-toolkit.pdf", bw: "/downloads/from-concern-to-action-student-toolkit-black-white.pdf", type: "Student toolkit" },
  { title: "Intersectionality Classroom Toolkit", detail: "Scenarios, audits, systems map, and action planner", colour: "/downloads/intersectionality-classroom-toolkit.pdf", bw: "/downloads/intersectionality-classroom-toolkit-black-white.pdf", type: "Teacher + student" },
  { title: "November–December Teacher Pack", detail: "Child rights, accessibility, Human Rights Day, and winter learning", colour: "/downloads/november-december-teacher-pack.pdf", bw: "/downloads/november-december-teacher-pack-black-white.pdf", type: "Teacher pack" },
];

const trustedLinks = [
  { title: "Surrey Schools Equity, Diversity & Belonging Calendar", source: "Surrey Schools", href: "https://media.surreyschools.ca/media/Default/medialib/surrey-schools-edb-calendar-2026-27.aabfef204060.pdf", tag: "Planning" },
  { title: "Student Vote classroom resources", source: "CIVIX", href: "https://studentvote.ca/bc/classroom-resources/", tag: "Democracy" },
  { title: "2026 Surrey municipal election", source: "City of Surrey", href: "https://www.surrey.ca/city-government/2026-municipal-election", tag: "Local" },
  { title: "Surrey candidates and elected roles", source: "City of Surrey", href: "https://www.surrey.ca/city-government/2026-municipal-election/candidates", tag: "Representation" },
  { title: "Student Voice with Surrey elementary learners", source: "Surrey Schools", href: "https://www.surreyschools.ca/_ci/p/168658", tag: "Youth voice" },
  { title: "Board meetings and public communication", source: "Surrey Schools", href: "https://www.surreyschools.ca/board-meetings", tag: "Trustees" },
  { title: "Council meetings and public participation", source: "City of Surrey", href: "https://www.surrey.ca/city-government/council-meetings", tag: "Participation" },
  { title: "Katzie governance", source: "Katzie First Nation", href: "https://katzie.ca/governance/", tag: "Governance" },
  { title: "Bird-window collisions: facts and actions", source: "BC SPCA", href: "https://spca.bc.ca/news/striking-bird-window-collisions/", tag: "Animals" },
  { title: "Intersectionality explainer", source: "BC Human Rights Commissioner", href: "https://bchumanrights.ca/glossary/intersectionality/", tag: "Rights" },
  { title: "National Centre for Truth and Reconciliation", source: "NCTR", href: "https://nctr.ca/education/", tag: "Indigenous" },
  { title: "SOGI-inclusive classroom resources", source: "SOGI 1 2 3", href: "https://www.sogieducation.org/resourceguide", tag: "Belonging" },
  { title: "Accessible and equitable AI systems", source: "Accessibility Standards Canada", href: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/accessible-and-equitable-artificial-intelligence-systems", tag: "AI + access" },
  { title: "First Nations principles of OCAP®", source: "First Nations Information Governance Centre", href: "https://fnigc.ca/ocap-training/", tag: "Knowledge + consent" },
  { title: "AI and inaccurate election information", source: "Elections Canada", href: "https://www.elections.ca/content.aspx?dir=int&document=dig&lang=e&section=vot", tag: "AI + democracy" },
  { title: "Canadian privacy principles for generative AI", source: "Office of the Privacy Commissioner of Canada", href: "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/", tag: "AI + privacy" },
  { title: "Energy and AI", source: "International Energy Agency", href: "https://www.iea.org/reports/energy-and-ai", tag: "AI + environment" },
  { title: "AI and work", source: "OECD", href: "https://www.oecd.org/en/topics/ai-and-work.html", tag: "AI + work" },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><b>W</b></span>;
}

function InstructionalVisual({ kind }: { kind: NonNullable<LessonStep["visual"]> }) {
  if (kind === "decision") {
    return <div className="teaching-visual decision-visual" role="img" aria-label="A fair decision moves through hear, check, redesign, decide, and review">
      {["HEAR", "CHECK", "REDESIGN", "DECIDE", "REVIEW"].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}
    </div>;
  }
  if (kind === "representation") {
    return <div className="teaching-visual representation-visual" role="img" aria-label="Representation includes ideas, experiences, communities, interests, and perspectives">
      <strong>REPRESENTATION</strong><div>{["IDEAS", "EXPERIENCES", "COMMUNITIES", "INTERESTS", "PERSPECTIVES"].map((item) => <span key={item}>{item}</span>)}</div>
    </div>;
  }
  if (kind === "source-check") {
    return <div className="teaching-visual source-check-visual" role="img" aria-label="A source check distinguishes fact, opinion, claim, evidence, promise, and prediction">
      {["FACT", "OPINION", "CLAIM", "EVIDENCE", "PROMISE", "PREDICTION"].map((item) => <span key={item}>{item}</span>)}<strong>HOW DO WE KNOW?</strong>
    </div>;
  }
  if (kind === "governance") {
    return <div className="teaching-visual governance-visual" role="img" aria-label="First Nations, municipal, provincial, and federal governments are shown in relationship, not as a hierarchy">
      <strong>RELATIONSHIPS, RIGHTS &amp; RESPONSIBILITIES</strong><div><span>FIRST NATIONS GOVERNMENTS</span><i>↔</i><span>MUNICIPAL</span><i>↔</i><span>PROVINCIAL</span><i>↔</i><span>FEDERAL</span></div><small>Not one ladder. Not one governance system.</small>
    </div>;
  }
  if (kind === "ai-lens") {
    return <div className="teaching-visual ai-lens-visual" role="img" aria-label="An AI equity lens asks who benefits, who bears the costs, who has power, who is missing, who decides, and what evidence shows">
      <strong>POWERFUL TOOL</strong><div>{["WHO BENEFITS?", "WHO BEARS THE COSTS?", "WHO HAS POWER?", "WHO IS MISSING?", "WHO DECIDES?", "WHAT DOES THE EVIDENCE SHOW?"].map((item) => <span key={item}>{item}</span>)}</div>
    </div>;
  }
  if (kind === "evidence-spectrum") {
    return <div className="teaching-visual evidence-spectrum-visual" role="img" aria-label="AI statements are sorted into current technology, emerging technology, prediction, and hypothetical possibility">
      {[["CURRENT", "exists now"], ["EMERGING", "being developed"], ["PREDICTION", "may happen"], ["HYPOTHETICAL", "could happen"]].map(([title, note]) => <span key={title}><b>{title}</b><small>{note}</small></span>)}
      <strong>NAME WHAT WE KNOW—AND WHAT WE DON’T.</strong>
    </div>;
  }
  return <div className="teaching-visual participation-visual" role="img" aria-label="Voting is one part of democratic participation alongside listening, organizing, proposing, meeting, reporting, and following up">
    <strong>VOTING IS ONE PIECE</strong><div>{["LISTEN", "ORGANIZE", "PROPOSE", "MEET", "REPORT", "FOLLOW UP", "VOTE WHEN ELIGIBLE"].map((item) => <span key={item}>{item}</span>)}</div>
  </div>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [teacherMode, setTeacherMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [projectorMode, setProjectorMode] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [monthFilter, setMonthFilter] = useState("ALL");
  const [issueFilter, setIssueFilter] = useState("");
  const [selectedProject, setSelectedProject] = useState(actionProjects[0].id);
  const [actionStep, setActionStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chosenOptions, setChosenOptions] = useState<string[]>([]);

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? null;
  const currentStep = selectedLesson?.steps[stepIndex];
  const orderedLessons = lessonOrder.map((id) => lessons.find((lesson) => lesson.id === id)).filter((lesson): lesson is Lesson => Boolean(lesson));
  const months = ["ALL", ...Array.from(new Set(runways.map((item) => item.month)))];
  const visibleRunways = monthFilter === "ALL" ? runways : runways.filter((item) => item.month === monthFilter);
  const visibleIssues = issueAreas.filter((issue) => {
    const query = issueFilter.trim().toLowerCase();
    return !query || [issue.title, issue.question, issue.move].join(" ").toLowerCase().includes(query);
  });
  const currentProject = actionProjects.find((project) => project.id === selectedProject) ?? actionProjects[0];
  const featuredLesson = orderedLessons[0] ?? lessons[0];

  useEffect(() => {
    const closeProjector = () => {
      if (!document.fullscreenElement) setProjectorMode(false);
    };
    document.addEventListener("fullscreenchange", closeProjector);
    return () => document.removeEventListener("fullscreenchange", closeProjector);
  }, []);

  const go = (next: View) => {
    setView(next);
    setSelectedLessonId(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startLesson = (id: string, startAt = 0) => {
    setSelectedLessonId(id);
    setStepIndex(startAt);
    setChosenOptions([]);
    setView("teach");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showStep = (index: number) => {
    setStepIndex(index);
    setChosenOptions([]);
  };

  const toggleChoice = (choice: string) => {
    setChosenOptions((current) => {
      if (current.includes(choice)) return current.filter((item) => item !== choice);
      if (currentStep?.maxChoices === 1) return [choice];
      if (currentStep?.maxChoices && current.length >= currentStep.maxChoices) return current;
      return [...current, choice];
    });
  };

  const toggleProjector = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setProjectorMode(true);
      } catch {
        setProjectorMode((current) => !current);
      }
    } else {
      await document.exitFullscreen();
      setProjectorMode(false);
    }
  };

  const navItems: { key: View; label: string }[] = [
    { key: "home", label: "Teach" },
    { key: "plan", label: "Year plan" },
    { key: "action", label: "Student action" },
    { key: "library", label: "Printables" },
  ];

  return (
    <main className={[largeText ? "large-text" : "", teacherMode ? "teacher-on" : "", projectorMode ? "projector-on" : ""].filter(Boolean).join(" ")}>
      {!projectorMode && (
        <header className="site-header">
          <button className="brand" type="button" onClick={() => go("home")} aria-label="Equity Learning and Action Hub home">
            <BrandMark />
            <span><strong>Walnut Road</strong><small>Equity Learning &amp; Action</small></span>
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <button type="button" key={item.key} className={view === item.key ? "active" : ""} onClick={() => go(item.key)}>{item.label}</button>)}
          </nav>
          <div className="header-tools">
            <button type="button" className={teacherMode ? "toggle active" : "toggle"} aria-pressed={teacherMode} onClick={() => setTeacherMode((current) => !current)}>
              {teacherMode ? "Teacher notes on" : "Teacher notes"}
            </button>
            <button type="button" className="icon-button" aria-label={largeText ? "Use standard text size" : "Use larger text"} aria-pressed={largeText} onClick={() => setLargeText((current) => !current)}>Aa</button>
            <button type="button" className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? "Close" : "Menu"}</button>
          </div>
          {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <button type="button" key={item.key} onClick={() => go(item.key)}>{item.label}</button>)}</nav>}
        </header>
      )}

      {selectedLesson && currentStep ? (
        <section className={`lesson-player tone-${selectedLesson.tone}`}>
          <div className="lesson-player-top">
            {!projectorMode && <button type="button" className="back-button" onClick={() => setSelectedLessonId(null)}>← All lessons</button>}
            <div className="lesson-identity"><small>{selectedLesson.timing}</small><strong>{selectedLesson.title}</strong></div>
            {!projectorMode && <div className="player-print-actions"><a className="print-button primary-print" href={selectedLesson.printable.bwHref} target="_blank" rel="noreferrer">Print B&amp;W</a><a className="print-button" href={selectedLesson.printable.href} target="_blank" rel="noreferrer">Colour</a></div>}
            <button type="button" className="project-button" onClick={toggleProjector}>{projectorMode ? "Exit projection" : "Project screen"}</button>
          </div>
          <div className="step-track" aria-label={`Step ${stepIndex + 1} of ${selectedLesson.steps.length}`}>
            {selectedLesson.steps.map((step, index) => (
              <button key={step.label} type="button" className={index === stepIndex ? "active" : index < stepIndex ? "done" : ""} onClick={() => showStep(index)}>
                <b>{index + 1}</b><span>{step.label}</span>
              </button>
            ))}
          </div>

          <div className={["projector-stage", currentStep.image ? "with-image" : "", currentStep.cards ? "with-cards" : "", currentStep.links ? "with-links" : "", currentStep.artSpark ? "with-art" : "", currentStep.visual ? "with-visual" : ""].filter(Boolean).join(" ")}>
            <div className="step-kicker"><span>{currentStep.label}</span><b>{currentStep.time}</b></div>
            <h1>{currentStep.title}</h1>
            <p className="big-question">{currentStep.prompt}</p>
            {currentStep.visual && <InstructionalVisual kind={currentStep.visual} />}
            {currentStep.image && <img className="step-image" src={currentStep.image} alt={currentStep.imageAlt ?? ""} width="1536" height="1024" />}
            {currentStep.cards && <div className="fact-card-row">{currentStep.cards.map((card) => <article key={card.title}><b>{card.title}</b><span>{card.text}</span></article>)}</div>}
            {currentStep.maxChoices && <p className="choice-limit">Choose {currentStep.maxChoices === 1 ? "one" : `up to ${currentStep.maxChoices}`}.</p>}
            {currentStep.options && <div className="choice-row" aria-label="Tap to choose one or more options">{currentStep.options.map((option) => <button type="button" key={option} className={chosenOptions.includes(option) ? "selected" : ""} aria-pressed={chosenOptions.includes(option)} onClick={() => toggleChoice(option)}>{option}</button>)}</div>}
            <ol className="student-directions">{currentStep.directions.map((direction, index) => <li key={direction}><b>{index + 1}</b><span>{direction}</span></li>)}</ol>
            {currentStep.links && <div className="student-source-links">{currentStep.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>}
            {currentStep.artSpark && <div className="artivism-spark"><span aria-hidden="true">✦</span><p><b>ART SPARK</b>{currentStep.artSpark}</p></div>}
          </div>

          {teacherMode && !projectorMode && (
            <aside className="teacher-dock">
              <div><small>WHY THIS FITS NOW</small><p>{selectedLesson.use}</p><small className="dock-subhead">BEFORE CLASS</small>{selectedLesson.teacher.prepare.map((item) => <span key={item}>{item}</span>)}</div>
              <div><small>ASK / DO</small>{selectedLesson.teacher.moves.map((item) => <span key={item}>{item}</span>)}</div>
              <div><small>WATCH FOR</small><p>{selectedLesson.teacher.care}</p></div>
              <details open><summary>PRINT + OPEN SOURCES</summary><strong>{selectedLesson.teacher.evidence}</strong><div className="dock-print-row"><a href={selectedLesson.printable.bwHref} target="_blank" rel="noreferrer">B&amp;W ↓</a><a href={selectedLesson.printable.href} target="_blank" rel="noreferrer">Colour ↓</a></div><p>{selectedLesson.teacher.curriculum.join(" · ")}</p>{selectedLesson.teacher.sources?.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}{selectedLesson.teacher.adaptations && <details className="grade-adapt"><summary>GRADE ADAPTATIONS</summary>{selectedLesson.teacher.adaptations.map((item) => <span key={item.band}><b>{item.band}</b> {item.move}</span>)}</details>}</details>
            </aside>
          )}

          <div className="lesson-controls">
            <button type="button" disabled={stepIndex === 0} onClick={() => showStep(Math.max(0, stepIndex - 1))}>← Previous</button>
            <span>{stepIndex + 1} / {selectedLesson.steps.length}</span>
            {stepIndex < selectedLesson.steps.length - 1
              ? <button type="button" className="primary-control" onClick={() => showStep(stepIndex + 1)}>Next →</button>
              : <button type="button" className="primary-control" onClick={() => setSelectedLessonId(null)}>Finish lesson ✓</button>}
          </div>
        </section>
      ) : (
        <>
          {view === "home" && (
            <>
              <section className="home-hero">
                <div className="hero-copy">
                  <p className="eyebrow"><span /> {featuredLesson.timing} · {featuredLesson.length} · {featuredLesson.grades}</p>
                  <h1>What helps everyone <em>belong?</em></h1>
                  <p className="featured-route">LOOK CLOSELY <b>→</b> RANK WHAT MATTERS <b>→</b> DRAW THE ACTION</p>
                  <div className="featured-ready">
                    <div><small>MATERIALS</small><strong>{featuredLesson.materials}</strong></div>
                    <div><small>STUDENTS MAKE</small><strong>{featuredLesson.product}</strong></div>
                  </div>
                  <div className="hero-actions">
                    <button type="button" className="button primary" onClick={() => startLesson("belonging-built")}>Project screen 1 <span>→</span></button>
                    <a className="button secondary print-hero" href={featuredLesson.printable.bwHref} target="_blank" rel="noreferrer">Print B&amp;W</a>
                    <a className="colour-link" href={featuredLesson.printable.href} target="_blank" rel="noreferrer">Colour version ↓</a>
                  </div>
                  {teacherMode && <details className="home-teacher-notes"><summary>Teacher prep</summary><div><span><b>BEFORE</b>{featuredLesson.teacher.prepare.join(" · ")}</span><span><b>ASK</b>{featuredLesson.teacher.moves[0]}</span><span><b>EVIDENCE</b>{featuredLesson.teacher.evidence}</span></div></details>}
                  <button type="button" className="choose-another" onClick={() => go("teach")}>Choose another lesson ↓</button>
                </div>
                <figure className="hero-image">
                  <img src="/images/hero-belonging-built.webp" alt="Students and an adult redesigning a welcoming and accessible learning space." width="1536" height="1024" />
                  <figcaption><b>FIRST QUESTION</b><span>What helps people join in? What clues prove it?</span></figcaption>
                </figure>
              </section>

              <section className="election-now section" aria-labelledby="election-now-title">
                <div className="election-now-copy"><p className="eyebrow dark"><span /> Timely local connection · Oct. 17, 2026</p><h2 id="election-now-title">Who gets heard in Surrey?</h2><p>Use one short equity lens—not a second election unit. Classroom OS can teach the mechanics.</p></div>
                <div className="election-route-grid">
                  <button type="button" onClick={() => startLesson("voice-and-rules", 10)}><small>EARLY SEPTEMBER · 15 MIN</small><b>Voting is one piece</b><span>How can young people participate now?</span></button>
                  <button type="button" onClick={() => startLesson("voice-and-rules", 5)}><small>LATE SEPT.–OCTOBER · 45 MIN</small><b>Surrey equity lab</b><span>Decide, check missing perspectives, and revise.</span></button>
                  <button type="button" onClick={() => startLesson("voice-and-rules", 7)}><small>AFTER SEPTEMBER 11</small><b>Representation + messages</b><span>Use the official candidate list and equal samples.</span></button>
                  <button type="button" onClick={() => startLesson("voice-and-rules", 11)}><small>AFTER OCTOBER 17 · 15 MIN</small><b>Accountability check</b><span>Results are the start of the next question.</span></button>
                </div>
              </section>

              <section className="home-board section">
                <div className="section-title">
                  <div><p className="eyebrow dark"><span /> Ready to run</p><h2>Three strong starting points.</h2></div>
                  <button type="button" className="button secondary all-lessons-button" onClick={() => go("teach")}>See all 10 lessons →</button>
                </div>
                <div className="launch-grid">
                  <button type="button" className="launch-card leaf" onClick={() => startLesson("belonging-built", 0)}>
                    <span><b>45–55 MIN</b> Grade 6 rotation + first full week</span><h3>Belonging Action Studio</h3><p>Each student creates one full-page action plan, explains why it could help, and chooses a realistic first move.</p><strong>Students make: one action page → class commitments → check-back →</strong>
                  </button>
                  <button type="button" className="launch-card coral" onClick={() => startLesson("truth-place-responsibility")}>
                    <span><b>2–3 BLOCKS</b> Sept. 15–29</span><h3>Two Maps, One Place</h3><p>Use the provided maps and one local First Nations source. No teacher searching required.</p><strong>Students make: credited learning + next action →</strong>
                  </button>
                  <button type="button" className="launch-card sun" onClick={() => startLesson("voice-and-rules")}>
                    <span><b>15–90 MIN</b> Choose a September–October route</span><h3>Who Gets Heard?</h3><p>Start with a real class choice, then connect fairness to Surrey, trustees, participation, and accountability.</p><strong>Project one useful route—not all 12 screens →</strong>
                  </button>
                </div>
              </section>

              <section className="home-runway">
                <div>
                  <p className="eyebrow light"><span /> First six weeks</p>
                  <h2>Start before<br />the date.</h2>
                  <button type="button" className="text-link light" onClick={() => go("plan")}>Open the full-year runway →</button>
                </div>
                <div className="mini-runway">
                  {runways.slice(0, 3).map((item) => (
                    <article key={item.event}>
                      <b>{item.start}</b><div><strong>{item.event}</strong><span>Create {item.create} · Share {item.share}</span></div>
                      {item.lesson && <button type="button" onClick={() => startLesson(item.lesson!)}>Teach →</button>}
                    </article>
                  ))}
                </div>
              </section>

              <section className="section action-invite">
                <figure><img src="/images/student-voice-club.webp" alt="Students gathering ideas, choosing a priority, creating, and sharing an improvement." width="1586" height="992" /></figure>
                <div><p className="eyebrow dark"><span /> Student club + classroom projects</p><h2>Turn concern into action.</h2><p>Listen first. Learn from people affected. Choose the smallest useful action. Report what happened.</p><button type="button" className="button dark" onClick={() => go("action")}>Open Action Studio →</button></div>
              </section>
            </>
          )}

          {view === "teach" && (
            <section className="section page-section">
              <div className="page-heading split"><div><p className="eyebrow dark"><span /> Ready-to-run classroom experiences</p><h1>Choose a lesson.</h1><p>Start with the question. The activity and student result are shown on every card.</p></div><button type="button" className="button secondary browse-issues" onClick={() => go("issues")}>Browse by big question →</button></div>
              <div className="lesson-grid">
                {orderedLessons.map((lesson) => (
                  <article className={`lesson-card tone-${lesson.tone}`} key={lesson.id}>
                    <div className="lesson-card-top"><span>{lesson.timing}</span><b>{lesson.length}</b></div>
                    <h2>{lesson.title}</h2><p className="lesson-question">{lesson.question}</p>
                    <div className="lesson-formats">{lesson.formats.map((format) => <span key={format}>{format}</span>)}</div>
                    <div className="lesson-card-plan"><span><small>THE EXPERIENCE</small>{lesson.activity}</span><span><small>STUDENTS MAKE</small>{lesson.product}</span></div>
                    <p className="lesson-materials"><b>Materials:</b> {lesson.materials}</p>
                    <div className="lesson-meta"><span>{lesson.grades}</span><span>{lesson.steps.length} screens</span></div>
                    <div className="lesson-card-actions"><button type="button" onClick={() => startLesson(lesson.id)}>Project →</button><a className="bw-link" href={lesson.printable.bwHref} target="_blank" rel="noreferrer">Print B&amp;W</a><a href={lesson.printable.href} target="_blank" rel="noreferrer">Colour</a></div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {view === "plan" && (
            <section className="section page-section planning-page">
              <div className="page-heading split"><div><p className="eyebrow dark"><span /> 2026–27 teaching runway</p><h1>Plan ahead</h1></div><p><b>Core</b> = main sequence. <b>Featured</b> = recommended spring pathway. <b>Choice</b> = flexible extension. <b>Plan</b> = important date with a trusted starting source.</p></div>
              <div className="year-stage-grid">{yearStages.map((stage) => <article key={stage.n}><span>{stage.n}</span><small>{stage.when}</small><h2>{stage.title}</h2><p>{stage.detail}</p></article>)}</div>
              <div className="month-filter" aria-label="Filter schedule by month">{months.map((month) => <button type="button" key={month} className={monthFilter === month ? "active" : ""} onClick={() => setMonthFilter(month)}>{month}</button>)}</div>
              <div className="runway-list">
                {visibleRunways.map((item) => (
                  <article key={`${item.month}-${item.event}`} className={item.priority === "Core" ? "core" : item.priority === "Featured" ? "featured" : item.priority === "Plan" ? "plan" : ""}>
                    <div className="runway-month">{item.month}<small>{item.priority}</small></div>
                    <div className="runway-event"><h2>{item.event}</h2><span>WHY NOW: {item.date}</span></div>
                    <div className="runway-phase"><small>BEGIN</small><b>{item.start}</b></div>
                    <div className="runway-phase"><small>CREATE</small><b>{item.create}</b></div>
                    <div className="runway-phase"><small>SHARE</small><b>{item.share}</b></div>
                    {item.lesson ? <button type="button" onClick={() => startLesson(item.lesson!, item.startAt ?? 0)}>{item.cta ?? "Teach →"}</button> : item.href ? <a className="runway-source" href={item.href} target="_blank" rel="noreferrer">{item.cta ?? "Open source ↗"}</a> : <span className="coming-label">Planning marker</span>}
                  </article>
                ))}
              </div>
              <aside className="planning-note"><b>Keep it flexible.</b><span>The runway is a prompt, not another mandate. Choose what fits school priorities, students, available time, and authentic community connections.</span></aside>
            </section>
          )}

          {view === "issues" && (
            <section className="section page-section issues-page">
              <div className="page-heading split"><div><p className="eyebrow dark"><span /> Questions worth investigating</p><h1>Explore issues</h1></div><label className="search-box"><span>Find an issue</span><input value={issueFilter} onChange={(event) => setIssueFilter(event.target.value)} placeholder="rights, animals, access…" /></label></div>
              <article className="belonging-toolkit-feature">
                <div><span>COMMUNITY &amp; BELONGING</span><h2>Belonging &amp; Learner Voice Toolkit</h2><p>Five flexible pages for identity, learning preferences, inclusive spaces, community ideas, and goals. Learners can write, draw, colour, dictate, or use symbols.</p></div>
                <div><strong>Includes a facilitator guide with consent, privacy, accessibility, and display guidance.</strong><a href="/downloads/belonging-learner-voice-toolkit.pdf" target="_blank" rel="noreferrer">Open printable PDF ↓</a></div>
              </article>
              <div className="issue-grid">
                {visibleIssues.map((issue) => (
                  <article className={`issue-card tone-${issue.tone}`} key={issue.title}>
                    <span className="issue-icon" aria-hidden="true">{issue.icon}</span><h2>{issue.title}</h2><p>{issue.question}</p><strong>{issue.move}</strong>
                    <button type="button" onClick={() => startLesson(issue.lesson)}>Open learning pathway →</button>
                  </article>
                ))}
              </div>
              <aside className="issue-principle"><b>No student is the lesson.</b><span>Use authentic sources. Sharing personal identity or experience is always optional.</span></aside>
            </section>
          )}

          {view === "action" && (
            <section className="page-section action-page">
              <div className="action-hero section">
                <div><p className="eyebrow light"><span /> Student Action Studio</p><h1>Listen. Learn.<br /><em>Do something useful.</em></h1><p>Students choose what matters. Adults provide safety, access, permission, and follow-through.</p></div>
                <figure><img src="/images/student-voice-club.webp" alt="Students listening, mapping ideas, choosing a priority, and presenting an improvement." width="1586" height="992" /></figure>
              </div>
              <div className="section action-workspace">
                <div className="project-picker"><span>CHOOSE A POSSIBLE PROJECT</span><div>{actionProjects.map((project) => <button type="button" key={project.id} className={selectedProject === project.id ? "active" : ""} onClick={() => setSelectedProject(project.id)}>{project.title}</button>)}</div></div>
                <article className="project-focus"><div><small>START BY</small><p>{currentProject.start}</p></div><div><small>SUCCESS LOOKS LIKE</small><p>{currentProject.proof}</p></div>{currentProject.id === "spca" && <button type="button" onClick={() => startLesson("animal-welfare")}>Open BC SPCA learning pathway →</button>}</article>
                <div className="project-ready">
                  <article><small>OPEN THESE DIRECT SOURCES</small><div>{currentProject.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div></article>
                  <article><small>COMPARE THESE THREE STARTING ACTIONS</small><ol>{currentProject.actions.map((action) => <li key={action}>{action}</li>)}</ol><p>One is deliberately tempting but may not fit. Students use evidence to decide.</p></article>
                </div>
                <div className="action-step-tabs" aria-label="Action steps">{actionSteps.map((step, index) => <button type="button" key={step.n} className={actionStep === index ? "active" : ""} onClick={() => setActionStep(index)}><b>{step.n}</b><span>{step.title}</span></button>)}</div>
                <article className="action-step-card"><span>STEP {actionSteps[actionStep].n}</span><h2>{actionSteps[actionStep].title}</h2><p>{actionSteps[actionStep].question}</p><strong>{actionSteps[actionStep].tool}</strong><div><button type="button" disabled={actionStep === 0} onClick={() => setActionStep((current) => Math.max(0, current - 1))}>← Back</button><button type="button" disabled={actionStep === actionSteps.length - 1} onClick={() => setActionStep((current) => Math.min(actionSteps.length - 1, current + 1))}>Next →</button></div></article>
                <div className="action-download"><div><b>READY-TO-USE STUDENT TOOLKIT</b><span>Issue research, power mapping, action planning, and reflection.</span></div><a href="/downloads/from-concern-to-action-student-toolkit.pdf">Colour PDF ↓</a><a href="/downloads/from-concern-to-action-student-toolkit-black-white.pdf">B&amp;W PDF ↓</a></div>
              </div>
            </section>
          )}

          {view === "library" && (
            <section className="section page-section library-page">
              <div className="page-heading split"><div><p className="eyebrow dark"><span /> Quietly kept in the back</p><h1>Resources</h1></div><p>Open what you need. The teaching experience stays uncluttered.</p></div>
              <h2 className="library-heading">Lesson activity packs</h2>
              <p className="library-intro">Every pack includes two student pages plus a one-page teacher quick start with materials, a 60-second model, run steps, debrief, evidence, and ready source links.</p>
              <div className="lesson-printables-grid">{orderedLessons.map((lesson, index) => <article className={`tone-${lesson.tone}`} key={lesson.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{lesson.printable.title}</h3><p>{lesson.printable.includes}</p></div><div className="printable-links"><a className="bw-link" href={lesson.printable.bwHref} target="_blank" rel="noreferrer">B&amp;W ↓</a><a href={lesson.printable.href} target="_blank" rel="noreferrer">Colour ↓</a></div></article>)}</div>
              <h2 className="library-heading">Longer project toolkits</h2>
              <div className="download-grid">{downloads.map((item) => <article key={item.title}><span>{item.type}</span><h3>{item.title}</h3><p>{item.detail}</p><div>{item.colour === item.bw ? <a href={item.bw}>Open printable PDF ↓</a> : <><a href={item.colour}>Colour PDF ↓</a><a href={item.bw}>B&amp;W PDF ↓</a></>}</div></article>)}</div>
              <h2 className="library-heading">Trusted starting points</h2>
              <div className="link-list">{trustedLinks.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.href}><span>{item.tag}</span><div><strong>{item.title}</strong><small>{item.source}</small></div><b>↗</b></a>)}</div>
              {teacherMode && <aside className="gentle-care"><div><p className="eyebrow dark"><span /> Teaching with care</p><h2>Four gentle reminders</h2></div><ol><li><b>1</b><span><strong>Begin with curiosity.</strong> Notice assumptions and keep learning.</span></li><li><b>2</b><span><strong>Use authentic voices.</strong> Credit the specific people and communities represented.</span></li><li><b>3</b><span><strong>Protect dignity.</strong> No student represents a whole identity or community.</span></li><li><b>4</b><span><strong>Include possibility.</strong> Teach joy, strength, solidarity, repair, and action alongside harm.</span></li></ol></aside>}
            </section>
          )}
        </>
      )}
      {!projectorMode && <footer><BrandMark /><p><strong>Walnut Road Equity Learning &amp; Action Hub</strong><span>Built for projection, participation, and thoughtful action.</span></p><button type="button" onClick={() => go("home")}>Back to start ↑</button></footer>}
    </main>
  );
}
