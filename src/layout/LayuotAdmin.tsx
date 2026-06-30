// import { NavLink, useNavigate } from 'react-router-dom';
// import { useUIStore } from '../store/IUStore';
// import {
//   LayoutDashboard, Calendar, Tags, Mic2, User, LogOut, Menu, X
// } from 'lucide-react';
// import { useState } from 'react';

// const navItems = [
//   { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/events', icon: Calendar, label: 'Events' },
//   { to: '/categories', icon: Tags, label: 'Kategori' },
//   { to: '/pembicara', icon: Mic2, label: 'Pembicara' },
//   { to: '/biodata', icon: User, label: 'Biodata' },
// ];

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const { user, logout } = useUIStore() as {
//     user?: { name?: string; nim?: string };
//     logout: () => void;
//   };
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@700&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         :root {
//           /* Neobrutalism Light Mode Palette */
//           --bg-main: #f4f1ea;        /* Warna kertas koran/retro light */
//           --bg-surface: #ffffff;     /* Putih bersih untuk komponen utama */
//           --neo-border: #000000;     /* Border hitam tebal */
          
//           /* Pop Colors */
//           --neo-primary: #000000;    /* Hitam pekat untuk logo block */
//           --neo-secondary: #0055ff;  /* Biru elektrik */
//           --neo-accent: #fffb00;     /* Kuning terang khas EventHub */
//           --neo-success: #fffb00;    /* Disamakan kuning atau hijau stabilo */
          
//           /* Text Colors */
//           --text: #000000;
//           --text-muted: #555555;
          
//           /* Hard Shadow */
//           --neo-shadow: 6px 6px 0px #000000;
//           --neo-shadow-sm: 3px 3px 0px #000000;
//           --neo-shadow-active: 1px 1px 0px #000000;
//         }

//         body {
//           background: var(--bg-main);
//           color: var(--text);
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           min-height: 100dvh;
//         }

//         /* ── Layout Shell ── */
//         .bento-shell {
//           display: grid;
//           min-height: 100dvh;
//           grid-template-columns: auto 1fr;
//           gap: 24px;
//           padding: 24px;
//           background: var(--bg-main);
//         }

//         /* ── Main Content Container Layout ── */
//         .bento-main {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//           min-width: 0;
//         }

//         /* ── Sidebar (Kombinasi Putih & Border Hitam Tebal) ── */
//         .bento-sidebar {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 12px;
//           background: var(--bg-surface);
//           border: 4px solid var(--neo-border);
//           box-shadow: var(--neo-shadow);
//           padding: 20px 12px;
//           position: sticky;
//           top: 24px;
//           height: calc(100dvh - 48px);
//           width: 76px;
//           overflow: hidden;
//           z-index: 10;
//           transition: width 0.2s steps(4);
//         }

//         .bento-sidebar.open {
//           width: 240px;
//           align-items: flex-start;
//         }

//         /* ── Logo Block (Hitam - Teks Putih) ── */
//         .sidebar-logo {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 12px;
//           background: var(--neo-accent); /* Diubah jadi Kuning agar mirip EventHub */
//           border: 4px solid var(--neo-border);
//           box-shadow: var(--neo-shadow-sm);
//           color: #000000;
//           margin-bottom: 20px;
//           width: 44px;
//           overflow: hidden;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .bento-sidebar.open .sidebar-logo {
//           width: 100%;
//         }

//         .sidebar-logo span {
//           font-size: 16px;
//           font-weight: 900;
//           text-transform: uppercase;
//           opacity: 0;
//           color: #000000;
//           letter-spacing: -0.5px;
//         }

//         .bento-sidebar.open .sidebar-logo span {
//           opacity: 1;
//         }

//         /* ── Nav Items ── */
//         .bento-nav {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           width: 100%;
//           flex: 1;
//         }

//         .bento-nav-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px;
//           border: 4px solid transparent;
//           color: var(--text-muted);
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 800;
//           text-transform: uppercase;
//           white-space: nowrap;
//           overflow: hidden;
//           width: 44px;
//           transition: background 0.1s;
//         }

//         .bento-sidebar.open .bento-nav-item {
//           width: 100%;
//         }

//         .bento-nav-item:hover {
//           background: #f4f1ea;
//           border-color: var(--neo-border);
//           color: var(--text);
//           box-shadow: var(--neo-shadow-sm);
//         }

//         /* Active Menu: Berubah jadi Hitam Pekat dengan Teks Kuning / Putih */
//         .bento-nav-item.active {
//           background: #000000;
//           color: var(--neo-accent);
//           border: 4px solid var(--neo-border);
//           box-shadow: var(--neo-shadow-sm);
//         }

//         .bento-nav-item.active:hover {
//           background: #000000;
//           color: var(--neo-accent);
//         }

//         .bento-nav-item span {
//           opacity: 0;
//         }

//         .bento-sidebar.open .bento-nav-item span {
//           opacity: 1;
//         }

//         /* ── User Chip & Logout ── */
//         .sidebar-footer {
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .user-chip {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px;
//           background: #f4f1ea;
//           border: 4px solid var(--neo-border);
//           overflow: hidden;
//           width: 100%;
//         }

//         .avatar {
//           width: 28px;
//           height: 28px;
//           border: 3px solid var(--neo-border);
//           background: #000000;
//           color: var(--neo-accent);
//           font-size: 14px;
//           font-weight: 900;
//           display: grid;
//           place-items: center;
//           flex-shrink: 0;
//         }

//         .user-details {
//           opacity: 0;
//           overflow: hidden;
//         }

//         .bento-sidebar.open .user-details {
//           opacity: 1;
//         }

//         .user-name {
//           font-size: 12px;
//           font-weight: 900;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           max-width: 120px;
//           color: #000000;
//           text-transform: uppercase;
//         }

//         .user-nim {
//           font-size: 11px;
//           color: #555555;
//           font-family: 'DM Mono', monospace;
//           font-weight: 700;
//         }

//         .logout-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 12px;
//           width: 100%;
//           background: #fff0f0;
//           border: 4px solid var(--neo-border);
//           color: #ff2222;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 900;
//           text-transform: uppercase;
//           cursor: pointer;
//           box-shadow: var(--neo-shadow-sm);
//         }

//         .logout-btn:hover {
//           background: #ff2222;
//           color: #ffffff;
//           transform: translate(-2px, -2px);
//           box-shadow: 5px 5px 0px var(--neo-border);
//         }

//         .logout-btn:active {
//           transform: translate(1px, 1px);
//           box-shadow: var(--neo-shadow-active);
//         }

//         .logout-btn span {
//           opacity: 0;
//         }

//         .bento-sidebar.open .logout-btn span {
//           opacity: 1;
//         }

//         /* ── Topbar (Putih Bersih) ── */
//         .bento-topbar {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: var(--bg-surface);
//           border: 4px solid var(--neo-border);
//           box-shadow: var(--neo-shadow);
//           padding: 16px 24px;
//         }

//         .topbar-left {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .menu-toggle {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 38px;
//           height: 38px;
//           border: 3px solid var(--neo-border);
//           background: var(--neo-accent);
//           color: #000000;
//           cursor: pointer;
//           box-shadow: var(--neo-shadow-sm);
//         }

//         .menu-toggle:hover {
//           background: #000000;
//           color: var(--neo-accent);
//         }

//         .topbar-title {
//           font-size: 20px;
//           font-weight: 900;
//           text-transform: uppercase;
//           letter-spacing: -0.5px;
//           color: var(--text);
//         }

//         .welcome-badge {
//           font-size: 12px;
//           color: #000000;
//           background: var(--neo-accent);
//           border: 3px solid var(--neo-border);
//           box-shadow: var(--neo-shadow-sm);
//           padding: 6px 14px;
//           font-weight: 700;
//           text-transform: uppercase;
//         }

//         .welcome-badge strong {
//           font-weight: 900;
//         }

//         /* ── Page Content Card (Putih) ── */
//         .bento-content {
//           background: var(--bg-surface);
//           border: 4px solid var(--neo-border);
//           box-shadow: var(--neo-shadow);
//           padding: 30px;
//           min-height: calc(100dvh - 160px);
//         }

//         /* ── Mobile Responsive Overlay ── */
//         .overlay { display: none; }

//         @media (max-width: 640px) {
//           .bento-shell {
//             grid-template-columns: 1fr;
//             padding: 16px;
//             gap: 16px;
//           }

//           .bento-sidebar {
//             position: fixed;
//             left: -280px;
//             top: 0;
//             height: 100dvh;
//             width: 240px !important;
//             border-width: 0 4px 0 0;
//             transition: left 0.2s steps(4);
//             padding: 20px 16px !important;
//             align-items: flex-start !important;
//           }

//           .bento-sidebar.open {
//             left: 0;
//           }

//           .bento-sidebar .sidebar-logo { width: 100% !important; }
//           .bento-sidebar .sidebar-logo span,
//           .bento-sidebar .bento-nav-item span,
//           .bento-sidebar .user-details,
//           .bento-sidebar .logout-btn span {
//             opacity: 1 !important;
//           }
//           .bento-sidebar .bento-nav-item { width: 100% !important; }

//           .overlay {
//             display: block;
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,0.4);
//             backdrop-filter: blur(4px);
//             z-index: 9;
//           }
//         }
//       `}</style>

//       <div className="bento-shell">
//         {sidebarOpen && (
//           <div className="overlay" onClick={() => setSidebarOpen(false)} />
//         )}

//         <aside className={`bento-sidebar ${sidebarOpen ? 'open' : ''}`}>
//           <div className="sidebar-logo">
//             <Calendar size={22} />
//             <span>EVENTHUB</span>
//           </div>

//           <nav className="bento-nav">
//             {navItems.map(({ to, icon: Icon, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) => `bento-nav-item ${isActive ? 'active' : ''}`}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <Icon size={18} />
//                 <span>{label}</span>
//               </NavLink>
//             ))}
//           </nav>

//           <div className="sidebar-footer">
//             <div className="user-chip">
//               <div className="avatar">{user?.name?.charAt(0)}</div>
//               <div className="user-details">
//                 <p className="user-name">{user?.name}</p>
//                 <p className="user-nim">{user?.nim}</p>
//               </div>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               <LogOut size={16} />
//               <span>Keluar</span>
//             </button>
//           </div>
//         </aside>

//         <div className="bento-main">
//           <header className="bento-topbar">
//             <div className="topbar-left">
//               <button
//                 className="menu-toggle"
//                 onClick={() => setSidebarOpen(v => !v)}
//               >
//                 {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
//               </button>
//               <span className="topbar-title">EVENTHUB</span>
//             </div>
//             <div className="topbar-right">
//               <span className="welcome-badge">
//                 Selamat Datang, <strong>{user?.name}</strong>
//               </span>
//             </div>
//           </header>

//           <div className="bento-content">
//             {children}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;