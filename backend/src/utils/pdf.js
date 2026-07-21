"use strict";

const PDFDocument = require("pdfkit");

// ─── Brand / College Constants ─────────────────────────────────────────────────
const COLLEGE = {
    name: "Greenfield Institute of Technology & Science",
    tagline: "Knowledge • Innovation • Excellence",
    address: "123 University Road, Bengaluru, Karnataka — 560001",
    phone: "+91 80 2345 6789",
    email: "registrar@greenfield.edu.in",
    website: "www.greenfield.edu.in",
    regNo: "UGC/KA/2001/7823",
};

// ─── Color Palette ─────────────────────────────────────────────────────────────
const COLORS = {
    primary: "#4F46E5",       // Indigo
    primaryDark: "#3730A3",
    accent: "#06B6D4",        // Cyan
    success: "#10B981",       // Emerald
    warning: "#F59E0B",       // Amber
    danger: "#EF4444",        // Red
    dark: "#0F172A",          // Slate-900
    text: "#1E293B",          // Slate-800
    muted: "#64748B",         // Slate-500
    light: "#F8FAFC",         // Slate-50
    border: "#E2E8F0",        // Slate-200
    white: "#FFFFFF",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);

const fmtDate = (d) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric",
    });
};

// Draw a horizontal rule
const rule = (doc, x, y, width, color = COLORS.border, thickness = 0.5) => {
    doc.save().strokeColor(color).lineWidth(thickness).moveTo(x, y).lineTo(x + width, y).stroke().restore();
};

// Draw a filled rectangle
const rect = (doc, x, y, w, h, color) => {
    doc.save().fillColor(color).rect(x, y, w, h).fill().restore();
};

// ─── Letterhead ───────────────────────────────────────────────────────────────
const drawLetterhead = (doc, pageWidth, margin) => {
    const headerH = 110;

    // Background gradient strip (simulated with two rects)
    rect(doc, 0, 0, pageWidth, headerH, COLORS.primary);
    rect(doc, 0, headerH - 8, pageWidth, 8, COLORS.primaryDark);

    // Decorative accent bar on right
    rect(doc, pageWidth - 10, 0, 10, headerH, COLORS.accent);

    // College name
    doc
        .fillColor(COLORS.white)
        .font("Helvetica-Bold")
        .fontSize(18)
        .text(COLLEGE.name, margin, 22, { align: "center", width: pageWidth - margin * 2 });

    // Tagline
    doc
        .fillColor("rgba(255,255,255,0.8)")
        .font("Helvetica-Oblique")
        .fontSize(9)
        .text(COLLEGE.tagline, margin, 44, { align: "center", width: pageWidth - margin * 2 });

    // Contact row
    doc
        .fillColor("rgba(255,255,255,0.75)")
        .font("Helvetica")
        .fontSize(7.5)
        .text(
            `${COLLEGE.address}   |   ${COLLEGE.phone}   |   ${COLLEGE.email}   |   Reg. No: ${COLLEGE.regNo}`,
            margin, 60,
            { align: "center", width: pageWidth - margin * 2 }
        );
};

// ─── Section Title ─────────────────────────────────────────────────────────────
const sectionTitle = (doc, x, y, w, title, color = COLORS.primary) => {
    rect(doc, x, y, w, 24, color + "18"); // transparent bg
    doc
        .fillColor(color)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(title.toUpperCase(), x + 10, y + 7, { width: w - 20 });
    rule(doc, x, y + 24, w, color + "55", 1);
    return y + 30;
};

// ─── Two-column info block ──────────────────────────────────────────────────────
const infoRow = (doc, x, y, w, label, value, labelColor = COLORS.muted, valueColor = COLORS.text) => {
    const colW = w / 2;
    doc.font("Helvetica").fontSize(8.5).fillColor(labelColor).text(label, x, y);
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(valueColor).text(String(value || "N/A"), x + colW, y);
    return y + 16;
};

// ─── Table helpers ─────────────────────────────────────────────────────────────
const tableHeader = (doc, x, y, cols) => {
    const rowH = 22;
    rect(doc, x, y, cols.reduce((s, c) => s + c.w, 0), rowH, COLORS.primary);
    let cx = x + 6;
    cols.forEach((col) => {
        doc
            .fillColor(COLORS.white)
            .font("Helvetica-Bold")
            .fontSize(8)
            .text(col.label, cx, y + 7, { width: col.w - 12, align: col.align || "left" });
        cx += col.w;
    });
    return y + rowH;
};

