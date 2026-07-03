# GTA VI Permission Slip

## Stack & versiones
- Next.js 14.2 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- next-intl 3 (i18n: `es` / `en`)
- PDF generado con `window.print()` (sin jsPDF)

## Comandos
```bash
npm run dev     # servidor de desarrollo → http://localhost:3000
npm run build   # build de producción
npm run lint    # ESLint
```

## Estructura de carpetas
```
app/[locale]/      → layout y page por locale
app/print.css      → estilos @media print (visibilidad y layout A4)
components/        → componentes React cliente
  PermitPageClient.tsx   → estado compartido + layout dos columnas
  PermissionForm.tsx     → formulario (stepper, toggle idioma, botón descarga)
  ContractPreview.tsx    → preview en tiempo real del contrato
lib/               → funciones puras sin JSX
  types.ts               → ContractFields, ContractContent, etc.
  contractText.ts        → texto contrato ES + EN
messages/          → traducciones JSON (es.json, en.json)
```

## Convenciones
- Locale por defecto: `es`. Rutas: `/es` y `/en`.
- `ContractFields` y tipos compartidos viven en `lib/types.ts`.
- Placeholders en preview: campos vacíos → marcadores Unicode privados (/) → spans `contract-placeholder`.
- Print: `visibility: hidden` en body, `visibility: visible` en `#contract-preview-print`.
