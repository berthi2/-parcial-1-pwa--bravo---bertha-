const tableBody = document.querySelector('#tableBody');
const myModal = new bootstrap.Modal(document.getElementById('modalPersonajeData'));

let historialStorage = JSON.parse(localStorage.getItem('historial'));

let historialPersonajes = [];

if (historialStorage) {
    historialPersonajes = historialStorage;
}

function renderTabla() {
    fetch(`https://rickandmortyapi.com/api/character/?page=20&status=alive`)
        .then(response => response.json())
        .then(data => {
        
           
            const listado = data.results.map((elemento) => {
                return `<tr>
                <td>${elemento.id}</td>
                <td>${elemento.name}</td>
                <td>${elemento.url}</td>
                <td>${elemento.gender}</td>
                <td>
                <button type="button" id="${elemento.url}" class="btn btn-outline-primary btnVerMas" >
                    Ver más
                </button>
                </td>
            </tr>`
            }); 

           
            tableBody.innerHTML = listado.join('');


            const botones = document.querySelectorAll('.btnVerMas');

            botones.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const urlApi = btn.id;

                    fetch(urlApi)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            const tituloModal = document.querySelector('.modal-title');
                            const cuerpoModal = document.querySelector('.modal-body');
                            tituloModal.textContent = data.name;

                        


                            cuerpoModal.innerHTML = `
                        <img src="${data.image}" class="w-25 mx-auto d-block" alt="">
                        <p class="text-center"><strong>Genero: </strong> ${data.gender}</p>
                        <p class="text-center"><strong>Especie: </strong> ${data.species}</p>
                        <p class="text-center"><strong>Locación: </strong> ${data.location.name}</p>
                    `;
                            myModal.show();


                            if (!historialPersonajes.find((elemento) => elemento.name == data.name)) {
                                historialPersonajes.push({
                                    name: data.name,
                                    img: data.image
                                })
                            }

                            console.log(historialPersonajes)

                            localStorage.setItem('historial', JSON.stringify(historialPersonajes));
                        })

                })
            })

        })
        .catch(error => {
            console.error("Ha ocurrido un error:" + error)
    })
}

renderTabla();
