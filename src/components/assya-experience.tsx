"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Flower2,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  articles,
  booking,
  botanicals,
  brand,
  collections,
  commitments,
  offers,
  pricingGroups,
  products,
  services,
  socials,
  type Product,
} from "@/data/content";

const navItems = [
  ["Services", "#centre"],
  ["Tarifs", "#tarifs"],
  ["Rendez-vous", "#reservation"],
  ["Produits", "#boutique"],
  ["Engagements", "#engagements"],
  ["Contact", "#contact"],
];

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

const recommendationMap = {
  hydratation: [
    "Diagnostic capillaire personnalisé",
    "Soin capillaire bio karité & gombo",
    "Soin hydratation intense",
  ],
  pellicules: [
    "Diagnostic approfondi",
    "Traitement pellicules",
    "Bain d'huile + massage du cuir chevelu",
  ],
  chute: ["Diagnostic approfondi", "Traitement alopécie", "Sérum Miracle Croissance+"],
};

const bookingServicePath = "diagnostic-capillaire-personnalise/diagnostic-60-minutes";
const bookingBaseUrl = (process.env.NEXT_PUBLIC_BOOKING_BASE_URL || "http://127.0.0.1:5177").replace(/\/$/, "");

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }, []);
  return ref;
}

function whatsappUrl(message: string) {
  return `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function AssyaExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [bookingSlow, setBookingSlow] = useState(false);
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState({
    texture: "naturels",
    goal: "hydratation",
    scalp: "sensible",
  });
  const [faqOpen, setFaqOpen] = useState(0);
  const rootRef = useReveal();

  const categories = ["Tous", ...new Set(products.map((product) => product.category))];
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "Tous" || product.category === category;
      const textMatch = `${product.name} ${product.need} ${product.ingredients} ${product.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  const recommendedCare = recommendationMap[answers.goal as keyof typeof recommendationMap];
  const bookingPublicUrl = `${bookingBaseUrl}/s/${bookingServicePath}`;
  const bookingEmbedUrl = `${bookingBaseUrl}/embed/${bookingServicePath}`;
  const bookingWhatsAppUrl = whatsappUrl(
    `Bonjour ${brand.brand}, je souhaite prendre rendez-vous.\nNom et prénom :\nNuméro WhatsApp :\nDate souhaitée :\nPrestation souhaitée :`,
  );

  useEffect(() => {
    const overlayOpen = menuOpen || bookingOpen;
    document.body.classList.toggle("overlay-open", overlayOpen);
    return () => document.body.classList.remove("overlay-open");
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    const closeOverlay = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setBookingOpen(false);
      setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOverlay);
    return () => window.removeEventListener("keydown", closeOverlay);
  }, []);

  useEffect(() => {
    if (!bookingOpen) return;

    setBookingLoaded(false);
    setBookingSlow(false);

    const timer = window.setTimeout(() => setBookingSlow(true), 6500);
    return () => window.clearTimeout(timer);
  }, [bookingOpen, bookingEmbedUrl]);

  return (
    <main ref={rootRef} className="site-shell">
      <div className="announce-bar">
        <a href="#reservation">{booking.opening}</a>
        <span>{brand.badgeLine}</span>
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp +224 {brand.phone}
        </a>
      </div>

      <header className="masthead">
        <a className="wordmark" href="#accueil" aria-label="Assya Beauty accueil">
          <span className="wordmark-name">{brand.logo}</span>
          <span className="wordmark-sub">Beauty Cosmebio</span>
        </a>
        <nav className="primary-nav" aria-label="Navigation principale">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
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
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}

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
            <button className="button ghost" onClick={() => setBookingOpen(true)}>
              <Calendar size={16} /> Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>

      <section id="resultats" className="hair-showcase">
        <div className="section-head compact" data-reveal>
          <p className="tag">{brand.tagline}</p>
          <h2>{brand.taglineSecondary}</h2>
          <a href="#reservation">Préparer ma visite</a>
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

      <section id="diagnostic" className="diagnostic">
        <div className="diagnostic-copy" data-reveal>
          <p className="tag">Diagnostic</p>
          <h2>Un conseil adapté avant chaque soin.</h2>
          <p>
            Le diagnostic capillaire permet d&apos;analyser le cuir chevelu, l&apos;état des cheveux et la
            prestation la plus adaptée avant de commencer une routine.
          </p>
        </div>
        <div className="consult" data-reveal>
          <div className="question-grid">
            <Question
              label="Cheveux"
              value={answers.texture}
              onChange={(value) => setAnswers({ ...answers, texture: value })}
              options={["naturels", "bouclés", "crépus", "défrisés"]}
            />
            <Question
              label="Besoin"
              value={answers.goal}
              onChange={(value) => setAnswers({ ...answers, goal: value })}
              options={["hydratation", "pellicules", "chute"]}
            />
            <Question
              label="Cuir chevelu"
              value={answers.scalp}
              onChange={(value) => setAnswers({ ...answers, scalp: value })}
              options={["sensible", "sec", "démangeaisons"]}
            />
          </div>
          <div className="prescription">
            <h3>À prévoir lors du rendez-vous</h3>
            <p>
              Profil cheveux <em>{answers.texture}</em>, besoin <em>{answers.goal}</em>, cuir chevelu{" "}
              <em>{answers.scalp}</em>. Le diagnostic final se fait au centre.
            </p>
            <div className="prescription-list">
              {recommendedCare.map((item, index) => (
                <a key={item} href="#reservation" className="prescription-item">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                  <Calendar size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="centre" className="center">
        <div className="section-head compact" data-reveal>
          <p className="tag">Nos services</p>
          <h2>{brand.claim}.</h2>
          <button className="button primary" onClick={() => setBookingOpen(true)}>
            <Calendar size={16} /> Prendre rendez-vous
          </button>
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

      <section className="proof">
        <div className="proof-media" data-reveal />
        <div className="proof-copy" data-reveal>
          <p className="tag">{brand.badgeLine}</p>
          <h2>{brand.careLine}</h2>
          <p>
            Le centre associe diagnostic, soins naturels, traitements ciblés et produits capillaires
            bio pour accompagner les cheveux vers une routine plus saine.
          </p>
        </div>
      </section>

      <section id="tarifs" className="pricing">
        <div className="section-head compact" data-reveal>
          <p className="tag">Tarifs</p>
          <h2>Soins, produits, accessoires et tresses en GNF.</h2>
          <a href="#reservation">Réserver un créneau</a>
        </div>
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
        <div className="offers-grid">
          {offers.map((offer) => (
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
      </section>

      <section id="herbier" className="herbier">
        <div className="section-head compact" data-reveal>
          <p className="tag">Ingrédients</p>
          <h2>Des actifs naturels au service de la fibre.</h2>
        </div>
        <div className="ingredient-grid">
          {botanicals.map((plant) => (
            <article className="ingredient-card" key={plant.latin} data-reveal>
              <Flower2 size={18} />
              <p>{plant.benefit}</p>
              <h3>{plant.name}</h3>
              <span>{plant.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="collections" className="collections">
        <div className="section-head compact" data-reveal>
          <p className="tag">Besoins</p>
          <h2>Choisir une routine selon l&apos;état des cheveux.</h2>
          <a href="#boutique">Voir les produits</a>
        </div>
        <div className="collection-grid">
          {collections.map(([name, note], index) => (
            <a href="#boutique" className="collection-tile" key={name} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{name}</strong>
              <small>{note}</small>
            </a>
          ))}
        </div>
      </section>

      <section id="boutique" className="shop">
        <div className="section-head compact" data-reveal>
          <p className="tag">Catalogue</p>
          <h2>Produits capillaires naturels et bio.</h2>
          <a href={brand.whatsapp} target="_blank" rel="noreferrer">
            Commander sur WhatsApp
          </a>
        </div>
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
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="shop-empty">Aucun produit ne correspond. Essayez un autre mot-clé ou filtre.</p>
          )}
        </div>
      </section>

      <section id="reservation" className="reservation">
        <div className="section-head compact" data-reveal>
          <p className="tag">{booking.title}</p>
          <h2>{booking.intro}</h2>
          <button className="button primary" onClick={() => setBookingOpen(true)}>
            <Calendar size={16} /> Ouvrir le calendrier
          </button>
        </div>
        <div className="reservation-grid">
          <article className="reservation-panel" data-reveal>
            <Clock size={18} />
            <h3>Horaires et créneaux</h3>
            <p>{booking.opening}</p>
            <div className="slot-grid">
              {booking.slots.map((slot) => (
                <span key={slot}>{slot}</span>
              ))}
            </div>
          </article>
          <article className="reservation-panel" data-reveal>
            <Calendar size={18} />
            <h3>Informations demandées</h3>
            <ul>
              {booking.requiredFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="small-note">Observations : {booking.observations}</p>
          </article>
          <article className="reservation-panel accent" data-reveal>
            <CreditCard size={18} />
            <h3>Acompte obligatoire</h3>
            <strong>{booking.deposit}</strong>
            <p>{booking.depositText}</p>
            <ul>
              {booking.depositFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="condition-panel" data-reveal>
          <h3>Conditions de réservation</h3>
          <ul>
            {booking.conditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
          <div className="condition-actions">
            <button className="button primary" onClick={() => setBookingOpen(true)}>
              <Calendar size={16} /> Réserver en ligne
            </button>
            <a className="button ghost" href={bookingWhatsAppUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Envoyer sur WhatsApp
            </a>
          </div>
        </div>
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
      </section>

      <section id="journal" className="journal">
        <div className="section-head compact" data-reveal>
          <p className="tag">Conseils</p>
          <h2>Repères utiles avant votre soin.</h2>
        </div>
        <div className="article-grid">
          {articles.map(([title, summary]) => (
            <article key={title} data-reveal>
              <span>Note</span>
              <h3>{title}</h3>
              <p>{summary}</p>
              <a href="#reservation">
                Préparer ma visite
                <Sparkles size={12} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq">
        <div className="section-head compact" data-reveal>
          <p className="tag">Questions fréquentes</p>
          <h2>Avant de confirmer votre rendez-vous.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {[
            [
              "L'acompte est-il obligatoire ?",
              `Oui. Un acompte fixe de ${booking.deposit} est demandé pour confirmer le rendez-vous.`,
            ],
            ["Quels sont les jours d'ouverture ?", booking.opening],
            [
              "Comment choisir la bonne prestation ?",
              "Commencez par le diagnostic capillaire personnalisé si vous hésitez entre traitement, soin ou routine produit.",
            ],
          ].map(([question, answer], index) => (
            <button
              key={question}
              className={faqOpen === index ? "faq-item open" : "faq-item"}
              onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
            >
              <span className="faq-q">
                {question}
                {faqOpen === index ? <Minus size={16} /> : <Plus size={16} />}
              </span>
              {faqOpen === index && <span className="faq-a">{answer}</span>}
            </button>
          ))}
        </div>
      </section>

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

      <a className="whatsapp" href={brand.whatsapp} target="_blank" aria-label="Contacter sur WhatsApp">
        <MessageCircle size={22} />
      </a>

      <nav className="mobile-quick-actions" aria-label="Actions rapides">
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <button onClick={() => setBookingOpen(true)}>
          <Calendar size={16} />
          Rendez-vous
        </button>
      </nav>

      {bookingOpen && (
        <div className="modal-backdrop" onClick={() => setBookingOpen(false)}>
          <div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="icon-button close" onClick={() => setBookingOpen(false)} aria-label="Fermer la réservation">
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
                onLoad={() => {
                  setBookingLoaded(true);
                  setBookingSlow(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
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

function Question({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="question-options">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? "selected" : ""}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
