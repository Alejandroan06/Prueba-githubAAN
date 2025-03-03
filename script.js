document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");
    const botonVaciar = document.getElementById("vaciar-carrito");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const nombre = e.target.getAttribute("data-nombre");
            const precio = parseFloat(e.target.getAttribute("data-precio"));
            agregarAlCarrito(nombre, precio);
        });
    });

    botonVaciar.addEventListener("click", () => {
        vaciarCarrito();
    });

    function agregarAlCarrito(nombre, precio) {
        const productoExistente = carrito.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}`;
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "❌";
            botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));
            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);
            total += item.precio * item.cantidad;
        });
        totalCarrito.textContent = total.toFixed(2);
        contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }

    function eliminarDelCarrito(index) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }
});
