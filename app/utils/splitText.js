// A simple text splitting utility to replicate GSAP's SplitText for basic use cases
export function splitText(element, type = 'chars') {
  if (!element) return []; // <-- Added this safety check

  const textContent = element.textContent;
  element.innerHTML = ''; // Clear original content

  if (type === 'chars') {
    return textContent.split('').map(char => {
      // Don't create spans for spaces, just append them as text nodes
      if (char === ' ') {
          element.appendChild(document.createTextNode(' '));
          return null;
      }
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char'; // Use className for consistency
      element.appendChild(span);
      return span;
    }).filter(Boolean); // Filter out nulls (from spaces)
  } else if (type === 'words') {
    return textContent.split(/\s+/).map(word => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      word.split('').forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'char';
          wordSpan.appendChild(charSpan);
      });
      element.appendChild(wordSpan);
      // Add a space after the word
      element.appendChild(document.createTextNode(' ')); 
      return wordSpan;
    });
  }
  return [];
}