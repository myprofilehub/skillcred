
const isFreeUser = (email: string) => {
    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com"];
    const domain = email.split('@')[1];
    return publicDomains.includes(domain);
};

console.log("Testing mgmags25@gmail.com:");
const isFree = isFreeUser("mgmags25@gmail.com");
console.log("Is Free User?", isFree);

if (isFree) {
    console.log("Redirect should be: /");
} else {
    console.log("Redirect should be: /dashboard");
}
