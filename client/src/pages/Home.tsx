import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDownToLine,
  ChevronRight,
  Clock3,
  Globe2,
  Heart,
  Home as HomeIcon,
  Menu as MenuIcon,
  Mic,
  Moon,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  TabletSmartphone,
  UserRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

type Screen = "home" | "menu";
type Tab = "Web" | "Gambar" | "Video" | "Berita" | "Populer";

const tabs: Tab[] = ["Web", "Gambar", "Video", "Berita", "Populer"];
const LOGO_SRC = "/octopus-logo.png";

function OctopusMark({ small = false }: { small?: boolean }) {
  if (small) {
    return <span className="mascot-logo"><img className="octopus-mark small" src={LOGO_SRC} alt="Octopus mascot" /></span>;
  }
  return <img className="octopus-mark" src={LOGO_SRC} alt="Octopus" />;
}

function BottomNav({ screen, onNavigate }: { screen: Screen; onNavigate: (screen: Screen) => void }) {
  const items = [
    { label: "Beranda", icon: HomeIcon, target: "home" as Screen },
    { label: "Tab", icon: TabletSmartphone, target: "home" as Screen },
    { label: "Favorit", icon: Heart, target: "home" as Screen },
    { label: "Alat", icon: WandSparkles, target: "menu" as Screen },
  ];
  return (
    <>
      <nav className="bottom-nav" aria-label="Navigasi utama">
        {items.map(({ label, icon: Icon, target }) => {
          const active = target === screen && (label === "Beranda" || label === "Alat");
          return (
            <button className={`nav-item ${active ? "active" : ""}`} key={label} onClick={() => onNavigate(target)}>
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="home-indicator" />
    </>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("Web");
  const [notice, setNotice] = useState("");
  const submitSearch = () => {
    if (!query.trim()) return;
    setNotice(`Mencari “${query.trim()}” di ${tab}`);
  };
  return (
    <div className="screen home-screen">
      <main className="home-content">
        <header className="logo-wrap">
          <div className="logo-orbit"><OctopusMark /></div>
        </header>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input aria-label="Cari di Octopus" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitSearch()} placeholder="Cari di Octopus..." />
          {query && <button className="clear-button" onClick={() => setQuery("")} aria-label="Hapus pencarian"><X size={16} /></button>}
          <button className="icon-button mic-button" onClick={() => setNotice("Pencarian suara segera hadir")} aria-label="Pencarian suara"><Mic size={20} /></button>
        </div>
        <div className="tabs" role="tablist" aria-label="Jenis pencarian">
          {tabs.map((item) => <button key={item} className={`tab ${tab === item ? "active" : ""}`} onClick={() => setTab(item)} role="tab" aria-selected={tab === item}>{item}</button>)}
        </div>
        {notice && <button className="search-notice" onClick={() => setNotice("")}><Sparkles size={15} /> {notice}</button>}
        <div className="section-heading"><span>Populer</span><button onClick={() => setNotice("Lebih banyak rekomendasi segera hadir")}>Lihat semua <ChevronRight size={15} /></button></div>
        <article className="weather-card">
          <div className="weather-left"><div className="weather-label"><Sun size={17} /> Cuaca hari ini</div><div className="weather-temp">24°</div><div className="weather-cond">Berawan <span>·</span> Terasa 25°</div><div className="weather-loc"><Globe2 size={14} /> Jakarta, Indonesia</div></div>
          <div className="weather-visual"><Sun size={54} className="weather-sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /></div>
        </article>
        <div className="quick-grid">
          {[{ label: "Mode pribadi", icon: ShieldCheck }, { label: "Situs favorit", icon: Star }, { label: "Riwayat", icon: Clock3 }].map(({ label, icon: Icon }) => <button className="quick-card" key={label} onClick={() => setNotice(`${label} akan segera tersedia`)}><span className="quick-icon"><Icon size={18} /></span><span>{label}</span><MoreHorizontal size={16} /></button>)}
        </div>
      </main>
      <BottomNav screen="home" onNavigate={onNavigate} />
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return <button className={`switch ${on ? "on" : ""}`} onClick={onChange} aria-pressed={on} aria-label={on ? "Nonaktifkan" : "Aktifkan"}><span className="knob" /></button>;
}

function MenuRow({ icon: Icon, title, sub, trailing, onClick }: { icon: typeof ShieldCheck; title: string; sub: string; trailing?: ReactNode; onClick?: () => void }) {
  return <button className="menu-row" onClick={onClick}><span className="icon-box"><Icon size={20} /></span><span className="row-text"><strong>{title}</strong><small>{sub}</small></span>{trailing ?? <ChevronRight size={18} className="chevron" />}</button>;
}

function MenuScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [toggles, setToggles] = useState({ vpn: true, ad: true, dark: false, desktop: false, data: true });
  const [notice, setNotice] = useState("");
  const flip = (key: keyof typeof toggles) => setToggles((current) => ({ ...current, [key]: !current[key] }));
  const rows = useMemo(() => [
    { icon: ShieldCheck, title: "VPN", sub: "Terhubung Singapura", key: "vpn" as const },
    { icon: UserRound, title: "Tab pribadi", sub: "Jelajah tanpa jejak" },
    { icon: ShieldOff, title: "Pemblokir iklan", sub: "Diblokir otomatis", key: "ad" as const },
  ], []);
  const announce = (text: string) => setNotice(text);
  return <div className="screen menu-screen"><main className="menu-content"><header className="menu-header"><div><div className="title">Menu</div><div className="badge"><ShieldCheck size={15} /> 17+ aktif</div></div><div className="mascot-wrap"><OctopusMark small /><span className="mascot-spark">✦</span></div></header><div className="welcome-title">Selamat datang kembali</div><div className="welcome-sub">Semua dalam kendali Anda.</div>
    <section className="card">{rows.map(({ icon, title, sub, key }) => <MenuRow key={title} icon={icon} title={title} sub={sub} trailing={key ? <Toggle on={toggles[key]} onChange={() => flip(key)} /> : undefined} onClick={!key ? () => announce(`${title} akan segera tersedia`) : undefined} />)}</section>
    <section className="card">{[[Clock3, "Riwayat", "Jelajahan terakhir"], [ArrowDownToLine, "Unduhan", "File yang diunduh"], [Star, "Favorit", "Situs favorit Anda"]].map(([icon, title, sub]) => <MenuRow key={title as string} icon={icon as typeof ShieldCheck} title={title as string} sub={sub as string} onClick={() => announce(`${title} akan segera tersedia`)} />)}<MenuRow icon={Moon} title="Mode gelap" sub="Nyaman di malam hari" trailing={<Toggle on={toggles.dark} onChange={() => flip("dark")} />} /></section>
    <section className="card"><MenuRow icon={Smartphone} title="Situs desktop" sub="Tampilan versi desktop" trailing={<Toggle on={toggles.desktop} onChange={() => flip("desktop")} />} /><MenuRow icon={Zap} title="Hemat data" sub="Kurangi penggunaan data" trailing={<Toggle on={toggles.data} onChange={() => flip("data")} />} /><MenuRow icon={Settings} title="Pengaturan" sub="Preferensi aplikasi" onClick={() => announce("Pengaturan akan segera tersedia")} /></section>
    <section className="card"><MenuRow icon={Globe2} title="Bahasa" sub="Indonesian" trailing={<span className="lang-value">Indonesia <ChevronRight size={15} /></span>} onClick={() => announce("Pilihan bahasa akan segera tersedia")} /></section>
    {notice && <button className="menu-notice" onClick={() => setNotice("")}><Sparkles size={15} /> {notice}</button>}
  </main><BottomNav screen="menu" onNavigate={onNavigate} /></div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  return <div className="phone">{screen === "home" ? <HomeScreen onNavigate={setScreen} /> : <MenuScreen onNavigate={setScreen} />}</div>;
}

export { OctopusMark };
