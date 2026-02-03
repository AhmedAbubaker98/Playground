/**
 * DynamicModal Component
 * 
 * A modal with dynamically generated class names.
 * Simulates CSS-in-JS obfuscation (Styled Components, Emotion, etc.)
 * Used in Level 2 to test visual reasoning.
 */

export class DynamicModal {
  constructor() {
    // Class names are generated at runtime - impossible to predict
    this.overlayClass = `overlay-${this.randomHash()}`;
    this.modalClass = `modal-${this.randomHash()}`;
    this.acceptBtnClass = `btn-${this.randomHash()}`;
    this.cancelBtnClass = `btn-${this.randomHash()}`;
  }

  randomHash() {
    return Math.random().toString(36).substring(2, 8);
  }

  getClassNames() {
    return {
      overlay: this.overlayClass,
      modal: this.modalClass,
      acceptBtn: this.acceptBtnClass,
      cancelBtn: this.cancelBtnClass,
    };
  }
}
