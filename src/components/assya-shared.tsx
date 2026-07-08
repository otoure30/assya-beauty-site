"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import {
  booking,
  brand,
  offers,
  pricingGroups,
  products,
  socials,
  type Product,
} from "@/data/content";

const navItems = [
  ["Accueil", "/"],
  ["Services", "/#centre"],
  ["Tarifs", "/tarifs"],
  ["Rendez-vous", "/rendez-vous"],
  ["Produits", "/produits"],
  ["Contact", "#contact"],
];

const bookingServicePath = "diagnostic-capillaire-personnalise/diagnostic-60-minutes";
const bookingBaseUrl = (process.env.NEXT_PUBLIC_BOOKING_BASE_URL || "http://127.0.0.1:5177").replace(/\/$/, "");
const bookingPublicUrl = `${bookingBaseUrl}/s/${bookingServicePath}`;
const bookingEmbedUrl = `${bookingBaseUrl}/embed/${bookingServicePath}`;

export function whatsappUrl(message: string) {
  return `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const bookingWhatsAppUrl = whatsappUrl(
  `Bonjour ${brand.brand}, je souhaite prendre rendez-vous.\nNom et prénom :\nNuméro WhatsApp :\nDate souhaitée :\nPrestation souhaitée :`,
);

function useOverlayLock(isOpen: boolean) {
  useEffect(() => {
    document.body.classList.toggle("overlay-open", isOpen);
    return () => document.body.classList.remove("overlay-open");
  }, [isOpen]);
}

function isSmallScreen() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 680px)").matches;
}

function useSmallScreen() {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 680px)");
    const update = () => setSmallScreen(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return smallScreen;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useOverlayLock(menuOpen);

  useEffect(() => {
    const closeOverlay = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOverlay);
    return () => window.removeEventListener("keydown", closeOverlay);
  }, []);

  return (
    <main className="site-shell">
      <div className="announce-bar">
        <Link href="/rendez-vous">{booking.opening}</Link>
        <span>{brand.badgeLine}</span>
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp +224 {brand.phone}
        </a>
      </div>

      <header className="masthead">
        <Link className="wordmark" href="/" aria-label="Assya Beauty accueil">
          <span className="wordmark-name">{brand.logo}</span>
          <span className="wordmark-sub">Beauty Cosmebio</span>
        </Link>
        <nav className="primary-nav" aria-label="Navigation principale">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="masthead-actions">
          <a className="icon-button" href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="Contacter sur WhatsApp">
            <MessageCircle size={17} />
            <span className="icon-label">WhatsApp</span>
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
            <Menu size={18} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-panel">
          <button className="icon-button close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">
            <X size={18} />
          </button>
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}

      {children}

      <Footer />

      <a className="whatsapp" href={brand.whatsapp} target="_blank" aria-label="Contacter sur WhatsApp">
        <MessageCircle size={22} />
      </a>

      <nav className="mobile-quick-actions" aria-label="Actions rapides">
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <Link href="/rendez-vous">
          <Calendar size={16} />
          Rendez-vous
        </Link>
      </nav>
    </main>
  );
}

function Footer() {
  return (
    <footer id="contact" className="colophon">
      <div>
        <p className="wordmark-name">{brand.brand}</p>
        <p>{brand.mission}</p>
      </div>
      <div className="colophon-links">
        <a href={`tel:+224${brand.phone.replace(/\s/g, "")}`}>
          <span>Téléphone</span>
          <strong>+224 {brand.phone}</strong>
        </a>
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          <span>WhatsApp</span>
          <strong>+224 {brand.phone}</strong>
        </a>
        <a href={`mailto:${brand.email}`}>
          <span>E-mail</span>
          <strong>{brand.email}</strong>
        </a>
        <span className="contact-line">
          <span>Adresse</span>
          <strong>{brand.address}</strong>
        </span>
        {socials
          .filter((social) => social.name !== "WhatsApp")
          .map((social) =>
            social.href ? (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer">
                <span>{social.name}</span>
                <strong>{social.handle}</strong>
              </a>
            ) : (
              <span className="contact-line" key={social.name}>
                <span>{social.name}</span>
                <strong>{social.handle}</strong>
              </span>
            ),
          )}
      </div>
    </footer>
  );
}

export function BookingButton({
  className = "button primary",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const smallScreen = useSmallScreen();

  if (smallScreen) {
    return (
      <Link className={className} href="/rendez-vous">
        {children}
      </Link>
    );
  }

  return (
    <>
      <button className={className} onClick={() => setBookingOpen(true)}>
        {children}
      </button>
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [bookingSlow, setBookingSlow] = useState(false);
  useOverlayLock(true);

  useEffect(() => {
    const closeOverlay = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOverlay);
    return () => window.removeEventListener("keydown", closeOverlay);
  }, [onClose]);

  useEffect(() => {
    setBookingLoaded(false);
    setBookingSlow(false);

    const timer = window.setTimeout(() => setBookingSlow(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="icon-button close" onClick={onClose} aria-label="Fermer la réservation">
          <X size={18} />
        </button>
        <div className="booking-modal-head">
          <div>
            <p className="tag">Réservation</p>
            <h2 id="booking-modal-title">Prendre rendez-vous</h2>
            <p className="booking-intro">
              Diagnostic capillaire personnalisé. Acompte de {booking.deposit} demandé pour confirmer.
            </p>
          </div>
          <a className="booking-external-link" href={bookingPublicUrl} target="_blank" rel="noreferrer">
            Ouvrir en grand
          </a>
        </div>
        <CalendarFrame
          bookingLoaded={bookingLoaded}
          bookingSlow={bookingSlow}
          onLoad={() => {
            setBookingLoaded(true);
            setBookingSlow(false);
          }}
        />
      </div>
    </div>
  );
}

function CalendarFrame({
  bookingLoaded,
  bookingSlow,
  onLoad,
}: {
  bookingLoaded: boolean;
  bookingSlow: boolean;
  onLoad: () => void;
}) {
  return (
    <div className="booking-iframe-wrap">
      {!bookingLoaded && (
        <div className="booking-load-state" aria-live="polite">
          <span className="booking-spinner" aria-hidden="true" />
          <strong>{bookingSlow ? "Connexion lente" : "Connexion au calendrier"}</strong>
          <p>
            {bookingSlow
              ? "Le calendrier prend du temps à charger. Vous pouvez aussi envoyer votre demande sur WhatsApp."
              : "Chargement sécurisé de la prise de rendez-vous."}
          </p>
          {bookingSlow && (
            <a href={bookingWhatsAppUrl} target="_blank" rel="noreferrer">
              Envoyer sur WhatsApp
            </a>
          )}
        </div>
      )}
      <iframe
        title="Diagnostic capillaire - prise de rendez-vous"
        src={bookingEmbedUrl}
        loading="lazy"
        onLoad={onLoad}
      />
    </div>
  );
}

export function PricingGrid() {
  return (
    <div className="pricing-grid">
      {pricingGroups.map((group) => (
        <article className="price-card" key={group.title} data-reveal>
          <h3>{group.title}</h3>
          <div className="price-table-wrap">
            <table className="price-table">
              <tbody>
                {group.items.map((item) => (
                  <tr key={`${item.name}-${item.detail}-${item.price}`}>
                    <th scope="row">
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                    </th>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
    </div>
  );
}

export function OffersGrid({ limit }: { limit?: number }) {
  const visibleOffers = typeof limit === "number" ? offers.slice(0, limit) : offers;

  return (
    <div className="offers-grid">
      {visibleOffers.map((offer) => (
        <article className="offer-card" key={offer.name} data-reveal>
          <span>Offre spéciale</span>
          <h3>{offer.name}</h3>
          <strong>{offer.price}</strong>
          <ul>
            {offer.includes.map((item) => (
              <li key={item}>
                <CheckCircle2 size={15} />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const productMessage = whatsappUrl(
    `Bonjour ${brand.brand}, je souhaite connaître la disponibilité de ce produit : ${product.name}.`,
  );

  return (
    <article className={product.featured ? "product featured-product" : "product"} data-reveal>
      <div className="product-info">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{product.description}</span>
        <small>{product.ingredients}</small>
        <div className="product-buy">
          <strong>{product.price}</strong>
          <a href={productMessage} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProductCatalog({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const sourceProducts = featuredOnly ? products.filter((product) => product.featured) : products;
  const categories = ["Tous", ...new Set(sourceProducts.map((product) => product.category))];
  const filteredProducts = useMemo(() => {
    return sourceProducts.filter((product) => {
      const categoryMatch = category === "Tous" || product.category === category;
      const textMatch = `${product.name} ${product.need} ${product.ingredients} ${product.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatch && textMatch;
    });
  }, [category, query, sourceProducts]);

  return (
    <>
      {!featuredOnly && (
        <div className="shop-tools" data-reveal>
          <label className="search-field">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher une gamme, un soin, un actif..."
              aria-label="Rechercher un produit"
            />
          </label>
          <div className="filter-row">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "chip active" : "chip"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={featuredOnly ? "product-grid preview-grid" : "product-grid"}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="shop-empty">Aucun produit ne correspond. Essayez un autre mot-clé ou filtre.</p>
        )}
      </div>
    </>
  );
}

