// script.js
r: 8 + Math.random()*36,
vx: (Math.random()-0.5)*0.2,
vy: (Math.random()-0.5)*0.2,
hue: 190 + Math.random()*60
}));


function resize(){ fitCanvasToContainer(canvas); }
window.addEventListener('resize', resize);


function draw(){
const rect = canvas.getBoundingClientRect();
ctx.clearRect(0,0,rect.width,rect.height);


// soft radial overlay
const g = ctx.createLinearGradient(0,0,rect.width,rect.height);
g.addColorStop(0, 'rgba(255,255,255,0.02)');
g.addColorStop(1, 'rgba(0,0,0,0.12)');
ctx.fillStyle = g;
ctx.fillRect(0,0,rect.width,rect.height);


// bubbles
for(const b of bubbles){
b.x += b.vx; b.y += b.vy;
if(b.x < -b.r) b.x = rect.width + b.r;
if(b.x > rect.width + b.r) b.x = -b.r;
if(b.y < -b.r) b.y = rect.height + b.r;
if(b.y > rect.height + b.r) b.y = -b.r;


ctx.beginPath();
const grd = ctx.createRadialGradient(b.x - b.r*0.3, b.y - b.r*0.3, b.r*0.1, b.x, b.y, b.r);
grd.addColorStop(0, `hsla(${b.hue},85%,75%,0.95)`);
grd.addColorStop(1, 'rgba(0,0,0,0.08)');
ctx.fillStyle = grd;
ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
ctx.fill();
}


requestAnimationFrame(draw);
}
draw();
})();


// --- PREVIEW PARTICLES (bouncing pearls) ---
(function preview(){
const canvas = previewCanvas;
const ctx = fitCanvasToContainer(canvas);
let rect = canvas.getBoundingClientRect();


const pearls = [];
function spawn(n=14){
pearls.length = 0;
for(let i=0;i<n;i++){
pearls.push({
x: Math.random()*rect.width,
y: Math.random()*rect.height,
r: 6 + Math.random()*12,
vx: (Math.random()*1.4)-0.7,
vy: (Math.random()*1.4)-0.7,
hue: 330 + Math.random()*80
n });
}
}


function resize(){
fitCanvasToContainer(canvas);
rect = canvas.getBoundingClientRect();
spawn(18);
}
window.addEventListener('resize', resize);
resize();


function step(){
ctx.clearRect(0,0, rect.width, rect.height);
// background sheen
ctx.fillStyle = 'rgba(255,255,255,0.01)';
ctx.fillRect(0,0,rect.width,rect.height);


for(const p of pearls){
p.vy += 0.02; // small gravity
p.x += p.vx; p.y += p.vy;
// bounce off edges
if(p.x - p.r < 0){
