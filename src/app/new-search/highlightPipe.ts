import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {
  // transform(value: any[], args: any): any {
  //   var match: any[] = []
  //   var replacedWords : any[] = [] 
  //   if (!args) {
  //     return "";
  //   }

  //   const regex = new RegExp(args, 'gi');
  //   value.forEach(eachValue => {
  //     const match = eachValue.match(regex);
  //     replacedWords.push(eachValue.replace(regex, `<span class='highlight'>${match[0]}</span>`))
  //   })

  //   if (!match || match.length < 0) {
  //     return "";
  //   }
    
  //   return replacedWords;
  // }
  transform(value: string, args: string[] | string): string {
    console.log(args)

    if (args != null && args != undefined &&!args.length) { return value; }
    const pattern = Array.isArray(args) ? args.filter(arg => !!arg).map(this.escapeRegex).join('|') : this.escapeRegex(args);
    const regex = new RegExp(pattern.concat('|<[^>]*>'), 'gi');
    return value != '' && value != undefined ? value.replace(regex, (match) => /<[^>]*>/g.test(match) ? match: `<span class='highlight'>${match}</span>`) : '';
}

escapeRegex(word: string) {
  console.log(word)

  return word != ''&& word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
}
}