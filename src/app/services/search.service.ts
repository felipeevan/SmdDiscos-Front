import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SearchService {
    private search = new Subject<any>();

    constructor() {
    }

    getSearch(): Observable<any>{
        return this.search.asObservable()
    }

    searchNext(search: String){
        this.search.next(search)
    }
}