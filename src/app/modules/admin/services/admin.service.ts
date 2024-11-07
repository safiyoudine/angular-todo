import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { CommentRequest } from '../../../auth/interfaces/comment-request';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  //get Users
  getCategories(): Observable<any> {
    return this.http.get(`${this.URL}api/categories`, {
      headers: this.createAuthorizationHeader()
    })
  }
  //Get Task By Id
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.URL}api/task/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllTasks(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.URL}api/tasks?page=${page}&size=${size}`,
      { headers: this.createAuthorizationHeader() })
  }

  //post task
  postTask(taskRequest: any): Observable<any> {
    return this.http.post(`${this.URL}api/task`, taskRequest, {
      headers: this.createAuthorizationHeader()
    })
  }

  postCategory(categoryRequest: any): Observable<any> {
    return this.http.post(`${this.URL}api/category`, categoryRequest, {
      headers: this.createAuthorizationHeader()
    })
  }

  //Update task
  updateTask(id: number, taskRequest: any): Observable<any> {
    return this.http.put(`${this.URL}api/task/${id}`, taskRequest, {
      headers: this.createAuthorizationHeader()
    })
  }

  //delete task by Id
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.URL}api/task/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }


  //get the jwt token from local storage
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
