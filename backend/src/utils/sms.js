'use strict';
const twilio = require('twilio');

const COLLEGE_NAME = 'LNMICMS';

// ─── Twilio Client ────────────────────────────────────────────────────────────
let twilioClient = null;
const getTwilioClient = () => {
    if (twilioClient) return twilioClient;
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
        try {
            twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        } catch (err) {
            console.error('[SMS] Failed to initialize Twilio client:', err.message);
        }
    }
    return twilioClient;
};

// ─── Base send function ───────────────────────────────────────────────────────
const sendSms = async ({ to, body }) => {
    if (!to) {
        console.log(`[SMS] Skipped (No phone number provided). Message: ${body}`);
        return { skipped: true };
    }

    const client = getTwilioClient();
    const from = process.env.TWILIO_PHONE_NUMBER || COLLEGE_NAME;

    // Formatting phone number to ensure it has country code if missing
    // Basic assumption: Indian numbers if 10 digits
    let formattedTo = to.replace(/\D/g, '');
    if (formattedTo.length === 10) {
        formattedTo = `+91${formattedTo}`;
    } else if (!to.startsWith('+')) {
        formattedTo = `+${formattedTo}`;
    } else {
        formattedTo = to;
    }

    if (!client) {
        // Mock mode
        console.log(`[SMS MOCK] Would have sent SMS to ${formattedTo}`);
        console.log(`[SMS MOCK] Body: ${body}`);
        return { mock: true, to: formattedTo, body };
    }

    try {
        const message = await client.messages.create({
            body,
            from,
            to: formattedTo
        });
        console.log(`[SMS] Sent → ${formattedTo} (${message.sid})`);
        return message;
    } catch (err) {
        console.error(`[SMS] Failed → ${formattedTo}: ${err.message}`);
        throw err;
    }
};

// ─── Pre-defined SMS Templates ────────────────────────────────────────────────

const sendFeeReminderSms = async (student, feeInfo) => {
    const { name, phone } = student;
    const { amount, feeType } = feeInfo;
    const formattedAmount = `Rs.${Number(amount || 0).toLocaleString('en-IN')}`;
    
    const body = `Dear ${name}, a fee of ${formattedAmount} for ${feeType || 'General Fee'} is pending. Please pay at the earliest to avoid late fees. - ${COLLEGE_NAME}`;
    return sendSms({ to: phone, body });
};

const sendAttendanceWarningSms = async (student, attendancePct) => {
    const { name, phone } = student;
    const body = `Dear ${name}, your attendance is critically low at ${attendancePct}%. It must be above 75%. Please contact the administration immediately. - ${COLLEGE_NAME}`;
    return sendSms({ to: phone, body });
};

const sendNotificationSms = async (user, notification) => {
    const { phone } = user;
    const { title, message } = notification;
    
    // Trim message if it's too long for SMS
    const shortMessage = message.length > 100 ? message.substring(0, 97) + '...' : message;
    const body = `${title}: ${shortMessage} - ${COLLEGE_NAME}`;
    return sendSms({ to: phone, body });
};

module.exports = {
    sendSms,
    sendFeeReminderSms,
    sendAttendanceWarningSms,
    sendNotificationSms
};
