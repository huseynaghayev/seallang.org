const navbar = document.querySelector(".navbar");
const copyIconRe = document.querySelector(".copy-regular");
const copyIconSo = document.querySelector(".copy-solid");
const changeCodeIcon = document.querySelector(".fa-code-compare");
const codeText = document.querySelector("code");
const popupText = document.querySelector(".popup");
const sound = document.getElementById("diveSound");


// for highlighting the code examples
codeText.innerHTML = highlight(codeText.textContent);

//for bubble effect
let triggered = false;

// for scrolling effect
let isScrolled1 = false;
let isScrolled2 = false;

// code examples
const codes = [
`define calc(a, b, op)
    if op == "+"
        return a + b
    if op == "-"
        return a - b
    if op == "*"
        return a * b
    if op == "/"
        return a / b

print(calc(10, 5, "*"))`
,
`a = 1, b = a, i = 0  // set variable
max = 1000

while i < max
    i += 1
    print(i)
`
,
`define double(x)
    return x * 2

doubled = [1, 2, 3, 4, 5]->map(double)

i = 0
while (doubled != null) == true and i < list->len()
    print(doubled[i])
    i += 1
`
,
];


// spawn bubbles logic function
function spawnBubbles() {
    for(let i=0; i < 9; i++) {
        const b = document.createElement("div");
        b.classList.add("bubble");
        document.body.appendChild(b);


        let startX
        if(i < 4) {
            startX = Math.random() * window.innerWidth * 0.2;
        } else {
            startX = (Math.random() * 0.2 + 0.8) * window.innerWidth;
        }
        
        const endX = startX + (Math.random() * 200 - 100);  // changes its direction in range [-100, 100]
        const duration = 2000 + Math.random() * 2000;

        b.style.left = startX + "px";

        b.animate([
            {transform: "translate(0, 0) scale(0.5)", opacity: 1},
            {transform: `translate(${endX - startX}px, -700px) scale(1.2)`,
            opacity: 0}
        ], {
            duration,
            easing: "ease-out"
        });

        setTimeout(() => b.remove(), duration);
    }
}
// sound logic function for bubbles 
// function playSound() {
//     sound.currentTime = 0;
//     sound.play().catch(() => {
//         console.log("Browser autoplay blocked");
//     });
// }


// window scroll event : scroll effect & bubble effect
window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (!isScrolled1 && scrollPos > 35) {
        navbar.classList.add("scrolled");
        isScrolled1 = true;
    } else if (isScrolled1 && scrollPos < 15) {
        navbar.classList.remove("scrolled");
        isScrolled1 = false;
    }
    
    if (!isScrolled2 && scrollPos > 300) {
        navbar.classList.add("colored");
        isScrolled2 = true;
    } else if (isScrolled2 && scrollPos < 280) {
        navbar.classList.remove("colored");
        isScrolled2 = false;
    }

    if(scrollPos > 100 & !triggered) {
        triggered = true;
        spawnBubbles();
        // playSound();
    }
});

// for preventing visual glitches in first load
window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});


// for copy effect on code example div
function renderCode(code) {
    codeText.innerHTML = highlight(code);
}
copyIconRe.addEventListener("click", () => {
    copyIconRe.style.display = "none";
    copyIconSo.style.display = "flex";
    popupText.classList.add("clicked");
    navigator.clipboard.writeText(codeText.textContent);
    setTimeout(() => {
        popupText.classList.remove("clicked");
    }, 1500);
});

let s=0;
changeCodeIcon.addEventListener("click", () => {
    copyIconSo.style.display = "none";
    copyIconRe.style.display = "flex";
    if(s >= codes.length) s = 0;
    renderCode(codes[s]);
    s++;
});