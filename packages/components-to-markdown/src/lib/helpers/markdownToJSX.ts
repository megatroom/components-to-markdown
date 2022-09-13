/**
 * Converts a markdown string to JSX.
 */
const markdownToJSX = (text: string): string => {
  if (!text) {
    return '';
  }

  return text
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

export default markdownToJSX;
