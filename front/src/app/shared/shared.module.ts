import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Autres modules à partager
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        FormsModule, // Autres imports de modules partagés
    ],
    exports: [
        CommonModule, // Exportez les modules nécessaires à d'autres parties de l'application
        FormsModule,
        
    ]
})
export class SharedModule { }