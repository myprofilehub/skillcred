const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seed() {
  const mdPath = path.join(process.cwd(), 'public', 'RAG_Assignments_3Day.md');
  const content = fs.readFileSync(mdPath, 'utf8');

  // Split content by the header
  const assignmentsText = content.split('# The 20 assignments')[1];
  
  const regex = /\*\*(\d{2}) — (.*?)\*\*\n\*Corpus:\* (.*?)\. \*Ask:\* "(.*?)"\n\*Constraint:\* ([\s\S]*?)(?=\n\n\*\*|\n\n---|$)/g;

  let match;
  let count = 0;
  
  // Mapping of project number to zip file based on the synthetic zip contents
  const syntheticZips = {
    "01": "01_rental_agreements.zip",
    "03": "03_medicine_leaflets.zip",
    "04": "04_college_regulations.zip",
    "05": "05_restaurant_menus.zip",
    "07": "07_insurance_policies.zip",
    "08": "08_league_rules.zip",
    "10": "10_bank_faqs.zip",
    "11": "11_hr_policies.zip",
    "12": "12_lecture_transcript.zip",
    "14": "14_product_reviews.zip",
    "16": "16_recipes.zip",
    "17": "17_retailer_policies.zip",
    "18": "18_textbook_chapters.zip",
    "19": "19_devops_runbooks.zip",
    "20": "20_audio_drama.zip"
  };

  while ((match = regex.exec(assignmentsText)) !== null) {
    const projectNo = parseInt(match[1], 10);
    const title = match[2].trim();
    const corpusSummary = match[3].trim();
    const useCase = match[4].trim();
    const constraintText = match[5].trim().replace(/\n/g, ' ');

    const corpusObject = syntheticZips[match[1]] || "External_Corpora_Download_Guide.md";

    await prisma.rAGProject.upsert({
      where: { projectNo },
      update: {
        title,
        corpusSummary,
        useCase,
        constraintText,
        corpusObject
      },
      create: {
        projectNo,
        title,
        corpusSummary,
        useCase,
        constraintText,
        corpusObject
      }
    });
    count++;
  }

  console.log(`Successfully seeded ${count} projects!`);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
