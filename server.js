const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Data directory setup
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const enquiriesFile = path.join(dataDir, 'enquiries.json');
const scholarshipsFile = path.join(dataDir, 'scholarships.json');

if (!fs.existsSync(enquiriesFile)) fs.writeFileSync(enquiriesFile, '[]', 'utf-8');
if (!fs.existsSync(scholarshipsFile)) fs.writeFileSync(scholarshipsFile, '[]', 'utf-8');

// Center Details Constant
const CENTER_INFO = {
  name: "Physics Wallah Coaching Helpline Robertsganj",
  tagline: "Premier IIT JEE & NEET Coaching Guidance Hub",
  hindiName: "फिजिक्स वल्लाह कोचिंग हेल्पलाइन राबर्ट्सगंज | आईआईटी जी, नीत कोचिंग क्लासेज",
  rating: 3.6,
  totalReviews: 14,
  phone: "074288 90305",
  rawPhone: "+917428890305",
  whatsappNumber: "917428890305",
  address: "Tagore Nagar, Robertsganj, Uttar Pradesh 231216",
  plusCode: "M3P8+GH Robertsganj, Uttar Pradesh",
  status: "Open 24 Hours",
  isLGBTQFriendly: true,
  scholarshipOffer: "Up to 90% Scholarship via PW NSAT",
  results: {
    under1000: "53 Students",
    under2500: "197+ Students",
    under5000: "470+ Students",
    under10000: "1,052+ Students",
    under20000: "2,160+ Students"
  },
  reviews: [
    {
      author: "Kaustubh Dubey",
      rating: 5,
      date: "9 months ago",
      comment: "Can I take coaching classes from here like Vidyapeeth or is it just a helpline centre? Very helpful staff for counseling and online admission guidance for Robertsganj, Sonbhadra students!",
      ownerResponse: "Dear Kaustubh Dubey, Thank you for reaching out! We are an authorized counseling and helpline support hub assisting students in Robertsganj with Vidyapeeth admissions, batch selection, offline AITS test series queries, and scholarship enrollments."
    },
    {
      author: "Kaustubh Dubey",
      rating: 4,
      date: "1 year ago",
      comment: "Can I register here for PW NSAT scholarship exam? Helpful guidance provided on offline tests and test centers.",
      ownerResponse: "Dear Kaustubh Dubey, Thank you for your interest in our NSAT scholarship exam. You can register for NSAT online or visit us for offline test guidance, syllabus booklet, and scholarship counseling."
    },
    {
      author: "Saziya Parween",
      rating: 4,
      date: "1 year ago",
      comment: "PW coaching in Robertsganj... Do you offer offline test series AITS for NEET?",
      ownerResponse: "Dear Saziya Parween, Thank you for your inquiry. We provide complete orientation and support for PW All India Test Series (AITS) registration, schedule, and center allotments."
    }
  ]
};

// API: Center Info
app.get('/api/center-info', (req, res) => {
  res.json({ success: true, data: CENTER_INFO });
});

