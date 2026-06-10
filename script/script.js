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

});
