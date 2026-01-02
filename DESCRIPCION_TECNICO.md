# Sistema de Publicación de Productos

## Descripción del Proyecto

Plataforma web full-stack desarrollada con Next.js para la gestión y publicación de productos en un marketplace, permitiendo a usuarios crear, editar, eliminar y visualizar productos con funcionalidades avanzadas de contenido enriquecido y optimización SEO.

## Tecnologías y Stack Tecnológico

**Frontend:**

- Next.js 16 (App Router) con React 19
- TypeScript para tipado estático
- Tailwind CSS para estilos
- React Query (TanStack Query) para gestión de estado del servidor
- React Hook Form para formularios
- Tiptap para editor de texto enriquecido
- Storybook para documentación de componentes

**Backend:**

- Next.js API Routes
- Firebase Authentication (client-side y server-side con Admin SDK)
- Cloud Firestore para base de datos
- Firebase Storage para almacenamiento de imágenes
- Sharp para optimización de imágenes

**Arquitectura:**

- Monorepo con Turborepo
- Componentes UI reutilizables en paquete compartido
- Configuraciones compartidas (ESLint, TypeScript, Prettier)
- Husky para git hooks y lint-staged

## Funcionalidades Principales Implementadas

### 1. Sistema de Autenticación

- Autenticación server-side y client-side con Firebase
- Middleware de Next.js para protección de rutas
- Context API para gestión de estado de autenticación
- Manejo de tokens expirados y renovación automática
- Sesiones persistentes con cookies

### 2. Gestión de Productos (CRUD Completo)

- Creación de productos con formularios validados
- Edición de productos con datos pre-cargados
- Eliminación de productos con limpieza de imágenes asociadas
- Visualización de productos en grid/listado
- Búsqueda y filtrado de productos
- Actualización masiva de campos (ej: número de teléfono)

### 3. Editor de Texto Enriquecido

- Integración de Tiptap con React 19
- Formato de texto: negrita, cursiva, tachado
- Selector de tamaño de fuente personalizable
- Selector de color de texto
- Listas ordenadas y con viñetas
- Citas (blockquote) y líneas horizontales
- Enlaces con validación de URL
- Integración con React Hook Form mediante Controller
- Sincronización de contenido HTML con formularios

### 4. Gestión de Imágenes

- Carga de imágenes a Firebase Storage
- Optimización automática con Sharp
- Compresión y redimensionamiento
- Eliminación automática de imágenes al borrar productos
- Preview de imágenes antes de subir
- Manejo de errores en carga

### 5. Sistema de URLs Amigables (SEO)

- Generación automática de slugs únicos basados en título, precio e ID
- URLs amigables: `/producto/[slug]` en lugar de IDs
- Sistema de hash para garantizar unicidad sin exponer IDs
- Regeneración automática de slugs al actualizar productos

### 6. Optimización SEO

- Metadatos dinámicos con `generateMetadata` de Next.js
- Open Graph completo (Facebook, LinkedIn)
- Twitter Cards
- URLs canónicas
- Metadatos estructurados de productos (precio, moneda)
- Descripciones limpias sin HTML para mejor indexación
- Títulos optimizados con keywords

### 7. Dashboard de Administración

- Panel de control para gestión de productos propios
- Contador de productos totales
- Búsqueda en tiempo real
- Acciones rápidas: ver, editar, eliminar
- Actualización masiva de información de contacto
- Integración con WhatsApp para contacto directo

### 8. Sistema de Carga Global

- Loader global controlado mediante queryParams
- Integración con React Query para mostrar estados de carga
- Mensajes personalizables por operación
- Bloqueo de interfaz durante operaciones críticas

### 9. Arquitectura y Organización

- Feature-based architecture
- Separación de concerns (API, hooks, components, types)
- Barrel exports para mejor organización
- Server Components y Client Components optimizados
- Prefetching de datos con React Query
- Hydration boundaries para mejor performance

### 10. Calidad de Código

- TypeScript estricto en todo el proyecto
- ESLint v9 con configuraciones personalizadas
- Prettier para formateo consistente
- Husky pre-commit hooks
- Lint-staged para validación antes de commits
- Storybook para testing visual de componentes

## Logros Técnicos Destacados

- **Performance:** Implementación de Server-Side Rendering (SSR) para mejor tiempo de carga inicial
- **SEO:** Metadatos dinámicos y URLs amigables que mejoran el posicionamiento
- **UX:** Editor de texto enriquecido integrado con formularios, feedback visual en todas las operaciones
- **Escalabilidad:** Arquitectura monorepo que permite reutilización de código y fácil mantenimiento
- **Seguridad:** Autenticación server-side, validación de datos, protección de rutas
- **Mantenibilidad:** Código tipado, componentes reutilizables, documentación con Storybook

## Métricas de Impacto

- Sistema completo de gestión de productos con operaciones CRUD
- Integración de 3 servicios de Firebase (Auth, Firestore, Storage)
- 10+ componentes UI reutilizables documentados en Storybook
- Optimización de imágenes automática reduciendo tamaño en ~70%
- URLs amigables que mejoran SEO y experiencia de usuario