export function ReservationPanels({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="reservation-grid">
        <article className="reservation-panel" data-reveal>
          <Clock size={18} />
          <h3>Horaires et créneaux</h3>
          <p>{booking.opening}</p>
          {!compact && (
            <div className="slot-grid">
              {booking.slots.map((slot) => (
                <span key={slot}>{slot}</span>
              ))}
            </div>
          )}
        </article>
        <article className="reservation-panel" data-reveal>
          <Calendar size={18} />
          <h3>Informations demandées</h3>
          <ul>
            {(compact ? booking.requiredFields.slice(0, 2) : booking.requiredFields).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {!compact && <p className="small-note">Observations : {booking.observations}</p>}
        </article>
        <article className="reservation-panel accent" data-reveal>
          <CreditCard size={18} />
          <h3>Acompte obligatoire</h3>
          <strong>{booking.deposit}</strong>
          <p>{compact ? "Demandé pour confirmer le rendez-vous." : booking.depositText}</p>
        </article>
      </div>
    </>
  );
}

export function ReservationActions() {
  return (
    <div className="condition-actions">
      <a className="button primary" href={bookingPublicUrl} target="_blank" rel="noreferrer">
        <Calendar size={16} /> Ouvrir le calendrier
      </a>
      <a className="button ghost" href={bookingWhatsAppUrl} target="_blank" rel="noreferrer">
        <MessageCircle size={16} /> Envoyer sur WhatsApp
      </a>
    </div>
  );
}

export function ReservationDetail() {
  const [mounted, setMounted] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [bookingSlow, setBookingSlow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isSmallScreen()) return;

    setBookingLoaded(false);
    setBookingSlow(false);

    const timer = window.setTimeout(() => setBookingSlow(true), 6500);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  const showEmbed = mounted && !isSmallScreen();

  return (
    <>
      <ReservationPanels />
      <div className="condition-panel" data-reveal>
        <h3>Conditions de réservation</h3>
        <ul>
          {booking.conditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <ReservationActions />
      </div>
      {mounted &&
        (showEmbed ? (
          <div className="calendar-panel" data-reveal>
            <div className="section-head compact">
              <p className="tag">Calendrier</p>
              <h2>Choisir un créneau en ligne.</h2>
              <a href={bookingPublicUrl} target="_blank" rel="noreferrer">
                Ouvrir en grand
              </a>
            </div>
            <div className="calendar-embed">
              <CalendarFrame
                bookingLoaded={bookingLoaded}
                bookingSlow={bookingSlow}
                onLoad={() => {
                  setBookingLoaded(true);
                  setBookingSlow(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mobile-calendar-panel" data-reveal>
            <p className="tag">Mobile</p>
            <h3>Le calendrier s&apos;ouvre dans une page dédiée pour éviter le chargement bloquant.</h3>
            <ReservationActions />
          </div>
        ))}
    </>
  );
}
