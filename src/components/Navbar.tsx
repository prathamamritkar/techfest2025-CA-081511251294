import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Leaf } from 'lucide-react';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const menuItems = menuItemsRef.current;

    if (!nav || !logo || !menuItems) return;

    // Initial state
    gsap.set(nav, { y: -100, opacity: 0 });
    gsap.set(logo, { scale: 0, rotation: -180 });
    gsap.set(menuItems.children, { y: -20, opacity: 0 });

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to(nav, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(logo, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4')
    .to(menuItems.children, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.3');

    // Scroll effect
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.inOut' });
      } else {
        // Scrolling up
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={styles.navbar}
    >
      <div style={styles.container}>
        <div ref={logoRef} style={styles.logo}>
          <Leaf size={28} color="#00ff88" />
          <span style={styles.logoText}>NeuroGarden</span>
        </div>

        <div ref={menuItemsRef} style={styles.menu}>
          <a href="#features" style={styles.menuItem}>Features</a>
          <a href="#garden" style={styles.menuItem}>Your Garden</a>
          <a href="#testimonials" style={styles.menuItem}>Stories</a>
          <button className="nav-cta-btn" style={styles.ctaButton}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(10, 14, 39, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
    padding: '20px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  menuItem: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  ctaButton: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    border: 'none',
    borderRadius: '8px',
    color: '#0a0e27',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
