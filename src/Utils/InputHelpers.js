/**
 * Utility to enable using tabulators in text areas
 * @category Utils
 * @param {TextArea} textArea Any text area
 */
export const enableTabulatorInTextArea = (textArea) => {
  textArea.addEventListener('keydown', function(e) {
    // eslint-disable-next-line
    if (e.key == 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart = this.selectionEnd = start + 1;
    }
  });
}