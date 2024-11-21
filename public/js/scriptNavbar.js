document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const carritoTotalNav = document.getElementById('carritoTotalNav');
    const searchInput = document.getElementById('searchInput');
    const listaProductos = document.getElementById('listaProductos');

    // Estado simulado para el carrito
    const carrito = [
        { id: 1, nombre: 'Producto 1', cantidad: 2 },
        { id: 2, nombre: 'Producto 2', cantidad: 1 }
    ];

    // Mostrar/ocultar menú en pantallas pequeñas
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        navLinks.classList.toggle('hide');
    });

    // Actualizar total de productos en el carrito
    const actualizarCarrito = () => {
        const totalProductos = carrito.reduce((total, producto) => total + (producto.cantidad || 0), 0);
        carritoTotalNav.textContent = totalProductos;
    };

    actualizarCarrito();

    // Simulación de búsqueda de productos
    searchInput.addEventListener('input', (e) => {
        const terminoBusqueda = e.target.value.toLowerCase();
        listaProductos.innerHTML = '';

        if (terminoBusqueda) {
            const productosFiltrados = carrito.filter((producto) =>
                producto.nombre.toLowerCase().includes(terminoBusqueda)
            );

            if (productosFiltrados.length > 0) {
                productosFiltrados.forEach((producto) => {
                    const productoElemento = document.createElement('div');
                    productoElemento.className = 'productosLista';
                    productoElemento.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <p>Cantidad: ${producto.cantidad}</p>
                    `;
                    listaProductos.appendChild(productoElemento);
                });

                listaProductos.style.display = 'block';
            } else {
                listaProductos.style.display = 'none';
            }
        } else {
            listaProductos.style.display = 'none';
        }
    });
});
