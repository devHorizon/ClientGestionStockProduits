import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URLS } from '../config/api.uls.config';
import { Produit } from '../shared/produit';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
};

@Injectable()
export class ProduitService{

  constructor(private http: HttpClient){

  }

  getProduits(): Observable<any>{
    return this.http.get(API_URLS.produitUrl);
  }

  addProduit(produit: Produit): Observable<any>{
    return this.http.post(API_URLS.produitUrl, produit, httpOptions);
  }

  updateProduit(produit): Observable<any>{
    return this.http.put(API_URLS.produitUrl, produit, httpOptions);
  }

  deleteProduit(ref){
    return this.http.delete(API_URLS.produitUrl + `/${ref}`, httpOptions);
  }
}
