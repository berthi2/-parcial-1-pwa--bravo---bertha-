let historialStorage = JSON.parse(localStorage.getItem('historial'));

let historialPersonajes = [];

if(historialStorage){
    historialPersonajes = historialStorage;
}

console.log(historialPersonajes);

const cuerpoTabla = document.querySelector('#tableBody');

historialPersonajes.forEach((elemento) => {
    cuerpoTabla.innerHTML += `
        <tr>
            <td> 
                <img src="${elemento.img}" class="w-25" alt="">
            </td>
            <td>${elemento.name}</td>
        </tr>
    `
})