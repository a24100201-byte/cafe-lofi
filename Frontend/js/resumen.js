document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const nombre = params.get('nombre') || 'N/A';
    const email = params.get('email') || 'Sin correo';
    const telefono = params.get('telefono') || 'Sin teléfono';
    const producto = params.get('producto') || 'N/A';
    const cantidad = params.get('cantidad') || '1';
    const tamano = params.get('tamano') || 'N/A';
    const extras = params.get('extras') || 'Ninguno';
    const direccion = params.get('direccion') || 'Entrega en sucursal';
    const observaciones = params.get('observaciones') || 'Sin notas especiales';

    document.getElementById('res-nombre').textContent = nombre;
    document.getElementById('res-contacto').textContent = `${email} | Tel: ${telefono}`;
    document.getElementById('res-producto').textContent = `${cantidad}x ${producto}`;
    document.getElementById('res-detalles').textContent = `Tamaño: ${tamano} | Extras: ${extras}`;
    document.getElementById('res-direccion').textContent = direccion;
    document.getElementById('res-observaciones').textContent = observaciones;
});