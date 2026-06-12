document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const floatingNavBar = document.getElementById('floatingNavBar');
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const panelCloseBtn = document.getElementById('panelCloseBtn');
    const panelDropdownToggle = document.querySelector('.panel-dropdown-toggle');
    const panelDropdown = document.querySelector('.panel-dropdown');

    if (burgerMenuBtn && mobileMenuPanel) {
        burgerMenuBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    }

    if (panelCloseBtn && mobileMenuPanel) {
        panelCloseBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }

 
const panelDropdowns = document.querySelectorAll('.panel-dropdown');

panelDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.panel-dropdown-toggle');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();

        panelDropdowns.forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });

       
        dropdown.classList.toggle('active');
    });
});

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 992) {
            if (window.scrollY > 120) {
                mainHeader.classList.add('scrolled-down');
                floatingNavBar.classList.add('active');
            } else {
                mainHeader.classList.remove('scrolled-down');
                floatingNavBar.classList.remove('active');
            }
        } else {
            mainHeader.classList.remove('scrolled-down');
            floatingNavBar.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            mainHeader.classList.remove('scrolled-down');
            floatingNavBar.classList.remove('active');
        } else {
            
            if (mobileMenuPanel && mobileMenuPanel.classList.contains('active')) {
                mobileMenuPanel.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    const countNumber = document.getElementById('countNumber');
    if (countNumber) {
        let target = 50;
        let duration = 1800; 
        let startTime = null;

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - percent, 3);
            const currentCount = Math.floor(easeOutCubic * (target - 1) + 1);
            
            countNumber.textContent = currentCount;
            
            if (percent < 1) {
                requestAnimationFrame(animateCount);
            } else {
                countNumber.textContent = target;
            }
        };

        setTimeout(() => {
            requestAnimationFrame(animateCount);
        }, 300);
    }

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
        }, 4000); 
    }
    const appsPanel = document.getElementById("appsSidePanel");
    const appsBackdrop = document.getElementById("appsPanelBackdrop");
    const appsClose = document.getElementById("appsPanelClose");

    const appsOpenButtons = document.querySelectorAll(".apps-btn");

    appsOpenButtons.forEach(button => {
        button.addEventListener("click", function () {
            appsPanel.classList.add("open");
            document.body.style.overflow = "hidden"; 
        });
    });

    function closeAppsPanel() {
        appsPanel.classList.remove("open");
        document.body.style.overflow = "";
    }

    appsClose.addEventListener("click", closeAppsPanel);

    appsBackdrop.addEventListener("click", closeAppsPanel);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && appsPanel.classList.contains("open")) {
            closeAppsPanel();
        }
    });

   const locationPlayBtn = document.getElementById('locationPlayBtn');
const locationVideoWrapper = document.getElementById('locationVideoWrapper');

if (locationPlayBtn && locationVideoWrapper) {
    locationPlayBtn.addEventListener('click', () => {
       locationVideoWrapper.innerHTML = `
    <video autoplay controls playsinline class="location-video-player">
        <source src="assets/testi.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
`;
    });
}

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

        slides.forEach((slide, idx) => {
            slide.addEventListener('click', (e) => {
                
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

        updateSlider();
        startAutoSlide();
    }

    // Auto-sliding Slideshow logic
    const slideshow = document.getElementById('gallerySlideshow');
    if (slideshow) {
        const slides = Array.from(slideshow.querySelectorAll('.gallery-slide'));
        const indicators = Array.from(slideshow.querySelectorAll('.indicator'));
        let slideIndex = 0;
        let slideshowTimer = null;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            slideIndex = index;
        }

        function nextSlide() {
            let nextIndex = (slideIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function startSlideshow() {
            stopSlideshow();
            slideshowTimer = setInterval(nextSlide, 2000);
        }

        function stopSlideshow() {
            if (slideshowTimer) clearInterval(slideshowTimer);
        }

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                showSlide(idx);
                startSlideshow();
            });
        });

        slideshow.addEventListener('mouseenter', stopSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);

        startSlideshow();
    }

    // Gallery Lightbox Functionality
    const galleryLightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));

    let currentImgIdx = 0;

    if (galleryLightbox && lightboxImg && galleryImgs.length > 0) {
        galleryImgs.forEach((img, idx) => {
            img.addEventListener('click', () => {
                currentImgIdx = idx;
                openLightbox(img.src);
            });
        });

        function openLightbox(src) {
            lightboxImg.src = src;
            galleryLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            galleryLightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showNextImg() {
            currentImgIdx = (currentImgIdx + 1) % galleryImgs.length;
            lightboxImg.src = galleryImgs[currentImgIdx].src;
        }

        function showPrevImg() {
            currentImgIdx = (currentImgIdx - 1 + galleryImgs.length) % galleryImgs.length;
            lightboxImg.src = galleryImgs[currentImgIdx].src;
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImg();
            });
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImg();
            });
        }

        galleryLightbox.addEventListener('click', (e) => {
            if (e.target === galleryLightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (galleryLightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImg();
                if (e.key === 'ArrowLeft') showPrevImg();
            }
        });
    }

    // Contact page: Update map iframe source when clicking a location info box
    const contactInfoBoxes = document.querySelectorAll('.contact-info-box');
    const contactMapIframe = document.getElementById('contactMapIframe');

    if (contactInfoBoxes.length > 0 && contactMapIframe) {
        contactInfoBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const mapUrl = box.getAttribute('data-map-url');
                if (mapUrl) {
                    contactMapIframe.src = mapUrl;
                }
                
                // Toggle active styling class
                contactInfoBoxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
            });
        });
    }

    // Careers page filtering logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mobileFilterSelect = document.getElementById('careerMobileFilter');
    const jobCards = document.querySelectorAll('.job-card');

    function filterJobs(selectedCategory) {
        jobCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Desktop filtering handler
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');
                filterJobs(category);

                // Keep mobile selector in sync if present
                if (mobileFilterSelect) {
                    mobileFilterSelect.value = category;
                }
            });
        });
    }

    // Mobile select dropdown filtering handler
    if (mobileFilterSelect) {
        mobileFilterSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            filterJobs(category);

            // Keep desktop list active buttons in sync
            if (filterButtons.length > 0) {
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-category') === category) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    }

    // Signature Pad Functionality
    const canvas = document.getElementById('signaturePad');
    const clearBtn = document.getElementById('clearSignatureBtn');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let drawing = false;

        // Set canvas resolution matching layout size
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Set drawing settings
            ctx.strokeStyle = '#111111';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        // Initialize size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Drawing helper coordinates
        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        // Start drawing
        function startDrawing(e) {
            drawing = true;
            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            e.preventDefault();
        }

        // Draw line
        function draw(e) {
            if (!drawing) return;
            const pos = getMousePos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            e.preventDefault();
        }

        // Stop drawing
        function stopDrawing() {
            drawing = false;
        }

        // Mouse listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        // Touch listeners for mobile devices
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        // Clear button
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }
    }

});
