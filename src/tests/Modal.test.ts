/**
 * Task 5: Unit tests for Modal component
 */

import { Modal } from '../lib/vanilla-components/Modal';

describe('Modal', () => {
  let container: HTMLDivElement;
  let modalElement: HTMLDivElement;

  beforeEach(() => {
    // Set up DOM
    container = document.createElement('div');
    container.innerHTML = `
      <div id="test-modal">
        <div class="modal-content">
          <h2 id="modal-title">Test Modal</h2>
          <p id="modal-description">This is a test modal</p>
          <button id="close-btn">Close</button>
          <input type="text" id="test-input" />
        </div>
      </div>
    `;
    document.body.appendChild(container);
    modalElement = document.getElementById('test-modal') as HTMLDivElement;
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should initialize with correct ARIA attributes', () => {
    const modal = new Modal({ modalId: 'test-modal' });
    
    expect(modalElement.getAttribute('role')).toBe('dialog');
    expect(modalElement.getAttribute('aria-modal')).toBe('true');
    expect(modalElement.getAttribute('aria-hidden')).toBe('true');
    expect(modalElement.style.display).toBe('none');
  });

  test('should open modal', () => {
    const modal = new Modal({ modalId: 'test-modal' });
    modal.open();
    
    expect(modal.getIsOpen()).toBe(true);
    expect(modalElement.style.display).toBe('flex');
    expect(modalElement.getAttribute('aria-hidden')).toBe('false');
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('should close modal', () => {
    const modal = new Modal({ modalId: 'test-modal' });
    modal.open();
    modal.close();
    
    expect(modal.getIsOpen()).toBe(false);
    expect(modalElement.style.display).toBe('none');
    expect(modalElement.getAttribute('aria-hidden')).toBe('true');
    expect(document.body.style.overflow).toBe('');
  });

  test('should toggle modal', () => {
    const modal = new Modal({ modalId: 'test-modal' });
    
    modal.toggle();
    expect(modal.getIsOpen()).toBe(true);
    
    modal.toggle();
    expect(modal.getIsOpen()).toBe(false);
  });

  test('should call onOpen callback', () => {
    const onOpen = jest.fn();
    const modal = new Modal({ modalId: 'test-modal', onOpen });
    
    modal.open();
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('should call onClose callback', () => {
    const onClose = jest.fn();
    const modal = new Modal({ modalId: 'test-modal', onClose });
    
    modal.open();
    modal.close();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should close on ESC key', () => {
    const modal = new Modal({ modalId: 'test-modal', closeOnEscape: true });
    modal.open();
    
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);
    
    expect(modal.getIsOpen()).toBe(false);
  });

  test('should not close on ESC when disabled', () => {
    const modal = new Modal({ modalId: 'test-modal', closeOnEscape: false });
    modal.open();
    
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);
    
    expect(modal.getIsOpen()).toBe(true);
  });

  test('should close on outside click', () => {
    const modal = new Modal({ modalId: 'test-modal', closeOnOutsideClick: true });
    modal.open();
    
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: modalElement, writable: false });
    modalElement.dispatchEvent(clickEvent);
    
    expect(modal.getIsOpen()).toBe(false);
  });

  test('should restore focus after close', (done) => {
    const button = document.createElement('button');
    button.textContent = 'Open Modal';
    document.body.appendChild(button);
    button.focus();
    
    const modal = new Modal({ modalId: 'test-modal', restoreFocus: true });
    modal.open();
    
    setTimeout(() => {
      modal.close();
      
      setTimeout(() => {
        expect(document.activeElement).toBe(button);
        document.body.removeChild(button);
        done();
      }, 50);
    }, 50);
  });

  test('should throw error if modal element not found', () => {
    expect(() => {
      new Modal({ modalId: 'non-existent-modal' });
    }).toThrow('Modal element with id "non-existent-modal" not found');
  });

  test('should prevent opening already open modal', () => {
    const onOpen = jest.fn();
    const modal = new Modal({ modalId: 'test-modal', onOpen });
    
    modal.open();
    modal.open();
    
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('should prevent closing already closed modal', () => {
    const onClose = jest.fn();
    const modal = new Modal({ modalId: 'test-modal', onClose });
    
    modal.close();
    expect(onClose).not.toHaveBeenCalled();
  });
});
