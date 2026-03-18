const fs = require('fs');

const filesToFix = [
  'app/streams/full-stack-development/page.tsx',
  'app/streams/ai-ml/page.tsx',
  'app/streams/cybersecurity/page.tsx',
  'app/streams/data-engineering/page.tsx',
  'app/streams/data-science/page.tsx',
  'app/streams/devops-cloud/page.tsx',
  'app/streams/iot-embedded/page.tsx',
  'app/streams/mobile-development/page.tsx',
];

for (const file of filesToFix) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        continue;
    }
    let content = fs.readFileSync(file, 'utf8');
    
    // The target class replacements
    const oldClass = "grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-8 lg:gap-12 items-start";
    const newClass = "grid lg:grid-cols-2 gap-12 lg:gap-16 items-start";

    // Also replace the padding on the right panel
    const oldPadding = "lg:border-l border-white/10 lg:pl-8 xl:pl-12";
    const newPadding = "lg:border-l border-white/10 lg:pl-16";

    let changed = false;
    
    if (content.includes(oldClass)) {
        content = content.replace(oldClass, newClass);
        changed = true;
    }
    
    if (content.includes(oldPadding)) {
        content = content.replace(oldPadding, newPadding);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
}
