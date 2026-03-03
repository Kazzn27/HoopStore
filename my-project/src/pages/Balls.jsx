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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

const BALLS = [
  {
    id: 1,
    name: "Spalding Street Basketball",
    brand: "Spalding",
    price: 4990,
    tag: "Хит продаж",
    surface: "Асфальт / Бетон",
    size: "7",
    img: "https://m.media-amazon.com/images/I/91A90PxvHHL.jpg",
    description: "Классический уличный мяч Spalding. Отличный контроль и звук при бросках. Прорезиненная поверхность выдерживает жёсткий асфальт сезон за сезоном.",
  },
  {
    id: 2,
    name: "Wilson NCAA Street Ball",
    brand: "Wilson",
    price: 3750,
    tag: "Выбор улицы",
    surface: "Асфальт",
    size: "7",
    img: "https://i5.walmartimages.com/seo/Wilson-NCAA-Street-Shot-Outdoor-Basketball-Official-Size-29-5_765a22ab-eabc-4bb6-9822-126dd8d9f58a.41cfcaff2465238c9f96d23650e78054.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    description: "Прочный мяч Wilson для асфальта. Отлично держит сцепление и форму даже после сотен матчей на улице.",
  },
  {
    id: 3,
    name: "Nike Playground Ball",
    brand: "Nike",
    price: 5200,
    tag: "Топ бренд",
    surface: "Асфальт / Паркет",
    size: "7",
    img: "https://al-ikhsan.com/cdn/shop/files/n_1_n100449881407_f.jpg?v=1723016828",
    description: "Nike Playground – для настоящих уличных игр. Яркий дизайн и полный контроль на любой площадке.",
  },
  {
    id: 4,
    name: "Molten GR7 Street",
    brand: "Molten",
    price: 2990,
    tag: "Бюджет",
    surface: "Асфальт",
    size: "7",
    img: "https://m.media-amazon.com/images/I/91pxYzxDOXL.jpg",
    description: "Доступный вариант для тех, кто только выходит на улицу. Надёжная резина и стандартный размер 7.",
  },
  {
    id: 5,
    name: "Wilson 3X3",
    brand: "Under Armour",
    price: 4200,
    tag: "Новинка",
    surface: "Асфальт / Бетон",
    size: "6",
    img: "https://admin.di-sport.uz/storage/galleries/25403/VbsYxyKGdxs1YXGxQJ2MxSSG0r1aOwePLnRCYfaa.webp",
    description: "Самый лучший мяч для игры на улице, икона уличный игры",
  },
  {
    id: 6,
    name: "Мяч Nike Jordan Legacy 2.0 8P Basketball",
    brand: "Jordan",
    price: 6800,
    tag: "Премиум",
    surface: "Асфальт / Паркет",
    size: "7",
    img: "https://admin.di-sport.uz/storage/galleries/21674/5DPl0h3bZq3MWi8fKTixgg0dNJR946709tJ6TWca.webp",
    description: "Легендарный Jordan в уличной версии. Максимальный контроль, долговечность и узнаваемый стиль для любой площадки.",
  },
];

const SPECS = [
  { num: "01", title: "Резина",     text: "Прорезиненная поверхность выдерживает сотни часов на жёстком асфальте." },
  { num: "02", title: "Размер 7",   text: "Стандартный размер для взрослых игроков — один стандарт для всей улицы." },
  { num: "03", title: "Давление",   text: "Удерживает оптимальное давление дольше благодаря бутиловой камере." },
];

