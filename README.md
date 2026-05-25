# MedCitas 🏥

Plataforma web para agendamiento de citas médicas en línea. Construida con **Next.js 14**, **TypeScript** y **Tailwind CSS**.

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Framework principal |
| TypeScript 5 | Tipado estático |
| Tailwind CSS 3 | Estilos utilitarios |
| React 18 | UI |

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:3000

# 4. Verificar tipos TypeScript
npm run type-check

# 5. Build de producción
npm run build
npm start
```

---

## Estructura del proyecto

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout raíz (Navbar + Footer)
│   ├── page.tsx            # Landing page
│   ├── login/page.tsx      # Login
│   ├── register/page.tsx   # Registro
│   ├── search/page.tsx     # Búsqueda de médicos
│   ├── doctor/[id]/        # Perfil del médico (próximo)
│   ├── appointment/        # Agendamiento (próximo)
│   └── confirmation/       # Confirmación de cita
├── components/
│   ├── ui/                 # Componentes base (Button, Input, StarRating)
│   ├── layout/             # Navbar, Footer
│   └── medical/            # DoctorCard, SpecialtyCard
├── hooks/                  # Custom hooks (próximo)
├── services/               # Capa de datos (mock → API real)
│   ├── mockDoctors.ts
│   └── mockAppointments.ts
├── types/                  # Interfaces TypeScript compartidas
│   └── index.ts
├── utils/                  # Helpers (cn, formatCOP, formatDate)
├── lib/                    # Configuraciones (specialties.ts)
└── styles/                 # CSS global + tokens de diseño
    └── globals.css
```

---

## Páginas implementadas

| Ruta | Estado |
|---|---|
| `/` | ✅ Landing page |
| `/login` | ✅ Login |
| `/register` | ✅ Registro |
| `/search` | ✅ Búsqueda de médicos |
| `/doctor/[id]` | 🔜 Perfil del médico |
| `/appointment` | 🔜 Agendamiento |
| `/confirmation` | ✅ Confirmación |

---

## Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Producción
vercel --prod
```

### Variables de entorno en Vercel
1. Ve a tu proyecto en vercel.com → **Settings → Environment Variables**
2. Agrega las variables de `.env.example`
3. Redeploy

---

## Git — convenciones de commits

```
feat: nueva funcionalidad
fix: corrección de bug
chore: mantenimiento, deps, config
refactor: refactorización sin cambio funcional
style: cambios de estilo/formato
docs: documentación
test: tests
```

### Ramas recomendadas

```
main          → producción (Vercel auto-deploy)
develop       → integración
feature/xxx   → nueva funcionalidad
fix/xxx       → corrección de bugs
```

---

## Próxima integración con backend

Los servicios en `src/services/` están diseñados para migración limpia:

```typescript
// Antes (mock)
const res = await searchDoctors({ specialty: "cardiologia" });

// Después (API real) — solo cambias la implementación, no los consumidores
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors?specialty=cardiologia`);
```

---

## Licencia

MIT
