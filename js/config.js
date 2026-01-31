const c=console.log,
d=document,
tag=a=>d.querySelector(a),
tags=a=>d.querySelectorAll(a);
const $cv = tag('#cv');

function crearCV(data) {

    // Crear la estructura del currículum
    $cv.innerHTML = `
        <div class="header">
            <img class='img' src='${data.img}' alt='Foto de perfil' />
            <h1>${data.nombre}</h1>
            <h2>${data.cargo}</h2>
            <p>${data.contacto.join(' | ')}</p>
        </div>
        <div class="section">
            <h2>Perfil</h2>
            <p>Más de ${new Date().getFullYear()-data.experiencia_inicial} años de ${data.perfil}</p>
        </div>
        <div class="section">
            <h2>Estudios</h2>
            ${data.estudios.map(estudio => `<p>${estudio}</p>`).join('')}
        </div>
        <div class="section">
            <h2>Experiencia Laboral</h2>
            ${data.experiencia_laboral.map(([empresa,anio,cargo,desc]) => `
                <div class="experiencia-laboral">
                    <h3>${empresa} - ${anio}</h3>
                    <p><strong>Cargo:</strong> ${cargo}</p>
                    <p>${desc}</p>
                </div>
            `).join('')}
        </div>
        <div class="section">            
            ${data.proyectos.map(([nombre,proyecto,enlace,array]) => `
                <h2>${proyecto} (${nombre})</h2>
            ${array.map(([dir,app,desc])=>{
                const nuevoEnlace = /https?/.test(dir) ? `${dir}` : `${enlace}${dir}`;
                return `<div class="proyecto">
                    <h3>${app} - <a href="${nuevoEnlace}" target="_blank">Enlace</a></h3>
                    <p>${desc}</p>
                </div>`
                }).join('')}
                
            `).join('')}
        </div>
        <div class="section">
            <h2>Idiomas</h2>
            <ul class="temario">
                ${data.idiomas.map(idioma => `<li>${idioma}</li>`).join('')}
            </ul>
        </div>
        <div class="section habilidades">
            <h2>Habilidades Profesionales</h2>
            <ul>
                ${data.habilidades_profesionales.map(habilidad => `<li>${habilidad}</li>`).join('')}
            </ul>
        </div>
        
        
    `;
}

// Sistema de acciones y runner de plugins (data-driven)
const acciones = {
    agregarTexto: ({elemento,valor}) => { elemento.textContent = valor; return elemento; },
    agregarEstilosCSS: ({elemento,valor}) => { Object.assign(elemento.style, valor); return elemento; },
    agregarAtributos: ({elemento,valor}) => { Object.entries(valor).forEach(([k,v]) => elemento.setAttribute(k,v)); return elemento; },
    agregarIcono: ({elemento,valor}) => { elemento.textContent = `${valor} ${elemento.textContent}`; return elemento; }
};

function ejecutarPipeline(elemento, pipeline){
    return pipeline.reduce((el, {accion, valor}) => {
        const fn = acciones[accion];
        if(!fn){ console.warn(`Acción desconocida: ${accion}`); return el; }
        return fn({elemento: el, valor});
    }, elemento);
}

function ejecutarPlugins(plugins){
    plugins.forEach(({selector, pipeline}) => {
        const elementos = tags(selector);
        elementos.forEach(el => ejecutarPipeline(el, pipeline));
    });
}

// Cargar múltiples JSON en paralelo usando Promise.all (fetchAll)
const jsonFiles = ['./data/cv.json', './data/plugins.json'];

function fetchAllJson(paths){
    return Promise.all(paths.map(p =>
        fetch(p)
            .then(r => { if(!r.ok) throw new Error(`${p} ${r.status}`); return r.json(); })
            .catch(err => { console.warn('No se pudo cargar', p, err); return null; })
    ));
}

fetchAllJson(jsonFiles)
    .then(([cvData, plugins]) => {
        if(!cvData) return console.error('No se pudo cargar el CV desde', jsonFiles[0]);
        crearCV(cvData); // renderizar
        if(Array.isArray(plugins) && plugins.length) ejecutarPlugins(plugins);
    })
    .catch(err => console.error('Error en fetchAllJson:', err));

d.addEventListener('click',e=>{
    if(e.target.matches('.img')){
        print();
    }
})