const tablaPie = document.getElementById('tablaPie');
const inputPrecio = document.getElementById('precio');
const inputDescuento = document.getElementById('descuento');
const btnAgregar = document.getElementById('agregar');
const inputPie = document.getElementById('pie');

let valores = [];

let total = 0;

function formatearMoneda(monto) {
    return '$' + monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

btnAgregar.addEventListener('click', function() {
    let precio = inputPrecio.value;
    let descuento = inputDescuento.value;
    let pie = inputPie.value;

    if (isNaN(pie) || pie <= 0) {
        alert("Debes ingresar un PIE");
        return;
    }

    if (isNaN(precio) || isNaN(descuento)) {
        alert('Por favor, ingresa números válidos.');
        return;
    }
    crearLinea(precio, descuento);
    //cargarTFoot();
    actualizarTabla();
});

function cargarTabla() {
    let thead = `
    <thead>
        <tr>
            <th>#</th>
            <th>Precio Artículo $</th>
            <th>Descuento $</th>
            <th>Valor final</th>
            <th>% Producto</th>
            <th>Monto PIE</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    `;

    tablaPie.innerHTML = thead;
}

function cargarTFoot() {
    let totalPrecios, totalDescuentos, totalFinal;
    for (let i = 0; i<valores.length; i++) {
        totalPrecios += valores[i][0];
        totalDescuentos += valores[i][1];
        totalFinal += valores[i][2];
    }
    let tfoot = `
    <tr>
        <td>-</td>
        <td>${totalPrecios}</td>
        <td>${totalDescuentos}<td>
        <td>${totalFinal}</td>
    </tr>
    `;

    tablaPie.querySelector('tfoot').innerHTML = tfoot;
}

function crearLinea(precio, descuento) {
    let valorFinal = precio - descuento;
    total += valorFinal;
    let pie = inputPie.value;
    let porcentaje = ((valorFinal * 100) / total);
    let montoPie = ((pie * porcentaje) / 100);

    let linea = document.createElement('tr');
    linea.innerHTML = `
        <td>-</td>
        <td>${formatearMoneda(precio)}</td>
        <td>${formatearMoneda(descuento)}</td>
        <td>${formatearMoneda(valorFinal)}</td>
        <td>${porcentaje}</td>
        <td data-idPie="">${formatearMoneda(montoPie)}</td>
    `;

    valores.push([precio, descuento, valorFinal]);

    tablaPie.querySelector('tbody').appendChild(linea);
}

function actualizarTabla() {
    let lineas = document.querySelectorAll('tbody tr');
    let pie = inputPie.value;
    lineas.forEach((linea, index) => {
        let porcentajeFinal = valores[index][2] * 100 / total;
        let montoPie = pie * porcentajeFinal / 100;
        linea.cells[4].textContent = "" + Math.round(porcentajeFinal) + "%";
        linea.cells[5].textContent = formatearMoneda(Math.round(montoPie));
    })
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTabla();
});
