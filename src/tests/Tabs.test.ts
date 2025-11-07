/**
 * Task 5: Unit tests for Tabs component
 */

import { Tabs } from '../lib/vanilla-components/Tabs';

describe('Tabs', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div id="test-tabs">
        <div role="tablist">
          <button role="tab" id="tab-1">Tab 1</button>
          <button role="tab" id="tab-2">Tab 2</button>
          <button role="tab" id="tab-3">Tab 3</button>
        </div>
        <div role="tabpanel" id="panel-1">Panel 1 content</div>
        <div role="tabpanel" id="panel-2">Panel 2 content</div>
        <div role="tabpanel" id="panel-3">Panel 3 content</div>
      </div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should initialize with correct ARIA attributes', () => {
    const tabs = new Tabs({ containerId: 'test-tabs' });
    
    const tab1 = document.getElementById('tab-1');
    const panel1 = document.getElementById('panel-1');
    
    expect(tab1?.getAttribute('aria-controls')).toBe(panel1?.id);
    expect(panel1?.getAttribute('aria-labelledby')).toBe(tab1?.id);
  });

  test('should activate first tab by default', () => {
    const tabs = new Tabs({ containerId: 'test-tabs' });
    
    const tab1 = document.getElementById('tab-1');
    const panel1 = document.getElementById('panel-1');
    
    expect(tab1?.getAttribute('aria-selected')).toBe('true');
    expect(tab1?.getAttribute('tabindex')).toBe('0');
    expect(panel1?.hidden).toBe(false);
  });

  test('should switch tabs on click', () => {
    const tabs = new Tabs({ containerId: 'test-tabs' });
    
    const tab2 = document.getElementById('tab-2') as HTMLButtonElement;
    tab2.click();
    
    expect(tabs.getActiveIndex()).toBe(1);
    expect(tab2.getAttribute('aria-selected')).toBe('true');
  });

  test('should navigate with arrow keys', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', autoActivate: true });
    
    const tab1 = document.getElementById('tab-1') as HTMLButtonElement;
    tab1.focus();
    
    const rightArrow = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tab1.dispatchEvent(rightArrow);
    
    expect(tabs.getActiveIndex()).toBe(1);
  });

  test('should wrap around on arrow navigation', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', autoActivate: true });
    
    const tab3 = document.getElementById('tab-3') as HTMLButtonElement;
    tabs.activateTab(2);
    tab3.focus();
    
    const rightArrow = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tab3.dispatchEvent(rightArrow);
    
    expect(tabs.getActiveIndex()).toBe(0);
  });

  test('should navigate to first tab with Home key', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', autoActivate: true });
    tabs.activateTab(2);
    
    const tab3 = document.getElementById('tab-3') as HTMLButtonElement;
    const homeKey = new KeyboardEvent('keydown', { key: 'Home' });
    tab3.dispatchEvent(homeKey);
    
    expect(tabs.getActiveIndex()).toBe(0);
  });

  test('should navigate to last tab with End key', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', autoActivate: true });
    
    const tab1 = document.getElementById('tab-1') as HTMLButtonElement;
    const endKey = new KeyboardEvent('keydown', { key: 'End' });
    tab1.dispatchEvent(endKey);
    
    expect(tabs.getActiveIndex()).toBe(2);
  });

  test('should call onChange callback', () => {
    const onChange = jest.fn();
    const tabs = new Tabs({ containerId: 'test-tabs', onChange });
    
    tabs.activateTab(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test('should apply active class', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', activeClass: 'active-tab' });
    
    const tab1 = document.getElementById('tab-1');
    expect(tab1?.classList.contains('active-tab')).toBe(true);
    
    tabs.activateTab(1);
    const tab2 = document.getElementById('tab-2');
    expect(tab1?.classList.contains('active-tab')).toBe(false);
    expect(tab2?.classList.contains('active-tab')).toBe(true);
  });

  test('should handle invalid tab index', () => {
    const tabs = new Tabs({ containerId: 'test-tabs' });
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    tabs.activateTab(10);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid tab index: 10');
    expect(tabs.getActiveIndex()).toBe(0);
    
    consoleSpy.mockRestore();
  });

  test('should throw error if container not found', () => {
    expect(() => {
      new Tabs({ containerId: 'non-existent-tabs' });
    }).toThrow('Tabs container with id "non-existent-tabs" not found');
  });

  test('should throw error if tablist not found', () => {
    container.innerHTML = '<div id="no-tablist"></div>';
    
    expect(() => {
      new Tabs({ containerId: 'test-tabs' });
    }).toThrow('Tablist element with role="tablist" not found');
  });

  test('should throw error if no tabs found', () => {
    container.innerHTML = `
      <div id="test-tabs">
        <div role="tablist"></div>
      </div>
    `;
    
    expect(() => {
      new Tabs({ containerId: 'test-tabs' });
    }).toThrow('No tab elements found');
  });

  test('should not auto-activate on arrow navigation when disabled', () => {
    const tabs = new Tabs({ containerId: 'test-tabs', autoActivate: false });
    
    const tab1 = document.getElementById('tab-1') as HTMLButtonElement;
    const rightArrow = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tab1.dispatchEvent(rightArrow);
    
    expect(tabs.getActiveIndex()).toBe(0);
  });
});
