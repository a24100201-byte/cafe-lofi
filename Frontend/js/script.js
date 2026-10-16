// Validación sencilla antes de enviar el formulario
document.addEventListener('DOMContentLoaded', () => {
    const formPedido = document.getElementById('formPedido');

    if (formPedido) {
        formPedido.addEventListener('submit', (event) => {
            const nombre = document.getElementById('nombre').value.trim();
            const producto = document.getElementById('producto').value;
            const cantidad = parseInt(document.getElementById('cantidad').value, 10);

            if (!nombre) {
                alert('Por favor ingresa tu nombre.');
                event.preventDefault();
                return;
            }

            if (!producto) {
                alert('Por favor selecciona una opción de café.');
                event.preventDefault();
                return;
            }

            if (isNaN(cantidad) || cantidad < 1) {
                alert('La cantidad debe ser al menos 1.');
                event.preventDefault();
                return;
            }
        });
    }
});