export type SpineProject = {
    phase: string;
    checkpoint: string;
    funnelStage: string;
    brief: string;
    defense: string;
    effortHours: number;
};

export type MiniProject = {
    concept: string;
    build: string;
    whyItMatters: string;
};

export type StreamCurriculum = {
    title: string;
    slug: string;
    tier: "A" | "B" | "C";
    duration: string;
    funnelDescription: string;
    drillThread: string;
    prerequisites: string;
    defenseFocus: string;
    weighting: string;
    spine: SpineProject[];
    miniProjects: MiniProject[];
};

export const RM_PBL_CURRICULUM: Record<string, StreamCurriculum> = {
    "full-stack-development": {
        title: "Full Stack Development",
        slug: "full-stack-development",
        tier: "A",
        duration: "8–10 weeks",
        funnelDescription: "Online coding assessment (DSA-heavy, still the gatekeeper at product companies) → technical interview on the stack (Java/Spring or MERN) → system design basics → HR/leadership round. 2026 shift: TypeScript expected not optional; basic DevOps/deployment literacy valued; AI-integration skills (LLM APIs, RAG, vector DBs) now a salary differentiator even for 'generalist' roles.",
        drillThread: "Full DSA Speed Layer runs daily throughout — arrays/hashing/strings (Wks 1–4), trees/graphs (Wks 5–6), DP + timed mocks from Wk 5 onward. Highest-volume stream; this is the tier where cold, unseen-problem reps matter most.",
        prerequisites: "Comfort with one programming language. Basic Git. No framework experience assumed.",
        defenseFocus: "Data model decisions. Why this shape and not a flatter one. What happens under concurrent writes. Which part they'd rewrite.",
        weighting: "Implementation quality ×1.5, design trade-offs ×1.25, collaboration ×1.25.",
        spine: [
            {
                phase: "Weeks 1–2",
                checkpoint: "Solo Project 1",
                funnelStage: "First-gate OA / take-home",
                brief: "Build a specified CRUD service with auth, from a written API contract. The contract is exact; matching it is the point.",
                defense: "10–15 min: defend data model, handling, and one design trade-off.",
                effortHours: 20
            },
            {
                phase: "Weeks 3–4",
                checkpoint: "Solo Project 2",
                funnelStage: "Live technical/stack round",
                brief: "\"Users need to share documents with expiring access.\" Design the model and the API yourself. Constraint: no third-party auth service.",
                defense: "Defense + immediate extraction pattern drills on whatever pattern they used.",
                effortHours: 30
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Pair Project",
                funnelStage: "System design round",
                brief: "A booking system where one student owns the availability engine and the other owns the reservation flow. They must integrate across an interface they negotiate themselves.",
                defense: "Joint live system-design walkthrough, mentor in recruiter-mode, probing follow-ups.",
                effortHours: 40
            },
            {
                phase: "Weeks 8–10",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed full-stack application with a non-trivial data model, deployed and reachable. (e.g. integrating an LLM API or vector DB).",
                defense: "PAT defense: architecture walkthrough + timed DSA round simulation in same session.",
                effortHours: 60
            }
        ],
        miniProjects: [
            { concept: "Arrays / Sliding Window", build: "API rate limiter (token bucket / sliding window)", whyItMatters: "Core pattern in Razorpay-style LLD rounds" },
            { concept: "Hashing", build: "URL shortener with real collision handling", whyItMatters: "Standard OA/first-gate pattern across all product companies" },
            { concept: "Linked List + Hashmap", build: "LRU cache used to speed up a real API endpoint", whyItMatters: "Classic machine-coding staple (Flipkart, Uber)" },
            { concept: "Stack", build: "Undo–redo engine / expression evaluator", whyItMatters: "Recurs in frontend-state and parser-style questions" },
            { concept: "Queue / Priority Queue", build: "Order/task-processing scheduler", whyItMatters: "Backend system-design staple" },
            { concept: "Trees (BST / Trie)", build: "Autocomplete / search-as-you-type engine", whyItMatters: "Directly named in the Solo 2 funnel stage above" },
            { concept: "Heaps", build: "'Top-k trending' leaderboard service", whyItMatters: "Common in feed-ranking and analytics-adjacent features" },
            { concept: "Graphs (BFS/DFS)", build: "Friend/content-recommendation engine", whyItMatters: "System-design round staple" },
            { concept: "Graphs (weighted / Dijkstra)", build: "Delivery/route optimizer", whyItMatters: "Higher-difficulty product-company round differentiator" },
            { concept: "Dynamic Programming", build: "Text-diff tool", whyItMatters: "Hard-tier gate at FAANG/unicorn OAs" }
        ]
    },
    "ai-ml": {
        title: "AI & Machine Learning",
        slug: "ai-ml",
        tier: "A",
        duration: "8–10 weeks",
        funnelDescription: "Recruiter screen → technical phone screen (Python + ML fundamentals + one applied question) → live ML system design (data → train → serve → monitor → retrain → cost) → applied domain interview (RAG / fine-tuning / MLOps) where the candidate walks through a shipped system, diagram in hand. 'Live, not take-home' is explicitly the post-2024 bar.",
        drillThread: "Python DSA fundamentals + ML-math drills throughout; lighter graph/DP volume than Full Stack, heavier on hashing/heap (top-k retrieval) and complexity reasoning for pipeline stages.",
        prerequisites: "Python. Basic statistics. Linear algebra literacy, not fluency.",
        defenseFocus: "Why this metric. What the baseline was and why it's honest. Where the model fails and who it fails for. What in the pipeline would break first at ten times the data.",
        weighting: "Failure analysis ×1.5, problem framing ×1.25, design trade-offs ×1.25.",
        spine: [
            {
                phase: "Weeks 1–2",
                checkpoint: "Solo Project 1",
                funnelStage: "Technical phone screen",
                brief: "Given a clean dataset and a specified target metric, build and evaluate a baseline. Reproducibility is graded: same seed, same numbers.",
                defense: "Defend metric choice, eval methodology, and one failure mode found.",
                effortHours: 20
            },
            {
                phase: "Weeks 3–4",
                checkpoint: "Solo Project 2",
                funnelStage: "Applied domain round",
                brief: "A dirty dataset with leakage planted in it and no stated metric. Choose the metric, justify it, and find the leak. Finding the leak is most of the grade.",
                defense: "Defense + extraction round on any hashing/heap patterns used.",
                effortHours: 35
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Pair Project",
                funnelStage: "Live ML system design round",
                brief: "One student owns retrieval, the other owns generation and evaluation, on a shared RAG service. They must agree an interface and an eval set before either writes code.",
                defense: "Live 10-minute whiteboard flow (data → train → serve → monitor) in front of peers/mentor, no notes.",
                effortHours: 40
            },
            {
                phase: "Weeks 8–10",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed applied ML system with a real evaluation story — what it gets wrong, measured. (e.g. Full RAG/agent capstone).",
                defense: "PAT defense with architecture in hand; mentor probes every pipeline choice.",
                effortHours: 60
            }
        ],
        miniProjects: [
            { concept: "Hashing", build: "Deduplication / embedding-cache layer for repeated inference calls", whyItMatters: "Underpins caching layers in production ML systems" },
            { concept: "Heaps", build: "Top-k retrieval ranker for a RAG search feature", whyItMatters: "Directly reused from the Solo 2 project" },
            { concept: "Linked List + Hashmap", build: "LRU cache for inference responses", whyItMatters: "Common latency-optimization interview problem" },
            { concept: "Trees (BST / Trie)", build: "Prefix/vocabulary search over an embedding index", whyItMatters: "Tests structure choice under a retrieval-latency constraint" },
            { concept: "Graphs (BFS/DFS)", build: "Dependency resolution for a multi-step agent workflow", whyItMatters: "Core to the agent-orchestration applied-domain interview" },
            { concept: "Graphs (weighted)", build: "Cost-aware router across multiple model endpoints", whyItMatters: "Maps directly to the 'cost' stage of the live system design defense" },
            { concept: "Dynamic Programming", build: "Token-budget / context-window allocator", whyItMatters: "Tests optimization reasoning under a real LLM constraint" },
            { concept: "Arrays / Sliding Window", build: "Streaming-token rate limiter for API calls", whyItMatters: "Reused directly inside the capstone's serving layer" }
        ]
    },
    "mobile-development": {
        title: "Mobile Development (Android/iOS)",
        slug: "mobile-development",
        tier: "A",
        duration: "8–10 weeks",
        funnelDescription: "DSA/algorithmic screen → live coding of a platform-specific feature under real constraints (pagination, offline handling — not toy problems) → past-project walkthrough → release/collaboration discussion. India-specific: low-end-device performance and offline-first design are explicit differentiators.",
        drillThread: "DSA thread moderate-to-heavy (product-company bar is real; 10+ LPA freshers still gated on medium LeetCode). Emphasis on queue, two-pointer, and graph (dependency resolution) patterns over deep DP.",
        prerequisites: "One object-oriented language. Basic API consumption.",
        defenseFocus: "State management choice and what it costs. What happens on a cold start with stale data. Behaviour on a slow device and a bad network. What they'd measure before a release.",
        weighting: "Implementation quality ×1.5, design trade-offs ×1.25.",
        spine: [
            {
                phase: "Weeks 1–2",
                checkpoint: "Solo Project 1",
                funnelStage: "Live-coding screen",
                brief: "Build a specified three-screen application against supplied designs and an API contract, including navigation, list virtualisation and error states.",
                defense: "Defend pagination strategy and memory/performance trade-offs.",
                effortHours: 20
            },
            {
                phase: "Weeks 3–4",
                checkpoint: "Solo Project 2",
                funnelStage: "Platform-constraint round",
                brief: "The app must work offline and reconcile when connectivity returns. Conflict handling is the student's call, and they must justify what the user sees during a conflict.",
                defense: "Defense + extraction round on the queue/graph pattern they used.",
                effortHours: 32
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Pair Project",
                funnelStage: "Platform feature under real constraints",
                brief: "One student owns the data and sync layer, the other owns the interface, integrating across a contract they negotiate. The interface owner must also profile and fix a performance problem in the other's layer.",
                defense: "Live walkthrough narrating a specific design decision — the state/lifecycle signal.",
                effortHours: 40
            },
            {
                phase: "Weeks 8–10",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed application built to release standard: signed build, permissions handled, store metadata prepared, installed on a physical device for the defense.",
                defense: "PAT defense in past-project walkthrough format, plus a simulated release/collaboration round.",
                effortHours: 58
            }
        ],
        miniProjects: [
            { concept: "Arrays / Two-Pointer", build: "Feed pagination engine with a cursor-based scroll handler", whyItMatters: "Directly reused from the Solo 1 project" },
            { concept: "Queue", build: "Offline action queue that syncs when connectivity returns", whyItMatters: "Core to the offline-first India-market signal" },
            { concept: "Hashing", build: "Local cache layer for repeated API responses", whyItMatters: "Standard mobile-performance interview problem" },
            { concept: "Linked List + Hashmap", build: "LRU image/data cache", whyItMatters: "Classic mobile-memory-constraint question" },
            { concept: "Trees", build: "Nested-menu / navigation-state structure", whyItMatters: "Tests state-management design under questioning" },
            { concept: "Graphs (BFS/DFS)", build: "Dependency resolver for offline-sync conflict handling", whyItMatters: "Reused directly from the Solo 2 project" },
            { concept: "Heaps", build: "Priority-ordered notification queue", whyItMatters: "Common platform-feature live-coding variant" }
        ]
    },
    "devops-cloud": {
        title: "DevOps & Cloud",
        slug: "devops-cloud",
        tier: "B",
        duration: "5–6 weeks",
        funnelDescription: "Recruiter screen → live troubleshooting/scenario round (CI/CD failure at 2am, partial Terraform apply, rollback) → IaC and Kubernetes operational fluency → architecture/cost discussion. 'Interviewers prioritize practical troubleshooting scenarios over definitions.' Freshers succeed via a home-lab portfolio: CI/CD + Dockerized app + basic K8s deployment, publicly on GitHub.",
        drillThread: "Light — arrays/graphs/strings basics only, no deep DP. Time budget goes to IaC/troubleshooting reps instead of algorithmic drilling.",
        prerequisites: "Linux command line. One scripting language. Basic networking.",
        defenseFocus: "What the last incident taught them. What is not automated and why. Cost per environment. What they'd page a human for.",
        weighting: "Failure analysis ×1.5, design trade-offs ×1.25.",
        spine: [
            {
                phase: "Week 1",
                checkpoint: "Solo Project 1",
                funnelStage: "Home-lab baseline (non-negotiable deliverable)",
                brief: "Containerise a supplied application and ship a CI pipeline meeting a written checklist.",
                defense: "Defend pipeline design and failure scenario handled.",
                effortHours: 18
            },
            {
                phase: "Weeks 2–3",
                checkpoint: "Solo Project 2",
                funnelStage: "IaC/K8s operational fluency",
                brief: "Take a working deployment and make it survive a node failure. Constraint: a stated monthly budget.",
                defense: "Defense + extraction round on troubleshooting-pattern drills.",
                effortHours: 26
            },
            {
                phase: "Week 4",
                checkpoint: "Pair Project — 'Break It Live'",
                funnelStage: "Live troubleshooting/scenario round",
                brief: "One student owns infrastructure-as-code, the other owns observability. Then each injects a failure into the other's half and the pair must diagnose it live.",
                defense: "Diagnose and fix live, narrating out loud step by step — mirrors the actual interview format.",
                effortHours: 34
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed deployment platform with documented runbooks and a rehearsed failure drill.",
                defense: "PAT defense staged as a live incident, followed by an architecture review.",
                effortHours: 47
            }
        ],
        miniProjects: [
            { concept: "Arrays / Hashing", build: "Environment-variable / config resolver with override precedence", whyItMatters: "Mirrors real config-management logic asked about in troubleshooting rounds" },
            { concept: "Queue", build: "Job/task scheduler for a CI pipeline", whyItMatters: "Direct analog to how CI systems queue and process builds" },
            { concept: "Graphs (DAG)", build: "Pipeline dependency resolver (build-order calculator)", whyItMatters: "Mirrors how Terraform/CI systems compute execution graphs" }
        ]
    },
    "data-engineering": {
        title: "Data Engineering",
        slug: "data-engineering",
        tier: "B",
        duration: "5–6 weeks",
        funnelDescription: "Recruiter screen → SQL round (window functions, anti-joins, conditional aggregation) → Python → data modeling → ETL/pipeline system design (increasingly: pipelines ingesting LLM-parsed unstructured data with retries/rate limits/cost budgets) → behavioral round on ownership/incident handling.",
        drillThread: "Light-to-moderate, trending down further in the market — heavy SQL pattern drilling (window functions, joins, query optimization) replaces classic DSA as the actual daily-practice thread.",
        prerequisites: "SQL. Python. Full Stack Solo 1 equivalent, or comparable service experience.",
        defenseFocus: "What happens when yesterday's data changes. How they'd detect silent corruption. What the pipeline costs to re-run.",
        weighting: "Problem framing ×1.25, failure analysis ×1.5, implementation quality ×1.25.",
        spine: [
            {
                phase: "Week 1",
                checkpoint: "Solo Project 1",
                funnelStage: "SQL round",
                brief: "Build a batch pipeline to a specified schema with defined data quality checks.",
                defense: "Defend schema choices and normalization/denormalization trade-offs.",
                effortHours: 18
            },
            {
                phase: "Weeks 2–3",
                checkpoint: "Solo Project 2",
                funnelStage: "Data modeling / pipeline system design",
                brief: "Source data arrives late, duplicated and occasionally corrected after the fact. Design for it. Correctness under re-delivery is the grade.",
                defense: "Defense + extraction round on SQL pattern drills (window functions/joins).",
                effortHours: 28
            },
            {
                phase: "Week 4",
                checkpoint: "Pair Project",
                funnelStage: "ETL/pipeline system design (2026 differentiator)",
                brief: "One student owns ingestion and one owns the serving model, against a shared contract that must be versioned when it changes.",
                defense: "Live 'pipeline design' defense of boundary choices, failure handling, cost/compute budget.",
                effortHours: 34
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed pipeline with lineage, quality monitoring and a documented backfill procedure.",
                defense: "PAT defense run as a pipeline system design review, plus a behavioral round on ownership/incidents.",
                effortHours: 45
            }
        ],
        miniProjects: [
            { concept: "Hashing", build: "Deduplication layer for ingested records", whyItMatters: "Standard pipeline-hygiene question in data-modeling rounds" },
            { concept: "Heaps", build: "Streaming top-k / windowed-aggregation processor", whyItMatters: "Common in real-time pipeline system-design interviews" },
            { concept: "Sorting/Searching at Scale", build: "External-sort routine for a dataset too large for memory", whyItMatters: "Tests scale-awareness beyond in-memory sorting limitations" }
        ]
    },
    "data-science": {
        title: "Data Science & Analytics",
        slug: "data-science",
        tier: "B",
        duration: "5–6 weeks",
        funnelDescription: "HR screen → SQL technical round → Python/Pandas + Excel/Power BI round → case study/take-home (dataset in, business report out: executive summary, key findings, top recommendations, presented to a non-technical panel) → HR. Consulting firms weight the business-case round heaviest; product companies weight SQL/live analysis heaviest.",
        drillThread: "Light-to-moderate — DSA is a screening filter, not the core bar. Drill thread is stats/SQL pattern practice, not algorithmic pattern practice.",
        prerequisites: "Statistics. Python or R. SQL.",
        defenseFocus: "What would change their conclusion. What they chose not to measure. How they'd explain the uncertainty to someone who will act on it.",
        weighting: "Problem framing ×1.5, defense under questioning ×1.5, failure analysis ×1.25.",
        spine: [
            {
                phase: "Week 1",
                checkpoint: "Solo Project 1",
                funnelStage: "SQL technical round",
                brief: "Answer three specified questions from a supplied dataset. Every claim must carry an uncertainty statement.",
                defense: "Defend query choices and one major design decision.",
                effortHours: 16
            },
            {
                phase: "Weeks 2–3",
                checkpoint: "Solo Project 2",
                funnelStage: "Python/Pandas + statistics round",
                brief: "A business question with no stated analysis and a confounder in the data. Identify what can and cannot be concluded. Saying \"this data can't answer that\" is a passing answer.",
                defense: "Defense + extraction round on stats/SQL pattern drills.",
                effortHours: 28
            },
            {
                phase: "Week 4",
                checkpoint: "Pair Project",
                funnelStage: "Case study round",
                brief: "One student runs the analysis, the other independently attempts to break it. They present a joint finding with the challenges included, not resolved away.",
                defense: "Live presentation to a mock non-technical panel — narrative and recommendation quality graded as heavily as code.",
                effortHours: 34
            },
            {
                phase: "Weeks 5–6",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed analysis delivered as both a technical write-up and a ten-minute non-technical briefing. Both are assessed.",
                defense: "PAT defense run as an executive-level presentation.",
                effortHours: 47
            }
        ],
        miniProjects: [
            { concept: "Arrays / Hashing", build: "Frequency / co-occurrence analysis utility over a raw dataset", whyItMatters: "Common lightweight coding-screen question at product companies' DS rounds" },
            { concept: "Heaps", build: "Top-k ranking utility for a recommendation-style analysis task", whyItMatters: "Occasional variant seen in SQL-adjacent tech screens" }
        ]
    },
    "cybersecurity": {
        title: "Cybersecurity",
        slug: "cybersecurity",
        tier: "C",
        duration: "4–5 weeks",
        funnelDescription: "Online aptitude/MCQ screen → scenario-based SOC triage questions (differentiate false positives from real threats, prioritize by severity) → SIEM tool proficiency (Splunk/QRadar) → group discussion/HR. Practical, tool-based fluency and MITRE ATT&CK mapping are explicitly valued over theoretical CIA-triad recitation.",
        drillThread: "No dedicated DSA Speed Layer. The equivalent drill thread is repeated, escalating SOC-shift simulations — the mechanic already proven at specialist SOC training providers.",
        prerequisites: "Networking. Linux. One scripting language.",
        defenseFocus: "Risk ranking and why. What they'd tell a business owner who can only fix one thing. What they chose not to test and why that was defensible.",
        weighting: "Failure analysis ×1.5, problem framing ×1.25, defense under questioning ×1.25.",
        spine: [
            {
                phase: "Week 1",
                checkpoint: "Solo Project 1 — SOC Shift 1",
                funnelStage: "SOC triage screen",
                brief: "Assess a supplied vulnerable application against a specified checklist and write findings to a given report template. (First simulated SOC shift: a small alert queue).",
                defense: "Written incident log review, mentor probes prioritization logic.",
                effortHours: 14
            },
            {
                phase: "Week 2",
                checkpoint: "Solo Project 2 — SIEM Build",
                funnelStage: "SIEM tool proficiency round",
                brief: "A target with no checklist. Prioritise findings by real risk to a stated business, not by CVSS alone, and justify the ordering. (A SIEM tuning/detection-rule project).",
                defense: "Defense + extraction: explain a specific rule's false-positive/false-negative trade-off.",
                effortHours: 22
            },
            {
                phase: "Week 3",
                checkpoint: "Pair Project — Joint Incident Response",
                funnelStage: "Full SOC triage under pressure",
                brief: "One student hardens a system, the other assesses it, then they swap and both report. Each must defend a decision the other made. (A live, mentor-run shift).",
                defense: "Joint ticketing-format incident review; graded on escalation decisions.",
                effortHours: 26
            },
            {
                phase: "Weeks 4–5",
                checkpoint: "Capstone — Final Shift",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed security review of a system they built in another stream or with permission, delivered as a full report with remediation guidance. (A full, time-boxed SOC shift).",
                defense: "PAT defense: written incident report review plus live triage-decision Q&A.",
                effortHours: 33
            }
        ],
        miniProjects: [
            { concept: "Initial Access / Phishing", build: "Simulated phishing-alert triage queue", whyItMatters: "Most common L1 SOC alert category by volume" },
            { concept: "Execution / Malware", build: "Endpoint malware-alert investigation exercise", whyItMatters: "Core SIEM/EDR triage skill tested in live rounds" },
            { concept: "Privilege Escalation / Lateral Movement", build: "Network-intrusion triage simulation", whyItMatters: "Tests escalation judgment, the top-cited SOC interview gap" },
            { concept: "Credential Access", build: "Credential-compromise investigation", whyItMatters: "Frequent real-world and interview scenario category" },
            { concept: "Defense Evasion / Cloud Misconfiguration", build: "Cloud/SaaS misconfiguration audit", whyItMatters: "Growing category as SOC roles absorb cloud-sec tasks" },
            { concept: "Exfiltration / Impact", build: "Data-exfiltration incident response drill", whyItMatters: "Highest-severity category; tests full triage-to-escalation pipeline" }
        ]
    },
    "iot-embedded": {
        title: "IoT & Embedded Systems",
        slug: "iot-embedded",
        tier: "C",
        duration: "4–5 weeks",
        funnelDescription: "Heavy weighting on documented real-hardware projects (2–3 minimum) over coursework; protocol fluency (UART/SPI/I2C/BLE/MQTT); hands-on debugging with oscilloscope/logic analyzer/JTAG. Even Google-tier interviews run ~50% standard DSA/C and ~50% low-level firmware/kernel questions. India's widest documented gap: curricula taught through textbooks and simulations, not real hardware.",
        drillThread: "Light — C fundamentals and data-structures-for-constrained-systems only, folded into hardware work itself. No standalone LeetCode-style drilling; classic algorithmic rounds are rare in this stream.",
        prerequisites: "C or C++ basics. Basic electronics. Hardware kit required — confirm the kit list and who pays for it before this stream opens.",
        defenseFocus: "Power budget. Behaviour when the network is gone for a day. What fails first in the field and how they'd know.",
        weighting: "Failure analysis ×1.5, implementation quality ×1.25.",
        spine: [
            {
                phase: "Week 1",
                checkpoint: "Solo Project 1",
                funnelStage: "Protocol/hardware fundamentals",
                brief: "Read a specified sensor and publish readings to a given endpoint at a defined interval. (First real-hardware project on ESP32/STM32, with a debug log produced using a real logic analyzer).",
                defense: "Walk through the debug log; justify protocol and memory-layout choices.",
                effortHours: 14
            },
            {
                phase: "Week 2",
                checkpoint: "Solo Project 2",
                funnelStage: "Firmware/driver round",
                brief: "The device must survive intermittent power and network loss without losing readings. Storage and retry strategy are the student's. (A second hardware project with a custom driver/ISR component).",
                defense: "Defense: explain the driver structure and a constraint-driven trade-off.",
                effortHours: 22
            },
            {
                phase: "Week 3",
                checkpoint: "Pair Project",
                funnelStage: "Protocol fluency round",
                brief: "One student owns firmware, the other owns the gateway and ingestion, meeting at a protocol they define together.",
                defense: "Live debug defense with hardware in hand — mirrors the oscilloscope/logic-analyzer part of the interview.",
                effortHours: 26
            },
            {
                phase: "Weeks 4–5",
                checkpoint: "Capstone",
                funnelStage: "Full funnel, end to end",
                brief: "Student-proposed device and service, demonstrated live on hardware during the defense.",
                defense: "PAT defense with hardware project in hand, plus a light C/DSA round (representing the ~50/50 interview split).",
                effortHours: 33
            }
        ],
        miniProjects: [
            { concept: "UART / Serial", build: "Sensor-to-serial data logger on real hardware", whyItMatters: "Foundational protocol named directly in the funnel" },
            { concept: "SPI / I2C", build: "Multi-sensor peripheral driver project", whyItMatters: "Standard firmware-round protocol-fluency check" },
            { concept: "BLE", build: "Bluetooth Low-Energy pairing and data-transfer project", whyItMatters: "Named explicitly in the pair-project funnel stage" },
            { concept: "MQTT / Networking", build: "Device-to-cloud telemetry publisher", whyItMatters: "Core IoT connectivity pattern, common interview scenario" },
            { concept: "RTOS", build: "Multi-task real-time scheduling project", whyItMatters: "Differentiator for roles beyond bare-metal firmware" },
            { concept: "Debug Tooling / Low-Power", build: "Power-profiling and logic-analyzer debug exercise", whyItMatters: "Directly mirrors the oscilloscope/logic-analyzer interview reality" }
        ]
    }
};
