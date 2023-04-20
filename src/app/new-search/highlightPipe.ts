import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {
  //   transform(value: string, args: string[] | string, query : string): string {
  //     console.log(args, args.length)
  //     let temp, newTemp;
  //     if (args != null && args != undefined &&!args.length) { return value; }
  //     const pattern = Array.isArray(args) ? args.filter(arg => !!arg).map(this.escapeRegex).join('|') : this.escapeRegex(args);
  //     const regex = new RegExp(pattern.concat('|<[^>]*>'), 'gi');
  //     temp = value != '' && value != undefined ? value.replace(regex, (match) => /<[^>]*>/g.test(match) ? match: `<span style='background-color:yellow'>${match}</span>`) : ''

  //     // if (!query) {
  //     //   return temp;
  //     // }

  //     // const newregex = new RegExp(query, 'gi');
  //     // const newmatch = temp.match(newregex);

  //     // if (!newmatch) {
  //     //   return temp;
  //     // }

  //     // newTemp = temp.replace(regex, `<span style='background-color:purple'>${newmatch[0]}</span>`)
  //     // return temp;
  //     return value != '' && value != undefined ? value.replace(regex, (match) => /<[^>]*>/g.test(match) ? match: `<span class='highlight'>${match}</span>`) : ''
  // }
  transform(text: string, keywords: string[], query: string, keywordClass: string, queryClass: string): string {
    if (!text || !keywords || !query) {
      return text;
    }
    let keywordsList : any[]= []
    let highlighted = text;
    // keywordsList = (keywords.split("[")[1]).split("', '")
    keywords.forEach((keyword) => {
      if (keyword) {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlighted = highlighted.replace(regex, `<mark class="${keywordClass}">$&</mark>`);
      }
    });

    let queryWords: any[] = []
    queryWords = query.split(" ")
    // console.log(queryWords)

    queryWords.forEach((eachQuery) => {
      if (eachQuery) {
        const regex = new RegExp(`(${eachQuery})`, 'gi');
        highlighted = highlighted.replace(regex, `<mark class="${queryClass}">$&</mark>`);
      }
    })

    // this.highlightText(highlighted, query, keywords, 5)

    return highlighted;
  }

  highlightText(text: string, query: string, keywords: string[], vicinity: number): string {
    // Replace the query with a span element that has a CSS class for query highlighting
    const regexQuery = new RegExp(`\\b${query}\\b`, 'gi');
    const highlightedTextWithQuery = text.replace(regexQuery, `<span class="highlight-query">${query}</span>`);
  
    // Split the text into words
    const words = highlightedTextWithQuery.split(' ');
  
    // Find the positions of the keywords in the words array
    const keywordPositions: number[] = [];
    for (const keyword of keywords) {
      for (let i = 0; i < words.length; i++) {
        if (words[i] === keyword) {
          keywordPositions.push(i);
        }
      }
    }
  
    // Find the position of the query in the words array
    const queryPosition = words.findIndex(word => word === query);
  
    // Find the pairs of positions where the query and keywords appear within the specified vicinity
    const pairs = [];
    for (const keywordPosition of keywordPositions) {
      if (Math.abs(keywordPosition - queryPosition) <= vicinity) {
        pairs.push([queryPosition, keywordPosition]);
      }
    }
  
    // Replace the matched words with span elements that have CSS classes for vicinity highlighting
    let highlightedText = highlightedTextWithQuery;
    for (const pair of pairs) {
      const start = Math.min(pair[0], pair[1]);
      const end = Math.max(pair[0], pair[1]);
      for (let i = start + 1; i < end; i++) {
        const regexVicinity = new RegExp(`\\b${words[i]}\\b`, 'gi');
        highlightedText = highlightedText.replace(regexVicinity, `<span class="highlight-vicinity">${words[i]}</span>`);
      }
    }
  
    // Replace the keywords with span elements that have a different CSS class for keyword highlighting
    for (const keyword of keywords) {
      const regexKeyword = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regexKeyword, `<span class="highlight-keyword">${keyword}</span>`);
    }
  
    return highlightedText;
  }
  
  
  
  escapeRegex(word: string) {
    // console.log(word)

    return word != '' && word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
  }
}