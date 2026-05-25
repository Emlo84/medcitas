import Link from "next/link";

const FOOTER_LINKS = {
  plataforma: [
    { href: "/search", label: "Buscar médicos" },
    { href: "/login", label: "Iniciar sesión" },
    { href: "/register", label: "Registrarse" },
  ],
  especialidades: [
    { href: "/search?specialty=medicina-general", label: "Medicina general" },
    { href: "/search?specialty=odontologia", label: "Odontología" },
    { href: "/search?specialty=psicologia", label: "Psicología" },
    { href: "/search?specialty=dermatologia", label: "Dermatología" },
  ],
  empresa: [
    { href: "/about", label: "Sobre nosotros" },
    { href: "/contact", label: "Contacto" },
    { href: "/privacy", label: "Privacidad" },
    { href: "/terms", label: "Términos de uso" },
  ],
};

export function Footer() {
  return (
    <footer
      className="bg-neutral-900 text-neutral-400 mt-auto"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v7m0 0v7m0-7H3m7 0h7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="font-bold text-white text-lg">MedCitas</span>
            </div>
            <p className="text-sm leading-relaxed">
              Agenda tu cita médica de forma rápida, segura y sin filas.
            </p>
          </div>

          {/* Links */}
          <FooterColumn title="Plataforma" links={FOOTER_LINKS.plataforma} />
          <FooterColumn title="Especialidades" links={FOOTER_LINKS.especialidades} />
          <FooterColumn title="Empresa" links={FOOTER_LINKS.empresa} />
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} MedCitas. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para mejorar la salud en Colombia</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-labelledby={`footer-${title}`}>
      <h3
        id={`footer-${title}`}
        className="font-semibold text-white text-sm mb-3"
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
