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
    const regex = new RegExp(`\\b(${keywords.join('|')})\\W+(\\w+\\W+){0,5}(?:${selectedKeywordsList.join('|')})\\b`, 'gi');
    console.log('here', regex)
    highlighted = highlighted.replace(regex, '<span class="highlight-vicinity">$&</span>');
    return highlighted;
  }
  escapeRegex(word: string) {
    // console.log(word)

    return word != '' && word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
  }
}