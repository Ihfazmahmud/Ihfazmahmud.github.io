// Typing effect for the hero section
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section titles and cards
    document.querySelectorAll('.cert-card, .skill-card, .project-card, section h2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add fade-in class for animation
document.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Enhanced Matrix rain effect with stronger glow
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.2';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = new Array(columns).fill(0);
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴ';

// Create gradient with stronger blue glow
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, 'rgba(0, 168, 255, 0)');
gradient.addColorStop(0.3, 'rgba(0, 168, 255, 0.8)');
gradient.addColorStop(1, 'rgba(0, 168, 255, 0.4)');

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.12)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Main character
        ctx.font = `${fontSize}px Space Grotesk, monospace`;
        ctx.fillStyle = '#64ffda';
        
        // Strong outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00a8ff';
        
        // Additional bloom effect
        ctx.globalCompositeOperation = 'lighter';
        
        // Vary the opacity based on position with higher minimum
        ctx.globalAlpha = Math.random() * 0.3 + 0.7;
        
        // Draw the character multiple times for stronger glow
        for (let j = 0; j < 2; j++) {
            ctx.fillText(text, x, y);
        }
        
        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
        
        // Reset shadow and opacity
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Random speed variation
        if (y > height && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i] += Math.random() * 0.5 + 0.5;
    }
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Slow down the matrix effect
setInterval(draw, 50);

// Kali Linux Commands Animation
const kaliCommands = [
    '$ nmap -sV -sC -A target.com',
    '$ dirb http://target.com',
    '$ sqlmap -u "http://target.com" --dbs',
    '$ hydra -l admin -P wordlist.txt target.com ssh',
    '$ wireshark -i eth0',
    '$ aircrack-ng capture.cap',
    '$ msfconsole',
    '$ burpsuite',
    '$ john --wordlist=rockyou.txt hash.txt',
    '$ gobuster dir -u http://target.com -w wordlist.txt',
    '$ nikto -h target.com',
    '$ wpscan --url http://target.com',
    '$ hashcat -m 0 hash.txt wordlist.txt',
    '$ metasploit',
    '$ set payload windows/meterpreter/reverse_tcp',
    '$ responder -I eth0',
    '$ tcpdump -i any port 80',
    '$ steghide extract -sf image.jpg',
    '$ binwalk -e firmware.bin',
    '$ volatility -f memory.dump imageinfo'
];

function createKaliCommand() {
    const commandsContainer = document.querySelector('.kali-commands');
    const command = document.createElement('div');
    command.className = 'command';
    command.textContent = kaliCommands[Math.floor(Math.random() * kaliCommands.length)];
    
    // Random starting position along the width
    command.style.left = Math.random() * 100 + '%';
    
    // Random delay before animation starts
    command.style.animationDelay = Math.random() * 5 + 's';
    
    commandsContainer.appendChild(command);
    
    // Remove the command after animation completes
    command.addEventListener('animationend', () => {
        command.remove();
    });
}

// Create new commands periodically
setInterval(createKaliCommand, 3000);

// Create initial set of commands
for (let i = 0; i < 5; i++) {
    setTimeout(createKaliCommand, i * 1000);
} 