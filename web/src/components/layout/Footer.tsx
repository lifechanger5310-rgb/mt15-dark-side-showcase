export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="heading text-xl tracking-widest">
          MT<span className="text-accent">·</span>15
        </a>
        <p className="text-muted text-xs text-center sm:text-right max-w-lg">
          Unofficial fan-made showcase built for demonstration purposes. Not
          affiliated with, endorsed by, or representing Yamaha Motor Co.,
          Ltd. &quot;Yamaha&quot; and &quot;MT-15&quot; are trademarks of
          their respective owner. All imagery on this site is AI-generated,
          not official product photography. Specifications shown are
          illustrative and should be verified with an authorized dealer.
        </p>
      </div>
    </footer>
  );
}
