// Create an SVG surface
const s = Snap(800, 600);

// Create a star path
const starPath = `M 250,15 305.55,109.33 500,120 341.45,215.67 407.67,385 250,300 92.33,385 158.55,215.67 10,120 145.55,109.33 z`;

// Create a star group
const starGroup = s.group();

// Create 5 star paths and add them to the star group
for (let i = 0; i < 5; i++) {
  const star = s.path(starPath).attr({
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 2,
    transform: `rotate(${i * 72})`
  });
  starGroup.add(star);
}

// Center the star group on the SVG surface
starGroup.transform('t300,300');