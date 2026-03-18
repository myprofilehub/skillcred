const fs = require('fs');
const file = 'components/landing/navbar-menu.tsx';
let content = fs.readFileSync(file, 'utf8');

// Match the PAT menu block to insert the new Resources menu right after it
// We look for: {/* 3. PAT */} ... up to the closing </NavigationMenuItem>
const patRegex = /(\{\/\* 3\. PAT \*\/\}[\s\S]*?<\/NavigationMenuItem>)/;

const resourcesMenu = `

                {/* 3.5. RESOURCES */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/library" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold")}>
                            Resources
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>`;

if (patRegex.test(content)) {
    content = content.replace(patRegex, `$1${resourcesMenu}`);
    fs.writeFileSync(file, content);
    console.log("Successfully inserted Resources menu.");
} else {
    console.log("Failed to find PAT block.");
}
