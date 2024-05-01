import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private dataSubject: Subject<string> = new Subject<string>();

    getData(): Observable<any> {
        return this.dataSubject.asObservable();
    }

    setData(newValue: any): void {
        this.dataSubject.next(newValue);        
    }
}