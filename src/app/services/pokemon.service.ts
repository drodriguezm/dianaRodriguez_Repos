import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl: string = environment.url;


  constructor(private http: HttpClient) { }

  buscarPokemon(termino: string): Observable<Pokemon[]>{
    const url = `${this.apiUrl}/pokemon/${termino}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemons():Observable<Pokemon[]>{
    const params = 'pokemon?limit=10000&offset=0';
    const url = `${this.apiUrl}/${params}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemonById(index: number){
     const url = `${this.apiUrl}/pokemon/${index}`;
     return this.http.get<Pokemon[]>(url);
  }







}
