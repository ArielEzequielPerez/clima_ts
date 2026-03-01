
# Clima React + TypeScript

Pequeña aplicación de ejemplo en React + TypeScript para consultar el clima.

Este proyecto está preparado para desarrollarse y desplegarse localmente usando Docker (recomendado) o directamente con Node.js/NPM.

## Requisitos

- Docker y Docker Compose instalados si quieres usar la forma con contenedores.
- Node.js (v18+) y npm si prefieres ejecutar la app sin Docker.

> Nota: el contenedor de desarrollo en `docker-compose.yml` expone el puerto `5000` y ejecuta `npm run dev` dentro del contenedor. Si prefieres usar el puerto por defecto de Vite (5173) puedes ajustar `docker-compose.yml` o abrir el puerto correcto.

## Ejecutar con Docker (recomendado)

1. Construir y levantar el servicio:

```bash
docker compose up --build
```

2. Abrir en el navegador:

- Si usas la configuración incluida (mapeo `5000:5000`): http://localhost:5000
- Si cambias a 5173: http://localhost:5173

Para detener y eliminar los contenedores y redes creadas:

```bash
docker compose down
```

## Ejecutar sin Docker (localmente)

1. Instalar dependencias:

```bash
npm install
```

2. Levantar el modo desarrollo:

```bash
npm run dev
```

3. Abrir la app en el navegador (por defecto Vite usa 5173):

http://localhost:5173

Para crear una build de producción:

```bash
npm run build
npm run preview
```

## Scripts útiles (package.json)

- `npm run dev` — servidor de desarrollo (Vite).
- `npm run build` — compila TypeScript y empaqueta la app para producción.
- `npm run preview` — prueba la build de producción localmente.
- `npm run lint` — ejecuta ESLint sobre el proyecto.

## Estructura del proyecto (resumen)

- `src/` — código fuente React + TypeScript.
	- `components/` — componentes (Form, Alert, ...).
	- `hooks/` — hooks personalizados (por ejemplo `useWeather`).
	- `data/` — datos estáticos (p. ej. `countries.ts`).
	- `types/` — tipos TypeScript.
- `public/` — activos estáticos.
- `Dockerfile`, `docker-compose.yml` — configuración para ejecutar en Docker.

## Variables de entorno y configuración

Actualmente no hay variables de entorno obligatorias documentadas en el repo. Si agregas claves (p. ej. API keys) sigue estas buenas prácticas:

- Usar un archivo `.env` y añadirlo a `.gitignore`.
- Para Vite: variables prefijadas con `VITE_` para que estén disponibles en el cliente.

Ejemplo rápido de `.env` (NO agregar tus secretos a git):

```
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

### Crear un archivo `.env.local` (comando)

Puedes crear rápidamente un archivo `.env.local` en la raíz del proyecto con los valores que necesites. Por ejemplo, en zsh/bash:

```bash
cat > .env.local <<EOF
VITE_WEATHER_API_KEY=tu_api_key_aqui
EOF

# Opcional: añadir .env.local a .gitignore para evitar subirlo por error
echo ".env.local" >> .gitignore
```

Alternativamente, si prefieres usar un solo comando sin heredocs:

```bash
echo "VITE_WEATHER_API_KEY=tu_api_key_aqui" > .env.local
```

Reemplaza `tu_api_key_aqui` por la clave real de la API (por ejemplo OpenWeather). Recuerda no commitear este archivo.

## Notas y depuración

- Si al levantar el contenedor no ves la app en el puerto esperado, revisa `docker-compose.yml` y el `EXPOSE`/puerto en `Dockerfile`.
- Para desarrollo local es útil tener montado el volumen (ya configurado en `docker-compose.yml`) para ver cambios sin reconstruir la imagen.

## Contribuciones

Las contribuciones son bienvenidas. Abre issues o pull requests con cambios pequeños y claros.


