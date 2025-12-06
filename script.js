// شريف قريش - موقع مصمم جرافيك
// ملف JavaScript للحركات والتأثيرات مع تحسينات الموبايل

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR EFFECTS =====
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // تأثير الشريط عند التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // إخفاء/إظهار الشريط على الجوال
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // التمرير لأسفل
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // التمرير لأعلى
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // زر العودة للأعلى
        const backToTop = document.getElementById('back-to-top');
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // تفعيل مهارات الشريط
        activateSkillsOnScroll();
    });
    
    // القائمة المتنقلة للجوال
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // منع التمرير عند فتح القائمة
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        }
    });
    
    // منع إغلاق القائمة عند النقر داخلها
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ===== TOUCH FRIENDLY NAVIGATION =====
    // تحسين التنقل باللمس
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
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
                // إغلاق القائمة على الجوال
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    body.style.overflow = '';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMATE ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
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
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
    
    // تفعيل مهارات الشريط عند التمرير
    function activateSkillsOnScroll() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > sectionTop - windowHeight + 100 && 
            scrollPosition < sectionTop + sectionHeight) {
            
            document.querySelectorAll('.skill-level').forEach((level, index) => {
                const percent = level.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
                setTimeout(() => {
                    level.style.width = percent;
                }, index * 200);
            });
        }
    }
    
    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target) {
        if (element.hasAttribute('data-animated')) return;
        
        element.setAttribute('data-animated', 'true');
        const duration = 1500;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target.includes('+') ? '' : '');
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
    
    // تحسين للجوال
    backToTopBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.add('active');
    });
    
    backToTopBtn.addEventListener('touchend', function() {
        this.classList.remove('active');
    });
    
    // ===== WHATSAPP FLOAT BUTTON =====
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        whatsappFloat.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
    }
    
    // ===== UPDATE COPYRIGHT YEAR =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== HERO ANIMATION =====
    const heroTitle = document.querySelector('.animated-text');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // ===== PREVENT ZOOM ON MOBILE =====
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // ===== FIX VIEWPORT HEIGHT ON MOBILE =====
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // ===== LAZY LOAD IMAGES =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ===== SERVICE CARD HOVER EFFECT =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // ===== INITIALIZE ANIMATIONS =====
    initFloatingElements();
    activateSkillsOnScroll();
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            window.cancelAnimationFrame(scrollTimer);
        }
        scrollTimer = window.requestAnimationFrame(function() {
            // Scroll handling code here
        });
    });
});

// ===== ADDITIONAL ANIMATIONS =====
function initFloatingElements() {
    const elements = document.querySelectorAll('.element');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`;
    });
}

// ===== LOADING STATE =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // إخفاء loader إذا موجود
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// ===== FALLBACK FOR OLDER BROWSERS =====
// Add class for touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.documentElement.classList.add('touch-device');
} else {
    document.documentElement.classList.add('no-touch-device');
}

// ===== POLYFILL FOR SMOOTH SCROLL =====
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js').then(() => {
        // Polyfill loaded
    });
}

// ===== PREVENT CONTEXT MENU ON MOBILE =====
document.addEventListener('contextmenu', function(e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
    }
});

// ===== HANDLE ORIENTATION CHANGE =====
let landscapeWarning = null;
window.addEventListener('orientationchange', function() {
    if (Math.abs(window.orientation) === 90) {
        // Landscape mode
        if (!landscapeWarning) {
            landscapeWarning = document.createElement('div');
            landscapeWarning.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                           background: rgba(0,0,0,0.9); color: white; z-index: 9999;
                           display: flex; flex-direction: column; align-items: center; 
                           justify-content: center; text-align: center; padding: 20px;">
                    <i class="fas fa-rotate-left" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 10px;">الرجاء تدوير الجهاز</h3>
                    <p>لتجربة أفضل، يُفضل استخدام الوضع الرأسي (Portrait)</p>
                </div>
            `;
            document.body.appendChild(landscapeWarning);
        }
    } else {
        // Portrait mode
        if (landscapeWarning) {
            document.body.removeChild(landscapeWarning);
            landscapeWarning = null;
        }
    }
});