import Link from 'next/link';

const categories = [
  { name: 'Épicerie', slug: 'grocery' },
  { name: 'Services ménagers', slug: 'home-services' },
  { name: 'Gadgets IT', slug: 'it-gadgets' }
];

export default function HomePage() {
  return (
    <section>
      <h2>Bienvenue sur Echo</h2>
      <p>
        Echo agrège les demandes des acheteurs et active des agents spécialisés pour négocier les offres,
        optimiser les coûts et orchestrer la logistique.
      </p>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
