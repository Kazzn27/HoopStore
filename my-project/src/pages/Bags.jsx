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

const CATEGORIES = ["Все", "Nike", "Jordan", "Adidas", "Under Armour", "Spalding"];

const COLORS = [
  { label: "Чёрный",   hex: "#1a1a1a" },
  { label: "Серый",    hex: "#4b5563" },
  { label: "Оранжевый",hex: "#ff7a00" },
  { label: "Синий",    hex: "#1d4ed8" },
];

const ITEMS = [
  {
    id: 1,
    name: "Nike Hoops Elite Pro",
    brand: "Nike",
    price: 7200,
    tag: "Хит",
    volume: "38 л",
    ballPocket: true,
    img: "https://www.sportpoint.lt/images/uploader/ni/780x780.g/nike-hoops-elite-pro-backpack-7.png?v=1765961201",
    description: "Флагманский баскетбольный рюкзак Nike. Отдельный карман для мяча, влажных вещей и ноутбука. Мягкие лямки с вентиляцией.",
    specs: [["Объём", "38 л"], ["Карман для мяча", "Да"], ["Ноутбук", "до 15\""], ["Материал", "Полиэстер 600D"]],
  },
  {
    id: 2,
    name: "Nike Brasilia 9.5 XL",
    brand: "Nike",
    price: 4800,
    tag: "Бестселлер",
    volume: "30 л",
    ballPocket: false,
    img: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c34d55f6-1caf-4486-99d1-87365103b1e6/NK+BRSLA+XL+BKPK+-+9.5+%2830L%29.png",
    description: "Объёмный рюкзак Nike Brasilia XL для ежедневных тренировок. Усиленное дно, удобный органайзер спереди.",
    specs: [["Объём", "30 л"], ["Карман для мяча", "Нет"], ["Ноутбук", "до 13\""], ["Материал", "Полиэстер"]],
  },
  {
    id: 3,
    name: "Jordan Jumpman Pro",
    brand: "Jordan",
    price: 8900,
    tag: "Легенда",
    volume: "32 л",
    ballPocket: true,
    img: "https://media.jdsports.com/i/finishline/MA9155_014_P1?bg=rgb%28237%2C237%2C237%29&fmt=auto&w=1600&h=1600",
    description: "Рюкзак Jordan с культовым Jumpman на кармане. Отдельный сетчатый карман для мяча сбоку, мягкая спинка Air Mesh.",
    specs: [["Объём", "32 л"], ["Карман для мяча", "Сетка сбоку"], ["Ноутбук", "до 15\""], ["Материал", "Полиэстер Ripstop"]],
  },
  {
    id: 4,
    name: "Jordan Velocity Pack",
    brand: "Jordan",
    price: 6400,
    tag: "Стиль",
    volume: "28 л",
    ballPocket: false,
    img: "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw6bd3bd5f/nk/da3/9/1/a/9/7/da391a97_d3d2_45ee_806f_8c627ffa713d.png?sw=700&sh=700&sm=fit&q=100&strip=false",
    description: "Стильный рюкзак Jordan для улицы и площадки. Отделение для формы, передний карман на молнии с органайзером.",
    specs: [["Объём", "28 л"], ["Карман для мяча", "Нет"], ["Ноутбук", "до 13\""], ["Материал", "800D Polyester"]],
  },
  {
    id: 5,
    name: "Adidas Court Lite 3",
    brand: "Adidas",
    price: 5600,
    tag: "Практично",
    volume: "26 л",
    ballPocket: false,
    img: "https://www.charlesclinkard.co.uk/images/products/1719478761-80472300.jpg",
    description: "Рюкзак Adidas Court Lite из переработанного полиэстера. Лёгкий, компактный, с мягкой спинкой и боковыми карманами.",
    specs: [["Объём", "26 л"], ["Карман для мяча", "Нет"], ["Ноутбук", "до 13\""], ["Материал", "Recycled Polyester"]],
  },
  {
    id: 6,
    name: "Adidas Tiro League BP",
    brand: "Adidas",
    price: 4200,
    tag: "Выгодно",
    volume: "33 л",
    ballPocket: false,
    img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/d4830c986d84481391b2a00e6b99578f_9366/Tiro_23_League_Backpack_Blue_IB8646_27_model.jpg",
    description: "Просторный рюкзак Adidas Tiro с вентилируемым карманом для формы. Два боковых кармана для бутылок.",
    specs: [["Объём", "33 л"], ["Карман для формы", "Да"], ["Ноутбук", "Нет"], ["Материал", "Полиэстер"]],
  },
  {
    id: 7,
    name: "Under Armour Contain 4.0",
    brand: "Under Armour",
    price: 6800,
    tag: "Прочность",
    volume: "35 л",
    ballPocket: true,
    img: "https://threadfellows.com/cdn/shop/files/under-armour-bags-under-armour-contain-backpack-31072918568983.jpg?v=1706974630",
    description: "Рюкзак UA Contain 4.0 с карманом для мяча и влагоотводящим отделением для формы. Лямки UA AirVent для вентиляции.",
    specs: [["Объём", "35 л"], ["Карман для мяча", "Да"], ["Ноутбук", "до 15\""], ["Материал", "UA Storm 210D"]],
  },
  {
    id: 8,
    name: "Under Armour Hustle 5.0",
    brand: "Under Armour",
    price: 5100,
    tag: "Надёжный",
    volume: "29 л",
    ballPocket: false,
    img: "https://static.ftshp.digital/img/p/4/6/7/1/5/8/467158-full_product.jpg",
    description: "Легендарная серия Hustle от UA. Усиленное дно, карман HeatGear для влажной формы, ручка сверху для переноски.",
    specs: [["Объём", "29 л"], ["Карман для формы", "Да (HeatGear)"], ["Ноутбук", "до 15\""], ["Материал", "UA Storm Ripstop"]],
  },
  {
    id: 9,
    name: "Spalding Essential Pro",
    brand: "Spalding",
    price: 3600,
    tag: "Классика",
    volume: "24 л",
    ballPocket: true,
    img: "https://m.media-amazon.com/images/I/81xW1J8pPuL.jpg",
    description: "Классический баскетбольный рюкзак Spalding. Сетчатый карман для мяча, вышитый логотип, два отделения.",
    specs: [["Объём", "24 л"], ["Карман для мяча", "Сетка"], ["Ноутбук", "Нет"], ["Материал", "600D Polyester"]],
  },
];

