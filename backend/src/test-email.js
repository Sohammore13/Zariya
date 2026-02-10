import { resendClient, sender } from "./lib/resend.js";
import { ENV } from "./lib/env.js";

const runTest = async () => {
    console.log("--- Starting Resend Email Test ---");

    // 1. Check API Key
    if (!ENV.RESEND_API_KEY) {
        console.error("❌ ERROR: RESEND_API_KEY is missing in .env file");
        return;
    }
    console.log("✅ RESEND_API_KEY found");

    // 2. Check Sender Configuration
    console.log(`📧 Sender: ${sender.name} <${sender.email}>`);

    // 3. Attempt to send an email
    // We send to the sender's email if possible, or a test one. 
    // For Resend free tier, you can strictly only send to your own registered email.
    const testRecipient = "delivered@resend.dev";

    console.log(`🚀 Attempting to send test email to: ${testRecipient}`);

    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [testRecipient],
            subject: "Test Email from Chatify Debugger",
            html: "<strong>If you see this, your Resend configuration is working!</strong>",
        });

        if (error) {
            console.error("❌ Resend API Error returned:");
            console.error(JSON.stringify(error, null, 2));
        } else {
            console.log("✅ Email sent successfully!");
            console.log("Response Data:", data);
            console.log("\n⚠️ NOTE: If you are on the Resend FREE tier, you can ONLY send emails to the email address you used to sign up for Resend.");
            console.log("If you are trying to signup with a dummy email (e.g. user@test.com), it will FAIL.");
        }
    } catch (err) {
        console.error("❌ Unexpected Error:");
        console.error(err);
    }
    console.log("--- End of Test ---");
};

runTest();
