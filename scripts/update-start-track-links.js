const fs = require('fs');
const path = require('path');

const streams = [
    'mobile-development',
    'iot-embedded',
    'full-stack-development',
    'devops-cloud',
    'data-science',
    'data-engineering',
    'cybersecurity',
    'ai-ml'
];

streams.forEach(stream => {
    const file = path.join(__dirname, '..', 'app', 'streams', stream, 'page.tsx');
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Check if it already has asChild and Link to avoid double wrapping
        if (!content.includes('<Link href="/enroll">\n                                Start This Track')) {
            content = content.replace(
                /<Button size="lg" className="text-lg px-8 h-14 bg-([^"]+)-600 hover:bg-\1-700 text-white shadow-lg shadow-\1-500\/20">\s*Start This Track <ArrowRight className="ml-2 w-5 h-5" \/>\s*<\/Button>/g,
                `<Button size="lg" className="text-lg px-8 h-14 bg-$1-600 hover:bg-$1-700 text-white shadow-lg shadow-$1-500/20" asChild>\n                            <Link href="/enroll">\n                                Start This Track <ArrowRight className="ml-2 w-5 h-5" />\n                            </Link>\n                        </Button>`
            );
            fs.writeFileSync(file, content);
            console.log(`Updated Start Track CTA in ${stream}`);
        } else {
            console.log(`Start Track CTA already updated in ${stream}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
