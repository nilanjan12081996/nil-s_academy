/**
 * Nilanjan's CS Academy - Interactive Script
 * Features:
 * - Dynamic Fee Calculator (Updated with ₹600/mo School, ₹700/mo College + ₹100/yr, ₹1000/mo Special)
 * - Exclusively Offline Classroom & 1-on-1 Batches in Kolkata
 * - WhatsApp integration with real number: +91 70038 72448
 * - 100% Free Demo Class Booking
 * - Course filtering tabs (All, School, College, Special Tech, Competitive)
 * - FAQ accordion toggling
 * - Clean mobile responsive navigation
 */

// Global Configuration with User's Real Contact Details
const TUTOR_CONFIG = {
    phone: "+917003872448",
    whatsappNumber: "917003872448",
    email: "nilanjandasgupta0@gmail.com",
    address: "N, 92/B Paharpur Road, Kolkata - 700024 (Opposite of Old Bank of India, near Harimohan Ghosh College)",
    mentorName: "Nilanjan Sir",
    academyName: "Nilanjan's CS Academy",
    location: "Kolkata (Offline Batches)"
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCourseFilters();
    initFeeCalculator();
    initModal();
    initFaqAccordion();
    initForms();
    initSmoothScroll();
});

/* ==========================================================================
   1. Navigation & Scroll Effects
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
}

/* ==========================================================================
   2. Course Filter Tabs
   ========================================================================== */
function initCourseFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/* ==========================================================================
   3. Interactive Fee Calculator (Updated exact pricing math)
   ========================================================================== */
function initFeeCalculator() {
    const gradeSelect = document.getElementById('calc-grade');
    const formatRadios = document.querySelectorAll('input[name="calc-format"]');
    const calculatedAmountEl = document.getElementById('calculated-amount');
    const calcBookBtn = document.getElementById('calc-book-btn');
    const calcWaBtn = document.getElementById('calc-wa-btn');

    if (!gradeSelect || !calculatedAmountEl) return;

    function calculateFee() {
        const selectedOption = gradeSelect.options[gradeSelect.selectedIndex];
        let baseFee = parseInt(selectedOption.getAttribute('data-base') || 600, 10);

        let selectedFormat = 'small-batch';
        formatRadios.forEach(r => {
            if (r.checked) selectedFormat = r.value;
        });

        let multiplier = 1.0;
        if (selectedFormat === 'one-on-one') {
            multiplier = 1.5; // 1-on-1 personal offline attention
        }

        const finalAmount = Math.round(baseFee * multiplier);
        calculatedAmountEl.textContent = finalAmount.toLocaleString('en-IN');

        const courseText = selectedOption.text;
        const formatText = selectedFormat === 'one-on-one' ? '1-on-1 Personal Tuition' : 'Small Batch';

        const waMessage = `Hi ${TUTOR_CONFIG.mentorName}, I used your website Fee Calculator for:
- Course: ${courseText}
- Learning Mode: Offline Kolkata (${formatText})
- Estimated Fee: ₹${finalAmount.toLocaleString('en-IN')}/month.
I would like to book a Free Demo session (Free of Cost). Please share available slots!`;

        if (calcWaBtn) {
            calcWaBtn.href = `https://wa.me/${TUTOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
        }

        return {
            amount: finalAmount,
            course: courseText,
            format: formatText
        };
    }

    gradeSelect.addEventListener('change', calculateFee);
    formatRadios.forEach(r => r.addEventListener('change', calculateFee));

    if (calcBookBtn) {
        calcBookBtn.addEventListener('click', () => {
            const currentSelection = calculateFee();
            openModal(currentSelection.course);
        });
    }

    calculateFee();
}

/* ==========================================================================
   4. Modal Dialog (Free Demo Booking)
   ========================================================================== */
function initModal() {
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('modal-close');
    const openBtns = document.querySelectorAll('.open-demo-btn');
    const enrollBtns = document.querySelectorAll('.enroll-btn');

    if (!modal) return;

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    enrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseName = btn.getAttribute('data-course');
            openModal(courseName);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

function openModal(preSelectedCourse = '') {
    const modal = document.getElementById('demo-modal');
    if (!modal) return;

    if (preSelectedCourse) {
        const courseSelect = document.getElementById('modal-course');
        if (courseSelect) {
            for (let i = 0; i < courseSelect.options.length; i++) {
                if (courseSelect.options[i].text.toLowerCase().includes(preSelectedCourse.toLowerCase()) ||
                    preSelectedCourse.toLowerCase().includes(courseSelect.options[i].value.toLowerCase())) {
                    courseSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const btn = otherItem.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ==========================================================================
   6. Form Submissions with Direct WhatsApp Dispatch to 7003872448
   ========================================================================== */
function initForms() {
    // 1. Modal Form
    const modalForm = document.getElementById('modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modal-name').value.trim();
            const phone = document.getElementById('modal-phone').value.trim();
            const course = document.getElementById('modal-course').value;

            if (!name || !phone) {
                alert('Please fill in student name and phone number.');
                return;
            }

            const waText = `Hello ${TUTOR_CONFIG.mentorName}, I would like to book a 100% Free Demo Class:
- Student Name: ${name}
- Phone: ${phone}
- Interested Course: ${course}
- Mode: Offline Kolkata
Please confirm the schedule. Thank you!`;

            const waUrl = `https://wa.me/${TUTOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
            closeModal();
            modalForm.reset();
        });
    }

    // 2. Main Contact Form
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('student-name').value.trim();
            const phone = document.getElementById('student-phone').value.trim();
            const level = document.getElementById('student-level').value;
            const format = document.getElementById('student-format') ? document.getElementById('student-format').value : 'Offline Classroom Batch (Kolkata)';
            const message = document.getElementById('student-message').value.trim();

            if (!name || !phone || !level) {
                alert('Please complete the required fields (Name, Phone, Course Level).');
                return;
            }

            const waText = `Hello ${TUTOR_CONFIG.mentorName}, I am interested in joining ${TUTOR_CONFIG.academyName}:
- Student Name: ${name}
- Phone: ${phone}
- Class/Course: ${level}
- Learning Mode: ${format}
${message ? `- Query/Topic: ${message}` : ''}

Please connect with me regarding batch timings and free demo session.`;

            const waUrl = `https://wa.me/${TUTOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
            admissionForm.reset();
        });
    }
}

/* ==========================================================================
   7. Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#demo-modal') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
