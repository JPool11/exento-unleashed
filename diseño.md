# Diseño — Exento · Sin Reglas

Documento de diseño y arquitectura visual del sitio web de **Exento**, gastrobar y salón de eventos ubicado en Colombia. El proyecto actual es una landing de **“Próximamente”** con identidad premium, atmósfera oscura y acentos dorados.

---

## 1. Visión del producto

| Aspecto | Descripción |
|--------|-------------|
| **Marca** | Exento — Sin Reglas |
| **Tipo** | Gastrobar · Eventos |
| **Estado** | Próximamente (landing de prelanzamiento) |
| **Dominio** | [exento.com.co](https://exento.com.co) |
| **Ubicación** | Neiva, Huila, Colombia (coordenadas en Google Maps) |
| **Tono** | Elegante, íntimo, sin formalismos excesivos. Cocina de autor, coctelería y celebración sin ataduras. |
| **Año de referencia** | Est. 2026 |

### Mensaje principal

> *Una nueva experiencia gastronómica está por abrir sus puertas.*

Subtítulo de apoyo:

> *Cocina de autor, coctelería y un espacio pensado para celebrar sin ataduras.*

---

## 2. Identidad visual

### 2.1 Paleta de colores

Todos los colores del sistema usan formato **OKLCH** para consistencia perceptual y soporte de modo oscuro.

#### Colores de marca (tokens propios)

| Token | Valor OKLCH | Uso |
|-------|-------------|-----|
| `--background` | `oklch(0.18 0.012 40)` | Fondo principal — espresso profundo |
| `--foreground` | `oklch(0.95 0.02 85)` | Texto base |
| `--ink` | `oklch(0.14 0.01 40)` | Tinta oscura (reservado) |
| `--gold` | `oklch(0.78 0.11 82)` | Acento principal — oro champagne |
| `--gold-soft` | `oklch(0.68 0.08 78)` | Bordes, líneas decorativas, estados suaves |
| `--ivory` | `oklch(0.96 0.02 85)` | Texto destacado / cuerpo principal |
| `--muted-ink` | `oklch(0.72 0.02 70)` | Texto secundario, metadatos, footer |

#### Paleta semántica (shadcn/ui)

El proyecto incluye el sistema completo de tokens de **shadcn/ui** (`primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `ring`, `chart-*`, `sidebar-*`) para componentes reutilizables y futuras pantallas.

### 2.2 Tipografía

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| **Display** | Cormorant Garamond | 300, 400, 500 (+ itálicas) | Titulares, frases editoriales, énfasis elegante |
| **Sans** | Inter | 300, 400, 500 | UI, etiquetas, tracking amplio, metadatos |

Clases Tailwind:

- `font-display` → Cormorant Garamond
- `font-sans` → Inter

#### Patrones tipográficos recurrentes

- **Etiquetas superiores**: `text-[10px] uppercase tracking-[0.42em]` o `tracking-[0.5em]` en color `--gold`
- **Separadores horizontales**: líneas de `1px` con `--gold-soft`, ancho `w-10`, flanqueando texto
- **Cuerpo editorial**: `font-display text-xl md:text-2xl` en `--ivory`
- **Texto de apoyo**: `font-sans text-sm` en `--muted-ink`

### 2.3 Radio y espaciado

- **Radio base**: `--radius: 0.625rem` (10px)
- Escala derivada: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` vía `@theme inline`
- **Contenedores**: padding horizontal `px-6` (móvil) → `md:px-14` (desktop)
- **Sección central**: `flex-1`, centrado vertical y horizontal

### 2.4 Texturas y atmósfera

La página principal aplica dos capas decorativas sobre el fondo:

1. **Glow ambiental** — gradientes radiales OKLCH en la parte superior e inferior para calidez y profundidad.
2. **Grano sutil** — SVG de ruido fractal con `opacity-[0.06]` y `mix-blend-overlay` para textura editorial.

Estos efectos son `pointer-events-none` y `aria-hidden` para no interferir con la accesibilidad.

---

## 3. Recursos gráficos

### Logotipos (directorio `public/`)

| Archivo | Uso |
|---------|-----|
| `exento-logo-white.png` | Logo principal en la landing (fondo oscuro) |
| `exento-logo-dark.png` | Variante para fondos claros |
| `exento-e-white.png` | Isotipo / favicon alternativo |
| `exento-e-dark.png` | Isotipo en versión oscura |
| `favicon.png` | Icono del sitio |

El logo en la home se muestra con ancho responsivo: `w-[min(78vw,620px)]`.

### Iconografía

- **Redes sociales**: SVG inline (Instagram, Facebook, TikTok) en `src/routes/index.tsx`
- **Mapa**: icono de pin inline (`MapPinIcon`)
- **Componentes UI**: [Lucide React](https://lucide.dev) (biblioteca configurada en shadcn)

---

## 4. Estructura de la página (landing)

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
│  Est. 2026          Gastrobar · Eventos     │
├─────────────────────────────────────────────┤
│                                             │
│         — Próximamente —                    │
│                                             │
│            [LOGO EXENTO]                    │
│                                             │
│         — Próximamente —                    │
│                                             │
│      [Instagram] [Facebook] [TikTok]        │
│                                             │
│   Una nueva experiencia gastronómica...     │
│   Cocina de autor, coctelería...            │
│                                             │
│            — Ubicación —                    │
│         [Mapa Google embebido]              │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  © Exento · Powered by JPool Tech           │
└─────────────────────────────────────────────┘
```

### Secciones

| Sección | Contenido |
|---------|-----------|
| **Header** | Marca temporal “Est. 2026” y categoría “Gastrobar · Eventos” |
| **Hero** | Badge “Próximamente”, logo, tagline y redes sociales |
| **Descripción** | Propuesta de valor en dos párrafos |
| **Ubicación** | iframe de Google Maps con overlay clickeable hacia Maps externo |
| **Footer** | Línea decorativa, copyright y créditos de desarrollo |

### Interacciones

- **Enlaces sociales**: botones circulares `size-11`, borde `--gold-soft`, hover con `scale-110`, borde `--gold` y fondo `--gold/10`
- **Mapa**: hover oscurece el iframe (`bg-black/25`) y resalta el badge “Abrir en Google Maps”
- **Transiciones**: `duration-300` en la mayoría de hovers

### Redes sociales

| Red | URL |
|-----|-----|
| Instagram | [@exento_sinreglas](https://www.instagram.com/exento_sinreglas/) |
| Facebook | [Perfil Exento](https://www.facebook.com/profile.php?id=61593381956846) |
| TikTok | [@exento_sinreglas](https://www.tiktok.com/@exento_sinreglas) |

---

## 5. Experiencia interactiva: cursor de cubiertos

Componente: `src/components/CutleryCursor.tsx`

Un cursor personalizado de **tenedor + cuchillo** en color `--gold` que refuerza la identidad gastronómica.

| Comportamiento | Detalle |
|----------------|---------|
| **Activación** | Solo en dispositivos con puntero fino (`pointer: fine`) |
| **Hover** | Escala `1.3` sobre `a`, `button`, inputs y `[data-cursor-hover]` |
| **Click** | Animación de “corte”: tenedor y cuchillo convergen y el cuchillo se desplaza |
| **Ocultación** | `cursor: none` en todo el documento mientras está activo |
| **Móvil/tablet** | Deshabilitado en `(pointer: coarse)` |

Se monta globalmente desde `src/routes/__root.tsx`.

---

## 6. Sistema de componentes UI

### Stack de interfaz

| Tecnología | Versión / estilo |
|------------|------------------|
| **Tailwind CSS** | v4 con `@tailwindcss/vite` |
| **shadcn/ui** | Estilo `new-york`, base `slate` |
| **Radix UI** | Primitivos accesibles (dialog, dropdown, tabs, etc.) |
| **class-variance-authority** | Variantes de componentes |
| **tw-animate-css** | Animaciones utilitarias |

### Componentes disponibles (`src/components/ui/`)

Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner (toasts), Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip.

> La landing actual no usa la mayoría de estos componentes; están preparados para futuras pantallas (menú, reservas, panel admin, etc.).

### Utilidad `cn()`

`src/lib/utils.ts` — combina `clsx` + `tailwind-merge` para clases condicionales sin conflictos.

---

## 7. Arquitectura técnica

### Stack principal

```
React 19 + TypeScript
TanStack Start (SSR / SPA híbrido)
TanStack Router (rutas basadas en archivos)
TanStack Query (estado servidor)
Vite 8
Nitro (servidor en producción, excepto GitHub Pages)
```

### Estructura de directorios

```
exento-unleashed/
├── public/              # Assets estáticos (logos, CNAME)
├── scripts/
│   └── build-pages.mjs  # Build para GitHub Pages
├── src/
│   ├── assets/          # Metadatos de imágenes (Lovable)
│   ├── components/
│   │   ├── ui/          # shadcn/ui
│   │   └── CutleryCursor.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── lib/             # Utilidades y manejo de errores
│   ├── routes/
│   │   ├── __root.tsx   # Layout raíz, meta, cursor
│   │   └── index.tsx    # Landing principal (/)
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css       # Design tokens y Tailwind
├── components.json      # Configuración shadcn
├── vite.config.ts
└── diseño.md            # Este documento
```

### Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `src/routes/index.tsx` | Landing “Próximamente” |
| `*` | `__root.tsx` → `NotFoundComponent` | Página 404 |

### Meta y SEO (`__root.tsx`)

- **Título**: `Exento — Sin reglas · Próximamente`
- **Descripción**: Gastrobar y salón de eventos. Una experiencia sin reglas.
- **Open Graph**: `og:title`, `og:description`, `og:type: website`
- **Twitter Card**: `summary_large_image`
- **Idioma HTML**: `lang="en"` (contenido visible en español)

---

## 8. Despliegue

| Entorno | Comando | Destino |
|---------|---------|---------|
| Desarrollo | `npm run dev` | Servidor local Vite |
| Build estándar | `npm run build` | `dist/` con Nitro |
| GitHub Pages | `npm run deploy` | Rama `gh-pages`, dominio `exento.com.co` |

El script `build-pages.mjs` activa modo SPA + prerender de `/`, copia `_shell.html` a `index.html` y `404.html`.

---

## 9. Accesibilidad

- Enlaces externos con `rel="noopener noreferrer"`
- `aria-label` en iconos de redes y enlace del mapa
- iframe del mapa con `aria-hidden` y `tabIndex={-1}`; la interacción real es el overlay `<a>`
- Cursor personalizado con `aria-hidden`
- Capas decorativas con `aria-hidden`
- Componentes Radix preparados para roles ARIA nativos en futuras pantallas

---

## 10. Páginas de error

| Estado | Componente | Estilo |
|--------|------------|--------|
| **404** | `NotFoundComponent` | Centrado, tipografía del sistema shadcn |
| **Error** | `ErrorComponent` | Mensaje amigable + botones “Try again” / “Go home” |

Ambas usan tokens `bg-background`, `text-foreground`, `text-muted-foreground`.

---

## 11. Guía para extensiones futuras

Al diseñar nuevas pantallas para Exento, mantener:

1. **Fondo oscuro espresso** (`--background`) con acentos `--gold` / `--gold-soft`
2. **Cormorant** para titulares editoriales; **Inter** para UI
3. **Tracking amplio** en etiquetas pequeñas (`uppercase`, `tracking-[0.4em+]`)
4. **Bordes finos dorados** y hovers suaves (`duration-300`)
5. **Gradientes radiales** y grano sutil en hero sections
6. **Cursor de cubiertos** en desktop (no modificar comportamiento en móvil)
7. **OKLCH** para cualquier color nuevo
8. Reutilizar componentes de `src/components/ui/` antes de crear piezas ad-hoc

### Posibles siguientes pantallas

- Menú / carta digital
- Reservas y eventos privados
- Galería del espacio
- Formulario de contacto / lista de espera
- Panel administrativo

---

## 12. Créditos

- **Marca**: Exento · Todos los derechos reservados
- **Desarrollo**: [Jhan Pool Agudelo Triana](https://www.linkedin.com/in/jhan-pool-agudelo-triana-29500a225/) · [JPool Tech.](https://www.jpooltech.com/)
- **Plataforma de construcción**: [Lovable](https://lovable.dev)

---

*Última actualización: agosto 2026 — refleja el estado del repositorio en la fase de prelanzamiento.*
