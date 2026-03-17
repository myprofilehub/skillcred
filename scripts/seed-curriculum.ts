import 'dotenv/config';
import { prisma } from '../lib/db';

const tracks = [
  {
    title: 'Full Stack Development',
    slug: 'full-stack',
    description: 'Learn modern web development with React, Node.js, and Databases.',
    icon: '💻',
    projects: [
      {
        name: 'ShopSync',
        tagline: 'E-commerce platform with real-time inventory',
        difficulty: 1,
        coreFeatures: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Checkout Flow'],
        startupAngle: 'Local business digitization'
      },
      {
        name: 'TaskMaster Pro',
        tagline: 'Advanced project management dashboard',
        difficulty: 2,
        coreFeatures: ['Kanban Boards', 'Team Collaboration', 'Role-based Access', 'Activity Tracking'],
        startupAngle: 'SaaS for remote teams'
      },
      {
        name: 'DevFlow Hub',
        tagline: 'Developer portfolio & blogging engine',
        difficulty: 3,
        coreFeatures: ['Markdown Editor', 'SEO Optimization', 'Analytics Dashboard', 'API Integrations'],
        startupAngle: 'Developer personal branding tool'
      },
      {
        name: 'SaaS Multi-tenant Platform',
        tagline: 'Production-ready SaaS boilerplate',
        difficulty: 4,
        coreFeatures: ['Subscription Billing', 'Tenant Isolation', 'Custom Domains', 'Admin Dashboard'],
        startupAngle: 'White-label SaaS infrastructure'
      }
    ]
  },
  {
    title: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Build intelligent applications using Python and GenAI models.',
    icon: '🤖',
    projects: [
      {
        name: 'Sentiment Analyzer API',
        tagline: 'Text analysis service for social media',
        difficulty: 1,
        coreFeatures: ['REST API', 'Text Preprocessing', 'Model Inference', 'Rate Limiting'],
        startupAngle: 'Brand monitoring microservice'
      },
      {
        name: 'ImageGen Assistant',
        tagline: 'Prompt engineering and image generation',
        difficulty: 2,
        coreFeatures: ['OpenAI Integration', 'Prompt Optimization', 'Image Gallery', 'User Quotas'],
        startupAngle: 'Creative asset generation tool'
      },
      {
        name: 'AuraBot - Smart Chatbot',
        tagline: 'Context-aware customer support agent',
        difficulty: 3,
        coreFeatures: ['RAG Pipeline', 'Vector Database', 'Conversational Memory', 'Human Handoff'],
        startupAngle: 'B2B Customer Support Automation'
      },
      {
        name: 'Predictive Analytics Engine',
        tagline: 'Time-series forecasting model',
        difficulty: 4,
        coreFeatures: ['Data Pipeline', 'Feature Engineering', 'Model Deployment', 'Monitoring Dashboard'],
        startupAngle: 'Financial or Supply Chain forecasting'
      }
    ]
  },
  {
    title: 'Data Science',
    slug: 'data-science',
    description: 'Analyze complex data and build data-driven products.',
    icon: '📊',
    projects: [
      {
        name: 'DataVizer',
        tagline: 'Interactive data visualization dashboard',
        difficulty: 1,
        coreFeatures: ['Data Upload', 'Chart Generation', 'Filtering', 'Export Reports'],
        startupAngle: 'SME Analytics Dashboard'
      },
      {
        name: 'Customer Churn Predictor',
        tagline: 'Identify identifying at-risk customers',
        difficulty: 2,
        coreFeatures: ['Exploratory Data Analysis', 'Classification Model', 'Feature Importance', 'API Endpoint'],
        startupAngle: 'Retention tool for SaaS companies'
      },
      {
        name: 'Recommendation System',
        tagline: 'Personalized product recommendations',
        difficulty: 3,
        coreFeatures: ['Collaborative Filtering', 'Content-based Filtering', 'A/B Testing Framework', 'Scalable Inference'],
        startupAngle: 'E-commerce personalization API'
      },
      {
        name: 'Real-Time Social Intelligence',
        tagline: 'Live sentiment tracking and trend prediction',
        difficulty: 4,
        coreFeatures: ['Streaming Data Ingestion', 'Real-time NLP', 'Alerting System', 'Executive Dashboard'],
        startupAngle: 'Enterprise brand monitoring platform'
      }
    ]
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Learn offensive & defensive security, cryptography, and network defense.',
    icon: '🔐',
    projects: [
      {
        name: 'Automated Network Security Auditor',
        tagline: 'Security scanning and auditing tool',
        difficulty: 1,
        coreFeatures: ['Multi-threaded Port Scanner', 'OS Fingerprinting', 'Vulnerability Mapping', 'Report Generation'],
        startupAngle: 'SMB network security compliance'
      },
      {
        name: 'Web Application Penetration Testing Toolkit',
        tagline: 'Automated vulnerability scanner for web apps',
        difficulty: 2,
        coreFeatures: ['SQL Injection Scanner', 'XSS Scanner', 'HTTP Header Analyzer', 'Session Management Tester'],
        startupAngle: 'B2B SaaS security scanner'
      },
      {
        name: 'SIEM & Incident Response Command Center',
        tagline: 'Centralized security event monitoring',
        difficulty: 3,
        coreFeatures: ['Log Ingestion', 'Correlation Rules Engine', 'Alert Generation', 'IR Playbooks'],
        startupAngle: 'Enterprise security operations tool'
      },
      {
        name: 'Zero-Trust Network Access Controller',
        tagline: 'Identity and device-based network access',
        difficulty: 4,
        coreFeatures: ['Device Posture Assessment', 'Identity Verification', 'Micro-segmentation', 'Continuous Authorization'],
        startupAngle: 'Modern zero-trust security architecture'
      }
    ]
  },
  {
    title: 'Data Engineering',
    slug: 'data-engineering',
    description: 'Build scalable data pipelines, warehouses, and streaming platforms.',
    icon: '🛢️',
    projects: [
      {
        name: 'Multi-Source Data Integration Pipeline',
        tagline: 'ETL pipeline from various data sources',
        difficulty: 1,
        coreFeatures: ['Data Extraction', 'Schema Inference', 'Data Cleaning', 'Incremental Load'],
        startupAngle: 'Data integration SaaS'
      },
      {
        name: 'Orchestrated ETL with Airflow & Spark',
        tagline: 'Complex data workflows and transformations',
        difficulty: 2,
        coreFeatures: ['Airflow DAGs', 'PySpark Transformations', 'Data Validation', 'SLA Monitoring'],
        startupAngle: 'Data workflow automation'
      },
      {
        name: 'Real-Time Streaming Analytics Platform',
        tagline: 'Stream processing with Kafka and Spark',
        difficulty: 3,
        coreFeatures: ['Kafka Producer/Consumer', 'Spark Structured Streaming', 'dbt Data Warehouse', 'Real-time Dashboards'],
        startupAngle: 'Real-time data infrastructure'
      },
      {
        name: 'Enterprise Data Platform as a Service',
        tagline: 'Self-service data infrastructure',
        difficulty: 4,
        coreFeatures: ['Self-service Connectors', 'Data Catalog', 'Role-based Access', 'Data Quality Monitoring'],
        startupAngle: 'Data-infrastructure-as-a-service provider'
      }
    ]
  },
  {
    title: 'DevOps & Cloud',
    slug: 'devops-cloud',
    description: 'Automate deployments, manage infrastructure, and ensure reliability.',
    icon: '☁️',
    projects: [
      {
        name: 'Production-Ready Container Platform',
        tagline: 'Containerized application deployment',
        difficulty: 1,
        coreFeatures: ['Docker Compose', 'Nginx Reverse Proxy', 'Image Vulnerability Scanning', 'Centralized Logging'],
        startupAngle: 'Container hosting platform'
      },
      {
        name: 'Full CI/CD Pipeline with Infrastructure as Code',
        tagline: 'Automated build, test, and deploy workflows',
        difficulty: 2,
        coreFeatures: ['GitHub Actions', 'Terraform Modules', 'Ansible Playbooks', 'Secrets Management'],
        startupAngle: 'DevOps automation consulting'
      },
      {
        name: 'Kubernetes Platform with GitOps & Service Mesh',
        tagline: 'Scalable container orchestration',
        difficulty: 3,
        coreFeatures: ['Helm Charts', 'ArgoCD GitOps', 'HPA Auto-scaling', 'Prometheus Monitoring'],
        startupAngle: 'Platform engineering infrastructure'
      },
      {
        name: 'Internal Developer Platform (IDP)',
        tagline: 'Self-service environment provisioning',
        difficulty: 4,
        coreFeatures: ['Service Catalog', 'Environment Provisioning', 'One-click Deployment', 'Cost Tracking'],
        startupAngle: 'Developer experience SaaS'
      }
    ]
  },
  {
    title: 'Mobile Development',
    slug: 'mobile-development',
    description: 'Build native and cross-platform mobile applications.',
    icon: '📱',
    projects: [
      {
        name: 'Smart Personal Finance Tracker',
        tagline: 'Manage spending and budgets on mobile',
        difficulty: 1,
        coreFeatures: ['Transaction Entry', 'Category Management', 'Offline Persistence', 'Animated Charts'],
        startupAngle: 'Personal finance utility'
      },
      {
        name: 'Geo-Aware Social Discovery App',
        tagline: 'Location-based social networking',
        difficulty: 2,
        coreFeatures: ['Firebase Auth', 'Interactive Map', 'Geofencing', 'Push Notifications'],
        startupAngle: 'Hyperlocal social platform'
      },
      {
        name: 'Real-Time Social Polling Platform',
        tagline: 'Live voting and polling application',
        difficulty: 3,
        coreFeatures: ['Real-time Vote Streaming', 'Gesture-based Interactions', 'Room-based Sessions', 'Animations'],
        startupAngle: 'Interactive audience engagement tool'
      },
      {
        name: 'Smart Campus Super App',
        tagline: 'All-in-one university companion app',
        difficulty: 4,
        coreFeatures: ['Indoor Navigation', 'Food Court Ordering', 'Event Discovery', 'Attendance Tracking'],
        startupAngle: 'B2B University SaaS app'
      }
    ]
  },
  {
    title: 'IoT & Embedded Systems',
    slug: 'iot-embedded',
    description: 'Program hardware, sensors, and internet-connected devices.',
    icon: '🔌',
    projects: [
      {
        name: 'Intelligent Multi-Sensor Environmental Station',
        tagline: 'Hardware environment monitoring',
        difficulty: 1,
        coreFeatures: ['Sensor Interfacing', 'OLED Display UI', 'SD Card Data Logging', 'Power Optimization'],
        startupAngle: 'Environmental monitoring hardware'
      },
      {
        name: 'Cloud-Connected Smart Monitor with MQTT',
        tagline: 'IoT device with cloud connectivity',
        difficulty: 2,
        coreFeatures: ['MQTT Protocol', 'AWS IoT Core', 'OTA Firmware Updates', 'Grafana Dashboards'],
        startupAngle: 'Industrial equipment monitor'
      },
      {
        name: 'Edge AI Vision Node',
        tagline: 'On-device machine learning for vision',
        difficulty: 3,
        coreFeatures: ['TensorFlow Lite Micro', 'Object Detection', 'Edge Processing', 'Low-power State Management'],
        startupAngle: 'Smart security camera node'
      },
      {
        name: 'Fleet Tracking & Telemetry Hub',
        tagline: 'Vehicle tracking and analytics',
        difficulty: 4,
        coreFeatures: ['GPS Tracking', 'Cellular Connectivity', 'Real-time Telemetry', 'Geofencing Alerts'],
        startupAngle: 'Logistics fleet management'
      }
    ]
  }
];

