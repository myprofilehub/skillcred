import "dotenv/config";
import { registerUser } from "@/actions/auth";

// Polyfill FormData if needed (though usually available in Node 20+)
// If this fails, I might need to import it or mock it.

async function main() {
    console.log("Testing registerUser action directly...");

    const formData = new FormData();
    formData.append("username", "testscriptuser");
    formData.append("email", "testscript@example.com");
    formData.append("password", "password123");
    formData.append("confirmPassword", "password123");
    formData.append("mobile", "1234567890");

    try {
        const result = await registerUser(formData);
        console.log("Result:", result);
    } catch (error) {
        console.error("Script Error:", error);
    }
}

main();
