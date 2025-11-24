export function PageHero({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="mb-8 space-y-3">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
      {description ? <p className="text-slate-500">{description}</p> : null}
    </section>
  );
}
