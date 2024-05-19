import { Pipe, PipeTransform } from '@angular/core';
import { HealthProfessionalStatus } from '../enums/health-professional-status.enum';

@Pipe({
    name: 'status',
    standalone: true,
})

export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case HealthProfessionalStatus.PENDING:
        return 'En attente de validation';
      case HealthProfessionalStatus.VERIFIED:
        return 'Validé';
      case HealthProfessionalStatus.REJECTED:
        return 'Rejeté';
      default:
        return value;
    }
  }
}