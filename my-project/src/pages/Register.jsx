import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm]         = useState({ name: "", email: "", password: "", confirm: "" });
  const [focused, setFocused]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState({});
  const [success, setSuccess]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name     = "Введи имя";
    if (!form.email.includes("@"))       e.email    = "Неверный email";
    if (form.password.length < 6)        e.password = "Минимум 6 символов";
    if (form.password !== form.confirm)  e.confirm  = "Пароли не совпадают";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      const result = register(form.name.trim(), form.email.trim(), form.password);
      setLoading(false);
      if (result.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 1800);
      } else {
        setErrors({ email: result.error });
      }
    }, 1400);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Слабый", color: "#ef4444", w: "30%" };
    if (p.length < 10 || !/\d/.test(p)) return { label: "Средний", color: "#ff7a00", w: "60%" };
    return { label: "Сильный", color: "#4ade80", w: "100%" };
  })();

  if (success) {
    return (
      <div style={s.root}>
        <style>{css}</style>
        <div style={s.successWrap} className="slide-right">
          <div style={s.successIcon}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
          <h2 style={s.successTitle}>ДОБРО ПОЖАЛОВАТЬ,<br />{form.name.toUpperCase()}!</h2>
          <p style={s.successSub}>Аккаунт создан. Переходим на главную…</p>
          <div style={s.successBar}>
            <div style={s.successBarFill} className="fill-bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* Ghost ball */}
      <div style={s.ghostBall}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="48" fill="#1c0f00" />
          <path d="M50 2 Q78 50 50 98" fill="none" stroke="#3d2000" strokeWidth="3.5" />
          <path d="M50 2 Q22 50 50 98" fill="none" stroke="#3d2000" strokeWidth="3.5" />
          <path d="M2 50 Q50 74 98 50" fill="none" stroke="#3d2000" strokeWidth="3.5" />
          <path d="M2 50 Q50 26 98 50" fill="none" stroke="#3d2000" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="#3d2000" strokeWidth="3.5" />
        </svg>
      </div>

      <div style={s.inner}>

        {/* LEFT */}
        <div style={s.left} className="slide-left">
          <div style={s.ballIcon}>
            <svg viewBox="0 0 100 100" width="52" height="52">
              <circle cx="50" cy="50" r="48" fill="#ff7a00" />
              <path d="M50 2 Q78 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
              <path d="M50 2 Q22 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
              <path d="M2 50 Q50 74 98 50" fill="none" stroke="#000" strokeWidth="6" />
              <path d="M2 50 Q50 26 98 50" fill="none" stroke="#000" strokeWidth="6" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="5" />
            </svg>
          </div>
          <h1 style={s.title}>
            СОЗДАЙ<br />
            СВОЙ<br />
            <span style={s.orange}>АККАУНТ</span>
          </h1>
          <p style={s.desc}>
            Регистрируйся и получи доступ к каталогу,<br />
            заказам и персональным скидкам.
          </p>

          {/* Perks */}
          <div style={s.perks}>
            {[
              "Быстрое оформление заказа",
              "История покупок",
              "Персональные скидки",
            ].map((perk, i) => (
              <div key={i} style={s.perk}>
                <span style={s.perkDot}>✓</span>
                <span style={s.perkText}>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — register form */}
        <div style={s.right} className="slide-right">
          <h2 style={s.formTitle}>РЕГИСТРАЦИЯ</h2>
          <p style={s.formSub}>
            Уже есть аккаунт?{" "}
            <span style={s.link} onClick={() => navigate("/login")}>
              Войти
            </span>
          </p>

          {/* Name */}
          <div style={s.field}>
            <label style={s.label}>Имя</label>
            <input
              type="text"
              placeholder="Твоё имя"
              value={form.name}
              onChange={handleChange("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleKeyDown}
              style={{
                ...s.input,
                borderColor: errors.name ? "#ef4444" : focused === "name" ? "#ff7a00" : "#1e1e1e",
                boxShadow: focused === "name" ? "0 0 0 3px rgba(255,122,0,0.18)" : "none",
              }}
            />
            {errors.name && <span style={s.fieldErr}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleKeyDown}
              style={{
                ...s.input,
                borderColor: errors.email ? "#ef4444" : focused === "email" ? "#ff7a00" : "#1e1e1e",
                boxShadow: focused === "email" ? "0 0 0 3px rgba(255,122,0,0.18)" : "none",
              }}
            />
            {errors.email && <span style={s.fieldErr}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={s.field}>
            <label style={s.label}>Пароль</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Минимум 6 символов"
                value={form.password}
                onChange={handleChange("password")}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                onKeyDown={handleKeyDown}
                style={{
                  ...s.input,
                  paddingRight: "46px",
                  borderColor: errors.password ? "#ef4444" : focused === "pass" ? "#ff7a00" : "#1e1e1e",
                  boxShadow: focused === "pass" ? "0 0 0 3px rgba(255,122,0,0.18)" : "none",
                }}
              />
              <button onClick={() => setShowPass(!showPass)} style={s.eye}>
                {showPass ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {/* Strength bar */}
            {strength && (
              <div style={s.strengthWrap}>
                <div style={s.strengthTrack}>
                  <div style={{ ...s.strengthFill, width: strength.w, background: strength.color }} />
                </div>
                <span style={{ ...s.strengthLabel, color: strength.color }}>{strength.label}</span>
              </div>
            )}
            {errors.password && <span style={s.fieldErr}>{errors.password}</span>}
          </div>

          {/* Confirm */}
          <div style={s.field}>
            <label style={s.label}>Повтори пароль</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange("confirm")}
              onFocus={() => setFocused("confirm")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleKeyDown}
              style={{
                ...s.input,
                borderColor: errors.confirm ? "#ef4444"
                  : form.confirm && form.confirm === form.password ? "#4ade80"
                  : focused === "confirm" ? "#ff7a00" : "#1e1e1e",
                boxShadow: focused === "confirm" ? "0 0 0 3px rgba(255,122,0,0.18)" : "none",
              }}
            />
            {errors.confirm && <span style={s.fieldErr}>{errors.confirm}</span>}
            {!errors.confirm && form.confirm && form.confirm === form.password && (
              <span style={{ ...s.fieldErr, color: "#4ade80" }}>✓ Пароли совпадают</span>
            )}
          </div>

          <button
            className="btn-primary"
            style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="spin">●</span> : "Создать аккаунт"}
          </button>

          <button
            className="btn-secondary"
            style={s.btnSecondary}
            onClick={() => navigate("/login")}
          >
            Уже есть аккаунт
          </button>
        </div>
      </div>
    </div>
  );
};

const s = {
  root: {
    minHeight: "100vh", background: "#0a0a0a",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Barlow', sans-serif", color: "#fff",
    position: "relative", overflow: "hidden", padding: "40px 24px",
  },
  ghostBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", width: "540px", height: "540px",
    pointerEvents: "none", zIndex: 0,
  },
  inner: {
    position: "relative", zIndex: 1,
    display: "flex", alignItems: "center", gap: "80px",
    width: "100%", maxWidth: "960px",
  },
  left: { flex: 1 },
  ballIcon: { marginBottom: "24px" },
  title: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "64px", fontWeight: "900",
    lineHeight: 1.0, letterSpacing: "1px", textTransform: "uppercase",
    margin: "0 0 20px 0", color: "#fff",
  },
  orange: { color: "#ff7a00" },
  desc: { color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.75, marginBottom: 28 },
  perks: { display: "flex", flexDirection: "column", gap: 10 },
  perk: { display: "flex", alignItems: "center", gap: 10 },
  perkDot: { color: "#ff7a00", fontSize: "14px", fontWeight: 800, flexShrink: 0 },
  perkText: { color: "rgba(255,255,255,0.35)", fontSize: "13px" },

  right: { width: "380px", flexShrink: 0 },
  formTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "36px", fontWeight: "900", letterSpacing: "4px",
    textTransform: "uppercase", margin: "0 0 4px 0",
  },
  formSub: { color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: "0 0 20px 0" },
  link: { color: "#ff7a00", cursor: "pointer", fontWeight: "600" },

  field: { marginBottom: "14px" },
  label: {
    display: "block", color: "rgba(255,255,255,0.35)",
    fontSize: "10px", letterSpacing: "2.5px",
    textTransform: "uppercase", marginBottom: "8px",
  },
  input: {
    width: "100%", background: "#111",
    border: "1.5px solid #1e1e1e", borderRadius: "10px",
    padding: "13px 16px", color: "#fff", fontSize: "15px",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box", fontFamily: "'Barlow', sans-serif",
  },
  eye: {
    position: "absolute", right: "12px", top: "50%",
    transform: "translateY(-50%)", background: "none",
    border: "none", cursor: "pointer", padding: "4px",
    display: "flex", alignItems: "center",
  },
  fieldErr: { display: "block", fontSize: "11px", color: "#fca5a5", marginTop: 5, letterSpacing: "0.3px" },

  strengthWrap: { display: "flex", alignItems: "center", gap: 10, marginTop: 8 },
  strengthTrack: { flex: 1, height: 3, background: "#1e1e1e", borderRadius: 4, overflow: "hidden" },
  strengthFill: { height: "100%", borderRadius: 4, transition: "width 0.3s, background 0.3s" },
  strengthLabel: { fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", flexShrink: 0 },

  btnPrimary: {
    width: "100%", padding: "14px", background: "#ff7a00",
    border: "none", borderRadius: "10px", color: "#000",
    fontSize: "15px", fontWeight: "900", letterSpacing: "2px",
    textTransform: "uppercase", cursor: "pointer",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    marginTop: "8px", marginBottom: "10px",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  btnSecondary: {
    width: "100%", padding: "13px", background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "10px",
    color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: "700",
    letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    transition: "border-color 0.2s, color 0.2s",
  },

  // Success screen
  successWrap: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 20, textAlign: "center", maxWidth: 400,
  },
  successIcon: {
    width: 80, height: 80, borderRadius: "50%",
    background: "rgba(255,122,0,0.1)", border: "1px solid rgba(255,122,0,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  successTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "30px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "2px", lineHeight: 1.15,
  },
  successSub: { color: "rgba(255,255,255,0.35)", fontSize: "14px" },
  successBar: {
    width: "100%", height: 3,
    background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden",
  },
  successBarFill: { height: "100%", background: "#ff7a00" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  input::placeholder { color: rgba(255,255,255,0.18); }

  .slide-left  { animation: sLeft  0.65s cubic-bezier(0.16,1,0.3,1) both; }
  .slide-right { animation: sRight 0.65s 0.08s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes sLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:none; } }
  @keyframes sRight { from { opacity:0; transform:translateX(28px);  } to { opacity:1; transform:none; } }

  .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.4); }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.35) !important; color: #fff !important; }
  .spin { display:inline-block; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .fill-bar { animation: fillBar 1.8s ease forwards; }
  @keyframes fillBar { from { width: 0; } to { width: 100%; } }
`;

export default Register;