let navbar = document.querySelector('.navbar')  //ho preso con la classe perche stavo giocando ad eu4
let navItem = document.querySelectorAll('.nav-item')
let navLink = document.querySelectorAll('.nav-link')
let ico = document.querySelector('.img-ico') 
let menu = document.querySelector('.navbar-toggler') 
let loop = document.querySelector('.loop')
let h1 = document.querySelector('h1')
let icoWrap = document.querySelector('.ico-wrap')
let pProdotto  = document.querySelectorAll('.p-prodotto')
let cardRow = document.querySelector('#card-row')
let swiperWrapper = document.querySelector('.swiper-wrapper')
let divCheck = document.querySelector('#div-check')
let giro = document.querySelector('#girooo')
let HTML = document.querySelector('html')

let radioWrapper = document.querySelector('#radio-wrapper')
let cardJSONWrapper = document.querySelector('#cardJSON-wrapper')

let rangeWrapper = document.querySelector('#range-wrapper')
let min = document.querySelector('#min')
let minShow = document.querySelector('#min-show')
let max = document.querySelector('#max')
let maxShow = document.querySelector('#max-show')

let parolaChiave = document.querySelector('#parola-chiave')

let suppNav=0
let x= 0
let k= 0
let i= 0

console.log('prima a');

// array foto gatti creare uno snippet
let gatti=[
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ginger_european_cat.jpg/800px-Ginger_european_cat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Gatto_certosino_%28Salsiccia%29.jpg/1280px-Gatto_certosino_%28Salsiccia%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Persiano-magnificat.jpg/800px-Persiano-magnificat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Calico_cat_in_La_Coruna_of_Spain-01.jpg/1280px-Calico_cat_in_La_Coruna_of_Spain-01.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Pupilla_del_gatto.jpg/1280px-Pupilla_del_gatto.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0d/Reflexion_der_Augen_einer_Katze.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Cat_paw_%28cloudzilla%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/ba/Catdryfood.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Chat-affut.JPG/1280px-Chat-affut.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mom_cat_and_kitty.jpg/1280px-Mom_cat_and_kitty.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/2_Gatti_Soriani.jpg/1280px-2_Gatti_Soriani.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Gattodomesticoluna.jpg/800px-Gattodomesticoluna.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gatto_in_dormiveglia.jpg/800px-Gatto_in_dormiveglia.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/European_Cat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cat_dancing_in_the_snow-Tscherno.jpg/1280px-Cat_dancing_in_the_snow-Tscherno.jpg'
];

let vote=[1,2,3,4,5,4,3,2,1,2,3,4,5,4,3,1,5,4,3,2,4,1]


// json
fetch('annunci.json').then((response)=>response.json()).then((data)=>{

    // funzione per selezzionare e inserire le categorie nel folgio html
    function categorie() {
        let insiemeCategorie = data.map((annuncio)=>annuncio.category)
        let singoleCategorie = new Set(Array.from(insiemeCategorie))
        console.log(Array.from(singoleCategorie));
        Array.from(singoleCategorie).forEach(el => { 
            let radioCategoria = document.createElement('div')
            radioCategoria.classList.add('form-check')
            radioCategoria.innerHTML=`
            <input class="form-check-input radio-imput" type="radio" name="categorie" id="${el}">
            <label class="form-check-label" for="${el}">${el}</label>
            `
            radioWrapper.appendChild(radioCategoria)
        });
    }
    categorie()
    
    // funzione per inserire carte sulla base di un array di origine
    function cardJSONmaker(origine) {
        cardJSONWrapper.innerHTML=''
        origine.forEach((el,i)=>{
            let cardJSON = document.createElement('div')
            cardJSON.classList.add('col-12','col-md-4','my-4')
            cardJSON.innerHTML=`
            <div class="card border-card JCard overflow-hidden">
            <img src="${el.img}" class="img-border-radius cardJSON-img d-md-none d-lg-inline-block" alt="...">
            <div class="card-body">
            <p>${el.name}</p>
            <p>${el.category}</p>
            <p>${el.price}$</p>
            </div>
            </div>
            `
            cardJSONWrapper.appendChild(cardJSON)
            console.log('a');
        });
    }
    cardJSONmaker(data)

    
    let radios = document.querySelectorAll('.radio-imput')
    
    // filter per categorie
    function categoryFilter(array) {
        // console.log(radios);
        let checked = Array.from(radios).find((button)=>button.checked)
        console.log(checked.id);
        if (checked.id=='ALL') {
            return array;
        }else{
            return array.filter((el)=>el.category==checked.id);
        }
    }
    
    // funzione per creare arry con dati filtrati per prezzo
    function priceFilter(array) {return array.filter((el)=>+el.price>=+min.value&&+el.price<=+max.value)}
    
    // funzione per creare arry con dati filtrati per parola chiave
    function filtroParola(array){return array.filter((el)=>el.name.toLowerCase().includes(parolaChiave.value.toLowerCase()))}

    // filtro globale
    function globalFilter(start){return filtroParola(priceFilter(categoryFilter(start))) }

    radioWrapper.addEventListener('click',()=>{
        cardJSONmaker(globalFilter(data))
    })



    // funzione che ritorno il prezzo massimo
    function maxData(){return Math.ceil(Math.max(...(data.map((el)=>+el.price))))}
    maxShow.innerHTML=maxData()
    min.max= maxData()
    max.max= maxData()
    // cambiarre la barre dei valori base
    min.value= 0
    max.value= maxData()

    
    function setN(target,show) {
        target.addEventListener('input',()=>{
            show.innerHTML = target.value
            cardJSONmaker(globalFilter(data))
            console.log(priceFilter(data));
        })
    }
    setN(min,minShow)
    setN(max,maxShow)

    
    parolaChiave.addEventListener('input',()=>{
        cardJSONmaker(globalFilter(data))
    })
})



