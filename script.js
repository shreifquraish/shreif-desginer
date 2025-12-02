// شريف قريش - موقع مصمم جرافيك
// ملف JavaScript للحركات والتأثيرات

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR EFFECTS =====
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // تأثير الشريط عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // زر العودة للأعلى
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // القائمة المتنقلة
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // ===== SCROLL ANIMATIONS =====
    // تأثير التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMATE ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // عناصر الخدمات
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // عناصر الإحصائيات
                if (entry.target.classList.contains('stat-number')) {
                    const finalValue = entry.target.getAttribute('data-count');
                    animateCounter(entry.target, finalValue);
                }
                
                // عناصر المهارات
                if (entry.target.classList.contains('skill-item')) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    const percent = entry.target.querySelector('.skill-percent').textContent;
                    skillLevel.style.width = percent;
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
    
    document.querySelectorAll('.skill-item').forEach(skill => {
        observer.observe(skill);
    });
    
    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target) {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-count').includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // ===== BACK TO TOP =====
    const backToTopBtn = document.getElementById('back-to-top');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== WHATSAPP BUTTON CONFIRMATION =====
    document.querySelectorAll('.whatsapp-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // يمكن إضافة تأكيد إذا أردت
            console.log('جارٍ التوجيه إلى واتساب...');
        });
    });
    
    // ===== UPDATE COPYRIGHT YEAR =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== HERO ANIMATION =====
    // إضافة تأثير كتابة للنص (اختياري)
    const heroTitle = document.querySelector('.animated-text');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // ===== PRELOADER (اختياري) =====
    // إذا أردت إضافة شاشة تحميل
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        }, 100);
    });
});

// ===== ADDITIONAL ANIMATIONS =====
// تأثيرات إضافية للعناصر العائمة
function initFloatingElements() {
    const elements = document.querySelectorAll('.element');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`;
    });
}

// تهيئة عند تحميل الصفحة
window.addEventListener('load', initFloatingElements);

// ===== SERVICE CARD HOVER EFFECT =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});