import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl: string = 'https://pokeapi.co/api/v2';

  // https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
  // https://pokeapi.co/api/v2/pokemon/pokemon?limit=100000&offset=0
  constructor(private http: HttpClient) { }

  buscarPokemon(termino: string): Observable<Pokemon[]>{
    const url = `${this.apiUrl}/pokemon/${termino}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemons():Observable<Pokemon[]>{
    const params = 'pokemon?limit=100&offset=0';
    const url = `${this.apiUrl}/${params}`;
    console.log('url', url);

    return this.http.get<Pokemon[]>(url);
  }

  getPokemon(url: string):Observable<Pokemon[]>{
    // const url = `${this.apiUrl}/pokemon/${id}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemonById(index: number){
     const url = `${this.apiUrl}/pokemon/${index}`;
     return this.http.get<Pokemon[]>(url);
  }







}