// setting iniziale per icolori delle scritte con moseenter e mouseleave
navLink.forEach(el => {
    el.addEventListener('mouseenter', ()=>{
        el.classList.add('text-g');
    })
    el.addEventListener('mouseleave', ()=>{
        el.classList.remove('text-g');
    })
});

window.addEventListener('scroll',()=>{          //uso l'ogetto winndow 
    
    // console.dir(window.scrollY);                //stampa in console la posizzione y dello scroll
    
    // modifico la grandezza della navbar direttamenet dallo scrolly
    navbar.style.minHeight= '70px'
    
    // cambio dim navbar
    // navbar.style.height = `${(-Math.cos(window.scrollY/180)+1)*100}px`
    
    navbar.style.minHeight= '70px'
    
    // rotazione dell'icona perpetua
    let rotation = `${window.scrollY/4}deg`
    ico.style.transform= `rotate(${rotation})`;
    
    // usando il valore di scrolly cambio i colori alla navbar e alle scritte
    if (window.scrollY>500) {
        navbar.classList.remove('bg-b');
        navbar.classList.add('bg-g');
        
        navItem.forEach((el)=>{
            // el.classList.remove('bg-b');
            // el.classList.add('bg-g');
        })
        
        navLink.forEach((el)=>{
            el.classList.remove('text-r');
            el.classList.add('text-blu');
            
            el.addEventListener('mouseenter', ()=>{
                el.classList.add('text-b');
            })
            el.addEventListener('mouseleave', ()=>{
                el.classList.remove('text-b');
            })
        })
    } else {
        navbar.classList.remove('bg-g');
        navbar.classList.add('bg-b');
        navItem.forEach((el)=>{
            // el.classList.remove('bg-g');
            // el.classList.add('bg-b');
        })
        
        navLink.forEach(el => {
            el.classList.remove('text-blu')
            el.classList.add('text-r')
            el.addEventListener('mouseenter', ()=>{
                el.classList.add('text-g');
                el.classList.remove('text-b');
            })
            el.addEventListener('mouseleave', ()=>{
                el.classList.remove('text-g');
            })
        });
    }
    
    // pagina infinita
    if (window.scrollY%3==0 && window.scrollY>x) {
        let elemento = document.createElement('div')
        elemento.classList.add('d-flex','position-relative')
        // elemento.style.left=`${Math.sin(-Math.cos((i-20)/100)*50+50)*50+50}%`
        elemento.style.left=`${-Math.cos(Math.sinh(i/50))*50+50}%`
        elemento.style.top=`${i*5}%`
        elemento.style.width=`15%`
        elemento.innerHTML= `
        <img class="loop-cat" src="${gatti[i%(gatti.length)]}" alt="">
        <p>Gatto n.${i+1}</p>`
        loop.appendChild(elemento)
        x = window.scrollY-5
        i++
        h1.innerHTML=`${i} GATTI`
    }
    
    //navbar gatto
    // if(window.scrollY/3 > 1250){
    //     navbar.classList.add('gatto')
    // }else{
    //     navbar.classList.remove('gatto')
        
    // }
    
    // navbar loris
    // if(window.scrollY > 7640){
    //     navbar.classList.add('loris')
    // }else{
    //     navbar.classList.remove('loris')
    // }
    
    
    // un timer
    //  e il caso in cui viene utilizzato potrebbe non essere piu disponibile
    if (i==250 && k==0){
        k=1
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        console.log('Hello');
        sleep(20000).then(() => {
            prompt('hello')
        });
        
        document.querySelector('body').classList.add('d-none')
        alert('ADDIO')
    }    
})

