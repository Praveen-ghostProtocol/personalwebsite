/** @type {import('./types.js').Profile} */
export const profile = {
  name: "Praveen Kumar S",
  headline:
    "I notice what could work better. Then I try to do something about it.",
  intro:
    "I’m Praveen. I study Engineering Design and Data Science at IIT Madras. I’m co-founding Optimus, a funded investing-education startup. I also build side projects, including Weave and BookHop, and play cricket.",
  story: [
    "I notice problems in almost everything and often find myself mentally working through how I’d fix them. Only a few times have I actually done something about it. I’m trying to act on more of those ideas now.",
    "With my background and what I’ve learned so far, I want to build a company that matters because it solves a real problem. This site brings together that work, along with competitions, cricket and other parts of my life.",
  ],
  email: "s4spraveen.2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/s4spraveen/",
  github: "https://github.com/Praveen-ghostProtocol",
  portrait: {
    slot: "portrait-primary",
    src: "/assets/portrait-primary.webp",
    alt: "Praveen smiling outdoors in a cream shirt.",
    caption: "Praveen Kumar S",
    width: 383,
    height: 429,
    publication: "approved",
  },
};

/** @type {import('./types.js').Project[]} */
export const projects = [
  {
    title: "Weave",
    slug: "weave",
    category: "Side project",
    stage: "In development",
    collaborators: "",
    dates: "",
    featuredOrder: 2,
    reviewed: "2026-11-01",
    publication: "approved",
    summary:
      "Linked notes that make personal context easier to organise and reuse. Select what matters, export it as Markdown, or use optional AI assistance to develop notes and summaries.",
    body: [
      {
        title: "Keeping the context around an idea",
        paragraphs: [
          "Weave connects notes through hierarchical parent links and related-note links. It is a way to organise personal context so it can be selected and reused, rather than rewritten each time.",
        ],
      },
      {
        title: "What is built",
        paragraphs: [
          "Notes are stored locally in the browser using IndexedDB. A selected group of notes can be exported as Markdown, with its parent notes and one-hop related notes included.",
          "Optional AI flows can ask questions, offer choices or accept free text to help develop a note or a first-person summary.",
        ],
      },
      {
        title: "Local notes, explicit AI requests",
        paragraphs: [
          "Local storage is the default for notes. When a user explicitly asks for AI assistance, selected content is sent to a server for processing. Local-first does not mean that content never leaves the browser.",
        ],
      },
      {
        title: "The next question",
        paragraphs: [
          "The next validation question is whether the structure makes personal context easier to find and reuse in practice. Implementation checks alone do not answer that question.",
        ],
      },
    ],
    media: [
      {
        slot: "weave-overview",
        alt: "Weave notes overview",
        caption: "Weave notes overview.",
        width: 1600,
        height: 1000,
        publication: "draft",
      },
      {
        slot: "weave-linking",
        alt: "Parent and related links in Weave",
        caption: "Parent links and related notes in Weave.",
        width: 1600,
        height: 1000,
        publication: "draft",
      },
      {
        slot: "weave-export",
        alt: "Weave Markdown export",
        caption: "A Markdown export from Weave.",
        width: 1600,
        height: 1000,
        publication: "draft",
      },
    ],
    links: [],
  },
  {
    title: "BookHop",
    slug: "bookhop",
    category: "Side project",
    stage: "Early development",
    collaborators: "",
    dates: "",
    featuredOrder: 3,
    reviewed: "2026-11-01",
    publication: "approved",
    summary:
      "An early-stage project exploring how verified students could find and exchange used books on campus. The account, catalogue and listing foundations are built; discovery, messaging and demand validation are next.",
    body: [
      {
        title: "A campus-sized starting point",
        paragraphs: [
          "BookHop explores discovery and exchange of physical used books in India. The proposed starting audience is verified students across two or three Chennai campuses, with exchanges happening in person.",
          "WhatsApp groups already provide an alternative. A new product needs to earn its place by making discovery and coordination meaningfully easier. That demand has not yet been established.",
        ],
      },
      {
        title: "The foundations and the boundary",
        paragraphs: [
          "Foundations for accounts, age gating, campus verification, consent and deletion, a catalogue, listings and wanted requests are implemented. Discovery, messaging and a campus pilot are the next steps.",
          "A browse-and-message test with a small group of friends is planned, with transactions disabled. It has not yet happened.",
        ],
      },
      {
        title: "Decisions with trade-offs",
        paragraphs: [
          "The application uses Django and PostgreSQL with server-rendered HTML. This keeps the initial implementation focused on the account, catalogue and listing flows.",
          "Student access is intended to be free. Institutional payment is an untested payer hypothesis. BookHop does not propose escrow, payment custody or processing student transaction payments.",
        ],
      },
      {
        title: "What needs to be learned",
        paragraphs: [
          "Customer interviews have not started. Demand, trust in campus verification, and the reason to choose BookHop over existing groups are still open questions.",
          "The next step is to speak with students and test the proposed discovery and coordination flow before treating a campus rollout or payer model as validated.",
        ],
      },
    ],
    media: [
      {
        slot: "bookhop-foundations",
        alt: "BookHop account and catalogue foundations",
        caption: "BookHop accounts and catalogue.",
        width: 1600,
        height: 1000,
        publication: "draft",
      },
      {
        slot: "bookhop-flow",
        alt: "BookHop proposed exchange flow",
        caption: "BookHop discovery and messaging concept.",
        width: 1600,
        height: 900,
        publication: "draft",
      },
    ],
    links: [],
  },
  {
    title: "Optimus",
    slug: "optimus",
    category: "Startup",
    stage: "Product development & validation",
    funding: "Funded startup",
    collaborators: "Built with my co-founders",
    dates: "",
    featuredOrder: 1,
    reviewed: "2026-11-02",
    publication: "approved",
    summary:
      "A funded investing-education startup I’m building with my co-founders to help people learn through practice with virtual money. Product development and UI/UX design are underway.",
    body: [
      {
        title: "Learning through practice",
        paragraphs: [
          "Optimus is a gamified investing-education platform we are building to help people learn through practice with virtual money.",
        ],
      },
      {
        title: "What the early signal tells us",
        paragraphs: [
          "We have received around 100 waitlist responses and are speaking with potential users to refine the problem and prioritise features.",
          "These responses are an early expression of interest. We are still validating the idea, rather than claiming active-user traction or proven learning outcomes.",
        ],
      },
      {
        title: "Work underway",
        paragraphs: [
          "Product development and UI/UX design are underway with my co-founders. We are using conversations with potential users to decide what to prioritise.",
        ],
      },
      {
        title: "The next validation step",
        paragraphs: [
          "Refine the problem through potential-user conversations, prioritise the features that address it, and decide how to evaluate the practice experience.",
        ],
      },
    ],
    media: [
      {
        slot: "optimus-overview",
        alt: "Optimus product design",
        caption: "Optimus product design.",
        width: 1600,
        height: 1000,
        publication: "draft",
      },
    ],
    links: [],
  },
];

