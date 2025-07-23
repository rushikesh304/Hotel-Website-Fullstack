const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 8002;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail or another email service
    auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password or app-specific password
    },
});

// Forgot Password Endpoint
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    // Generate a new password or reset token (for simplicity, we'll generate a random password)
    const newPassword = Math.random().toString(36).slice(-8); // Random 8-character password

    // Email content
    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Your new password is: ${newPassword}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        // In a real app, you would save the new password to the database
        // For now, we'll just log it
        console.log(`New password for ${email}: ${newPassword}`);

        res.status(200).json({ message: "A new password has been sent to your email." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email. Please try again." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});