/**
 * Task 5: Vanilla JavaScript Modal Component
 * Accessible modal dialog with focus trap and keyboard support
 */

export interface ModalOptions {
  modalId: string;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  focusOnOpen?: boolean;
  restoreFocus?: boolean;
}

export class Modal {
  private modal: HTMLElement;
  private options: Required<ModalOptions>;
  private previousActiveElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private isOpen = false;

  constructor(options: ModalOptions) {
    this.options = {
      closeOnEscape: true,
      closeOnOutsideClick: true,
      focusOnOpen: true,
      restoreFocus: true,
      onOpen: () => {},
      onClose: () => {},
      ...options,
    };

    const modal = document.getElementById(this.options.modalId);
    if (!modal) {
      throw new Error(`Modal element with id "${this.options.modalId}" not found`);
    }

    this.modal = modal;
    this.init();
  }

  private init(): void {
    // Set ARIA attributes
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-hidden', 'true');

    // Hide modal initially
    this.modal.style.display = 'none';

    // Bind event listeners
    this.bindEvents();
  }

  private bindEvents(): void {
    // ESC key to close
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    // Click outside to close
    if (this.options.closeOnOutsideClick) {
      this.modal.addEventListener('click', this.handleOutsideClick.bind(this));
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    if (event.key === 'Escape' && this.options.closeOnEscape) {
      event.preventDefault();
      this.close();
    }

    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  private handleTabKey(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (event.target === this.modal) {
      this.close();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    const elements = this.modal.querySelectorAll<HTMLElement>(selectors.join(','));
    return Array.from(elements).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  public open(): void {
    if (this.isOpen) return;

    // Store currently focused element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Show modal
    this.modal.style.display = 'flex';
    this.modal.setAttribute('aria-hidden', 'false');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    this.isOpen = true;

    // Focus first focusable element
    if (this.options.focusOnOpen) {
      setTimeout(() => {
        const focusableElements = this.getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }, 10);
    }

    // Call onOpen callback
    this.options.onOpen();
  }

  public close(): void {
    if (!this.isOpen) return;

    // Hide modal
    this.modal.style.display = 'none';
    this.modal.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';

    this.isOpen = false;

    // Restore focus to previously focused element
    if (this.options.restoreFocus && this.previousActiveElement) {
      this.previousActiveElement.focus();
    }

    // Call onClose callback
    this.options.onClose();
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public destroy(): void {
    this.close();
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.modal.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  public getIsOpen(): boolean {
    return this.isOpen;
  }
}
