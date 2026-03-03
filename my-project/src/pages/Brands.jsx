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

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BRANDS = [
  {
    id: 1,
    name: "Nike",
    tag: "Легенда",
    founded: "1964",
    origin: "США",
    focus: ["Кроссовки", "Форма", "Рюкзаки", "Аксессуары"],
    slogan: "Just Do It",
    color: "#e11d48",
    desc: "Крупнейший спортивный бренд в мире. В баскетболе — это Jordan, Kyrie, LeBron. Каждый дроп на улице начинается с Nike.",
    athletes: ["LeBron James", "Kyrie Irving", "Kevin Durant"],
    skus: "240+",
  },
  {
    id: 2,
    name: "Jordan",
    tag: "Культ",
    founded: "1984",
    origin: "США",
    focus: ["Кроссовки", "Форма", "Рюкзаки"],
    slogan: "Be Like Mike",
    color: "#dc2626",
    desc: "Суббренд Nike, рождённый из контракта с Майклом Джорданом. Jumpman — самый узнаваемый логотип в уличном баскетболе.",
    athletes: ["Michael Jordan", "Luka Dončić", "Jayson Tatum"],
    skus: "85+",
  },
  {
    id: 3,
    name: "Adidas",
    tag: "Улица",
    founded: "1949",
    origin: "Германия",
    focus: ["Кроссовки", "Форма", "Рюкзаки"],
    slogan: "Impossible is Nothing",
    color: "#000000",
    desc: "Три полоски на улице — это всегда Adidas. Dame, Harden, Trae Young носят Three Stripes на любой площадке.",
    athletes: ["Damian Lillard", "James Harden", "Trae Young"],
    skus: "190+",
  },
  {
    id: 4,
    name: "Under Armour",
    tag: "Взрыв",
    founded: "1996",
    origin: "США",
    focus: ["Кроссовки", "Форма", "Рюкзаки", "Защита"],
    slogan: "I Will",
    color: "#1e3a8a",
    desc: "Бренд, который вырос вместе со Стефом Карри. UA Curry Flow на асфальте — это скорость и контроль в чистом виде.",
    athletes: ["Stephen Curry", "Joel Embiid", "Kemba Walker"],
    skus: "120+",
  },
  {
    id: 5,
    name: "Spalding",
    tag: "Официальный",
    founded: "1876",
    origin: "США",
    focus: ["Мячи", "Стойки", "Аксессуары", "Рюкзаки"],
    slogan: "The Game's Best Ball",
    color: "#b45309",
    desc: "Официальный мяч NBA с 1983 года. Spalding — это звук мяча об асфальт. Каждый стритболист начинал с их мяча.",
    athletes: ["NBA Official", "WNBA Official"],
    skus: "60+",
  },
  {
    id: 6,
    name: "Wilson",
    tag: "Новый стандарт",
    founded: "1913",
    origin: "США",
    focus: ["Мячи", "Аксессуары"],
    slogan: "The Science of Sport",
    color: "#92400e",
    desc: "С 2021 года Wilson заменил Spalding как официальный мяч NBA. Microfiber Composite — лучшее сцепление на асфальте.",
    athletes: ["NBA Official (2021–)", "EuroLeague Official"],
    skus: "45+",
  },
  {
    id: 7,
    name: "Puma",
    tag: "Возвращение",
    founded: "1948",
    origin: "Германия",
    focus: ["Кроссовки", "Форма"],
    slogan: "Forever Faster",
    color: "#16a34a",
    desc: "Puma вернулся в баскетбол с Clyde All-Pro и контрактами с LaMelo Ball и Kyrie Irving ранних годов. Ретро + улица.",
    athletes: ["LaMelo Ball", "Scoot Henderson", "RJ Barrett"],
    skus: "40+",
  },
  {
    id: 8,
    name: "New Balance",
    tag: "Андеграунд",
    founded: "1906",
    origin: "США",
    focus: ["Кроссовки"],
    slogan: "Fearlessly Independent",
    color: "#7c3aed",
    desc: "Тихий игрок, который неожиданно захватил улицу. Kawhi Leonard и NWNG сделали NB баскетбольным брендом мечты.",
    athletes: ["Kawhi Leonard", "Darius Garland"],
    skus: "25+",
  },
  {
    id: 9,
    name: "Molten",
    tag: "Точность",
    founded: "1958",
    origin: "Япония",
    focus: ["Мячи"],
    slogan: "Passion for the Game",
    color: "#0369a1",
    desc: "Официальный мяч FIBA и международных турниров. Molten G5000 — выбор тех, кто ценит идеальный отскок и контроль.",
    athletes: ["FIBA Official", "EuroBasket Official"],
    skus: "20+",
  },
];

const CATEGORIES = ["Все", "Экипировка", "Мячи", "Аксессуары"];
const CAT_MAP = {
  "Экипировка": ["Кроссовки", "Форма", "Рюкзаки", "Защита"],
  "Мячи":       ["Мячи"],
  "Аксессуары": ["Аксессуары"],
};

