# TiendaApi

Aplicación móvil desarrollada en React Native para la gestión completa de productos (CRUD) utilizando la FakeStore API.

## Descripción

Esta aplicación permite visualizar, crear, editar y eliminar productos de una tienda. Consume datos de la FakeStore API y proporciona una interfaz para administrar el catálogo de productos.

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar aplicación
npm start

# Iniciar en iOS
npm run ios

# Iniciar en Android
npm run android
```

### Arquitectura

1. Vista (Screens + Components)
   - Maneja la interfaz de usuario y la interacción
   - Las screens orquestan componentes y hooks
   - Los components son piezas reutilizables de UI

2. Controlador (Hooks)
   - Maneja el estado y la lógica de negocio
   - Abstrae la complejidad de las operaciones
   - Proporciona interfaces simples para las pantallas

3. Modelo (API)
   - Centraliza todas las llamadas a la API
   - Proporciona métodos para CRUD operations
   - Abstrae los detalles de implementación HTTP

## Metodologías Aplicadas

### Separación de Responsabilidades (MVC)
Cada capa tiene una responsabilidad única y bien definida:
Model (api/) solo maneja acceso a datos
Controller (hooks/) solo maneja lógica de negocio y estado
View (components/ y screens/) solo renderiza UI y captura eventos de usuario

### Reutilización de Componentes
Los componentes están diseñados para ser reutilizables:
- ProductCard: Muestra información del producto en lista
- ProductForm: Formulario compartido entre crear/editar
- Loading: Indicador de carga universal

### Custom Hooks
Encapsulan lógica compleja y la hacen reutilizable:
- useProducts: Maneja la obtención de productos
- useProductMutations: Maneja creación, edición y eliminación

### Centralización de Constantes
Todos los valores reutilizables en un solo lugar:
- Colores del tema en COLORS
- Espaciados consistentes en SPACING
- Configuración de API en API_CONFIG


## Estructura del Código

### /api
Comunicación con APIs externas

### /hooks
Lógica de negocio reutilizable

- useProducts: Obtiene y cachea la lista de productos
- useProductMutations: Proporciona métodos para modificar productos con manejo de errores y estados de carga

### /components
Componentes de UI reutilizables

- ProductCard: Tarjeta visual para mostrar producto en lista
- ProductForm: Formulario con validación para crear/editar
- Loading: Indicador de carga animado

### /screens
Pantallas completas de la aplicación

- ProductListScreen: Lista de todos los productos
- ProductDetailScreen: Detalle completo de un producto
- ProductCreateScreen: Formulario para crear producto
- ProductEditScreen: Formulario para editar producto
- ProductDeleteScreen: Confirmación de eliminación

### /navigation
Configuración del Stack Navigator. Define las rutas y transiciones entre pantallas usando React Navigation.

### /utils
Constantes y configuraciones globales

- COLORS: Paleta de colores de la aplicación
- SPACING: Sistema de espaciado consistente
- API_CONFIG: URL base y configuración de la API

## Flujo de Datos (MVC)
1. Usuario interactúa con la View (Screen/Component)
2. View notifica al Controller (Hook)
3. Controller ejecuta lógica de negocio
4. Controller solicita datos al Model (API)
5. Model hace petición HTTP y devuelve datos
6. Controller actualiza el estado con los datos
7. View se re-renderiza automáticamente con el nuevo estado
