import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the following link: 
               <a href="${process.env.BASE_URL}/verify-email/${token}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Please click on the following link to reset your password: 
               <a href="${process.env.BASE_URL}/reset-password/${token}">Reset Password</a></p>`,
    };

    await transporter.sendMail(mailOptions);
};