const Brands = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState("Все");

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const filtered = filter === "Все"
    ? BRANDS
    : BRANDS.filter(b => b.focus.some(f => CAT_MAP[filter]?.includes(f)));

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
            HOOPSTORE / БРЕНДЫ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            БРЕНДЫ<br /><span style={s.orange}>С УЛИЦЫ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Nike, Jordan, Adidas, Spalding и ещё 5 брендов —<br />
            только те, кто понимает баскетбол.
          </motion.p>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={s.heroStats}
          >
            {[
              ["9",    "Брендов"],
              ["150+", "Лет истории"],
              ["800+", "Товаров"],
            ].map(([val, label]) => (
              <div key={label} style={s.heroStat}>
                <span style={s.heroStatVal}>{val}</span>
                <span style={s.heroStatLabel}>{label}</span>
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
              Все бренды
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
              {filtered.map((brand, i) => (
                <motion.div
                  key={brand.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.3 }}
                  className="brand-card"
                  style={s.card}
                  onClick={() => setSelected(brand)}
                >
                  {/* color accent bar */}
                  <div style={{ ...s.cardAccent, background: brand.color }} />

                  <div style={s.cardInner}>
                    <div style={s.cardTop}>
                      {/* Big brand initial */}
                      <div style={{ ...s.brandInitial, color: brand.color + "30" }}>
                        {brand.name[0]}
                      </div>
                      <span style={s.cardTag}>{brand.tag}</span>
                    </div>

                    <h3 style={s.brandName}>{brand.name}</h3>
                    <p style={s.brandSlogan}>"{brand.slogan}"</p>
                    <p style={s.brandDesc}>{brand.desc}</p>

                    {/* Focus tags */}
                    <div style={s.focusTags}>
                      {brand.focus.map(f => (
                        <span key={f} style={s.focusTag}>{f}</span>
                      ))}
                    </div>

                    <div style={s.cardFooter}>
                      <span style={s.brandMeta}>{brand.origin} · с {brand.founded}</span>
                      <span style={s.cardArrow} className="card-arrow">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <div style={s.statementGrid}>
            <motion.div {...fadeUp}>
              <p style={s.statementEyebrow}>МЫ НЕ ПРОДАЁМ ВСЕХ</p>
              <h2 style={s.sectionTitle}>
                Только те,<br />кто на улице
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} style={s.statementRight}>
              <p style={s.statementText}>
                HoopStore работает только с брендами, которые реально присутствуют в уличном баскетболе.
                Никаких «массмаркет»-подделок и дешёвых no-name — только то, в чём играют профессионалы и уличные игроки.
              </p>
              <div style={s.statementStats}>
                {[["9", "Брендов"], ["800+", "Товаров"], ["100%", "Оригинал"]].map(([v, l]) => (
                  <div key={l} style={s.sStat}>
                    <span style={s.sStatVal}>{v}</span>
                    <span style={s.sStatLabel}>{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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
          <h2 style={s.ctaTitle}>ВЫБЕРИ СВОЙ<br />БРЕНД</h2>
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

              {/* Modal header with brand color */}
              <div style={{ ...s.modalHeader, background: selected.color + "18", borderBottom: `1px solid ${selected.color}30` }}>
                <span style={{ ...s.modalInitial, color: selected.color }}>
                  {selected.name[0]}
                </span>
                <div>
                  <span style={s.modalTagLine}>{selected.tag}</span>
                  <h2 style={s.modalTitle}>{selected.name}</h2>
                  <p style={{ ...s.modalSlogan, color: selected.color }}>"{selected.slogan}"</p>
                </div>
              </div>

              <div style={s.modalBody}>
                <p style={s.modalDesc}>{selected.desc}</p>

                {/* Meta */}
                <div style={s.metaRow}>
                  {[
                    ["Основан", selected.founded],
                    ["Страна",  selected.origin],
                    ["Товаров", selected.skus],
                  ].map(([k, v]) => (
                    <div key={k} style={s.metaItem}>
                      <span style={s.metaKey}>{k}</span>
                      <span style={{ ...s.metaVal, color: k === "Товаров" ? "#ff7a00" : "#fff" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Athletes */}
                <p style={s.sectionSmall}>Атлеты</p>
                <div style={s.athletesList}>
                  {selected.athletes.map(a => (
                    <span key={a} style={s.athleteTag}>{a}</span>
                  ))}
                </div>

                {/* Focus */}
                <p style={s.sectionSmall}>Категории</p>
                <div style={s.focusTagsModal}>
                  {selected.focus.map(f => (
                    <span key={f} style={s.focusTagModal}>{f}</span>
                  ))}
                </div>

                <button
                  className="btn-primary"
                  style={s.btnPrimary}
                  onClick={() => { setSelected(null); navigate("/catalog"); }}
                >
                  Смотреть товары {selected.name}
                </button>
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px",
    lineHeight: 1.75, margin: "0 0 40px 0",
  },
  heroStats: {
    display: "flex", gap: 40,
    borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32,
  },
  heroStat: { display: "flex", flexDirection: "column", gap: 4 },
  heroStatVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "28px", fontWeight: 900, color: "#ff7a00", letterSpacing: "1px",
  },
  heroStatLabel: {
    fontSize: "11px", color: "rgba(255,255,255,0.3)",
    letterSpacing: "2px", textTransform: "uppercase",
  },

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
    transition: "border-color 0.2s, transform 0.2s",
  },
  cardAccent: { height: 4, width: "100%", flexShrink: 0 },
  cardInner: { padding: "24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 },
  cardTop: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
  },
  brandInitial: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "80px", fontWeight: 900, lineHeight: 1,
    letterSpacing: "-2px", userSelect: "none",
    transition: "color 0.2s",
  },
  cardTag: {
    background: "rgba(255,122,0,0.15)",
    border: "1px solid rgba(255,122,0,0.3)",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px",
    color: "#ff7a00", textTransform: "uppercase", flexShrink: 0, marginTop: 6,
  },
  brandName: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "28px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "2px", margin: 0, color: "#fff",
    marginTop: -16,
  },
  brandSlogan: {
    color: "rgba(255,255,255,0.2)", fontSize: "12px",
    fontStyle: "italic", margin: 0, letterSpacing: "0.5px",
  },
  brandDesc: {
    color: "rgba(255,255,255,0.35)", fontSize: "13px",
    lineHeight: 1.65, margin: 0,
  },
  focusTags: { display: "flex", flexWrap: "wrap", gap: 6 },
  focusTag: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "5px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px",
    color: "rgba(255,255,255,0.35)",
  },
  cardFooter: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginTop: "auto", paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  brandMeta: {
    color: "rgba(255,255,255,0.2)", fontSize: "11px",
    letterSpacing: "1px", textTransform: "uppercase",
  },
  cardArrow: {
    color: "rgba(255,255,255,0.2)",
    transition: "color 0.2s, transform 0.2s",
    display: "flex", alignItems: "center",
  },

  // STATEMENT
  statementGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
  },
  statementEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "4px",
    color: "#ff7a00", marginBottom: 16,
  },
  statementRight: {},
  statementText: {
    color: "rgba(255,255,255,0.4)", fontSize: "15px",
    lineHeight: 1.8, margin: "0 0 32px 0",
  },
  statementStats: { display: "flex", gap: 36 },
  sStat: { display: "flex", flexDirection: "column", gap: 4 },
  sStatVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "26px", fontWeight: 900, color: "#ff7a00",
  },
  sStatLabel: {
    fontSize: "11px", color: "rgba(255,255,255,0.3)",
    letterSpacing: "2px", textTransform: "uppercase",
  },

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
  modalHeader: {
    padding: "32px 28px 24px",
    display: "flex", alignItems: "center", gap: 20,
    borderRadius: "20px 20px 0 0",
  },
  modalInitial: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "72px", fontWeight: 900, lineHeight: 1,
    letterSpacing: "-2px", flexShrink: 0,
  },
  modalTagLine: {
    display: "block",
    fontSize: "10px", fontWeight: 700, letterSpacing: "3px",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 4,
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "28px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "2px", margin: "0 0 4px 0", color: "#fff",
  },
  modalSlogan: {
    fontSize: "12px", fontStyle: "italic", margin: 0, opacity: 0.8,
  },
  modalBody: { padding: "0 28px 32px" },
  modalDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "14px",
    lineHeight: 1.75, margin: "0 0 20px 0",
  },
  metaRow: {
    display: "flex", gap: 24, marginBottom: 20,
    padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  metaItem: { display: "flex", flexDirection: "column", gap: 3 },
  metaKey: {
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)",
  },
  metaVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "16px", fontWeight: 800,
  },
  sectionSmall: {
    fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)", margin: "0 0 10px 0",
  },
  athletesList: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  athleteTag: {
    background: "rgba(255,122,0,0.1)",
    border: "1px solid rgba(255,122,0,0.25)",
    borderRadius: "6px", padding: "5px 14px",
    fontSize: "12px", fontWeight: 700, color: "#ff7a00",
  },
  focusTagsModal: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  focusTagModal: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px", padding: "5px 14px",
    fontSize: "12px", fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
  },
  btnPrimary: {
    width: "100%", padding: "14px",
    background: "#ff7a00", border: "none", borderRadius: "10px", color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "14px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase",
    cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: 4,
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .brand-card:hover {
    border-color: #ff7a00 !important;
    transform: translateY(-3px);
  }
  .brand-card:hover .card-arrow {
    color: #ff7a00 !important;
    transform: translateX(4px);
  }
  .close-btn:hover { background: rgba(255,255,255,0.1) !important; }
  .close-btn:hover svg { stroke: #fff !important; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.38) !important; }
  .btn-primary:active { transform: translateY(0); }
  .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
  .filter-btn:hover { border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }
`;

export default Brands;