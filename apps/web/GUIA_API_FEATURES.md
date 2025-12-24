# Guía: Integración de APIs con Features

## 📁 Estructura de una Feature con API

```
app/features/characters/
├── types/
│   └── index.ts              # Tipos TypeScript de la API
├── api/
│   └── charactersApi.ts      # Servicios de API (fetch/axios)
├── hooks/
│   ├── useCharacters.ts      # Hook con React Query
│   └── useCharacter.ts       # Hook para un solo item
├── components/
│   ├── CharacterCard.tsx    # Componente de tarjeta
│   ├── CharacterGrid.tsx     # Componente de grilla
│   └── CharacterList.tsx     # Componente completo con loading/error
├── store/
│   └── charactersStore.ts    # Store de Zustand (estado global)
└── index.ts                  # Barrel exports
```

## 🔄 Flujo de Datos

```
1. Componente (CharacterList)
   ↓ importa
2. Hook (useCharacters) con React Query
   ↓ usa
3. Servicio API (charactersApi.ts)
   ↓ hace
4. Petición HTTP (fetch)
   ↓ retorna
5. Datos tipados (Character[])
   ↓ React Query cachea
6. Componente se actualiza automáticamente
```

## 🎯 Capas de la Arquitectura

### 1. **Types** (`types/index.ts`)
```typescript
// Tipos TypeScript basados en la respuesta de la API
// Con Orval, estos se generan automáticamente desde OpenAPI
export interface Character {
  id: number;
  name: string;
  // ...
}
```

### 2. **API Services** (`api/charactersApi.ts`)
```typescript
// Capa de abstracción para peticiones HTTP
// Aquí va la lógica de fetch/axios
export async function getCharacters(params) {
  const response = await fetch(url);
  return response.json();
}
```

### 3. **Hooks con React Query** (`hooks/useCharacters.ts`)
```typescript
// React Query maneja caché, loading, error automáticamente
export function useCharacters(params) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
  });
}
```

### 4. **Components** (`components/CharacterList.tsx`)
```typescript
// Componentes que usan los hooks
export function CharacterList() {
  const { data, isLoading, error } = useCharacters();
  // Renderiza UI
}
```

### 5. **Store (Zustand)** (`store/charactersStore.ts`)
```typescript
// Estado global compartido (favoritos, historial, etc.)
export const useCharactersStore = create((set) => ({
  favorites: [],
  addFavorite: (character) => set(...),
}));
```

## 📝 Ejemplo de Uso en una Página

```tsx
// app/characters/page.tsx
'use client'

import { CharacterList } from '../features/characters';
import { SearchBar } from '../features/search';

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <SearchBar 
        query={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CharacterList params={{ name: searchQuery }} />
    </div>
  );
}
```

## 🛠️ Configuración de React Query

### Provider (ya configurado en `layout.tsx`)
```tsx
// app/shared/providers/QueryProvider.tsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

### Configuración del QueryClient
- `staleTime`: Tiempo que los datos se consideran frescos
- `refetchOnWindowFocus`: Refetch cuando la ventana recupera foco
- `retry`: Número de reintentos en caso de error

## 🔧 Configuración de Orval (Opcional)

Orval genera automáticamente tipos y clientes desde OpenAPI:

1. **Instalar Orval:**
```bash
pnpm add -D orval
```

2. **Configurar** (`orval.config.ts`):
```typescript
export default defineConfig({
  rickandmorty: {
    input: {
      target: 'https://api.example.com/openapi.json',
    },
    output: {
      target: './app/features/characters/api/generated.ts',
      client: 'react-query',
    },
  },
});
```

3. **Ejecutar:**
```bash
pnpm orval
```

## 🎨 Uso de Zustand para Estado Global

```tsx
// En cualquier componente
import { useCharactersStore } from '../features/characters';

function MyComponent() {
  const { favorites, addFavorite } = useCharactersStore();
  
  return (
    <button onClick={() => addFavorite(character)}>
      Agregar a favoritos
    </button>
  );
}
```

## ✅ Ventajas de esta Arquitectura

1. **Separación de responsabilidades**: Cada capa tiene un propósito claro
2. **Reutilización**: Features pueden usarse en múltiples páginas
3. **Tipado fuerte**: TypeScript en toda la cadena
4. **Caché automático**: React Query maneja el caché
5. **Estado global opcional**: Zustand solo cuando es necesario
6. **Generación automática**: Orval puede generar código desde OpenAPI

## 🚀 Próximos Pasos

1. **Agregar más endpoints**: Extender `charactersApi.ts`
2. **Mutations**: Usar `useMutation` de React Query para POST/PUT/DELETE
3. **Optimistic Updates**: Actualizar UI antes de confirmar con servidor
4. **Infinite Scroll**: Usar `useInfiniteQuery` para paginación infinita
5. **Error Boundaries**: Manejar errores a nivel de feature

