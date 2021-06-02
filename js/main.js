//Scroll Suave
const menuLinks = document.querySelectorAll('.a a[href^="#"]');

function getDistanceFromTheTop(element){
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop){
    window.scroll({
        top: distanceFromTheTop,
        behavior: "smooth",
    });
}

function scrollToSection(event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target);
    nativeScroll(distanceFromTheTop);
}

menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
});

//Menu-Mobile

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event){
    if(event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if(active){
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
    }else{
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
    }
}

btnMobile.addEventListener('click', toggleMenu)
btnMobile.addEventListener('touchstart', toggleMenu)

//Modo Dark

const html = document.querySelector('html')
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
window
.getComputedStyle(element)
.getPropertyValue(style)

const initialColors = {
    background: getStyle(html, "--background"),
    link: getStyle(html, "--link"),
    linkMarkup: getStyle(html, "--link-markup"),
    textGreen: getStyle(html, "--text-green"),
    backgroundCard: getStyle(html, "--background-card"),
    bgImage: getStyle(html, "--bg-image"),
    linhaD: getStyle(html, "--linha-d"),
}
const darkMode = {
    background: "#212121",
    link: "#E6E7EE",
    linkMarkup: "#DBBF2F",
    textGreen: "#86EE8B",
    backgroundCard: "#2B2C30",
    bgImage: "url(images/backgroundDark.jpg)",
    linhaD: "#E6E7EE",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)

})

//salvar Modo dark em localStorage

const isExistLocalStorage = (key) => localStorage.getItem(key) != null
const createOrEditLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const getValueLocalStorage = (key) => JSON.parse(localStorage.getItem(key))
checkbox.addEventListener("change", ({target}) => {
    if(target.checked){
        changeColors(darkMode)
        createOrEditLocalStorage('modo', 'darkMode')
    }else{
        changeColors(initialColors)
        createOrEditLocalStorage('modo', 'initialColors')
    }
})
if(!isExistLocalStorage('modo'))
    createOrEditLocalStorage('modo', initialColors)

if(getValueLocalStorage('modo') === 'initialColors'){
    checkbox.removeAttribute('checked')
    changeColors(initialColors);
}else{
    checkbox.setAttribute('checked', "")
    changeColors(darkMode)
}