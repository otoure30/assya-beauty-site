import type { Metadata } from "next";
import Link from "next/link";
import { booking, brand } from "@/data/content";
import { ReservationActions, ReservationDetail, SiteChrome } from "@/components/assya-shared";

export const metadata: Metadata = {
  title: `Rendez-vous | ${brand.brand}`,
  description:
    "Prise de rendez-vous Assya Beauty Cosmebio : horaires, créneaux, acompte obligatoire, conditions de réservation et WhatsApp.",
};

export default function RendezVousPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <div className="page-hero-copy">
          <p className="tag">{booking.title}</p>
          <h1>{booking.intro}</h1>
          <p>
            Sur mobile, utilisez le calendrier en page dédiée ou envoyez directement votre demande
            sur WhatsApp. L&apos;acompte de {booking.deposit} confirme le rendez-vous.
          </p>
          <div className="hero-actions">
            <ReservationActions />
          </div>
        </div>
      </section>

      <section className="reservation page-section">
        <div className="section-head compact">
          <p className="tag">Réservation</p>
          <h2>Créneaux, acompte et conditions.</h2>
          <Link href="/tarifs">Voir les tarifs</Link>
        </div>
        <ReservationDetail />
      </section>
    </SiteChrome>
  );
}
