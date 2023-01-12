const carrito = []
function validacion(cantidad) {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Deber agregar un número.')
        } else {
            alert('Debe agregar un número distinto de cero.')
        }
         cantidad = parseInt(prompt ("¿Cuántos querés comprar?"));
    }
            
return cantidad;
};
const ordenarMenorMayor = () =>{
    productos.sort((a, b)=> a.precio - b.precio)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () =>{
    productos.sort((a, b)=> b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () =>{
    const listadeproductos = productos.map(producto => {
        return '- '+producto.nombre+'\n '+producto.marca+'\n $'+producto.precio+'\n'
    })
    alert('Lista de precios:'+'\n\n'+listadeproductos.join('\n'))
    comprarProductos(listadeproductos)
};

const comprarProductos = (listadeproductos) =>{
    let productoNombre =''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿que producto desea comprar?'+'\n\n'+listadeproductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuantos desea comprar?'))
        let productoCantidadValidado = validacion(productoCantidad)

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidadValidado)
        } else {
          alert('el producto que desea no se encuentra en catalogo')  
        }

        otroProducto = confirm('desea agregar otro producto?')
    } while (otroProducto);
    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidadValidado) =>{
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if(!productoRepetido){
        producto.cantidad += productoCantidadValidado
        carrito.push(producto)
    }else{
        productoRepetido.cantidad += productoCantidadValidado
    }
    console.log(carrito)
};

const eliminarProductoCarrito = (productoAEliminar) => {
    carrito.forEach((producto, index) =>{
        if(producto.nombre.toLowerCase() === productoAEliminar.toLowerCase()){
            if(producto.cantidad >1){
                producto.cantidad--
            }else{
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return'- '+producto.nombre+' | Cantidad: '+producto.cantidad
    })

    const ischequeo = confirm('Lista de su carrito '
    +'\n\n'+listaProductos.join('\n')
    +'\n\nPara continuar presione "Aceptar"de caso contrario, presione "cancelar" para eliminar algun producto')

    if (ischequeo) {
        finalizarCompra(listaProductos)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar')
        eliminarProductoCarrito(productoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
    +'\n\n'+listaProductos.join('\n')
    +'\n\nTotal de productos: '+cantidadTotal
    +'\n\nEl total de su compra es: '+precioTotal
    +'\n\nGracias por comprar en GYM BOOST, ahora a MUTAR!!')
};

const comprar = () => {
    const productosBaratos = confirm('desea ordenar la lista de productos del mas barato al mas caro')
    if (productosBaratos){
        ordenarMenorMayor()
    }else{
        ordenarMayorMenor()
    }
};



comprar();