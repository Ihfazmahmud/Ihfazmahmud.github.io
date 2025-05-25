document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements once and cache them
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Use RAF timestamp for smooth animation
    let lastTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Throttle mousemove events
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Debounced click handler
    let clickTimeout;
    document.addEventListener('click', (e) => {
        if (clickTimeout) clearTimeout(clickTimeout);
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        clickTimeout = setTimeout(() => ripple.remove(), 1000);
    }, { passive: true });

    // Optimized animation loop
    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        // Only update if enough time has passed (targeting 60fps)
        if (deltaTime >= 16) {
            // Smooth cursor movement with optimized calculations
            cursorX = mouseX;
            cursorY = mouseY;
            
            // Smooth follower movement with easing
            followerX += (mouseX - followerX - 20) * 0.15;
            followerY += (mouseY - followerY - 20) * 0.15;

            // Use transform3d for hardware acceleration
            cursor.style.transform = `translate3d(${cursorX - 4}px, ${cursorY - 4}px, 0)`;
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

            lastTime = timestamp;
        }

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Optimize hover effects by using event delegation
    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, input, .cert-card, .skill-card, .project-card');
        if (target) {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('follower-hover');
        }
    }, { passive: true });

    document.body.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, input, .cert-card, .skill-card, .project-card');
        if (target) {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('follower-hover');
        }
    }, { passive: true });

    // Visibility optimization
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }, { passive: true });
}); 