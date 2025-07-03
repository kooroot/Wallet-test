// Gauss 17-gon (Heptadecagon) Animation
function initHeptadecagonAnimation() {
    const svg = document.querySelector('.gauss-heptadecagon');
    if (!svg) return;

    const polygon = svg.querySelector('.heptadecagon');
    const verticesGroup = svg.querySelector('.vertices');
    const constructionLinesGroup = svg.querySelector('.construction-lines');
    
    // Calculate vertices of regular 17-gon
    const radius = 80;
    const centerX = 0;
    const centerY = 0;
    const vertices = [];
    const points = [];
    
    // Generate 17 equally spaced points
    for (let i = 0; i < 17; i++) {
        const angle = (2 * Math.PI * i) / 17 - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        vertices.push({ x, y });
        points.push(`${x},${y}`);
    }
    
    // Set polygon points
    polygon.setAttribute('points', points.join(' '));
    
    // Create vertex dots with staggered animation
    vertices.forEach((vertex, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', vertex.x);
        circle.setAttribute('cy', vertex.y);
        circle.setAttribute('r', '3');
        circle.style.animationDelay = `${index * 0.1}s`;
        verticesGroup.appendChild(circle);
    });
    
    // Create construction lines (connecting certain vertices to show Gauss's construction)
    // These represent the mathematical relationships in Gauss's proof
    const constructionPairs = [
        [0, 8], [0, 9], // Connecting vertex 0 to opposite vertices
        [1, 5], [1, 13], // Key construction lines
        [2, 10], [3, 11], [4, 12], [6, 14], [7, 15] // Additional construction lines
    ];
    
    constructionPairs.forEach((pair, index) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', vertices[pair[0]].x);
        line.setAttribute('y1', vertices[pair[0]].y);
        line.setAttribute('x2', vertices[pair[1]].x);
        line.setAttribute('y2', vertices[pair[1]].y);
        line.style.animationDelay = `${1.5 + index * 0.2}s`;
        constructionLinesGroup.appendChild(line);
    });
    
    // Add interactive hover effect
    svg.addEventListener('mouseenter', () => {
        polygon.style.stroke = 'var(--cyber-secondary)';
        polygon.style.filter = 'url(#glow) drop-shadow(0 0 20px var(--cyber-secondary))';
    });
    
    svg.addEventListener('mouseleave', () => {
        polygon.style.stroke = 'var(--cyber-primary)';
        polygon.style.filter = 'url(#glow)';
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeptadecagonAnimation);
} else {
    initHeptadecagonAnimation();
}