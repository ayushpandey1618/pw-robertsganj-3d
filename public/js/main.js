/**
 * Main Application Logic & Interactivity
 * Physics Wallah Coaching Helpline Robertsganj
 */

// ==========================================
// 1. Web Audio API Sound Synthesizer
// ==========================================
const PWAudio = {
  ctx: null,
  enabled: true,

  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      this.enabled = false;
    }
  },

  playHoverSound() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  },

  playClickSound() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  },

  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById('audio-toggle');
    if (btn) {
      btn.innerHTML = this.enabled
        ? '<i class="fa-solid fa-volume-high"></i>'
        : '<i class="fa-solid fa-volume-xmark"></i>';
      btn.classList.toggle('muted', !this.enabled);
    }
    if (window.PWApi) {
      window.PWApi.showToast(this.enabled ? 'Sound FX Enabled' : 'Sound FX Muted');
    }
  }
};

window.PWAudio = PWAudio;

// ==========================================
// 2. Bilingual Support (English / हिंदी)
// ==========================================
const translations = {
  en: {
    open24: "Open 24 Hours Helpline Center",
    bannerNsat: "PW NSAT Scholarship Test: Win Up to 90% Scholarship!",
    applyNow: "Check Eligibility →",
    navAbout: "About Center",
    navResults: "AIR Results",
    navCourses: "Batches & AITS",
    navScholarship: "NSAT (90%)",
    navReviews: "Reviews (3.6★)",
    navLocation: "Directions",
    getCall: "Request Callback",
    heroBadge: "Official Robertsganj Helpline & Guidance Center",
    heroTitle1: "Crack IIT JEE & NEET With",
    heroTitle2: "Physics Wallah Robertsganj",
    heroDesc: "Your trusted admission helpline & offline guidance hub in Sonbhadra. Prepare for NEET UG 2026/2027 & JEE Advanced with India's most beloved educators, personalized study plans, offline AITS test series, and up to 90% NSAT scholarships.",
    heroCallNow: "Call Counselor: 074288 90305",
    heroWhatsApp: "WhatsApp Helpline",
    heroNSATBtn: "NSAT Scholarship (Up to 90%)",
    hero247: "24 / 7",
    heroSupport: "Active Helpline",
    heroReviews: "14 Verified Reviews",
    heroDiscount: "NSAT Scholarship",
    hudHint: "Click & drag to rotate the 3D Atomic Core • Click nodes to explore subjects",
    exploreSyllabus: "Explore Curriculum",
    resultsTag: "PROVEN TRACK RECORD",
    resultsTitle: "Our Recent Results",
    resultsTitle2: "Speak Volumes",
    resultsDesc: "PW students continue to create history across India. Prepare with our Robertsganj team to unlock your potential and secure top engineering & medical seats.",
    air1000: "Students Under AIR 1,000",
    air1000Sub: "Securing top AIIMS & premier IIT campuses nationwide.",
    air2500: "Achieved Under AIR 2,500",
    air2500Sub: "Consistently breaking into premier government medical & NIT colleges.",
    air5000: "Achieved Under AIR 5,000",
    air5000Sub: "Remarkable score jumps with structured test series & revision.",
    air10000: "Students Under AIR 10,000",
    air10000Sub: "Enabling dreams of lakhs of tier-2 & tier-3 town aspirants.",
    air20000: "Students Under AIR 20,000",
    air20000Sub: "Proven methodologies delivered right here in Robertsganj.",
    nsatTitle: "Physics Wallah Scholarship",
    nsatSub: "Cum Admission Test (NSAT)",
    nsatText: "Don't miss out on scholarship opportunities of up to 90% on tuition fees! Evaluate your potential, win cash rewards, and kickstart your preparation with India's best educators.",
    nsatB1: "Up to 90% Fee Waiver for Robertsganj & Sonbhadra students",
    nsatB2: "Available for Class 8th to 12th & 12th Passed (Dropper)",
    nsatB3: "Both Online & Center Offline Guidance available",
    nsatB4: "National Level Benchmarking with AIR projection",
    needHelp: "Need guidance regarding NSAT syllabus or offline test registration?",
    calcHeading: "Calculate Your Estimated Scholarship",
    calcSub: "Instant eligibility estimation based on your academic profile",
    lblName: "Student Full Name *",
    lblPhone: "Mobile Number (WhatsApp) *",
    lblClass: "Current Grade / Class",
    lblTarget: "Target Exam",
    lblScore: "Previous Academic Score (%):",
    btnCalc: "Calculate Scholarship & Claim Coupon",
    scholarshipQualified: "You Qualify For:",
    coursesTag: "COMPREHENSIVE ADMISSION PROGRAMS",
    coursesTitle: "Programs Available at",
    coursesTitle2: "Robertsganj Helpline",
    coursesDesc: "Guidance for online batches, offline Vidyapeeth counseling, and All India Test Series (AITS).",
    btnEnquire: "Enquire Now →",
    reviewsTag: "AUTHENTIC COMMUNITY REVIEWS",
    reviewsTitle: "Verified Feedback from",
    reviewsTitle2: "Robertsganj Students",
    reviewsDesc: "Transparent student questions and official responses directly addressing Vidyapeeth admissions, offline AITS test series, and NSAT exam registration.",
    ratingCount: "14 Google Reviews",
    reviewPrompt: "Have questions about our Robertsganj center or want to share feedback?",
    writeReview: "Write a Review on Google",
    locTag: "VISIT OR CALL",
    locTitle: "Robertsganj Center Location",
    addrLabel: "Address:",
    phoneLabel: "Helpline Phone:",
    open24Hours: "● Open 24 Hours (Direct Dial)",
    getDirections: "Get Directions on Maps",
    shareDetails: "Share Center Details",
    faqTag: "FREQUENTLY ASKED QUESTIONS",
    faqTitle: "Everything You Need to Know",
    modalTitle: "Request an Instant Callback",
    modalDesc: "Speak directly with our Tagore Nagar senior counselor for NEET, JEE, or NSAT guidance.",
    btnSubmitCallback: "Submit Counseling Request"
  },
  hi: {
    open24: "24 घंटे खुली हेल्पलाइन केंद्र",
    bannerNsat: "पीडब्ल्यू एनएसएटी छात्रवृत्ति परीक्षा: 90% तक छात्रवृत्ति पाएं!",
    applyNow: "पात्रता जांचें →",
    navAbout: "केंद्र के बारे में",
    navResults: "रैंक परिणाम",
    navCourses: "बैच और टेस्ट सीरीज़",
    navScholarship: "एनएसएटी (90% छूट)",
    navReviews: "समीक्षाएं (3.6★)",
    navLocation: "रास्ता और पता",
    getCall: "कॉल बैक अनुरोध",
    heroBadge: "आधिकारिक राबर्ट्सगंज हेल्पलाइन एवं मार्गदर्शन केंद्र",
    heroTitle1: "आईआईटी जी और नीट की तैयारी करें",
    heroTitle2: "फिजिक्स वल्लाह राबर्ट्सगंज के साथ",
    heroDesc: "सोनभद्र में आपका विश्वसनीय प्रवेश हेल्पलाइन और मार्गदर्शन केंद्र। नीट यूजी 2026/2027 और जेईई एडवांस्ड की तैयारी देश के सर्वश्रेष्ठ शिक्षकों, ऑफलाइन एआईटीएस टेस्ट सीरीज और 90% तक एनएसएटी छात्रवृत्ति के साथ करें।",
    heroCallNow: "काउंसलर से बात करें: 074288 90305",
    heroWhatsApp: "व्हाट्सएप हेल्पलाइन",
    heroNSATBtn: "एनएसएटी छात्रवृत्ति (90% तक)",
    hero247: "24 घंटे",
    heroSupport: "सक्रिय हेल्पलाइन",
    heroReviews: "14 सत्यापित समीक्षाएं",
    heroDiscount: "एनएसएटी छात्रवृत्ति",
    hudHint: "3D परमाणु कोर को घुमाने के लिए ड्रैग करें • विषयों को देखने के लिए नोड्स पर क्लिक करें",
    exploreSyllabus: "पाठ्यक्रम देखें",
    resultsTag: "अभूतपूर्व परिणाम",
    resultsTitle: "हमारे हालिया परिणाम",
    resultsTitle2: "सफलता की गवाही",
    resultsDesc: "पीडब्ल्यू के छात्र पूरे भारत में इतिहास रच रहे हैं। अपनी क्षमता को अनलॉक करें और टॉप मेडिकल व इंजीनियरिंग कॉलेज में सीट पक्की करें।",
    air1000: "AIR 1,000 के अंदर 53 छात्र",
    air1000Sub: "शीर्ष एम्स और प्रमुख आईआईटी संस्थानों में चयन।",
    air2500: "AIR 2,500 के अंदर 197+ छात्र",
    air2500Sub: "शीर्ष सरकारी मेडिकल कॉलेजों और एनआईटी में प्रवेश।",
    air5000: "AIR 5,000 के अंदर 470+ छात्र",
    air5000Sub: "संरचित टेस्ट सीरीज से अभूतपूर्व सुधार।",
    air10000: "AIR 10,000 के अंदर 1,052+ छात्र",
    air10000Sub: "छोटे शहरों और कस्बों के छात्रों के सपनों को साकार करना।",
    air20000: "AIR 20,000 के अंदर 2,160+ छात्र",
    air20000Sub: "राबर्ट्सगंज में ही प्रमाणित शिक्षण मार्गदर्शन।",
    nsatTitle: "फिजिक्स वल्लाह छात्रवृत्ति",
    nsatSub: "सह प्रवेश परीक्षा (NSAT)",
    nsatText: "ट्यूशन फीस पर 90% तक की छात्रवृत्ति का मौका न चूकें! अपनी तैयारी का मूल्यांकन करें और भारत के सर्वश्रेष्ठ शिक्षकों से मार्गदर्शन प्राप्त करें।",
    nsatB1: "राबर्ट्सगंज और सोनभद्र के छात्रों के लिए 90% तक फीस में छूट",
    nsatB2: "कक्षा 8वीं से 12वीं और 12वीं उत्तीर्ण (ड्रॉपर) के लिए उपलब्ध",
    nsatB3: "ऑनलाइन और केंद्र मार्गदर्शन दोनों उपलब्ध",
    nsatB4: "अखिल भारतीय रैंक प्रक्षेपण",
    needHelp: "एनएसएटी सिलेबस या ऑफलाइन टेस्ट के लिए मार्गदर्शन चाहिए?",
    calcHeading: "अपनी अनुमानित छात्रवृत्ति जांचें",
    calcSub: "अपने शैक्षणिक अंकों के आधार पर तत्काल पात्रता",
    lblName: "छात्र का पूरा नाम *",
    lblPhone: "मोबाइल नंबर (व्हाट्सएप) *",
    lblClass: "वर्तमान कक्षा",
    lblTarget: "लक्ष्य परीक्षा",
    lblScore: "पिछली कक्षा के अंक (%):",
    btnCalc: "छात्रवृत्ति गणना करें और कूपन पाएं",
    scholarshipQualified: "आप पात्र हैं:",
    coursesTag: "व्यापक प्रवेश कार्यक्रम",
    coursesTitle: "राबर्ट्सगंज हेल्पलाइन पर",
    coursesTitle2: "उपलब्ध पाठ्यक्रम",
    coursesDesc: "ऑनलाइन बैच, ऑफलाइन विद्यापीठ परामर्श और अखिल भारतीय टेस्ट सीरीज़ (AITS) के लिए सहायता।",
    btnEnquire: "अभी पूछताछ करें →",
    reviewsTag: "सत्यापित समीक्षाएं",
    reviewsTitle: "राबर्ट्सगंज छात्रों की",
    reviewsTitle2: "वास्तविक प्रतिक्रिया",
    reviewsDesc: "विद्यापीठ प्रवेश, ऑफलाइन एआईटीएस टेस्ट सीरीज और एनएसएटी परीक्षा पर छात्रों के सवाल और केंद्र के आधिकारिक जवाब।",
    ratingCount: "14 गूगल समीक्षाएं",
    reviewPrompt: "राबर्ट्सगंज केंद्र के बारे में कोई सवाल है या समीक्षा देना चाहते हैं?",
    writeReview: "गूगल पर समीक्षा लिखें",
    locTag: "मुलाकात करें या कॉल करें",
    locTitle: "राबर्ट्सगंज केंद्र का पता",
    addrLabel: "पता:",
    phoneLabel: "हेल्पलाइन फोन:",
    open24Hours: "● 24 घंटे खुला (सीधा फोन करें)",
    getDirections: "गूगल मैप्स पर रास्ता देखें",
    shareDetails: "केंद्र की जानकारी साझा करें",
    faqTag: "अक्सर पूछे जाने वाले प्रश्न",
    faqTitle: "महत्वपूर्ण जानकारी",
    modalTitle: "तुरंत कॉल बैक प्राप्त करें",
    modalDesc: "नीट, जेईई या एनएसएटी के लिए हमारे टैगोर नगर वरिष्ठ काउंसलर से सीधी बात करें।",
    btnSubmitCallback: "काउंसलिंग का अनुरोध भेजें"
  }
};

