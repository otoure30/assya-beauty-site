import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { brand } from "@/data/content";
import { BookingButton, OffersGrid, PricingGrid, SiteChrome } from "@/components/assya-shared";

export const metadata: Metadata = {
  title: `Tarifs | ${brand.brand}`,
  description:
    "Tarifs des soins capillaires, produits Cosmebio, accessoires, tresses et offres spéciales Assya Beauty Cosmebio en GNF.",
};

export default function TarifsPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <div className="page-hero-copy">
          <p className="tag">Tarifs</p>
          <h1>Soins, produits, accessoires et tresses.</h1>
          <p>
            Tous les prix sont affichés en GNF. La réservation d&apos;un soin est confirmée après
            versement de l&apos;acompte obligatoire.
          </p>
          <div className="hero-actions">
            <BookingButton>
              <Calendar size={16} /> Prendre rendez-vous
            </BookingButton>
            <Link className="button ghost" href="/produits">
              Voir les produits
            </Link>
          </div>
        </div>
      </section>

      <section className="pricing page-section">
        <div className="section-head compact">
          <p className="tag">Grille complète</p>
          <h2>Les prestations disponibles au centre.</h2>
          <Link href="/rendez-vous">Réserver un créneau</Link>
        </div>
        <PricingGrid />
        <OffersGrid />
      </section>
    </SiteChrome>
  );
}
