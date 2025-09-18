const sections = [
  { name: 'Catalogue', description: 'Gérez les produits et services disponibles.' },
  { name: 'Politiques OPA', description: 'Contrôlez les règles de conformité et de pricing.' },
  { name: 'Support', description: 'Suivez les tickets et les remboursements automatiques.' }
];

export default function AdminHome() {
  return (
    <section>
      <h2>Panneau de contrôle</h2>
      <p>Surveillez la santé du marché Echo et orchestrez les opérations critiques.</p>
      <ul>
        {sections.map((section) => (
          <li key={section.name}>
            <strong>{section.name}</strong>
            <p>{section.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
