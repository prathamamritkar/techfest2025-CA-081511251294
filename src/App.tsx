import { useState, useEffect, useRef, FormEvent } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { PlayCircle, Sparkles, Brain, Leaf, ArrowRight, CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { ParticleField } from "./components/ParticleField";
import { MouseGlow } from "./components/MouseGlow";
import { GardenVisualizer } from "./components/GardenVisualizer";
import { FloatingIcon } from "./components/FloatingIcon";
import { Navbar } from "./components/Navbar";
import { TestimonialSection } from "./components/TestimonialSection";

gsap.registerPlugin(ScrollTrigger);

// Task 3: Form validation interfaces
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}

export default function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Task 3: Contact form state
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Refs for animations (Task 2)
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const gardenSectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const founderSectionRef = useRef<HTMLDivElement>(null);
  
  // Task 3: Contact section ref
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const firstErrorRef = useRef<HTMLInputElement>(null);

  const handleStartGrowing = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome ${name}! We'll send getting started info to ${email}`);
    setEmail("");
    setName("");
  };

  // Task 3: Plain JavaScript validation functions (no libraries)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateSubject = (subject: string): boolean => {
    return subject.trim().length >= 3;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  // Task 3: Field-level validation
  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (!validateName(value)) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (!validateSubject(value)) return 'Subject must be at least 3 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (!validateMessage(value)) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  // Task 3: Form-level validation
  const validateContactForm = (): boolean => {
    const errors: FormErrors = {};
    
    Object.keys(contactForm).forEach((key) => {
      const error = validateField(key as keyof ContactFormData, contactForm[key as keyof ContactFormData]);
      if (error) {
        errors[key as keyof ContactFormData] = error;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Task 3: Handle input change with real-time validation
  const handleContactChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setContactForm(prev => ({ ...prev, [field]: value }));
    
    // Only show errors for touched fields
    if (touched[field]) {
      const error = validateField(field, value);
      setFormErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  // Task 3: Handle blur to mark field as touched
  const handleBlur = (field: keyof ContactFormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, contactForm[field]);
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Task 3: Mock API submission
  const submitToAPI = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock endpoint - 90% success rate for demo
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        message: `Thank you ${data.name}! We've received your message and will get back to you at ${data.email} soon.`
      };
    } else {
      return {
        success: false,
        message: 'Oops! Something went wrong. Please try again.'
      };
    }
  };

  // Task 3: Handle form submission
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(contactForm).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate form
    if (!validateContactForm()) {
      // Focus first error field for accessibility
      setTimeout(() => {
        if (firstErrorRef.current) {
          firstErrorRef.current.focus();
        }
      }, 100);
      
      setFormState({
        status: 'error',
        message: 'Please fix the errors above before submitting.'
      });
      return;
    }

    // Submit form
    setFormState({ status: 'submitting', message: '' });
    
    try {
      const response = await submitToAPI(contactForm);
      
      if (response.success) {
        setFormState({
          status: 'success',
          message: response.message
        });
        
        // Reset form
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTouched({});
        setFormErrors({});
        
        // Scroll to success message
        setTimeout(() => {
          const successElement = document.getElementById('form-status');
          if (successElement) {
            successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      } else {
        setFormState({
          status: 'error',
          message: response.message
        });
      }
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  // TASK 2: Hero section entrance animation
  useEffect(() => {
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const description = descriptionRef.current;
    const ctaContainer = ctaContainerRef.current;

    if (!headline || !subheadline || !description || !ctaContainer) return;

    // Set initial states
    gsap.set([headline, subheadline, description, ctaContainer], { 
      y: 60, 
      opacity: 0 
    });

    // Create timeline for hero entrance
    const tl = gsap.timeline({ delay: 1.2 });
    
    tl.to(headline, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(subheadline, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .to(description, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .to(ctaContainer.children, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.4');
  }, []);

  // TASK 2: Features section scroll animation
  useEffect(() => {
    const features = featuresRef.current;
    if (!features) return;

    gsap.fromTo(
      features.children,
      { 
        y: 100, 
        opacity: 0,
        rotateX: 45,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: features,
          start: 'top 75%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // TASK 2: Garden section scroll animation
  useEffect(() => {
    const gardenSection = gardenSectionRef.current;
    const statsContainer = statsContainerRef.current;
    
    if (!gardenSection || !statsContainer) return;

    // Animate garden section background
    gsap.fromTo(
      gardenSection,
      { 
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gardenSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate stats cards
    gsap.fromTo(
      statsContainer.children,
      { 
        y: 60,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: statsContainer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // TASK 2: Button hover animations using GSAP
  useEffect(() => {
    const buttons = document.querySelectorAll('.animated-button');
    
    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        // Pulse effect
        gsap.to(button, {
          boxShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        gsap.to(button, {
          boxShadow: '0 0 0px rgba(0, 255, 136, 0)',
          duration: 0.3,
        });
      };

      const handleClick = () => {
        // Bounce animation on click
        gsap.timeline()
          .to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.in',
          })
          .to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: 'back.out(3)',
          })
          .to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('click', handleClick);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('click', handleClick);
      };
    });
  }, []);

  // TASK 3: Contact section scroll animation
  useEffect(() => {
    const contactSection = contactSectionRef.current;
    if (!contactSection) return;

    gsap.fromTo(
      contactSection,
      { 
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // TASK 2: Footer fade-in animation
  useEffect(() => {
    const footer = footerRef.current;
    const founderSection = founderSectionRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { 
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Founder section special animation
    if (founderSection) {
      gsap.fromTo(
        founderSection,
        {
          scale: 0.9,
          opacity: 0,
          rotateY: -15,
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: founderSection,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Creative background effects */}
      <ParticleField />
      <MouseGlow />
      
      {/* Animated Navbar */}
      <Navbar />
      
      {/* Floating garden icons */}
      <FloatingIcon emoji="🌸" delay={0} duration={15} startX={10} />
      <FloatingIcon emoji="🍃" delay={3} duration={18} startX={25} />
      <FloatingIcon emoji="🌺" delay={6} duration={16} startX={40} />
      <FloatingIcon emoji="🌿" delay={2} duration={17} startX={60} />
      <FloatingIcon emoji="🌻" delay={8} duration={19} startX={75} />
      <FloatingIcon emoji="🍀" delay={5} duration={14} startX={90} />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" style={styles.skipLink}>
        Skip to main content
      </a>

      <main id="main-content" style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero} aria-labelledby="hero-heading">
          {/* Decorative floating orbs */}
          <div style={styles.orb1} aria-hidden="true"></div>
          <div style={styles.orb2} aria-hidden="true"></div>
          <div style={styles.orb3} aria-hidden="true"></div>

          <div ref={heroContentRef} style={styles.content}>
            <h1 
              id="hero-heading" 
              ref={headlineRef}
              className="glitch-text" 
              style={styles.headline}
            >
              Grow Your Mind,
              <br />
              Cultivate Wellness
            </h1>

            <p 
              ref={subheadlineRef}
              className="gradient-wave-text" 
              style={styles.subheadline}
            >
              AI-powered cognitive training that blooms with you
            </p>

            <p ref={descriptionRef} style={styles.description}>
              Transform mindfulness and memory exercises into a thriving digital garden. 
              Watch your progress bloom as you strengthen your mind.
            </p>

            <div ref={ctaContainerRef} style={styles.ctaContainer}>
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="animated-button"
                    style={styles.primaryButton}
                    aria-label="Start your cognitive training journey"
                  >
                    Start Growing
                    <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start Your Journey</DialogTitle>
                    <DialogDescription>
                      Join thousands cultivating their cognitive wellness with NeuroGarden
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleStartGrowing} style={styles.form}>
                    <div style={styles.formField}>
                      <label htmlFor="name" style={styles.label}>Full Name</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div style={styles.formField}>
                      <label htmlFor="email" style={styles.label}>Email Address</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full animated-button">
                      Get Started
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="animated-button"
                    style={styles.secondaryButton}
                    aria-label="Watch a demonstration of NeuroGarden"
                  >
                    <PlayCircle size={20} style={{ marginRight: '8px' }} />
                    Watch Demo
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>See NeuroGarden in Action</DialogTitle>
                    <DialogDescription>
                      Discover how NeuroGarden transforms cognitive training
                    </DialogDescription>
                  </DialogHeader>
                  <div style={styles.videoPlaceholder}>
                    <PlayCircle size={64} color="#00ff88" />
                    <p style={styles.videoText}>Demo Video Coming Soon</p>
                    <p style={styles.videoSubtext}>
                      Watch as your mental exercises bloom into a vibrant garden ecosystem
                    </p>
                  </div>
                  <div style={styles.demoFeatures}>
                    <h4 style={styles.demoFeaturesTitle}>What you'll see:</h4>
                    <ul style={styles.featureList}>
                      <li>Real-time garden growth based on cognitive progress</li>
                      <li>AI-powered personalized exercise recommendations</li>
                      <li>Beautiful visualizations of your neural pathways</li>
                      <li>Community gardens and collaborative challenges</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={styles.featuresSection}>
          <div ref={featuresRef} style={styles.features}>
            <article className="feature-card hover-lift" style={styles.featureCard}>
              <div className="feature-icon-wrapper" style={styles.featureIconWrapper}>
                <div style={styles.featureIcon} aria-hidden="true">🧠</div>
              </div>
              <h2 style={styles.featureTitle}>Neural Mapping</h2>
              <p style={styles.featureText}>
                AI-powered insights track your cognitive patterns in real-time
              </p>
              <div className="feature-glow" style={styles.featureGlow}></div>
            </article>

            <article className="feature-card hover-lift" style={styles.featureCard}>
              <div className="feature-icon-wrapper" style={styles.featureIconWrapper}>
                <div style={styles.featureIcon} aria-hidden="true">🌱</div>
              </div>
              <h2 style={styles.featureTitle}>Live Progress</h2>
              <p style={styles.featureText}>
                Your growth visualized as a living, breathing garden ecosystem
              </p>
              <div className="feature-glow" style={styles.featureGlow}></div>
            </article>

            <article className="feature-card hover-lift" style={styles.featureCard}>
              <div className="feature-icon-wrapper" style={styles.featureIconWrapper}>
                <div style={styles.featureIcon} aria-hidden="true">✨</div>
              </div>
              <h2 style={styles.featureTitle}>Adaptive Training</h2>
              <p style={styles.featureText}>
                Exercises that evolve with your unique cognitive profile
              </p>
              <div className="feature-glow" style={styles.featureGlow}></div>
            </article>
          </div>
        </section>

        {/* Garden Stats Section */}
        <section id="garden" ref={gardenSectionRef} style={styles.gardenSection}>
          <h2 style={styles.sectionTitle}>Watch Your Garden Grow</h2>
          
          {/* Live Garden Visualization */}
          <GardenVisualizer />

          <div ref={statsContainerRef} style={styles.statsContainer}>
            <div className="stat-card" style={styles.statCard}>
              <Brain size={32} style={styles.statIcon} />
              <div style={styles.statNumber}>50K+</div>
              <div style={styles.statLabel}>Active Minds</div>
            </div>
            <div className="stat-card" style={styles.statCard}>
              <Sparkles size={32} style={styles.statIcon} />
              <div style={styles.statNumber}>2.5M</div>
              <div style={styles.statLabel}>Exercises Completed</div>
            </div>
            <div className="stat-card" style={styles.statCard}>
              <Leaf size={32} style={styles.statIcon} />
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Satisfaction Rate</div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* TASK 3: Contact Section */}
        <section 
          id="contact" 
          ref={contactSectionRef}
          style={styles.contactSection}
          aria-labelledby="contact-heading"
        >
          <div style={styles.contactContainer}>
            <div style={styles.contactHeader}>
              <Mail size={48} style={styles.contactIcon} aria-hidden="true" />
              <h2 id="contact-heading" style={styles.sectionTitle}>
                Get In Touch
              </h2>
              <p style={styles.contactIntro}>
                Have questions? We'd love to hear from you. Send us a message and 
                we'll respond as soon as possible.
              </p>
            </div>

            {/* Form Status Message */}
            {formState.status !== 'idle' && (
              <div 
                id="form-status"
                className={`form-status form-status-${formState.status}`}
                role="alert"
                aria-live="polite"
                style={styles.formStatus}
              >
                {formState.status === 'success' && (
                  <CheckCircle2 size={24} style={styles.formStatusIcon} aria-hidden="true" />
                )}
                {formState.status === 'error' && (
                  <XCircle size={24} style={styles.formStatusIcon} aria-hidden="true" />
                )}
                {formState.status === 'submitting' && (
                  <Loader2 size={24} className="spinner" style={styles.formStatusIcon} aria-hidden="true" />
                )}
                <p style={styles.formStatusMessage}>{formState.message}</p>
              </div>
            )}

            <form 
              ref={contactFormRef}
              onSubmit={handleContactSubmit} 
              style={styles.contactForm}
              noValidate
              aria-label="Contact form"
            >
              <div style={styles.formRow}>
                {/* Name Field */}
                <div style={styles.formGroup}>
                  <label htmlFor="contact-name" style={styles.formLabel}>
                    Full Name <span style={styles.required} aria-label="required">*</span>
                  </label>
                  <input
                    ref={formErrors.name ? firstErrorRef : null}
                    type="text"
                    id="contact-name"
                    name="name"
                    className={formErrors.name ? 'error' : ''}
                    style={{...styles.formInput, ...(formErrors.name ? styles.formInputError : {})}}
                    value={contactForm.name}
                    onChange={handleContactChange('name')}
                    onBlur={handleBlur('name')}
                    aria-required="true"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    disabled={formState.status === 'submitting'}
                  />
                  {formErrors.name && (
                    <span id="name-error" style={styles.formError} role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div style={styles.formGroup}>
                  <label htmlFor="contact-email" style={styles.formLabel}>
                    Email Address <span style={styles.required} aria-label="required">*</span>
                  </label>
                  <input
                    ref={!formErrors.name && formErrors.email ? firstErrorRef : null}
                    type="email"
                    id="contact-email"
                    name="email"
                    className={formErrors.email ? 'error' : ''}
                    style={{...styles.formInput, ...(formErrors.email ? styles.formInputError : {})}}
                    value={contactForm.email}
                    onChange={handleContactChange('email')}
                    onBlur={handleBlur('email')}
                    aria-required="true"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    disabled={formState.status === 'submitting'}
                  />
                  {formErrors.email && (
                    <span id="email-error" style={styles.formError} role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div style={styles.formGroup}>
                <label htmlFor="contact-subject" style={styles.formLabel}>
                  Subject <span style={styles.required} aria-label="required">*</span>
                </label>
                <input
                  ref={!formErrors.name && !formErrors.email && formErrors.subject ? firstErrorRef : null}
                  type="text"
                  id="contact-subject"
                  name="subject"
                  className={formErrors.subject ? 'error' : ''}
                  style={{...styles.formInput, ...(formErrors.subject ? styles.formInputError : {})}}
                  value={contactForm.subject}
                  onChange={handleContactChange('subject')}
                  onBlur={handleBlur('subject')}
                  aria-required="true"
                  aria-invalid={!!formErrors.subject}
                  aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                  disabled={formState.status === 'submitting'}
                />
                {formErrors.subject && (
                  <span id="subject-error" style={styles.formError} role="alert">
                    {formErrors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div style={styles.formGroup}>
                <label htmlFor="contact-message" style={styles.formLabel}>
                  Message <span style={styles.required} aria-label="required">*</span>
                </label>
                <textarea
                  ref={!formErrors.name && !formErrors.email && !formErrors.subject && formErrors.message ? firstErrorRef : null}
                  id="contact-message"
                  name="message"
                  rows={6}
                  className={formErrors.message ? 'error' : ''}
                  style={{...styles.formTextarea, ...(formErrors.message ? styles.formInputError : {})}}
                  value={contactForm.message}
                  onChange={handleContactChange('message')}
                  onBlur={handleBlur('message')}
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : 'message-hint'}
                  disabled={formState.status === 'submitting'}
                />
                {!formErrors.message && (
                  <span id="message-hint" style={styles.formHint}>
                    Minimum 10 characters
                  </span>
                )}
                {formErrors.message && (
                  <span id="message-error" style={styles.formError} role="alert">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="animated-button"
                style={{
                  ...styles.submitButton,
                  ...(formState.status === 'submitting' ? styles.submitButtonDisabled : {})
                }}
                disabled={formState.status === 'submitting'}
                aria-label={formState.status === 'submitting' ? 'Submitting form' : 'Submit contact form'}
              >
                {formState.status === 'submitting' ? (
                  <>
                    <Loader2 className="spinner" size={20} style={{ marginRight: '8px' }} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer ref={footerRef} style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <Leaf size={32} color="#00ff88" />
              <span style={styles.footerLogo}>NeuroGarden</span>
            </div>
            <p style={styles.footerText}>
              Cultivating cognitive wellness through AI-powered training
            </p>
            <div ref={founderSectionRef} style={styles.founderSection}>
              <p style={styles.founderLabel}>Founded by</p>
              <p style={styles.founderName}>Pratham Amritkar</p>
              <p style={styles.founderTagline}>
                Pioneering the intersection of AI, neuroscience, and wellness
              </p>
            </div>
            <div style={styles.footerLinks}>
              <a href="#" style={styles.footerLink}>Privacy</a>
              <span style={styles.footerDivider}>•</span>
              <a href="#" style={styles.footerLink}>Terms</a>
              <span style={styles.footerDivider}>•</span>
              <a href="#contact" style={styles.footerLink}>Contact</a>
            </div>
            <p style={styles.copyright}>
              © 2025 NeuroGarden. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes glitch {
          0% { text-shadow: 2px 2px #00ff88, -2px -2px #00ccff; }
          25% { text-shadow: -2px 2px #ff00ff, 2px -2px #00ff88; }
          50% { text-shadow: 2px -2px #00ccff, -2px 2px #ff00ff; }
          75% { text-shadow: -2px -2px #00ff88, 2px 2px #00ccff; }
          100% { text-shadow: 2px 2px #00ff88, -2px -2px #00ccff; }
        }

        .glitch-text {
          animation: glitch 3s infinite;
        }

        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-wave-text {
          background: linear-gradient(90deg, #00ff88, #00ccff, #ff00ff, #00ff88);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientWave 4s ease infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -10px) scale(1.05);
          }
          50% {
            transform: translate(-5px, 10px) scale(0.95);
          }
          75% {
            transform: translate(-10px, -5px) scale(1.02);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.8);
          }
        }

        .feature-card {
          animation: fadeInUp 0.8s ease forwards;
          animation-delay: calc(var(--delay) * 0.2s);
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card:nth-child(1) {
          --delay: 1;
        }

        .feature-card:nth-child(2) {
          --delay: 2;
        }

        .feature-card:nth-child(3) {
          --delay: 3;
        }

        .feature-card {
          position: relative;
          overflow: hidden;
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
          border-color: rgba(0, 255, 136, 0.4);
        }

        .hover-lift:hover .feature-glow {
          opacity: 1;
        }

        .feature-icon-wrapper {
          position: relative;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* TASK 3: Spinner animation */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        /* TASK 3: Form status animations */
        .form-status-success {
          background: rgba(0, 255, 136, 0.1) !important;
          border-color: rgba(0, 255, 136, 0.3) !important;
          color: #00ff88 !important;
        }

        .form-status-error {
          background: rgba(255, 107, 107, 0.1) !important;
          border-color: rgba(255, 107, 107, 0.3) !important;
          color: #ff6b6b !important;
        }

        .form-status-submitting {
          background: rgba(0, 204, 255, 0.1) !important;
          border-color: rgba(0, 204, 255, 0.3) !important;
          color: #00ccff !important;
        }

        /* TASK 3: Focus visible for keyboard navigation */
        a:focus-visible,
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 3px solid #00ff88;
          outline-offset: 2px;
        }

        /* TASK 3: Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* TASK 3: Mobile-first responsive breakpoints (320px base) */
        
        /* Small mobile (320px - 480px) - Base styles */
        @media (max-width: 480px) {
          .feature-card,
          .stat-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Mobile (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .feature-card,
          .stat-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Tablet (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Styles handled by default responsive grid */
        }

        /* Desktop (1025px - 1440px) */
        @media (min-width: 1025px) and (max-width: 1440px) {
          /* Styles handled by default layout */
        }

        /* Large desktop (1441px+) */
        @media (min-width: 1441px) {
          /* Styles handled by max-width constraints */
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
    color: '#ffffff',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  skipLink: {
    position: 'absolute' as const,
    top: '-40px',
    left: 0,
    background: '#00ff88',
    color: '#0a0e27',
    padding: '8px 16px',
    textDecoration: 'none',
    zIndex: 9999,
    fontWeight: '600',
    borderRadius: '0 0 4px 0',
  },
  main: {
    position: 'relative' as const,
    zIndex: 2,
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 40px) 40px',
    position: 'relative' as const,
  },
  orb1: {
    position: 'absolute' as const,
    top: '10%',
    left: '10%',
    width: 'clamp(200px, 30vw, 300px)',
    height: 'clamp(200px, 30vw, 300px)',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.15), transparent)',
    filter: 'blur(60px)',
    animation: 'float 8s ease-in-out infinite',
  },
  orb2: {
    position: 'absolute' as const,
    top: '60%',
    right: '15%',
    width: 'clamp(250px, 40vw, 400px)',
    height: 'clamp(250px, 40vw, 400px)',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 204, 255, 0.15), transparent)',
    filter: 'blur(80px)',
    animation: 'float 10s ease-in-out infinite',
    animationDelay: '2s',
  },
  orb3: {
    position: 'absolute' as const,
    bottom: '20%',
    left: '50%',
    width: 'clamp(200px, 35vw, 350px)',
    height: 'clamp(200px, 35vw, 350px)',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1), transparent)',
    filter: 'blur(70px)',
    animation: 'float 12s ease-in-out infinite',
    animationDelay: '4s',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center' as const,
    position: 'relative' as const,
    zIndex: 3,
  },
  headline: {
    fontSize: 'clamp(32px, 8vw, 72px)',
    fontWeight: '900',
    marginBottom: '24px',
    lineHeight: '1.1',
    color: '#ffffff',
  },
  subheadline: {
    fontSize: 'clamp(18px, 4vw, 28px)',
    marginBottom: '24px',
    fontWeight: '600',
  },
  description: {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '40px',
    maxWidth: '700px',
    margin: '0 auto 40px',
    padding: '0 20px',
  },
  ctaContainer: {
    display: 'flex',
    gap: 'clamp(12px, 3vw, 20px)',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    padding: '0 20px',
  },
  primaryButton: {
    padding: 'clamp(14px, 2.5vw, 18px) clamp(24px, 5vw, 40px)',
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    border: 'none',
    borderRadius: '12px',
    color: '#0a0e27',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    padding: 'clamp(14px, 2.5vw, 18px) clamp(24px, 5vw, 40px)',
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: '700',
    background: 'transparent',
    border: '2px solid #00ff88',
    borderRadius: '12px',
    color: '#00ff88',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  featuresSection: {
    padding: 'clamp(60px, 12vh, 120px) clamp(20px, 5vw, 40px)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(24px, 4vw, 40px)',
    perspective: '1000px',
  },
  featureCard: {
    padding: 'clamp(30px, 5vw, 50px) clamp(20px, 4vw, 30px)',
    background: 'rgba(0, 255, 136, 0.05)',
    borderRadius: '24px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)',
    transformStyle: 'preserve-3d' as const,
  },
  featureIconWrapper: {
    display: 'inline-block',
    marginBottom: '20px',
  },
  featureIcon: {
    fontSize: 'clamp(48px, 8vw, 64px)',
    marginBottom: '24px',
    display: 'inline-block',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))',
  },
  featureTitle: {
    fontSize: 'clamp(22px, 3.5vw, 28px)',
    fontWeight: '800',
    marginBottom: '16px',
    color: '#ffffff',
  },
  featureText: {
    fontSize: 'clamp(14px, 2vw, 18px)',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  featureGlow: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none' as const,
  },
  gardenSection: {
    padding: 'clamp(60px, 12vh, 120px) clamp(20px, 5vw, 40px)',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'rgba(0, 255, 136, 0.02)',
    borderRadius: 'clamp(20px, 4vw, 40px)',
    border: '1px solid rgba(0, 255, 136, 0.1)',
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: '800',
    textAlign: 'center' as const,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
    gap: 'clamp(20px, 3vw, 30px)',
    marginTop: 'clamp(40px, 6vw, 60px)',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 'clamp(30px, 4vw, 40px) clamp(20px, 3vw, 30px)',
    background: 'rgba(0, 255, 136, 0.05)',
    borderRadius: '20px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  statIcon: {
    color: '#00ff88',
    marginBottom: '16px',
    filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))',
  },
  statNumber: {
    fontSize: 'clamp(32px, 5vw, 40px)',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  // TASK 3: Contact section styles
  contactSection: {
    padding: 'clamp(60px, 12vh, 120px) clamp(20px, 5vw, 40px)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  contactContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  contactHeader: {
    textAlign: 'center' as const,
    marginBottom: 'clamp(30px, 5vw, 48px)',
  },
  contactIcon: {
    color: '#00ff88',
    margin: '0 auto 24px',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))',
  },
  contactIntro: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginTop: '16px',
    padding: '0 20px',
  },
  formStatus: {
    padding: 'clamp(14px, 2vw, 16px) clamp(20px, 3vw, 24px)',
    borderRadius: '12px',
    marginBottom: 'clamp(20px, 3vw, 24px)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 2vw, 16px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  formStatusIcon: {
    flexShrink: 0,
  },
  formStatusMessage: {
    flex: 1,
    margin: 0,
    fontSize: 'clamp(14px, 2vw, 16px)',
  },
  contactForm: {
    background: 'rgba(0, 255, 136, 0.03)',
    padding: 'clamp(24px, 4vw, 32px)',
    borderRadius: '20px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
    marginBottom: 'clamp(16px, 3vw, 24px)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  formLabel: {
    fontWeight: '600',
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  formInput: {
    padding: 'clamp(12px, 2vw, 14px) clamp(14px, 2.5vw, 16px)',
    fontSize: 'clamp(14px, 2vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    width: '100%',
  },
  formInputError: {
    borderColor: '#ff6b6b',
  },
  formTextarea: {
    padding: 'clamp(12px, 2vw, 14px) clamp(14px, 2.5vw, 16px)',
    fontSize: 'clamp(14px, 2vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    width: '100%',
    resize: 'vertical' as const,
    minHeight: '120px',
  },
  formHint: {
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  formError: {
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    color: '#ff6b6b',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  required: {
    color: '#ff6b6b',
  },
  submitButton: {
    width: '100%',
    padding: 'clamp(14px, 2.5vw, 16px) clamp(24px, 4vw, 32px)',
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    border: 'none',
    borderRadius: '12px',
    color: '#0a0e27',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    marginTop: 'clamp(16px, 3vw, 24px)',
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  footer: {
    padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 40px) clamp(32px, 5vh, 48px)',
    borderTop: '1px solid rgba(0, 255, 136, 0.1)',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  footerLogo: {
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  footerText: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '24px',
    padding: '0 20px',
  },
  founderSection: {
    margin: 'clamp(24px, 4vh, 32px) auto',
    padding: 'clamp(20px, 3vw, 24px)',
    background: 'rgba(0, 255, 136, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    maxWidth: '500px',
  },
  founderLabel: {
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '8px',
  },
  founderName: {
    fontSize: 'clamp(20px, 3vw, 24px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '4px',
  },
  founderTagline: {
    fontSize: 'clamp(13px, 2vw, 15px)',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'clamp(12px, 2vw, 16px)',
    margin: 'clamp(20px, 3vh, 24px) 0',
    flexWrap: 'wrap' as const,
    padding: '0 20px',
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: 'clamp(13px, 2vw, 15px)',
    transition: 'color 0.3s ease',
  },
  footerDivider: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  copyright: {
    fontSize: 'clamp(12px, 1.8vw, 14px)',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  videoPlaceholder: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(40px, 6vw, 60px)',
    background: 'rgba(0, 255, 136, 0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 255, 136, 0.2)',
    minHeight: '300px',
  },
  videoText: {
    fontSize: 'clamp(18px, 3vw, 24px)',
    fontWeight: '700',
    marginTop: '20px',
    color: '#ffffff',
  },
  videoSubtext: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '12px',
    textAlign: 'center' as const,
    maxWidth: '500px',
    padding: '0 20px',
  },
  demoFeatures: {
    marginTop: '24px',
    textAlign: 'left' as const,
  },
  demoFeaturesTitle: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#00ff88',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
};
