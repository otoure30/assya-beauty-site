"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Flower2 } from "lucide-react";
import {
  botanicals,
  brand,
  commitments,
  services,
} from "@/data/content";
import {
  BookingButton,
  OffersGrid,
  ProductCatalog,
  ReservationPanels,
  SiteChrome,
} from "@/components/assya-shared";

const hairStories = [
  {
    label: "Naturel",
    title: "La nature au service de vos cheveux",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Sain",
    title: "Des soins ciblés pour un cuir chevelu apaisé",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Efficace",
    title: "Des cheveux sains, une confiance retrouvée",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1100&q=85",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }, []);
  return ref;
}

export function AssyaExperience() {
  const rootRef = useReveal();

  return (
    <SiteChrome>
      <div ref={rootRef}>
        <section id="accueil" className="hero">
          <div className="hero-copy" data-reveal>
            <p className="tag">
              {brand.centerName} - {brand.centerMission}
            </p>
            <h1>{brand.brand}</h1>
            <p>{brand.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#centre">
                Voir les services
              </a>
              <BookingButton className="button ghost">
                <Calendar size={16} /> Prendre rendez-vous
              </BookingButton>
            </div>
          </div>
        </section>

        <section id="resultats" className="hair-showcase">
          <div className="section-head compact" data-reveal>
            <p className="tag">{brand.tagline}</p>
            <h2>{brand.taglineSecondary}</h2>
            <Link href="/rendez-vous">Préparer ma visite</Link>
          </div>
          <div className="hair-grid">
            {hairStories.map((story) => (
              <article
                className="hair-card"
                key={story.label}
                style={{ backgroundImage: `url(${story.image})` }}
                data-reveal
              >
                <div>
                  <span>{story.label}</span>
                  <h3>{story.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="centre" className="center">
          <div className="section-head compact" data-reveal>
            <p className="tag">Nos services</p>
            <h2>{brand.claim}.</h2>
            <BookingButton>
              <Calendar size={16} /> Prendre rendez-vous
            </BookingButton>
          </div>
          <ul className="service-list" data-reveal>
            {services.map((service) => (
              <li key={service.name}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <span>{service.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-offers">
          <div className="section-head compact" data-reveal>
            <p className="tag">Offres spéciales</p>
            <h2>Deux packs simples pour démarrer.</h2>
            <Link href="/tarifs">Voir tous les tarifs</Link>
          </div>
          <OffersGrid />
        </section>

        <section id="reservation" className="reservation home-reservation">
          <div className="section-head compact" data-reveal>
            <p className="tag">Rendez-vous</p>
            <h2>Horaires, acompte et réservation en un clic.</h2>
            <Link href="/rendez-vous">Voir la page rendez-vous</Link>
          </div>
          <ReservationPanels compact />
          <div className="home-actions" data-reveal>
            <BookingButton>
              <Calendar size={16} /> Réserver
            </BookingButton>
            <Link className="button ghost" href="/rendez-vous">
              Conditions et créneaux
            </Link>
          </div>
        </section>

        <section id="boutique" className="shop home-products">
          <div className="section-head compact" data-reveal>
            <p className="tag">Produits phares</p>
            <h2>Les soins mis en avant par Assya Beauty Cosmebio.</h2>
            <Link href="/produits">Voir le catalogue</Link>
          </div>
          <ProductCatalog featuredOnly />
        </section>

        <section id="engagements" className="commitments">
          <div className="section-head compact" data-reveal>
            <p className="tag">Engagements</p>
            <h2>{brand.mission}</h2>
          </div>
          <div className="commitment-grid">
            {commitments.map((commitment) => (
              <div className="commitment-item" key={commitment} data-reveal>
                <CheckCircle2 size={17} />
                <span>{commitment}</span>
              </div>
            ))}
          </div>
          <div className="home-ingredients" data-reveal>
            {botanicals.slice(0, 4).map((plant) => (
              <article className="ingredient-card" key={plant.latin}>
                <Flower2 size={18} />
                <p>{plant.benefit}</p>
                <h3>{plant.name}</h3>
                <span>{plant.description}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
