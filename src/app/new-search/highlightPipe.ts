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

    let highlighted = text;
    keywords.forEach((keyword) => {
      if (keyword) {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlighted = highlighted.replace(regex, `<mark class="${keywordClass}">$&</mark>`);
      }
    });

    if (query) {
      const regex = new RegExp(`(${query})`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="${queryClass}">$&</mark>`);
    }

    return highlighted;
  }

  escapeRegex(word: string) {
    // console.log(word)

    return word != '' && word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
  }
}