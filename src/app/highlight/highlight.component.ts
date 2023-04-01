import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'highlight',
  template: '<span class="highlight"><ng-content></ng-content></span>',
  styles: [
    `
       mark.highlight {
        all: unset; /* Reset all styles for mark element */
        background-color: yellow; /* Apply your own styles */
        color: black;
      }
    `,
  ],
})
export class HighlightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
