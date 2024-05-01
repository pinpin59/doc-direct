import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})

export class DateFormatterPipe implements PipeTransform {
  transform(value: string): string {
      if (!value) return value;
      // Séparez la date en année, mois et jour
      const [year, month, day] = value.split('-');
      // Recomposez la date au format DD-MM
      return `${day}-${month}`;
  }
}