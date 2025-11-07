import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Title animation
    gsap.fromTo(
      title,
      { 
        y: 50, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cards stagger animation
    gsap.fromTo(
      cards.children,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} style={styles.section}>
      <h2 ref={titleRef} style={styles.title}>
        Growing Stories
      </h2>
      
      <div ref={cardsRef} style={styles.cardsContainer}>
        <div style={styles.card}>
          <Quote size={32} style={styles.quoteIcon} />
          <p style={styles.quote}>
            "NeuroGarden transformed my meditation practice. Watching my garden bloom as I progress is incredibly motivating."
          </p>
          <div style={styles.author}>
            <div style={styles.avatar}>🌸</div>
            <div>
              <div style={styles.name}>Sarah Chen</div>
              <div style={styles.role}>Mindfulness Coach</div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <Quote size={32} style={styles.quoteIcon} />
          <p style={styles.quote}>
            "The AI-powered insights helped me understand my cognitive patterns. My focus has improved dramatically."
          </p>
          <div style={styles.author}>
            <div style={styles.avatar}>🧠</div>
            <div>
              <div style={styles.name}>Marcus Johnson</div>
              <div style={styles.role}>Software Engineer</div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <Quote size={32} style={styles.quoteIcon} />
          <p style={styles.quote}>
            "Beautiful visualization meets effective training. This is the future of cognitive wellness."
          </p>
          <div style={styles.author}>
            <div style={styles.avatar}>✨</div>
            <div>
              <div style={styles.name}>Dr. Elena Rodriguez</div>
              <div style={styles.role}>Neuroscientist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '120px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    textAlign: 'center' as const,
    marginBottom: '60px',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '40px',
    background: 'rgba(0, 255, 136, 0.05)',
    borderRadius: '20px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    backdropFilter: 'blur(10px)',
    position: 'relative' as const,
  },
  quoteIcon: {
    color: '#00ff88',
    opacity: 0.3,
    marginBottom: '20px',
  },
  quote: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '30px',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(0, 255, 136, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
  },
  role: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
};
