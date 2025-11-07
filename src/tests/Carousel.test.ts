/**
 * Task 5: Unit tests for Carousel component
 */

import { Carousel } from '../lib/vanilla-components/Carousel';

describe('Carousel', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement('div');
    container.innerHTML = `
      <div id="test-carousel">
        <div class="carousel-slides">
          <div class="carousel-slide">Slide 1</div>
          <div class="carousel-slide">Slide 2</div>
          <div class="carousel-slide">Slide 3</div>
        </div>
        <button class="carousel-prev">Previous</button>
        <button class="carousel-next">Next</button>
        <div class="carousel-indicators">
          <button class="carousel-indicator"></button>
          <button class="carousel-indicator"></button>
          <button class="carousel-indicator"></button>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should initialize with correct ARIA attributes', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    
    const carouselEl = document.getElementById('test-carousel');
    expect(carouselEl?.getAttribute('role')).toBe('region');
    expect(carouselEl?.getAttribute('aria-roledescription')).toBe('carousel');
    
    const slide = document.querySelector('.carousel-slide');
    expect(slide?.getAttribute('role')).toBe('group');
    expect(slide?.getAttribute('aria-roledescription')).toBe('slide');
  });

  test('should show first slide initially', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    
    const slides = document.querySelectorAll<HTMLElement>('.carousel-slide');
    expect(slides[0].style.display).toBe('block');
    expect(slides[0].getAttribute('aria-hidden')).toBe('false');
    expect(slides[1].style.display).toBe('none');
    expect(slides[2].style.display).toBe('none');
  });

  test('should navigate to next slide', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    carousel.next();
    
    expect(carousel.getCurrentIndex()).toBe(1);
  });

  test('should navigate to previous slide', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    carousel.goToSlide(1);
    carousel.prev();
    
    expect(carousel.getCurrentIndex()).toBe(0);
  });

  test('should loop to first slide from last', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', loop: true });
    carousel.goToSlide(2);
    carousel.next();
    
    expect(carousel.getCurrentIndex()).toBe(0);
  });

  test('should loop to last slide from first', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', loop: true });
    carousel.prev();
    
    expect(carousel.getCurrentIndex()).toBe(2);
  });

  test('should not loop when disabled', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', loop: false });
    carousel.goToSlide(2);
    carousel.next();
    
    expect(carousel.getCurrentIndex()).toBe(2);
  });

  test('should navigate with keyboard arrows', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    const rightArrow = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    carouselEl.dispatchEvent(rightArrow);
    
    expect(carousel.getCurrentIndex()).toBe(1);
  });

  test('should navigate to first slide with Home key', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    carousel.goToSlide(2);
    const homeKey = new KeyboardEvent('keydown', { key: 'Home' });
    carouselEl.dispatchEvent(homeKey);
    
    expect(carousel.getCurrentIndex()).toBe(0);
  });

  test('should navigate to last slide with End key', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    const endKey = new KeyboardEvent('keydown', { key: 'End' });
    carouselEl.dispatchEvent(endKey);
    
    expect(carousel.getCurrentIndex()).toBe(2);
  });

  test('should update indicators', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    carousel.goToSlide(1);
    
    const indicators = document.querySelectorAll('.carousel-indicator');
    expect(indicators[1].classList.contains('active')).toBe(true);
    expect(indicators[1].getAttribute('aria-current')).toBe('true');
  });

  test('should navigate on indicator click', () => {
    const carousel = new Carousel({ containerId: 'test-carousel' });
    
    const indicators = document.querySelectorAll<HTMLElement>('.carousel-indicator');
    indicators[2].click();
    
    expect(carousel.getCurrentIndex()).toBe(2);
  });

  test('should call onChange callback', () => {
    const onChange = jest.fn();
    const carousel = new Carousel({ containerId: 'test-carousel', onChange });
    
    carousel.next();
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test('should start autoplay', () => {
    const carousel = new Carousel({ 
      containerId: 'test-carousel', 
      autoPlay: true,
      autoPlayInterval: 1000
    });
    
    jest.advanceTimersByTime(1000);
    expect(carousel.getCurrentIndex()).toBe(1);
    
    jest.advanceTimersByTime(1000);
    expect(carousel.getCurrentIndex()).toBe(2);
  });

  test('should pause and resume autoplay', () => {
    const carousel = new Carousel({ 
      containerId: 'test-carousel', 
      autoPlay: true,
      autoPlayInterval: 1000
    });
    
    carousel.pauseAutoPlay();
    jest.advanceTimersByTime(2000);
    expect(carousel.getCurrentIndex()).toBe(0);
    
    carousel.startAutoPlay();
    jest.advanceTimersByTime(1000);
    expect(carousel.getCurrentIndex()).toBe(1);
  });

  test('should handle swipe right', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', swipeThreshold: 50 });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    carousel.goToSlide(1);
    
    const touchStart = new TouchEvent('touchstart', {
      changedTouches: [{ screenX: 200 } as Touch]
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [{ screenX: 300 } as Touch]
    });
    
    carouselEl.dispatchEvent(touchStart);
    carouselEl.dispatchEvent(touchEnd);
    
    expect(carousel.getCurrentIndex()).toBe(0);
  });

  test('should handle swipe left', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', swipeThreshold: 50 });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    const touchStart = new TouchEvent('touchstart', {
      changedTouches: [{ screenX: 300 } as Touch]
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [{ screenX: 200 } as Touch]
    });
    
    carouselEl.dispatchEvent(touchStart);
    carouselEl.dispatchEvent(touchEnd);
    
    expect(carousel.getCurrentIndex()).toBe(1);
  });

  test('should not swipe if threshold not met', () => {
    const carousel = new Carousel({ containerId: 'test-carousel', swipeThreshold: 50 });
    const carouselEl = document.getElementById('test-carousel') as HTMLElement;
    
    const touchStart = new TouchEvent('touchstart', {
      changedTouches: [{ screenX: 200 } as Touch]
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [{ screenX: 220 } as Touch]
    });
    
    carouselEl.dispatchEvent(touchStart);
    carouselEl.dispatchEvent(touchEnd);
    
    expect(carousel.getCurrentIndex()).toBe(0);
  });

  test('should throw error if container not found', () => {
    expect(() => {
      new Carousel({ containerId: 'non-existent-carousel' });
    }).toThrow('Carousel container with id "non-existent-carousel" not found');
  });

  test('should throw error if slides container not found', () => {
    container.innerHTML = '<div id="test-carousel"></div>';
    
    expect(() => {
      new Carousel({ containerId: 'test-carousel' });
    }).toThrow('Slides container with class "carousel-slides" not found');
  });

  test('should throw error if no slides found', () => {
    container.innerHTML = `
      <div id="test-carousel">
        <div class="carousel-slides"></div>
      </div>
    `;
    
    expect(() => {
      new Carousel({ containerId: 'test-carousel' });
    }).toThrow('No slides found');
  });
});
