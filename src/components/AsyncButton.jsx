/**
 * AsyncButton Component
 * 
 * A button that shows a loading spinner during async operations.
 * Used in Level 1 to test temporal reasoning.
 */

export class AsyncButton {
  constructor(element) {
    this.element = element;
    this.isLoading = false;
  }

  async click() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.element.classList.add('loading');
    this.element.disabled = true;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    this.isLoading = false;
    this.element.classList.remove('loading');
    this.element.disabled = false;
  }

  get loading() {
    return this.isLoading;
  }
}