async function main() {
  console.log('Clearing existing data...');
  // Be careful with deleteMany in production, but needed here for a clean seed
  await prisma.projectCatalogItem.deleteMany({});
  
  console.log('Seeding curriculum data based on SkillCred Projects...\\n');

  for (const trackData of tracks) {
    // 1. Upsert Track
    const track = await prisma.track.upsert({
      where: { slug: trackData.slug },
      update: {
        title: trackData.title,
        description: trackData.description,
        icon: trackData.icon,
      },
      create: {
        title: trackData.title,
        slug: trackData.slug,
        description: trackData.description,
        icon: trackData.icon,
      }
    });

    console.log(`Created/Updated Track: ${track.title}`);

    // 2. Add Projects to Track
    for (const project of trackData.projects) {
      await prisma.projectCatalogItem.create({
        data: {
          trackId: track.id,
          name: project.name,
          tagline: project.tagline,
          difficulty: project.difficulty,
          coreFeatures: project.coreFeatures,
          startupAngle: project.startupAngle,
          description: `A comprehensive ${project.difficulty === 4 ? 'capstone' : 'guided'} project for the ${track.title} stream teaching ${project.coreFeatures.join(', ')}.`,
          isActive: true
        }
      });
      console.log(`  └─ Added Project: ${project.name}`);
    }
  }

  console.log('\\n✅ Seeding complete!');
}

main()
  .catch(e => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
