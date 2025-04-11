# Tinifest 🎉

Plataforma web para la gestión y venta de entradas para eventos.

## Características

- 📅 Publicación y gestión de eventos
- 🎫 Venta de entradas online
- 💳 Procesamiento seguro de pagos con Stripe
- 👤 Sistema de autenticación de usuarios
- 📱 Diseño responsive

## Tecnologías

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Stripe

## Inicio Rápido

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
DATABASE_URL="tu-url-de-base-de-datos"
NEXTAUTH_SECRET="tu-secreto"
STRIPE_SECRET_KEY="tu-clave-secreta-de-stripe"
STRIPE_PUBLISHABLE_KEY="tu-clave-publica-de-stripe"
```

## Estructura del Proyecto

```
src/
  ├── app/           # App router y páginas
  ├── components/    # Componentes reutilizables
  ├── lib/          # Utilidades y configuraciones
  └── types/        # Definiciones de tipos
``` 