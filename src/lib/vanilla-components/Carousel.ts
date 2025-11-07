/**
 * Task 5: Vanilla JavaScript Carousel Component
 * Carousel/slider with touch swipe and keyboard support
 */

export interface CarouselOptions {
  containerId: string;
  slideSelector?: string;
  prevButtonSelector?: string;
  nextButtonSelector?: string;
  indicatorsSelector?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  swipeThreshold?: number;
  onChange?: (index: number) => void;
}

export class Carousel {
  private container: HTMLElement;
  private slidesContainer: HTMLElement | null = null;
  private slides: HTMLElement[] = [];
  private prevButton: HTMLElement | null = null;
  private nextButton: HTMLElement | null = null;
  private indicators: HTMLElement[] = [];
  private liveRegion: HTMLElement | null = null;
  private currentIndex = 0;
  private autoPlayTimer: number | null = null;
  private touchStartX = 0;
  private touchEndX = 0;
  private options: Required<CarouselOptions>;

  constructor(options: CarouselOptions) {
    this.options = {
      slideSelector: '.carousel-slide',
      prevButtonSelector: '.carousel-prev',
      nextButtonSelector: '.carousel-next',
      indicatorsSelector: '.carousel-indicator',
      autoPlay: false,
      autoPlayInterval: 5000,
      loop: true,
      swipeThreshold: 50,
      onChange: () => {},
      ...options,
    };

    const container = document.getElementById(this.options.containerId);
    if (!container) {
      throw new Error(`Carousel container with id "${this.options.containerId}" not found`);
    }

    this.container = container;
    this.init();
  }

  private init(): void {
    // Find slides container
    this.slidesContainer = this.container.querySelector('.carousel-slides');
    if (!this.slidesContainer) {
      throw new Error('Slides container with class "carousel-slides" not found');
    }

    // Get slides
    this.slides = Array.from(this.container.querySelectorAll<HTMLElement>(this.options.slideSelector));
    
    if (this.slides.length === 0) {
      throw new Error('No slides found');
    }

    // Find controls
    this.prevButton = this.container.querySelector(this.options.prevButtonSelector);
    this.nextButton = this.container.querySelector(this.options.nextButtonSelector);
    this.indicators = Array.from(this.container.querySelectorAll<HTMLElement>(this.options.indicatorsSelector));

    // Create live region for screen readers
    this.createLiveRegion();

    // Set up ARIA attributes
    this.setupAccessibility();

    // Bind events
    this.bindEvents();

    // Show first slide
    this.goToSlide(0);

    // Start autoplay if enabled
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }

  private createLiveRegion(): void {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.padding = '0';
    this.liveRegion.style.margin = '-1px';
    this.liveRegion.style.overflow = 'hidden';
    this.liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    this.liveRegion.style.whiteSpace = 'nowrap';
    this.liveRegion.style.border = '0';
    this.container.appendChild(this.liveRegion);
  }

  private setupAccessibility(): void {
    // Set ARIA attributes on container
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-roledescription', 'carousel');
    this.container.setAttribute('aria-label', 'Image carousel');

    // Set attributes on slides
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`);
      slide.setAttribute('aria-hidden', 'true');
    });

    // Set attributes on buttons
    if (this.prevButton) {
      this.prevButton.setAttribute('aria-label', 'Previous slide');
    }
    if (this.nextButton) {
      this.nextButton.setAttribute('aria-label', 'Next slide');
    }

    // Set attributes on indicators
    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute('role', 'button');
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    });
  }

  private bindEvents(): void {
    // Previous button
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prev());
    }

    // Next button
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.next());
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Keyboard navigation
    this.container.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Touch events
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

    // Pause autoplay on hover/focus
    this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoPlay) this.startAutoPlay();
    });
    this.container.addEventListener('focusin', () => this.pauseAutoPlay());
    this.container.addEventListener('focusout', () => {
      if (this.options.autoPlay) this.startAutoPlay();
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;

      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;

      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;

      case 'End':
        event.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }

  private handleTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  private handleTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > this.options.swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next
        this.next();
      } else {
        // Swiped right - go to previous
        this.prev();
      }
    }
  }

  public goToSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) {
      return;
    }

    // Hide all slides
    this.slides.forEach((slide) => {
      slide.style.display = 'none';
      slide.setAttribute('aria-hidden', 'true');
    });

    // Show current slide
    this.slides[index].style.display = 'block';
    this.slides[index].setAttribute('aria-hidden', 'false');

    // Update indicators
    this.indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });

    // Update buttons
    if (!this.options.loop) {
      if (this.prevButton) {
        this.prevButton.setAttribute('aria-disabled', index === 0 ? 'true' : 'false');
      }
      if (this.nextButton) {
        this.nextButton.setAttribute('aria-disabled', index === this.slides.length - 1 ? 'true' : 'false');
      }
    }

    // Announce to screen readers
    if (this.liveRegion) {
      this.liveRegion.textContent = `Slide ${index + 1} of ${this.slides.length}`;
    }

    this.currentIndex = index;

    // Call onChange callback
    this.options.onChange(index);
  }

  public next(): void {
    let nextIndex = this.currentIndex + 1;
    
    if (nextIndex >= this.slides.length) {
      if (this.options.loop) {
        nextIndex = 0;
      } else {
        return;
      }
    }

    this.goToSlide(nextIndex);
  }

  public prev(): void {
    let prevIndex = this.currentIndex - 1;
    
    if (prevIndex < 0) {
      if (this.options.loop) {
        prevIndex = this.slides.length - 1;
      } else {
        return;
      }
    }

    this.goToSlide(prevIndex);
  }

  public startAutoPlay(): void {
    this.pauseAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.next();
    }, this.options.autoPlayInterval);
  }

  public pauseAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public destroy(): void {
    this.pauseAutoPlay();
    
    if (this.prevButton) {
      this.prevButton.removeEventListener('click', () => this.prev());
    }
    if (this.nextButton) {
      this.nextButton.removeEventListener('click', () => this.next());
    }
    
    this.indicators.forEach((indicator, index) => {
      indicator.removeEventListener('click', () => this.goToSlide(index));
    });
    
    this.container.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.container.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}