/** @type {import('./types.js').Project[]} */
const supportingProjects = [
  {
    slug: "effivity-ai",
    title: "Effivity AI",
    category: "Internship",
    stage: "Proof of concept",
    collaborators: "Effivity team",
    summary:
      "A prompt-to-BPMN proof of concept for generating workflows and process artefacts, later productised as VegamAI.",
    dates: "",
    reviewed: "2026-11-01",
    publication: "approved",
    body: [
      {
        title: "An earlier engineering contribution",
        paragraphs: [
          "Built a prompt-to-BPMN proof of concept for generating workflows and process artefacts during an engineering internship. The proof of concept was later productised into VegamAI.",
        ],
      },
    ],
    media: [],
    links: [],
  },
  {
    slug: "namma-yatri",
    title: "Namma Yatri · Team BlueLock",
    category: "Competition",
    stage: "Competition prototype",
    collaborators: "Team BlueLock",
    summary:
      "A Great Bengaluru Hackathon submission exploring peak-hour ride denials, metro-linked journeys and driver demand information.",
    dates: "",
    reviewed: "2026-11-01",
    publication: "approved",
    body: [
      {
        title: "The proposal",
        paragraphs: [
          "Team BlueLock’s first-place Great Bengaluru Hackathon submission explored peak-hour ride denials, metro-linked journeys, demand prediction and clustering, and a prototype driver interface.",
        ],
      },
    ],
    media: [],
    links: [],
  },
  {
    slug: "nykaabridge",
    title: "NykaaBridge",
    category: "Engineering",
    stage: "Independent project",
    collaborators: "",
    summary:
      "An independent beauty-retail assistant concept connecting wish lists with in-store shopping.",
    dates: "",
    reviewed: "2026-11-01",
    publication: "approved",
    body: [
      {
        title: "A retail-assistant experiment",
        paragraphs: [
          "An independent project exploring a recommendation pipeline using customer preferences, product discovery and image analysis to connect online wish lists with in-store shopping.",
        ],
      },
    ],
    media: [],
    links: [],
  },
  {
    slug: "blue-monitor",
    title: "Blue Monitor",
    category: "Engineering",
    stage: "Engineering project",
    collaborators: "Six-person team",
    summary:
      "A hands-on engineering project involving a five-sensor radio-controlled boat and water testing.",
    dates: "",
    reviewed: "2026-11-01",
    publication: "approved",
    body: [
      {
        title: "A physical build",
        paragraphs: [
          "A six-person engineering project covering technical planning, procurement, construction and water testing of a five-sensor radio-controlled boat for water-quality monitoring.",
        ],
      },
    ],
    media: [],
    links: [],
  },
];
projects.push(...supportingProjects);

