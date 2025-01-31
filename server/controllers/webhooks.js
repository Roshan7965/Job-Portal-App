import { Webhook } from "svix";
import User from "../models/User.js";
import "dotenv/config"

export const clerkWebhooks = async (req, res) => {
    try {
        // Create a Svix webhook instance using the Clerk Webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify webhook headers
        whook.verify(
            JSON.stringify(req.body),
            {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            }
        );

        // Extract data and event type from request body
        const { data, type } = req.body;

        // Handle different Clerk events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id, // Clerk ID as MongoDB _id
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: "",
                };

                await User.create(userData);
                res.json({ success: true });
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url
                };

                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true });
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({ success: true });
                break;
            }

            default:
                res.status(400).json({ success: false, message: "Unknown event type" });
        }
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).json({ success: false, message: "Webhook error" });
    }
};
