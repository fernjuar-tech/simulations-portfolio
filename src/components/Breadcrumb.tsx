import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground transition">
        Home
      </Link>

      {items.map((item) => (
        <span key={item.label}>
          <span className="mx-2">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}