import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightQuery',
})
export class HighlightQueryPipe implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {
          return value;
        }
    
        const regex = new RegExp(args, 'gi');
        const match = value.match(regex);
    
        if (!match) {
          return value;
        }
        console.log(match[0])
        return value.replace(regex, `<span style='background-color:purple'>${match[0]}</span>`);
      }
    escapeRegex(word: string) {
        // console.log(word)

        return word != '' && word != undefined ? word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : '';
    }
}