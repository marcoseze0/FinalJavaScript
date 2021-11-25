let ingresos = [];
let egresos = [];
let totalIngresos = 0;
let totalEgresos = 0;


let cargarApp = () => {
    cargarIngresos();
    cargarEgresos();
    cargarCabecero();
}


let cargarCabecero = () => {

    //Reemplazando getElementByID por Selectores JQuery
    let presupuesto = totalIngresos - totalEgresos;
    let porcentajeEgreso = totalEgresos / totalIngresos;
    $("#presupuesto").html(formatoMoneda(presupuesto));
    $("#porcentaje").html(formatoPorcentaje(porcentajeEgreso ? porcentajeEgreso : 0));
    $("#ingresos").html(formatoMoneda(totalIngresos));
    $("#egresos").html(formatoMoneda(totalEgresos));

}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });
}
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-AR', {
        style: 'percent',
        minimumFractionDigits: 2
    });
}

const guardarIngresosLocal = (ingresos) => {
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
}

const guardarEgresosLocal = (egresos) => {
    localStorage.setItem('egresos', JSON.stringify(egresos));
}



const cargarIngresos = () => {
    let ingresosLocal = JSON.parse(localStorage.getItem('ingresos'));
    totalIngresos = 0;
    if (ingresosLocal && ingresosLocal.length > 0) {
        let ingresosHTML = '';
        ingresos = ingresosLocal;
        for (let ingreso of ingresos) {
            ingresosHTML += crearIngresoHTML(ingreso);
            totalIngresos += ingreso._valor;
        }
        $("#lista-ingresos").html(ingresosHTML); //Reemplazando getElementByID
    } else {
        $("#lista-ingresos").html('<p>Sin datos registrados</p>'); //Reemplazando getElementByID
        ingresos = [];
    }
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso._descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso._valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso._id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    guardarIngresosLocal(ingresos);
    cargarIngresos();
    cargarCabecero();
}

const cargarEgresos = () => {
    let egresosLocal = JSON.parse(localStorage.getItem('egresos'));
    totalEgresos = 0;
    if (egresosLocal && egresosLocal.length > 0) {
        let egresosHTML = '';
        egresos = egresosLocal;
        for (let egreso of egresosLocal) {
            egresosHTML += crearEgresoHTML(egreso);
            totalEgresos += egreso._valor;
        }
        $("#lista-egresos").html(egresosHTML); //Reemplazando getElementByID
    } else {
        $("#lista-egresos").html('<p>Sin datos registrados</p>'); //Reemplazando getElementByID
        egresos = [];
    }
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso._descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(egreso._valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso._id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    guardarEgresosLocal(egresos);
    cargarEgresos();
    cargarCabecero();
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            guardarIngresosLocal(ingresos);
            cargarIngresos();
            cargarCabecero();
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            guardarEgresosLocal(egresos);
            cargarEgresos();
            cargarCabecero();
        }
    }
}


//Tercera Entrega Final