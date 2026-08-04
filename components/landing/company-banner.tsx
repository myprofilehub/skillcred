import Image from "next/image";

export function CompanyBanner() {
    const companies = [
        { name: "Zoho", src: "/zoho.png", width: 100 },
        { name: "Amazon", src: "/amazon.png", width: 110 },
        { name: "TCS", src: "/TCS.jpg", width: 100 },
        { name: "Freshworks", src: "/freshworks.jpeg", width: 120 },
        { name: "M2P", src: "/m2p.png", width: 90 },
        { name: "Crayon Data", src: "/Crayon-Data.png", width: 110 },
    ];

    return (
        <section className="py-12 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
                    Trusted by Top Corporate Partners & Institutions
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {companies.map((company) => (
                        <div key={company.name} className="transition-all duration-300">
                            <Image 
                                src={company.src} 
                                alt={`${company.name} Logo`} 
                                width={company.width * 1.5} 
                                height={60} 
                                className="object-contain h-12 md:h-16 w-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
