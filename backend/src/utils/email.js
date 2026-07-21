'use strict';
const nodemailer = require('nodemailer');

// ─── Transporter ───────────────────────────────────────────────────────────────
const createTransporter = () => {
    if (!process.env.EMAIL_USER) return null; // silently skip if not configured
    return nodemailer.createTransport({
        host:   process.env.EMAIL_HOST   || 'smtp.gmail.com',
        port:   Number(process.env.EMAIL_PORT || 587),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const COLLEGE_NAME  = 'LNMI College Management System';
const COLLEGE_EMAIL = process.env.EMAIL_FROM || `"${COLLEGE_NAME}" <no-reply@lnmicms.in>`;
const PRIMARY_COLOR = '#6366f1';

// ─── Base HTML wrapper ────────────────────────────────────────────────────────
const htmlLayout = (title, bodyHtml) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:linear-gradient(135deg,${PRIMARY_COLOR},#8b5cf6);padding:36px 40px;text-align:center;">
          <h1 style="color:#fff;font-size:22px;font-weight:900;margin:0;letter-spacing:-0.5px;">${COLLEGE_NAME}</h1>
          <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:6px 0 0;letter-spacing:0.15em;text-transform:uppercase;">Knowledge &bull; Innovation &bull; Excellence</p>
        </td>
      </tr>
      <tr><td style="padding:40px;">${bodyHtml}</td></tr>
      <tr>
        <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="color:#94a3b8;font-size:11px;margin:0;">This is an automated message from ${COLLEGE_NAME}. Please do not reply.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

const badge = (text, color) =>
    `<span style="display:inline-block;background:${color}22;color:${color};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">${text}</span>`;

// ─── Base send function ───────────────────────────────────────────────────────
const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransporter();
    if (!transporter) {
        console.log(`[Email] Skipped (EMAIL_USER not set) → ${to}: ${subject}`);
        return { skipped: true };
    }
    try {
        const info = await transporter.sendMail({ from: COLLEGE_EMAIL, to, subject, html });
        console.log(`[Email] Sent → ${to}: ${subject} (${info.messageId})`);
        return info;
    } catch (err) {
        console.error(`[Email] Failed → ${to}: ${err.message}`);
        throw err;
    }
};

// ─── Fee Reminder ─────────────────────────────────────────────────────────────
const sendFeeReminderEmail = async (student, feeInfo) => {
    const { name, email, rollNo } = student;
    const { amount, dueDate, feeType } = feeInfo;
    const formattedDate = dueDate
        ? new Date(dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'As soon as possible';
    const formattedAmount = `&#x20B9;${Number(amount || 0).toLocaleString('en-IN')}`;

    const html = htmlLayout('Fee Payment Reminder', `
        <h2 style="color:#1e293b;font-size:20px;font-weight:900;margin:0 0 6px;">Fee Payment Reminder</h2>
        <p style="color:#64748b;font-size:14px;margin:0 0 24px;">Dear <strong style="color:#1e293b;">${name}</strong>,</p>
        <div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:#92400e;font-size:14px;font-weight:700;margin:0;">&#9888; Payment Due Notice</p>
            <p style="color:#78350f;font-size:13px;margin:6px 0 0;">You have an outstanding fee that requires immediate attention.</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;width:45%;">Roll Number</td>
                <td style="padding:14px 20px;font-size:13px;color:#1e293b;font-weight:700;">${rollNo || '&mdash;'}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;">Fee Type</td>
                <td style="padding:14px 20px;font-size:13px;color:#1e293b;font-weight:700;">${feeType || 'General Fee'}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;">Amount Due</td>
                <td style="padding:14px 20px;font-size:16px;color:#dc2626;font-weight:900;">${formattedAmount}</td>
            </tr>
            <tr>
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;">Due Date</td>
                <td style="padding:14px 20px;font-size:13px;color:#dc2626;font-weight:700;">${formattedDate}</td>
            </tr>
        </table>
        <p style="color:#64748b;font-size:13px;line-height:1.6;">Please visit the college finance portal or contact the accounts department. Late payments may incur additional charges.</p>
    `);

    return sendEmail({ to: email, subject: `Fee Payment Due — ${feeType || 'Outstanding Balance'} | ${COLLEGE_NAME}`, html });
};

// ─── Attendance Warning ───────────────────────────────────────────────────────
const sendAttendanceWarningEmail = async (student, attendancePct) => {
    const { name, email, rollNo, course } = student;
    const isCritical = attendancePct < 65;
    const alertColor = isCritical ? '#dc2626' : '#f59e0b';
    const bgColor    = isCritical ? '#fef2f2' : '#fef3c7';

    const html = htmlLayout(`Attendance ${isCritical ? 'Critical Alert' : 'Warning'}`, `
        <h2 style="color:#1e293b;font-size:20px;font-weight:900;margin:0 0 6px;">Attendance ${isCritical ? 'Critical Alert' : 'Warning'}</h2>
        <p style="color:#64748b;font-size:14px;margin:0 0 24px;">Dear <strong style="color:#1e293b;">${name}</strong>,</p>
        <div style="background:${bgColor};border-left:4px solid ${alertColor};border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:${alertColor};font-size:14px;font-weight:700;margin:0;">${isCritical ? '&#128680; Critical: Attendance Dangerously Low' : '&#9888; Attendance Below Required Threshold'}</p>
            <p style="color:#4b5563;font-size:13px;margin:6px 0 0;">Your current attendance is <strong>${attendancePct}%</strong> — below the required 75%.</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;width:45%;">Roll Number</td>
                <td style="padding:14px 20px;font-size:13px;color:#1e293b;font-weight:700;">${rollNo || '&mdash;'}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;">Course</td>
                <td style="padding:14px 20px;font-size:13px;color:#1e293b;font-weight:700;">${course || '&mdash;'}</td>
            </tr>
            <tr>
                <td style="padding:14px 20px;font-size:13px;color:#64748b;font-weight:600;">Current Attendance</td>
                <td style="padding:14px 20px;font-size:16px;font-weight:900;color:${alertColor};">${attendancePct}%</td>
            </tr>
        </table>
        <p style="color:#64748b;font-size:13px;line-height:1.6;">Students below 75% may be <strong>barred from examinations</strong>. Contact your class teacher or the academic office immediately.</p>
    `);

    return sendEmail({ to: email, subject: `Attendance ${isCritical ? 'Critical Alert' : 'Warning'} — ${attendancePct}% | ${COLLEGE_NAME}`, html });
};

// ─── Welcome Email ─────────────────────────────────────────────────────────────
const sendWelcomeEmail = async (user, role) => {
    const { fullName, email } = user;
    const roleLabel = (role || 'Member').toUpperCase();
    const roleColors = { ADMIN: '#6366f1', TEACHER: '#0ea5e9', STUDENT: '#10b981', STAFF: '#f59e0b' };
    const color = roleColors[roleLabel] || PRIMARY_COLOR;

    const html = htmlLayout('Welcome to LNMICMS', `
        <h2 style="color:#1e293b;font-size:22px;font-weight:900;margin:0 0 6px;">Welcome to ${COLLEGE_NAME}! &#127881;</h2>
        <p style="color:#64748b;font-size:14px;margin:0 0 24px;">Dear <strong style="color:#1e293b;">${fullName}</strong>,</p>
        <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 24px;">Your account has been successfully created. You can now access the College Management System using your registered email address.</p>
        <div style="background:#f8fafc;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
            <p style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Your Role</p>
            ${badge(roleLabel, color)}
        </div>
        <p style="color:#64748b;font-size:13px;line-height:1.6;">If you did not create this account, please contact the administration office immediately.</p>
    `);

    return sendEmail({ to: email, subject: `Welcome to ${COLLEGE_NAME} — Account Created`, html });
};

// ─── System Notification Email ─────────────────────────────────────────────────
const sendNotificationEmail = async (user, notification) => {
    const { fullName, email } = user;
    const { title, message, type } = notification;
    const typeColors = { info: '#3b82f6', warning: '#f59e0b', success: '#10b981', error: '#ef4444' };
    const color = typeColors[(type || '').toLowerCase()] || PRIMARY_COLOR;

    const html = htmlLayout(title, `
        <h2 style="color:#1e293b;font-size:20px;font-weight:900;margin:0 0 6px;">${title}</h2>
        <p style="color:#64748b;font-size:14px;margin:0 0 24px;">Dear <strong style="color:#1e293b;">${fullName}</strong>,</p>
        <div style="background:${color}11;border-left:4px solid ${color};border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:#1e293b;font-size:14px;line-height:1.6;margin:0;">${message}</p>
        </div>
        ${badge(type || 'info', color)}
        <p style="color:#94a3b8;font-size:12px;margin:20px 0 0;">Log in to the portal to view all notifications.</p>
    `);

    return sendEmail({ to: email, subject: `${title} | ${COLLEGE_NAME}`, html });
};

module.exports = {
    sendEmail,
    sendFeeReminderEmail,
    sendAttendanceWarningEmail,
    sendWelcomeEmail,
    sendNotificationEmail,
};
