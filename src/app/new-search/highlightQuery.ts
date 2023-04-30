import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightQuery',
})
export class HighlightQueryPipe implements PipeTransform {

  transform(text: string, docNo: string, keywords: string[], selectedKeyList: Map<string, string[]>, vicinity: number): string {
    let highlighted = text;
    const selectedKeywordsList: string[] = Array.from(selectedKeyList.values()).flatMap((innerList) => [...innerList]);
    //  selectedKeywordsList = selectedKeywordsList.flatMap((innerList) => [...innerList])
    console.log('selectedKeywordsList', selectedKeywordsList)
    // Split the text into words
    const words = text.split(/\s+/);

    // Find the positions of the words in list1 and list2 in the words array
    const positions1: number[] = [];
    const positions2: number[] = [];
    for (let i = 0; i < words.length; i++) {
      if (keywords.includes(words[i])) {
        positions1.push(i);
      }
      if (selectedKeywordsList.includes(words[i])) {
        positions2.push(i);
      }
    }

    // Find the pairs of positions where a word from list1 and a word from list2 appear within the specified vicinity
    const pairs = [];
    for (const pos1 of positions1) {
      for (const pos2 of positions2) {
        if (Math.abs(pos1 - pos2) <= vicinity) {
          pairs.push([pos1, pos2]);
        }
      }
    }

    // Replace the matched words with span elements that have CSS classes for highlighting
    let highlightedText = text;
    for (const pair of pairs) {
      const start = Math.min(pair[0], pair[1]);
      const end = Math.max(pair[0], pair[1]);
      for (let i = start ; i <= end; i++) {
        const regexVicinity = new RegExp(`\\b${words[i]}\\b`, 'gi');
        highlightedText = highlightedText.replace(regexVicinity, `<span class="highlight-vicinity">${words[i]}</span>`);
      }
    }

    // Replace the words in list1 with span elements that have a different CSS class for highlighting
    for (const word of keywords) {
      const regexWord = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regexWord, `<span class="highlight-word1">${word}</span>`);
    }

    // Replace the words in list2 with span elements that have a different CSS class for highlighting
    for (const word of selectedKeywordsList) {
      const regexWord = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regexWord, `<span class="highlight-word2">${word}</span>`);
    }

    return highlightedText;
  }
  escapeRegex(word: string) {
    // console.log(word)

    return word != '' && word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
  }
}