/** @type {import('./types.js').Achievement[]} */
export const achievements = [
  {
    slug: "great-bengaluru",
    category: "Co-curricular",
    event: "The Great Bengaluru Hackathon",
    organiser: "Sarvam AI × Namma Yatri",
    year: "",
    result: "1st place · team result",
    attribution: "Team BlueLock",
    summary:
      "A first-place team submission exploring ride-demand imbalance, metro-linked journeys, driver demand information and rider–driver communication. The work was a competition proposal and prototype.",
    publication: "approved",
    media: [],
    project: "namma-yatri",
  },
  {
    slug: "appian",
    category: "Co-curricular",
    event: "Appian AI Case Challenge",
    organiser: "Appian",
    year: "",
    result: "3rd place",
    attribution: "",
    summary:
      "DocuSort AI: an OCR-based proof of concept for document classification, multilingual extraction and metadata tagging.",
    publication: "approved",
    media: [],
  },
  {
    slug: "stucred",
    category: "Co-curricular",
    event: "StuCRED Case Competition",
    organiser: "StuCRED",
    year: "",
    result: "1st place",
    attribution: "",
    summary:
      "LoanSense AI: a student credit-underwriting proof of concept developed for the StuCRED Case Competition.",
    publication: "approved",
    media: [],
  },
  {
    slug: "innovision",
    category: "Co-curricular",
    event: "Indian Bank Innovision",
    organiser: "Indian Bank",
    year: "",
    result: "4th place",
    attribution: "",
    summary:
      "SAFE: a banking fraud-prevention prototype developed for Indian Bank Innovision.",
    publication: "approved",
    media: [],
  },
  {
    slug: "ceos-summit",
    category: "Co-curricular",
    event: "CEOs Summit, IIT Hyderabad",
    organiser: "E-Cell IIT Hyderabad",
    year: "",
    result: "1st place · team result",
    attribution: "Team Twist",
    summary:
      "A first-place team case analysis of Byju’s valuation decline and a proposed route toward profitability.",
    publication: "approved",
    media: [],
  },
  {
    slug: "ops-cogitate",
    category: "Co-curricular",
    event: "OPS Cogitate",
    organiser: "IIM Raipur",
    year: "",
    result: "3rd place",
    attribution: "",
    summary:
      "An FMCG supply-chain sustainability case and a proposed procurement strategy.",
    publication: "approved",
    media: [],
  },
  {
    slug: "swiggy-fft",
    category: "Co-curricular",
    event: "Food for Thought Challenge",
    organiser: "Swiggy / Dineout",
    year: "",
    result: "Competition submission",
    attribution: "Team Code Blooded, IIT Madras",
    summary:
      "A campus food-companion proposal covering delivery, dining out, student segments and go-to-market ideas.",
    publication: "approved",
    media: [],
  },
  {
    slug: "qrt",
    category: "Co-curricular",
    event: "QRT Quant Challenge",
    organiser: "QRT",
    year: "",
    result: "National semifinalist",
    attribution: "",
    summary: "Reached the national semifinals of the QRT Quant Challenge.",
    publication: "approved",
    media: [],
  },
  {
    slug: "bangalore-zone",
    category: "Cricket",
    event: "State level cricketer",
    organiser: "",
    year: "Two consecutive seasons",
    result: "Zonal representation",
    attribution: "Individual selection for Bangalore Zone",
    summary:
      "Represented Bangalore Zone in Karnataka for two consecutive years in the under-14 category.",
    publication: "approved",
    media: [],
    subtitle: "Bangalore Zone · Under-14",
  },
  {
    slug: "inter-iit",
    category: "Cricket",
    event: "Inter-IIT Sports Meet",
    organiser: "Inter-IIT Sports Meet",
    year: "2025",
    result: "Team gold",
    attribution: "IIT Madras cricket team",
    summary:
      "Won cricket gold with the IIT Madras team at the Inter-IIT Sports Meet in 2025.",
    publication: "approved",
    media: [],
  },
  {
    slug: "sanmar",
    category: "Cricket",
    event: "SANMAR Trophy",
    organiser: "",
    year: "2024",
    result: "Team gold",
    attribution: "IIT Madras cricket team",
    summary: "Won SANMAR Trophy gold with the IIT Madras cricket team in 2024.",
    publication: "approved",
    media: [],
  },
  {
    slug: "sportsfest",
    category: "Cricket",
    event: "SportsFest",
    organiser: "",
    year: "2024",
    result: "Team bronze",
    attribution: "IIT Madras cricket team",
    summary: "Won SportsFest bronze with the IIT Madras cricket team in 2024.",
    publication: "approved",
    media: [],
  },
  {
    slug: "schroeter",
    category: "Cricket",
    event: "Schroeter’s Trophy",
    organiser: "IIT Madras",
    year: "2024",
    result: "2nd in MVP ranking · 3rd in runs",
    attribution: "Individual rankings; team semifinal",
    summary:
      "Finished second in the MVP ranking and third in runs in Schroeter’s Trophy 2024.",
    publication: "approved",
    media: [],
  },
];

