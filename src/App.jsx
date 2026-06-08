import React, { useState } from 'react';

// =========================================================================
// 1. CONFIGURATION & STYLES GLOBAUX DIRECTEMENT INJECTÉS (Mobile Responsive)
// =========================================================================
const globalStyles = `
  :root {
    --primary: #059669;
    --primary-dark: #047857;
    --primary-light: #d1fae5;
    --bg-dark: #0f172a;
    --bg-light: #f8fafc;
    --text-main: #334155;
    --text-muted: #64748b;
    --white: #ffffff;
    --border: #e2e8f0;
  }
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
  }
  body { 
    background-color: var(--bg-light); 
    color: var(--text-main); 
    line-height: 1.5; 
  }
  .btn-primary { 
    background-color: var(--primary); 
    color: white; 
    border: none; 
    padding: 12px 24px; 
    border-radius: 8px; 
    font-weight: 600; 
    cursor: pointer; 
    transition: all 0.2s; 
    display: inline-flex; 
    align-items: center; 
    gap: 8px; 
  }
  .btn-primary:hover { 
    background-color: var(--primary-dark); 
    transform: translateY(-1px); 
  }
  .card { 
    background: white; 
    border: 1px solid var(--border); 
    border-radius: 12px; 
    padding: 20px; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
  }
  .badge { 
    padding: 4px 10px; 
    border-radius: 9999px; 
    font-size: 12px; 
    font-weight: 600; 
    text-transform: uppercase; 
  }
  .badge-success { 
    background-color: var(--primary-light); 
    color: var(--primary-dark); 
  }
  .badge-warning { 
    background-color: #fef3c7; 
    color: #b45309; 
  }
  .grid-3 { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 20px; 
  }
`;

// Formatage des prix en Francs CFA pour l'Afrique de l'Ouest
const formatCFA = (amount) => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'XOF', 
    minimumFractionDigits: 0 
  }).format(amount);
};

// =========================================================================
// 2. COMPOSANT : LANDING PAGE (Vitrine commerciale de l'application)
// =========================================================================
function LandingPage({ onEnterApp }) {
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#059669', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>T</div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>Tontine<span style={{ color: '#059669' }}>Pro</span></span>
        </div>
        <button className="btn-primary" onClick={onEnterApp}>Accéder à l'application ➜</button>
      </header>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ background: '#1e293b', color: '#34d399', padding: '6px 16px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid #334155' }}>🚀 Fintech Afrique de l'Ouest</span>
        <h1 style={{ fontSize: '44px', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px', letterSpacing: '-1px' }}>Digitalisez vos tontines en Côte d'Ivoire avec <span style={{ color: '#059669' }}>Sécurité</span></h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', maxWidth: '600px' }}>Gerez vos cercles d'épargne, suivez les tours de table et encaissez vos fonds instantanément via Wave, Orange Money, MTN et Moov.</p>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={onEnterApp}>Créer ou Rejoindre une tontine</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', width: '100%', borderTop: '1px solid #1e293b', paddingTop: '40px' }}>
          <div><h3 style={{ fontSize: '24px', color: '#34d399' }}>100%</h3><p style={{ color: '#94a3b8', fontSize: '13px' }}>Sécurisé via CinetPay</p></div>
          <div><h3 style={{ fontSize: '24px', color: '#34d399' }}>0 F</h3><p style={{ color: '#94a3b8', fontSize: '13px' }}>Frais de dépôt</p></div>
          <div><h3 style={{ fontSize: '24px', color: '#34d399' }}>Instantané</h3><p style={{ color: '#94a3b8', fontSize: '13px' }}>Retraits vers Mobile Money</p></div>
        </div>
      </main>
    </div>
  );
}

