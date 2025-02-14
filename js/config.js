const c=console.log,
d=document,
taq=a=>d.querySelector(a),
taqs=a=>d.querySelectorAll(a);
const $cv = taq('#cv');

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
            ${data.proyectos_laborales.map(([nombre,enlace,array]) => `
                <h2>Proyectos Laborales (${nombre})</h2>
            ${array.map(([dir,app,desc])=>{
                return `<div class="proyecto">
                    <h3>${app} - <a href="${enlace}${dir}" target="_blank">Enlace</a></h3>
                    <p>${desc}</p>
                </div>`
                }).join('')}
                
            `).join('')}
        </div>
        <div class="section">      
            ${data.proyectos_personales.map(([nombre,enlace,array]) => `
                <h2>Proyectos Personales (${nombre})</h2>
            ${array.map(([dir,app,desc])=>{
                return `<div class="proyecto">
                    <h3>${app} - <a href="${enlace}${dir}" target="_blank">Enlace</a></h3>
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


fetch('./data/cv.json')
.then(res=>res.json())
.then(data=>crearCV(data))// Llamar a la función para crear el currículum

d.addEventListener('click',e=>{
    if(e.target.matches('.img')){
        print();
    }
})