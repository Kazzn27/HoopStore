import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const BallSVG = ({ size = 100, color = "#ff7a00", lines = "#000", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <circle cx="50" cy="50" r="48" fill={color} />
    <path d="M50 2 Q78 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M50 2 Q22 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 74 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 26 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <circle cx="50" cy="50" r="48" fill="none" stroke={lines} strokeWidth="5" />
  </svg>
);

/* Hoop decorative SVG */
const HoopIcon = ({ size = 48, color = "#ff7a00" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <line x1="32" y1="56" x2="32" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
    <line x1="32" y1="28" x2="46" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity=".5"/>
    <ellipse cx="46" cy="19" rx="10" ry="4" fill="none" stroke={color} strokeWidth="2.5"/>
    <line x1="36" y1="19" x2="56" y2="19" stroke={color} strokeWidth="1.5" opacity=".3"/>
    {/* net */}
    {[0,1,2,3].map(i => (
      <line key={i} x1={38 + i*4} y1="21" x2={37 + i*4} y2="32" stroke={color} strokeWidth="1" opacity=".25"/>
    ))}
    <path d="M37 21 Q46 26 55 21" fill="none" stroke={color} strokeWidth="1" opacity=".25"/>
    <path d="M37.5 26 Q46 30 54.5 26" fill="none" stroke={color} strokeWidth="1" opacity=".2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CATEGORIES = ["Все", "Мобильные", "Настенные", "Уличные", "Детские"];

const TYPE_COLOR = {
  "Мобильная":  "#ff7a00",
  "Настенная":  "#3b82f6",
  "Уличная":    "#4ade80",
  "Детская":    "#a78bfa",
};

const ITEMS = [
  {
    id: 1,
    name: "Lifetime 1221 Pro",
    brand: "Lifetime",
    price: 12900,
    tag: "Для двора",
    category: "Мобильные",
    type: "Мобильная",
    height: "2.1 – 3.05 м",
    ring: "45 см",
    img: "https://athletix.ae/cdn/shop/products/05050037-101_02.jpg?v=1746125182&width=700",
    description: "Мобильная стойка Lifetime с регулировкой высоты от 2.1 до 3.05 м. Основание заполняется водой или песком для устойчивости. Щит из поликарбоната 44×28 дюйма.",
    specs: [["Тип", "Мобильная"], ["Высота кольца", "2.1 – 3.05 м"], ["Диаметр кольца", "45 см"], ["Основание", "Вода / Песок"]],
  },
  {
    id: 2,
    name: "Spalding NBA Portable",
    brand: "Spalding",
    price: 18500,
    tag: "Топ продаж",
    category: "Мобильные",
    type: "Мобильная",
    height: "2.45 – 3.05 м",
    ring: "45 см",
    img: "https://i5.walmartimages.com/seo/Spalding-54-inch-Shatter-proof-Polycarbonate-Exacta-Height-Portable-Basketball-Hoop-System_c1432f78-daf5-4c75-9bc3-0e637efc62d9.69a4bc450c9b24b33a98ae5ba0fbb7a0.jpeg",
    description: "Официальная мобильная стойка Spalding NBA. Акриловый щит 54 дюйма, пружинящее кольцо как в профессиональных залах. Для серьёзных игроков во дворе.",
    specs: [["Тип", "Мобильная"], ["Высота кольца", "2.45 – 3.05 м"], ["Щит", "Акрил 54\""], ["Кольцо", "Пружинящее"]],
  },
  {
    id: 3,
    name: "Goaliath In-Ground 54",
    brand: "Goaliath",
    price: 34000,
    tag: "Премиум",
    category: "Уличные",
    type: "Уличная",
    height: "2.45 – 3.05 м",
    ring: "45 см",
    img: "https://i5.walmartimages.com/seo/Gianna-Adjustable-Kids-Basketball-Hoop-5-09-8-53ft-Portable-Outdoor-Goal-with-PC-Backboard-and-Stable-Base-Red_d3094264-a590-4a5b-978c-b879acde3b80.8c1b21625f1ebcf5a2e9c6f2d011e705.jpeg?odnHeight=328&odnWidth=328&odnBg=FFFFFF",
    description: "Стационарная уличная стойка Goaliath вкапывается в землю. Стальная конструкция выдерживает любую погоду. Щит 54 дюйма, кольцо с двойной пружиной.",
    specs: [["Тип", "Вкопанная"], ["Высота кольца", "2.45 – 3.05 м"], ["Щит", "Акрил 54\""], ["Монтаж", "В землю / бетон"]],
  },
  {
    id: 4,
    name: "Spalding Wall Mount Pro",
    brand: "Spalding",
    price: 9800,
    tag: "Компакт",
    category: "Настенные",
    type: "Настенная",
    height: "2.45 – 3.05 м",
    ring: "45 см",
    img: "https://www.gladiatorfit.ch/wp-content/uploads/2025/03/7640289255116-Panier-de-basket-mural-exterieur-Omada-25-500x500.jpg",
    description: "Настенное крепление Spalding для установки в гараже или на стене дома. Регулируемый кронштейн, щит 48 дюйма из поликарбоната.",
    specs: [["Тип", "Настенная"], ["Вылет", "60 – 90 см"], ["Щит", "Поликарбонат 48\""], ["Монтаж", "На стену / столб"]],
  },
  {
    id: 5,
    name: "Little Tikes EasyScore",
    brand: "Little Tikes",
    price: 3200,
    tag: "Для детей",
    category: "Детские",
    type: "Детская",
    height: "0.9 – 1.2 м",
    ring: "25 см",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzEVzw5cagL7WbVKppcogxvQ52nKXuJgAo0Q&s",
    description: "Детская стойка Little Tikes для первых шагов в баскетболе. Лёгкая регулировка высоты, мягкое пластиковое кольцо без острых краёв. Идеально для двора.",
    specs: [["Тип", "Детская"], ["Высота кольца", "0.9 – 1.2 м"], ["Кольцо", "Мягкий пластик"], ["Возраст", "3–8 лет"]],
  },
  {
    id: 6,
    name: "Avento Street Hoop",
    brand: "Avento",
    price: 6400,
    tag: "Улица",
    category: "Уличные",
    type: "Уличная",
    height: "3.05 м (фикс.)",
    ring: "45 см",
    img: "https://cdn.plutosport.com/a/ProductMedia/Avento/P.AVE.ACC.6070/47RB-WHT_g1.jpg?profile=max_width_mobile",
    description: "Уличная стойка Avento из оцинкованной стали для установки на площадках. Фиксированная высота 3.05 м, металлическая цепная сетка в комплекте.",
    specs: [["Тип", "Уличная стационарная"], ["Высота кольца", "3.05 м"], ["Сетка", "Цепная сталь"], ["Монтаж", "Фланец / бетон"]],
  },
];

const SPECS_SECTION = [
  { num: "01", title: "Устойчивость", text: "Заполненное основание или вкопанная стойка — ничто не сдвинет кольцо во время игры." },
  { num: "02", title: "Регулировка",  text: "От 2.1 м для детей до официальных 3.05 м — одна стойка для всей семьи и компании." },
  { num: "03", title: "Надёжность",   text: "Сталь, акрил и пружинящие кольца выдерживают сезоны уличной игры без ухода." },
];

const Hoops = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [added, setAdded]       = useState(null);
  const [filter, setFilter]     = useState("Все");

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const filtered = filter === "Все" ? ITEMS : ITEMS.filter(i => i.category === filter);

  const handleAdd = (e, id) => {
    e.stopPropagation();
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBall}>
          <BallSVG size={500} color="#1c0f00" lines="#3d2000" />
        </div>
        <div style={s.heroInner}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={s.eyebrow}
          >
            HOOPSTORE / СТОЙКИ И КОЛЬЦА
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            СТОЙКИ<br /><span style={s.orange}>И КОЛЬЦА</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Мобильные, настенные и уличные стойки —<br />
            создай свою площадку где угодно.
          </motion.p>

          {/* Type legend */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={s.heroLegend}
          >
            {Object.entries(TYPE_COLOR).map(([label, color]) => (
              <div key={label} style={s.legendItem}>
                <span style={{ ...s.legendDot, background: color }} />
                <span style={s.legendLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── GRID ── */}
      <section style={s.section}>
        <div style={s.container}>

          <div style={s.gridHeader}>
            <motion.h2 {...fadeUp} style={s.sectionTitle}>
              Всё для площадки
            </motion.h2>
            <div style={s.filters}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className="filter-btn"
                  style={{
                    ...s.filterBtn,
                    background: filter === cat ? "#ff7a00" : "transparent",
                    color: filter === cat ? "#000" : "rgba(255,255,255,0.45)",
                    borderColor: filter === cat ? "#ff7a00" : "rgba(255,255,255,0.1)",
                  }}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={s.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.3 }}
                  className="product-card"
                  style={s.card}
                  onClick={() => setSelected(item)}
                >
                  <span style={s.cardTag}>{item.tag}</span>
                  <span style={{
                    ...s.typeBadge,
                    color: TYPE_COLOR[item.type],
                    borderColor: TYPE_COLOR[item.type] + "40",
                  }}>
                    {item.type}
                  </span>

                  <div style={s.cardImgWrap}>
                    <img src={item.img} alt={item.name} style={s.cardImg} />
                  </div>

                  <div style={s.cardBody}>
                    <p style={s.cardBrand}>{item.brand}</p>
                    <h3 style={s.cardName}>{item.name}</h3>

                    {/* quick specs */}
                    <div style={s.quickSpecs}>
                      <span style={s.quickSpec}>↕ {item.height}</span>
                      <span style={s.quickSpecDot}>·</span>
                      <span style={s.quickSpec}>⌀ {item.ring}</span>
                    </div>
                  </div>

                  <div style={s.cardFooter}>
                    <span style={s.cardPrice}>{item.price.toLocaleString()} ₽</span>
                    <button
                      className="add-btn"
                      style={{
                        ...s.addBtn,
                        background: added === item.id ? "#1a3a1a" : "#ff7a00",
                        color: added === item.id ? "#4ade80" : "#000",
                      }}
                      onClick={(e) => handleAdd(e, item.id)}
                    >
                      {added === item.id ? "✓" : <CartIcon />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            Своя площадка — своя игра
          </motion.h2>
          <div style={s.specsGrid}>
            {SPECS_SECTION.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={s.specCard}
              >
                <span style={s.specNum}>{spec.num}</span>
                <h3 style={s.specTitle}>{spec.title}</h3>
                <p style={s.specText}>{spec.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.cta}>
        <div style={s.ctaBall}>
          <BallSVG size={380} color="#e06800" lines="#c85e00" />
        </div>
        <motion.div {...fadeUp} style={s.ctaInner}>
          <p style={s.ctaEyebrow}>HOOPSTORE</p>
          <h2 style={s.ctaTitle}>ВЕСЬ КАТАЛОГ<br />СНАРЯЖЕНИЯ</h2>
          <button className="btn-cta" style={s.ctaBtn} onClick={() => navigate("/catalog")}>
            В каталог
          </button>
        </motion.div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            style={s.overlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              style={s.modal}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <button className="close-btn" style={s.closeBtn} onClick={() => setSelected(null)}>
                <CloseIcon />
              </button>

              <div style={s.modalImgWrap}>
                <img src={selected.img} alt={selected.name} style={s.modalImg} />
                <span style={{
                  ...s.modalType,
                  color: TYPE_COLOR[selected.type],
                  borderColor: TYPE_COLOR[selected.type] + "50",
                  background: TYPE_COLOR[selected.type] + "18",
                }}>
                  {selected.type}
                </span>
              </div>

              <div style={s.modalBody}>
                <p style={s.modalBrand}>{selected.brand}</p>
                <h2 style={s.modalTitle}>{selected.name}</h2>
                <p style={s.modalDesc}>{selected.description}</p>

                {/* Quick params */}
                <div style={s.modalParams}>
                  <div style={s.modalParam}>
                    <span style={s.paramKey}>Высота кольца</span>
                    <span style={s.paramVal}>{selected.height}</span>
                  </div>
                  <div style={s.modalParam}>
                    <span style={s.paramKey}>Диаметр кольца</span>
                    <span style={s.paramVal}>{selected.ring}</span>
                  </div>
                </div>

                {/* Specs table */}
                <div style={s.specsTable}>
                  {selected.specs.map(([k, v]) => (
                    <div key={k} style={s.specsRow}>
                      <span style={s.specsKey}>{k}</span>
                      <span style={s.specsVal}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={s.modalFooter}>
                  <span style={s.modalPrice}>{selected.price.toLocaleString()} ₽</span>
                  <button
                    className="btn-primary"
                    style={s.btnPrimary}
                    onClick={() => { setSelected(null); navigate("/cart"); }}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── STYLES ── */
const s = {
  root: {
    width: "100%", minHeight: "100vh",
    background: "#0a0a0a", color: "#fff",
    fontFamily: "'Barlow', sans-serif", overflowX: "hidden",
  },
  orange: { color: "#ff7a00" },

  hero: {
    minHeight: "70vh", display: "flex", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative", overflow: "hidden",
  },
  heroBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0,
  },
  heroInner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 48px",
    width: "100%", position: "relative", zIndex: 1,
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "5px",
    color: "#ff7a00", marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(60px, 9vw, 96px)", fontWeight: 900,
    lineHeight: 1.0, letterSpacing: "2px", textTransform: "uppercase",
    margin: "0 0 24px 0", color: "#fff",
  },
  heroDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 32px 0",
  },
  heroLegend: {
    display: "flex", gap: 24,
    borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28,
  },
  legendItem: { display: "flex", alignItems: "center", gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  legendLabel: { fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" },

  divider: { height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left" },
  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  gridHeader: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    flexWrap: "wrap", gap: 20, marginBottom: 36,
  },
  filters: { display: "flex", gap: 8, flexWrap: "wrap" },
  filterBtn: {
    border: "1.5px solid", borderRadius: "8px",
    padding: "7px 16px", fontSize: "13px", fontWeight: 700,
    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
    transition: "all 0.2s", letterSpacing: "0.5px",
  },

  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  card: {
    background: "#0f0f0f",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "16px", overflow: "hidden",
    cursor: "pointer", display: "flex", flexDirection: "column",
    position: "relative", transition: "border-color 0.2s",
  },
  cardTag: {
    position: "absolute", top: 14, left: 14,
    background: "rgba(255,122,0,0.15)",
    border: "1px solid rgba(255,122,0,0.3)",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px",
    color: "#ff7a00", textTransform: "uppercase", zIndex: 1,
  },
  typeBadge: {
    position: "absolute", top: 14, right: 14,
    border: "1px solid",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1px", zIndex: 1,
  },
  cardImgWrap: {
    width: "100%", aspectRatio: "1/1",
    background: "#151515", overflow: "hidden",
  },
  cardImg: {
    width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s",
  },
  cardBody: { padding: "20px 20px 12px" },
  cardBrand: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0 0 6px 0",
  },
  cardName: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "18px", fontWeight: 800, textTransform: "uppercase",
    letterSpacing: "0.5px", margin: "0 0 10px 0", color: "#fff",
  },
  quickSpecs: { display: "flex", alignItems: "center", gap: 6 },
  quickSpec: { color: "rgba(255,255,255,0.3)", fontSize: "12px" },
  quickSpecDot: { color: "rgba(255,255,255,0.15)", fontSize: "14px" },
  cardFooter: {
    padding: "12px 20px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "auto",
  },
  cardPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px", fontWeight: 900, color: "#ff7a00",
  },
  addBtn: {
    width: 38, height: 38, borderRadius: "8px",
    border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: 700, flexShrink: 0,
    transition: "transform 0.15s, background 0.2s, color 0.2s",
  },

  specsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 },
  specCard: { padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.08)" },
  specNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "3px",
    color: "#ff7a00", display: "block", marginBottom: 14,
  },
  specTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "24px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "1px", margin: "0 0 10px 0", color: "#fff",
  },
  specText: { color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.7, margin: 0 },

  cta: { background: "#ff7a00", padding: "96px 0", position: "relative", overflow: "hidden" },
  ctaBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", opacity: 0.22, pointerEvents: "none",
  },
  ctaInner: { maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 },
  ctaEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px", fontWeight: 700, letterSpacing: "5px",
    color: "rgba(0,0,0,0.4)", marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px",
    color: "#000", margin: "0 0 32px 0", lineHeight: 1.0,
  },
  ctaBtn: {
    background: "#000", border: "none", borderRadius: "10px", color: "#fff",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px", fontWeight: 900, letterSpacing: "3px", textTransform: "uppercase",
    padding: "15px 48px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
  },

  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
    backdropFilter: "blur(10px)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24,
  },
  modal: {
    background: "#111", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px", width: "100%", maxWidth: 480,
    maxHeight: "90vh", overflowY: "auto",
    display: "flex", flexDirection: "column", position: "relative",
  },
  closeBtn: {
    position: "absolute", top: 16, right: 16,
    background: "rgba(255,255,255,0.06)", border: "none",
    borderRadius: "8px", width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "background 0.2s", zIndex: 2,
  },
  modalImgWrap: {
    width: "100%", aspectRatio: "1/1", background: "#151515",
    overflow: "hidden", borderRadius: "20px 20px 0 0",
    flexShrink: 0, position: "relative",
  },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  modalType: {
    position: "absolute", bottom: 14, left: 14,
    border: "1px solid",
    borderRadius: "6px", padding: "4px 12px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
  },
  modalBody: { padding: "28px 28px 32px" },
  modalBrand: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "4px",
    color: "#ff7a00", textTransform: "uppercase", margin: "0 0 8px 0",
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "24px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "1px", margin: "0 0 14px 0", color: "#fff",
  },
  modalDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.75, margin: "0 0 20px 0",
  },
  modalParams: {
    display: "flex", gap: 24, marginBottom: 16,
    padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  modalParam: { display: "flex", flexDirection: "column", gap: 3 },
  paramKey: {
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)",
  },
  paramVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "16px", fontWeight: 800, color: "#fff",
  },
  specsTable: {
    background: "#0a0a0a", borderRadius: "10px", overflow: "hidden",
    marginBottom: 20, border: "1px solid rgba(255,255,255,0.07)",
  },
  specsRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "11px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  specsKey: {
    fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },
  specsVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "14px", fontWeight: 700, color: "#fff",
  },
  modalFooter: {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
    borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20,
  },
  modalPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "30px", fontWeight: 900, color: "#ff7a00",
  },
  btnPrimary: {
    flex: 1, padding: "13px",
    background: "#ff7a00", border: "none", borderRadius: "10px", color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "14px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase",
    cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .product-card:hover { border-color: #ff7a00 !important; }
  .product-card:hover img { transform: scale(1.05); }
  .add-btn:hover { transform: scale(1.1); }
  .close-btn:hover { background: rgba(255,255,255,0.1) !important; }
  .close-btn:hover svg { stroke: #fff !important; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.38) !important; }
  .btn-primary:active { transform: translateY(0); }
  .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
  .filter-btn:hover { border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }
`;

export default Hoops;