let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.querySelector('.lang-current').textContent = lang.toUpperCase();
    langBtn.querySelector('.lang-alt').textContent = lang === 'en' ? 'हिंदी' : 'ENG';
  }
}

// ==========================================
// 3. Document Ready Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Init Audio
  PWAudio.init();
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => PWAudio.toggle());
  }

  // Language Switch
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'hi' : 'en');
      PWAudio.playClickSound();
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
  }

  // Range Slider reactive score display
  const scoreSlider = document.getElementById('score-slider');
  const scoreDisplay = document.getElementById('score-display');
  if (scoreSlider && scoreDisplay) {
    scoreSlider.addEventListener('input', (e) => {
      scoreDisplay.textContent = `${e.target.value}%`;
    });
  }

  // Scholarship Calculator Form
  const calcForm = document.getElementById('scholarship-calc-form');
  const calcResultBox = document.getElementById('calc-result');
  const discountOutput = document.getElementById('discount-output');
  const ticketBadge = document.getElementById('ticket-badge');

  if (calcForm) {
    calcForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      PWAudio.playClickSound();

      const btn = document.getElementById('calc-submit-btn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';

      const formData = {
        studentName: calcForm.studentName.value.trim(),
        phone: calcForm.phone.value.trim(),
        currentClass: calcForm.currentClass.value,
        targetExam: calcForm.targetExam.value,
        prevPercentage: calcForm.prevPercentage.value
      };

      const result = await window.PWApi.calculateScholarship(formData);
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-calculator"></i> Calculate Scholarship & Claim Coupon';

      if (result.success) {
        discountOutput.textContent = `Up to ${result.estimatedScholarship} Scholarship!`;
        ticketBadge.textContent = `VOUCHER: ${result.details.id}`;
        
        // Add direct WhatsApp notification link for owner
        if (result.ownerWhatsAppUrl) {
          let waBtn = document.getElementById('calc-wa-btn');
          if (!waBtn) {
            waBtn = document.createElement('a');
            waBtn.id = 'calc-wa-btn';
            waBtn.target = '_blank';
            waBtn.rel = 'noopener noreferrer';
            waBtn.className = 'btn-whatsapp';
            waBtn.style.width = '100%';
            waBtn.style.marginTop = '12px';
            waBtn.style.justifyContent = 'center';
            waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Send Voucher to Center (074288 90305)';
            calcResultBox.appendChild(waBtn);
          }
          waBtn.href = result.ownerWhatsAppUrl;
        }

        calcResultBox.classList.remove('hidden');
        window.PWApi.showToast(result.message);
        PWAudio.playHoverSound();
      } else {
        window.PWApi.showToast(result.error || 'Calculation failed', false);
      }
    });
  }

  // Modal Controls
  const enquiryModal = document.getElementById('enquiry-modal');
  const openModalBtns = document.querySelectorAll('#open-enquiry-modal, .trigger-enquiry');
  const closeModalBtn = document.getElementById('modal-close-btn');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course');
      if (course) {
        const select = document.getElementById('enq-course');
        if (select) select.value = course;
      }
      enquiryModal.classList.add('open');
      enquiryModal.setAttribute('aria-hidden', 'false');
      PWAudio.playClickSound();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      enquiryModal.classList.remove('open');
      enquiryModal.setAttribute('aria-hidden', 'true');
    });
  }

  enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
      enquiryModal.classList.remove('open');
      enquiryModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Helpline Enquiry Submission
  const enquiryForm = document.getElementById('helpline-enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      PWAudio.playClickSound();

      const btn = document.getElementById('enquiry-submit-btn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      const data = {
        name: enquiryForm.name.value.trim(),
        phone: enquiryForm.phone.value.trim(),
        course: enquiryForm.course.value,
        targetYear: enquiryForm.targetYear.value,
        message: enquiryForm.message.value.trim()
      };

      const res = await window.PWApi.submitEnquiry(data);
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Counseling Request';

      if (res.success) {
        window.PWApi.showToast(res.message);
        
        // Show success state with direct WhatsApp notification button for the owner
        const modalDialog = enquiryModal.querySelector('.modal-dialog');
        const originalContent = modalDialog.innerHTML;
        
        modalDialog.innerHTML = `
          <button class="modal-close" onclick="document.getElementById('enquiry-modal').classList.remove('open')">&times;</button>
          <div style="text-align: center; padding: 20px 0;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid var(--pw-emerald); color: var(--pw-emerald); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 16px;">
              <i class="fa-solid fa-check"></i>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 8px;">Counseling Request Submitted!</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5;">
              Ticket ID: <strong style="color: var(--pw-cyan);">${res.ticketId}</strong><br />
              Details have been registered on the Robertsganj center desk.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="${res.ownerWhatsAppUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp w-100" style="justify-content: center; text-decoration: none;">
                <i class="fa-brands fa-whatsapp"></i> Send Direct WhatsApp Alert to Center
              </a>
              <a href="tel:07428890305" class="btn-primary-glow w-100" style="justify-content: center; text-decoration: none;">
                <i class="fa-solid fa-phone"></i> Call Now (074288 90305)
              </a>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 14px;">
              Counselor will also view this lead directly in the Robertsganj Admin Dashboard.
            </p>
          </div>
        `;

        PWAudio.playHoverSound();
      } else {
        window.PWApi.showToast(res.error || 'Failed to submit', false);
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
        PWAudio.playClickSound();
      }
    });
  });

  // Share Center Button
  const shareBtn = document.getElementById('share-center-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      window.PWApi.shareCenter();
      PWAudio.playClickSound();
    });
  }

  // Animated Counters on Scroll
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.ceil(target / 45);
            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = count;
              }
            }, 30);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const resultsSection = document.getElementById('results');
  if (resultsSection) observer.observe(resultsSection);

  // 3D Card Tilt Effect on Mouse Move
  const tiltCards = document.querySelectorAll('.result-box, .course-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(800px) rotateX(${-y * 0.04}deg) rotateY(${x * 0.04}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // General click sound for all CTA buttons
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => PWAudio.playHoverSound());
  });
});
