import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = () => {
    setError("");
    if (!email || !password) {
      setError("Заполни все поля");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) {
        navigate("/");
      } else {
        setError(result.error);
      }
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

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
            STREET<br />
            BASKETBALL<br />
            <span style={s.orange}>CULTURE</span>
          </h1>
          <p style={s.desc}>
            Экипировка для тех, кто вырос на площадке.<br />
            Не для витрин — для игры.
          </p>
        </div>

        {/* RIGHT — form */}
        <div style={s.right} className="slide-right">
          <h2 style={s.formTitle}>ВОЙТИ</h2>
          <p style={s.formSub}>
            Нет аккаунта?{" "}
            <span style={s.link} onClick={() => navigate("/register")}>
              Зарегистрироваться
            </span>
          </p>

          {/* Error */}
          {error && (
            <div style={s.errorBox}>
              <span style={s.errorIcon}>⚠</span>
              {error}
            </div>
          )}

          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onKeyDown={handleKeyDown}
              style={{
                ...s.input,
                borderColor: error && !email ? "#ef4444" : focused === "email" ? "#ff7a00" : "#1e1e1e",
                boxShadow: focused === "email" ? "0 0 0 3px rgba(255,122,0,0.18)" : "none",
              }}
            />
          </div>

          <div style={s.field}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label style={s.label}>Пароль</label>
              <span style={s.forgot}>Забыли пароль?</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                onKeyDown={handleKeyDown}
                style={{
                  ...s.input,
                  paddingRight: "46px",
                  borderColor: error && !password ? "#ef4444" : focused === "pass" ? "#ff7a00" : "#1e1e1e",
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
          </div>

          <button
            className="btn-primary"
            style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="spin">●</span> : "Войти в игру"}
          </button>

          <button
            className="btn-secondary"
            style={s.btnSecondary}
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </button>

          <div style={s.divider}>
            <div style={s.divLine} />
            <span style={s.divText}>или</span>
            <div style={s.divLine} />
          </div>

          <div style={s.socialRow}>
            {[
              { label: "Google", icon: <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { label: "VK",     icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="#5181b8"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.85 13.5h-1.56c-.59 0-.77-.47-1.83-1.55-.92-.9-1.33-.77-1.56-.77-.32 0-.41.09-.41.54v1.41c0 .39-.12.62-1.16.62-1.71 0-3.61-1.04-4.95-2.97-2.01-2.83-2.56-4.95-2.56-5.39 0-.23.09-.45.54-.45h1.56c.4 0 .55.18.71.6.78 2.26 2.1 4.24 2.64 4.24.2 0 .29-.09.29-.59V9.43c-.06-1.06-.62-1.15-.62-1.53 0-.18.15-.36.39-.36h2.46c.34 0 .46.18.46.57v3.06c0 .34.15.46.25.46.2 0 .37-.12.74-.49 1.15-1.29 1.97-3.27 1.97-3.27.11-.23.29-.45.68-.45h1.56c.47 0 .57.24.47.57-.2.92-2.1 3.6-2.1 3.6-.17.27-.23.39 0 .69.16.23.7.7 1.06 1.13.66.75 1.16 1.38 1.3 1.81.12.43-.11.65-.54.65z"/></svg> },
            ].map(so => (
              <button key={so.label} className="social-btn" style={s.socialBtn}>
                {so.icon}
                <span>{so.label}</span>
              </button>
            ))}
          </div>
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
    fontSize: "72px", fontWeight: "900",
    lineHeight: 1.0, letterSpacing: "1px", textTransform: "uppercase",
    margin: "0 0 20px 0", color: "#fff",
  },
  orange: { color: "#ff7a00" },
  desc: { color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.75 },
  right: { width: "380px", flexShrink: 0 },
  formTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "36px", fontWeight: "900", letterSpacing: "4px",
    textTransform: "uppercase", margin: "0 0 4px 0",
  },
  formSub: { color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: "0 0 20px 0" },
  link: { color: "#ff7a00", cursor: "pointer", fontWeight: "600" },
  errorBox: {
    display: "flex", alignItems: "center", gap: 10,
    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px", padding: "12px 16px",
    color: "#fca5a5", fontSize: "13px", fontWeight: 500,
    marginBottom: "16px",
  },
  errorIcon: { fontSize: "14px", flexShrink: 0 },
  field: { marginBottom: "16px" },
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
  forgot: { color: "#ff7a00", fontSize: "12px", cursor: "pointer", opacity: 0.8 },
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
  divider: { display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" },
  divLine: { flex: 1, height: "1px", background: "#1e1e1e" },
  divText: { color: "rgba(255,255,255,0.18)", fontSize: "12px" },
  socialRow: { display: "flex", gap: "10px" },
  socialBtn: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", padding: "11px", background: "#111",
    border: "1.5px solid #1e1e1e", borderRadius: "10px",
    color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: "600",
    fontFamily: "'Barlow', sans-serif", cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
  },
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
  .social-btn:hover { border-color: #ff7a00 !important; color: #fff !important; }
  .spin { display:inline-block; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default Login;