const Balls = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [added, setAdded]       = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

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
            HOOPSTORE / МЯЧИ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            МЯЧИ<br /><span style={s.orange}>СТРИТБОЛЬНЫЕ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Настоящие уличные мячи для игры на асфальте<br />
            и бетонных площадках.
          </motion.p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── PRODUCT GRID ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 40 }}>
            Популярные мячи
          </motion.h2>

          <div style={s.grid}>
            {BALLS.map((ball, i) => (
              <motion.div
                key={ball.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.12 }}
                className="product-card"
                style={s.card}
                onClick={() => setSelected(ball)}
              >
                {/* Tag */}
                <span style={s.cardTag}>{ball.tag}</span>

                {/* Image */}
                <div style={s.cardImgWrap}>
                  <img src={ball.img} alt={ball.name} style={s.cardImg} />
                </div>

                {/* Info */}
                <div style={s.cardBody}>
                  <p style={s.cardBrand}>{ball.brand}</p>
                  <h3 style={s.cardName}>{ball.name}</h3>
                  <p style={s.cardSurface}>{ball.surface}</p>
                </div>

                {/* Footer */}
                <div style={s.cardFooter}>
                  <span style={s.cardPrice}>{ball.price.toLocaleString()} ₽</span>
                  <button
                    className="add-btn"
                    style={{
                      ...s.addBtn,
                      background: added === ball.id ? "#1a3a1a" : "#ff7a00",
                      color: added === ball.id ? "#4ade80" : "#000",
                    }}
                    onClick={(e) => handleAdd(e, ball.id)}
                  >
                    {added === ball.id ? "✓" : <CartIcon />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            Для настоящих игр
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
              {/* Close */}
              <button className="close-btn" style={s.closeBtn} onClick={() => setSelected(null)}>
                <CloseIcon />
              </button>

              {/* Image */}
              <div style={s.modalImgWrap}>
                <img src={selected.img} alt={selected.name} style={s.modalImg} />
                {/* decorative ball overlay */}
                <div style={s.modalImgBall}>
                  <BallSVG size={120} color="rgba(255,122,0,0.08)" lines="rgba(255,122,0,0.12)" />
                </div>
              </div>

              {/* Info */}
              <div style={s.modalBody}>
                <p style={s.modalBrand}>{selected.brand}</p>
                <h2 style={s.modalTitle}>{selected.name}</h2>
                <p style={s.modalDesc}>{selected.description}</p>

                <div style={s.modalMeta}>
                  {[
                    ["Поверхность", selected.surface],
                    ["Размер", selected.size],
                  ].map(([k, v]) => (
                    <div key={k} style={s.metaItem}>
                      <span style={s.metaKey}>{k}</span>
                      <span style={s.metaVal}>{v}</span>
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
    width: "100%",
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Barlow', sans-serif",
    overflowX: "hidden",
  },
  orange: { color: "#ff7a00" },

  hero: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative",
    overflow: "hidden",
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px",
    lineHeight: 1.75, margin: 0,
  },

  divider: {
    height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left",
  },

  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  // GRID
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  card: {
    background: "#0f0f0f",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "border-color 0.2s",
  },
  cardTag: {
    position: "absolute",
    top: 14, left: 14,
    background: "rgba(255,122,0,0.15)",
    border: "1px solid rgba(255,122,0,0.3)",
    borderRadius: "6px",
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#ff7a00",
    textTransform: "uppercase",
    zIndex: 1,
  },
  cardImgWrap: {
    width: "100%",
    aspectRatio: "1/1",
    background: "#151515",
    overflow: "hidden",
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
  cardSurface: {
    color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0,
  },
  cardFooter: {
    padding: "12px 20px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "auto",
  },
  cardPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px", fontWeight: 900, color: "#ff7a00", letterSpacing: "0.5px",
  },
  addBtn: {
    width: 38, height: 38, borderRadius: "8px",
    border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: 700,
    transition: "transform 0.15s, background 0.2s, color 0.2s",
    flexShrink: 0,
  },

  // SPECS
  specsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40,
  },
  specCard: {
    padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.08)",
  },
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
  specText: {
    color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.7, margin: 0,
  },

  // CTA
  cta: {
    background: "#ff7a00", padding: "96px 0",
    position: "relative", overflow: "hidden",
  },
  ctaBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", opacity: 0.22, pointerEvents: "none",
  },
  ctaInner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 48px",
    position: "relative", zIndex: 1,
  },
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
    background: "#000", border: "none", borderRadius: "10px",
    color: "#fff",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px", fontWeight: 900, letterSpacing: "3px",
    textTransform: "uppercase", padding: "15px 48px",
    cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
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
    display: "flex", flexDirection: "column",
  },
  closeBtn: {
    position: "absolute", top: 16, right: 16,
    background: "rgba(255,255,255,0.06)", border: "none",
    borderRadius: "8px", width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "background 0.2s",
  },
  modalImgWrap: {
    width: "100%", aspectRatio: "1/1",
    background: "#151515", overflow: "hidden",
    borderRadius: "20px 20px 0 0",
    position: "relative", flexShrink: 0,
  },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  modalImgBall: {
    position: "absolute", bottom: -20, right: -20, pointerEvents: "none",
  },
  modalBody: { padding: "28px 28px 32px", position: "relative" },
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
    color: "rgba(255,255,255,0.4)", fontSize: "14px",
    lineHeight: 1.75, margin: "0 0 20px 0",
  },
  modalMeta: {
    display: "flex", gap: 24,
    padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    marginBottom: 20,
  },
  metaItem: { display: "flex", flexDirection: "column", gap: 3 },
  metaKey: {
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)",
  },
  metaVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "15px", fontWeight: 700, color: "#fff",
  },
  modalFooter: {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
  },
  modalPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "30px", fontWeight: 900, color: "#ff7a00",
  },
  btnPrimary: {
    flex: 1, padding: "13px",
    background: "#ff7a00", border: "none", borderRadius: "10px",
    color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "14px", fontWeight: 900, letterSpacing: "2px",
    textTransform: "uppercase", cursor: "pointer",
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
`;

export default Balls;