import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { brand } from "@/data/content";
import { ProductCatalog, SiteChrome } from "@/components/assya-shared";

export const metadata: Metadata = {
  title: `Produits | ${brand.brand}`,
  description:
    "Catalogue des produits capillaires naturels et bio Assya Beauty Cosmebio : gammes, soins, produits phares et demandes par WhatsApp.",
};

export default function ProduitsPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <div className="page-hero-copy">
          <p className="tag">Catalogue</p>
          <h1>Produits capillaires naturels et bio.</h1>
          <p>
            Retrouvez les gammes, soins et produits phares. Les commandes et disponibilités se
            confirment directement sur WhatsApp.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={brand.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Commander sur WhatsApp
            </a>
            <Link className="button ghost" href="/tarifs">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      <section className="shop page-section">
        <div className="section-head compact">
          <p className="tag">Produits Cosmebio</p>
          <h2>Choisir une gamme ou demander disponibilité.</h2>
          <Link href="/rendez-vous">Besoin d&apos;un diagnostic</Link>
        </div>
        <ProductCatalog />
      </section>
    </SiteChrome>
  );
}
