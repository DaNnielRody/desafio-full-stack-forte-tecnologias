import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export abstract class BaseApiService {
  protected http: HttpClient = inject(HttpClient);
  private readonly apiEndpoint: string;

  constructor(endpoint: string) {
    this.apiEndpoint = `/api${endpoint}`;
  }

  protected get<T>(path: string = '', params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiEndpoint}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  protected post<T>(body: any, path: string = ''): Observable<T> {
    return this.http
      .post<T>(`${this.apiEndpoint}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  protected put<T>(body: any, path: string = ''): Observable<T> {
    return this.http
      .put<T>(`${this.apiEndpoint}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  protected delete<T>(path: string = ''): Observable<T> {
    return this.http
      .delete<T>(`${this.apiEndpoint}${path}`)
      .pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Erro ao comunicar com a API';
    return throwError(() => new Error(message));
  }
}