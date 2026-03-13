export const projectsData: Record<string, any[]> = {
    "full-stack-development": [
        {
            "name": "Interactive Habit & Productivity SPA",
            "tagline": "Interactive Habit & Productivity SPA",
            "description": "Tracker for daily habits, Pomodoro timer with stats, mood journaling overlay. Heavy use of local storage/IndexedDB for offline capabilities, later syncing to a lightweight Express backend. Gamification with streaks and badges.",
            "difficulty": 3,
            "coreFeatures": [
                "Tracker for daily habits",
                "Pomodoro timer with stats",
                "mood journaling overlay. Heavy use of local storage/IndexedDB for offline capabilities",
                "later syncing to a lightweight Express backend. Gamification with streaks and badges."
            ],
            "startupAngle": "Junior Fullstack capability with strong frontend logic, local persistence, and API integration.",
            "conceptsCovered": {
                "tech": "React 18, Tailwind, Context API, Node.js + Express, MongoDB.",
                "architecture": ""
            }
        },
        {
            "name": "Real-Time Event Ticketing API & Dashboard",
            "tagline": "Real-Time Event Ticketing API & Dashboard",
            "description": "Seat map rendering, concurrent booking locks (Redis), QR code ticket generation, PDF rendering. Stripe test mode integration. Admin dashboard for event organizers to track sales velocity.",
            "difficulty": 4,
            "coreFeatures": [
                "Seat map rendering",
                "concurrent booking locks (Redis)",
                "QR code ticket generation",
                "PDF rendering. Stripe test mode integration. Admin dashboard for event organizers to track sales velocity."
            ],
            "startupAngle": "Mid-Level Fullstack. Complex database transactions, concurrency handling, and secure payments.",
            "conceptsCovered": {
                "tech": "Next.js (App Router), Node.js, PostgreSQL (Prisma), Redis (for locking), JWT Auth, Stripe API.",
                "architecture": ""
            }
        },
        {
            "name": "Collaborative Flowchart & Architecture Engine",
            "tagline": "Collaborative Flowchart & Architecture Engine",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior Fullstack. WebSockets, Canvas manipulation, and OT/CRDTs.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: WebSocket sync engine, Redis pub/sub, Conflict Free Replicated Data Types (CRDTs) implementation using Yjs. | Student B: HTML5 Canvas/React Flow UI, drag-and-drop components, export to PNG/SVG, UI polish."
            }
        },
        {
            "name": "B2B CRM & Pipeline Management SaaS",
            "tagline": "B2B CRM & Pipeline Management SaaS",
            "description": "Multi-tenant CRM for SMBs. Customizable sales pipelines, email integrations (IMAP/SMTP), lead scoring, role-based access.",
            "difficulty": 5,
            "coreFeatures": [
                "Multi-tenant CRM for SMBs",
                "Customizable sales pipelines, email integrations (IMAP/SMTP), lead scoring, role-based access."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Multi-Tenant Booking Engine (Calendly Clone)",
            "tagline": "Multi-Tenant Booking Engine (Calendly Clone)",
            "description": "Complex timezone algebra, Google/Outlook Calendar bidirectional sync, automated reminders, individual and team round-robin routing.",
            "difficulty": 5,
            "coreFeatures": [
                "Complex timezone algebra, Google/Outlook Calendar bidirectional sync, automated reminders, individual and team round-robin routing."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Headless E-Learning CMS",
            "tagline": "Headless E-Learning CMS",
            "description": "A headless backend delivering structured course content via GraphQL to a customizable frontend storefront template. Includes Video streaming (HLS) and quiz engines.",
            "difficulty": 5,
            "coreFeatures": [
                "A headless backend delivering structured course content via GraphQL to a customizable frontend storefront template",
                "Includes Video streaming (HLS) and quiz engines."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "ai-ml": [
        {
            "name": "Customer Lifetime Value (CLV) & Churn Predictor",
            "tagline": "Customer Lifetime Value (CLV) & Churn Predictor",
            "description": "Cohort analysis, RFM modeling, survival analysis, and XGBoost/LightGBM prediction. Deployed as a Streamlit app where marketing teams can upload CSVs and get risk dashboards.",
            "difficulty": 3,
            "coreFeatures": [
                "Cohort analysis",
                "RFM modeling",
                "survival analysis",
                "and XGBoost/LightGBM prediction. Deployed as a Streamlit app where marketing teams can upload CSVs and get risk dashboards."
            ],
            "startupAngle": "Junior ML Engineer. End-to-end tabular data handling.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Voice & Audio Emotion Recognition",
            "tagline": "Voice & Audio Emotion Recognition",
            "description": "Converting audio to Mel-spectrograms, training a CNN/ResNet, real-time microphone inference in browser. Handing noisy data and varied accents.",
            "difficulty": 4,
            "coreFeatures": [
                "Converting audio to Mel-spectrograms",
                "training a CNN/ResNet",
                "real-time microphone inference in browser. Handing noisy data and varied accents."
            ],
            "startupAngle": "Mid-Level ML. Working with unstructured data (audio) and deep learning.",
            "conceptsCovered": {
                "tech": "Librosa, PyTorch, FastAPI, React/Gradio.",
                "architecture": ""
            }
        },
        {
            "name": "Enterprise RAG (Retrieval-Augmented Generation) System",
            "tagline": "Enterprise RAG (Retrieval-Augmented Generation) System",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior ML. LLMs, Vector DBs, and advanced search.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Document chunking, embedding generation (OpenAI/SentenceTransformers), Vector Database (Pinecone/Milvus) indexing. | Student B: LLM orchestration (LangChain), citation/grounding logic, chat UI, evaluation metrics (RAGAS)."
            }
        },
        {
            "name": "AI-Powered Legal Contract Analyzer",
            "tagline": "AI-Powered Legal Contract Analyzer",
            "description": "NER for clause extraction, risk highlighting using LLMs, anomaly detection in contract terms compared to company standards.",
            "difficulty": 5,
            "coreFeatures": [
                "NER for clause extraction, risk highlighting using LLMs, anomaly detection in contract terms compared to company standards."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Algorithmic Trading & Signal Generator",
            "tagline": "Algorithmic Trading & Signal Generator",
            "description": "Reinforcement learning for portfolio balancing, sentiment analysis on financial news feeds, historical backtesting engine.",
            "difficulty": 5,
            "coreFeatures": [
                "Reinforcement learning for portfolio balancing, sentiment analysis on financial news feeds, historical backtesting engine."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Multi-Modal Personal Shopper",
            "tagline": "Multi-Modal Personal Shopper",
            "description": "Visual search (upload image to find similar items), conversational AI for style advice, integrating vision and NLP transformers.",
            "difficulty": 5,
            "coreFeatures": [
                "Visual search (upload image to find similar items), conversational AI for style advice, integrating vision and NLP transformers."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "cybersecurity": [
        {
            "name": "Automated Cloud Security Posture Scanner",
            "tagline": "Automated Cloud Security Posture Scanner",
            "description": "Connects to AWS/GCP via read-only roles. Checks for public S3 buckets, open security groups, lack of MFA. Generates compliance reports (CIS Foundations).",
            "difficulty": 3,
            "coreFeatures": [
                "Connects to AWS/GCP via read-only roles. Checks for public S3 buckets",
                "open security groups",
                "lack of MFA. Generates compliance reports (CIS Foundations)."
            ],
            "startupAngle": "Junior Security Engineer. API interaction, IAM policies, and cloud fundamentals.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Custom Malware Sandbox Environment",
            "tagline": "Custom Malware Sandbox Environment",
            "description": "Python-based hypervisor interaction (QEMU/VirtualBox). Monitors registry changes, file drops, and network PCAP generation. Automated behavioral report output.",
            "difficulty": 4,
            "coreFeatures": [
                "Python-based hypervisor interaction (QEMU/VirtualBox). Monitors registry changes",
                "file drops",
                "and network PCAP generation. Automated behavioral report output."
            ],
            "startupAngle": "Mid-Level Security/Analyst. Safe execution, API hooking, and forensics.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Active Defense Honeypot Network",
            "tagline": "Active Defense Honeypot Network",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior SOC/Blue Team. Deception tech and threat intel.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Builds high-interaction honeypots simulating vulnerable SSH/Redis/Web servers. | Student B: ELK stack integration, attack visualization, automated IP blacklisting (updating firewalls via API)."
            }
        },
        {
            "name": "Zero-Trust Identity Proxy",
            "tagline": "Zero-Trust Identity Proxy",
            "description": "Custom IAP (Identity-Aware Proxy). Authenticates every request via IdP (Okta/Auth0), checks device posture, encrypts traffic before forwarding to internal apps.",
            "difficulty": 5,
            "coreFeatures": [
                "Custom IAP (Identity-Aware Proxy)",
                "Authenticates every request via IdP (Okta/Auth0), checks device posture, encrypts traffic before forwarding to internal apps."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Automated Red Teaming SaaS",
            "tagline": "Automated Red Teaming SaaS",
            "description": "Platform that provisions ephemeral Kali instances, orchestrates attack chains (recon -> exploit -> pivot) against a defined scope, and logs all actions via BloodHound.",
            "difficulty": 5,
            "coreFeatures": [
                "Platform that provisions ephemeral Kali instances, orchestrates attack chains (recon -> exploit -> pivot) against a defined scope, and logs all actions via BloodHound."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "DevSecOps Pipeline Enforcer",
            "tagline": "DevSecOps Pipeline Enforcer",
            "description": "Intercepts CI/CD jobs. Enforces SAST (Semgrep), DAST (ZAP), Secrets scanning (TruffleHog), and container signing before allowing kubernetes deployment.",
            "difficulty": 5,
            "coreFeatures": [
                "Intercepts CI/CD jobs",
                "Enforces SAST (Semgrep), DAST (ZAP), Secrets scanning (TruffleHog), and container signing before allowing kubernetes deployment."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "data-engineering": [
        {
            "name": "Serverless Event Streaming Pipeline",
            "tagline": "Serverless Event Streaming Pipeline",
            "description": "API Gateway receiving events -> AWS Lambda/Kinesis -> S3 (Data Lake) -> Athena querying. Handles schema validation and partitioning by date.",
            "difficulty": 3,
            "coreFeatures": [
                "API Gateway receiving events -> AWS Lambda/Kinesis -> S3 (Data Lake) -> Athena querying. Handles schema validation and partitioning by date."
            ],
            "startupAngle": "Junior Data Engineer. Cloud-native data handling.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "CDC-based Data Lakehouse with Delta Lake",
            "tagline": "CDC-based Data Lakehouse with Delta Lake",
            "description": "Debezium reading PostgreSQL WAL -> Kafka -> Spark Streaming -> Delta Lake. Implements ACID transactions on data lake, time travel queries.",
            "difficulty": 4,
            "coreFeatures": [
                "Debezium reading PostgreSQL WAL -> Kafka -> Spark Streaming -> Delta Lake. Implements ACID transactions on data lake",
                "time travel queries."
            ],
            "startupAngle": "Mid-Level DE. Change Data Capture and Lakehouse architecture.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Geospatial Real-Time Tracking Data Mart",
            "tagline": "Geospatial Real-Time Tracking Data Mart",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior DE. Geospatial indexing and streaming.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Ingestion of simulated IoT fleet coordinates, H3/S2 geospatial indexing, stream processing. | Student B: PostGIS warehouse modeling, materialized views, Grafana geographic heatmap visualization."
            }
        },
        {
            "name": "Unified Customer Data Platform (CDP)",
            "tagline": "Unified Customer Data Platform (CDP)",
            "description": "Ingests fragmented identities from Web, CRM, and Support tickets. Deterministic/Probabilistic identity resolution graph. Feeds clean profiles to marketing APIs.",
            "difficulty": 5,
            "coreFeatures": [
                "Ingests fragmented identities from Web, CRM, and Support tickets",
                "Deterministic/Probabilistic identity resolution graph",
                "Feeds clean profiles to marketing APIs."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Algorithmic Trading Data Ingestion Engine",
            "tagline": "Algorithmic Trading Data Ingestion Engine",
            "description": "High-frequency, ultra-low latency ingestion of FIX protocols/WebSocket financial feeds. Windowed aggregations, order-book reconstruction.",
            "difficulty": 5,
            "coreFeatures": [
                "High-frequency, ultra-low latency ingestion of FIX protocols/WebSocket financial feeds",
                "Windowed aggregations, order-book reconstruction."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Automated Data Governance & Lineage SaaS",
            "tagline": "Automated Data Governance & Lineage SaaS",
            "description": "Scans warehouse schemas (Snowflake/BigQuery), parses SQL logs to generate visual DAGs of data lineage. PII detection and automated masking policies.",
            "difficulty": 5,
            "coreFeatures": [
                "Scans warehouse schemas (Snowflake/BigQuery), parses SQL logs to generate visual DAGs of data lineage",
                "PII detection and automated masking policies."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "devops-cloud": [
        {
            "name": "Immutable Infrastructure via Packer & Terraform",
            "tagline": "Immutable Infrastructure via Packer & Terraform",
            "description": "Packer builds hardened AMIs with Ansible. Terraform provisions Auto Scaling Groups and ALBs using those AMIs. Zero-downtime rolling updates.",
            "difficulty": 3,
            "coreFeatures": [
                "Packer builds hardened AMIs with Ansible. Terraform provisions Auto Scaling Groups and ALBs using those AMIs. Zero-downtime rolling updates."
            ],
            "startupAngle": "Junior DevOps. Infrastructure as Code and image baking.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Multi-Region Serverless Deployment",
            "tagline": "Multi-Region Serverless Deployment",
            "description": "Global API Gateway, Lambda@Edge, DynamoDB Global Tables. Route53 latency-based routing. Complete infrastructure defined in Serverless Framework or AWS SAM.",
            "difficulty": 4,
            "coreFeatures": [
                "Global API Gateway",
                "Lambda@Edge",
                "DynamoDB Global Tables. Route53 latency-based routing. Complete infrastructure defined in Serverless Framework or AWS SAM."
            ],
            "startupAngle": "Mid-Level DevOps. Serverless scalability and global routing.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "FinOps & Cost Visibility Dashboard",
            "tagline": "FinOps & Cost Visibility Dashboard",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior DevOps/Cloud Architect. K8s internals and cost optimization.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Extracts metrics from Prometheus/Kube-state-metrics, maps pod resource usage to AWS/GCP billing APIs. | Student B: Aggregation pipeline, attribution logic (mapping namespaces to teams), recommendation engine for right-sizing."
            }
        },
        {
            "name": "Enterprise Secret Management & PKI Platform",
            "tagline": "Enterprise Secret Management & PKI Platform",
            "description": "Custom UI over HashiCorp Vault. Manages dynamic database credentials, internal TLS certificate authority, automated cert rotation for VMs.",
            "difficulty": 5,
            "coreFeatures": [
                "Custom UI over HashiCorp Vault",
                "Manages dynamic database credentials, internal TLS certificate authority, automated cert rotation for VMs."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "No-Code Kubernetes Vending Machine",
            "tagline": "No-Code Kubernetes Vending Machine",
            "description": "Internal portal where developers fill a form, and the platform provisions an isolated K8s namespace, repo, CI/CD pipeline, and observability stack via Crossplane/Terraform.",
            "difficulty": 5,
            "coreFeatures": [
                "Internal portal where developers fill a form, and the platform provisions an isolated K8s namespace, repo, CI/CD pipeline, and observability stack via Crossplane/Terraform."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Edge Computing Fleet Orchestrator",
            "tagline": "Edge Computing Fleet Orchestrator",
            "description": "Manages deployments to thousands of Raspberry Pis/Edge devices. Handles offline-sync, progressive rollouts (canary edge), and remote telemetry collection.",
            "difficulty": 5,
            "coreFeatures": [
                "Manages deployments to thousands of Raspberry Pis/Edge devices",
                "Handles offline-sync, progressive rollouts (canary edge), and remote telemetry collection."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "mobile-development": [
        {
            "name": "Offline-First Travel Itinerary App",
            "tagline": "Offline-First Travel Itinerary App",
            "description": "Draggable timeline of activities. Integrates Google Maps/Mapbox for route visualization. Works 100% offline using WatermelonDB/SQLite, syncing when online.",
            "difficulty": 3,
            "coreFeatures": [
                "Draggable timeline of activities. Integrates Google Maps/Mapbox for route visualization. Works 100% offline using WatermelonDB/SQLite",
                "syncing when online."
            ],
            "startupAngle": "Junior Mobile. Local DBs, complex UI, Maps.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "AR-Powered Interior Design App",
            "tagline": "AR-Powered Interior Design App",
            "description": "Uses device camera and LIDAR (if available) to detect planes. Places 3D furniture models. Calculates room measurements. React Native Vision Camera / AR framework.",
            "difficulty": 4,
            "coreFeatures": [
                "Uses device camera and LIDAR (if available) to detect planes. Places 3D furniture models. Calculates room measurements. React Native Vision Camera / AR framework."
            ],
            "startupAngle": "Mid-Level Mobile. ARKit/ARCore and 3D rendering.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "P2P Encrypted Secure Messenger",
            "tagline": "P2P Encrypted Secure Messenger",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior Mobile. Cryptography, WebSockets, background sync.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Signal Protocol implementation (Double Ratchet), key generation, secure enclave storage. | Student B: Chat UI, Push Notification decryption in background tasks, media attachment handling."
            }
        },
        {
            "name": "Telemedicine Consultation & Vitals App",
            "tagline": "Telemedicine Consultation & Vitals App",
            "description": "HIPAA-compliant WebRTC video calls, integration with Bluetooth health devices (BP monitors), secure prescription vault.",
            "difficulty": 5,
            "coreFeatures": [
                "HIPAA-compliant WebRTC video calls, integration with Bluetooth health devices (BP monitors), secure prescription vault."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Gig Economy On-Demand Tutor Marketplace",
            "tagline": "Gig Economy On-Demand Tutor Marketplace",
            "description": "Geolocation matching, dual UI (student/tutor mode), integrated whiteboard during calls, Stripe Connect for split payouts.",
            "difficulty": 5,
            "coreFeatures": [
                "Geolocation matching, dual UI (student/tutor mode), integrated whiteboard during calls, Stripe Connect for split payouts."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Audio-First Social/Podcast App",
            "tagline": "Audio-First Social/Podcast App",
            "description": "Audio streaming, background playback controls, live drop-in audio rooms (like Clubhouse) using Agora/LiveKit, audio trim/edit UI.",
            "difficulty": 5,
            "coreFeatures": [
                "Audio streaming, background playback controls, live drop-in audio rooms (like Clubhouse) using Agora/LiveKit, audio trim/edit UI."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "iot-embedded": [
        {
            "name": "Smart Grid Power Analyzer",
            "tagline": "Smart Grid Power Analyzer",
            "description": "Interfaces with current transformers (CT sensors). Samples AC waveform to calculate RMS voltage, current, real/apparent power, and power factor. Displays on OLED.",
            "difficulty": 3,
            "coreFeatures": [
                "Interfaces with current transformers (CT sensors). Samples AC waveform to calculate RMS voltage",
                "current",
                "real/apparent power",
                "and power factor. Displays on OLED."
            ],
            "startupAngle": "Junior Embedded. AC circuitry, real-time interrupts.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "BLE Mesh Network for Asset Tracking",
            "tagline": "BLE Mesh Network for Asset Tracking",
            "description": "Multiple ESP32/nRF52 nodes communicating via Bluetooth Mesh. One gateway node relays data to Wi-Fi. Tracks signal strength (RSSI) to estimate asset location.",
            "difficulty": 4,
            "coreFeatures": [
                "Multiple ESP32/nRF52 nodes communicating via Bluetooth Mesh. One gateway node relays data to Wi-Fi. Tracks signal strength (RSSI) to estimate asset location."
            ],
            "startupAngle": "Mid-Level Embedded. Protocol stacks and low-power.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Edge AI Drone/Robotics Controller",
            "tagline": "Edge AI Drone/Robotics Controller",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior Embedded. Real-time OS (RTOS), robotics, vision.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: FreeRTOS motor control, PID tuning, IMU sensor fusion. | Student B: ESP32-CAM or Raspberry Pi Pico running TinyML for basic object avoidance / line following."
            }
        },
        {
            "name": "Cold Chain Logistics Tracker",
            "tagline": "Cold Chain Logistics Tracker",
            "description": "Monitors temperature, humidity, and shock. Uses NB-IoT/LTE-M for cellular uplink. Deep sleep optimization to last 6 months on battery. GPS tracking.",
            "difficulty": 5,
            "coreFeatures": [
                "Monitors temperature, humidity, and shock",
                "Uses NB-IoT/LTE-M for cellular uplink",
                "Deep sleep optimization to last 6 months on battery"
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Remote ECU Diagnostics (Automotive IoT)",
            "tagline": "Remote ECU Diagnostics (Automotive IoT)",
            "description": "Plugs into OBD-II port via CAN bus transceiver. Decodes vehicle telemetry. Streams performance data and fault codes to cloud dashboard.",
            "difficulty": 5,
            "coreFeatures": [
                "Plugs into OBD-II port via CAN bus transceiver",
                "Decodes vehicle telemetry",
                "Streams performance data and fault codes to cloud dashboard."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Automated Hydroponics Controller",
            "tagline": "Automated Hydroponics Controller",
            "description": "Controls pH dosing pumps, nutrient mixers, and lighting schedules. Feedback loops based on EC (Electrical Conductivity) sensors. Remote management dashboard.",
            "difficulty": 5,
            "coreFeatures": [
                "Controls pH dosing pumps, nutrient mixers, and lighting schedules",
                "Feedback loops based on EC (Electrical Conductivity) sensors",
                "Remote management dashboard."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ],
    "data-science": [
        {
            "name": "E-Commerce Price Elasticity Analysis runs",
            "tagline": "E-Commerce Price Elasticity Analysis runs",
            "description": "Analyzes transaction data to estimate price elasticity of demand across categories. Identifies optimal price points. Presents findings in an interactive Tableau/PowerBI/Streamlit report.",
            "difficulty": 3,
            "coreFeatures": [
                "Analyzes transaction data to estimate price elasticity of demand across categories. Identifies optimal price points. Presents findings in an interactive Tableau/PowerBI/Streamlit report."
            ],
            "startupAngle": "Junior Data Analyst. Statistical rigor, business acumen.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Sports Analytics Player Performance Dashboard",
            "tagline": "Sports Analytics Player Performance Dashboard",
            "description": "Pulls data from sports APIs. Calculates advanced metrics (e.g., Expected Goals). Creates shot maps and heatmaps. Simulates match outcomes using Monte Carlo methods.",
            "difficulty": 4,
            "coreFeatures": [
                "Pulls data from sports APIs. Calculates advanced metrics (e.g.",
                "Expected Goals). Creates shot maps and heatmaps. Simulates match outcomes using Monte Carlo methods."
            ],
            "startupAngle": "Mid-Level DS. Spatial data, API integration.",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Algorithmic Trading Backtesting Engine",
            "tagline": "Algorithmic Trading Backtesting Engine",
            "description": "",
            "difficulty": 4,
            "coreFeatures": [],
            "startupAngle": "Senior Data Scientist. Time-series architecture, optimization.",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: High-performance vectorized backtesting engine, slippage/commission models, Sharpe/Sortino ratio calculations. | Student B: Statistical arbitrage strategy design, mean-reversion modeling, and performance reporting dashboard."
            }
        },
        {
            "name": "AI-Driven Real Estate Valuation Platform",
            "tagline": "AI-Driven Real Estate Valuation Platform",
            "description": "AVM (Automated Valuation Model) using property specs, geospatial POI data (distance to schools/transit), and macroeconomic indicators. Interactive map UI.",
            "difficulty": 5,
            "coreFeatures": [
                "AVM (Automated Valuation Model) using property specs, geospatial POI data (distance to schools/transit), and macroeconomic indicators",
                "Interactive map UI."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Retail Assortment & Shelf-Space Optimizer",
            "tagline": "Retail Assortment & Shelf-Space Optimizer",
            "description": "Uses association rule mining (Market Basket Analysis) and integer linear programming to recommend exactly which products to stock in which stores to maximize margin.",
            "difficulty": 5,
            "coreFeatures": [
                "Uses association rule mining (Market Basket Analysis) and integer linear programming to recommend exactly which products to stock in which stores to maximize margin."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        },
        {
            "name": "Climate Risk & ESG Scoring Engine",
            "tagline": "Climate Risk & ESG Scoring Engine",
            "description": "NLP processing of company 10-K reports combined with geospatial climate risk data (flood/fire APIs) to generate ESG scores for institutional investors.",
            "difficulty": 5,
            "coreFeatures": [
                "NLP processing of company 10-K reports combined with geospatial climate risk data (flood/fire APIs) to generate ESG scores for institutional investors."
            ],
            "startupAngle": "Capstone Project",
            "conceptsCovered": {
                "tech": "",
                "architecture": ""
            }
        }
    ]
};