// =========================================================================
// 3. COMPOSANT : BARRE LATÉRALE DE NAVIGATION (Sidebar)
// =========================================================================
function Sidebar({ active, setActive }) {
  const menus = [
    { id: 'dashboard', label: '📊 Tableau de bord' },
    { id: 'tontines', label: '👥 Mes Tontines' },
    { id: 'wallet', label: '💳 Portefeuille / Retraits' },
    { id: 'profile', label: '⚙️ Paramètres' }
  ];
  return (
    <div style={{ width: '240px', background: '#0f172a', color: 'white', height: '100vh', padding: '24px 16px', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingLeft: '8px' }}>
        <div style={{ background: '#059669', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>T</div>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Tontine<span style={{ color: '#059669' }}>Pro</span></span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menus.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', background: active === m.id ? '#059669' : 'transparent', color: 'white', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
            {m.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// =========================================================================
// 4. COMPOSANT : ACCUEIL DU DASHBOARD (Statistiques & Liste des tontines)
// =========================================================================
function DashboardOverview({ onSelectTontine, tontines }) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>Akwaba, Yves-Marie 👋</h2>
        <p style={{ color: 'var(--text-muted)' }}>Voici le statut global de vos épargnes et cercles de tontine.</p>
      </div>
      
      <div className="grid-3" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Épargne Globale Cumulée</p>
          <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '8px 0 4px 0' }}>{formatCFA(350000)}</h3>
          <span style={{ color: '#059669', fontSize: '12px', fontWeight: '600' }}>📈 +25.000 F CFA cette semaine</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Prochain Versement Attendu</p>
          <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '8px 0 4px 0' }}>{formatCFA(25000)}</h3>
          <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '600' }}>📅 Échéance : À terme</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #ff6600' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Prochaine Cagnotte à Toucher</p>
          <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '8px 0 4px 0' }}>{formatCFA(200000)}</h3>
          <span style={{ color: '#ff6600', fontSize: '12px', fontWeight: '600' }}>🔄 Tour numéro 4 (Bientôt votre tour)</span>
        </div>
      </div>
      
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Vos Cercles de tontines actifs</h3>
      <div className="grid-3">
        {tontines.map(t => (
          <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontWeight: '700', fontSize: '16px' }}>{t.name}</h4>
                <span className={`badge ${t.paid ? 'badge-success' : 'badge-warning'}`}>{t.paid ? '✓ À jour' : '⏳ À payer'}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Cotisation : <strong>{formatCFA(t.amount)}</strong> / {t.frequency}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cagnotte finale : <strong>{formatCFA(t.totalPot)}</strong></p>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '13px', marginTop: '16px' }} onClick={() => onSelectTontine(t)}>
              Ouvrir la Tontine ➜
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// 5. COMPOSANT : PAGE DÉTAIL D'UNE TONTINE + INTÉGRATION PAS À PAS CINETPAY
// =========================================================================
function TontineDetailPage({ t, onBack }) {
  
  const declencherPaiement = () => {
    // 1. Sécurité : Vérification de la présence du script SDK de CinetPay
    if (typeof CinetPay === "undefined") {
      alert("Le service de paiement CinetPay n'est pas détecté. Veuillez recharger la page.");
      return;
    }

    // 2. Initialisation de la configuration avec tes clés sécurisées depuis le .env
    CinetPay.setConfig({
      apikey: import.meta.env.VITE_CINETPAY_API_KEY,
      site_id: import.meta.env.VITE_CINETPAY_SITE_ID,
      notify_url: 'https://tontine-pro.onrender.com/' // Mettre l'adresse finale ou API Webhook
    });

    // 3. Lancement du Checkout Seamless (Ouvre le pop-up intégré de paiement)
    CinetPay.getCheckout({
      transaction_id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Identifiant de transaction unique requis par CinetPay
      amount: t.amount,
      currency: 'XOF',
      channels: 'ALL', // Donne le choix entre Wave, MTN, Orange, Moov, Carte bancaire, etc.
      description: `Cotisation Tour ${t.currentRound} — ${t.name}`,
      customer_name: "Konan",
      customer_surname: "Yves-Marie",
      customer_email: "yves@tontine.ci",
      customer_phone_number: "+22507123456",
      customer_address: "Abidjan",
      customer_city: "Adjamé",
      customer_country: "CI",
      customer_state: "CI",
      customer_zip_code: "00225"
    });

    // 4. Récupération et traitement du statut du paiement renvoyé par le guichet unique
    CinetPay.waitResponse(function(data) {
      if (data.status === "REFUSED") {
        alert("⚠️ Le paiement de votre cotisation a été refusé ou annulé.");
      } else if (data.status === "ACCEPTED") {
        alert(`🎉 Félicitations ! Votre cotisation de ${t.amount.toLocaleString()} F CFA a bien été validée via CinetPay.`);
      }
    });
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        ⬅ Retour au tableau de bord
      </button>
      
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>{t.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ID Groupe Unique : #{t.id * 8472}</p>
          </div>
          {!t.paid && (
            <button className="btn-primary" style={{ padding: '12px 24px' }} onClick={declencherPaiement}>
              💸 Payer ma cotisation ({formatCFA(t.amount)})
            </button>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fréquence</span><p style={{ fontWeight: '600' }}>{t.frequency}</p></div>
          <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cagnotte Totale</span><p style={{ fontWeight: '600', color: 'var(--primary)' }}>{formatCFA(t.totalPot)}</p></div>
          <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Membres Actifs</span><p style={{ fontWeight: '600' }}>{t.members} participants</p></div>
          <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tour Actuel</span><p style={{ fontWeight: '600' }}>Tour {t.currentRound} / {t.members}</p></div>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Membres et état des cotisations du tour</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '6px', background: '#f8fafc', alignItems: 'center' }}>
            <span>👤 Koffi Kouassi (Président)</span><span className="badge badge-success">✓ Payé</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '6px', background: '#f8fafc', alignItems: 'center' }}>
            <span>👤 Konan Yves-Marie (Vous)</span><span className={`badge ${t.paid ? 'badge-success' : 'badge-warning'}`}>{t.paid ? '✓ Payé' : '⏳ À régler'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '6px', background: '#f8fafc', alignItems: 'center' }}>
            <span>👤 Salimata Diallo</span><span className="badge badge-warning">⏳ En attente</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 6. COMPOSANTS SECONDAIRES : PORTEFEUILLE & PARAMÈTRES
