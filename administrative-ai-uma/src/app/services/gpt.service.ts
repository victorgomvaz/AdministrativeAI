import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GptService {
  private apiUrl = 'http://localhost:5000/ask'; // Tu endpoint en FastAPI

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { question };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error de cliente:', error.error.message);
    } else {
      console.error(`Error de servidor: Código ${error.status}, mensaje: ${error.message}`);
    }
    return throwError(() => new Error('Ocurrió un error al contactar con el asistente.'));
  }
}