export const lifeCopy =
  "I play cricket alongside my studies and the products I’m building.";

/** @type {import('./types.js').Experience[]} */
export const experience = [
  {
    company: "Bain & Company",
    role: "Incoming Associate Consultant Intern",
    period: "2027",
    summary:
      "Joining Bain & Company as an Associate Consultant Intern in 2027.",
    incoming: true,
    publication: "approved",
  },
  {
    company: "Effivity Technologies",
    role: "Founder’s Office Intern",
    period: "2026",
    summary:
      "Worked on workflow-creation adoption, AI-led automation and evaluating customer segments for a paid-pilot target.",
    publication: "approved",
  },
  {
    company: "Gnani.ai",
    role: "Founder’s Office Intern",
    period: "May–July 2025",
    summary:
      "Built B2B case studies and sector-specific sales presentations, automated content and sales workflows, and worked on Inya.ai onboarding and pricing.",
    publication: "approved",
  },
  {
    company: "Effivity Technologies",
    role: "SDE Intern",
    period: "May–July 2024",
    summary:
      "Built a prompt-to-BPMN proof of concept for generating workflows and process artefacts. The proof of concept was later productised into VegamAI.",
    publication: "approved",
  },
  {
    company: "Hesa.co",
    role: "Financial Consultant",
    period: "December 2023–January 2024",
    summary:
      "Created operating-process documentation across sales, onboarding, logistics and support, and mapped the customer journey.",
    publication: "approved",
  },
];

export const hubChapters = [
  {
    key: "entrepreneurship",
    label: "Entrepreneurship",
    detail: "Optimus · funded startup",
    href: "#entrepreneurship",
    position: "startup",
  },
  {
    key: "projects",
    label: "Side projects",
    detail: "Weave & BookHop",
    href: "#side-projects",
    position: "projects",
  },
  {
    key: "experience",
    label: "Professional experience",
    detail: "Founder’s office & engineering",
    href: "#experience",
    position: "experience",
  },
  {
    key: "cricket",
    label: "Cricket",
    detail: "On the field, in a team",
    href: "/accomplishments/#sports",
    position: "cricket",
  },
  {
    key: "competitions",
    label: "Competitions",
    detail: "Cases & hackathons",
    href: "/accomplishments/#co-curricular",
    position: "competitions",
  },
  {
    key: "about",
    label: "About me",
    detail: "The person around the work",
    href: "/about/",
    position: "about",
  },
];

/** Add cleared life photographs here; their slots are reused across pages. @type {import('./types.js').Media[]} */
export const lifeMedia = [
  {
    slot: "life-cricket-01",
    src: "/assets/life-cricket-01.webp",
    alt: "Praveen facing the cricket field, holding his bat and wearing his number 18 IIT Madras jersey.",
    caption: "On the cricket field, in IIT Madras colours.",
    width: 960,
    height: 1280,
    publication: "approved",
  },
  {
    slot: "life-cricket-02",
    src: "/assets/life-cricket-02.webp",
    alt: "Praveen in a batting stance on a cricket field, wearing IIT Madras colours.",
    caption: "Bat in hand. IIT Madras colours.",
    width: 1280,
    height: 960,
    publication: "approved",
  },
];
