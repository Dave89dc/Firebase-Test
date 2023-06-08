import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase'
})
export class ToUpperCasePipe implements PipeTransform {

  transform(value: string | null, ...args: any[]): any{
    if(value !== null){
      return value.toLocaleUpperCase();
    }
  }

}
