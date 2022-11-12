import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() pokemonList = new EventEmitter<any[]>();
  pageSize = 100;
  offset: any;
  total: number = 0;

  constructor(private _pokemonService:PokemonService) { }

  ngOnInit(): void {
    this._pokemonService.getPokemons().subscribe(
      (resp:any) => {
        this.pokemonList.emit(resp.results);
        this.total = resp.count;
        console.log('resp', resp);
      },error=>console.error(error));
  }

  getPageSizeOptions(): number[] {
    // if (this.dataSource.data.length>this.length){
    // return [3, 6, 12, 24, 48, this.pageSize];
    // }else{
    return [3, 6, 12, 24, 48, this.pageSize];
    // }
    }

  onPageActivated(event: any){
    this.pageSize = event.pageSize;
    this.offset = (Number(event.pageIndex))* Number(event.pageSize);

    this._pokemonService.getPokemons().subscribe(
      (resp:any) => {
        this.pokemonList.emit(resp.results);
        this.total = resp.count;
        console.log('resp', resp);
      },error=>console.error(error));

  }

}
