import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: [email],
            subject: "Welcome to Messenger",
            html: createWelcomeEmailTemplate(name, clientURL),
        });

        if (error) {
            console.error("Error sending welcome email", error);
            throw new Error(`Error sending welcome email: ${JSON.stringify(error)}`);
        }

        console.log("Welcome email sent successfully", data);
        return data;

    } catch (error) {
        throw new Error(`Error in sendWelcomeEmail: ${error.message}`);
    }
};
