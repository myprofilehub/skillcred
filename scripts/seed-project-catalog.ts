import 'dotenv/config';
import { prisma } from '../lib/db';

const streams = [
    { slug: 'full-stack-development', title: 'Full Stack Development' },
    { slug: 'ai-ml', title: 'AI & Machine Learning' },
    { slug: 'cybersecurity', title: 'Cybersecurity' },
    { slug: 'data-engineering', title: 'Data Engineering' },
    { slug: 'devops-cloud', title: 'DevOps & Cloud' },
    { slug: 'mobile-development', title: 'Mobile Development' },
    { slug: 'iot-embedded', title: 'IoT & Embedded' },
    { slug: 'data-science', title: 'Data Science & Analytics' },
];

const projectsData: Record<string, any[]> = {
    "full-stack-development": [
        {
            "name": "Developer Portfolio &amp; Blog Engine",
            "tagline": "Developer Portfolio &amp; Blog Engine",
            "description": "Dynamic portfolio with project showcase (CRUD), integrated blog with markdown editor and syntax highlighting, contact form with email integration (SendGrid/Resend), tag-based filtering and search, dark/light theme with system preference detection, SEO meta tags and Open Graph",
            "difficulty": 3,
            "coreFeatures": [
                "Dynamic portfolio with project showcase (CRUD)",
                "integrated blog with markdown editor and syntax highlighting",
                "contact form with email integration (SendGrid/Resend)",
                "tag-based filtering and search",
                "dark/light theme with system preference detection",
                "SEO meta tags and Open Graph"
            ],
            "startupAngle": "Each student chooses unique design system, unique blog content, unique project showcase — no two portfolios look or feel alike",
            "conceptsCovered": {
                "tech": "React 18+ with hooks, React Router v6, Tailwind CSS or Styled Components, Markdown parser (react-markdown), REST API or headless CMS, Vercel/Netlify deployment",
                "architecture": "Component-based architecture with reusable UI library, custom hooks for data fetching and theme management, responsive design (mobile-first, tested at 3 breakpoints), lazy loading for images and route-based code splitting"
            }
        },
        {
            "name": "Fullstack Task Management API + Dashboard",
            "tagline": "Fullstack Task Management API + Dashboard",
            "description": "User registration/login with JWT (access + refresh tokens), task CRUD with projects, labels, priorities, due dates, drag-and-drop Kanban board view + list view + calendar view, real-time task status updates, file attachments per task (upload to S3/Cloudinary), activity log tracking all changes, search with debounced full-text search",
            "difficulty": 4,
            "coreFeatures": [
                "User registration/login with JWT (access + refresh tokens)",
                "task CRUD with projects",
                "labels",
                "priorities",
                "due dates",
                "drag-and-drop Kanban board view + list view + calendar view",
                "real-time task status updates",
                "file attachments per task (upload to S3/Cloudinary)",
                "activity log tracking all changes",
                "search with debounced full-text search"
            ],
            "startupAngle": "Each student designs their own schema variations (some add subtasks, some add time tracking, some add team features), unique UI/UX decisions, and different view implementations",
            "conceptsCovered": {
                "tech": "React + state management (Redux Toolkit or Zustand), Node.js + Express.js, MongoDB with Mongoose OR PostgreSQL with Prisma, JWT auth with HTTP-only cookies, Multer + S3/Cloudinary for file uploads, Swagger/OpenAPI documentation",
                "architecture": "RESTful API design with proper HTTP status codes and error responses, database schema with relationships (users → projects → tasks → comments), middleware chain: auth → validation → rate limiting → error handling, input sanitization (express-validator or Zod), API pagination (cursor-based preferred), environment-based config (dotenv)"
            }
        },
        {
            "name": "Real-Time Collaborative Document Editor",
            "tagline": "Real-Time Collaborative Document Editor",
            "description": "Rich text editor with formatting toolbar (bold, italic, headers, lists, code blocks), real-time collaborative editing with live cursors and presence indicators, room-based sessions with shareable invite links, document versioning with history and rollback, export to Markdown and PDF, typing indicators and user presence sidebar",
            "difficulty": 4,
            "coreFeatures": [
                "Rich text editor with formatting toolbar (bold",
                "italic",
                "headers",
                "lists",
                "code blocks)",
                "real-time collaborative editing with live cursors and presence indicators",
                "room-based sessions with shareable invite links",
                "document versioning with history and rollback",
                "export to Markdown and PDF",
                "typing indicators and user presence sidebar"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "React + Tiptap or Slate.js rich text editor, Node.js + Express + Socket.io, Redis for pub/sub and session state caching, MongoDB/PostgreSQL for document persistence, JWT auth with room-level permissions, Jest + Cypress for testing",
                "architecture": "WebSocket event architecture with proper namespacing, operational transform (OT) or CRDT-based conflict resolution strategy, Redis pub/sub for horizontal scalability, database-level document versioning (not just overwrite), graceful reconnection handling with state sync, rate limiting on WebSocket events"
            }
        },
        {
            "name": "SaaS Project Management Platform",
            "tagline": "SaaS Project Management Platform",
            "description": "Multi-tenant workspace with team invitations and role management (Admin/Manager/Member), project boards with Kanban, timeline (Gantt), and sprint views, task management with subtasks, dependencies, custom fields, and automations, real-time updates across all views via WebSockets, Stripe integration for subscription billing (free/pro/enterprise tiers), notification system (in-app + email digest), analytics dashboard (velocity, burndown, team workload), API with webhook support for third-party integrations",
            "difficulty": 5,
            "coreFeatures": [
                "Multi-tenant workspace with team invitations and role management (Admin/Manager/Member)",
                "project boards with Kanban",
                "timeline (Gantt)",
                "and sprint views",
                "task management with subtasks",
                "dependencies",
                "custom fields",
                "and automations",
                "real-time updates across all views via WebSockets",
                "Stripe integration for subscription billing (free/pro/enterprise tiers)",
                "notification system (in-app + email digest)",
                "analytics dashboard (velocity",
                "burndown",
                "team workload)",
                "API with webhook support for third-party integrations"
            ],
            "startupAngle": "Live demo with 3+ workspaces and realistic data, pricing page with tier comparison, onboarding flow for new teams, pitch deck: problem, solution, market size, competitive analysis, GTM strategy, team capabilities, financial projections",
            "conceptsCovered": {
                "tech": "React + TypeScript + Tailwind, Node.js + Express or NestJS, PostgreSQL with Prisma (multi-tenant schema), Redis for caching + real-time, Socket.io, Stripe SDK, Docker + Docker Compose, GitHub Actions CI/CD, Prometheus + Grafana monitoring",
                "architecture": "Multi-tenant database isolation (schema-per-tenant or row-level security), event-driven architecture for automations and notifications, background job processing (Bull/BullMQ with Redis), API rate limiting per tenant, comprehensive error tracking (Sentry), database migrations strategy, horizontal scaling considerations documented"
            }
        },
        {
            "name": "AI-Powered Learning Management System",
            "tagline": "AI-Powered Learning Management System",
            "description": "Course creation with rich content editor (video, text, quizzes, code exercises), AI-powered learning path recommendations based on student progress, adaptive quiz engine adjusting difficulty in real-time, student dashboard with progress tracking and analytics, instructor dashboard with cohort performance heatmaps, discussion forums with threaded conversations, certificate generation on course completion, payment gateway for course purchases",
            "difficulty": 5,
            "coreFeatures": [
                "Course creation with rich content editor (video",
                "text",
                "quizzes",
                "code exercises)",
                "AI-powered learning path recommendations based on student progress",
                "adaptive quiz engine adjusting difficulty in real-time",
                "student dashboard with progress tracking and analytics",
                "instructor dashboard with cohort performance heatmaps",
                "discussion forums with threaded conversations",
                "certificate generation on course completion",
                "payment gateway for course purchases"
            ],
            "startupAngle": "Demo with 2+ complete courses, working AI recommendations, payment flow, pitch deck with TAM/SAM analysis for India's EdTech market",
            "conceptsCovered": {
                "tech": "React + TypeScript, Node.js + NestJS, PostgreSQL, Redis, OpenAI/Claude API for AI features, Stripe/Razorpay, AWS S3 for media, Docker, GitHub Actions",
                "architecture": "Student A: Auth, user management, role system (student/instructor/admin) | Student B: Course builder, content management, media uploads, quiz engine | Student C: AI recommendation engine, adaptive difficulty, progress analytics | Student D: Payment integration, certificates, email notifications, discussion forums | Student E: DevOps (CI/CD, Docker, cloud deploy), monitoring, load testing, document"
            }
        },
        {
            "name": "Multi-Vendor E-Commerce Marketplace",
            "tagline": "Multi-Vendor E-Commerce Marketplace",
            "description": "Vendor onboarding with store setup and product management, buyer experience (search, filters, cart, wishlist, reviews), order management with status tracking and notifications, payment split system (buyer pays → platform takes commission → vendor receives), admin dashboard (vendor approval, dispute resolution, platform analytics), inventory management with low-stock alerts, coupon/discount engine",
            "difficulty": 5,
            "coreFeatures": [
                "Vendor onboarding with store setup and product management",
                "buyer experience (search",
                "filters",
                "cart",
                "wishlist",
                "reviews)",
                "order management with status tracking and notifications",
                "payment split system (buyer pays → platform takes commission → vendor receives)",
                "admin dashboard (vendor approval",
                "dispute resolution",
                "platform analytics)",
                "inventory management with low-stock alerts",
                "coupon/discount engine"
            ],
            "startupAngle": "Demo with 3+ vendors and 20+ products, working payment split, pitch deck with marketplace economics model",
            "conceptsCovered": {
                "tech": "React + TypeScript, Node.js + Express/NestJS, PostgreSQL, Redis, Stripe Connect for payment splits, Elasticsearch for product search, Docker, CI/CD",
                "architecture": "Student A: Auth, vendor onboarding, store management | Student B: Product catalog, search (Elasticsearch), filters, recommendations | Student C: Cart, checkout, order management, status tracking | Student D: Stripe Connect integration, commission engine, payout management, coupons | Student E: Admin dashboard, analytics, DevOps, monitoring, deployment"
            }
        }
    ],
    "ai-ml": [
        {
            "name": "End-to-End Predictive Analytics Pipeline",
            "tagline": "End-to-End Predictive Analytics Pipeline",
            "description": "Automated EDA report generation (distributions, correlations, missing value analysis), feature engineering pipeline (encoding, scaling, interaction features, feature selection with mutual information), model training with 5+ algorithms (Linear Regression, Decision Tree, Random Forest, XGBoost, SVM), hyperparameter optimization (Optuna with Bayesian search), model comparison dashboard with cross-validated metrics, SHAP-based explainability for top model, Streamlit web app for predictions with what-if analysis",
            "difficulty": 3,
            "coreFeatures": [
                "Automated EDA report generation (distributions",
                "correlations",
                "missing value analysis)",
                "feature engineering pipeline (encoding",
                "scaling",
                "interaction features",
                "feature selection with mutual information)",
                "model training with 5+ algorithms (Linear Regression",
                "Decision Tree",
                "Random Forest",
                "XGBoost",
                "SVM)",
                "hyperparameter optimization (Optuna with Bayesian search)",
                "model comparison dashboard with cross-validated metrics",
                "SHAP-based explainability for top model",
                "Streamlit web app for predictions with what-if analysis"
            ],
            "startupAngle": "Each student picks unique domain: healthcare costs, house prices, customer churn, stock movement, crop yield, loan default, etc. — different datasets force different feature engineering strategies",
            "conceptsCovered": {
                "tech": "Python 3.10+, Pandas, NumPy, Scikit-learn, XGBoost, Optuna, SHAP, Matplotlib/Seaborn/Plotly, Streamlit, joblib for model serialization",
                "architecture": "Modular pipeline: data_loader → preprocessor → feature_engineer → trainer → evaluator → explainer, config-driven (YAML) for easy dataset swapping, reproducible experiments with random seeds and logging, separate train/validation/test splits with no data leakage, pipeline serialization for deployment"
            }
        },
        {
            "name": "Custom Image Classification System",
            "tagline": "Custom Image Classification System",
            "description": "Custom dataset curation with web scraping or manual collection, data augmentation pipeline (rotation, flip, color jitter, cutout, mixup), transfer learning with 3+ architectures (ResNet50, EfficientNetB0, MobileNetV2), training with learning rate scheduling and early stopping, confusion matrix, per-class precision/recall, GradCAM visualizations, model quantization for edge deployment, Gradio web interface for live inference with confidence scores",
            "difficulty": 4,
            "coreFeatures": [
                "Custom dataset curation with web scraping or manual collection",
                "data augmentation pipeline (rotation",
                "flip",
                "color jitter",
                "cutout",
                "mixup)",
                "transfer learning with 3+ architectures (ResNet50",
                "EfficientNetB0",
                "MobileNetV2)",
                "training with learning rate scheduling and early stopping",
                "confusion matrix",
                "per-class precision/recall",
                "GradCAM visualizations",
                "model quantization for edge deployment",
                "Gradio web interface for live inference with confidence scores"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "PyTorch or TensorFlow/Keras, torchvision/tf.image, Albumentations for augmentation, GradCAM (pytorch-grad-cam), Gradio, ONNX for export, Matplotlib",
                "architecture": "Training pipeline with config-driven hyperparameters, experiment tracking with TensorBoard or W&amp;B, model checkpoint management (save best, resume training), data pipeline with proper train/val/test splits and no leakage, augmentation applied only to training set"
            }
        },
        {
            "name": "Multi-Modal AI Application",
            "tagline": "Multi-Modal AI Application",
            "description": "NLP module: text classification/NER/summarization with fine-tuned transformer, Vision module: image classification/object detection with custom model, Combined inference: accept both text + image inputs and produce unified output, FastAPI serving with async inference, batch prediction support, model A/B testing framework, interactive demo application",
            "difficulty": 4,
            "coreFeatures": [
                "NLP module: text classification/NER/summarization with fine-tuned transformer",
                "Vision module: image classification/object detection with custom model",
                "Combined inference: accept both text + image inputs and produce unified output",
                "FastAPI serving with async inference",
                "batch prediction support",
                "model A/B testing framework",
                "interactive demo application"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "HuggingFace Transformers, PyTorch, FastAPI, Redis for request queuing, Docker, Gradio/Streamlit for demo",
                "architecture": "Student A: NLP model training, HuggingFace fine-tuning, text preprocessing pipeline, evaluation suite | Student B: Vision model, image preprocessing, FastAPI serving layer, Docker deployment, integration logic"
            }
        },
        {
            "name": "Intelligent Document Processing (IDP) Platform",
            "tagline": "Intelligent Document Processing (IDP) Platform",
            "description": "Document upload and OCR (Tesseract/EasyOCR), document classification (invoice, receipt, contract, form, report) using fine-tuned model, key-value extraction from structured and semi-structured documents, document summarization using LLM API, searchable document store with semantic search, workflow automation (classify → extract → validate → export), dashboard with processing analytics, REST API for third-party integration",
            "difficulty": 5,
            "coreFeatures": [
                "Document upload and OCR (Tesseract/EasyOCR)",
                "document classification (invoice",
                "receipt",
                "contract",
                "form",
                "report) using fine-tuned model",
                "key-value extraction from structured and semi-structured documents",
                "document summarization using LLM API",
                "searchable document store with semantic search",
                "workflow automation (classify → extract → validate → export)",
                "dashboard with processing analytics",
                "REST API for third-party integration"
            ],
            "startupAngle": "Demo processing 50+ real documents across 3+ types, accuracy metrics per document type, pitch deck with enterprise sales model and TAM for document automation market",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: OCR pipeline, image preprocessing, text extraction | Student B: Document classifier (training, evaluation, serving) | Student C: Key-value extraction, NER for entities, validation rules | Student D: LLM integration for summarization, semantic search (vector DB) | Student E: Web dashboard, API layer, Docker deployment, monitoring, documentation"
            }
        },
        {
            "name": "AI-Powered Healthcare Triage System",
            "tagline": "AI-Powered Healthcare Triage System",
            "description": "Symptom intake via conversational chatbot (LLM-powered), image upload for skin/wound analysis (CNN classifier), triage classification (emergency/urgent/routine), patient history integration, explainable AI showing reasoning chain, doctor-facing dashboard with patient queue, API for telemedicine platform integration",
            "difficulty": 5,
            "coreFeatures": [
                "Symptom intake via conversational chatbot (LLM-powered)",
                "image upload for skin/wound analysis (CNN classifier)",
                "triage classification (emergency/urgent/routine)",
                "patient history integration",
                "explainable AI showing reasoning chain",
                "doctor-facing dashboard with patient queue",
                "API for telemedicine platform integration"
            ],
            "startupAngle": "Demo with 10+ symptom scenarios, working image analysis, triage accuracy report, pitch with healthcare market analysis",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Chatbot (LLM prompt engineering, conversation flow) | Student B: Image analysis (CNN for skin conditions, wound classification) | Student C: Triage logic engine, risk scoring, explainability | Student D: Patient management, doctor dashboard, notification system | Student E: API layer, security (HIPAA considerations), Docker, deployment, monitoring"
            }
        },
        {
            "name": "Predictive Maintenance Platform",
            "tagline": "Predictive Maintenance Platform",
            "description": "Sensor data ingestion (simulated or real IoT data), anomaly detection using autoencoders and isolation forests, remaining useful life (RUL) prediction with LSTM, failure classification and root cause analysis, maintenance scheduling recommendation engine, real-time monitoring dashboard with alerts, historical analysis and reporting",
            "difficulty": 5,
            "coreFeatures": [
                "Sensor data ingestion (simulated or real IoT data)",
                "anomaly detection using autoencoders and isolation forests",
                "remaining useful life (RUL) prediction with LSTM",
                "failure classification and root cause analysis",
                "maintenance scheduling recommendation engine",
                "real-time monitoring dashboard with alerts",
                "historical analysis and reporting"
            ],
            "startupAngle": "Demo with simulated factory data, anomaly detection accuracy, ROI calculator showing maintenance cost savings, pitch with Industry 4.0 market sizing",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Data ingestion pipeline, feature engineering from time-series | Student B: Anomaly detection models (autoencoder, isolation forest) | Student C: RUL prediction (LSTM), failure classifier | Student D: Recommendation engine, scheduling optimization | Student E: Dashboard, alerting, API, deployment, monitoring"
            }
        }
    ],
    "cybersecurity": [
        {
            "name": "Automated Network Security Auditor",
            "tagline": "Automated Network Security Auditor",
            "description": "Multi-threaded port scanner with service version detection, OS fingerprinting using TCP/IP stack analysis, vulnerability mapping against CVE database, automated SSL/TLS configuration audit, DNS enumeration and subdomain discovery, structured HTML/PDF report generation with severity ratings, configurable scan profiles (quick/standard/deep)",
            "difficulty": 3,
            "coreFeatures": [
                "Multi-threaded port scanner with service version detection",
                "OS fingerprinting using TCP/IP stack analysis",
                "vulnerability mapping against CVE database",
                "automated SSL/TLS configuration audit",
                "DNS enumeration and subdomain discovery",
                "structured HTML/PDF report generation with severity ratings",
                "configurable scan profiles (quick/standard/deep)"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Python 3.10+, Scapy for packet crafting, Socket for TCP/UDP, python-nmap wrapper for validation, Jinja2 for report templates, asyncio for concurrent scanning",
                "architecture": ""
            }
        },
        {
            "name": "Web Application Penetration Testing Toolkit",
            "tagline": "Web Application Penetration Testing Toolkit",
            "description": "SQL injection scanner (union, blind, time-based detection), XSS scanner (reflected, stored, DOM-based), directory/file bruteforcer with wordlist support, authentication testing (brute force with rate limit detection, default creds), HTTP header security analyzer (HSTS, CSP, X-Frame-Options), session management tester (cookie flags, token entropy), OWASP-aligned severity-rated PDF report with evidence screenshots",
            "difficulty": 4,
            "coreFeatures": [
                "SQL injection scanner (union",
                "blind",
                "time-based detection)",
                "XSS scanner (reflected",
                "stored",
                "DOM-based)",
                "directory/file bruteforcer with wordlist support",
                "authentication testing (brute force with rate limit detection",
                "default creds)",
                "HTTP header security analyzer (HSTS",
                "CSP",
                "X-Frame-Options)",
                "session management tester (cookie flags",
                "token entropy)",
                "OWASP-aligned severity-rated PDF report with evidence screenshots"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Python, Requests, BeautifulSoup, Selenium for DOM XSS, concurrent.futures for threading, ReportLab for PDF, custom payload databases",
                "architecture": ""
            }
        },
        {
            "name": "SIEM &amp; Incident Response Command Center",
            "tagline": "SIEM &amp; Incident Response Command Center",
            "description": "Multi-source log ingestion (syslog, file, API), real-time log parsing and normalization, correlation rules engine (brute force detection, port scan detection, privilege escalation, lateral movement), alert generation with severity and confidence scores, interactive investigation dashboard with timeline view, IR playbook templates (ransomware, data breach, DDoS), forensic evidence collection and chain of custody documentation",
            "difficulty": 4,
            "coreFeatures": [
                "Multi-source log ingestion (syslog",
                "file",
                "API)",
                "real-time log parsing and normalization",
                "correlation rules engine (brute force detection",
                "port scan detection",
                "privilege escalation",
                "lateral movement)",
                "alert generation with severity and confidence scores",
                "interactive investigation dashboard with timeline view",
                "IR playbook templates (ransomware",
                "data breach",
                "DDoS)",
                "forensic evidence collection and chain of custody documentation"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "ELK Stack (Elasticsearch, Logstash, Kibana) or Wazuh, Python for custom rules, Flask/FastAPI for playbook API, Docker Compose",
                "architecture": "Student A: Log collection, parsing, normalization, Elasticsearch indexing, correlation rule engine | Student B: Kibana dashboards, alert management UI, IR playbook system, forensics tools integration"
            }
        },
        {
            "name": "Enterprise Security Operations Platform",
            "tagline": "Enterprise Security Operations Platform",
            "description": "Asset discovery and inventory management, continuous vulnerability scanning with severity prioritization, compliance checker (CIS benchmarks, NIST framework), SIEM with custom correlation rules, automated incident response playbooks, executive security posture dashboard, API for tool integration (Slack alerts, Jira ticket creation), role-based access (CISO/Analyst/Admin views)",
            "difficulty": 5,
            "coreFeatures": [
                "Asset discovery and inventory management",
                "continuous vulnerability scanning with severity prioritization",
                "compliance checker (CIS benchmarks",
                "NIST framework)",
                "SIEM with custom correlation rules",
                "automated incident response playbooks",
                "executive security posture dashboard",
                "API for tool integration (Slack alerts",
                "Jira ticket creation)",
                "role-based access (CISO/Analyst/Admin views)"
            ],
            "startupAngle": "Demo scanning a mock corporate network, compliance report generation, working alert pipeline, pitch with SMB cybersecurity market sizing and pricing model",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Asset discovery, vulnerability scanner, CVE mapping | Student B: SIEM engine, log correlation, real-time alerting | Student C: Compliance engine (CIS/NIST checks), reporting, audit trails | Student D: IR playbooks, automation engine, notification system | Student E: Web dashboard, API layer, RBAC, Docker deployment, monitoring"
            }
        },
        {
            "name": "AI-Enhanced Threat Intelligence Platform",
            "tagline": "AI-Enhanced Threat Intelligence Platform",
            "description": "Threat feed aggregation from multiple OSINT sources, ML-based threat classification and severity scoring, IOC (Indicators of Compromise) management and search, threat actor profiling and campaign tracking, automated threat briefing generation, integration API for SIEM/SOAR platforms, analyst workbench with investigation tools",
            "difficulty": 5,
            "coreFeatures": [
                "Threat feed aggregation from multiple OSINT sources",
                "ML-based threat classification and severity scoring",
                "IOC (Indicators of Compromise) management and search",
                "threat actor profiling and campaign tracking",
                "automated threat briefing generation",
                "integration API for SIEM/SOAR platforms",
                "analyst workbench with investigation tools"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Feed aggregation, data normalization, deduplication | Student B: ML classifier for threat types, NLP for threat reports | Student C: IOC database, search engine, enrichment pipeline | Student D: Analyst dashboard, investigation tools, briefing generator | Student E: API layer, integrations, deployment, security hardening"
            }
        },
        {
            "name": "Zero-Trust Network Access Controller",
            "tagline": "Zero-Trust Network Access Controller",
            "description": "Device posture assessment (OS version, patches, antivirus status), identity verification with MFA, micro-segmentation policy engine, continuous authentication and authorization, risk-based access decisions, session monitoring and anomaly detection, admin console with policy management, audit logging and compliance reporting",
            "difficulty": 5,
            "coreFeatures": [
                "Device posture assessment (OS version",
                "patches",
                "antivirus status)",
                "identity verification with MFA",
                "micro-segmentation policy engine",
                "continuous authentication and authorization",
                "risk-based access decisions",
                "session monitoring and anomaly detection",
                "admin console with policy management",
                "audit logging and compliance reporting"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Device posture agent, health check engine | Student B: Identity provider integration, MFA, authentication flow | Student C: Policy engine, micro-segmentation rules, access decisions | Student D: Session monitoring, anomaly detection, risk scoring | Student E: Admin console, audit logs, deployment, documentation"
            }
        }
    ],
    "data-engineering": [
        {
            "name": "Multi-Source Data Integration Pipeline",
            "tagline": "Multi-Source Data Integration Pipeline",
            "description": "Extract from 4+ sources (REST API, CSV files, PostgreSQL database, web scraping), schema inference and validation for each source, data cleaning (dedup, null handling, type coercion, standardization), star schema design with fact and dimension tables, incremental load support (upserts, not just full refresh), data quality report generation, SQLAlchemy/Prisma ORM for warehouse loading",
            "difficulty": 3,
            "coreFeatures": [
                "Extract from 4+ sources (REST API",
                "CSV files",
                "PostgreSQL database",
                "web scraping)",
                "schema inference and validation for each source",
                "data cleaning (dedup",
                "null handling",
                "type coercion",
                "standardization)",
                "star schema design with fact and dimension tables",
                "incremental load support (upserts",
                "not just full refresh)",
                "data quality report generation",
                "SQLAlchemy/Prisma ORM for warehouse loading"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Python, Pandas, SQLAlchemy, PostgreSQL, Requests, BeautifulSoup, Great Expectations for validation, logging module",
                "architecture": ""
            }
        },
        {
            "name": "Orchestrated ETL with Airflow &amp; Spark",
            "tagline": "Orchestrated ETL with Airflow &amp; Spark",
            "description": "Apache Airflow DAG with 5+ tasks (extract → validate → transform → load → notify), PySpark transformations (joins, aggregations, window functions, UDFs), Great Expectations validation between stages, SLA monitoring with alerting on task failure, backfill support for historical data processing, parameterized DAG for date-range processing, Airflow variables and connections for config management",
            "difficulty": 4,
            "coreFeatures": [
                "Apache Airflow DAG with 5+ tasks (extract → validate → transform → load → notify)",
                "PySpark transformations (joins",
                "aggregations",
                "window functions",
                "UDFs)",
                "Great Expectations validation between stages",
                "SLA monitoring with alerting on task failure",
                "backfill support for historical data processing",
                "parameterized DAG for date-range processing",
                "Airflow variables and connections for config management"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Apache Airflow 2.x, PySpark, Great Expectations, PostgreSQL, Docker Compose for local Airflow + Spark, Slack webhook for alerts",
                "architecture": ""
            }
        },
        {
            "name": "Real-Time Streaming Analytics Platform",
            "tagline": "Real-Time Streaming Analytics Platform",
            "description": "Kafka producer generating realistic event streams (e-commerce clicks, IoT sensors, or social media), Kafka consumer with Spark Structured Streaming for real-time aggregation, dbt-managed data warehouse with staging, intermediate, and mart layers, Grafana real-time dashboards with auto-refresh, dead letter queue for failed messages, schema registry for event versioning",
            "difficulty": 4,
            "coreFeatures": [
                "Kafka producer generating realistic event streams (e-commerce clicks",
                "IoT sensors",
                "or social media)",
                "Kafka consumer with Spark Structured Streaming for real-time aggregation",
                "dbt-managed data warehouse with staging",
                "intermediate",
                "and mart layers",
                "Grafana real-time dashboards with auto-refresh",
                "dead letter queue for failed messages",
                "schema registry for event versioning"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Apache Kafka, PySpark Structured Streaming, dbt Core, PostgreSQL/DuckDB, Grafana, Docker Compose, Confluent Schema Registry",
                "architecture": "Student A: Kafka setup, producer/consumer, Spark streaming jobs, schema registry | Student B: dbt project (models, tests, docs), Grafana dashboards, dead letter queue handling"
            }
        },
        {
            "name": "Enterprise Data Platform as a Service",
            "tagline": "Enterprise Data Platform as a Service",
            "description": "Self-service data connector setup (API, database, file upload), automated schema detection and profiling, Airflow-orchestrated ETL/ELT pipelines, dbt-managed transformation layer, data catalog with search, lineage tracking, and documentation, role-based access control for data assets, SQL query editor with result visualization, data quality monitoring with alerting, usage analytics and cost attribution",
            "difficulty": 5,
            "coreFeatures": [
                "Self-service data connector setup (API",
                "database",
                "file upload)",
                "automated schema detection and profiling",
                "Airflow-orchestrated ETL/ELT pipelines",
                "dbt-managed transformation layer",
                "data catalog with search",
                "lineage tracking",
                "and documentation",
                "role-based access control for data assets",
                "SQL query editor with result visualization",
                "data quality monitoring with alerting",
                "usage analytics and cost attribution"
            ],
            "startupAngle": "Demo with 3+ data sources connected, end-to-end pipeline running, catalog with searchable assets, pitch with data infrastructure market sizing",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Connector framework, schema detection, ingestion pipeline | Student B: Airflow orchestration, scheduling, monitoring, SLA tracking | Student C: dbt transformation layer, data quality (Great Expectations), lineage | Student D: Data catalog, search, RBAC, SQL editor | Student E: Web application, API layer, Docker deployment, Grafana monitoring, documentation"
            }
        },
        {
            "name": "Real-Time Fraud Detection Pipeline",
            "tagline": "Real-Time Fraud Detection Pipeline",
            "description": "Real-time transaction ingestion via Kafka, feature engineering pipeline (velocity checks, amount patterns, geo-anomalies), ML model serving for fraud scoring, rule-based fraud engine (configurable thresholds), case management dashboard for fraud analysts, alert routing and escalation, historical pattern analysis and reporting",
            "difficulty": 5,
            "coreFeatures": [
                "Real-time transaction ingestion via Kafka",
                "feature engineering pipeline (velocity checks",
                "amount patterns",
                "geo-anomalies)",
                "ML model serving for fraud scoring",
                "rule-based fraud engine (configurable thresholds)",
                "case management dashboard for fraud analysts",
                "alert routing and escalation",
                "historical pattern analysis and reporting"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Kafka ingestion, transaction normalization, schema registry | Student B: Feature engineering pipeline, Spark streaming jobs | Student C: ML fraud model training, serving, A/B testing | Student D: Rule engine, case management dashboard, alert routing | Student E: API layer, deployment, monitoring, load testing, documentation"
            }
        },
        {
            "name": "Multi-Tenant Analytics Data Warehouse",
            "tagline": "Multi-Tenant Analytics Data Warehouse",
            "description": "Tenant onboarding with isolated data pipelines, automated schema provisioning per tenant, shared ETL framework with tenant-specific configurations, dbt project with tenant-aware models, embeddable analytics dashboards per tenant, usage-based billing tracking, admin console for tenant management, API for programmatic data access",
            "difficulty": 5,
            "coreFeatures": [
                "Tenant onboarding with isolated data pipelines",
                "automated schema provisioning per tenant",
                "shared ETL framework with tenant-specific configurations",
                "dbt project with tenant-aware models",
                "embeddable analytics dashboards per tenant",
                "usage-based billing tracking",
                "admin console for tenant management",
                "API for programmatic data access"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Tenant isolation, schema provisioning, onboarding flow | Student B: ETL framework, Airflow DAGs with tenant context | Student C: dbt models, data quality, tenant-aware transformations | Student D: Embeddable dashboards, analytics API, billing tracking | Student E: Admin console, API gateway, deployment, monitoring"
            }
        }
    ],
    "devops-cloud": [
        {
            "name": "Production-Ready Container Platform",
            "tagline": "Production-Ready Container Platform",
            "description": "Multi-service Docker Compose setup (app + API + DB + cache + reverse proxy), multi-stage Dockerfiles with build optimization (&lt;200MB images), Nginx reverse proxy with SSL termination (self-signed for dev), health check endpoints and Docker health checks, centralized logging with structured JSON output, Makefile with dev/test/prod targets, image vulnerability scanning with Trivy, docker-compose.override for local dev vs production configs",
            "difficulty": 3,
            "coreFeatures": [
                "Multi-service Docker Compose setup (app + API + DB + cache + reverse proxy)",
                "multi-stage Dockerfiles with build optimization (&lt;200MB images)",
                "Nginx reverse proxy with SSL termination (self-signed for dev)",
                "health check endpoints and Docker health checks",
                "centralized logging with structured JSON output",
                "Makefile with dev/test/prod targets",
                "image vulnerability scanning with Trivy",
                "docker-compose.override for local dev vs production configs"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Docker, Docker Compose, Nginx, Trivy, Make, bash scripting",
                "architecture": ""
            }
        },
        {
            "name": "Full CI/CD Pipeline with Infrastructure as Code",
            "tagline": "Full CI/CD Pipeline with Infrastructure as Code",
            "description": "GitHub Actions workflow: lint → test → build → scan → deploy, Terraform modules for VPC, compute, database, and load balancer, Ansible playbooks for server configuration and app deployment, multi-environment support (dev/staging/prod) with variable files, secrets management with GitHub Secrets + Vault integration pattern, Slack notifications for pipeline status, infrastructure cost estimation in PR comments, rollback mechanism on deployment failure",
            "difficulty": 4,
            "coreFeatures": [
                "GitHub Actions workflow: lint → test → build → scan → deploy",
                "Terraform modules for VPC",
                "compute",
                "database",
                "and load balancer",
                "Ansible playbooks for server configuration and app deployment",
                "multi-environment support (dev/staging/prod) with variable files",
                "secrets management with GitHub Secrets + Vault integration pattern",
                "Slack notifications for pipeline status",
                "infrastructure cost estimation in PR comments",
                "rollback mechanism on deployment failure"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "GitHub Actions, Terraform, Ansible, AWS/GCP (free tier), Docker, Trivy, Slack webhook",
                "architecture": ""
            }
        },
        {
            "name": "Kubernetes Platform with GitOps &amp; Service Mesh",
            "tagline": "Kubernetes Platform with GitOps &amp; Service Mesh",
            "description": "Microservices deployment (3+ services) with Helm charts, ArgoCD GitOps with auto-sync and health checks, HPA auto-scaling based on CPU and custom metrics, Ingress with TLS termination and path-based routing, RBAC policies with namespace isolation, network policies limiting inter-service communication, Prometheus + Grafana monitoring with custom dashboards, blue-green deployment strategy",
            "difficulty": 4,
            "coreFeatures": [
                "Microservices deployment (3+ services) with Helm charts",
                "ArgoCD GitOps with auto-sync and health checks",
                "HPA auto-scaling based on CPU and custom metrics",
                "Ingress with TLS termination and path-based routing",
                "RBAC policies with namespace isolation",
                "network policies limiting inter-service communication",
                "Prometheus + Grafana monitoring with custom dashboards",
                "blue-green deployment strategy"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Kubernetes (minikube/kind/k3s), Helm 3, ArgoCD, Prometheus, Grafana, cert-manager, Nginx Ingress Controller",
                "architecture": "Student A: K8s manifests, Helm chart authoring, Ingress config, HPA, network policies | Student B: ArgoCD setup, GitOps workflow, Prometheus/Grafana, RBAC, blue-green deployment"
            }
        },
        {
            "name": "Internal Developer Platform",
            "tagline": "Internal Developer Platform",
            "description": "Service catalog with tech stack metadata, self-service environment provisioning (dev/staging/prod), one-click deployment pipeline creation, resource monitoring dashboard per service, cost tracking and optimization recommendations, scaffolding templates for new services, documentation hub with auto-generated API docs, golden path templates enforcing best practices",
            "difficulty": 5,
            "coreFeatures": [
                "Service catalog with tech stack metadata",
                "self-service environment provisioning (dev/staging/prod)",
                "one-click deployment pipeline creation",
                "resource monitoring dashboard per service",
                "cost tracking and optimization recommendations",
                "scaffolding templates for new services",
                "documentation hub with auto-generated API docs",
                "golden path templates enforcing best practices"
            ],
            "startupAngle": "Demo onboarding a new service from scaffold to deployed in &lt;5 minutes, cost dashboard showing per-service spend, pitch with platform engineering market analysis",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Service catalog, metadata management, search | Student B: Environment provisioning (Terraform), pipeline generation (GitHub Actions templates) | Student C: K8s deployment engine, Helm integration, ArgoCD sync | Student D: Monitoring dashboard, cost tracking, alerting, resource recommendations | Student E: Web portal, RBAC, scaffolding CLI, documentation hub, deployment"
            }
        },
        {
            "name": "Multi-Cloud Infrastructure Orchestrator",
            "tagline": "Multi-Cloud Infrastructure Orchestrator",
            "description": "Unified resource provisioning across AWS and GCP, cost comparison and optimization across clouds, infrastructure drift detection and remediation, policy-as-code enforcement (OPA/Sentinel), disaster recovery with cross-cloud failover, unified monitoring across cloud providers, compliance reporting (SOC2/ISO27001 controls), API for programmatic infrastructure management",
            "difficulty": 5,
            "coreFeatures": [
                "Unified resource provisioning across AWS and GCP",
                "cost comparison and optimization across clouds",
                "infrastructure drift detection and remediation",
                "policy-as-code enforcement (OPA/Sentinel)",
                "disaster recovery with cross-cloud failover",
                "unified monitoring across cloud providers",
                "compliance reporting (SOC2/ISO27001 controls)",
                "API for programmatic infrastructure management"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: AWS provider, resource abstraction layer | Student B: GCP provider, resource normalization | Student C: Policy engine, drift detection, compliance | Student D: Cost analysis, optimization recommendations, DR planning | Student E: Unified dashboard, API layer, deployment, monitoring"
            }
        },
        {
            "name": "Chaos Engineering &amp; Reliability Platform",
            "tagline": "Chaos Engineering &amp; Reliability Platform",
            "description": "Chaos experiment library (pod kill, network latency, CPU stress, disk fill), scheduled game days with blast radius controls, real-time impact monitoring during experiments, automated rollback on safety threshold breach, SLO tracker with error budget calculation, post-incident analysis and report generation, integration with PagerDuty/Slack for alerting, reliability scorecard per service",
            "difficulty": 5,
            "coreFeatures": [
                "Chaos experiment library (pod kill",
                "network latency",
                "CPU stress",
                "disk fill)",
                "scheduled game days with blast radius controls",
                "real-time impact monitoring during experiments",
                "automated rollback on safety threshold breach",
                "SLO tracker with error budget calculation",
                "post-incident analysis and report generation",
                "integration with PagerDuty/Slack for alerting",
                "reliability scorecard per service"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Chaos experiment engine, K8s integration, blast radius controls | Student B: Safety system, monitoring during experiments, automated rollback | Student C: SLO tracker, error budgets, reliability scoring | Student D: Game day scheduler, post-incident reports, analytics | Student E: Web dashboard, API, integrations (Slack/PagerDuty), deployment"
            }
        }
    ],
    "mobile-development": [
        {
            "name": "Smart Personal Finance Tracker",
            "tagline": "Smart Personal Finance Tracker",
            "description": "Transaction entry with amount, category, date, notes, and photo receipt, category management with custom icons and budget limits, monthly/weekly/daily spending breakdown with animated charts (pie, bar, trend line), recurring transaction setup (rent, subscriptions), search and filter with date range, category, and amount, local persistence with SQLite/Realm, export to CSV, dark/light theme with smooth transitions",
            "difficulty": 3,
            "coreFeatures": [
                "Transaction entry with amount",
                "category",
                "date",
                "notes",
                "and photo receipt",
                "category management with custom icons and budget limits",
                "monthly/weekly/daily spending breakdown with animated charts (pie",
                "bar",
                "trend line)",
                "recurring transaction setup (rent",
                "subscriptions)",
                "search and filter with date range",
                "category",
                "and amount",
                "local persistence with SQLite/Realm",
                "export to CSV",
                "dark/light theme with smooth transitions"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "React Native or Flutter, SQLite/Realm, Victory Charts or fl_chart, react-navigation or go_router, AsyncStorage/SharedPreferences",
                "architecture": ""
            }
        },
        {
            "name": "Geo-Aware Social Discovery App",
            "tagline": "Geo-Aware Social Discovery App",
            "description": "Firebase Auth with email, Google sign-in, and biometric lock, interactive map with custom markers, clustering, and radius search, geofencing with proximity-triggered push notifications (FCM), user profiles with photo upload (Firebase Storage), Firestore real-time data sync with offline support, location-based content feed with infinite scroll, deep linking for sharing specific locations/profiles",
            "difficulty": 4,
            "coreFeatures": [
                "Firebase Auth with email",
                "Google sign-in",
                "and biometric lock",
                "interactive map with custom markers",
                "clustering",
                "and radius search",
                "geofencing with proximity-triggered push notifications (FCM)",
                "user profiles with photo upload (Firebase Storage)",
                "Firestore real-time data sync with offline support",
                "location-based content feed with infinite scroll",
                "deep linking for sharing specific locations/profiles"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "React Native/Flutter, Firebase (Auth, Firestore, Storage, FCM), Google Maps SDK, react-native-maps or google_maps_flutter, Geofencing API",
                "architecture": ""
            }
        },
        {
            "name": "Real-Time Social Polling Platform",
            "tagline": "Real-Time Social Polling Platform",
            "description": "Create polls with multiple question types (single choice, multi, ranked, rating), real-time vote streaming with animated bar/pie charts updating live, room-based sessions with QR code join and invite links, user authentication with profile and voting history, complex gesture-based interactions (swipe to vote, pull to refresh), comprehensive accessibility support (screen reader, dynamic text), full test suite (unit + integration + E2E)",
            "difficulty": 4,
            "coreFeatures": [
                "Create polls with multiple question types (single choice",
                "multi",
                "ranked",
                "rating)",
                "real-time vote streaming with animated bar/pie charts updating live",
                "room-based sessions with QR code join and invite links",
                "user authentication with profile and voting history",
                "complex gesture-based interactions (swipe to vote",
                "pull to refresh)",
                "comprehensive accessibility support (screen reader",
                "dynamic text)",
                "full test suite (unit + integration + E2E)"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "React Native/Flutter, Socket.io or Firebase Realtime DB, Reanimated 2 or Flutter animations, Jest + Detox or Flutter test + integration_test",
                "architecture": "Student A: WebSocket real-time engine, vote streaming, animated charts, gesture interactions | Student B: Auth flow, profile management, testing suite, performance profiling, accessibility audit"
            }
        },
        {
            "name": "Hyperlocal Services Marketplace App",
            "tagline": "Hyperlocal Services Marketplace App",
            "description": "Dual app experience (customer + service provider), service catalog with search, filters, and recommendations, real-time booking with provider availability calendar, live location tracking during service delivery, in-app payment (Stripe/Razorpay) with split payments, rating and review system with photo evidence, push notification lifecycle (booking → accepted → en route → completed), admin panel for service management and analytics",
            "difficulty": 5,
            "coreFeatures": [
                "Dual app experience (customer + service provider)",
                "service catalog with search",
                "filters",
                "and recommendations",
                "real-time booking with provider availability calendar",
                "live location tracking during service delivery",
                "in-app payment (Stripe/Razorpay) with split payments",
                "rating and review system with photo evidence",
                "push notification lifecycle (booking → accepted → en route → completed)",
                "admin panel for service management and analytics"
            ],
            "startupAngle": "Demo with 5+ service categories, working booking → tracking → payment flow, pitch with hyperlocal market analysis for target city",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Auth, user profiles (customer + provider), onboarding flows | Student B: Service catalog, search, booking engine, availability calendar | Student C: Real-time tracking (maps), navigation, geofencing, push notifications | Student D: Payment integration, split payments, review system, dispute handling | Student E: Admin panel, analytics dashboard, CI/CD, store submission, crash reporting"
            }
        },
        {
            "name": "AI-Powered Health &amp; Wellness Companion",
            "tagline": "AI-Powered Health &amp; Wellness Companion",
            "description": "AI health chatbot (OpenAI/Claude API) for personalized advice, workout tracking with exercise library and video guides, nutrition logging with barcode scanning and calorie estimation, sleep tracking using device sensors, social challenges and community leaderboards, health data visualization (weekly/monthly trends), integration with Apple Health/Google Fit, premium subscription with Stripe/Razorpay",
            "difficulty": 5,
            "coreFeatures": [
                "AI health chatbot (OpenAI/Claude API) for personalized advice",
                "workout tracking with exercise library and video guides",
                "nutrition logging with barcode scanning and calorie estimation",
                "sleep tracking using device sensors",
                "social challenges and community leaderboards",
                "health data visualization (weekly/monthly trends)",
                "integration with Apple Health/Google Fit",
                "premium subscription with Stripe/Razorpay"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Auth, profiles, onboarding, health data integration (HealthKit/Google Fit) | Student B: Workout system, exercise library, video player, tracking | Student C: AI chatbot, nutrition logging, barcode scanner, calorie estimation | Student D: Social features, challenges, leaderboards, push notifications | Student E: Analytics dashboard, subscription/payments, CI/CD, store deployment"
            }
        },
        {
            "name": "Smart Campus Super App",
            "tagline": "Smart Campus Super App",
            "description": "Indoor navigation with AR waypoints, class schedule with timetable sync and room finder, campus event discovery with RSVP and reminders, food court ordering with menu, cart, and payment, lost &amp; found board with photo upload and location, student marketplace (buy/sell textbooks, electronics), attendance tracking via BLE beacons or QR, anonymous confession wall with moderation",
            "difficulty": 5,
            "coreFeatures": [
                "Indoor navigation with AR waypoints",
                "class schedule with timetable sync and room finder",
                "campus event discovery with RSVP and reminders",
                "food court ordering with menu",
                "cart",
                "and payment",
                "lost &amp; found board with photo upload and location",
                "student marketplace (buy/sell textbooks",
                "electronics)",
                "attendance tracking via BLE beacons or QR",
                "anonymous confession wall with moderation"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Auth, profiles, timetable sync, attendance (BLE/QR) | Student B: Navigation (maps, AR), room finder, event discovery | Student C: Food ordering (menu, cart, payment), marketplace | Student D: Social features (confessions, lost &amp; found), push notifications, moderation | Student E: Admin panel, analytics, CI/CD, store deployment, crash monitoring"
            }
        }
    ],
    "iot-embedded": [
        {
            "name": "Intelligent Multi-Sensor Environmental Station",
            "tagline": "Intelligent Multi-Sensor Environmental Station",
            "description": "5+ sensor readings (temperature, humidity, pressure, light intensity, air quality/CO2, motion), OLED display with multi-screen UI (rotate through sensor views), SD card data logging with CSV format and timestamps, serial plotter integration for real-time graphing, configurable alert thresholds with buzzer/LED indicators, power consumption measurement and optimization mode, interrupt-driven motion detection (not polling)",
            "difficulty": 3,
            "coreFeatures": [
                "5+ sensor readings (temperature",
                "humidity",
                "pressure",
                "light intensity",
                "air quality/CO2",
                "motion)",
                "OLED display with multi-screen UI (rotate through sensor views)",
                "SD card data logging with CSV format and timestamps",
                "serial plotter integration for real-time graphing",
                "configurable alert thresholds with buzzer/LED indicators",
                "power consumption measurement and optimization mode",
                "interrupt-driven motion detection (not polling)"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "ESP32 or Arduino Mega, BME280 (I2C), MQ-135, BH1750, PIR sensor, SSD1306 OLED, SD card module (SPI), PlatformIO",
                "architecture": ""
            }
        },
        {
            "name": "Cloud-Connected Smart Monitor with MQTT",
            "tagline": "Cloud-Connected Smart Monitor with MQTT",
            "description": "Wi-Fi auto-connect with captive portal for SSID configuration, MQTT publish to Mosquitto broker with QoS 1 (at least once), structured JSON payloads with device ID, timestamps, and sensor readings, BLE advertisement for mobile phone readout (no app required — BLE scanner), cloud storage (ThingSpeak or InfluxDB), Grafana dashboard with 5+ panels (gauges, graphs, tables), configurable alert rules (email/webhook on threshold breach), OTA firmware update capability",
            "difficulty": 4,
            "coreFeatures": [
                "Wi-Fi auto-connect with captive portal for SSID configuration",
                "MQTT publish to Mosquitto broker with QoS 1 (at least once)",
                "structured JSON payloads with device ID",
                "timestamps",
                "and sensor readings",
                "BLE advertisement for mobile phone readout (no app required — BLE scanner)",
                "cloud storage (ThingSpeak or InfluxDB)",
                "Grafana dashboard with 5+ panels (gauges",
                "graphs",
                "tables)",
                "configurable alert rules (email/webhook on threshold breach)",
                "OTA firmware update capability"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "ESP32, MQTT (PubSubClient), BLE (NimBLE), ThingSpeak or InfluxDB, Grafana, Mosquitto broker, ArduinoOTA",
                "architecture": ""
            }
        },
        {
            "name": "Edge-Intelligent Automation System",
            "tagline": "Edge-Intelligent Automation System",
            "description": "TinyML model running on ESP32 (person detection via camera, or audio classification, or gesture recognition), edge decision making (actions taken locally without cloud), Node-RED automation flows with visual programming, multi-device MQTT coordination (3+ devices working together), OTA firmware updates with version management, power management with deep sleep and wake-on-event, watchdog timer for reliability",
            "difficulty": 4,
            "coreFeatures": [
                "TinyML model running on ESP32 (person detection via camera",
                "or audio classification",
                "or gesture recognition)",
                "edge decision making (actions taken locally without cloud)",
                "Node-RED automation flows with visual programming",
                "multi-device MQTT coordination (3+ devices working together)",
                "OTA firmware updates with version management",
                "power management with deep sleep and wake-on-event",
                "watchdog timer for reliability"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "ESP32-CAM or ESP32-S3, TensorFlow Lite Micro, Node-RED, MQTT, Docker (for Node-RED), Grafana",
                "architecture": "Student A: TinyML model training + quantization, ESP32 inference engine, edge logic, sensor hardware | Student B: Node-RED flows, MQTT broker management, multi-device coordination, OTA system, cloud dashboard"
            }
        },
        {
            "name": "Smart Building Management System",
            "tagline": "Smart Building Management System",
            "description": "Distributed sensor network across 5+ zones (temp, humidity, light, occupancy, energy), zone-based HVAC and lighting automation, occupancy-based energy optimization with scheduling, real-time building dashboard with floor plan visualization, anomaly detection for equipment failure prediction, energy consumption analytics with cost estimation, mobile app for facility manager control, API for BMS integration",
            "difficulty": 5,
            "coreFeatures": [
                "Distributed sensor network across 5+ zones (temp",
                "humidity",
                "light",
                "occupancy",
                "energy)",
                "zone-based HVAC and lighting automation",
                "occupancy-based energy optimization with scheduling",
                "real-time building dashboard with floor plan visualization",
                "anomaly detection for equipment failure prediction",
                "energy consumption analytics with cost estimation",
                "mobile app for facility manager control",
                "API for BMS integration"
            ],
            "startupAngle": "Demo with 5-zone sensor deployment, real-time dashboard, energy savings estimation, pitch with smart building market analysis and ROI calculator",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Sensor nodes (5+ ESP32 devices), hardware assembly, calibration | Student B: MQTT network, zone coordination, automation rules engine | Student C: TinyML occupancy detection, anomaly detection, edge processing | Student D: Cloud platform, dashboard, analytics, mobile app | Student E: PCB design, enclosures, OTA fleet management, deployment, documentation"
            }
        },
        {
            "name": "Agricultural IoT Platform",
            "tagline": "Agricultural IoT Platform",
            "description": "Soil monitoring nodes (moisture, pH, NPK, temperature), weather station integration (rainfall, wind, UV), automated drip irrigation with zone control, crop disease early warning using environmental patterns, mobile app for farmer (multi-language support), SMS/WhatsApp alerts for non-smartphone users, yield estimation dashboard, water usage optimization recommendations",
            "difficulty": 5,
            "coreFeatures": [
                "Soil monitoring nodes (moisture",
                "pH",
                "NPK",
                "temperature)",
                "weather station integration (rainfall",
                "wind",
                "UV)",
                "automated drip irrigation with zone control",
                "crop disease early warning using environmental patterns",
                "mobile app for farmer (multi-language support)",
                "SMS/WhatsApp alerts for non-smartphone users",
                "yield estimation dashboard",
                "water usage optimization recommendations"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Soil sensor nodes, calibration, hardware reliability | Student B: Weather station, irrigation controller, actuator management | Student C: Disease prediction model, environmental pattern analysis | Student D: Mobile app, farmer interface, SMS/WhatsApp integration | Student E: Cloud platform, dashboard, fleet management, deployment"
            }
        },
        {
            "name": "Industrial Safety Monitoring System",
            "tagline": "Industrial Safety Monitoring System",
            "description": "Wearable safety badges (fall detection, heart rate, location), environmental sensors (gas, temperature, noise level), geofenced danger zone alerts, real-time worker location tracking on facility map, SOS button with immediate alert escalation, safety compliance dashboard (PPE detection using edge camera), incident logging and regulatory reporting, shift management integration",
            "difficulty": 5,
            "coreFeatures": [
                "Wearable safety badges (fall detection",
                "heart rate",
                "location)",
                "environmental sensors (gas",
                "temperature",
                "noise level)",
                "geofenced danger zone alerts",
                "real-time worker location tracking on facility map",
                "SOS button with immediate alert escalation",
                "safety compliance dashboard (PPE detection using edge camera)",
                "incident logging and regulatory reporting",
                "shift management integration"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Wearable hardware (ESP32 + accelerometer + HR sensor + BLE) | Student B: Environmental sensors, gas detection, noise monitoring | Student C: Location tracking, geofencing, danger zone engine | Student D: Safety dashboard, compliance reporting, incident management | Student E: Edge camera (PPE detection), fleet management, deployment"
            }
        }
    ],
    "data-science": [
        {
            "name": "Statistical Research Report with Hypothesis Testing",
            "tagline": "Statistical Research Report with Hypothesis Testing",
            "description": "Comprehensive EDA with 20+ visualizations (distributions, correlations, pairplots, heatmaps), 5+ statistical hypothesis tests (t-test, chi-square, ANOVA, Mann-Whitney, correlation significance), confidence interval estimation for key metrics, A/B test simulation with power analysis and sample size calculation, outlier detection and treatment strategy (Z-score, IQR, isolation forest comparison), missing data analysis with MCAR/MAR/MNAR classification, polished Jupyter narrative with executive summary, methodology, findings, and recommendations",
            "difficulty": 3,
            "coreFeatures": [
                "Comprehensive EDA with 20+ visualizations (distributions",
                "correlations",
                "pairplots",
                "heatmaps)",
                "5+ statistical hypothesis tests (t-test",
                "chi-square",
                "ANOVA",
                "Mann-Whitney",
                "correlation significance)",
                "confidence interval estimation for key metrics",
                "A/B test simulation with power analysis and sample size calculation",
                "outlier detection and treatment strategy (Z-score",
                "IQR",
                "isolation forest comparison)",
                "missing data analysis with MCAR/MAR/MNAR classification",
                "polished Jupyter narrative with executive summary",
                "methodology",
                "findings",
                "and recommendations"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Python, Pandas, NumPy, SciPy, Statsmodels, Matplotlib, Seaborn, Plotly, Jupyter",
                "architecture": ""
            }
        },
        {
            "name": "Interactive Predictive Analytics Dashboard",
            "tagline": "Interactive Predictive Analytics Dashboard",
            "description": "Multi-page Streamlit/Dash app with sidebar navigation, interactive Plotly charts with drill-down capability, geospatial visualization with Folium (if location data applies), ML model predictions with real-time what-if sliders, model comparison view (3+ models with performance metrics), feature importance visualization (SHAP waterfall plots), data filtering with multi-select, date range, and search, downloadable PDF report generation from dashboard state",
            "difficulty": 4,
            "coreFeatures": [
                "Multi-page Streamlit/Dash app with sidebar navigation",
                "interactive Plotly charts with drill-down capability",
                "geospatial visualization with Folium (if location data applies)",
                "ML model predictions with real-time what-if sliders",
                "model comparison view (3+ models with performance metrics)",
                "feature importance visualization (SHAP waterfall plots)",
                "data filtering with multi-select",
                "date range",
                "and search",
                "downloadable PDF report generation from dashboard state"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Streamlit or Dash, Plotly, Altair, Folium, Scikit-learn, XGBoost, SHAP, pdfkit/reportlab",
                "architecture": ""
            }
        },
        {
            "name": "Multi-Model Advanced Analytics Engine",
            "tagline": "Multi-Model Advanced Analytics Engine",
            "description": "Customer/entity segmentation using K-Means, DBSCAN, and hierarchical clustering with silhouette analysis, time series forecasting with ARIMA, Prophet, and LSTM comparison, text sentiment analysis using TF-IDF + logistic regression and transformer comparison, unified Streamlit app with tab-based navigation across all three analyses, cross-technique insights (e.g., sentiment trends per customer segment over time), automated insight generation with natural language summaries",
            "difficulty": 4,
            "coreFeatures": [
                "Customer/entity segmentation using K-Means",
                "DBSCAN",
                "and hierarchical clustering with silhouette analysis",
                "time series forecasting with ARIMA",
                "Prophet",
                "and LSTM comparison",
                "text sentiment analysis using TF-IDF + logistic regression and transformer comparison",
                "unified Streamlit app with tab-based navigation across all three analyses",
                "cross-technique insights (e.g.",
                "sentiment trends per customer segment over time)",
                "automated insight generation with natural language summaries"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "Scikit-learn, Prophet, statsmodels, HuggingFace, Streamlit, Plotly, NLTK/spaCy",
                "architecture": "Student A: Clustering pipeline, time series models, evaluation metrics, cross-technique analysis | Student B: Text analytics pipeline, transformer integration, unified dashboard, automated insight generation"
            }
        },
        {
            "name": "Business Intelligence Platform for SMBs",
            "tagline": "Business Intelligence Platform for SMBs",
            "description": "Data connector (CSV upload, Google Sheets, PostgreSQL, REST API), automated EDA and data profiling on upload, natural language query interface ('Show me sales by region last quarter'), drag-and-drop dashboard builder with chart templates, automated insight detection (anomalies, trends, correlations), scheduled email reports with PDF snapshots, team collaboration with shared dashboards, usage-based pricing calculator",
            "difficulty": 5,
            "coreFeatures": [
                "Data connector (CSV upload",
                "Google Sheets",
                "PostgreSQL",
                "REST API)",
                "automated EDA and data profiling on upload",
                "natural language query interface ('Show me sales by region last quarter')",
                "drag-and-drop dashboard builder with chart templates",
                "automated insight detection (anomalies",
                "trends",
                "correlations)",
                "scheduled email reports with PDF snapshots",
                "team collaboration with shared dashboards",
                "usage-based pricing calculator"
            ],
            "startupAngle": "Demo connecting 2+ data sources, NL query working, auto-generated dashboard, pitch with SMB analytics market sizing and pricing comparison vs Tableau/Power BI",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Data connectors, schema detection, data profiling engine | Student B: NL query engine (LLM-powered SQL generation), chart recommendation | Student C: Dashboard builder UI, chart components, drag-and-drop | Student D: Automated insights (anomaly detection, trend analysis), email reports | Student E: Auth, team management, deployment, pricing engine, documentation"
            }
        },
        {
            "name": "Predictive Supply Chain Analytics Platform",
            "tagline": "Predictive Supply Chain Analytics Platform",
            "description": "Demand forecasting (multi-SKU, multi-location), inventory optimization recommendations (safety stock, reorder points), supplier performance scoring and risk assessment, logistics route optimization visualization, what-if simulator (price changes, supply disruptions), executive dashboard with KPIs (fill rate, inventory turns, OTIF), automated alerts for stock-outs and demand spikes, API for ERP integration",
            "difficulty": 5,
            "coreFeatures": [
                "Demand forecasting (multi-SKU",
                "multi-location)",
                "inventory optimization recommendations (safety stock",
                "reorder points)",
                "supplier performance scoring and risk assessment",
                "logistics route optimization visualization",
                "what-if simulator (price changes",
                "supply disruptions)",
                "executive dashboard with KPIs (fill rate",
                "inventory turns",
                "OTIF)",
                "automated alerts for stock-outs and demand spikes",
                "API for ERP integration"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Data pipeline, feature engineering from sales/inventory data | Student B: Demand forecasting models (Prophet, LSTM, ensemble) | Student C: Inventory optimization engine, supplier scoring | Student D: Dashboard, KPI tracking, what-if simulator | Student E: API layer, alerting system, deployment, documentation"
            }
        },
        {
            "name": "Real-Time Social Intelligence Platform",
            "tagline": "Real-Time Social Intelligence Platform",
            "description": "Multi-platform data collection (Twitter/Reddit/News APIs), real-time sentiment analysis with topic modeling, influencer identification and reach estimation, trending topic detection with early warning, competitive brand comparison dashboard, automated daily/weekly briefing generation, crisis detection with severity scoring and alerts, API for marketing tool integration",
            "difficulty": 5,
            "coreFeatures": [
                "Multi-platform data collection (Twitter/Reddit/News APIs)",
                "real-time sentiment analysis with topic modeling",
                "influencer identification and reach estimation",
                "trending topic detection with early warning",
                "competitive brand comparison dashboard",
                "automated daily/weekly briefing generation",
                "crisis detection with severity scoring and alerts",
                "API for marketing tool integration"
            ],
            "startupAngle": "Skill credibility builder",
            "conceptsCovered": {
                "tech": "",
                "architecture": "Student A: Data collection pipeline, API integrations, rate limiting | Student B: NLP models (sentiment, topics, NER), model serving | Student C: Influencer scoring, trend detection, crisis algorithm | Student D: Dashboard, competitive analysis, briefing generator | Student E: API layer, alerting, deployment, monitoring"
            }
        }
    ]
};

