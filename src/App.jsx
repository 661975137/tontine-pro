import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM — Palette Afro-Finance, typo Syne + DM Sans
// ============================================================
const DS = {
  colors: {
    bg: "#0A0A0F",
    surface: "#12121A",
    card: "#1A1A26",
    cardHover: "#1E1E2E",
    border: "#2A2A3E",
    accent: "#F5A623",
    accentDim: "#F5A62322",
    accentHover: "#FFB84D",
    green: "#2ECC8A",
    greenDim: "#2ECC8A22",
    red: "#E74C5E",
    redDim: "#E74C5E22",
    blue: "#4A90E2",
    blueDim: "#4A90E222",
    purple: "#9B6DFF",
    purpleDim: "#9B6DFF22",
    text: "#F0EFE9",
    textMuted: "#8B8AA0",
    textDim: "#5A596E",
  },
};

// ============================================================
// GLOBAL STYLES
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #0A0A0F;
    --surface: #12121A;
    --card: #1A1A26;
    --border: #2A2A3E;
    --accent: #F5A623;
    --green: #2ECC8A;
    --red: #E74C5E;
    --text: #F0EFE9;
    --muted: #8B8AA0;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .syne { font-family: 'Syne', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px #F5A62344; }
    50% { box-shadow: 0 0 40px #F5A62366, 0 0 80px #F5A62322; }
  }

  .animate-fadeUp { animation: fadeUp 0.5s ease forwards; }
  .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
  .animate-glow { animation: glow 2s ease-in-out infinite; }

  .btn-primary {
    background: linear-gradient(135deg, #F5A623, #FFB84D);
    color: #0A0A0F;
    border: none;
    border-radius: 10px;
    padding: 12px 24px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;
  }
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px #F5A62344;
  }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-ghost:hover {
    background: #1A1A26;
    color: var(--text);
    border-color: #3A3A5E;
  }

  .input-field {
    background: #12121A;
    border: 1px solid #2A2A3E;
    border-radius: 10px;
    padding: 12px 16px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    width: 100%;
    transition: all 0.2s ease;
    outline: none;
  }
  .input-field:focus {
    border-color: #F5A623;
    box-shadow: 0 0 0 3px #F5A62322;
  }
  .input-field::placeholder { color: var(--muted); }

  .card {
    background: #1A1A26;
    border: 1px solid #2A2A3E;
    border-radius: 16px;
    transition: all 0.2s ease;
  }
  .card:hover { border-color: #3A3A5E; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .badge-green { background: #2ECC8A22; color: #2ECC8A; border: 1px solid #2ECC8A33; }
  .badge-amber { background: #F5A62322; color: #F5A623; border: 1px solid #F5A62333; }
  .badge-red { background: #E74C5E22; color: #E74C5E; border: 1px solid #E74C5E33; }
  .badge-blue { background: #4A90E222; color: #4A90E2; border: 1px solid #4A90E233; }
  .badge-purple { background: #9B6DFF22; color: #9B6DFF; border: 1px solid #9B6DFF33; }

  .progress-bar {
    background: #2A2A3E;
    border-radius: 999px;
    overflow: hidden;
    height: 6px;
  }
  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #F5A623, #FFB84D);
    transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .divider {
    border: none;
    border-top: 1px solid #2A2A3E;
    margin: 0;
  }

  .tooltip {
    position: relative;
  }
  .tooltip:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #2A2A3E;
    color: var(--text);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 100;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;
    color: var(--muted);
    font-size: 14px;
    font-weight: 500;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }
  .nav-item:hover { background: #1A1A26; color: var(--text); }
  .nav-item.active { background: #F5A62322; color: #F5A623; }
  .nav-item.active svg { color: #F5A623; }

  .stat-card {
    background: #1A1A26;
    border: 1px solid #2A2A3E;
    border-radius: 16px;
    padding: 20px;
    transition: all 0.2s ease;
  }
  .stat-card:hover {
    border-color: #F5A62344;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px #0008;
  }

  .table-row {
    display: grid;
    padding: 14px 20px;
    border-bottom: 1px solid #2A2A3E;
    transition: background 0.15s ease;
    align-items: center;
  }
  .table-row:hover { background: #1E1E2E; }
  .table-row:last-child { border-bottom: none; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: #000000CC;
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
    padding: 20px;
  }
  .modal-content {
    background: #12121A;
    border: 1px solid #2A2A3E;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    animation: fadeUp 0.3s ease;
  }

  .tab {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
    background: transparent;
    color: var(--muted);
  }
  .tab.active {
    background: #F5A62322;
    color: #F5A623;
  }
  .tab:hover:not(.active) { color: var(--text); background: #1A1A26; }

  .avatar {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    flex-shrink: 0;
  }

  select.input-field {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B8AA0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
`;

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_USER = {
  id: "u1",
  name: "Konan Yves-Marie",
  email: "yves@tontine.ci",
  phone: "+225 07 12 34 56",
  avatar: "KY",
  plan: "pro",
  totalSaved: 2850000,
  pendingReceive: 450000,
  activeTontines: 3,
  completedTontines: 7,
  creditScore: 94,
  joinedAt: "2024-01-15",
};

const MOCK_TONTINES = [
  {
    id: "t1",
    name: "Tontine Commerçants Adjamé",
    emoji: "🏪",
    type: "fixe",
    amount: 50000,
    frequency: "mensuel",
    members: 12,
    maxMembers: 12,
    myPosition: 7,
    currentRound: 5,
    totalRounds: 12,
    nextDate: "2026-06-15",
    nextRecipient: "Adjoua Marie",
    status: "active",
    myContributions: 250000,
    totalPot: 600000,
    startDate: "2026-01-15",
    endDate: "2026-12-15",
    admin: "Koffi Bernard",
    isAdmin: false,
    color: "#F5A623",
    lastActivity: "Cotisation de Tour 5 collectée",
    paid: true,
  },
  {
    id: "t2",
    name: "Groupe Famille Diabaté",
    emoji: "👨‍👩‍👧‍👦",
    type: "aleatoire",
    amount: 25000,
    frequency: "bimensuel",
    members: 8,
    maxMembers: 10,
    myPosition: 3,
    currentRound: 2,
    totalRounds: 10,
    nextDate: "2026-06-10",
    nextRecipient: "Vous",
    status: "active",
    myContributions: 50000,
    totalPot: 200000,
    startDate: "2026-05-01",
    endDate: "2026-10-01",
    admin: "Vous",
    isAdmin: true,
    color: "#2ECC8A",
    lastActivity: "Nouveau membre: Awa Coulibaly",
    paid: false,
  },
  {
    id: "t3",
    name: "Investissement Startup CI",
    emoji: "🚀",
    type: "encheres",
    amount: 100000,
    frequency: "mensuel",
    members: 6,
    maxMembers: 6,
    myPosition: 2,
    currentRound: 1,
    totalRounds: 6,
    nextDate: "2026-06-20",
    nextRecipient: "En cours d'enchère",
    status: "active",
    myContributions: 100000,
    totalPot: 600000,
    startDate: "2026-06-01",
    endDate: "2026-11-01",
    admin: "Diallo Ibrahim",
    isAdmin: false,
    color: "#9B6DFF",
    lastActivity: "Enchère ouverte pour Tour 1",
    paid: true,
  },
];

const MOCK_TRANSACTIONS = [
  { id: "tx1", type: "cotisation", tontine: "Tontine Commerçants Adjamé", amount: -50000, date: "2026-06-01", status: "success", round: 5 },
  { id: "tx2", type: "reception", tontine: "Groupe Famille Diabaté", amount: 200000, date: "2026-05-15", status: "success", round: 2 },
  { id: "tx3", type: "cotisation", tontine: "Investissement Startup CI", amount: -100000, date: "2026-06-01", status: "success", round: 1 },
  { id: "tx4", type: "cotisation", tontine: "Tontine Commerçants Adjamé", amount: -50000, date: "2026-05-01", status: "success", round: 4 },
  { id: "tx5", type: "penalite", tontine: "Groupe Famille Diabaté", amount: -5000, date: "2026-05-02", status: "success", round: 1 },
  { id: "tx6", type: "cotisation", tontine: "Investissement Startup CI", amount: -100000, date: "2026-05-01", status: "pending", round: 1 },
];

const MOCK_MEMBERS = [
  { id: "m1", name: "Koffi Bernard", avatar: "KB", position: 1, status: "paid", score: 98, phone: "+225 05 XX XX XX" },
  { id: "m2", name: "Adjoua Marie", avatar: "AM", position: 2, status: "paid", score: 95, phone: "+225 07 XX XX XX" },
  { id: "m3", name: "Sékou Traoré", avatar: "ST", position: 3, status: "paid", score: 87, phone: "+225 01 XX XX XX" },
  { id: "m4", name: "Fatou Koné", avatar: "FK", position: 4, status: "paid", score: 91, phone: "+225 05 XX XX XX" },
  { id: "m5", name: "Yves-Marie K.", avatar: "KY", position: 7, status: "paid", score: 94, phone: "+225 07 12 34 56", isMe: true },
  { id: "m6", name: "Awa Coulibaly", avatar: "AC", position: 8, status: "unpaid", score: 72, phone: "+225 01 XX XX XX" },
  { id: "m7", name: "Bamba Diallo", avatar: "BD", position: 9, status: "paid", score: 89, phone: "+225 07 XX XX XX" },
  { id: "m8", name: "N'goran Hervé", avatar: "NH", position: 10, status: "late", score: 61, phone: "+225 05 XX XX XX" },
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "payment_due", title: "Cotisation due dans 3 jours", message: "Groupe Famille Diabaté — 25 000 F CFA avant le 10 juin", time: "Il y a 1h", read: false, icon: "⚠️" },
  { id: "n2", type: "received", title: "Vous avez reçu la mise!", message: "200 000 F CFA crédités — Groupe Famille Diabaté Tour 2", time: "Il y a 2j", read: false, icon: "🎉" },
  { id: "n3", type: "member_joined", title: "Nouveau membre", message: "Awa Coulibaly a rejoint Groupe Famille Diabaté", time: "Il y a 3j", read: true, icon: "👋" },
  { id: "n4", type: "reminder", title: "Rappel: Enchère en cours", message: "Investissement Startup CI — Soumettez votre enchère", time: "Il y a 4j", read: true, icon: "🔔" },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const formatCFA = (amount) => {
  const abs = Math.abs(amount);
  if (abs >= 1000000) return `${(abs / 1000000).toFixed(1)}M F`;
  if (abs >= 1000) return `${(abs / 1000).toFixed(0)}k F`;
  return `${abs.toLocaleString()} F`;
};

const formatCFAFull = (amount) => {
  return `${Math.abs(amount).toLocaleString("fr-FR")} F CFA`;
};

// ============================================================
// ICONS (SVG inline)
// ============================================================
const Icon = ({ name, size = 18, color = "currentColor", style = {} }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    group: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    wallet: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={style}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    arrow_right: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    arrow_up: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
    arrow_down: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={style}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    crown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={style}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  };
  return icons[name] || null;
};

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage({ onEnterApp }) {
  const [hovered, setHovered] = useState(null);

  const features = [
    { icon: "🔒", title: "100% Sécurisé", desc: "Blockchain de traçabilité + contrats numériques signés" },
    { icon: "⚡", title: "Paiement Instantané", desc: "Mobile Money, Wave, Orange Money, virement bancaire" },
    { icon: "📊", title: "Analytics Complet", desc: "Tableau de bord temps réel, historique et prévisions" },
    { icon: "🤝", title: "Gestion des Litiges", desc: "Système d'arbitrage intégré et médiateur certifié" },
    { icon: "🌍", title: "Multi-devises", desc: "F CFA, EUR, USD — transactions internationales" },
    { icon: "🤖", title: "IA Anti-fraude", desc: "Score de crédit comportemental et détection d'anomalies" },
  ];

  const stats = [
    { value: "12k+", label: "Membres actifs" },
    { value: "2.8Mds", label: "F CFA gérés" },
    { value: "1 200+", label: "Tontines actives" },
    { value: "99.7%", label: "Taux de remboursement" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: DS.colors.bg, overflowX: "hidden" }}>
      {/* Header */}
      <header style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${DS.colors.border}`, position: "sticky", top: 0, background: `${DS.colors.bg}EE`, backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #F5A623, #FFB84D)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🪙</div>
          <span className="syne" style={{ fontSize: 20, fontWeight: 800, color: DS.colors.text }}>TontinePro</span>
          <span className="badge badge-amber" style={{ fontSize: 9 }}>BETA</span>
        </div>
        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>Connexion</button>
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }} onClick={onEnterApp}>Commencer gratuit</button>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: "100px 40px 80px", textAlign: "center", maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse at center, #F5A62318 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="badge badge-amber" style={{ marginBottom: 24, fontSize: 11 }}>
          🌍 Conçu pour l'Afrique de l'Ouest
        </div>

        <h1 className="syne" style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, background: "linear-gradient(135deg, #F0EFE9 30%, #F5A623 70%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          La Tontine Traditionnelle<br />Réinventée pour le Numérique
        </h1>

        <p style={{ fontSize: 18, color: DS.colors.textMuted, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Créez et gérez vos tontines en quelques clics. Sécurisé, transparent, automatisé. 
          Fini les carnets papier et les malentendus.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary animate-glow" style={{ padding: "14px 32px", fontSize: 16 }} onClick={onEnterApp}>
            Voir la démo →
          </button>
          <button className="btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }}>
            En savoir plus
          </button>
        </div>

        {/* Social proof */}
        <div style={{ marginTop: 48, display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
          {["AB", "KF", "DM", "ST", "YK"].map((a, i) => (
            <div key={i} className="avatar" style={{ width: 32, height: 32, background: `hsl(${i * 60 + 20}, 60%, 40%)`, fontSize: 11, color: "white", marginLeft: i > 0 ? -8 : 0, border: `2px solid ${DS.colors.bg}`, zIndex: 5 - i }}>{a}</div>
          ))}
          <span style={{ marginLeft: 12, fontSize: 13, color: DS.colors.textMuted }}>
            <strong style={{ color: DS.colors.text }}>12 000+</strong> membres nous font confiance
          </span>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "40px", borderTop: `1px solid ${DS.colors.border}`, borderBottom: `1px solid ${DS.colors.border}`, background: DS.colors.surface }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div className="syne" style={{ fontSize: 32, fontWeight: 800, color: DS.colors.accent }}>{s.value}</div>
              <div style={{ fontSize: 13, color: DS.colors.textMuted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 16 }}>Tout ce dont vous avez besoin</h2>
        <p style={{ textAlign: "center", color: DS.colors.textMuted, marginBottom: 48 }}>Une plateforme complète, pas un simple outil</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: 24, cursor: "default", borderColor: hovered === i ? "#F5A62344" : DS.colors.border, transform: hovered === i ? "translateY(-4px)" : "none", boxShadow: hovered === i ? "0 12px 40px #0008" : "none", transition: "all 0.2s ease" }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: DS.colors.textMuted, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 40px", textAlign: "center", background: DS.colors.surface, borderTop: `1px solid ${DS.colors.border}` }}>
        <h2 className="syne" style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Prêt à moderniser<br />votre tontine ?</h2>
        <p style={{ color: DS.colors.textMuted, marginBottom: 32, fontSize: 16 }}>Gratuit jusqu'à 10 membres. Aucune carte bancaire requise.</p>
        <button className="btn-primary animate-glow" style={{ padding: "16px 40px", fontSize: 17 }} onClick={onEnterApp}>
          Lancer la démo →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 40px", borderTop: `1px solid ${DS.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🪙</span>
          <span className="syne" style={{ fontWeight: 700, fontSize: 16 }}>TontinePro</span>
        </div>
        <div style={{ fontSize: 12, color: DS.colors.textDim }}>© 2026 TontinePro · Abidjan, Côte d'Ivoire · Tous droits réservés</div>
        <div style={{ fontSize: 12, color: DS.colors.textDim, display: "flex", gap: 16 }}>
          <span style={{ cursor: "pointer" }}>CGU</span>
          <span style={{ cursor: "pointer" }}>Confidentialité</span>
          <span style={{ cursor: "pointer" }}>Support</span>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ active, setActive, user, notifCount }) {
  const navItems = [
    { id: "dashboard", icon: "home", label: "Tableau de bord" },
    { id: "tontines", icon: "group", label: "Mes Tontines" },
    { id: "wallet", icon: "wallet", label: "Portefeuille" },
    { id: "notifications", icon: "bell", label: "Notifications", badge: notifCount },
    { id: "profile", icon: "user", label: "Mon Profil" },
  ];

  return (
    <aside style={{ width: 220, background: DS.colors.surface, borderRight: `1px solid ${DS.colors.border}`, display: "flex", flexDirection: "column", padding: "20px 12px", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px 24px" }}>
        <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #F5A623, #FFB84D)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🪙</div>
        <span className="syne" style={{ fontSize: 17, fontWeight: 800 }}>TontinePro</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {navItems.map((item) => (
          <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
            <span style={{ position: "relative" }}>
              <Icon name={item.icon} size={17} />
              {item.badge > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: DS.colors.red, borderRadius: "50%", width: 14, height: 14, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white" }}>{item.badge}</span>
              )}
            </span>
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Plan badge */}
        <div style={{ background: "#F5A62311", border: "1px solid #F5A62333", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Icon name="crown" size={13} color={DS.colors.accent} />
            <span style={{ fontSize: 11, fontWeight: 700, color: DS.colors.accent, fontFamily: "Syne" }}>PRO</span>
          </div>
          <div style={{ fontSize: 11, color: DS.colors.textMuted }}>Tontines illimitées</div>
          <div style={{ fontSize: 11, color: DS.colors.textMuted }}>IA anti-fraude activée</div>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderTop: `1px solid ${DS.colors.border}`, paddingTop: 16, marginTop: 4 }}>
          <div className="avatar" style={{ width: 34, height: 34, background: "linear-gradient(135deg, #F5A623, #E8860C)", fontSize: 12, color: "#0A0A0F" }}>{user.avatar}</div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name.split(" ")[0]} {user.name.split(" ")[1]?.[0]}.</div>
            <div style={{ fontSize: 10, color: DS.colors.textMuted }}>Admin</div>
          </div>
          <button onClick={() => setActive("profile")} style={{ background: "transparent", border: "none", cursor: "pointer", color: DS.colors.textMuted, padding: 4 }}>
            <Icon name="settings" size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function DashboardPage({ user, tontines, transactions, setActive }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);

  const upcomingPayments = tontines.filter(t => !t.paid);
  const totalExpected = tontines.reduce((s, t) => s + (t.paid ? 0 : t.amount), 0);

  const activityData = [65, 78, 82, 70, 91, 85, 94];
  const barMax = 100;

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
              Bonjour, {user.name.split(" ")[1]} 👋
            </h1>
            <p style={{ color: DS.colors.textMuted, fontSize: 14 }}>Dimanche 7 juin 2026 · Voici votre résumé</p>
          </div>
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }} onClick={() => setActive("tontines")}>
            <Icon name="plus" size={15} color="#0A0A0F" />
            Créer une tontine
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Épargne totale", value: formatCFAFull(user.totalSaved), icon: "📈", color: DS.colors.green, sub: "+12% ce trimestre" },
          { label: "À recevoir", value: formatCFAFull(user.pendingReceive), icon: "⏳", color: DS.colors.accent, sub: "Tour prochain: 10 juin" },
          { label: "Tontines actives", value: user.activeTontines, icon: "🤝", color: DS.colors.blue, sub: `${user.completedTontines} complétées` },
          { label: "Score de crédit", value: `${user.creditScore}/100`, icon: "⭐", color: DS.colors.purple, sub: "Excellent · Top 5%" },
        ].map((kpi, i) => (
          <div key={i} className="stat-card" style={{ animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{kpi.icon}</span>
              <span style={{ fontSize: 11, color: kpi.color, background: `${kpi.color}22`, padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>+</span>
            </div>
            <div className="syne" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, color: DS.colors.text }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: DS.colors.textMuted, marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 11, color: kpi.color }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 16 }}>
        {/* Tontines actives */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="syne" style={{ fontSize: 16, fontWeight: 700 }}>Mes Tontines</h2>
            <button onClick={() => setActive("tontines")} style={{ background: "transparent", border: "none", cursor: "pointer", color: DS.colors.accent, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              Voir tout <Icon name="arrow_right" size={13} color={DS.colors.accent} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tontines.map((t, i) => (
              <div key={t.id} style={{ background: DS.colors.bg, border: `1px solid ${DS.colors.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.15s ease", animation: `fadeUp 0.4s ease ${i * 0.1 + 0.2}s both` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#3A3A5E"}
                onMouseLeave={e => e.currentTarget.style.borderColor = DS.colors.border}
                onClick={() => setActive("tontine_detail")}>
                <div style={{ width: 42, height: 42, background: `${t.color}22`, border: `1px solid ${t.color}44`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{t.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      {t.isAdmin && <span className="badge badge-purple" style={{ fontSize: 9 }}>Admin</span>}
                      <span className={`badge ${t.paid ? "badge-green" : "badge-amber"}`} style={{ fontSize: 9 }}>{t.paid ? "✓ Payé" : "⚠ Dû"}</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: DS.colors.textMuted }}>Tour {t.currentRound}/{t.totalRounds}</span>
                      <span style={{ fontSize: 12, color: DS.colors.textMuted }}>{formatCFA(t.amount)}/mois</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(t.currentRound / t.totalRounds) * 100}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}CC)` }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{t.members}/{t.maxMembers} membres · Prochain: {t.nextDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Alert paiement */}
          {upcomingPayments.length > 0 && (
            <div style={{ background: "#F5A62311", border: "1px solid #F5A62333", borderRadius: 14, padding: 18 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Cotisation en attente</div>
                  <div style={{ fontSize: 12, color: DS.colors.textMuted }}>{upcomingPayments[0].name}</div>
                </div>
              </div>
              <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: DS.colors.accent, marginBottom: 12 }}>{formatCFAFull(upcomingPayments[0].amount)}</div>
              <div style={{ fontSize: 12, color: DS.colors.textMuted, marginBottom: 14 }}>Due le {upcomingPayments[0].nextDate}</div>
              <button className="btn-primary" style={{ width: "100%", padding: "11px", fontSize: 13 }}>
                Payer maintenant →
              </button>
            </div>
          )}

          {/* Activity mini chart */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="syne" style={{ fontSize: 14, fontWeight: 700 }}>Activité (7j)</h3>
              <span className="badge badge-green" style={{ fontSize: 9 }}>+8%</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 60 }}>
              {activityData.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${(v / barMax) * 60}px`, background: i === activityData.length - 1 ? "linear-gradient(180deg, #F5A623, #E8860C)" : "#2A2A3E", borderRadius: "4px 4px 0 0", transition: "height 0.5s ease" }} />
                  <span style={{ fontSize: 9, color: DS.colors.textDim }}>
                    {["L", "M", "M", "J", "V", "S", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Score de crédit */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 className="syne" style={{ fontSize: 14, fontWeight: 700 }}>Score Confiance</h3>
              <Icon name="shield" size={16} color={DS.colors.purple} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", width: 60, height: 60 }}>
                <svg viewBox="0 0 60 60" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="30" cy="30" r="25" fill="none" stroke={DS.colors.border} strokeWidth="5" />
                  <circle cx="30" cy="30" r="25" fill="none" stroke={DS.colors.purple} strokeWidth="5"
                    strokeDasharray={`${(user.creditScore / 100) * 157} 157`}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="syne" style={{ fontSize: 14, fontWeight: 800, color: DS.colors.purple }}>{user.creditScore}</span>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>Excellent</div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>Meilleur que 95% des membres</div>
                <div style={{ fontSize: 11, color: DS.colors.purple, marginTop: 4 }}>↑ +3 ce mois</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 className="syne" style={{ fontSize: 16, fontWeight: 700 }}>Transactions récentes</h2>
          <button onClick={() => setActive("wallet")} style={{ background: "transparent", border: "none", cursor: "pointer", color: DS.colors.accent, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            Tout voir <Icon name="arrow_right" size={13} color={DS.colors.accent} />
          </button>
        </div>
        <div>
          {transactions.slice(0, 4).map((tx, i) => (
            <div key={tx.id} className="table-row" style={{ gridTemplateColumns: "36px 1fr auto auto", animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: tx.type === "reception" ? DS.colors.greenDim : tx.type === "penalite" ? DS.colors.redDim : DS.colors.accentDim }}>
                {tx.type === "reception" ? "💰" : tx.type === "penalite" ? "⚠️" : "💸"}
              </div>
              <div style={{ paddingLeft: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{tx.type === "reception" ? "Réception" : tx.type === "penalite" ? "Pénalité retard" : "Cotisation"} — Tour {tx.round}</div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{tx.tontine} · {tx.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === "reception" ? DS.colors.green : DS.colors.red }}>
                  {tx.type === "reception" ? "+" : "-"}{formatCFAFull(tx.amount)}
                </div>
              </div>
              <div>
                <span className={`badge ${tx.status === "success" ? "badge-green" : tx.status === "pending" ? "badge-amber" : "badge-red"}`} style={{ fontSize: 9 }}>
                  {tx.status === "success" ? "✓" : tx.status === "pending" ? "..." : "✗"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TONTINES LIST PAGE
// ============================================================
function TontinesPage({ tontines, setActive, setSelectedTontine }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = tontines.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || (tab === "admin" && t.isAdmin) || (tab === "member" && !t.isAdmin);
    return matchSearch && matchTab;
  });

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Mes Tontines</h1>
          <p style={{ color: DS.colors.textMuted, fontSize: 14 }}>{tontines.length} tontines · {tontines.filter(t => !t.paid).length} cotisations dues</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <Icon name="link" size={14} />
            Rejoindre
          </button>
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }} onClick={() => setShowCreate(true)}>
            <Icon name="plus" size={14} color="#0A0A0F" />
            Créer
          </button>
        </div>
      </div>

      {/* Search & filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input className="input-field" placeholder="Rechercher une tontine..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 40 }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: DS.colors.textMuted, fontSize: 14 }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 4, background: DS.colors.surface, padding: 4, borderRadius: 10, border: `1px solid ${DS.colors.border}` }}>
          {[{ id: "all", label: "Toutes" }, { id: "admin", label: "Admin" }, { id: "member", label: "Membre" }].map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((t, i) => (
          <div key={t.id} className="card" style={{ padding: 20, cursor: "pointer", animation: `fadeUp 0.4s ease ${i * 0.08}s both`, position: "relative", overflow: "hidden" }}
            onClick={() => { setSelectedTontine(t); setActive("tontine_detail"); }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.color + "66"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px #0008"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = DS.colors.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {/* Color accent top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}66)` }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, background: `${t.color}22`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{t.emoji}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {t.isAdmin && <span className="badge badge-purple" style={{ fontSize: 9 }}>Admin</span>}
                <span className={`badge ${t.paid ? "badge-green" : "badge-amber"}`} style={{ fontSize: 9 }}>{t.paid ? "✓ Payé" : "⚠ Dû"}</span>
              </div>
            </div>

            <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
            <p style={{ fontSize: 12, color: DS.colors.textMuted, marginBottom: 14 }}>{t.members}/{t.maxMembers} membres · {t.frequency}</p>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: DS.colors.textMuted, marginBottom: 6 }}>
                <span>Tour {t.currentRound}/{t.totalRounds}</span>
                <span style={{ fontWeight: 600, color: t.color }}>{formatCFA(t.amount)}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(t.currentRound / t.totalRounds) * 100}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}AA)` }} />
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${DS.colors.border}`, paddingTop: 12, fontSize: 11, color: DS.colors.textMuted }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Pot actuel: <strong style={{ color: DS.colors.text }}>{formatCFA(t.totalPot)}</strong></span>
                <span>📅 {t.nextDate}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <div className="card" style={{ padding: 20, cursor: "pointer", borderStyle: "dashed", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 200 }}
          onClick={() => setShowCreate(true)}
          onMouseEnter={e => { e.currentTarget.style.borderColor = DS.colors.accent + "66"; e.currentTarget.style.background = DS.colors.accentDim; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = DS.colors.border; e.currentTarget.style.background = DS.colors.card; }}>
          <div style={{ width: 48, height: 48, background: DS.colors.accentDim, border: `1px dashed ${DS.colors.accent}66`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="plus" size={20} color={DS.colors.accent} />
          </div>
          <div className="syne" style={{ fontWeight: 700, fontSize: 14, color: DS.colors.accent }}>Créer une tontine</div>
          <div style={{ fontSize: 12, color: DS.colors.textMuted, textAlign: "center" }}>Invitez vos membres et commencez</div>
        </div>
      </div>

      {showCreate && <CreateTontineModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

// ============================================================
// CREATE TONTINE MODAL
// ============================================================
function CreateTontineModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", emoji: "🤝", type: "fixe", amount: "", frequency: "mensuel",
    maxMembers: 10, minMembers: 3, description: "", penaltyRate: 10,
    startDate: "", rules: []
  });

  const types = [
    { id: "fixe", label: "Fixe", desc: "Ordre prédéfini à la création", icon: "📋" },
    { id: "aleatoire", label: "Aléatoire", desc: "Tirage au sort à chaque tour", icon: "🎲" },
    { id: "encheres", label: "Enchères", desc: "Le plus offrant reçoit la mise", icon: "🏆" },
    { id: "solidaire", label: "Solidaire", desc: "Besoin urgent = priorité automatique", icon: "❤️" },
  ];

  const emojis = ["🤝", "💼", "🏪", "👨‍👩‍👧‍👦", "🚀", "💰", "🌍", "⚡", "🎯", "🏆"];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: 540 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 className="syne" style={{ fontSize: 20, fontWeight: 800 }}>Nouvelle Tontine</h2>
            <p style={{ fontSize: 13, color: DS.colors.textMuted }}>Étape {step} sur 3</p>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: DS.colors.textMuted, padding: 4 }}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="progress-bar" style={{ marginBottom: 28, height: 3 }}>
          <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>EMOJI</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {emojis.map(e => (
                  <button key={e} onClick={() => setForm({ ...form, emoji: e })}
                    style={{ width: 40, height: 40, border: `1px solid ${form.emoji === e ? DS.colors.accent : DS.colors.border}`, borderRadius: 8, fontSize: 20, cursor: "pointer", background: form.emoji === e ? DS.colors.accentDim : "transparent", transition: "all 0.15s" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>NOM DE LA TONTINE</label>
              <input className="input-field" placeholder="Ex: Tontine Commerçants Adjamé" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>TYPE DE TONTINE</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {types.map(t => (
                  <button key={t.id} onClick={() => setForm({ ...form, type: t.id })}
                    style={{ padding: "12px 14px", border: `1px solid ${form.type === t.id ? DS.colors.accent : DS.colors.border}`, borderRadius: 10, background: form.type === t.id ? DS.colors.accentDim : "transparent", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: form.type === t.id ? DS.colors.accent : DS.colors.text }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>COTISATION PAR TOUR</label>
                <div style={{ position: "relative" }}>
                  <input className="input-field" type="number" placeholder="50 000" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} style={{ paddingRight: 60 }} />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: DS.colors.textMuted }}>F CFA</span>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>FRÉQUENCE</label>
                <select className="input-field" value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })}>
                  <option value="hebdo">Hebdomadaire</option>
                  <option value="bimensuel">Bimensuel</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="trimestriel">Trimestriel</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>MEMBRES MAX</label>
                <input className="input-field" type="number" min="2" max="50" value={form.maxMembers} onChange={e => setForm({ ...form, maxMembers: e.target.value })} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>PÉNALITÉ RETARD</label>
                <div style={{ position: "relative" }}>
                  <input className="input-field" type="number" value={form.penaltyRate} onChange={e => setForm({ ...form, penaltyRate: e.target.value })} style={{ paddingRight: 40 }} />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: DS.colors.textMuted }}>%</span>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>DATE DE DÉMARRAGE</label>
              <input className="input-field" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            </div>
            {form.amount && (
              <div style={{ background: DS.colors.greenDim, border: "1px solid #2ECC8A33", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, color: DS.colors.green, fontWeight: 600, marginBottom: 6 }}>📊 Estimation</div>
                <div style={{ fontSize: 13, color: DS.colors.textMuted }}>
                  Pot total par tour: <strong style={{ color: DS.colors.text }}>{formatCFAFull(parseInt(form.amount || 0) * parseInt(form.maxMembers))}</strong>
                </div>
                <div style={{ fontSize: 13, color: DS.colors.textMuted }}>
                  Durée totale: <strong style={{ color: DS.colors.text }}>{form.maxMembers} {form.frequency === "mensuel" ? "mois" : "tours"}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ background: DS.colors.bg, borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 Récapitulatif</h3>
              {[
                { label: "Nom", value: form.name || "Non défini" },
                { label: "Type", value: form.type },
                { label: "Cotisation", value: `${parseInt(form.amount || 0).toLocaleString()} F CFA/${form.frequency}` },
                { label: "Membres max", value: form.maxMembers },
                { label: "Pénalité", value: `${form.penaltyRate}%` },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${DS.colors.border}` : "none" }}>
                  <span style={{ color: DS.colors.textMuted, fontSize: 13 }}>{r.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: DS.colors.textMuted }}>RÈGLES ADDITIONNELLES (optionnel)</label>
              <textarea className="input-field" rows={3} placeholder="Ex: Tout retard de plus de 5 jours entraîne une pénalité automatique..." style={{ resize: "vertical" }} />
            </div>
            <div style={{ background: DS.colors.accentDim, border: "1px solid #F5A62333", borderRadius: 10, padding: 14, fontSize: 12, color: DS.colors.textMuted }}>
              <Icon name="info" size={13} color={DS.colors.accent} style={{ display: "inline", marginRight: 6 }} />
              En créant cette tontine, vous acceptez les CGU TontinePro. Un contrat numérique sera généré automatiquement.
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {step > 1 && <button className="btn-ghost" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>← Retour</button>}
          {step < 3
            ? <button className="btn-primary" onClick={() => setStep(s => s + 1)} style={{ flex: 1 }}>Continuer →</button>
            : <button className="btn-primary" onClick={onClose} style={{ flex: 1 }}>🚀 Créer la tontine</button>
          }
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TONTINE DETAIL PAGE
// ============================================================
function TontineDetailPage({ tontine, setActive }) {
  const [tab, setTab] = useState("overview");
  const t = tontine || MOCK_TONTINES[0];

  const tabs = ["overview", "membres", "historique", "parametres"];
  const tabLabels = { overview: "Vue d'ensemble", membres: "Membres", historique: "Historique", parametres: "Paramètres" };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: 13, color: DS.colors.textMuted }}>
        <button onClick={() => setActive("tontines")} style={{ background: "transparent", border: "none", cursor: "pointer", color: DS.colors.textMuted, fontSize: 13 }}>Mes Tontines</button>
        <Icon name="arrow_right" size={13} />
        <span style={{ color: DS.colors.text }}>{t.name}</span>
      </div>

      {/* Header card */}
      <div className="card" style={{ padding: 24, marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${t.color}, ${t.color}44)` }} />
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${t.color}11, transparent)`, pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 56, height: 56, background: `${t.color}22`, border: `1px solid ${t.color}44`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{t.emoji}</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <h1 className="syne" style={{ fontSize: 22, fontWeight: 800 }}>{t.name}</h1>
                {t.isAdmin && <span className="badge badge-purple">Admin</span>}
                <span className="badge badge-green">Active</span>
              </div>
              <div style={{ fontSize: 13, color: DS.colors.textMuted }}>{t.members}/{t.maxMembers} membres · {t.frequency} · Admin: {t.admin}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!t.paid && (
              <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
                💸 Payer {formatCFA(t.amount)}
              </button>
            )}
            <button className="btn-ghost" style={{ padding: "10px 14px" }}>
              <Icon name="send" size={15} />
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${DS.colors.border}` }}>
          {[
            { label: "Pot actuel", value: formatCFA(t.totalPot), color: t.color },
            { label: "Ma cotisation", value: formatCFA(t.amount), color: DS.colors.text },
            { label: "Tour actuel", value: `${t.currentRound}/${t.totalRounds}`, color: DS.colors.text },
            { label: "Ma position", value: `#${t.myPosition}`, color: t.myPosition <= 3 ? DS.colors.accent : DS.colors.text },
            { label: "Prochain bénéficiaire", value: t.nextRecipient === "Vous" ? "🎉 Vous!" : t.nextRecipient, color: t.nextRecipient === "Vous" ? DS.colors.green : DS.colors.text },
          ].map((stat, i) => (
            <div key={i}>
              <div className="syne" style={{ fontSize: 18, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: DS.colors.textMuted, marginBottom: 6 }}>
            <span>Progression globale</span>
            <span>{Math.round((t.currentRound / t.totalRounds) * 100)}% complété</span>
          </div>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-fill" style={{ width: `${(t.currentRound / t.totalRounds) * 100}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}AA)` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: DS.colors.surface, padding: 4, borderRadius: 10, border: `1px solid ${DS.colors.border}`, width: "fit-content" }}>
        {tabs.map(tab_id => (
          <button key={tab_id} className={`tab ${tab === tab_id ? "active" : ""}`} onClick={() => setTab(tab_id)}>{tabLabels[tab_id]}</button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          {/* Rounds timeline */}
          <div className="card" style={{ padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Calendrier des tours</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {Array.from({ length: t.totalRounds }, (_, i) => i + 1).slice(0, 8).map((round, i) => {
                const isPast = round < t.currentRound;
                const isCurrent = round === t.currentRound;
                const member = MOCK_MEMBERS[i % MOCK_MEMBERS.length];
                return (
                  <div key={round} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 7 ? `1px solid ${DS.colors.border}` : "none", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${isPast ? DS.colors.green : isCurrent ? t.color : DS.colors.border}`, background: isPast ? DS.colors.greenDim : isCurrent ? `${t.color}22` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: isPast ? DS.colors.green : isCurrent ? t.color : DS.colors.textMuted, flexShrink: 0 }}>
                        {isPast ? "✓" : round}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? DS.colors.text : isPast ? DS.colors.textMuted : DS.colors.text }}>
                          Tour {round} {member.isMe ? "— 🎯 Vous" : `— ${member.name}`}
                        </span>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: isPast ? DS.colors.green : isCurrent ? t.color : DS.colors.textMuted }}>{formatCFA(t.amount * t.members)}</span>
                          {isCurrent && <span className="badge badge-amber" style={{ fontSize: 9 }}>En cours</span>}
                          {isPast && <span className="badge badge-green" style={{ fontSize: 9 }}>✓ Distribué</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Next action */}
            <div style={{ background: `${t.color}11`, border: `1px solid ${t.color}33`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.color, letterSpacing: 1, marginBottom: 10, fontFamily: "Syne" }}>PROCHAINE ACTION</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{t.nextRecipient === "Vous" ? "🎉" : "📅"}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.nextRecipient === "Vous" ? "Vous recevez la mise!" : `${t.nextRecipient} reçoit`}</div>
                  <div style={{ fontSize: 12, color: DS.colors.textMuted }}>Le {t.nextDate}</div>
                </div>
              </div>
              <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: t.color, marginBottom: 12 }}>{formatCFAFull(t.totalPot)}</div>
              {!t.paid && (
                <button className="btn-primary" style={{ width: "100%", padding: "11px", fontSize: 13 }}>
                  Payer ma cotisation →
                </button>
              )}
            </div>

            {/* Invite */}
            {t.members < t.maxMembers && (
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🔗 Inviter des membres</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: DS.colors.bg, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: DS.colors.textMuted, border: `1px solid ${DS.colors.border}`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    tontinepro.ci/join/T2X9K
                  </div>
                  <button className="btn-ghost" style={{ padding: "8px 12px", fontSize: 12 }}>
                    <Icon name="copy" size={13} />
                  </button>
                </div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted, marginTop: 8 }}>
                  {t.maxMembers - t.members} place(s) restante(s)
                </div>
              </div>
            )}

            {/* Last activity */}
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>⚡ Activité récente</div>
              {[
                { icon: "💸", text: "Sékou Traoré a payé sa cotisation", time: "Il y a 2h" },
                { icon: "✅", text: "Tour 4 distribué à Fatou Koné", time: "Il y a 1j" },
                { icon: "⚠️", text: "Rappel envoyé à Awa Coulibaly", time: "Il y a 2j" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < 2 ? `1px solid ${DS.colors.border}` : "none" }}>
                  <span>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 12 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: DS.colors.textMuted }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "membres" && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "30px 1fr 100px 100px 80px 90px", gap: 12, borderBottom: `1px solid ${DS.colors.border}` }}>
            {["#", "Membre", "Statut", "Score", "Position", "Action"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: DS.colors.textMuted, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {MOCK_MEMBERS.map((m, i) => (
            <div key={m.id} className="table-row" style={{ gridTemplateColumns: "30px 1fr 100px 100px 80px 90px", gap: 12, background: m.isMe ? "#F5A62308" : "transparent" }}>
              <span style={{ fontSize: 13, color: DS.colors.textMuted }}>{i + 1}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="avatar" style={{ width: 32, height: 32, background: m.isMe ? "linear-gradient(135deg, #F5A623, #E8860C)" : `hsl(${i * 40 + 180}, 45%, 35%)`, fontSize: 11, color: "white" }}>{m.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name} {m.isMe && <span style={{ fontSize: 10, color: DS.colors.accent }}>(moi)</span>}</div>
                  <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{m.phone}</div>
                </div>
              </div>
              <span className={`badge ${m.status === "paid" ? "badge-green" : m.status === "unpaid" ? "badge-amber" : "badge-red"}`} style={{ fontSize: 10, width: "fit-content" }}>
                {m.status === "paid" ? "✓ Payé" : m.status === "unpaid" ? "En attente" : "⚠️ Retard"}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 4, background: DS.colors.border, borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${m.score}%`, background: m.score >= 90 ? DS.colors.green : m.score >= 70 ? DS.colors.accent : DS.colors.red, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: m.score >= 90 ? DS.colors.green : m.score >= 70 ? DS.colors.accent : DS.colors.red }}>{m.score}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>#{m.position}</span>
              {t.isAdmin && !m.isMe && (
                <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Rappel</button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "historique" && (
        <div className="card" style={{ overflow: "hidden" }}>
          {MOCK_TRANSACTIONS.filter(tx => tx.tontine === t.name || true).map((tx, i) => (
            <div key={tx.id} className="table-row" style={{ gridTemplateColumns: "36px 1fr 160px 80px", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: tx.type === "reception" ? DS.colors.greenDim : tx.type === "penalite" ? DS.colors.redDim : DS.colors.accentDim }}>
                {tx.type === "reception" ? "💰" : tx.type === "penalite" ? "⚠️" : "💸"}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{tx.type === "reception" ? "Réception de mise" : tx.type === "penalite" ? "Pénalité retard" : "Cotisation"} — Tour {tx.round}</div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{tx.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === "reception" ? DS.colors.green : DS.colors.red }}>
                  {tx.type === "reception" ? "+" : "-"}{formatCFAFull(tx.amount)}
                </div>
              </div>
              <span className={`badge ${tx.status === "success" ? "badge-green" : tx.status === "pending" ? "badge-amber" : "badge-red"}`} style={{ fontSize: 10 }}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "parametres" && (
        <div style={{ maxWidth: 600 }}>
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>⚙️ Paramètres généraux</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Nom de la tontine", value: t.name },
                { label: "Montant par tour", value: formatCFAFull(t.amount) },
                { label: "Fréquence", value: t.frequency },
                { label: "Pénalité retard", value: "10%" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${DS.colors.border}` : "none" }}>
                  <span style={{ fontSize: 13, color: DS.colors.textMuted }}>{f.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
          {t.isAdmin && (
            <div className="card" style={{ padding: 24, border: "1px solid #E74C5E33" }}>
              <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: DS.colors.red, marginBottom: 12 }}>⚠️ Zone de danger</h3>
              <p style={{ fontSize: 13, color: DS.colors.textMuted, marginBottom: 16 }}>Ces actions sont irréversibles. Procédez avec précaution.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-ghost" style={{ fontSize: 13, color: DS.colors.red, borderColor: "#E74C5E33" }}>Suspendre la tontine</button>
                <button className="btn-ghost" style={{ fontSize: 13, color: DS.colors.red, borderColor: "#E74C5E33" }}>Dissoudre le groupe</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// WALLET PAGE
// ============================================================
function WalletPage({ user, transactions }) {
  const [tab, setTab] = useState("all");
  const totalIn = transactions.filter(tx => tx.type === "reception").reduce((s, tx) => s + tx.amount, 0);
  const totalOut = transactions.filter(tx => tx.type !== "reception").reduce((s, tx) => s + tx.amount, 0);

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {/* Title block */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Portefeuille</h1>
        <p style={{ color: DS.colors.textMuted, fontSize: 14 }}>Suivi de vos flux financiers</p>
      </div>

      {/* Main balance card */}
      <div style={{ background: "linear-gradient(135deg, #1A1A26, #141420)", border: `1px solid ${DS.colors.border}`, borderRadius: 20, padding: 32, marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, #F5A62314, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: 60, width: 160, height: 160, background: "radial-gradient(circle, #2ECC8A0A, transparent)", pointerEvents: "none" }} />

        <div style={{ fontSize: 13, color: DS.colors.textMuted, marginBottom: 8 }}>Épargne totale accumulée</div>
        <div className="syne" style={{ fontSize: 48, fontWeight: 800, marginBottom: 4, background: "linear-gradient(135deg, #F0EFE9, #F5A623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {user.totalSaved.toLocaleString("fr-FR")} F
        </div>
        <div style={{ fontSize: 13, color: DS.colors.textMuted, marginBottom: 28 }}>CFA · Mis à jour maintenant</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { label: "Entrées totales", value: totalIn, color: DS.colors.green, icon: "↑" },
            { label: "Sorties totales", value: totalOut, color: DS.colors.red, icon: "↓" },
            { label: "À recevoir", value: user.pendingReceive, color: DS.colors.accent, icon: "⏳" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0A0A0F44", borderRadius: 12, padding: "14px 16px", border: `1px solid ${DS.colors.border}` }}>
              <div style={{ fontSize: 11, color: DS.colors.textMuted, marginBottom: 6 }}>{s.label}</div>
              <div className="syne" style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.icon} {formatCFAFull(s.value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Wave", logo: "🌊", color: "#00BFFF", connected: true },
          { label: "Orange Money", logo: "🟠", color: "#FF6600", connected: true },
          { label: "MTN MoMo", logo: "📱", color: "#FFC107", connected: false },
          { label: "Virement", logo: "🏦", color: "#4A90E2", connected: false },
        ].map((pm, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = pm.color + "66"}
            onMouseLeave={e => e.currentTarget.style.borderColor = DS.colors.border}>
            <span style={{ fontSize: 20 }}>{pm.logo}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{pm.label}</div>
              <div style={{ fontSize: 10, color: pm.connected ? DS.colors.green : DS.colors.textMuted }}>{pm.connected ? "✓ Connecté" : "Connecter"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* History table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${DS.colors.border}` }}>
          <h2 className="syne" style={{ fontSize: 16, fontWeight: 700 }}>Historique des transactions</h2>
          <div style={{ display: "flex", gap: 4, background: DS.colors.surface, padding: 4, borderRadius: 8 }}>
            {[{ id: "all", label: "Tout" }, { id: "in", label: "Entrées" }, { id: "out", label: "Sorties" }].map(t => (
              <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} style={{ padding: "6px 12px" }} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
        {transactions
          .filter(tx => tab === "all" || (tab === "in" && tx.type === "reception") || (tab === "out" && tx.type !== "reception"))
          .map((tx) => (
            <div key={tx.id} className="table-row" style={{ gridTemplateColumns: "36px 1fr 180px 80px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: tx.type === "reception" ? DS.colors.greenDim : tx.type === "penalite" ? DS.colors.redDim : DS.colors.accentDim }}>
                {tx.type === "reception" ? "💰" : tx.type === "penalite" ? "⚠️" : "💸"}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                  {tx.type === "reception" ? "Réception de mise" : tx.type === "penalite" ? "Pénalité de retard" : "Cotisation"} · Tour {tx.round}
                </div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{tx.tontine}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === "reception" ? DS.colors.green : DS.colors.red }}>
                  {tx.type === "reception" ? "+" : "-"}{formatCFAFull(tx.amount)}
                </div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{tx.date}</div>
              </div>
              <span className={`badge ${tx.status === "success" ? "badge-green" : tx.status === "pending" ? "badge-amber" : "badge-red"}`} style={{ fontSize: 10 }}>
                {tx.status === "success" ? "✓ OK" : tx.status === "pending" ? "En cours" : "Échoué"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

// ============================================================
// NOTIFICATIONS PAGE
// ============================================================
function NotificationsPage({ notifications, setNotifications }) {
  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, read: true })));

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Notifications</h1>
          <p style={{ color: DS.colors.textMuted, fontSize: 14 }}>{notifications.filter(n => !n.read).length} non lues</p>
        </div>
        <button className="btn-ghost" onClick={markAllRead} style={{ fontSize: 13 }}>Tout marquer lu</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifications.map((n, i) => (
          <div key={n.id} className="card" style={{ padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start", borderColor: !n.read ? "#F5A62333" : DS.colors.border, background: !n.read ? "#F5A62306" : DS.colors.card, animation: `fadeUp 0.4s ease ${i * 0.06}s both`, cursor: "pointer" }}
            onClick={() => setNotifications(prev => prev.map(notif => notif.id === n.id ? { ...notif, read: true } : notif))}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: DS.colors.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, border: `1px solid ${DS.colors.border}` }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontWeight: n.read ? 500 : 700, fontSize: 14 }}>{n.title}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: DS.colors.textMuted }}>{n.time}</span>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: DS.colors.accent }} />}
                </div>
              </div>
              <div style={{ fontSize: 13, color: DS.colors.textMuted, marginTop: 4 }}>{n.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PROFILE PAGE
// ============================================================
function ProfilePage({ user }) {
  const [tab, setTab] = useState("info");

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Mon Profil</h1>

      {/* Profile header card */}
      <div className="card" style={{ padding: 28, marginBottom: 20, display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div className="avatar" style={{ width: 80, height: 80, background: "linear-gradient(135deg, #F5A623, #E8860C)", fontSize: 26, color: "#0A0A0F" }}>{user.avatar}</div>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: DS.colors.green, borderRadius: "50%", border: `2px solid ${DS.colors.card}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✓</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h2 className="syne" style={{ fontSize: 22, fontWeight: 800 }}>{user.name}</h2>
            <span className="badge badge-amber"><Icon name="crown" size={10} color={DS.colors.accent} />PRO</span>
          </div>
          <div style={{ fontSize: 13, color: DS.colors.textMuted, marginBottom: 12 }}>{user.email} · {user.phone}</div>
          <div style={{ display: "flex", gap: 16 }}>
            <div><span className="syne" style={{ fontSize: 18, fontWeight: 800 }}>{user.activeTontines}</span><span style={{ fontSize: 12, color: DS.colors.textMuted, marginLeft: 4 }}>actives</span></div>
            <div><span className="syne" style={{ fontSize: 18, fontWeight: 800 }}>{user.completedTontines}</span><span style={{ fontSize: 12, color: DS.colors.textMuted, marginLeft: 4 }}>complétées</span></div>
            <div><span className="syne" style={{ fontSize: 18, fontWeight: 800, color: DS.colors.purple }}>{user.creditScore}</span><span style={{ fontSize: 12, color: DS.colors.textMuted, marginLeft: 4 }}>score</span></div>
          </div>
        </div>
        <button className="btn-ghost" style={{ fontSize: 13 }}>Modifier le profil</button>
      </div>

      {/* Horizontal Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: DS.colors.surface, padding: 4, borderRadius: 10, border: `1px solid ${DS.colors.border}`, width: "fit-content" }}>
        {["info", "securite", "abonnement"].map(t => (
          <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {{ info: "Informations", securite: "Sécurité", abonnement: "Abonnement" }[t]}
          </button>
        ))}
      </div>

      {tab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Informations personnelles</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Nom complet", value: user.name },
                { label: "Email", value: user.email },
                { label: "Téléphone", value: user.phone },
                { label: "Membre depuis", value: "15 janvier 2024" },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DS.colors.textMuted, marginBottom: 4, letterSpacing: 0.5 }}>{f.label.toUpperCase()}</label>
                  <input className="input-field" defaultValue={f.value} style={{ fontSize: 13 }} />
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 16, fontSize: 13, padding: "10px 20px" }}>Enregistrer</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Achievements block */}
            <div className="card" style={{ padding: 24 }}>
              <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>🏆 Badges</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { icon: "⭐", label: "Ponctuel", desc: "100% à temps" },
                  { icon: "🤝", label: "Fidèle", desc: "1 an actif" },
                  { icon: "👑", label: "Admin Pro", desc: "5 tontines gérées" },
                  { icon: "💎", label: "Top Score", desc: ">90 points" },
                  { icon: "🌍", label: "Réseau", desc: "50+ connexions" },
                  { icon: "🔒", label: "Sécurisé", desc: "2FA activé" },
                ].map((b, i) => (
                  <div key={i} style={{ background: DS.colors.bg, borderRadius: 10, padding: 10, textAlign: "center", border: `1px solid ${DS.colors.border}` }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{b.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: DS.colors.textMuted }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Area */}
            <div className="card" style={{ padding: 20, border: "1px solid #E74C5E22" }}>
              <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Compte</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="btn-ghost" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-start" }}>
                  <Icon name="logout" size={14} />
                  Se déconnecter
                </button>
                <button className="btn-ghost" style={{ fontSize: 13, color: DS.colors.red, borderColor: "#E74C5E33", display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-start" }}>
                  <Icon name="x" size={14} />
                  Supprimer le compte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "securite" && (
        <div className="card" style={{ padding: 24, maxWidth: 500 }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>🔒 Sécurité du compte</h3>
          {[
            { label: "Mot de passe", desc: "Modifié il y a 3 mois", action: "Changer", ok: true },
            { label: "Authentification 2 facteurs", desc: "SMS activé", action: "Configurer", ok: true },
            { label: "Appareils connectés", desc: "2 appareils actifs", action: "Gérer", ok: true },
            { label: "Historique de connexion", desc: "Voir les connexions", action: "Voir", ok: true },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${DS.colors.border}` : "none" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                  {s.ok && <Icon name="check" size={12} color={DS.colors.green} />}
                </div>
                <div style={{ fontSize: 11, color: DS.colors.textMuted }}>{s.desc}</div>
              </div>
              <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }}>{s.action}</button>
            </div>
          ))}
        </div>
      )}

      {tab === "abonnement" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { name: "Starter", price: "Gratuit", features: ["Jusqu'à 1 tontine", "Max 10 membres", "Paiements basiques", "Support email"], current: false, color: DS.colors.textMuted },
              { name: "Pro", price: "4 900 F/mois", features: ["Tontines illimitées", "Max 50 membres", "Tous modes de paiement", "IA anti-fraude", "Analytics avancés", "Support prioritaire"], current: true, color: DS.colors.accent },
              { name: "Business", price: "14 900 F/mois", features: ["Tout Pro +", "Membres illimités", "API complète", "Marque blanche", "Gestionnaire dédié", "SLA 99.9%"], current: false, color: DS.colors.purple },
            ].map((plan, i) => (
              <div key={i} className="card" style={{ padding: 24, border: plan.current ? `2px solid ${plan.color}` : `1px solid ${DS.colors.border}`, position: "relative" }}>
                {plan.current && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: plan.color, color: "#0A0A0F", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "Syne", whiteSpace: "nowrap" }}>Plan actuel</div>}
                <h3 className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: plan.color }}>{plan.name}</h3>
                <div className="syne" style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{plan.price}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {plan.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <Icon name="check" size={12} color={plan.color} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className={plan.current ? "btn-ghost" : "btn-primary"} style={{ width: "100%", fontSize: 13, background: plan.current ? "transparent" : plan.color === DS.colors.purple ? "linear-gradient(135deg, #9B6DFF, #7B4DFF)" : undefined, color: plan.current ? DS.colors.textMuted : plan.color === DS.colors.purple ? "white" : "#0A0A0F" }}>
                  {plan.current ? "Plan actuel" : "Choisir ce plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP SHELL
// ============================================================
function AppShell() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedTontine, setSelectedTontine] = useState(null);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage user={MOCK_USER} tontines={MOCK_TONTINES} transactions={MOCK_TRANSACTIONS} setActive={setActivePage} />;
      case "tontines": return <TontinesPage tontines={MOCK_TONTINES} setActive={setActivePage} setSelectedTontine={setSelectedTontine} />;
      case "tontine_detail": return <TontineDetailPage tontine={selectedTontine} setActive={setActivePage} />;
      case "wallet": return <WalletPage user={MOCK_USER} transactions={MOCK_TRANSACTIONS} />;
      case "notifications": return <NotificationsPage notifications={notifications} setNotifications={setNotifications} />;
      case "profile": return <ProfilePage user={MOCK_USER} />;
      default: return <DashboardPage user={MOCK_USER} tontines={MOCK_TONTINES} transactions={MOCK_TRANSACTIONS} setActive={setActivePage} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={activePage} setActive={setActivePage} user={MOCK_USER} notifCount={unreadCount} />
      <main style={{ marginLeft: 220, flex: 1, padding: "32px 40px", background: DS.colors.bg, minHeight: "100vh" }}>
        {renderPage()}
      </main>
    </div>
  );
}

// ============================================================
// CONTAINER ROOT (Landing Page & Routeur local interne)
// ============================================================
export default function TontineApp() {
  const [inApp, setInApp] = useState(false);

  return (
    <>
      {/* Injection brute des styles généraux dans le DOM */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {inApp ? (
        <AppShell />
      ) : (
        <LandingPage onEnterApp={() => setInApp(true)} />
      )}
    </>
  );
}

