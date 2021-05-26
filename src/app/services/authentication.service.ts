import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 *  authentication service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * get url for API defined in environment file
   */
  baseUrl = environment.baseUrl;

  /**
   * configuring required headers
   */
  private authHeader = new HttpHeaders({ auth: 'false', authorization: 'Bearer ',   apikey: environment.apikey}
);

  /**
   * injecting the required dependencies for this service
   */
  constructor(private http: HttpClient) { }

  /**
   * makes a POST request to administrator login API
   *
   * @param {object} - object of type Login class.
   *
   * @returns user informations such as name and jwt tokens
   */

  login(username: string, password: string) {return this.http.post(this.baseUrl + '/auth/v1/token?grant_type=password' ,
    {email: username, password: password},
    {headers: this.authHeader});
  }

  /**
   * makes a POST request to administrator registration API
   *
   * @param {object} - object of type Login class.
   *
   * @returns user informations such as name and jwt tokens
   */

  register(email: string, password: string) {return this.http.post(this.baseUrl + '/auth/v1/signup' ,
    {email: email, password: password },
    {headers: this.authHeader});
  }

}
