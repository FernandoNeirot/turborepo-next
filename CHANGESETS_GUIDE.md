# Guía de Uso de Changesets

## Proceso Paso a Paso

### 1. Crear un Changeset

Cuando hagas cambios en `@repo/ui` que requieran una nueva versión, ejecuta:

```bash
pnpm changeset
```

Este comando te mostrará:
- Una lista de paquetes disponibles para versionar
- Te pedirá que selecciones qué paquetes incluir (usa las flechas y espacio para seleccionar)
- Te preguntará el tipo de versión:
  - **patch** (0.0.0 → 0.0.1): Para correcciones de bugs
  - **minor** (0.0.0 → 0.1.0): Para nuevas funcionalidades (backward compatible)
  - **major** (0.0.0 → 1.0.0): Para cambios que rompen compatibilidad

El comando creará un archivo en `.changeset/` con un nombre aleatorio que contiene la descripción de tus cambios.

### 2. Ver el Estado de los Changesets

Para ver qué changesets están pendientes de aplicar:

```bash
pnpm changeset status
```

Esto mostrará qué paquetes serán actualizados y con qué tipo de versión.

### 3. Aplicar los Changesets (Actualizar Versiones)

Cuando estés listo para actualizar las versiones basándote en los changesets:

```bash
pnpm version
```

Este comando:
- Actualizará las versiones en los `package.json` de los paquetes afectados
- Generará/actualizará los archivos `CHANGELOG.md` en cada paquete
- Eliminará los changesets que fueron aplicados

### 4. Publicar (Opcional)

Si quieres publicar los paquetes a npm:

```bash
pnpm release
```

**Nota:** Esto requiere que los paquetes no estén marcados como `private: true` y que tengas configurado el acceso a npm.

## Archivos Generados

- **`.changeset/*.md`**: Archivos temporales que describen los cambios pendientes
- **`packages/ui/CHANGELOG.md`**: Historial de versiones generado automáticamente
- **`packages/ui/package.json`**: La versión se actualiza automáticamente

## Ejemplo Completo

1. Haces cambios en `@repo/ui`
2. Ejecutas `pnpm changeset` y seleccionas `@repo/ui` con tipo `patch`
3. Escribes una descripción de tus cambios
4. Ejecutas `pnpm version` para aplicar el changeset
5. La versión de `@repo/ui` se actualiza y se genera el CHANGELOG
6. Haces commit de los cambios

## Nota sobre Advertencias

Puedes ver advertencias sobre el paquete "storybook" debido a un conflicto de nombres (la app se llama igual que el paquete npm). Estas advertencias no afectan el funcionamiento de changesets para `@repo/ui`.

