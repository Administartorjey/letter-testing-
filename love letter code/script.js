document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('wax-seal');
    const heartsContainer = document.getElementById('floating-hearts');
    const musicControls = document.getElementById('music-controls');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    // Wax seal click handler
    waxSeal.addEventListener('click', function() {
        envelope.classList.toggle('open');
        
        if (envelope.classList.contains('open')) {
            // Show and fade in music controls
            musicControls.style.display = 'block';
            setTimeout(() => musicControls.classList.add('show'), 10);
            
            // Play music (with error handling)
            bgMusic.play().catch(e => {
                console.log("Autoplay prevented, click to play:", e);
                musicToggle.textContent = '♫ Play Music';
            });
            
            createHearts();
        } else {
            // Hide music controls
            musicControls.classList.remove('show');
            setTimeout(() => musicControls.style.display = 'none', 500);
        }
    });
    
    // Create floating hearts animation
    function createHearts() {
        heartsContainer.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
                heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
                heartsContainer.appendChild(heart);
            }, i * 200);
        }
    }
    
    // Music toggle
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '♫ Pause Music';
        } else {
            bgMusic.pause();
            musicToggle.textContent = '♫ Play Music';
        }
    });
    
    // Mobile touch support
    waxSeal.addEventListener('touchstart', function(e) {
        e.preventDefault();
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            musicControls.style.display = 'block';
            setTimeout(() => musicControls.classList.add('show'), 10);
            bgMusic.play().catch(e => console.log("Playback prevented:", e));
            createHearts();
        } else {
            musicControls.classList.remove('show');
            setTimeout(() => musicControls.style.display = 'none', 500);
        }
    }, { passive: false });
});