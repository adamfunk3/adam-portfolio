export const person = {
  name: 'Adam Funk',
  title: 'M12 | Business Development & Ventures Analyst',
  company: 'Microsoft',
  location: 'Redmond, WA',
  email: 'adamfunk3@gmail.com',
  linkedin:  'https://www.linkedin.com/in/adamdfunk/',
  twitter:   'https://x.com/adamdfunk?s=21',
  instagram: 'https://www.instagram.com/adam.funk?igsh=dTM3OHdtdDRvcXJr&utm_source=qr',
  headshot: '/headshot.png',
  tagline: 'Finance professional at the intersection of strategy, capital markets, and technology.',
  tags: ['Venture Capital', 'M&A', 'Investment Banking', 'Financial Modeling', 'CapEx Strategy', 'Growth Equity'],
}

// Street layout (chronological, start→end):
//   z=8:  About Adam (left) | BYU (right)
//   z=2:  Early Career (left) | Sorenson Capital (right)
//   z=-4: Accel-KKR (left) | Goldman Sachs (right)
//   z=-10: Vector Capital (left) | Microsoft (right)
//   Player walks from z=14 toward z=-12
//   Street width: x = -2.5 to 2.5  |  Sidewalks: x = ±2.5 to ±5

export const buildings = [
  // ── RIGHT SIDE ──────────────────────────────────────────────────────────────

  {
    id: 'microsoft',
    name: 'Microsoft',
    type: 'work',
    years: '2024 – Present',
    location: 'Redmond, WA',
    color: '#003F84',
    accentColor: '#50E6FF',
    height: 24,
    width: 8,
    depth: 6,
    position: [9, 0, -10],
    emoji: '🏢',
    blurb: 'Joining Microsoft has given me the perfect intersection of all my experiences within finance, investment banking, and tech. Being in a rotation program has not only allowed me to fully customize and curate the experience I wanted have, but also broadened my network by bringing me in with a cohort of 50+ professionals in a similar spot to me. Working at Microsoft during the global AI boom has deeply educated me on how to incorporate AI within every deliverable, workflow, and project. I also understand the infrastructure, compute, and energy necessary for the demand at scale that we\'re witnessing from a consumer and enterprise standpoint today. Now being on the Corporate Development and M12 teams, I have been staffed on a variety of deals for Microsoft that represents the core of their mission. The most fascinating part of this experience has been how "people-focused" all these deals have been. Whether it\'s deals solely for hiring talent or believing in a certain founder of an industry-changing innovation, people (and customers) are at the center of much of Microsoft\'s strategic work, partnerships, and inorganic growth.',
    logoSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="44" fill="#F25022"/>
      <rect x="54" y="2" width="44" height="44" fill="#7FBA00"/>
      <rect x="2" y="54" width="44" height="44" fill="#00A4EF"/>
      <rect x="54" y="54" width="44" height="44" fill="#FFB900"/>
    </svg>`,
    roles: [
      {
        title: 'M12 | Business Development & Ventures Analyst',
        period: 'Mar 2026 – Present',
        bullets: [
          'Perform follow-on investment, exit, and secondary sale analyses and preparations for M12 portfolio companies.',
          'Generate fund portfolio insights to support strategic decision-making across the M12 venture portfolio.',
          'Drive strategic growth initiatives by analyzing market trends, evaluating M&A opportunities, and building financial models across the venture fund.',
        ],
      },
      {
        title: 'Corporate Development Analyst',
        period: 'Sep 2025 – Mar 2026',
        bullets: [
          'Led company-wide strategic growth initiatives analyzing market trends, executing M&A opportunities, and spearheading AI projects to enhance efficiency across diligence processes, approval stages, and inbound evaluation.',
          'Supported multiple live deals end-to-end — building exec-ready financial models, comps analyses, PnL overviews, and diligence materials presented to CVP and CFO audiences.',
          'Drove AI-for-M&A initiatives: led creation of the team\'s first prompt library, organized the Deal Docs SharePoint database, and contributed to Deal Document generation tooling.',
          'Delivered strategic projects across Security BD (market trends/industry multiples deck), Gaming (3 company overviews for new CEO), and Quantum Computing (product overview + competitive landscape).',
        ],
        deals: [
          { name: 'Databricks – $5bn Series L Investment', detail: 'Built Company Overview deck with business & financial overview, funding/M&A history, public comps, expanded comps, and illustrative returns analysis to inform Microsoft leadership.' },
          { name: 'Project Raven ~$10mm acqui-hire (legal AI)', detail: 'Drafted A2N deliverable with OpEx overview, key employee highlights, PnL overview, product roadmap, and market opportunity. Drove executive-level comms and data sharing agreements between parties.' },
        ],
      },
      {
        title: 'Financial Analyst | Data Center & Networking Planning',
        period: 'Mar 2025 – Sep 2025',
        bullets: [
          'Developed an ACR/MW financial model delivering YoY/QoQ, region-level insights by utilization and monetization for leadership, with alignment to CPI close figures and GoLocal cube.',
          'Orchestrated diligence and approval of $1.6bn+ in cumulative networking CapEx and COGS deals (dark fiber, subsea, lit wave, 400G transitions, Edge sites) across AMER, EMEA, and APAC.',
          'Led weekly regional SSR calls with sourcing engineers, conducting due diligence and synthesizing finance-aligned recommendations in weekly pre-reads for senior leadership.',
          'Dedicated 105+ hours to networking/data-center technical training; created a new onboarding module for future rotation participants to accelerate technical ramp-up.',
        ],
      },
      {
        title: 'Financial Analyst | Azure & Copilot Implementation and Migration',
        period: 'Sep 2024 – Mar 2025',
        bullets: [
          'Built scalable NNR reporting across 12 worldwide teams, improving revenue accuracy by 3% for 300+ stakeholders and enabling ISD\'s new NNR PowerBI Dashboard.',
          'Automated ISD ACR closes with VBA and advanced Excel formulas, eliminating errors to ~0%, saving 5+ hours/month, and reducing next FRP ramp time by 33%.',
          'Initiated Copilot Activation analysis for Modern Work ISD accounts — built a model informing FY26 planning and presented ISD\'s 20% impact on Copilot MAU/PAU to leadership.',
          'Built a Copilot Agent on ISD SharePoint, reducing new FRP onboarding by 2 hours and saving 0.5 hours/week on recurring questions.',
          'Developed a real-time PowerBI Consumption Dashboard by region and solution area, saving 7+ hours/month on manual reporting with 20% improvement in data accessibility.',
        ],
      },
    ],
  },

  {
    id: 'goldman',
    name: 'Goldman Sachs',
    type: 'work',
    years: 'Summer 2023',
    location: 'San Francisco, CA',
    color: '#0A1E3C',
    accentColor: '#C9A84C',
    height: 18,
    width: 7,
    depth: 5,
    position: [9, 0, -4],
    emoji: '🏦',
    blurb: 'While I was gaining tremendous experience in private markets, I understood that in order to advise startups on operational excellence and a path to either being public or acquired, I needed to understand public markets and M&A transactions at the highest level. This gap in my skillset led me to pursue a role in investment banking. While at Goldman Sachs, to say I was amazed at the size and speed of the world\'s largest tech deals was an understatement. I met so many talented individuals who worked extremely hard. Efficiency in even the smallest of tasks led to major time savings down the road. I learned grit, how to learn quick, and how to interact with and value a client.',
    logoSvg: `<img src="./logos/goldman.png" style="width:100%;height:100%;object-fit:contain;background:white;padding:5px;box-sizing:border-box;border-radius:6px;" />`,
    roles: [
      {
        title: 'Investment Banking Summer Analyst | Technology, Media & Telecom',
        period: 'Jun – Aug 2023',
        bullets: [
          "Selected from a 1% acceptance rate class. Performed fairness committee case study on Amazon's ~$13bn Whole Foods acquisition — 30-page deck with DCF, PVFSP, public comps, and operational benchmarking.",
          'Managed and consolidated notes from 15+ client and internal meetings to summarize actionable items for GS, legal, and client teams.',
          'Created marketing materials, management presentations, and financial analysis for companies in security, software, and gaming spaces. Became proficient with FactSet and CapIQ.',
        ],
        deals: [
          { name: 'Rubrik Inc. ~$6bn IPO', detail: 'Tracked software IPO QoQ actual vs. guidance performance across 20+ companies, providing actionable insights on IPO timing and guidance strategy for the client.' },
          { name: 'E-Signature Company ~$11bn Take-Private', detail: 'Drafted MD-level materials with stock price performance vs. SaaS peers, benchmarking charts, revenue/uFCF multiples, PVFSP, M&A firepower analysis, and GS Activism Vulnerability Score.' },
        ],
      },
    ],
  },

  {
    id: 'vector',
    name: 'Vector Capital',
    type: 'work',
    years: 'Spring–Summer 2024',
    location: 'San Francisco, CA',
    color: '#1C1040',
    accentColor: '#9B72FF',
    height: 12,
    width: 6,
    depth: 4.5,
    position: [-9, 0, -10],
    emoji: '🔷',
    blurb: 'In investment banking, I really took a liking to the client-facing responsibilities and calls I had. Before joining Microsoft, I valued gaining additional reps in taking calls with CEOs, Managing Partners, Managing Directors, and other leaders who were looking to partner with Vector Capital. Introducing the firm, managing logistics, and managing the firm\'s CRM were exciting to me because of how well I got to know these people.',
    logoSvg: `<img src="./logos/vector.png" onerror="this.onerror=null;this.src='https://media.licdn.com/dms/image/v2/D560BAQEkwzJPlJJxOA/company-logo_200_200/company-logo_200_200/0/1718848414281/vector_capital_logo?e=2147483647&v=beta&t=rNzj1kKmYREG47fae8JXuY_GC17ZiroWFfOdIv1CJ-I'" style="width:100%;height:100%;object-fit:contain;background:white;padding:5px;box-sizing:border-box;border-radius:6px;" />`,
    roles: [
      {
        title: 'Deal Originations',
        period: 'Apr 2024 – Aug 2024',
        bullets: [
          'Deal origination and pipeline development at Vector Capital ($3.5bn+ deployed across buyouts, recaps, divestitures, credit, and minority investments).',
          'Facilitated 300+ calls with investment bankers, technology executives, and VCs to develop and maintain the firm\'s deal pipeline and intermediary relationships.',
          'Managed the firm\'s CRM (DealCloud) — updating company profiles, financial data, and key insights from executive meetings.',
          'Led introductions and initial calls with shortlisted investment banks, tech companies, and VC firms, transitioning discussions to Vector\'s product offerings.',
        ],
      },
    ],
  },

  {
    id: 'early',
    name: 'Early Career',
    type: 'work',
    years: '2019 – 2022',
    location: 'Utah & Beyond',
    color: '#1A1510',
    accentColor: '#E8A838',
    height: 10,
    width: 7,
    depth: 5,
    position: [-9, 0, 2],
    emoji: '🌱',
    blurb: 'Early in college, I had a particular interest in working for startups to gain tangible experience that led to understanding workflows and industries on a deeper level. I learned so much during my time with high-growth startups Lucid Software and Breeze Airways. Although I was in 2 totally different industries, one thing was common: they were both undergoing significant growth trajectories and were hitting frequent financial milestones. Being at Lucid Software during the closing of their Series C and at Breeze Airways during the launch of their first revenue flights made me passionate about being on the other side of those milestones. What if I could be a part of multiple companies\' growth journeys? That question is what eventually took me to Clarke Capital Partners, a family office in Provo that made early stage investments all the way to majority buyouts in consumer companies. This experience was fundamental in getting exposure to the world of private markets, operating, and investing.',
    logoSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill="#1A1510"/>
      <text x="50" y="58" font-size="48" text-anchor="middle" dominant-baseline="central">🌱</text>
      <text x="50" y="88" font-family="Arial,sans-serif" font-size="10" font-weight="700"
            fill="#E8A838" text-anchor="middle" letter-spacing="1">EARLY CAREER</text>
    </svg>`,
    roles: [
      {
        title: 'Analyst — Clarke Capital Partners',
        period: 'Aug 2021 – Apr 2022 · Provo, UT',
        bullets: [
          'Analyst at Clarke Capital Partners, a private investment firm focused on DTC brand acquisitions targeting 3x EBITDA multiples.',
          'Built LBO models for Brandless portfolio acquisitions targeting 2–3x MoM and 15–30% IRR.',
          'Collaborated with Brandless C-suite (CEO, CFO, CRO) on financial forecasts for a Utah expansion submitted to the Governor\'s Office of Economic Opportunity.',
        ],
        deals: [
          { name: 'DoNotAge – $32mm acquisition', detail: '4.6x LTM EBITDA. Ran hero-product pricing analysis revealing 75% of products were overpriced vs. alternatives. Verified SG&A/marketing expense claims (1% of revenue, organic growth) through data room receipt analysis.' },
          { name: 'Sutera – $24mm DTC home goods', detail: '5.4x EBITDA. Found marketing spend outpacing revenue growth, projected 10% YoY Amazon sales increase, and identified heavy PPC dependency ($16M spend) with no true product IP.' },
        ],
        attachments: [
          { name: 'Early career photo', type: 'image/jpeg', dataUrl: './early-career.jpg' },
        ],
      },
      {
        title: 'Accounting & Finance Analyst — Breeze Airways',
        period: 'May 2021 – Aug 2021 · Salt Lake City, UT',
        bullets: [
          'Supported preparation of monthly financial statements through Oracle and Excel-based models; completed 200+ journal entries and account reconciliations across three month-end close cycles.',
          'Managed debt schedules for aircraft and station assets to ensure accurate reporting to FP&A leadership and the CFO.',
        ],
      },
      {
        title: 'Billing Analyst — Lucid Software',
        period: 'Sep 2020 – Apr 2021 · Salt Lake City, UT',
        bullets: [
          'Resolved 3.5K+ customer inquiries related to subscription invoices, refunds, and currency changes using Recurly, Zendesk, and Salesforce, contributing to a 30% reduction in support ticket volume and improved customer retention.',
          'Identified upsell opportunities through customer support interactions, generating $50K+ in incremental ARR by converting service tickets into qualified sales leads.',
        ],
      },
      {
        title: 'Instructor — Missionary Training Center',
        period: 'Aug 2019 – May 2020 · Provo, UT',
        bullets: [
          'Delivered daily 3-hour training sessions preparing missionaries to successfully transition into global assignments following a three-week onboarding program.',
          'Collaborated with fellow instructors to improve training effectiveness and strengthen classroom cohesion.',
          'Mentored 18-24-year-old participants in adapting schedules, developing subject-matter knowledge, and cultivating service-oriented mindsets.',
        ],
      },
    ],
  },

  // ── LEFT SIDE ───────────────────────────────────────────────────────────────

  {
    id: 'sorenson',
    name: 'Sorenson Capital',
    type: 'work',
    years: '2022',
    location: 'Lehi, UT',
    color: '#0F2645',
    accentColor: '#4EBB8C',
    height: 14,
    width: 6,
    depth: 5,
    position: [9, 0, 2],
    emoji: '📈',
    blurb: 'In a world of accelerating technological capabilities paired with my experience at Lucid Software, I took a particular interest in tech. It is the single largest influence in how we communicate, work, and play. Combining my previous experience with consumer investing and now pairing it with my newfound passion for tech (especially in the growth-stage investing area), Sorenson brought all of those together cohesively. The LVT Series B I was staffed on still remains my favorite transaction I\'ve been a part of to this day (and not just because my wife ended up joining their sales team a few months later).',
    logoSvg: `<img src="./logos/sorenson.png" onerror="this.onerror=null;this.src='https://cdn.prod.website-files.com/6107b1111d4d3e4f9b43f258/68c985e4a33bacdc99f9781e_Sorenson-thumb.png'" style="width:100%;height:100%;object-fit:contain;background:white;padding:5px;box-sizing:border-box;border-radius:6px;" />`,
    roles: [
      {
        title: 'Growth Equity Analyst',
        period: 'May – Dec 2022',
        bullets: [
          "Multistage SaaS investor with $1bn AUM. Constructed views on growth-stage companies' product differentiation and competitive landscape via industry expert calls, customer interviews, and 3rd-party research.",
          'Sourced companies across multiple focus areas using Affinity CRM, tracking investments from a curated list of top 20 VC firms.',
          'Assisted on expert and customer calls for prospective investments, leading note-taking and analysis to develop diligence views on GTM strategy and competitive positioning.',
        ],
        deals: [
          { name: 'LiveView Technologies – $50mm Series B Investment', detail: 'Presented to investment committee on risks, market sizing, returns, and security sector tailwinds. Built a sales & marketing efficiency report revealing below-average rep performance, limited tech stack, and favorable compensation structure — highlighting the need for quality hires to capture soaring demand.' },
        ],
      },
    ],
  },

  {
    id: 'accelkkr',
    name: 'Accel-KKR',
    type: 'work',
    years: 'Winter 2023',
    location: 'Menlo Park, CA',
    color: '#0D2B1E',
    accentColor: '#3DDC84',
    height: 12,
    width: 6,
    depth: 4.5,
    position: [-9, 0, -4],
    emoji: '📊',
    blurb: 'In order to further strengthen my knowledge in growth-stage investing in tech and software, I joined Accel-KKR to hone in on my sourcing skillset. Reaching out to founders, identifying companies, justifying sector theses for subverticals within tech were all focus areas of this experience for me.',
    logoSvg: `<img src="./logos/accelkkr.png" onerror="this.onerror=null;this.src='https://lh7-us.googleusercontent.com/WdCmm8Vjn9Xkg-64Kcv9mLyYn9SaVSO7Z7YiUHq9j2UAjaL10ZK2520A2FKbnDodzuMh3SFB0l-U9uyajd8_ItdHXJo5SumNnwmpyHL_7YtuVpbBTYsL5yHIzpCFXePkdr9kRhfxLNum48_SY9Cbf9U'" style="width:100%;height:100%;object-fit:contain;background:white;padding:5px;box-sizing:border-box;border-radius:6px;" />`,
    roles: [
      {
        title: 'Winter Analyst',
        period: 'Jan 2023 – Apr 2023',
        bullets: [
          'Technology-focused private equity deal analysis at Accel-KKR, a leading software PE firm in Menlo Park, CA.',
          'Created SourceScrub vertical classifications across Accounting, Analytics, eCommerce, Healthcare, and other sectors to streamline sourcing of B2B mission-critical software targets with high retention.',
          'Applied ownership, employee count, investment size, and geography filters to systematically identify companies matching Accel-KKR\'s ideal investment profile (private, <$150M raised, US/Western Europe).',
          'Conducted a NYC geo deep-dive, identifying Boost Payment Solutions ($12bn+ processed, 195% transaction growth, 50%+ of Fortune 100 as clients).',
        ],
      },
    ],
  },

  {
    id: 'byu',
    name: 'BYU',
    type: 'education',
    years: '2019 – 2023',
    location: 'Provo, UT',
    color: '#002E5D',
    accentColor: '#FFFFFF',
    height: 11,
    width: 8,
    depth: 6,
    position: [9, 0, 8],
    emoji: '🎓',
    blurb: 'My time at Brigham Young University has been instrumental in shaping who I am personally and professionally. While obtaining my education at BYU, I made the decision to study finance and work every semester while in college. I made countless lifelong friends and gained access to exclusive internship opportunities time and time again (in part thanks to the ever-expanding, generous BYU Alumni presence). I also participated in many club events, case study competitions, networking trips, info sessions, and sports games. Being Co-President of the Private Equity and Venture Capital Association was not only valuable exposure for my career, but was also a ton of fun. I am grateful to have attended such a widely-respected university with alumni across the globe always willing to help out.',
    logoSvg: `<img src="./logos/byu.png" onerror="this.onerror=null;this.src='https://www.pngmart.com/files/23/Byu-Logo-PNG-Photo.png'" style="width:100%;height:100%;object-fit:contain;background:white;padding:4px;box-sizing:border-box;border-radius:6px;" />`,
    roles: [
      {
        title: 'B.S. Finance — Marriott School of Business',
        period: 'Graduated December 2023',
        bullets: [
          "GPA 3.70 / 4.00 | Dean's List (Top 5% of Marriott School) — Winter 2020.",
          '2× Edna L. Hebard Scholarship (merit + leadership, awarded to ~8% of students). Regents Scholarship.',
          'Co-President, Private Equity & Venture Capital Association (Dec 2021 – Dec 2023): mentored 100+ students, increased placement by 40%, organized 6 net treks and 5 case competitions.',
          'Favorite course: FIN 453 (Money, Banking & Business) — comprehensive study of financial systems, instruments, markets, and central banking policy.',
        ],
      },
    ],
  },

  {
    id: 'personal',
    name: 'About Adam',
    type: 'personal',
    years: '',
    location: 'Redmond, WA',
    color: '#103520',
    accentColor: '#52B788',
    height: 9,
    width: 8,
    depth: 6,
    position: [-9, 0, 8],
    emoji: '🌍',
    logoSvg: `<img src="./avatar.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />`,
    roles: [
      {
        title: 'Beyond the Resume',
        period: '',
        bullets: [
          '🏀 Varsity & AAU basketball (Viewmont HS + Utah Basketball Club) — 2017 All-Region Academic Award.',
          '🦅 Eagle Scout, Boy Scouts of America.',
          '✈️ Recent global traveler: Japan, Spain, Tahiti / Moorea, Switzerland, Mexico.',
          '👶 New father | die-hard Utah Jazz & BYU Cougars fan | Marvel enthusiast | morning workouts.',
          '⛪ LDS Volunteer Representative (Jul 2017 – Jul 2019) — managed 200+ volunteers across 4 states.',
        ],
      },
    ],
  },
]
