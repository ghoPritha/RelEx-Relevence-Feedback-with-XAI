import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeUrlPipe'
}) 
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(blobUrl: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([blobUrl], { type: 'text/plain' })));
    }
}
