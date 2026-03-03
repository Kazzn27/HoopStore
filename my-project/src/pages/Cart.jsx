import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ── SVG Icons ── */
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

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const PAYMENT_METHODS = [
  { id: "card",  label: "Банковская карта",  sub: "Visa / Mastercard / МИР" },
  { id: "tbank", label: "Т-Банк",            sub: "Оплата через приложение" },
  { id: "sber",  label: "СберПай",           sub: "Оплата через Сбербанк" },
  { id: "cash",  label: "Наличные",          sub: "При получении заказа" },
];

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ja 3",
      size: "US 10",
      price: 12500,
      quantity: 1,
      img: "https://cdn-images.farfetch-contents.com/31/62/85/14/31628514_60998469_1000.jpg",
    },
    {
      id: 2,
      name: "мяч баскетбольный WILSON Nba drv pro bskt sz7 размер 7",
      size: "Size 7",
      price: 3200,
      quantity: 1,
      img: "https://admin.di-sport.uz/storage/thumbnails/galleries/22420/PDu1A5cq6OMaAjaX4wwvxK8b73PCszE61PB1FI1o-large.webp",
    },
  ]);

  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading]             = useState(false);
  const [success, setSuccess]             = useState(false);
  const [focused, setFocused]             = useState(null);
  const [cardData, setCardData]           = useState({ number: "", name: "", expiry: "", cvv: "" });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const changeQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleInput = (e) => setCardData({ ...cardData, [e.target.name]: e.target.value });

  const handleCardPayment = () => {
    if (cardData.number.length < 16 || !cardData.name || cardData.expiry.length < 5 || cardData.cvv.length < 3) {
      return;
    }
    simulatePayment();
  };

  const simulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCartItems([]);
    }, 2500);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div style={s.header}>
        <div style={s.container}>
          <p style={s.eyebrow}>HOOPSTORE / КОРЗИНА</p>
          <h1 style={s.pageTitle}>
            ТВОЯ <span style={s.orange}>КОРЗИНА</span>
          </h1>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={s.container}>
        <div style={s.layout}>

          {/* LEFT — items */}
          <div style={s.itemsCol}>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={s.emptyState}
              >
                <BallSVG size={80} color="#1c1c1c" lines="#2a2a2a" />
                <p style={s.emptyText}>Корзина пуста</p>
                <button className="btn-primary" style={s.btnPrimary} onClick={() => navigate("/catalog")}>
                  В каталог
                </button>
              </motion.div>
            ) : (
              <AnimatePresence>
                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={s.cartItem}
                  >
                    {/* Image */}
                    <div style={s.itemImg}>
                      <img src={item.img} alt={item.name} style={s.img} />
                    </div>

                    {/* Info */}
                    <div style={s.itemInfo}>
                      <h3 style={s.itemName}>{item.name}</h3>
                      <span style={s.itemSize}>{item.size}</span>
                    </div>

                    {/* Qty */}
                    <div style={s.qtyRow}>
                      <button className="qty-btn" style={s.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                      <span style={s.qtyNum}>{item.quantity}</span>
                      <button className="qty-btn" style={s.qtyBtn} onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>

                    {/* Price + remove */}
                    <div style={s.itemRight}>
                      <span style={s.itemPrice}>{(item.price * item.quantity).toLocaleString()} ₽</span>
                      <button
                        className="remove-btn"
                        style={s.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* RIGHT — summary */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={s.summary}
            >
              <p style={s.summaryTitle}>ИТОГО</p>

              <div style={s.summaryRows}>
                {cartItems.map(item => (
                  <div key={item.id} style={s.summaryRow}>
                    <span style={s.summaryRowLabel}>{item.name} × {item.quantity}</span>
                    <span style={s.summaryRowVal}>{(item.price * item.quantity).toLocaleString()} ₽</span>
                  </div>
                ))}
                <div style={s.summaryDivider} />
                <div style={s.summaryRow}>
                  <span style={s.summaryRowLabel}>Доставка</span>
                  <span style={{ ...s.summaryRowVal, color: "#4ade80" }}>Бесплатно</span>
                </div>
              </div>

              <div style={s.summaryTotal}>
                <span style={s.summaryTotalLabel}>К оплате</span>
                <span style={s.summaryTotalVal}>{totalPrice.toLocaleString()} ₽</span>
              </div>

              <button
                className="btn-primary"
                style={s.btnPrimary}
                onClick={() => setIsModalOpen(true)}
              >
                Перейти к оплате
              </button>

              <button
                className="btn-secondary"
                style={s.btnSecondary}
                onClick={() => navigate("/catalog")}
              >
                Продолжить покупки
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── PAYMENT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={s.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget && !loading) setIsModalOpen(false); }}
          >
            <motion.div
              style={s.modal}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              {!success ? (
                <>
                  <div style={s.modalHeader}>
                    <h2 style={s.modalTitle}>ОПЛАТА</h2>
                    <span style={s.modalTotal}>{totalPrice.toLocaleString()} ₽</span>
                  </div>

                  <p style={s.modalSub}>Способ оплаты</p>

                  {/* Methods */}
                  <div style={s.methodsGrid}>
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        className="method-btn"
                        style={{
                          ...s.methodBtn,
                          borderColor: selectedMethod === m.id ? "#ff7a00" : "rgba(255,255,255,0.08)",
                          background: selectedMethod === m.id ? "rgba(255,122,0,0.08)" : "#0f0f0f",
                        }}
                        onClick={() => setSelectedMethod(m.id)}
                      >
                        <span style={s.methodLabel}>{m.label}</span>
                        <span style={s.methodSub}>{m.sub}</span>
                        {selectedMethod === m.id && (
                          <div style={s.methodDot} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Card form */}
                  {selectedMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={s.cardForm}
                    >
                      <div style={s.formDivider} />
                      {[
                        { name: "number", placeholder: "Номер карты", maxLength: 16, type: "text", full: true },
                        { name: "name",   placeholder: "Имя владельца", type: "text", full: true },
                      ].map((field) => (
                        <input
                          key={field.name}
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          onChange={handleInput}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...s.input,
                            borderColor: focused === field.name ? "#ff7a00" : "rgba(255,255,255,0.08)",
                            boxShadow: focused === field.name ? "0 0 0 3px rgba(255,122,0,0.15)" : "none",
                          }}
                        />
                      ))}
                      <div style={{ display: "flex", gap: 10 }}>
                        {[
                          { name: "expiry", placeholder: "MM/YY", maxLength: 5, type: "text" },
                          { name: "cvv",    placeholder: "CVV",   maxLength: 3, type: "password" },
                        ].map((field) => (
                          <input
                            key={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            maxLength={field.maxLength}
                            onChange={handleInput}
                            onFocus={() => setFocused(field.name)}
                            onBlur={() => setFocused(null)}
                            style={{
                              ...s.input,
                              flex: 1,
                              borderColor: focused === field.name ? "#ff7a00" : "rgba(255,255,255,0.08)",
                              boxShadow: focused === field.name ? "0 0 0 3px rgba(255,122,0,0.15)" : "none",
                            }}
                          />
                        ))}
                      </div>
                      <button
                        className="btn-primary"
                        style={{ ...s.btnPrimary, marginTop: 4 }}
                        onClick={handleCardPayment}
                        disabled={loading}
                      >
                        {loading ? <span className="spin">●</span> : `Оплатить ${totalPrice.toLocaleString()} ₽`}
                      </button>
                    </motion.div>
                  )}

                  {(selectedMethod === "tbank" || selectedMethod === "sber") && (
                    <button
                      className="btn-primary"
                      style={{ ...s.btnPrimary, marginTop: 16 }}
                      onClick={simulatePayment}
                      disabled={loading}
                    >
                      {loading ? <span className="spin">●</span> : "Перейти в банк"}
                    </button>
                  )}

                  {selectedMethod === "cash" && (
                    <button
                      className="btn-primary"
                      style={{ ...s.btnPrimary, marginTop: 16 }}
                      onClick={simulatePayment}
                      disabled={loading}
                    >
                      {loading ? <span className="spin">●</span> : "Подтвердить заказ"}
                    </button>
                  )}

                  {!loading && (
                    <button
                      className="btn-secondary"
                      style={{ ...s.btnSecondary, marginTop: 10 }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Отмена
                    </button>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={s.successBox}
                >
                  <CheckIcon />
                  <h2 style={s.successTitle}>ОПЛАТА ПРОШЛА!</h2>
                  <p style={s.successDesc}>Твой заказ принят. Скоро выйдешь на площадку. 🏀</p>
                  <button
                    className="btn-primary"
                    style={s.btnPrimary}
                    onClick={() => { setIsModalOpen(false); setSuccess(false); navigate("/"); }}
                  >
                    На главную
                  </button>
                </motion.div>
              )}
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
    paddingBottom: 96,
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 48px",
  },
  orange: { color: "#ff7a00" },

  // HEADER
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "64px 0 48px",
    marginBottom: 48,
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "#ff7a00",
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(48px, 7vw, 80px)",
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: 0,
    color: "#fff",
  },

  // LAYOUT
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: 32,
    alignItems: "start",
  },
  itemsCol: { display: "flex", flexDirection: "column", gap: 12 },

  // CART ITEM
  cartItem: {
    background: "#0f0f0f",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  itemImg: {
    width: 72,
    height: 72,
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    background: "#1a1a1a",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  itemInfo: { flex: 1 },
  itemName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "18px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 4px 0",
    color: "#fff",
  },
  itemSize: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "12px",
    letterSpacing: "1px",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#1a1a1a",
    borderRadius: "8px",
    padding: "6px 12px",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0 2px",
    lineHeight: 1,
    transition: "color 0.15s",
  },
  qtyNum: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#fff",
    minWidth: 20,
    textAlign: "center",
  },
  itemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
    flexShrink: 0,
  },
  itemPrice: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "20px",
    fontWeight: 900,
    color: "#ff7a00",
    letterSpacing: "0.5px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.2)",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    transition: "color 0.15s",
  },

  // EMPTY
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: "80px 0",
  },
  emptyText: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },

  // SUMMARY
  summary: {
    background: "#0f0f0f",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    position: "sticky",
    top: 80,
  },
  summaryTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "rgba(255,255,255,0.3)",
    marginBottom: 20,
  },
  summaryRows: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  summaryRowLabel: { color: "rgba(255,255,255,0.38)", fontSize: "13px" },
  summaryRowVal: { color: "#fff", fontSize: "14px", fontWeight: 600 },
  summaryDivider: { height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0" },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: "1.5px solid rgba(255,255,255,0.07)",
    paddingTop: 18,
    marginTop: 4,
    marginBottom: 20,
  },
  summaryTotalLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "3px",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
  },
  summaryTotalVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "30px",
    fontWeight: 900,
    color: "#ff7a00",
    letterSpacing: "1px",
  },

  // BUTTONS
  btnPrimary: {
    width: "100%",
    padding: "14px",
    background: "#ff7a00",
    border: "none",
    borderRadius: "10px",
    color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "15px",
    fontWeight: 900,
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  btnSecondary: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: 10,
    transition: "border-color 0.2s, color 0.2s",
  },

  // MODAL
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 24,
  },
  modal: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: 460,
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "28px",
    fontWeight: 900,
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
  },
  modalTotal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "22px",
    fontWeight: 900,
    color: "#ff7a00",
  },
  modalSub: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  methodsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 4,
  },
  methodBtn: {
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "14px 16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    textAlign: "left",
    position: "relative",
    transition: "border-color 0.2s, background 0.2s",
  },
  methodLabel: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
  },
  methodSub: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "11px",
  },
  methodDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#ff7a00",
  },
  formDivider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    margin: "16px 0",
  },
  cardForm: { display: "flex", flexDirection: "column", gap: 10 },
  input: {
    width: "100%",
    background: "#0a0a0a",
    border: "1.5px solid",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Barlow', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },

  // SUCCESS
  successBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: "16px 0",
    textAlign: "center",
  },
  successTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "32px",
    fontWeight: 900,
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
    color: "#fff",
  },
  successDesc: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "15px",
    margin: "0 0 8px 0",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.38) !important; }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }

  .qty-btn:hover { color: #ff7a00 !important; }
  .remove-btn:hover { color: rgba(255,80,80,0.7) !important; }

  input::placeholder { color: rgba(255,255,255,0.2); }
`;

export default Cart;