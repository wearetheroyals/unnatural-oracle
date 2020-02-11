const fitty = require('fitty);

const CONSTANTS = {
	ratio: .45,
	lineLength: 10,
	getLineRatio: function  () { return this.ratio * this.lineLength}
}

const measureString = (el) => {
	const text = el.innerText;
	const words = text.split(" ");
	const lineHeight = el.offsetWidth/CONSTANTS.getLineRatio();
	const lineCount = Math.floor(el.offsetHeight/lineHeight);
	const charsPerLine = Math.round(text.length/lineCount);	
	return { text, words, charsPerLine };
}

const wrapLineTextInHTML = (text, tagName="span") => {
	return `<${tagName}>${text}</${tagName}>`;
	
}

const formatSlab = (el) => {
		
	const {words, charsPerLine} = measureString(el)
	console.log(`Found ${words.length} words. Targetting ${charsPerLine} chars per line.`)
		
	// iterative split lines
	const lines = words.reduce((acc,word) => {
		const currentLine = acc.pop() || '';
		const currentLineExtended = `${currentLine} ${word}`;
		
		const currentDiff = charsPerLine - currentLine.length;
		const extendedDiff = currentLineExtended.length - charsPerLine;
		
		//const useExtended = (currentLineExtended.length <= charsPerLine) || (extendedDiff < currentDiff);
		const useExtended = (extendedDiff < currentDiff);
		return useExtended ? [...acc, currentLineExtended] : [...acc, currentLine, word];	
	},[])	
	
	return lines.map(line => wrapLineTextInHTML(line)).join('');
}


//(() => {
	
	// break up inner text on targetted elements 
	// into multuple lines of optimised length
//	for (var i=0; i<slabs.length; i++) {
//		slabs[i].innerHTML = formatSlab(slabs[i]);
//	}
//	fitty('span');
//})()

module.exports.slab = (cssSelector) => {
  const slabs = document.querySelectorAll(selector);
  for (var i=0; i<slabs.length; i++) {
      slabs[i].innerHTML = formatSlab(slabs[i]);
  }
  fitty(cssSelector);
}
