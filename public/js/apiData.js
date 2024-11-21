document.addEventListener('DOMContentLoaded', async () => {
    const productosContainer = document.getElementById('productos');
    const apiUrl = 'https://apimocha.com/cururu/post';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los productos');
        const productos = await response.json();

        productos.forEach((producto) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <h3>${producto.titulo}</h3>
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <p>${producto.descripcion}</p>
                <button class="botonProducto">Ver detalle</button>
            `;
            productosContainer.appendChild(productoDiv);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
