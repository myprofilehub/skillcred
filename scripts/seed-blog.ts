import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const blogPosts = [
  {
    slug: "fullstack-development",
    title: "The Complete Guide to Fullstack Development at SkillCred",
    subtitle: "Master frontend, backend, databases, auth, real-time, and deployment through 4 progressively complex projects.",
    excerpt: "Fullstack Development is SkillCred's flagship stream. Over 8 weeks, you'll build 4 real-world projects — from a personal portfolio SPA to a group capstone — mastering React, Node.js, PostgreSQL, WebSockets, Docker, and CI/CD.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "CI/CD", "WebSockets", "Tailwind CSS"],
    stream: 1,
    readTime: 12,
    coverColor: "indigo",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why Fullstack Development?</h2>
<p>Fullstack developers are the Swiss Army knives of software engineering. They can build a complete product end-to-end — from the user interface down to the database and deployment pipeline. At SkillCred, our Fullstack stream is designed to turn you into exactly that kind of engineer, through hands-on project work — not lectures.</p>

<h2>What You'll Build</h2>
<p>Every student builds <strong>4 progressively complex projects</strong> following our hybrid model: 2 solo projects, 1 pair project, and 1 group capstone.</p>

<h3>Solo Project 1 — Personal Portfolio SPA (Weeks 1–2)</h3>
<p>Your first project is a responsive single-page portfolio built with <strong>React + Tailwind CSS</strong>. You'll implement dynamic project cards, a contact form with validation, dark/light mode toggle, and deploy it to Vercel. This project proves you can build a polished frontend independently.</p>

<h3>Solo Project 2 — RESTful Task Manager (Weeks 3–4)</h3>
<p>Next, you build a full-stack task manager with an <strong>Express.js backend</strong>, PostgreSQL or MongoDB database, <strong>JWT authentication</strong>, CRUD operations with categories and priorities, and a React frontend consuming your own REST API.</p>

<h3>Pair Project — Real-Time Collaborative Notes (Weeks 5–6)</h3>
<p>Working with a partner, you'll build a <strong>WebSocket-powered</strong> collaborative notes app with Redis caching, room-based sessions, live editing indicators, file attachments, and full test coverage. Clear module ownership shows your collaboration skills.</p>

<h3>Group Capstone — Choose 1 of 5 Options (Weeks 7–8)</h3>
<p>Teams of 5 students pick from capstone options like a <strong>Campus Event Hub</strong>, Freelancer Marketplace, Collaborative Study Platform, Health & Fitness Tracker, or E-Commerce Storefront. Each includes Docker deployment, CI/CD, monitoring, and a live demo day.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Foundations & Dev Environment</td><td>HTML5/CSS3/JS ES6+, Git, Node.js, npm, REST, Postman</td></tr>
<tr><td>2</td><td>Frontend with React</td><td>Components, hooks, Context API, React Router, Tailwind, API consumption</td></tr>
<tr><td>3</td><td>Backend & Databases</td><td>Express.js, MongoDB/PostgreSQL, CRUD, middleware, data modeling</td></tr>
<tr><td>4</td><td>Auth, Security & Real-Time</td><td>JWT, OAuth 2.0, RBAC, WebSockets, Socket.io, helmet.js</td></tr>
<tr><td>5</td><td>Advanced Patterns</td><td>Redux/Zustand, Redis caching, file uploads, background jobs</td></tr>
<tr><td>6</td><td>Testing & Code Quality</td><td>Jest, Cypress/Playwright, TDD, ESLint, Swagger docs</td></tr>
<tr><td>7</td><td>DevOps & Deployment</td><td>Docker, CI/CD (GitHub Actions), cloud deploy, monitoring</td></tr>
<tr><td>8</td><td>Capstone Sprint & Demo</td><td>Performance optimization, SEO, accessibility, live demo</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates of the Fullstack stream are prepared for roles like <strong>Full Stack Developer</strong>, <strong>Frontend Engineer</strong>, <strong>Backend Engineer</strong>, <strong>Software Engineer</strong>, and <strong>Technical Co-Founder</strong>. Your portfolio of 4 verified projects, PAT certification score, and contribution matrix gives employers concrete proof of your abilities.</p>
    `.trim(),
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning: From Classical ML to Production Pipelines",
    subtitle: "Build intelligent systems from data preprocessing through model training, NLP transformers, and MLOps deployment.",
    excerpt: "SkillCred's AI & ML stream takes you from Python fundamentals and classical algorithms to deep learning, NLP transformers, and production MLOps — all through building real ML systems.",
    tags: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "HuggingFace", "MLflow", "FastAPI", "Docker"],
    stream: 2,
    readTime: 11,
    coverColor: "emerald",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why AI & Machine Learning?</h2>
<p>AI/ML engineers are among the most in-demand roles in tech. But most bootcamps teach theory without production context. SkillCred's AI & ML stream is different — you'll build real ML pipelines, train models on custom datasets, fine-tune transformers, and deploy everything with MLOps best practices.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Predictive Analytics Dashboard (Weeks 1–2)</h3>
<p>Build an end-to-end ML pipeline: dataset selection, EDA, feature engineering, training 3+ algorithms, hyperparameter tuning with Optuna, SHAP explainability, and a <strong>Streamlit dashboard</strong>. Each student picks a different dataset and problem domain.</p>

<h3>Solo Project 2 — Image Classification System (Weeks 3–4)</h3>
<p>Build a CNN-based image classifier with custom dataset, <strong>transfer learning (ResNet/EfficientNet)</strong>, data augmentation, training visualization, confusion matrix analysis, and a Gradio web interface.</p>

<h3>Pair Project — NLP Text Intelligence Engine (Weeks 5–6)</h3>
<p>Fine-tune a <strong>HuggingFace transformer</strong> for multi-class text classification with custom training pipeline, evaluation suite, and FastAPI endpoint. One partner handles data pipeline + model training, the other builds API + frontend.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Smart Attendance System (face recognition), Crop Disease Detector, Resume Screening Engine, Fake News Detector, or Medical Image Analyzer. All include MLflow tracking, Docker deployment, and production monitoring.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Python for ML & Math</td><td>NumPy, Pandas, Matplotlib, statistics, calculus intuition</td></tr>
<tr><td>2</td><td>Classical ML</td><td>Regression, Trees, SVM, KNN, K-Means, Scikit-learn pipelines</td></tr>
<tr><td>3</td><td>Feature Engineering</td><td>SMOTE, GridSearch, Optuna, XGBoost, SHAP/LIME</td></tr>
<tr><td>4</td><td>Deep Learning</td><td>Neural networks, TensorFlow/PyTorch, CNNs, transfer learning</td></tr>
<tr><td>5</td><td>NLP & Transformers</td><td>Tokenization, Word2Vec, RNNs/LSTMs, HuggingFace fine-tuning</td></tr>
<tr><td>6</td><td>Advanced Deep Learning</td><td>Object detection (YOLO), GANs, RL concepts, GPU optimization</td></tr>
<tr><td>7</td><td>MLOps & Production</td><td>MLflow/W&B, FastAPI serving, Docker, monitoring, drift detection</td></tr>
<tr><td>8</td><td>Capstone Sprint & Demo</td><td>Pipeline assembly, quantization, edge deployment, live demo</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>ML Engineer</strong>, <strong>Data Scientist</strong>, <strong>AI Developer</strong>, <strong>NLP Engineer</strong>, and <strong>MLOps Engineer</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity: Offensive & Defensive Security Through Real Labs",
    subtitle: "Learn ethical hacking, penetration testing, SIEM, forensics, and cloud security through hands-on red/blue team exercises.",
    excerpt: "SkillCred's Cybersecurity stream covers the full security stack — from network reconnaissance and web app exploitation to SIEM operations, incident response, and cloud security architecture.",
    tags: ["Python", "Nmap", "Burp Suite", "Metasploit", "Wireshark", "SIEM", "ELK Stack", "AWS Security"],
    stream: 3,
    readTime: 10,
    coverColor: "rose",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why Cybersecurity?</h2>
<p>With cyber threats growing exponentially, security professionals are in critical demand. SkillCred's Cybersecurity stream trains you in both offensive and defensive security — you'll think like a hacker and defend like a SOC analyst, all through building real security tools and systems.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Network Reconnaissance Toolkit (Weeks 1–2)</h3>
<p>Build a Python toolkit for port scanning, service enumeration, OS fingerprinting, and vulnerability mapping with <strong>Scapy/Nmap integration</strong> and HTML report generation.</p>

<h3>Solo Project 2 — Web Vulnerability Scanner (Weeks 3–4)</h3>
<p>Build an automated scanner that tests for <strong>SQLi, XSS, CSRF, directory traversal</strong> with severity-rated reports and remediation guidance.</p>

<h3>Pair Project — SIEM & IR Dashboard (Weeks 5–6)</h3>
<p>Build an ELK-based SIEM ingesting logs, with <strong>correlation rules</strong> for brute force/port scans/anomalies, alert dashboard, and IR playbook generator.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Network Intrusion Detection System, Secure Password Manager, Phishing Detection Platform, CTF Challenge Platform, or SOC Simulator.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Security Foundations</td><td>CIA triad, TCP/IP, Wireshark, Nmap, OSI security</td></tr>
<tr><td>2</td><td>Linux Security & Scripting</td><td>Linux CLI, CIS hardening, bash/Python scripting</td></tr>
<tr><td>3</td><td>Web Application Security</td><td>OWASP Top 10, Burp Suite, WAF, secure coding</td></tr>
<tr><td>4</td><td>Penetration Testing</td><td>PTES, Metasploit, privilege escalation, reporting</td></tr>
<tr><td>5</td><td>Crypto & Defense</td><td>Encryption, PKI, SIEM (Splunk/ELK), IDS (Snort)</td></tr>
<tr><td>6</td><td>Incident Response</td><td>IR lifecycle, digital forensics, malware analysis</td></tr>
<tr><td>7</td><td>Cloud Security</td><td>AWS/Azure IAM, container security, compliance</td></tr>
<tr><td>8</td><td>CTF & Demo Day</td><td>Red/blue team exercises, defense hardening, CTF</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>Security Analyst</strong>, <strong>Penetration Tester</strong>, <strong>SOC Analyst</strong>, <strong>Security Engineer</strong>, and <strong>Cloud Security Specialist</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "data-engineering",
    title: "Data Engineering: Build End-to-End Data Pipelines",
    subtitle: "Master SQL, Spark, Kafka, Airflow, dbt, and cloud data platforms through production-grade pipeline projects.",
    excerpt: "SkillCred's Data Engineering stream teaches you to build the infrastructure that powers data-driven decisions — from batch ETL pipelines to real-time streaming systems on cloud platforms.",
    tags: ["SQL", "Python", "Apache Spark", "Kafka", "Airflow", "dbt", "AWS", "PostgreSQL"],
    stream: 4,
    readTime: 10,
    coverColor: "amber",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why Data Engineering?</h2>
<p>Every AI model, every dashboard, every business insight depends on clean, reliable data pipelines. Data engineers are the architects who build them. SkillCred's Data Engineering stream trains you across the modern data stack in 8 intense, project-driven weeks.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Multi-Source Data Extractor (Weeks 1–2)</h3>
<p>Build a Python pipeline extracting data from 3+ sources (APIs, CSVs, databases), cleaning with Pandas, and loading into a <strong>PostgreSQL star schema</strong> with quality checks.</p>

<h3>Solo Project 2 — Airflow-Orchestrated ETL Pipeline (Weeks 3–4)</h3>
<p>Build an <strong>Airflow DAG</strong> orchestrating extract → Spark transform → validate (Great Expectations) → load, with retry logic and alerting.</p>

<h3>Pair Project — Real-Time Streaming Dashboard (Weeks 5–6)</h3>
<p>Build a <strong>Kafka → Spark Structured Streaming → dbt-managed warehouse → Grafana</strong> dashboard. One partner handles ingestion + streaming, the other builds warehouse + visualization.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Weather Analytics Platform, E-Commerce Data Warehouse, Social Sentiment Pipeline, Student Analytics Data Lake, or Log Analytics Engine.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>SQL Mastery & Modeling</td><td>CTEs, window functions, dimensional modeling, EXPLAIN</td></tr>
<tr><td>2</td><td>Python for DE</td><td>OOP, file formats (Parquet, Avro), APIs, Pandas, pytest</td></tr>
<tr><td>3</td><td>ETL/ELT & Orchestration</td><td>Airflow DAGs, Great Expectations, CDC, scheduling</td></tr>
<tr><td>4</td><td>Big Data with Spark</td><td>RDDs, DataFrames, SparkSQL, PySpark, optimization</td></tr>
<tr><td>5</td><td>Streaming & Real-Time</td><td>Kafka, Connect, Schema Registry, Structured Streaming</td></tr>
<tr><td>6</td><td>Warehousing & dbt</td><td>Kimball vs Inmon, dbt models, testing, BI integration</td></tr>
<tr><td>7</td><td>Cloud Data Platforms</td><td>AWS S3/Glue/Redshift, BigQuery, Delta Lake, governance</td></tr>
<tr><td>8</td><td>Capstone Pipeline & Demo</td><td>E2E assembly, monitoring, data lineage, documentation</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>Data Engineer</strong>, <strong>ETL Developer</strong>, <strong>Analytics Engineer</strong>, <strong>Data Platform Engineer</strong>, and <strong>Big Data Engineer</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "devops-cloud",
    title: "DevOps & Cloud: Automate, Deploy, and Scale Infrastructure",
    subtitle: "Master Docker, Kubernetes, Terraform, CI/CD, and SRE practices through real infrastructure projects.",
    excerpt: "SkillCred's DevOps & Cloud stream teaches you to automate infrastructure, build CI/CD pipelines, orchestrate with Kubernetes, and practice SRE — all through hands-on infra projects.",
    tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "AWS", "Helm", "Prometheus", "ArgoCD"],
    stream: 5,
    readTime: 10,
    coverColor: "violet",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why DevOps & Cloud?</h2>
<p>DevOps engineers bridge the gap between development and operations, enabling teams to ship faster and more reliably. With cloud-native architectures becoming the standard, DevOps skills are essential infrastructure for modern tech companies.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Dockerized Multi-Service App (Weeks 1–2)</h3>
<p>Build a multi-container application (frontend + API + DB + cache) with <strong>Docker Compose</strong>, multi-stage builds, health checks, and Makefile automation.</p>

<h3>Solo Project 2 — CI/CD Pipeline with IaC (Weeks 3–4)</h3>
<p>Build a <strong>GitHub Actions pipeline</strong> (build, test, scan, deploy) deploying to <strong>Terraform-provisioned</strong> infrastructure with Ansible configuration and Slack notifications.</p>

<h3>Pair Project — K8s GitOps Deployment (Weeks 5–6)</h3>
<p>Build a <strong>Kubernetes deployment</strong> with Helm charts, ArgoCD GitOps, HPA auto-scaling, Ingress + TLS, and RBAC policies.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Self-Service Deploy Platform, Infrastructure Monitoring Suite, Multi-Env IaC Pipeline, Container Security Platform, or GitOps Microservices Platform.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Linux, Networking & Git</td><td>Linux admin, bash, networking, SSH, Git workflows</td></tr>
<tr><td>2</td><td>Containers & Docker</td><td>Images, volumes, Compose, multi-stage, registries</td></tr>
<tr><td>3</td><td>CI/CD Pipelines</td><td>GitHub Actions, Jenkins, testing in pipelines</td></tr>
<tr><td>4</td><td>Infrastructure as Code</td><td>Terraform, AWS/GCP, Ansible, Vault</td></tr>
<tr><td>5</td><td>Kubernetes Core</td><td>Pods, services, deployments, ConfigMaps, Helm</td></tr>
<tr><td>6</td><td>Advanced K8s & GitOps</td><td>HPA/VPA, Ingress, RBAC, ArgoCD, service mesh</td></tr>
<tr><td>7</td><td>Monitoring & SRE</td><td>Prometheus + Grafana, ELK, SLIs/SLOs, chaos eng</td></tr>
<tr><td>8</td><td>Capstone Infra & Demo</td><td>Security hardening, cost optimization, DR, load testing</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>DevOps Engineer</strong>, <strong>Cloud Engineer</strong>, <strong>SRE</strong>, <strong>Platform Engineer</strong>, and <strong>Infrastructure Engineer</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "mobile-development",
    title: "Mobile Development: Build Cross-Platform Apps for Production",
    subtitle: "Master React Native or Flutter, device APIs, Firebase, and app store deployment through real mobile apps.",
    excerpt: "SkillCred's Mobile Development stream takes you from UI components to app store deployment — building 4 real mobile applications with React Native/Flutter, Firebase, and native device APIs.",
    tags: ["React Native", "Flutter", "Firebase", "Redux", "Jest", "Detox", "iOS", "Android"],
    stream: 6,
    readTime: 10,
    coverColor: "cyan",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why Mobile Development?</h2>
<p>Mobile-first is no longer a strategy — it's the default. Over 60% of web traffic comes from mobile devices, and businesses need engineers who can ship polished mobile experiences. SkillCred's Mobile stream teaches cross-platform development through progressively complex app projects.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Personal Task Manager (Weeks 1–2)</h3>
<p>Build a multi-screen task app with categories, due dates, priority sorting, search/filter, <strong>local persistence</strong>, and animated transitions.</p>

<h3>Solo Project 2 — Location-Based Reminder App (Weeks 3–4)</h3>
<p>Build GPS-triggered reminders with maps, geofencing, <strong>push notifications</strong>, Firebase sync, and biometric lock.</p>

<h3>Pair Project — Live Poll & Voting App (Weeks 5–6)</h3>
<p>Build real-time polling with <strong>WebSocket-powered live results</strong>, animated charts, auth, room sessions, and full test coverage.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Campus Navigator (AR), Fitness Challenge App, Local Food Discovery, Language Learning Companion, or Smart Expense Tracker.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Mobile Foundations & UI</td><td>RN/Flutter, components, Flexbox, navigation, Material Design</td></tr>
<tr><td>2</td><td>State Management & Data</td><td>Redux/Zustand, API integration, AsyncStorage, forms</td></tr>
<tr><td>3</td><td>Device APIs & Native</td><td>Camera, geolocation, maps, push notifications, biometric</td></tr>
<tr><td>4</td><td>Backend & Firebase</td><td>Firestore, Auth, Storage, Functions, offline-first</td></tr>
<tr><td>5</td><td>Real-Time & Advanced UI</td><td>WebSockets, animations, custom components, a11y</td></tr>
<tr><td>6</td><td>Performance & Testing</td><td>Profiling, lazy loading, Jest, Detox/Appium E2E</td></tr>
<tr><td>7</td><td>App Store & Distribution</td><td>Signing, submission, OTA updates, analytics, Sentry</td></tr>
<tr><td>8</td><td>Capstone Polish & Demo</td><td>Edge cases, performance audit, store metadata, demo</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>Mobile Developer</strong>, <strong>React Native Engineer</strong>, <strong>Flutter Developer</strong>, <strong>iOS/Android Developer</strong>, and <strong>Mobile Lead</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "iot-embedded",
    title: "IoT & Embedded Systems: Hardware Meets Cloud Intelligence",
    subtitle: "Build connected embedded systems with ESP32, sensors, MQTT, edge AI, and cloud dashboards.",
    excerpt: "SkillCred's IoT & Embedded stream teaches you to build connected hardware systems — from sensor interfacing and wireless communication to edge ML, cloud dashboards, and fleet management.",
    tags: ["ESP32", "Arduino", "MQTT", "TinyML", "Node-RED", "InfluxDB", "Grafana", "C/C++"],
    stream: 7,
    readTime: 10,
    coverColor: "lime",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why IoT & Embedded Systems?</h2>
<p>The IoT market is projected to reach $1.5 trillion by 2030. Engineers who can bridge hardware and software — building from sensor to cloud — are uniquely valuable. SkillCred's IoT stream gives you that rare full-stack hardware/software skillset.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Multi-Sensor Data Logger (Weeks 1–2)</h3>
<p>Build an ESP32 station reading temperature, humidity, light, and motion via <strong>I2C/SPI</strong>, with OLED display, SD card logging, and serial plotting.</p>

<h3>Solo Project 2 — MQTT-Connected Weather Station (Weeks 3–4)</h3>
<p>Build a wireless weather station publishing via <strong>MQTT to cloud</strong> (ThingSpeak/InfluxDB), with Grafana dashboard, BLE mobile readout, and threshold alerts.</p>

<h3>Pair Project — Smart Room Controller (Weeks 5–6)</h3>
<p>Build an edge-intelligent controller with <strong>TinyML occupancy detection</strong>, Node-RED automation, OTA updates, and multi-device MQTT coordination.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Campus Environment Monitor, Automated Plant Care, Smart Parking System, Wearable Health Monitor, or Home Energy Monitor.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Embedded Fundamentals</td><td>ESP32/Arduino, GPIO, PWM, C/C++, breadboarding, UART</td></tr>
<tr><td>2</td><td>Sensors & Protocols</td><td>Temp, humidity, ultrasonic, PIR, I2C, SPI, OLED</td></tr>
<tr><td>3</td><td>Wireless Communication</td><td>Wi-Fi, HTTP on MCU, BLE, MQTT, mesh networking</td></tr>
<tr><td>4</td><td>IoT Cloud Platforms</td><td>AWS IoT Core, ThingSpeak, InfluxDB, Grafana</td></tr>
<tr><td>5</td><td>Edge Computing & TinyML</td><td>TF Lite Micro, on-device inference, anomaly detection</td></tr>
<tr><td>6</td><td>Automation & Reliability</td><td>Node-RED, OTA firmware, watchdog timers, LoRa</td></tr>
<tr><td>7</td><td>Security & System Design</td><td>TLS, secure boot, PCB basics (KiCad), enclosures</td></tr>
<tr><td>8</td><td>Capstone Integration & Demo</td><td>E2E testing, circuit diagrams, API docs, hardware demo</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>Embedded Engineer</strong>, <strong>IoT Developer</strong>, <strong>Firmware Engineer</strong>, <strong>Hardware-Software Developer</strong>, and <strong>Edge AI Engineer</strong> roles.</p>
    `.trim(),
  },
  {
    slug: "data-science-analytics",
    title: "Data Science & Analytics: Turn Data Into Decisions",
    subtitle: "Master EDA, statistics, visualization, predictive modeling, and analytics storytelling through real datasets.",
    excerpt: "SkillCred's Data Science & Analytics stream teaches you to extract insights from data using Python, statistics, machine learning, and interactive dashboards — producing analysis that drives real business decisions.",
    tags: ["Python", "Pandas", "Plotly", "Streamlit", "Scikit-learn", "SQL", "Tableau", "Statistics"],
    stream: 8,
    readTime: 10,
    coverColor: "fuchsia",
    published: true,
    publishedAt: new Date(),
    content: `
<h2>Why Data Science & Analytics?</h2>
<p>Data-driven decision making is the backbone of modern business strategy. Data scientists and analysts who can extract, visualize, and communicate insights are essential to every industry. SkillCred's Data Science stream builds these skills through real-world analysis projects.</p>

<h2>What You'll Build</h2>

<h3>Solo Project 1 — Exploratory Data Analysis Report (Weeks 1–2)</h3>
<p>Conduct comprehensive EDA of a real-world dataset with statistical tests, correlation analysis, distribution fitting, and a polished <strong>Jupyter narrative</strong>. Each student selects unique research questions.</p>

<h3>Solo Project 2 — Interactive Analytics Dashboard (Weeks 3–4)</h3>
<p>Build a <strong>Streamlit/Dash dashboard</strong> with Plotly/Altair/Folium visualizations, user filters, drill-downs, and a predictive model for what-if scenarios.</p>

<h3>Pair Project — Predictive Analytics Suite (Weeks 5–6)</h3>
<p>Build a multi-model project: clustering for segmentation + time series forecasting + text sentiment, all integrated into a single <strong>Streamlit app</strong>.</p>

<h3>Group Capstone Options (Weeks 7–8)</h3>
<p>Choose from: Student Performance Dashboard, City Transportation Analysis, Customer Segmentation Engine, Healthcare Cost Predictor, or Social Media Trend Analyzer.</p>

<h2>8-Week Curriculum Overview</h2>
<table>
<thead><tr><th>Week</th><th>Phase</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>1</td><td>Python & EDA</td><td>NumPy, Pandas, data cleaning, EDA, descriptive stats</td></tr>
<tr><td>2</td><td>Statistics & Probability</td><td>Distributions, hypothesis testing, A/B testing, Bayesian</td></tr>
<tr><td>3</td><td>Visualization & Storytelling</td><td>Plotly, Altair, Folium, Streamlit/Dash, chart design</td></tr>
<tr><td>4</td><td>Regression & Classification</td><td>Linear/logistic regression, Decision Trees, XGBoost</td></tr>
<tr><td>5</td><td>Clustering & Time Series</td><td>K-Means, DBSCAN, ARIMA, Prophet, anomaly detection</td></tr>
<tr><td>6</td><td>Advanced Analytics</td><td>Text analytics, TF-IDF, recommendations, PCA/t-SNE</td></tr>
<tr><td>7</td><td>Big Data & SQL Analytics</td><td>Window functions, CTEs, PySpark, cloud analytics</td></tr>
<tr><td>8</td><td>Capstone Analytics & Demo</td><td>E2E lifecycle, stakeholder storytelling, portfolio, demo</td></tr>
</tbody>
</table>

<h2>Career Outcomes</h2>
<p>Graduates are prepared for <strong>Data Analyst</strong>, <strong>Data Scientist</strong>, <strong>Business Analyst</strong>, <strong>Analytics Engineer</strong>, and <strong>BI Developer</strong> roles.</p>
    `.trim(),
  },
];

async function main() {
  console.log("🌱 Seeding 8 blog posts...");
  
  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  ⏭️  Skipping "${post.title}" (already exists)`);
      continue;
    }
    
    await prisma.blogPost.create({ data: post });
    console.log(`  ✅ Created "${post.title}"`);
  }
  
  console.log("✨ Done! All blog posts seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding blog posts:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
