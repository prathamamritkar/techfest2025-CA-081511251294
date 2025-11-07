/**
 * Task 5: Vanilla JavaScript Tabs Component
 * Accessible tabbed content with keyboard arrow navigation
 */

export interface TabsOptions {
  containerId: string;
  tabSelector?: string;
  panelSelector?: string;
  activeClass?: string;
  onChange?: (index: number) => void;
  autoActivate?: boolean;
}

export class Tabs {
  private container: HTMLElement;
  private tablist: HTMLElement | null = null;
  private tabs: HTMLElement[] = [];
  private panels: HTMLElement[] = [];
  private activeIndex = 0;
  private options: Required<TabsOptions>;

  constructor(options: TabsOptions) {
    this.options = {
      tabSelector: '[role="tab"]',
      panelSelector: '[role="tabpanel"]',
      activeClass: 'active',
      autoActivate: true,
      onChange: () => {},
      ...options,
    };

    const container = document.getElementById(this.options.containerId);
    if (!container) {
      throw new Error(`Tabs container with id "${this.options.containerId}" not found`);
    }

    this.container = container;
    this.init();
  }

  private init(): void {
    // Find or create tablist
    this.tablist = this.container.querySelector('[role="tablist"]');
    if (!this.tablist) {
      throw new Error('Tablist element with role="tablist" not found');
    }

    // Get tabs and panels
    this.tabs = Array.from(this.container.querySelectorAll<HTMLElement>(this.options.tabSelector));
    this.panels = Array.from(this.container.querySelectorAll<HTMLElement>(this.options.panelSelector));

    if (this.tabs.length === 0) {
      throw new Error('No tab elements found');
    }

    if (this.tabs.length !== this.panels.length) {
      console.warn('Number of tabs and panels do not match');
    }

    // Set up ARIA attributes and event listeners
    this.setupTabs();

    // Activate first tab
    this.activateTab(0);
  }

  private setupTabs(): void {
    this.tabs.forEach((tab, index) => {
      // Set ARIA attributes
      const tabId = tab.id || `tab-${this.options.containerId}-${index}`;
      const panelId = this.panels[index]?.id || `panel-${this.options.containerId}-${index}`;

      tab.id = tabId;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');

      if (this.panels[index]) {
        this.panels[index].id = panelId;
        this.panels[index].setAttribute('role', 'tabpanel');
        this.panels[index].setAttribute('aria-labelledby', tabId);
        this.panels[index].setAttribute('tabindex', '0');
        this.panels[index].hidden = true;
      }

      // Event listeners
      tab.addEventListener('click', () => this.handleTabClick(index));
      tab.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
    });
  }

  private handleTabClick(index: number): void {
    this.activateTab(index);
  }

  private handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = this.tabs.length - 1;
        break;

      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex + 1;
        if (newIndex >= this.tabs.length) newIndex = 0;
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = this.tabs.length - 1;
        break;

      default:
        return;
    }

    // Focus the new tab
    this.tabs[newIndex].focus();

    // Activate if autoActivate is enabled
    if (this.options.autoActivate) {
      this.activateTab(newIndex);
    }
  }

  public activateTab(index: number): void {
    if (index < 0 || index >= this.tabs.length) {
      console.warn(`Invalid tab index: ${index}`);
      return;
    }

    // Deactivate all tabs
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      tab.classList.remove(this.options.activeClass);

      if (this.panels[i]) {
        this.panels[i].hidden = true;
      }
    });

    // Activate selected tab
    this.tabs[index].setAttribute('aria-selected', 'true');
    this.tabs[index].setAttribute('tabindex', '0');
    this.tabs[index].classList.add(this.options.activeClass);

    if (this.panels[index]) {
      this.panels[index].hidden = false;
    }

    this.activeIndex = index;

    // Call onChange callback
    this.options.onChange(index);
  }

  public getActiveIndex(): number {
    return this.activeIndex;
  }

  public destroy(): void {
    this.tabs.forEach((tab, index) => {
      tab.removeEventListener('click', () => this.handleTabClick(index));
      tab.removeEventListener('keydown', (e) => this.handleKeyDown(e, index));
    });
  }
}
