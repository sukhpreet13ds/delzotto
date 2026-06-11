document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const floatingNavBar = document.getElementById('floatingNavBar');
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const panelCloseBtn = document.getElementById('panelCloseBtn');
    const panelDropdownToggle = document.querySelector('.panel-dropdown-toggle');
    const panelDropdown = document.querySelector('.panel-dropdown');

    // 1. Mobile Menu Panel Toggle
    if (burgerMenuBtn && mobileMenuPanel) {
        burgerMenuBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background page scroll when panel is open
        });
    }

    if (panelCloseBtn && mobileMenuPanel) {
        panelCloseBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.remove('active');
            document.body.style.overflow = ''; // Restore background page scroll
        });
    }

    // 2. Mobile Dropdown Toggle (Services dropdown in mobile view)
// 2. Mobile Dropdown Toggles
const panelDropdowns = document.querySelectorAll('.panel-dropdown');

panelDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.panel-dropdown-toggle');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();

        // Optional: close other open dropdowns
        panelDropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

    // 3. Desktop Scroll Behavior (Sticky/Floating Nav items bar)
    window.addEventListener('scroll', () => {
        // Floating navbar only triggers on desktops/landscape tablets (>= 992px)
        if (window.innerWidth >= 992) {
            if (window.scrollY > 120) {
                mainHeader.classList.add('scrolled-down');
                floatingNavBar.classList.add('active');
            } else {
                mainHeader.classList.remove('scrolled-down');
                floatingNavBar.classList.remove('active');
            }
        } else {
            // Remove scroll styling on smaller views
            mainHeader.classList.remove('scrolled-down');
            floatingNavBar.classList.remove('active');
        }
    });

    // 4. Handle Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            mainHeader.classList.remove('scrolled-down');
            floatingNavBar.classList.remove('active');
        } else {
            // If user expands screen width while mobile panel is open, close it
            if (mobileMenuPanel && mobileMenuPanel.classList.contains('active')) {
                mobileMenuPanel.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // 5. Stat Count Animation (1 to 50)
    const countNumber = document.getElementById('countNumber');
    if (countNumber) {
        let target = 50;
        let duration = 1800; // duration in milliseconds
        let startTime = null;

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            
            // Ease-out cubic calculation for smooth slowdown at the end
            const easeOutCubic = 1 - Math.pow(1 - percent, 3);
            const currentCount = Math.floor(easeOutCubic * (target - 1) + 1);
            
            countNumber.textContent = currentCount;
            
            if (percent < 1) {
                requestAnimationFrame(animateCount);
            } else {
                countNumber.textContent = target;
            }
        };

        // Delay slightly for visual comfort after page load
        setTimeout(() => {
            requestAnimationFrame(animateCount);
        }, 300);
    }

    // 6. Loop Mini Image Switcher (hero-right-mini.png <-> hero-right-mini-2.png)
    const miniImg1 = document.getElementById('miniImg1');
    const miniImg2 = document.getElementById('miniImg2');
    if (miniImg1 && miniImg2) {
        setInterval(() => {
            if (miniImg1.classList.contains('active')) {
                miniImg1.classList.remove('active');
                miniImg2.classList.add('active');
            } else {
                miniImg2.classList.remove('active');
                miniImg1.classList.add('active');
            }
        }, 4000); // changes image every 4 seconds
    }
    // Apps side panel
    const appsPanel = document.getElementById("appsSidePanel");
    const appsBackdrop = document.getElementById("appsPanelBackdrop");
    const appsClose = document.getElementById("appsPanelClose");

    // Open buttons
    const appsOpenButtons = document.querySelectorAll(".apps-btn");

    // Open panel
    appsOpenButtons.forEach(button => {
        button.addEventListener("click", function () {
            appsPanel.classList.add("open");
            document.body.style.overflow = "hidden"; // Prevent page scroll
        });
    });

    // Close panel function
    function closeAppsPanel() {
        appsPanel.classList.remove("open");
        document.body.style.overflow = "";
    }

    // Close button
    appsClose.addEventListener("click", closeAppsPanel);

    // Backdrop click
    appsBackdrop.addEventListener("click", closeAppsPanel);

    // ESC key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && appsPanel.classList.contains("open")) {
            closeAppsPanel();
        }
    });

    // YouTube Video Play Action
    const locationPlayBtn = document.getElementById('locationPlayBtn');
    const locationVideoWrapper = document.getElementById('locationVideoWrapper');
    if (locationPlayBtn && locationVideoWrapper) {
        locationPlayBtn.addEventListener('click', () => {
            locationVideoWrapper.innerHTML = `
                <iframe src="https://www.youtube.com/embed/H1F46w6IfKU?autoplay=1" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                </iframe>
            `;
        });
    }

    // ==========================================
    // PROJECTS SLIDER LOGIC
    // ==========================================
    const sliderWrapper = document.getElementById('projectsSliderWrapper');
    const prevBtn = document.getElementById('projectsPrevBtn');
    const nextBtn = document.getElementById('projectsNextBtn');
    const rangeFill = document.getElementById('projectsRangeFill');
    
    if (sliderWrapper) {
        const slides = Array.from(sliderWrapper.querySelectorAll('.project-slide'));
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoSlideTimer = null;

        function updateSlider() {
            slides.forEach((slide, idx) => {
                slide.classList.remove('active', 'prev', 'next');
                
                // Determine layout mapping
                const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                const nextIndex = (currentIndex + 1) % totalSlides;

                if (idx === currentIndex) {
                    slide.classList.add('active');
                } else if (idx === prevIndex) {
                    slide.classList.add('prev');
                } else if (idx === nextIndex) {
                    slide.classList.add('next');
                }
            });

            // Update bottom range bar fill
            if (rangeFill) {
                const fillPercentage = ((currentIndex + 1) / totalSlides) * 100;
                rangeFill.style.width = `${fillPercentage}%`;
            }
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        // Auto sliding timer (runs every 2 seconds)
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideTimer = setInterval(() => {
                showNext();
            }, 2000);
        }

        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
            }
        }

        function resetAutoSlide() {
            startAutoSlide();
        }

        // Controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showNext();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showPrev();
                resetAutoSlide();
            });
        }

        // Click on a slide directly to go to it
        slides.forEach((slide, idx) => {
            slide.addEventListener('click', (e) => {
                // If it is next or prev slide, go to it
                if (slide.classList.contains('next')) {
                    e.preventDefault();
                    showNext();
                    resetAutoSlide();
                } else if (slide.classList.contains('prev')) {
                    e.preventDefault();
                    showPrev();
                    resetAutoSlide();
                }
            });
        });

        // Touch Swipe / Drag Handling
        let startX = 0;
        let isDragging = false;

        sliderWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        }, { passive: true });

        sliderWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        }, { passive: true });

        sliderWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (diff > 50) {
                showNext();
            } else if (diff < -50) {
                showPrev();
            }
            isDragging = false;
            resetAutoSlide();
        }, { passive: true });

        // Mouse Drag Handling
        sliderWrapper.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            stopAutoSlide();
        });

        sliderWrapper.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            const endX = e.clientX;
            const diff = startX - endX;
            if (diff > 50) {
                showNext();
            } else if (diff < -50) {
                showPrev();
            }
            isDragging = false;
            resetAutoSlide();
        });

        sliderWrapper.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                resetAutoSlide();
            }
        });

        // Initialize state
        updateSlider();
        startAutoSlide();
    }

});
