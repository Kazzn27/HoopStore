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

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const CATEGORIES = ["Все", "Колено", "Голень", "Запястье", "Налокотник", "Голеностоп"];

const ITEMS = [
  {
    id: 1,
    name: "McDavid Knee Sleeve",
    brand: "McDavid",
    price: 2100,
    tag: "Топ защита",
    category: "Колено",
    level: "Уровень 2",
    sizes: ["S", "M", "L", "XL"],
    img: "https://www.mcdavidusa.com/cdn/shop/files/MD5120-01_WristGuardAdjustable_hero-1000x1000-e8309f7_2000x.jpg?v=1741638600",
    description: "Наколенник McDavid уровня 2. Поддерживает колено при прыжках и разворотах. Тонкий неопрен — не мешает движению.",
    specs: [["Уровень защиты", "2"], ["Материал", "Неопрен"], ["Фиксация", "Компрессионная"]],
  },
  {
    id: 2,
    name: "Nike Pro Knee Pad",
    brand: "Nike",
    price: 1800,
    tag: "Хит",
    category: "Колено",
    level: "Уровень 1",
    sizes: ["S", "M", "L", "XL"],
    img: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2fb33159-02c9-4c11-bafc-be2aebab6ab6/NIKE+PRO+KNITTED+KNEE+SLEEVE.png",
    description: "Тонкий наколенник Nike Pro с вставкой из пены. Защищает от ударов при падениях на асфальте.",
    specs: [["Уровень защиты", "1"], ["Материал", "Polyester / пена"], ["Пол", "Унисекс"]],
  },
  {
    id: 3,
    name: "UA Compression Shin Guard",
    brand: "Under Armour",
    price: 1500,
    tag: "Новинка",
    category: "Голень",
    level: "Уровень 1",
    sizes: ["S", "M", "L"],
    img: "https://shop.sportsbasement.com/cdn/shop/files/100270286.Black.1.png?v=1717108612",
    description: "Компрессионная защита голени Under Armour. Усиленная вставка спереди, дышащая ткань по бокам.",
    specs: [["Уровень защиты", "1"], ["Материал", "HeatGear®"], ["Крепление", "Компрессия"]],
  },
  {
    id: 4,
    name: "Wrist Support Sleeve Adjustable Elastic",
    brand: "McDavid",
    price: 1200,
    tag: "Must have",
    category: "Запястье",
    level: "Уровень 2",
    sizes: ["S/M", "L/XL"],
    img: "https://mcdavid.eu/cdn/shop/products/mcdavid-wrist-support-sleeve-adjustable-elastic-513-627565.jpg?v=1754025402",
    description: "Защита запястья при падениях и жёстких бросках. Жёсткая вставка + мягкая подкладка. Обязательный элемент для уличного баскетбола.",
    specs: [["Уровень защиты", "2"], ["Материал", "Неопрен / пластик"], ["В наборе", "1 шт"]],
  },
  {
    id: 5,
    name: "Nike Elbow Sleeve",
    brand: "Nike",
    price: 1100,
    tag: "Комфорт",
    category: "Налокотник",
    level: "Уровень 1",
    sizes: ["S", "M", "L", "XL"],
    img: "https://sporthouse.sh/8998-large_default/nike-hyperstrong-padded-elbow-sleeve-black.jpg",
    description: "Налокотник Nike Pro из эластичной ткани. Компрессия и защита при падениях на асфальт.",
    specs: [["Уровень защиты", "1"], ["Материал", "Dri-FIT®"], ["Пол", "Унисекс"]],
  },
  {
    id: 6,
    name: "Zamst Ankle Guard A2-DX",
    brand: "Zamst",
    price: 3800,
    tag: "Премиум",
    category: "Голеностоп",
    level: "Уровень 3",
    sizes: ["S", "M", "L", "XL"],
    img: "https://zamst.us/cdn/shop/products/a2-dx_09.jpg?v=1623350376",
    description: "Профессиональный голеностоп Zamst уровня 3. Жёсткие боковые вставки предотвращают подворот лодыжки на неровном асфальте.",
    specs: [["Уровень защиты", "3"], ["Материал", "Неопрен / ABS"], ["Стабилизация", "Боковая"]],
  },
  {
    id: 7,
    name: "Under Armour Knee Guard",
    brand: "Under Armour",
    price: 2400,
    tag: "Улица",
    category: "Колено",
    level: "Уровень 2",
    sizes: ["S", "M", "L", "XL"],
    img: "https://m.media-amazon.com/images/I/819-YL-hiEL.jpg",
    description: "Усиленный наколенник UA для игры на асфальте. Двойная гелевая вставка поглощает удары при падениях.",
    specs: [["Уровень защиты", "2"], ["Материал", "HeatGear® / гель"], ["Фиксация", "Двойной ремень"]],
  },
  {
    id: 8,
    name: "Adidas Ankle Sleeve",
    brand: "Adidas",
    price: 1600,
    tag: "Сцепление",
    category: "Голеностоп",
    level: "Уровень 1",
    sizes: ["S", "M", "L"],
    img: "https://m.media-amazon.com/images/I/81+UeI0SUVL.jpg",
    description: "Лёгкая компрессионная защита голеностопа Adidas. Подходит для ежедневных тренировок и игр на улице.",
    specs: [["Уровень защиты", "1"], ["Материал", "Climacool®"], ["Крепление", "Компрессия"]],
  },
  {
    id: 9,
    name: "Shock Doctor Wristband",
    brand: "Shock Doctor",
    price: 950,
    tag: "Бюджет",
    category: "Запястье",
    level: "Уровень 1",
    sizes: ["One size"],
    img: "https://www.shockdoctor.com/cdn/shop/products/SD824-01_WristSupportStaysStraps_onBody-1.jpg?v=1670453849",
    description: "Бюджетная защита запястья от Shock Doctor. Эластичная фиксация, подходит для начинающих игроков.",
    specs: [["Уровень защиты", "1"], ["Материал", "Эластик"], ["Размер", "One size"]],
  },
];