async function main() {
    console.log('🌱 Seeding Project Catalog...');

    // 1. Ensure Tracks Exist
    for (const stream of streams) {
        const track = await prisma.track.upsert({
            where: { slug: stream.slug },
            update: { title: stream.title },
            create: {
                slug: stream.slug,
                title: stream.title,
                description: \`Master \${stream.title} through real-world projects.\`,
            }
        });
        console.log(\`✅ Track verified: \${track.title}\`);

        // 2. Seed Projects for this Track
        const projects = projectsData[stream.slug] || [];
        for (const project of projects) {
            // Check if exists by name within track to avoid duplicates on re-run
            const existing = await prisma.projectCatalogItem.findFirst({
                where: {
                    trackId: track.id,
                    name: project.name
                }
            });

            if (!existing) {
                await prisma.projectCatalogItem.create({
                    data: {
                        trackId: track.id,
                        name: project.name,
                        tagline: project.tagline,
                        description: project.description.substring(0, 1000), // Enforce length limit
                        difficulty: project.difficulty,
                        coreFeatures: project.coreFeatures,
                        conceptsCovered: project.conceptsCovered,
                        startupAngle: project.startupAngle.substring(0, 500),
                        isActive: true,
                        addedBy: 'SYSTEM'
                    }
                });
                console.log(\`   ➕ Added \${project.name}\`);
            } else {
                console.log(\`   🔹 \${project.name} already exists. Updating...\`);
                await prisma.projectCatalogItem.update({
                    where: { id: existing.id },
                    data: {
                        tagline: project.tagline,
                        description: project.description.substring(0, 1000),
                        difficulty: project.difficulty,
                        coreFeatures: project.coreFeatures,
                        conceptsCovered: project.conceptsCovered,
                        startupAngle: project.startupAngle.substring(0, 500),
                    }
                })
            }
        }
    }

    console.log('✨ Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
