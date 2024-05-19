import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})

export class DateFormatterPipe implements PipeTransform {
  transform(value: string): string {
      if (!value) return value;
      const [year, month, day] = value.split('-');
      return `${day}-${month}`;
  }
}