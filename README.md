📦 LovelyY5

LovelyY5 es un proyecto de tienda online desarrollado como parte de la Evaluación 1 de DSY1104.
Incluye vistas de inicio, listado de productos, detalle, carrito de compras con persistencia en LocalStorage, juego interactivo, formularios con validaciones y una intranet básica.

📸 Capturas de ejemplo

(puedes agregar imágenes de tu proyecto aquí, en una carpeta screenshots/)

🚀 Tecnologías utilizadas

HTML5 para la estructura de las vistas

CSS3 y Bootstrap 5.3.2 para estilos y diseño responsivo

JavaScript (ES6) para lógica de negocio, validaciones y dinámicas del DOM

LocalStorage para persistencia del carrito de compras

Live Server (localhost:5500) para pruebas locales

Git y GitHub para control de versiones

⚙️ Instalación y ejecución local

Clonar el repositorio:

git clone https://github.com/TU-USUARIO/LovelyY5.git
cd LovelyY5


Instalar Live Server en VS Code (extensión).

Abrir el proyecto en VS Code → botón derecho en index.html → Open with Live Server.

Acceder desde el navegador:

http://localhost:5500/

📋 Requisitos funcionales

Registro y login de usuarios con validaciones (RUT, correo y contraseñas).

Carrito de compras con persistencia en LocalStorage.

Filtros y ordenamiento en el listado de productos.

Detalle de productos con carrusel de imágenes.

Validaciones de formularios de contacto y registro según rúbrica.

Juego interactivo (“Juego de la Suerte”).

Intranet básica para administradores.

📋 Requisitos no funcionales

Diseño responsivo y consistente.

Código modularizado (HTML, CSS y JS separados).

Mensajes de error personalizados en validaciones.

Accesibilidad (uso de alt en imágenes, etiquetas claras).

📅 Organización (Sprints)

Sprint 1: Estructura HTML (home, productos, carrito, contacto, login, registro, intranet).

Sprint 2: Estilos con CSS + Bootstrap.

Sprint 3: Lógica en JavaScript (carrito, validaciones, juego).

Sprint 4: Pruebas en Live Server, depuración y mejoras visuales.

Sprint 5: Documentación y preparación para despliegue.

📝 Ejemplos de commits

feat: crear home con hero y productos destacados

feat: implementar carrito con LocalStorage y validación de stock

fix: corregir error en rutas de productos

style: aplicar estilos globales y paleta de colores

docs: añadir README y documentación del proyecto

🌐 Visión a futuro

Desplegar en Vercel para acceso público.

Integrar Firebase o Supabase para autenticación y base de datos real.

Implementar serverless functions para manejar carrito y pedidos.

CRUD completo de productos y usuarios en panel de administración.

Integración con pasarelas de pago (PayPal, Webpay).

✅ Conclusión

El desarrollo de LovelyY5 implicó varios desafíos, principalmente en la integración de múltiples vistas, validaciones estrictas y un carrito de compras persistente.
El resultado es una tienda online funcional, modular y lista para evolucionar hacia un sistema más robusto con hosting y recursos serverless.