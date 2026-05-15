const navbar = document.querySelector(".navbar");
const copyIconRe = document.querySelector(".copy-regular");
const copyIconSo = document.querySelector(".copy-solid");
const changeCodeIcon = document.querySelector(".fa-code-compare");
const codeText = document.querySelector("code");
const popupText = document.querySelector(".popup");
const sound = document.getElementById("diveSound");


//for bubble effect
let triggered = false;


// for scrolling effect
let isScrolled1 = false;
let isScrolled2 = false;


// code examples
const codes = [
`// Classic greeting World program

define greet(name)
    print("Hello, " + name + "!")

greet("World")  // Hello, World!`
,
`// inline if statements

score = 87

if score >= 90 then grade = "A"
else if score >= 80 then grade = "B"
else grade = "C"

print(grade)`
,
`player = {
    name = "Huseyn",
    hp = 100,
    speed = 5
}

player.hp -= 30

print(
    player.name +
    " has " +
    string(player.hp) +
    " hp"
)`
,
`// functions are first-class citizens

define apply(f, x) f(x)

print(apply(define(x) x * x, 8))  // 64`
,
`define make_enemy(name, hp)
    e = {name = name, hp = hp}

    e.hit = define(self, dmg)
        self.hp -= dmg
        if self.hp <= 0
            print(self.name + " is dead")

    return e

goblin = make_enemy("Goblin", 30)
goblin->hit(10)
goblin->hit(25)`
,
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
`define double(x)
    return x * 2

doubled = [1, 2, 3, 4, 5]->map(double)

i = 0
while i < list->len()
    print(doubled[i])
    i += 1
`
,
`// chain and write code beautifully

sum = (
    [1, 2, 3]
    ->map(define(x) x * x)  // [1, 4, 9]
    ->filter(define(x) x % 2 != 0)  // [1, 9]
    ->reduce(define(x, y) x + y, 0)
)

print(sum)  // 10
`
,
];


// for highlighting the code examples
codeText.innerHTML = highlight(codes[0]);

// spawn bubbles logic function
function spawnBubbles() {
    for(let i=0; i < 9; i++) {
        const b = document.createElement("div");
        b.classList.add("bubble");
        document.body.appendChild(b);


        let startX;
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
            {transform: `translate(${endX - startX}px, -700px) scale(0.8)`,
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

let s=1;
changeCodeIcon.addEventListener("click", () => {
    copyIconSo.style.display = "none";
    copyIconRe.style.display = "flex";
    if(s >= codes.length) s = 1;
    renderCode(codes[s]);
    s++;
});