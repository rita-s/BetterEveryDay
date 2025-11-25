import Link from 'next/link';
import Navigation from './Navigation';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <Link href="/">
        <h1 className="mb-8 text-2xl font-bold text-center dark:text-white">
          {name}
        </h1>
      </Link>
      <Navigation />
    </header>
  );
}
