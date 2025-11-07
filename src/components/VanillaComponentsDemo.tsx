/**
 * Task 5: Demo component showcasing vanilla JS components
 * Demonstrates Modal, Tabs, and Carousel in a React app
 */

import { useEffect, useRef } from 'react';
import { Modal, Tabs, Carousel } from '../lib/vanilla-components';

export function VanillaComponentsDemo() {
  const modalInstanceRef = useRef<Modal | null>(null);
  const tabsInstanceRef = useRef<Tabs | null>(null);
  const carouselInstanceRef = useRef<Carousel | null>(null);

  useEffect(() => {
    // Initialize Modal
    if (!modalInstanceRef.current) {
      modalInstanceRef.current = new Modal({
        modalId: 'demo-modal',
        closeOnEscape: true,
        closeOnOutsideClick: true,
        onOpen: () => console.log('Modal opened'),
        onClose: () => console.log('Modal closed'),
      });
    }

    // Initialize Tabs
    if (!tabsInstanceRef.current) {
      tabsInstanceRef.current = new Tabs({
        containerId: 'demo-tabs',
        activeClass: 'tab-active',
        autoActivate: true,
        onChange: (index) => console.log('Tab changed to:', index),
      });
    }

    // Initialize Carousel
    if (!carouselInstanceRef.current) {
      carouselInstanceRef.current = new Carousel({
        containerId: 'demo-carousel',
        autoPlay: true,
        autoPlayInterval: 4000,
        loop: true,
        swipeThreshold: 50,
        onChange: (index) => console.log('Slide changed to:', index),
      });
    }

    // Cleanup
    return () => {
      modalInstanceRef.current?.destroy();
      tabsInstanceRef.current?.destroy();
      carouselInstanceRef.current?.destroy();
    };
  }, []);

  const openModal = () => {
    modalInstanceRef.current?.open();
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Interactive UI Components</h2>
        <p style={styles.description}>
          Vanilla JavaScript components with full accessibility and keyboard support
        </p>

        {/* Modal Demo */}
        <div style={styles.componentDemo}>
          <h3 style={styles.componentTitle}>
            <span style={styles.badge}>1</span> Accessible Modal Dialog
          </h3>
          <p style={styles.componentDesc}>
            Focus trap, ESC to close, outside click, ARIA attributes
          </p>
          <button onClick={openModal} style={styles.demoButton}>
            Open Modal Demo
          </button>
          <ul style={styles.featureList}>
            <li>✓ Focus trap (Tab cycles through modal)</li>
            <li>✓ ESC key to close</li>
            <li>✓ Click outside to close</li>
            <li>✓ Restores focus on close</li>
            <li>✓ Prevents body scroll</li>
          </ul>
        </div>

        {/* Tabs Demo */}
        <div style={styles.componentDemo}>
          <h3 style={styles.componentTitle}>
            <span style={styles.badge}>2</span> Tabbed Content
          </h3>
          <p style={styles.componentDesc}>
            Keyboard arrow navigation, ARIA roles, Home/End keys
          </p>
          
          <div id="demo-tabs" style={styles.tabsContainer}>
            <div role="tablist" style={styles.tablist}>
              <button role="tab" style={styles.tab}>
                Features
              </button>
              <button role="tab" style={styles.tab}>
                Benefits
              </button>
              <button role="tab" style={styles.tab}>
                Specs
              </button>
            </div>
            
            <div role="tabpanel" style={styles.panel}>
              <h4 style={styles.panelTitle}>Product Features</h4>
              <p>• AI-powered cognitive tracking</p>
              <p>• Real-time neural insights</p>
              <p>• Personalized wellness plans</p>
            </div>
            
            <div role="tabpanel" style={styles.panel}>
              <h4 style={styles.panelTitle}>Key Benefits</h4>
              <p>• Improve focus and clarity</p>
              <p>• Reduce cognitive fatigue</p>
              <p>• Optimize brain performance</p>
            </div>
            
            <div role="tabpanel" style={styles.panel}>
              <h4 style={styles.panelTitle}>Technical Specs</h4>
              <p>• Cloud-based processing</p>
              <p>• End-to-end encryption</p>
              <p>• Cross-platform support</p>
            </div>
          </div>

          <ul style={styles.featureList}>
            <li>✓ Arrow keys to navigate (← →)</li>
            <li>✓ Home/End for first/last tab</li>
            <li>✓ ARIA roles and attributes</li>
            <li>✓ Automatic or manual activation</li>
          </ul>
        </div>

        {/* Carousel Demo */}
        <div style={styles.componentDemo}>
          <h3 style={styles.componentTitle}>
            <span style={styles.badge}>3</span> Carousel/Slider
          </h3>
          <p style={styles.componentDesc}>
            Touch swipe, keyboard navigation, auto-play, ARIA live region
          </p>
          
          <div id="demo-carousel" style={styles.carouselContainer}>
            <div className="carousel-slides" style={styles.slidesContainer}>
              <div className="carousel-slide" style={styles.slide}>
                <div style={{...styles.slideContent, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <h4 style={styles.slideTitle}>Neural Mapping</h4>
                  <p style={styles.slideText}>Track your cognitive patterns in real-time</p>
                </div>
              </div>
              <div className="carousel-slide" style={styles.slide}>
                <div style={{...styles.slideContent, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                  <h4 style={styles.slideTitle}>Wellness Garden</h4>
                  <p style={styles.slideText}>Grow your mental wellness daily</p>
                </div>
              </div>
              <div className="carousel-slide" style={styles.slide}>
                <div style={{...styles.slideContent, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                  <h4 style={styles.slideTitle}>Progress Insights</h4>
                  <p style={styles.slideText}>Visualize your cognitive growth</p>
                </div>
              </div>
            </div>
            
            <button className="carousel-prev" style={{...styles.carouselButton, left: '10px'}}>
              ‹
            </button>
            <button className="carousel-next" style={{...styles.carouselButton, right: '10px'}}>
              ›
            </button>
            
            <div className="carousel-indicators" style={styles.indicators}>
              <button className="carousel-indicator" style={styles.indicator}></button>
              <button className="carousel-indicator" style={styles.indicator}></button>
              <button className="carousel-indicator" style={styles.indicator}></button>
            </div>
          </div>

          <ul style={styles.featureList}>
            <li>✓ Touch swipe support</li>
            <li>✓ Keyboard arrows (← →)</li>
            <li>✓ Auto-play with pause on hover</li>
            <li>✓ ARIA live announcements</li>
            <li>✓ Loop or stop at ends</li>
          </ul>
        </div>
      </div>

      {/* Modal Markup */}
      <div id="demo-modal" style={styles.modal}>
        <div style={styles.modalContent}>
          <h2 id="modal-title" style={styles.modalTitle}>
            Accessible Modal Demo
          </h2>
          <p id="modal-description" style={styles.modalDescription}>
            This modal demonstrates proper accessibility features:
          </p>
          <ul style={styles.modalList}>
            <li><strong>Focus Trap:</strong> Press Tab to cycle through focusable elements</li>
            <li><strong>ESC Key:</strong> Press Escape to close</li>
            <li><strong>Outside Click:</strong> Click the backdrop to close</li>
            <li><strong>ARIA Attributes:</strong> Properly labeled for screen readers</li>
          </ul>
          <div style={styles.modalActions}>
            <button 
              onClick={() => modalInstanceRef.current?.close()} 
              style={styles.modalButton}
            >
              Close Modal
            </button>
            <button style={{...styles.modalButton, ...styles.modalButtonSecondary}}>
              Another Action
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .tab-active {
          background: linear-gradient(135deg, #00ff88, #00ccff) !important;
          color: #0a0e27 !important;
          border-color: #00ff88 !important;
        }

        .carousel-indicator.active {
          background: #00ff88 !important;
          transform: scale(1.2);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        #demo-modal[style*="display: flex"] {
          animation: fadeIn 0.2s ease-out;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    padding: 'clamp(60px, 12vh, 120px) clamp(20px, 5vw, 40px)',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: 'clamp(32px, 5vw, 48px)',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
  description: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center' as const,
    marginBottom: '60px',
    maxWidth: '700px',
    margin: '0 auto 60px',
  },
  componentDemo: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '16px',
    padding: 'clamp(24px, 4vw, 40px)',
    marginBottom: '40px',
    backdropFilter: 'blur(10px)',
  },
  componentTitle: {
    fontSize: 'clamp(24px, 3vw, 32px)',
    color: '#ffffff',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    color: '#0a0e27',
    fontWeight: 'bold' as const,
    fontSize: '18px',
  },
  componentDesc: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '24px',
  },
  demoButton: {
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    border: 'none',
    borderRadius: '8px',
    color: '#0a0e27',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0 0',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.8',
  },
  tabsContainer: {
    marginBottom: '24px',
  },
  tablist: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '0',
  },
  tab: {
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: 'none',
    borderRadius: '8px 8px 0 0',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
  },
  panel: {
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    minHeight: '150px',
  },
  panelTitle: {
    fontSize: '20px',
    color: '#00ff88',
    marginBottom: '16px',
  },
  carouselContainer: {
    position: 'relative' as const,
    maxWidth: '600px',
    margin: '0 auto 24px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  slidesContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '300px',
  },
  slide: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  slideContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px',
    textAlign: 'center' as const,
  },
  slideTitle: {
    fontSize: '28px',
    color: '#ffffff',
    marginBottom: '12px',
  },
  slideText: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  carouselButton: {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: '#ffffff',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10,
  },
  indicators: {
    position: 'absolute' as const,
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },
  modalContent: {
    background: 'linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%)',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 255, 136, 0.2)',
  },
  modalTitle: {
    fontSize: '28px',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
  },
  modalDescription: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '20px',
  },
  modalList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '30px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.8',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    border: 'none',
    borderRadius: '8px',
    color: '#0a0e27',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalButtonSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
};
