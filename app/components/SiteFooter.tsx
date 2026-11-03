import Link from "next/link";
import { contactContent, siteNavigation } from "@/data/portfolio";

export default function SiteFooter() {
  return (
    <footer className="site-footer journal-wrap">
      <div className="footer-top">
        <p>Sayuru Akash Amarasinghe / Colombo, Sri Lanka</p>
        <a className="fine-link" href={`mailto:${contactContent.email}`}>
          {contactContent.email}
        </a>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2015-2026</p>
        <nav aria-label="Footer navigation">
          {siteNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
