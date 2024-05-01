import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Autres modules à partager
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { RouterModule } from '@angular/router';
import { DateFormatterPipe } from '../pipes/date-formatter.pipe';


@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        FormsModule, // Autres imports de modules partagés
        RouterModule,
        DateFormatterPipe
    ],
    exports: [
        CommonModule, // Exportez les modules nécessaires à d'autres parties de l'application
        FormsModule,
        DateFormatterPipe
    ]
})
export class SharedModule { }