// Helper: build owner WhatsApp notification URL
function buildWhatsAppNotifyUrl(type, lead) {
  let message = "";
  if (type === 'enquiry') {
    message = `🔔 *New Counseling Request - PW Robertsganj*\n\n` +
      `👤 *Student Name:* ${lead.name}\n` +
      `📞 *Phone:* ${lead.phone}\n` +
      `📚 *Course:* ${lead.course}\n` +
      `🎯 *Exam Year:* ${lead.targetYear}\n` +
      `💬 *Student Note:* ${lead.message || 'None'}\n` +
      `🎫 *Ticket ID:* ${lead.id}\n` +
      `⏰ *Time:* ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
  } else {
    message = `🏆 *New NSAT Scholarship Request - PW Robertsganj*\n\n` +
      `👤 *Student Name:* ${lead.studentName}\n` +
      `📞 *Phone:* ${lead.phone}\n` +
      `🏫 *Class:* ${lead.currentClass}\n` +
      `🎯 *Exam:* ${lead.targetExam}\n` +
      `📊 *Previous Score:* ${lead.prevPercentage}%\n` +
      `🎁 *Qualified Scholarship:* Up to ${lead.estimatedScholarshipPercent}%\n` +
      `🎫 *Ticket ID:* ${lead.id}\n` +
      `⏰ *Time:* ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
  }
  return `https://wa.me/${CENTER_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// API: Submit Helpline Enquiry
app.post('/api/enquiry', (req, res) => {
  try {
    const { name, phone, email, course, targetYear, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Name and Phone number are required." });
    }

    const newEnquiry = {
      id: 'ENQ-' + Date.now(),
      name,
      phone,
      email: email || '',
      course: course || 'NEET/JEE',
      targetYear: targetYear || '2026',
      message: message || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const currentData = JSON.parse(fs.readFileSync(enquiriesFile, 'utf-8'));
    currentData.unshift(newEnquiry);
    fs.writeFileSync(enquiriesFile, JSON.stringify(currentData, null, 2), 'utf-8');

    // Instant Console Alert for Server Operator
    console.log(`\n========================================`);
    console.log(`🔔 [NEW COUNSELING ENQUIRY RECEIVED]`);
    console.log(`👤 Name:   ${newEnquiry.name}`);
    console.log(`📞 Phone:  ${newEnquiry.phone}`);
    console.log(`📚 Course: ${newEnquiry.course} (${newEnquiry.targetYear})`);
    console.log(`💬 Note:   ${newEnquiry.message || 'N/A'}`);
    console.log(`========================================\n`);

    const ownerWhatsAppUrl = buildWhatsAppNotifyUrl('enquiry', newEnquiry);

    res.json({
      success: true,
      message: "Counseling request submitted successfully! Our Robertsganj team has received your request.",
      ticketId: newEnquiry.id,
      lead: newEnquiry,
      ownerWhatsAppUrl
    });
  } catch (error) {
    console.error("Enquiry save error:", error);
    res.status(500).json({ success: false, error: "Failed to process enquiry." });
  }
});

// API: NSAT Scholarship Calculator & Registration
app.post('/api/scholarship', (req, res) => {
  try {
    const { studentName, phone, currentClass, targetExam, prevPercentage } = req.body;

    if (!studentName || !phone) {
      return res.status(400).json({ success: false, error: "Student name and phone are required." });
    }

    const score = parseFloat(prevPercentage) || 80;
    let estimatedScholarship = 40;
    if (score >= 95) estimatedScholarship = 90;
    else if (score >= 90) estimatedScholarship = 80;
    else if (score >= 80) estimatedScholarship = 65;
    else if (score >= 70) estimatedScholarship = 50;

    const scholarshipRecord = {
      id: 'NSAT-' + Date.now(),
      studentName,
      phone,
      currentClass: currentClass || '12th Appearing/Passed',
      targetExam: targetExam || 'NEET 2026',
      prevPercentage: score,
      estimatedScholarshipPercent: estimatedScholarship,
      status: 'Qualified',
      createdAt: new Date().toISOString()
    };

    const currentList = JSON.parse(fs.readFileSync(scholarshipsFile, 'utf-8'));
    currentList.unshift(scholarshipRecord);
    fs.writeFileSync(scholarshipsFile, JSON.stringify(currentList, null, 2), 'utf-8');

    console.log(`\n========================================`);
    console.log(`🏆 [NEW NSAT SCHOLARSHIP LEAD]`);
    console.log(`👤 Student:     ${scholarshipRecord.studentName}`);
    console.log(`📞 Phone:       ${scholarshipRecord.phone}`);
    console.log(`🎯 Target:      ${scholarshipRecord.targetExam}`);
    console.log(`🎁 Scholarship: Up to ${scholarshipRecord.estimatedScholarshipPercent}%`);
    console.log(`========================================\n`);

    const ownerWhatsAppUrl = buildWhatsAppNotifyUrl('scholarship', scholarshipRecord);

    res.json({
      success: true,
      estimatedScholarship: `${estimatedScholarship}%`,
      details: scholarshipRecord,
      message: `Congratulations! Based on your academic score, you qualify for up to ${estimatedScholarship}% Scholarship under PW NSAT!`,
      ownerWhatsAppUrl
    });
  } catch (err) {
    console.error("Scholarship error:", err);
    res.status(500).json({ success: false, error: "Failed to calculate scholarship." });
  }
});

// Admin Authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pw2026';
const ADMIN_TOKEN = 'pw-secure-' + Buffer.from(ADMIN_PASSWORD).toString('base64');

// Auth Middleware for Admin APIs
function requireAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token === ADMIN_TOKEN) {
    return next();
  }
  return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or missing admin credentials.' });
}

// API: Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      message: 'Admin authentication successful.'
    });
  }
  return res.status(401).json({ success: false, error: 'Incorrect Admin Password.' });
});

// API: Admin Leads & Analytics (Protected)
app.get('/api/admin/leads', requireAdminAuth, (req, res) => {
  try {
    const enquiries = JSON.parse(fs.readFileSync(enquiriesFile, 'utf-8'));
    const scholarships = JSON.parse(fs.readFileSync(scholarshipsFile, 'utf-8'));

    res.json({
      success: true,
      summary: {
        totalEnquiries: enquiries.length,
        totalScholarships: scholarships.length,
        totalLeads: enquiries.length + scholarships.length,
        latestLeadTime: enquiries[0]?.createdAt || scholarships[0]?.createdAt || null
      },
      enquiries,
      scholarships
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load leads." });
  }
});

// API: Admin Delete Lead (Protected)
app.delete('/api/admin/leads/:type/:id', requireAdminAuth, (req, res) => {
  try {
    const { type, id } = req.params;
    if (type === 'enquiry') {
      let data = JSON.parse(fs.readFileSync(enquiriesFile, 'utf-8'));
      data = data.filter(item => item.id !== id);
      fs.writeFileSync(enquiriesFile, JSON.stringify(data, null, 2), 'utf-8');
    } else if (type === 'scholarship') {
      let data = JSON.parse(fs.readFileSync(scholarshipsFile, 'utf-8'));
      data = data.filter(item => item.id !== id);
      fs.writeFileSync(scholarshipsFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    res.json({ success: true, message: "Lead removed successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete lead." });
  }
});

// Route: Admin Dashboard page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 PW Helpline Robertsganj 3D Server running at http://localhost:${PORT}`);
  console.log(`📊 Owner Admin Portal available at http://localhost:${PORT}/admin`);
});
