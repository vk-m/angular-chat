import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(text: string): string {
    if(text.length > 40) return text.slice(0, 40) + '...';
    return text
  }
}
