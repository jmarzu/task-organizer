import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Task } from '../task';
import { UtilityService } from '../shared/utility.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private taskUrl = 'api/tasks/tasks.json';

  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl).pipe(
      tap(data => {
        data.forEach(d => d.start = this.utilityService.todaysDate());
      }),
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<Task> {
    return this.getTasks().pipe(
        map((tasks: Task[]) => tasks.find(t => t.id === id))
      );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
