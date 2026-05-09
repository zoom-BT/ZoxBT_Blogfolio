export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Projets' : 'Projects';
  const message = locale === 'fr'
    ? 'Cette section est en cours de construction. Revenez bientôt !'
    : 'This section is under construction. Check back soon!';

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center px-6">
        <p className="text-6xl mb-6">🚧</p>
        <h1 className="text-3xl font-black text-[var(--text-primary)] mb-3">{title} — Coming Soon</h1>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">{message}</p>
      </div>
    </div>
  );
}