// =========================================================================
function WalletPage() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>💳 Votre Portefeuille Collecte</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Demandez le versement de votre cagnotte vers votre Mobile Money.</p>
      <div style={{ background: 'var(--bg-dark)', color: 'white', padding: '24px', borderRadius: '12px' }}>
        <span style={{ fontSize: '14px', color: '#94a3b8' }}>Solde disponible au retrait</span>
        <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#34d399', margin: '4px 0 16px 0' }}>{formatCFA(200000)}</h3>
        <button className="btn-primary" style={{ background: '#3b82f6' }}>Demander un retrait instantané</button>
      </div>
    </div>
  );
}

function GenericSettings() {
  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>⚙️ Paramètres de l'application</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Gestion des accès marchands CinetPay et profils de sécurité.</p>
    </div>
  );
}

// =========================================================================
// 7. ROUTEUR INTERNE ET ARBRE RACINE DE L'APPLICATION
// =========================================================================
export default function TontineApp() {
  const [inApp, setInApp] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedTontine, setSelectedTontine] = useState(null);

  // Données fictives initiales pour la démo
  const [tontines] = useState([
    { id: 1, name: 'Tontine Auto Abidjan', amount: 25000, frequency: 'Mensuel', totalPot: 200000, members: 8, currentRound: 3, paid: false },
    { id: 2, name: 'Épargne Famille Pro', amount: 10000, frequency: 'Hebdomadaire', totalPot: 150000, members: 15, currentRound: 6, paid: true }
  ]);

  const renderPage = () => {
    if (selectedTontine) {
      return <TontineDetailPage t={selectedTontine} onBack={() => setSelectedTontine(null)} />;
    }
    switch(activePage) {
      case 'dashboard':
      case 'tontines': 
        return <DashboardOverview onSelectTontine={(t) => setSelectedTontine(t)} tontines={tontines} />;
      case 'wallet': 
        return <WalletPage />;
      case 'profile': 
        return <GenericSettings />;
      default: 
        return <DashboardOverview onSelectTontine={(t) => setSelectedTontine(t)} tontines={tontines} />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      {!inApp ? (
        <LandingPage onEnterApp={() => setInApp(true)} />
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar active={activePage} setActive={(p) => { setSelectedTontine(null); setActivePage(p); }} />
          <main style={{ marginLeft: '240px', flex: 1, padding: '40px', backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
            {renderPage()}
          </main>
        </div>
      )}
    </>
  );
}