//rotea l'icona quando si clicca il burger da sistemare
menu.addEventListener('click', ()=>{
    icoWrap.classList.toggle('rotate')
})


// set intervall per i numerini
function counter(tempo,b,numero,tipo) {
    let conta =0
    let interval = setInterval(()=>{
        if (conta<numero) {
            conta++
            b.innerHTML=`<span class="fs-1 cuscino">${conta}</span>  gatti ${tipo}`
        }else{
            clearInterval()
        }
    },tempo)
    
}

let check= true


let observeReset = new IntersectionObserver((entries)=>{
    entries.forEach((el)=>{
        if(!el.isIntersecting){
            if (check) {
                
                pProdotto.forEach(el => {
                    el.innerHTML=`<span class="fs-1 cuscino">0</span> gatti`
                });
            }
        }
    })
}) 

observeReset.observe(pProdotto[0])

// osservo l'divchek per resettare l'animazione dei numeri
let observeSetChek = new IntersectionObserver((entries)=>{
    entries.forEach((el)=>{
        if (el.isIntersecting) {
            check=true;
        }
    })
}) 

observeSetChek.observe(divCheck)
observeSetChek.observe(h1)


// funzione per l'intersecazione
let observer = new IntersectionObserver( (entries)=>{
    entries.forEach((el)=>{
        if (el.isIntersecting && check == true) {
            counter(500,pProdotto[0],10,'neri');
            counter(100,pProdotto[1],50,'arancioni');
            counter(10,pProdotto[2],500,'grigi');
            check=false;
        }
    })
})

observer.observe(pProdotto[2])

let modelli = [
    {nome:'paolo',prezzo:'120€',},
    {nome:'mirco',prezzo:'150€',},
    {nome:'marco',prezzo:'170€',},
    {nome:'Tom Nook',prezzo:'190€',},
    {nome:'fidel castro',prezzo:'210€',}
]

// le ultime tre card
modelli.forEach((el,index) => {
    let card = document.createElement('div')
    card.classList.add('col-md-4','col-12')
    card.innerHTML=`
    <div class="card shadow my-5 border-card">
    <img src="${gatti[index]}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${el.nome}</h5>
    <p class="card-text">${el.prezzo}</p>
    <a href="#" class="btn">leggi tutto</a>
    </div>
    </div>
    `
    if (index>((modelli.length)-4)) {
        cardRow.appendChild(card)
    }
});


// GIRA TUTTO
let stileGiro = document.createElement('style')

stileGiro.innerHTML=`
*{
    animation: giro 5s linear infinite;
    animation-play-state: running; 
}

@keyframes giro {
    100% {transform: rotate(1turn); }
}
`

giro.addEventListener('click',()=>{
    HTML.appendChild(stileGiro)
})




// swiper

// FUNZIONE CREA STELLE
function createStar(fullStars) {
    let final = '';
    
    
    
    // funzione crea stelle piene
    //ricordarsi che fullStars equivale al voto, quindi se l'utente mette 0 al voto, il primo ciclo non se lo guarda proprio perché la i parte da 0 e quindi 0 è minore di 0? no! ergo va al secondo ciclo che mi genera le stelle vuote
    for(let i = 0; i <= fullStars; i ++){
        final = final + `<i class="fa-solid fa-cat"></i>`;
    }
    
    
    // funzione crea stelle vuote
    // 5 stelle totali, meno le stelle piene che ho già trovato su, ad  esempio 5 - 2 stelle piene, mi avanzano 3 stelle vuote, è lì che questo nuovo ciclo si deve fermare e mi deve generare le restanti stelle vacanti
    for(let i = 0; i < 5 - fullStars; i++ ){
        final = final + `<i class="fa-regular fa-star"></i>`
    }
    // mi devo ricordare di ritornare il valore di final, altrimenti avrò in console un undefined
    return final;
}

// cat adder
gatti.forEach((el,index) => {
    let swpImg = document.createElement('div')
    swpImg.classList.add('swiper-slide','d-flex','justify-content-center','flex-column','align-items-center','border-card')
    swpImg.innerHTML=`
    <img class="swiper-img" src="${el}" alt="">
    <div class= "d-flex fs-1 mt-2>${createStar(vote[index])}</div>
    `
    swiperWrapper.appendChild(swpImg)
    
});

// swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});