const Bags = () => {
  const navigate = useNavigate();
  const [selected, setSelected]   = useState(null);
  const [added, setAdded]         = useState(null);
  const [filter, setFilter]       = useState("Все");
  const [pickedColor, setPickedColor] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const filtered = filter === "Все" ? ITEMS : ITEMS.filter(i => i.brand === filter);

  const handleAdd = (e, id) => {
    e.stopPropagation();
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  const openModal = (item) => {
    setSelected(item);
    setPickedColor(null);
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
            HOOPSTORE / РЮКЗАКИ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            РЮКЗАКИ<br /><span style={s.orange}>ДЛЯ ИГРОКОВ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Nike, Jordan, Adidas, Under Armour, Spalding —<br />
            только баскетбольные бренды, только улица.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={s.heroBadge}
          >
            <span style={s.heroBadgeIcon}>🏀</span>
            <span style={s.heroBadgeText}>Карман для мяча · до 38 л · 5 брендов</span>
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
              Все рюкзаки
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
                  {item.ballPocket && (
                    <span style={s.ballBadge}>🏀 Карман</span>
                  )}

                  <div style={s.cardImgWrap}>
                    <img src={item.img} alt={item.name} style={s.cardImg} />
                  </div>

                  <div style={s.cardBody}>
                    <p style={s.cardBrand}>{item.brand}</p>
                    <h3 style={s.cardName}>{item.name}</h3>
                    <p style={s.cardSub}>{item.volume}</p>
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

      {/* ── SPECS SECTION ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            Бери — и на площадку
          </motion.h2>
          <div style={s.specsGrid}>
            {[
              { num: "01", title: "Мяч внутри",    text: "Отдельный сетчатый или нижний карман — мяч всегда с тобой и не мешает вещам." },
              { num: "02", title: "Форма отдельно", text: "Изолированный отсек для влажной формы и кроссовок после тренировки." },
              { num: "03", title: "На спине",       text: "Вентилируемые лямки и мягкая спинка — носить комфортно хоть целый день." },
            ].map((spec, i) => (
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
                {selected.ballPocket && (
                  <span style={s.modalBallBadge}>🏀 Карман для мяча</span>
                )}
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

                {/* Color picker */}
                <p style={s.pickerLabel}>Цвет</p>
                <div style={s.colorsRow}>
                  {COLORS.map(c => (
                    <button
                      key={c.label}
                      title={c.label}
                      className="color-btn"
                      style={{
                        ...s.colorBtn,
                        background: c.hex,
                        outline: pickedColor === c.label ? "2px solid #ff7a00" : "2px solid transparent",
                        outlineOffset: "3px",
                      }}
                      onClick={() => setPickedColor(c.label)}
                    />
                  ))}
                  {pickedColor && <span style={s.pickedLabel}>{pickedColor}</span>}
                </div>

                <div style={s.modalFooter}>
                  <span style={s.modalPrice}>{selected.price.toLocaleString()} ₽</span>
                  <button
                    className="btn-primary"
                    style={{
                      ...s.btnPrimary,
                      opacity: pickedColor ? 1 : 0.4,
                      cursor: pickedColor ? "pointer" : "default",
                    }}
                    onClick={() => { if (pickedColor) { setSelected(null); navigate("/cart"); } }}
                  >
                    {pickedColor ? "В корзину" : "Выбери цвет"}
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 28px 0",
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.2)",
    borderRadius: "8px", padding: "10px 18px",
  },
  heroBadgeIcon: { fontSize: "16px" },
  heroBadgeText: { color: "rgba(255,255,255,0.45)", fontSize: "13px", letterSpacing: "0.5px" },

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
  ballBadge: {
    position: "absolute", top: 14, right: 14,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 600,
    color: "rgba(255,255,255,0.5)", zIndex: 1,
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
    letterSpacing: "0.5px", margin: "0 0 6px 0", color: "#fff",
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
  modalBallBadge: {
    position: "absolute", bottom: 14, left: 14,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
    borderRadius: "6px", padding: "4px 12px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
    color: "rgba(255,255,255,0.7)",
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
  pickerLabel: {
    fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)", margin: "0 0 10px 0",
  },
  colorsRow: {
    display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
  },
  colorBtn: {
    width: 28, height: 28, borderRadius: "50%", border: "none",
    cursor: "pointer", flexShrink: 0, transition: "outline 0.15s, transform 0.15s",
  },
  pickedLabel: {
    fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginLeft: 4,
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
  .color-btn:hover { transform: scale(1.15); }
`;

export default Bags;