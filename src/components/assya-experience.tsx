"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  Check,
  ChevronRight,
  Heart,
  Leaf,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { articles, botanicals, products, services } from "@/data/content";

const navItems = [
  ["Histoire", "#histoire"],
  ["Botanique", "#botanique"],
  ["Collections", "#collections"],
  ["Boutique", "#boutique"],
  ["Diagnostic", "#diagnostic"],
  ["Centre", "#centre"],
  ["Journal", "#journal"],
];

const collectionNames = [
  "Pousse",
  "Hydratation",
  "Nutrition",
  "Anti-chute",
  "Reparation",
  "Cheveux crepus",
  "Cheveux boucles",
  "Cheveux defrises",
  "Enfants",
  "Homme",
  "Peau",
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export function AssyaExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [answers, setAnswers] = useState({ texture: "crepus", goal: "hydration", scalp: "sensible" });
  const [faqOpen, setFaqOpen] = useState(0);

  const categories = ["Tous", ...Array.from(new Set(products.map((product) => product.category)))];
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
    if (answers.goal === "pousse") return ["Pousse", "Anti-chute"].includes(product.need);
    if (answers.goal === "nutrition") return ["Nutrition", "Cheveux crepus"].includes(product.need);
    return ["Hydratation", "Reparation"].includes(product.need);
  });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Assya Beauty accueil">
          <span>Assya</span>
          <small>Beauty Cosmebio</small>
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier">
            <ShoppingBag size={18} />
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
            <Menu size={20} />
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
        <div className="hero-media" />
        <div className="hero-content">
          <p className="eyebrow">Maison de Cosmétique Botanique Africaine</p>
          <h1>Assya Beauty Cosmebio</h1>
          <p>
            Des soins naturels premium qui transforment les tresors botaniques de Guinee en rituels
            efficaces pour la peau, le cuir chevelu et les cheveux.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#boutique">
              Decouvrir nos soins <ChevronRight size={17} />
            </a>
            <a className="button secondary" href="#diagnostic">
              Faire mon diagnostic
            </a>
          </div>
        </div>
        <div className="hero-card">
          <Leaf size={18} />
          <span>Karite, gombo, hibiscus, baobab, kinkeliba et Gobi.</span>
        </div>
      </section>

      <section id="histoire" className="split-section">
        <div>
          <p className="eyebrow">Notre histoire</p>
          <h2>Une marque guineenne qui eleve le soin naturel au niveau maison premium.</h2>
        </div>
        <div className="story-copy">
          <p>
            Assya Beauty Cosmebio valorise les plantes locales, les gestes transmis et la formulation
            moderne pour creer des soins simples, beaux et fiables.
          </p>
          <div className="values-grid">
            {["Authenticite", "Qualite", "Elegance", "Patrimoine"].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="botanique" className="section">
        <div className="section-heading">
          <p className="eyebrow">Tresors botaniques de Guinee</p>
          <h2>Chaque plante devient une fiche, une histoire et une preuve d&apos;expertise.</h2>
        </div>
        <div className="botanical-grid">
          {botanicals.map(([name, benefit, description]) => (
            <article className="botanical-card" key={name}>
              <div className="plant-mark"><Leaf size={20} /></div>
              <p>{benefit}</p>
              <h3>{name}</h3>
              <span>{description}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="collections" className="collections-section">
        <div className="section-heading">
          <p className="eyebrow">Nos collections</p>
          <h2>Des routines organisees par besoin, texture et moment de vie.</h2>
        </div>
        <div className="collection-list">
          {collectionNames.map((name, index) => (
            <a key={name} href="#boutique" className="collection-pill">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {name}
            </a>
          ))}
        </div>
      </section>

      <section id="boutique" className="shop-section">
        <div className="section-heading">
          <p className="eyebrow">Boutique</p>
          <h2>Produits essentiels, routines completes et coffrets de soin.</h2>
        </div>
        <div className="shop-toolbar">
          <label className="search-field">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un soin, une plante..." />
          </label>
          <div className="filter-row">
            {categories.map((item) => (
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                <button
                  className={wishlist.includes(product.id) ? "heart saved" : "heart"}
                  onClick={() =>
                    setWishlist((current) =>
                      current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id],
                    )
                  }
                  aria-label="Ajouter aux favoris"
                >
                  <Heart size={17} />
                </button>
              </div>
              <div className="product-body">
                <p>{product.category} / {product.need}</p>
                <h3>{product.name}</h3>
                <span>{product.description}</span>
                <small>{product.ingredients}</small>
                <div className="product-footer">
                  <strong>{product.price} EUR</strong>
                  <button onClick={() => addToCart(product)}>
                    <Plus size={16} /> Ajouter
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="diagnostic" className="diagnostic-section">
        <div className="diagnostic-panel">
          <p className="eyebrow">Diagnostic capillaire</p>
          <h2>Un questionnaire rapide pour proposer une routine personnalisee.</h2>
          <div className="question-grid">
            <Question label="Texture" value={answers.texture} onChange={(value) => setAnswers({ ...answers, texture: value })} options={["crepus", "boucles", "defrises"]} />
            <Question label="Objectif" value={answers.goal} onChange={(value) => setAnswers({ ...answers, goal: value })} options={["hydration", "pousse", "nutrition"]} />
            <Question label="Cuir chevelu" value={answers.scalp} onChange={(value) => setAnswers({ ...answers, scalp: value })} options={["sensible", "sec", "gras"]} />
          </div>
        </div>
        <div className="result-panel">
          <Sparkles size={22} />
          <h3>Routine recommandee</h3>
          <p>
            Profil {answers.texture}, objectif {answers.goal}. Commencer par un nettoyage doux, poursuivre
            avec un soin profond, puis sceller avec une huile botanique.
          </p>
          {diagnosticProducts.slice(0, 3).map((product) => (
            <button key={product.id} onClick={() => addToCart(product)} className="routine-item">
              <span>{product.name}</span>
              <Plus size={15} />
            </button>
          ))}
        </div>
      </section>

      <section id="centre" className="split-section center-section">
        <div>
          <p className="eyebrow">Centre capillaire</p>
          <h2>Analyse, soins, massages et suivi dans un institut dedie.</h2>
          <button className="button primary" onClick={() => setBookingOpen(true)}>
            <Calendar size={17} /> Reserver un rendez-vous
          </button>
        </div>
        <div className="service-list">
          {services.map(([name, description, duration]) => (
            <article key={name}>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <span>{duration}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="before-after">
          <div />
          <div />
        </div>
        <div>
          <p className="eyebrow">Avant / Apres</p>
          <h2>Resultats, videos et avis clients pour installer la confiance.</h2>
          <p>
            La galerie documentera les routines, les suivis pousse, les soins reparateurs et les
            experiences au centre capillaire.
          </p>
        </div>
      </section>

      <section id="journal" className="section">
        <div className="section-heading">
          <p className="eyebrow">Journal Assya</p>
          <h2>Conseils, plantes, routines et education cosmetique.</h2>
        </div>
        <div className="article-grid">
          {articles.map(([title, summary]) => (
            <article key={title}>
              <span>Conseil</span>
              <h3>{title}</h3>
              <p>{summary}</p>
              <a href="#contact">Lire bientot</a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2>Les questions qui rassurent avant achat.</h2>
        </div>
        <div className="faq-list">
          {[
            ["Les produits sont-ils naturels ?", "La ligne est pensee autour d'ingredients d'origine naturelle et de plantes valorisees localement."],
            ["Puis-je utiliser les soins sur cheveux defrises ?", "Oui, les collections distinguent cheveux crepus, boucles, defrises, enfants, homme et peau."],
            ["Comment choisir ma routine ?", "Le diagnostic capillaire propose une premiere recommandation, puis le centre peut affiner le suivi."],
          ].map(([question, answer], index) => (
            <button key={question} className="faq-item" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
              <span>{question}</span>
              {faqOpen === index ? <Minus size={16} /> : <Plus size={16} />}
              {faqOpen === index && <p>{answer}</p>}
            </button>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <h2>Assya Beauty Cosmebio</h2>
          <p>Soins botaniques premium, fabriques avec exigence et respect du patrimoine naturel africain.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:contact@assyabeauty.com">contact@assyabeauty.com</a>
          <a href="https://wa.me/224000000000" target="_blank">WhatsApp</a>
          <a href="#accueil">Instagram</a>
          <a href="#accueil">Facebook</a>
        </div>
      </footer>

      <a className="whatsapp" href="https://wa.me/224000000000" target="_blank" aria-label="Contacter sur WhatsApp">
        <MessageCircle size={22} />
      </a>

      {cartOpen && (
        <aside className="drawer">
          <div className="drawer-head">
            <h2>Panier</h2>
            <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X size={18} /></button>
          </div>
          {cart.length === 0 ? (
            <p className="empty">Votre panier est vide.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-line" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.qty} x {item.price} EUR</span>
                  </div>
                  <button onClick={() => setCart((current) => current.filter((line) => line.id !== item.id))}>Retirer</button>
                </div>
              ))}
              <div className="drawer-total">
                <span>Total</span>
                <strong>{total} EUR</strong>
              </div>
              <button className="button primary full">Paiement securise</button>
            </>
          )}
        </aside>
      )}

      {bookingOpen && (
        <div className="modal-backdrop">
          <div className="booking-modal">
            <button className="icon-button close" onClick={() => setBookingOpen(false)} aria-label="Fermer la reservation"><X size={18} /></button>
            <p className="eyebrow">Reservation</p>
            <h2>Choisir une prestation</h2>
            {services.map(([name, description, duration]) => (
              <button key={name} className="booking-option">
                <Check size={16} />
                <span><strong>{name}</strong>{description}</span>
                <small>{duration}</small>
              </button>
            ))}
            <button className="button primary full">Continuer vers le calendrier</button>
          </div>
        </div>
      )}
    </main>
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
      {options.map((option) => (
        <button key={option} type="button" className={value === option ? "selected" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </fieldset>
  );
}