const tableRow = (doc, x, y, cols, values, shade = false) => {
    const rowH = 20;
    const totalW = cols.reduce((s, c) => s + c.w, 0);
    if (shade) rect(doc, x, y, totalW, rowH, COLORS.light);
    let cx = x + 6;
    cols.forEach((col, i) => {
        doc
            .fillColor(COLORS.text)
            .font("Helvetica")
            .fontSize(8.5)
            .text(String(values[i] ?? ""), cx, y + 6, { width: col.w - 12, align: col.align || "left" });
        cx += col.w;
    });
    rule(doc, x, y + rowH, totalW, COLORS.border, 0.3);
    return y + rowH;
};

// ─── Stamp / Badge ────────────────────────────────────────────────────────────
const stamp = (doc, x, y, text, color = COLORS.success) => {
    doc.save()
        .strokeColor(color).lineWidth(2)
        .rect(x, y, 100, 36).stroke()
        .fillColor(color)
        .font("Helvetica-Bold").fontSize(10)
        .text(text, x, y + 12, { width: 100, align: "center" })
        .restore();
};

// ══════════════════════════════════════════════════════════════════════════════
// ▶ generateFeeReceiptPDF
// receipt: populated Receipt document (studentId.userId populated)
// Returns a PDFDocument stream (pipe to res)
// ══════════════════════════════════════════════════════════════════════════════
const generateFeeReceiptPDF = (receipt) => {
    const doc = new PDFDocument({ size: "A4", margin: 0, bufferPages: true });
    const margin = 50;
    const pageWidth = doc.page.width; // 595
    const contentW = pageWidth - margin * 2;

    drawLetterhead(doc, pageWidth, margin);

    let y = 130;

    // ── Document Type Title ──
    doc
        .fillColor(COLORS.text)
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("FEE PAYMENT RECEIPT", margin, y, { align: "center", width: contentW });

    y += 22;
    rule(doc, margin, y, contentW, COLORS.primary, 1.5);
    y += 12;

    // ── Receipt Meta ──
    const metaY = y;
    // Left side
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.muted).text("Receipt Number", margin, y);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.primary).text(receipt.receiptNo || "N/A", margin, y + 11);

    // Right side
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.muted).text("Date of Issue", margin + contentW - 130, y);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(COLORS.text)
        .text(fmtDate(receipt.paidAt || receipt.createdAt), margin + contentW - 130, y + 11, { width: 130 });

    y = metaY + 38;
    rule(doc, margin, y, contentW, COLORS.border, 0.5);
    y += 16;

    // ── Student Information ──
    y = sectionTitle(doc, margin, y, contentW, "Student Information");

    const student = receipt.studentId || {};
    const user = student.userId || {};

    y = infoRow(doc, margin + 10, y + 6, contentW - 20, "Full Name", user.fullName || "N/A");
    y = infoRow(doc, margin + 10, y, contentW - 20, "Roll Number", student.rollNo || "N/A");
    y = infoRow(doc, margin + 10, y, contentW - 20, "Course", student.course || "N/A");
    y = infoRow(doc, margin + 10, y, contentW - 20, "Semester / Section", `Sem ${student.semester || "N/A"} / Section ${student.section || "N/A"}`);
    y = infoRow(doc, margin + 10, y, contentW - 20, "Email", user.email || "N/A");
    y += 12;

    // ── Fee Breakdown ──
    y = sectionTitle(doc, margin, y, contentW, "Fee Breakdown");
    y += 6;

    const feeCols = [
        { label: "#", w: 30, align: "center" },
        { label: "Fee Description", w: 260 },
        { label: "Amount (₹)", w: 110, align: "right" },
        { label: "Status", w: 95, align: "center" },
    ];

    y = tableHeader(doc, margin, y, feeCols);

    let grandTotal = 0;
    const feeDetails = receipt.feeDetails || [];

    if (feeDetails.length === 0) {
        y = tableRow(doc, margin, y, feeCols, ["1", "General Fee", `₹ ${fmt(receipt.totalAmount)}`, "PAID"], false);
        grandTotal = receipt.totalAmount || 0;
    } else {
        feeDetails.forEach((item, idx) => {
            const feeName = item.feeTypeId?.name || item.feeTypeName || "Fee";
            const amount = item.amount || 0;
            grandTotal += amount;
            y = tableRow(doc, margin, y, feeCols,
                [idx + 1, feeName, `₹ ${fmt(amount)}`, "PAID"],
                idx % 2 === 1
            );
        });
    }

    // ── Total Row ──
    y += 4;
    rect(doc, margin, y, contentW, 28, COLORS.primary);
    doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(11)
        .text("TOTAL AMOUNT PAID", margin + 10, y + 8, { width: contentW - 130 });
    doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(13)
        .text(`₹ ${fmt(receipt.totalAmount || grandTotal)}`, margin + contentW - 120, y + 7, { width: 110, align: "right" });
    y += 38;

    // ── Payment Details ──
    y = sectionTitle(doc, margin, y, contentW, "Payment Details");
    y = infoRow(doc, margin + 10, y + 6, contentW - 20, "Payment Method", (receipt.paymentMethod || "N/A").toUpperCase());
    y = infoRow(doc, margin + 10, y, contentW - 20, "Payment Date", fmtDate(receipt.paidAt));
    y += 14;

    // ── Stamp ──
    stamp(doc, margin, y, "PAID", COLORS.success);

    // ── Footer ──
    const footerY = doc.page.height - 70;
    rule(doc, margin, footerY, contentW, COLORS.border, 0.5);

    doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.muted)
        .text(
            "This is a computer-generated receipt and does not require a physical signature. " +
            "For any queries, contact the Finance Office.",
            margin, footerY + 8, { width: contentW, align: "center" }
        );

    doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.primary)
        .text(COLLEGE.website, margin, footerY + 22, { width: contentW, align: "center" });

    // Page number
    doc.font("Helvetica").fontSize(7).fillColor(COLORS.muted)
        .text(`Page 1 of 1  •  ${COLLEGE.name}`, margin, footerY + 36, { width: contentW, align: "center" });

    doc.end();
    return doc;
};

