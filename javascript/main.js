

const navigation = document.querySelector('.navigation');
const allProgress = document.querySelectorAll(".technologies-boxs .technologies-box");
const sectionLinksNavigation = document.querySelectorAll('li');
let linkes = [];
sectionLinksNavigation.forEach(link=>{
    if(link.querySelector("a[href^='#']")){
        linkes.push(link);
    }
})
linkes.forEach(link =>{
    link.addEventListener("click", function(e){
        e.preventDefault();
        const section = document.querySelector(link.querySelector('a').getAttribute("href"));
        linkes.forEach(li=>{
            li.querySelector('a').classList.remove("active");
            li.classList.remove("active");
        })
        if(section){
            const offset = 60;
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior:'smooth',
                blick:'start'
            })
        }
        this.querySelector('a').classList.add('active');
        this.classList.add('active');
    })
    link.addEventListener("wheel", (e)=>{
        e.preventDefault();
    })
})



const preventDefaultScroll = (e) => e.preventDefault();
function navigationPopUp(){
    navigation.classList.toggle('close');
    document.querySelector('.close-navigation-bg').classList.toggle('opne');
    if(!navigation.classList.contains('close')){
        //window.onscroll = () => window.scrollTo(window.offsetTop, 0);
        window.addEventListener('wheel', preventDefaultScroll, {passive:false});
        window.addEventListener('touchmove', preventDefaultScroll, {passive:false});
    }else{
        window.removeEventListener('wheel', preventDefaultScroll, {passive:false});
        window.removeEventListener('touchmove', preventDefaultScroll, {passive:false});
    }
}

const progressData = {
    HTML5:98,
    CSS3:98,
    Javascript:70,
    Python:95,
    Java:70,
    FastAPI:80,
    Flask:90,
    "React.js":40,
    Android:80,
    KivyMD:90,
    PyQt:90,
    SQLite:98,
    MySQL:98,
    PostgerSQL:98,
    Git:60
};

function animationProgress(){
    allProgress.forEach(box => {
        const progress = box.querySelector("progress");
        progress.value = progressData[box.querySelector("h4").innerHTML];
        box.querySelector("div").innerHTML = progress.value + "%";
        
    })
}
const sectionData = []
document.querySelectorAll('section').forEach(section => {
    sectionData.push({
        sectionClassName:section.getAttribute("class"),
        offsetTop:section.offsetTop,
        offsetHeight:section.offsetHeight
    })
})
const sctionTechnologies = document.querySelector(".Technologies");
let STATE_ANIMATION_PROGRESS = false;
const RESIZE_TOP = 60;
let STATE_SET_SECTION = false;
let sectionClassName = null;


window.addEventListener("scroll", () => {
    for(let i = sectionData.length-1;i > 0; i--){
        const item = sectionData[i];
        
        if(this.scrollY >= item.offsetTop - RESIZE_TOP || this.scrollY > sectionData[2].offsetTop && this.scrollY >= item.offsetTop - window.innerHeight + item.offsetHeight){
            if(sectionClassName != item.sectionClassName){
                sectionClassName = item.sectionClassName;
                STATE_SET_SECTION = true;
            }
            
            break;
        }else if(this.scrollY < sectionData[1].offsetTop -100){
            if(sectionClassName != sectionData[0].sectionClassName){
                sectionClassName = sectionData[0].sectionClassName;
                STATE_SET_SECTION = true;
            }
            break;
        }if(sectionClassName == 'Technologies' && !STATE_ANIMATION_PROGRESS){
            animationProgress();
            STATE_ANIMATION_PROGRESS = true;
        }
    }
    if(STATE_SET_SECTION){
        linkes.forEach(link => {
            const id = link.querySelector('a').getAttribute('href').substring(1);
            if(link.parentElement.parentElement.getAttribute("class") == "open-menu"){
                if(id == sectionClassName){
                    link.querySelector('a').classList.add('active');
                }else{
                    link.querySelector('a').classList.remove('active');
                }
            }else{
                if(id == sectionClassName){
                    link.classList.add('active');
                    link.querySelector('a').classList.add('active');
                }else{
                    link.classList.remove('active');
                    link.querySelector('a').classList.remove('active');
                }
            }
            
        })
    }

    STATE_SET_SECTION = false;
})



