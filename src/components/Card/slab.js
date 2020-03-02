const CONSTANTS = {
  ratio: 0.45,
  lineLength: 10,
  getLineRatio: function() {
    return this.ratio * this.lineLength;
  }
};

const measureString = ({ text, width, height }) => {
  const words = text.split(' ');
  const lineHeight = width / CONSTANTS.getLineRatio();
  const lineCount = Math.floor(height / lineHeight);
  const charsPerLine = Math.round(text.length / lineCount);
  return { text, words, charsPerLine };
};

const wrapLineTextInHTML = (text, tagName = 'span') => {
  return React.createElement(tagName, {}, text);
  // return `<${tagName}>${text}</${tagName}>`;
};

export const formatSlab = (text, width, height) => {
  const { words, charsPerLine } = measureString({ text, width, height });
  console.log(
    `Found ${words.length} words. Targetting ${charsPerLine} chars per line.`
  );

  // iterative split lines
  const lines = words.reduce((acc, word) => {
    const currentLine = acc.pop() || '';
    const currentLineExtended = `${currentLine} ${word}`;

    const currentDiff = charsPerLine - currentLine.length;
    const extendedDiff = currentLineExtended.length - charsPerLine;

    //const useExtended = (currentLineExtended.length <= charsPerLine) || (extendedDiff < currentDiff);
    const useExtended = extendedDiff < currentDiff;
    return useExtended
      ? [...acc, currentLineExtended]
      : [...acc, currentLine, word];
  }, []);

  // return lines.map(line => wrapLineTextInHTML(line)).join('');
  return lines.map(line => wrapLineTextInHTML(line));
};

//   const formatSlabs = slabs => {
//     for (var i = 0; i < slabs.length; i++) {
//       slabs[i].innerHTML = formatSlab(slabs[i]);
//     }
//     fitty('span');
//   };
