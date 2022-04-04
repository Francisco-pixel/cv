import { c, d } from "https://francisco-pixel.github.io/modulos/js/data.js";
import { conexionInternet } from "https://francisco-pixel.github.io/modulos/js/conexionInternet.js";
import { tiempo } from "https://francisco-pixel.github.io/modulos/js/fecha.js";
import { crearNodo } from "https://francisco-pixel.github.io/modulos/js/crearNodo.js";
import { loaderStyle } from "https://francisco-pixel.github.io/modulos/js/loader.js";
import { padreHijo } from "https://francisco-pixel.github.io/modulos/js/padreHijo.js";
import { setText } from "https://francisco-pixel.github.io/modulos/js/setText.js";
import { btnUp,btnUpStyle } from "https://francisco-pixel.github.io/modulos/js/botonSubir.js";
import { copiarText } from "https://francisco-pixel.github.io/modulos/js/copiarText.js";
import {contacto,
    estudios,
    profesion,
    titulos_izquierda,
    titulos_derecha,
    idiomas,
    habilidades,
    experiencias} from "./data.js";
conexionInternet()
btnUp()
tiempo()
copiarText()
btnUpStyle({
    "element":".btn-subir",
    "bg":"#5d2e64",
    "wh":"50px"
})
//Títulos de la izquierda
d.querySelectorAll(".l-aside__contacto").forEach((titulo,i)=>{
    titulo.innerText=titulos_izquierda[i];
})

let loop_info_right=(arr,attr)=>{
    arr.forEach(item=>{
        d.querySelector(attr).innerHTML+=`
        <p class="l-aside__contacto-detail">${item}</p>`;
    })
}
loop_info_right(contacto,".contacto")
loop_info_right(estudios,".estudios")
loop_info_right(profesion,".profesion")

//Idiomas
Object.keys(idiomas).forEach((idioma,i)=>{
    d.querySelector(".idioma").innerHTML+=`
    <p class="l-aside__contacto-detail">${idioma}</p>
    <div class="barra">
        <div class="barra__porciento"></div>
    </div>
    `
    d.querySelectorAll(".barra__porciento")[i].style.width=`0%`;
    setTimeout(()=>{
        d.querySelectorAll(".barra__porciento")[i].style.width=`${idiomas[idioma]}%`;
    },1000)
})

//Títulos derecha
d.querySelectorAll(".r-aside-profile__title").forEach((titulo,i)=>{
    titulo.innerText=titulos_derecha[i];
})
//Habilidades
Object.keys(habilidades).forEach((habilidad,i)=>{
    d.querySelector(".habilidades").innerHTML+=`
    <p class="r-aside-profile__p">${habilidad}</p>
    <div class="barra-r">
        <div class="barra__porciento-r"></div>
    </div>
    `
    d.querySelectorAll(".barra__porciento-r")[i].style.width=`0%`;
    setTimeout(()=>{
        d.querySelectorAll(".barra__porciento-r")[i].style.width=`${habilidades[habilidad]}%`;
    },1000)
})
//Experiencias laborales
experiencias.forEach(({profesion,institucion,anios,desc})=>{
    d.querySelector(".experiencia").innerHTML+=`
    <div class="grid text--align-left-center">
        <p class="r-aside-profile__p">${anios}</p>
        <p class="r-aside-profile__p">${institucion}</p>
    </div>
    <div class="grid text--align-left-center gap">
        <h4 class="r-aside-profile__sub-title">${profesion}</h4>
        <p class="r-aside-profile__p">${desc}</p>
    </div>
    `
})
    
d.addEventListener("click",e=>{

})