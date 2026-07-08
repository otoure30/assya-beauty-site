"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Flower2,
  Heart,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import {
  articles,
  botanicals,
  brand,
  collections,
  products,
  services,
  socials,
} from "@/data/content";

const navItems = [
  ["Résultats", "#resultats"],
  ["Diagnostic", "#diagnostic"],
  ["Centre", "#centre"],
  ["Ingrédients", "#herbier"],
  ["Routines", "#collections"],
  ["Boutique", "#boutique"],
  ["Journal", "#journal"],
];

const hairStories = [
  {
    label: "Brillance",
    title: "Cheveux plus souples, mieux nourris",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Définition",
    title: "Textures bouclées et crépues mieux dessinées",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    label: "Confiance",
    title: "Une routine visible dans le miroir",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1100&q=85",
  },
];

const bookingServicePath = "diagnostic-capillaire-personnalise/diagnostic-60-minutes";
const bookingBaseUrl = (process.env.NEXT_PUBLIC_BOOKING_BASE_URL || "http://127.0.0.1:5177").replace(/\/$/, "");

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }, []);
  return ref;
}

export function AssyaExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [bookingSlow, setBookingSlow] = useState(false);
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [answers, setAnswers] = useState({
    texture: "crepus",
    goal: "hydratation",
    scalp: "sensible",
  });
  const [faqOpen, setFaqOpen] = useState(0);
  const rootRef = useReveal();

  const categories = ["Tous", ...new Set(products.map((product) => product.category))];
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "Tous" || product.category === category;
      const textMatch = `${product.name} ${product.need} ${product.ingredients}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product: (typeof products)[number]) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  };

  const diagnosticProducts = products.filter((product) => {
    if (answers.goal === "pousse") return product.need === "Pousse" || product.name.includes("Croissance");
    if (answers.goal === "nutrition") return ["Nutrition", "Cheveux crépus"].includes(product.need);
    return ["Hydratation", "Réparation", "Rituel centre"].includes(product.need);
  });

  const bookingPublicUrl = `${bookingBaseUrl}/s/${bookingServicePath}`;
  const bookingEmbedUrl = `${bookingBaseUrl}/embed/${bookingServicePath}`;

  useEffect(() => {
    const overlayOpen = menuOpen || cartOpen || bookingOpen;
    document.body.classList.toggle("overlay-open", overlayOpen);
    return () => document.body.classList.remove("overlay-open");
  }, [bookingOpen, cartOpen, menuOpen]);

  useEffect(() => {
    const closeOverlay = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setBookingOpen(false);
      setCartOpen(false);
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
        <a href="#diagnostic">Diagnostic capillaire personnalisé</a>
        <span>{brand.taglineSecondary}</span>
        <a href={brand.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp +224 {brand.phone}
        </a>
      </div>

      <header className="masthead">
        <a className="wordmark" href="#accueil" aria-label="Assya Beauty accueil">
          <span className="wordmark-name">{brand.logo}</span>
          <span className="wordmark-sub">Beauty Cosmébio</span>
        </a>
        <nav className="primary-nav" aria-label="Navigation principale">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="masthead-actions">
          <button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier">
            <ShoppingBag size={17} />
            <span className="icon-label">Panier</span>
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </button>
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
          <p className="tag">Maison de soin capillaire botanique</p>
          <h1>Assya Beauty Cosmébio</h1>
          <p>
            Des cheveux sains, une texture plus belle, une confiance retrouvée. Le produit compte,
            mais le résultat sur la personne compte davantage.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#resultats">
              Voir les résultats
            </a>
            <button className="button ghost" onClick={() => setBookingOpen(true)}>
              <Calendar size={16} /> Faire mon diagnostic
            </button>
          </div>
        </div>
      </section>

      <section id="resultats" className="hair-showcase">
        <div className="section-head compact" data-reveal>
          <p className="tag">Effet recherché</p>
          <h2>On doit d&apos;abord voir de beaux cheveux, pas seulement des flacons.</h2>
          <a href="#diagnostic">Trouver ma routine</a>
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
          <h2>Comprendre la texture avant de conseiller un soin.</h2>
          <p>
            La routine doit partir du cuir chevelu, de la fibre et du résultat attendu : hydratation,
            pousse, nutrition ou réparation.
          </p>
        </div>
        <div className="consult" data-reveal>
          <div className="question-grid">
            <Question
              label="Texture"
              value={answers.texture}
              onChange={(value) => setAnswers({ ...answers, texture: value })}
              options={["crepus", "boucles", "defrises"]}
            />
            <Question
              label="Objectif"
              value={answers.goal}
              onChange={(value) => setAnswers({ ...answers, goal: value })}
              options={["hydratation", "pousse", "nutrition"]}
            />
            <Question
              label="Cuir chevelu"
              value={answers.scalp}
              onChange={(value) => setAnswers({ ...answers, scalp: value })}
              options={["sensible", "sec", "gras"]}
            />
          </div>
          <div className="prescription">
            <h3>Routine recommandée</h3>
            <p>
              Profil <em>{answers.texture}</em>, objectif <em>{answers.goal}</em>. Les soins proposés
              accompagnent le résultat visuel, ils ne le remplacent pas.
            </p>
            <div className="prescription-list">
              {diagnosticProducts.slice(0, 3).map((product, index) => (
                <button key={product.id} onClick={() => addToCart(product)} className="prescription-item">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{product.name}</strong>
                  <Plus size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="centre" className="center">
        <div className="section-head compact" data-reveal>
          <p className="tag">Centre capillaire</p>
          <h2>{brand.claim}.</h2>
          <button className="button primary" onClick={() => setBookingOpen(true)}>
            <Calendar size={16} /> Prendre rendez-vous
          </button>
        </div>
        <ul className="service-list" data-reveal>
          {services.map(([name, description, duration]) => (
            <li key={name}>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <span>{duration}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="proof">
        <div className="proof-media" data-reveal />
        <div className="proof-copy" data-reveal>
          <p className="tag">Avant / Après</p>
          <h2>La marque doit vendre la transformation.</h2>
          <p>
            Les images de cheveux, de cuir chevelu sain et de personnes confiantes créent la preuve
            émotionnelle. Les produits viennent ensuite comme moyen d&apos;y arriver.
          </p>
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
          <p className="tag">Routines</p>
          <h2>Organiser le conseil par besoin, pas par rayon.</h2>
          <a href="#boutique">Voir les soins</a>
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
          <p className="tag">Boutique</p>
          <h2>Les soins qui accompagnent la transformation.</h2>
          <a href="#diagnostic">Choisir avec diagnostic</a>
        </div>
        <div className="shop-tools" data-reveal>
          <label className="search-field">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher une formule, un actif..."
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
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
              addToCart={addToCart}
            />
          ))}
          {filteredProducts.length === 0 && (
            <p className="shop-empty">Aucun soin ne correspond. Essayez une autre texture ou catégorie.</p>
          )}
        </div>
      </section>

      <section id="journal" className="journal">
        <div className="section-head compact" data-reveal>
          <p className="tag">Le carnet</p>
          <h2>Conseils, actifs et gestes essentiels.</h2>
        </div>
        <div className="article-grid">
          {articles.map(([title, summary]) => (
            <article key={title} data-reveal>
              <span>Conseil</span>
              <h3>{title}</h3>
              <p>{summary}</p>
              <a href="#contact">
                Lire prochainement
                <Sparkles size={12} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq">
        <div className="section-head compact" data-reveal>
          <p className="tag">Questions fréquentes</p>
          <h2>Avant de choisir votre soin.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {[
            [
              "Les produits sont-ils naturels ?",
              "La ligne s’appuie sur des ingrédients d’origine végétale associés à des formulations capillaires ciblées.",
            ],
            [
              "Puis-je les utiliser sur cheveux crépus ?",
              "Oui. Le diagnostic vous aide à choisir selon votre texture, votre objectif et la sensibilité.",
            ],
            [
              "Comment démarrer ma routine ?",
              "Commencez par la routine recommandée, puis ajustez selon le ressenti avec un suivi en centre.",
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
          <a href="mailto:contact@assyabeauty.com">
            <span>Contact</span>
            <strong>contact@assyabeauty.com</strong>
          </a>
          <a href={brand.whatsapp} target="_blank" rel="noreferrer">
            <span>WhatsApp</span>
            <strong>+224 {brand.phone}</strong>
          </a>
          {socials
            .filter(([name]) => name !== "WhatsApp")
            .map(([name, handle, href]) => (
              <a
                key={name}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer"}
              >
                <span>{name}</span>
                <strong>{handle}</strong>
              </a>
            ))}
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
          Diagnostic
        </button>
      </nav>

      {cartOpen && (
        <aside className="drawer" aria-label="Panier">
          <div className="drawer-head">
            <h2>Panier</h2>
            <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier">
              <X size={18} />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="empty">Votre panier est vide.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-line" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.qty} × {item.price} €
                    </span>
                  </div>
                  <button onClick={() => setCart((current) => current.filter((line) => line.id !== item.id))}>
                    Retirer
                  </button>
                </div>
              ))}
              <div className="drawer-total">
                <span>Total</span>
                <strong>{total} €</strong>
              </div>
              <button className="button primary full">Paiement sécurisé</button>
            </>
          )}
        </aside>
      )}

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
                <p className="booking-intro">Diagnostic capillaire personnalisé en 60 minutes.</p>
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
                      ? "Le calendrier prend du temps à charger. Ouvrez la page complète si votre réseau est faible."
                      : "Chargement sécurisé de la prise de rendez-vous."}
                  </p>
                  {bookingSlow && (
                    <a href={bookingPublicUrl} target="_blank" rel="noreferrer">
                      Ouvrir la page complète
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

function ProductCard({
  product,
  wishlist,
  setWishlist,
  addToCart,
}: {
  product: (typeof products)[number];
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
  addToCart: (product: (typeof products)[number]) => void;
}) {
  return (
    <article className="product" data-reveal>
      <div className="product-figure" style={{ backgroundImage: `url(${product.image})` }}>
        <button
          className={wishlist.includes(product.id) ? "heart saved" : "heart"}
          onClick={() =>
            setWishlist((current) =>
              current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id],
            )
          }
          aria-label="Ajouter aux favoris"
        >
          <Heart size={16} />
        </button>
      </div>
      <div className="product-info">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{product.ingredients}</span>
        <small>{product.need}</small>
        <div className="product-buy">
          <strong>{product.price} €</strong>
          <button onClick={() => addToCart(product)}>
            <Plus size={15} /> Ajouter
          </button>
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
