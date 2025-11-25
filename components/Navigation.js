import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/archive', label: 'Archive' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="mb-12">
      <ul className="flex flex-wrap justify-center gap-6 text-lg">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition hover:text-primary ${
                router.pathname === link.href
                  ? 'font-bold text-primary'
                  : 'opacity-70'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
