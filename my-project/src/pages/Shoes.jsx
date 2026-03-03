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

const SHOES = [
  {
    id: 1,
    name: "Nike Immortality 4",
    brand: "Nike",
    price: 12500,
    tag: "Топ продаж",
    surface: "Асфальт / Паркет",
    sizes: ["40", "41", "42", "43", "44", "45"],
    img: "https://ir.ozone.ru/s3/multimedia-1-2/wc1000/8019651170.jpg",
    description: "Лёгкие кроссовки для уличного баскетбола. Отличное сцепление и амортизация для резких движений на асфальте.",
  },
  {
    id: 2,
    name: "Adidas Dame 8",
    brand: "Adidas",
    price: 11800,
    tag: "Хит улицы",
    surface: "Асфальт",
    sizes: ["39", "40", "41", "42", "43", "44"],
    img: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/801c9e1f31a14fa5ac7c5cc1672ae1e2_9366/DAME_X_Shoes_Orange_JQ9467_06_standard.jpg",
    description: "Кроссовки Damian Lillard для динамичных уличных матчей. Надёжная фиксация стопы и сцепление с бетоном.",
  },
  {
    id: 3,
    name: "Under Armour Curry Flow 9",
    brand: "Under Armour",
    price: 13200,
    tag: "Скорость",
    surface: "Асфальт / Паркет",
    sizes: ["40", "41", "42", "43", "44", "45"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5N4SUMizq0-K5MnOiL9YptBQM0CVxu2ByOw&s",
    description: "Для игроков, которые ценят скорость и контроль. Лёгкая подошва и гибкость для быстрых направлений.",
  },
  {
    id: 4,
    name: "Jordan Air Max 200",
    brand: "Jordan",
    price: 15900,
    tag: "Премиум",
    surface: "Асфальт / Паркет",
    sizes: ["41", "42", "43", "44", "45"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNgqxoKDky3jpeqNGAOGA1ookzquHA6letgg&s",
    description: "Легендарная подушка Air Max в уличной версии Jordan. Максимальная амортизация для долгих игр на асфальте.",
  },
  {
    id: 5,
    name: "MB.05 World Tour Basketball Shoes Unisex | | PUMA",
    brand: "Puma",
    price: 9400,
    tag: "Стиль",
    surface: "Асфальт",
    sizes: ["39", "40", "41", "42", "43", "44"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRl66CQbX80MpYlwT2nqiUGS_6tXw7hr0v5A&s",
    description: "Новейшая модель Puma для уличного баскетбола. Сочетание ретро-стиля и современных технологий сцепления.",
  },
  {
    id: 6,
    name: "New Balance Fresh Foam BB",
    brand: "New Balance",
    price: 10200,
    tag: "Комфорт",
    surface: "Асфальт / Паркет",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    img: "",
    description: "Fresh Foam технология обеспечивает максимальный комфорт за весь матч. Идеально для длинных уличных сессий.",
  },
];

const SPECS = [
  { num: "01", title: "Сцепление",     text: "Рифлёная резиновая подошва держит асфальт в любую погоду." },
  { num: "02", title: "Амортизация",   text: "Пенные вставки поглощают удары при прыжках и резких движениях." },
  { num: "03", title: "Фиксация",      text: "Высокие борта и шнуровка удерживают стопу при быстрых разворотах." },
];

const Shoes = () => {
  const navigate = useNavigate();
  const [selected, setSelected]   = useState(null);
  const [added, setAdded]         = useState(null);
  const [pickedSize, setPickedSize] = useState(null);
  const [filter, setFilter]       = useState("Все");

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const brands = ["Все", ...Array.from(new Set(SHOES.map(s => s.brand)))];

  const filtered = filter === "Все" ? SHOES : SHOES.filter(s => s.brand === filter);

  const handleAdd = (e, id) => {
    e.stopPropagation();
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  const openModal = (shoe) => {
    setSelected(shoe);
    setPickedSize(null);
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
            HOOPSTORE / КРОССОВКИ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            КРОССОВКИ<br /><span style={s.orange}>СТРИТБОЛЬНЫЕ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Обувь для динамичных уличных матчей:<br />
            контроль, сцепление и стиль.
          </motion.p>
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

          {/* Header + filter */}
          <div style={s.gridHeader}>
            <motion.h2 {...fadeUp} style={s.sectionTitle}>
              Популярные кроссовки
            </motion.h2>

            <div style={s.filters}>
              {brands.map(brand => (
                <button
                  key={brand}
                  className="filter-btn"
                  style={{
                    ...s.filterBtn,
                    background: filter === brand ? "#ff7a00" : "transparent",
                    color: filter === brand ? "#000" : "rgba(255,255,255,0.45)",
                    borderColor: filter === brand ? "#ff7a00" : "rgba(255,255,255,0.1)",
                  }}
                  onClick={() => setFilter(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div style={s.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((shoe, i) => (
                <motion.div
                  key={shoe.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.3 }}
                  className="product-card"
                  style={s.card}
                  onClick={() => openModal(shoe)}
                >
                  <span style={s.cardTag}>{shoe.tag}</span>

                  <div style={s.cardImgWrap}>
                    <img src={shoe.img} alt={shoe.name} style={s.cardImg} />
                  </div>

                  <div style={s.cardBody}>
                    <p style={s.cardBrand}>{shoe.brand}</p>
                    <h3 style={s.cardName}>{shoe.name}</h3>
                    <p style={s.cardSurface}>{shoe.surface}</p>
                  </div>

                  <div style={s.cardFooter}>
                    <span style={s.cardPrice}>{shoe.price.toLocaleString()} ₽</span>
                    <button
                      className="add-btn"
                      style={{
                        ...s.addBtn,
                        background: added === shoe.id ? "#1a3a1a" : "#ff7a00",
                        color: added === shoe.id ? "#4ade80" : "#000",
                      }}
                      onClick={(e) => handleAdd(e, shoe.id)}
                    >
                      {added === shoe.id ? "✓" : <CartIcon />}
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
            Для уличных матчей
          </motion.h2>
          <div style={s.specsGrid}>
            {SPECS.map((spec, i) => (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              </div>

              <div style={s.modalBody}>
                <p style={s.modalBrand}>{selected.brand}</p>
                <h2 style={s.modalTitle}>{selected.name}</h2>
                <p style={s.modalDesc}>{selected.description}</p>

                {/* Meta */}
                <div style={s.modalMeta}>
                  {[
                    ["Поверхность", selected.surface],
                    ["В наличии", `${selected.sizes.length} размеров`],
                  ].map(([k, v]) => (
                    <div key={k} style={s.metaItem}>
                      <span style={s.metaKey}>{k}</span>
                      <span style={s.metaVal}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Size picker */}
                <p style={s.sizeLabel}>Размер (EU)</p>
                <div style={s.sizesRow}>
                  {selected.sizes.map(size => (
                    <button
                      key={size}
                      className="size-btn"
                      style={{
                        ...s.sizeBtn,
                        borderColor: pickedSize === size ? "#ff7a00" : "rgba(255,255,255,0.1)",
                        background: pickedSize === size ? "rgba(255,122,0,0.12)" : "#0a0a0a",
                        color: pickedSize === size ? "#ff7a00" : "rgba(255,255,255,0.5)",
                      }}
                      onClick={() => setPickedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div style={s.modalFooter}>
                  <span style={s.modalPrice}>{selected.price.toLocaleString()} ₽</span>
                  <button
                    className="btn-primary"
                    style={{
                      ...s.btnPrimary,
                      opacity: pickedSize ? 1 : 0.45,
                      cursor: pickedSize ? "pointer" : "default",
                    }}
                    onClick={() => { if (pickedSize) { setSelected(null); navigate("/cart"); } }}
                  >
                    {pickedSize ? "В корзину" : "Выбери размер"}
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: 0,
  },

  divider: { height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left" },
  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  // GRID HEADER
  gridHeader: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    flexWrap: "wrap", gap: 20, marginBottom: 36,
  },
  filters: { display: "flex", gap: 8, flexWrap: "wrap" },
  filterBtn: {
    border: "1.5px solid", borderRadius: "8px",
    padding: "7px 16px", fontSize: "13px", fontWeight: 700,
    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
    transition: "background 0.2s, color 0.2s, border-color 0.2s",
    letterSpacing: "0.5px",
  },

  // CARDS
  grid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
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
  cardImgWrap: {
    width: "100%", aspectRatio: "1/1",
    background: "#151515", overflow: "hidden",
  },
  cardImg: {
    width: "100%", height: "100%", objectFit: "cover",
    transition: "transform 0.4s",
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
    letterSpacing: "0.5px", margin: "0 0 6px 0", color: "#fff",
  },
  cardSurface: { color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0 },
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

  // SPECS
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

  // CTA
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

  // MODAL
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
    overflow: "hidden", borderRadius: "20px 20px 0 0", flexShrink: 0,
  },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  modalBody: { padding: "28px 28px 32px" },
  modalBrand: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "4px",
    color: "#ff7a00", textTransform: "uppercase", margin: "0 0 8px 0",
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "26px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "1px", margin: "0 0 14px 0", color: "#fff",
  },
  modalDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.75, margin: "0 0 20px 0",
  },
  modalMeta: {
    display: "flex", gap: 24,
    padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
    marginBottom: 20,
  },
  metaItem: { display: "flex", flexDirection: "column", gap: 3 },
  metaKey: { fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" },
  metaVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "15px", fontWeight: 700, color: "#fff",
  },

  // SIZE PICKER
  sizeLabel: {
    fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)", margin: "0 0 10px 0",
  },
  sizesRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  sizeBtn: {
    width: 48, height: 40, border: "1.5px solid",
    borderRadius: "8px", cursor: "pointer",
    fontFamily: "'Barlow', sans-serif", fontSize: "13px", fontWeight: 700,
    transition: "border-color 0.2s, background 0.2s, color 0.2s",
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
    transition: "transform 0.15s, box-shadow 0.15s",
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
  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
  .size-btn:hover { border-color: #ff7a00 !important; color: #ff7a00 !important; }
`;

export default Shoes;