// ══════════════════════════════════════════════════════════════════════════════
// ▶ generateSalarySlipPDF
// salary: populated Salary document (teacherId.userId populated)
// Returns a PDFDocument stream (pipe to res)
// ══════════════════════════════════════════════════════════════════════════════
const generateSalarySlipPDF = (salary) => {
    const doc = new PDFDocument({ size: "A4", margin: 0, bufferPages: true });
    const margin = 50;
    const pageWidth = doc.page.width;
    const contentW = pageWidth - margin * 2;

    drawLetterhead(doc, pageWidth, margin);

    let y = 130;

    // ── Document Type Title ──
    doc
        .fillColor(COLORS.text)
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("SALARY SLIP", margin, y, { align: "center", width: contentW });

    const monthLabel = salary.month
        ? `${salary.month} ${salary.year}`
        : "N/A";

    doc
        .fillColor(COLORS.muted)
        .font("Helvetica")
        .fontSize(9)
        .text(`Pay Period: ${monthLabel}`, margin, y + 18, { align: "center", width: contentW });

    y += 38;
    rule(doc, margin, y, contentW, COLORS.primary, 1.5);
    y += 16;

    // ── Employee Information ──
    y = sectionTitle(doc, margin, y, contentW, "Employee Information");

    const teacher = salary.teacherId || {};
    const user = teacher.userId || {};

    const leftX = margin + 10;
    const rightX = margin + contentW / 2 + 10;
    const halfW = contentW / 2 - 20;

    const twoCol = (doc, y, l1, v1, l2, v2) => {
        infoRow(doc, leftX, y, halfW * 2, l1, v1);
        doc.font("Helvetica").fontSize(8.5).fillColor(COLORS.muted).text(l2, rightX, y);
        doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.text).text(String(v2 || "N/A"), rightX + halfW / 2, y);
        return y + 16;
    };

    y += 6;
    y = infoRow(doc, leftX, y, contentW - 20, "Full Name", user.fullName || "N/A");
    y = infoRow(doc, leftX, y, contentW - 20, "Employee ID", teacher.employeeId || "N/A");
    y = infoRow(doc, leftX, y, contentW - 20, "Department", teacher.department || "N/A");
    y = infoRow(doc, leftX, y, contentW - 20, "Designation", teacher.designation || "N/A");
    y = infoRow(doc, leftX, y, contentW - 20, "Date of Joining",
        teacher.joiningDate ? fmtDate(teacher.joiningDate) : "N/A");
    y = infoRow(doc, leftX, y, contentW - 20, "Pay Period", monthLabel);
    y += 14;

    // ── Earnings Table ──
    const halfColW = (contentW - 8) / 2;

    // Left half — Earnings
    y = sectionTitle(doc, margin, y, halfColW, "Earnings", COLORS.success);
    y += 4;

    const earningCols = [
        { label: "Component", w: halfColW * 0.65 },
        { label: "Amount (₹)", w: halfColW * 0.35, align: "right" },
    ];

    let earningsY = tableHeader(doc, margin, y, earningCols);
    const earningsStart = earningsY;

    // Basic salary always first
    earningsY = tableRow(doc, margin, earningsY, earningCols,
        ["Basic Salary", `₹ ${fmt(salary.basicSalary)}`], false);

    let totalEarnings = salary.basicSalary || 0;

    (salary.earnings || []).forEach((e, i) => {
        const name = e.componentId?.name || "Allowance";
        earningsY = tableRow(doc, margin, earningsY, earningCols,
            [name, `₹ ${fmt(e.amount)}`], (i + 1) % 2 === 1);
        totalEarnings += e.amount || 0;
    });

    // Earnings total
    earningsY += 2;
    rect(doc, margin, earningsY, halfColW, 22, COLORS.success + "22");
    doc.fillColor(COLORS.success).font("Helvetica-Bold").fontSize(8.5)
        .text("Total Earnings", margin + 6, earningsY + 7);
    doc.fillColor(COLORS.success).font("Helvetica-Bold").fontSize(9)
        .text(`₹ ${fmt(salary.totalEarnings || totalEarnings)}`, margin + 6, earningsY + 7,
            { width: halfColW - 12, align: "right" });
    earningsY += 24;

    // Right half — Deductions (same Y start as earnings)
    const rightHalf = margin + halfColW + 8;
    let deductY = y; // Start at same Y as earnings header was
    deductY = sectionTitle(doc, rightHalf, deductY, halfColW, "Deductions", COLORS.danger);
    deductY += 4;

    const deductCols = [
        { label: "Component", w: halfColW * 0.65 },
        { label: "Amount (₹)", w: halfColW * 0.35, align: "right" },
    ];

    deductY = tableHeader(doc, rightHalf, deductY, deductCols);
    let totalDeductions = 0;

    if ((salary.deductions || []).length === 0) {
        deductY = tableRow(doc, rightHalf, deductY, deductCols, ["No Deductions", "₹ 0.00"], false);
    } else {
        (salary.deductions || []).forEach((d, i) => {
            const name = d.componentId?.name || "Deduction";
            deductY = tableRow(doc, rightHalf, deductY, deductCols,
                [name, `₹ ${fmt(d.amount)}`], i % 2 === 1);
            totalDeductions += d.amount || 0;
        });
    }

    deductY += 2;
    rect(doc, rightHalf, deductY, halfColW, 22, COLORS.danger + "22");
    doc.fillColor(COLORS.danger).font("Helvetica-Bold").fontSize(8.5)
        .text("Total Deductions", rightHalf + 6, deductY + 7);
    doc.fillColor(COLORS.danger).font("Helvetica-Bold").fontSize(9)
        .text(`₹ ${fmt(salary.totalDeductions || totalDeductions)}`, rightHalf + 6, deductY + 7,
            { width: halfColW - 12, align: "right" });
    deductY += 24;

    // Continue y below both halves
    y = Math.max(earningsY, deductY) + 14;

    // ── Net Salary Banner ──
    rect(doc, margin, y, contentW, 40, COLORS.primary);

    // Left text
    doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(13)
        .text("NET SALARY PAYABLE", margin + 12, y + 13);

    // Right amount
    const netAmount = salary.netSalary || (totalEarnings - totalDeductions);
    doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(16)
        .text(`₹ ${fmt(netAmount)}`, margin, y + 11, { width: contentW - 12, align: "right" });

    y += 50;

    // ── Status Badge ──
    const statusColors = {
        paid: COLORS.success,
        approved: COLORS.primary,
        processed: COLORS.accent,
        draft: COLORS.muted,
    };
    const statusColor = statusColors[salary.status] || COLORS.muted;
    stamp(doc, margin, y, (salary.status || "DRAFT").toUpperCase(), statusColor);

    // ── Signature Lines ──
    const sigY = y + 4;
    const sigX1 = margin + contentW - 230;
    const sigX2 = margin + contentW - 100;

    rule(doc, sigX1, sigY + 30, 120, COLORS.border, 0.8);
    doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.muted)
        .text("Authorized Signatory", sigX1, sigY + 34, { width: 120, align: "center" });

    // ── Footer ──
    const footerY = doc.page.height - 70;
    rule(doc, margin, footerY, contentW, COLORS.border, 0.5);

    doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.muted)
        .text(
            "This is a system-generated salary slip. For discrepancies, contact the HR/Payroll Department within 7 days.",
            margin, footerY + 8, { width: contentW, align: "center" }
        );

    doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.primary)
        .text(COLLEGE.website, margin, footerY + 22, { width: contentW, align: "center" });

    doc.font("Helvetica").fontSize(7).fillColor(COLORS.muted)
        .text(`Page 1 of 1  •  ${COLLEGE.name}`, margin, footerY + 36, { width: contentW, align: "center" });

    doc.end();
    return doc;
};

module.exports = { generateFeeReceiptPDF, generateSalarySlipPDF };