const LEVEL_COLOR = { "Уровень 1": "#4ade80", "Уровень 2": "#ff7a00", "Уровень 3": "#ef4444" };

const SPECS_SECTION = [
  { num: "01", title: "Защищает",  text: "Усиленные вставки поглощают удары при падениях на асфальт." },
  { num: "02", title: "Фиксирует", text: "Компрессия и ремни удерживают суставы при резких движениях и разворотах." },
  { num: "03", title: "Дышит",     text: "Перфорированные материалы обеспечивают вентиляцию во время игры." },
];

const Protection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [added, setAdded]       = useState(null);
  const [filter, setFilter]     = useState("Все");
  const [pickedSize, setPickedSize] = useState(null);

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

  const openModal = (item) => {
    setSelected(item);
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
            HOOPSTORE / ЗАЩИТА
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            ЗАЩИТА<br /><span style={s.orange}>ДЛЯ ИГРЫ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Наколенники, налокотники, голеностопы —<br />
            играй жёстко и оставайся в строю.
          </motion.p>

          {/* Level legend */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={s.heroLegend}
          >
            {Object.entries(LEVEL_COLOR).map(([label, color]) => (
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
              Всё для защиты
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
                  onClick={() => openModal(item)}
                >
                  <span style={s.cardTag}>{item.tag}</span>
                  {/* Level badge */}
                  <span style={{ ...s.levelBadge, color: LEVEL_COLOR[item.level], borderColor: LEVEL_COLOR[item.level] + "40" }}>
                    {item.level}
                  </span>

                  <div style={s.cardImgWrap}>
                    <img src={item.img} alt={item.name} style={s.cardImg} />
                  </div>

                  <div style={s.cardBody}>
                    <p style={s.cardBrand}>{item.brand}</p>
                    <h3 style={s.cardName}>{item.name}</h3>
                    <p style={s.cardSub}>{item.category}</p>
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
            Играй жёстко — оставайся в строю
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
                  ...s.modalLevel,
                  color: LEVEL_COLOR[selected.level],
                  borderColor: LEVEL_COLOR[selected.level] + "50",
                  background: LEVEL_COLOR[selected.level] + "18",
                }}>
                  {selected.level}
                </span>
              </div>

              <div style={s.modalBody}>
                <p style={s.modalBrand}>{selected.brand}</p>
                <h2 style={s.modalTitle}>{selected.name}</h2>
                <p style={s.modalDesc}>{selected.description}</p>

                {/* Specs table */}
                <div style={s.specsTable}>
                  {selected.specs.map(([k, v]) => (
                    <div key={k} style={s.specsRow}>
                      <span style={s.specsKey}>{k}</span>
                      <span style={s.specsVal}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Size picker */}
                <p style={s.sizeLabel}>Размер</p>
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
                        minWidth: size.length > 2 ? "auto" : 44,
                        padding: size.length > 2 ? "0 14px" : "0",
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
                      opacity: pickedSize ? 1 : 0.4,
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 32px 0",
  },
  heroLegend: {
    display: "flex", gap: 24, alignItems: "center",
    borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28,
  },
  legendItem: { display: "flex", alignItems: "center", gap: 8 },
  legendDot: {
    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
  },
  legendLabel: {
    fontSize: "12px", color: "rgba(255,255,255,0.4)",
    letterSpacing: "1px",
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
  levelBadge: {
    position: "absolute", top: 14, right: 14,
    border: "1px solid",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
    zIndex: 1,
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
    letterSpacing: "0.5px", margin: "0 0 4px 0", color: "#fff",
  },
  cardSub: { color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0 },
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
  modalLevel: {
    position: "absolute", bottom: 14, left: 14,
    border: "1px solid",
    borderRadius: "6px", padding: "4px 12px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
    textTransform: "uppercase",
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
  specsTable: {
    background: "#0a0a0a", borderRadius: "10px",
    overflow: "hidden", marginBottom: 20,
    border: "1px solid rgba(255,255,255,0.07)",
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
  sizeLabel: {
    fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)", margin: "0 0 10px 0",
  },
  sizesRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  sizeBtn: {
    height: 40, border: "1.5px solid",
    borderRadius: "8px", cursor: "pointer",
    fontFamily: "'Barlow', sans-serif", fontSize: "13px", fontWeight: 700,
    transition: "all 0.2s", width: 44,
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
  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
  .size-btn:hover { border-color: #ff7a00 !important; color: #ff7a00 !important; }
  .filter-btn:hover { border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }
`;

export default Protection;