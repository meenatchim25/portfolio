document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.3
        });
    });

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .skill-card, .tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 3, opacity: 0.5 });
            gsap.to(follower, { scale: 0.5 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, opacity: 1 });
            gsap.to(follower, { scale: 1 });
        });
    });

    // Scroll Reveal with Intersection Observer
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Hero Mouse Parallax
    const heroImage = document.querySelector('.hero-image');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
        gsap.to(heroImage, {
            rotateY: xAxis,
            rotateX: yAxis,
            duration: 0.5
        });
    });

    // Scroll Progress
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Hero Text Cycling
    const dynamicTextSpan = document.getElementById('dynamic-text');
    if (dynamicTextSpan) {
        const titles = [
            "AI-Focused Full Stack Developer",
            "AI Solution Architect",
            "QE Engineer",
            "AI Developer",
            "ML Solution Architect",
            "Software Developer",
            "Software Engineer",
            "LLM Specialist"
        ];
        let currentTitleIndex = 0;

        function cycleText() {
            gsap.to(dynamicTextSpan, {
                opacity: 0,
                y: -15,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                    dynamicTextSpan.textContent = titles[currentTitleIndex];
                    gsap.fromTo(dynamicTextSpan, 
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                    );
                }
            });
        }
        // Cycle every 3.5 seconds
        setInterval(cycleText, 3500);
    }
});
