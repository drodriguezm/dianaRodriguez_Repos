import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ElementData } from 'src/app/interfaces/element-data.interface';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PokemonsComponent implements OnInit {

  result:any[] = []
  pokemons:Pokemon[] = [];
  data: any[] = [];
  orangeColor :boolean = false;


  hayData: boolean = false;
  hayDataDetail: boolean = false;
  initGrid: boolean = true;
  pokemonDetail!: any;
  nothingDataMessage :string = 'No se cuenta con la información del pokemon ingresado.';

  columnsToDisplay : string[] = ['position', 'name', 'expandir'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ElementData | null;
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor( private _pokemonService:PokemonService,
                ) {
  }


  buscar( termino: string ) {

    if (termino != '') {

      this.initGrid = false;
      this._pokemonService.buscarPokemon(termino).subscribe(
        (resp:any) => {
          let pokemonData;

          pokemonData = {
            position: resp.id,
            image: resp.sprites.front_default,
            name: resp.name,
            types: resp.types[0].type.name,
            weight: resp.weight,
            moves: resp.moves[0].move.name,
            sprites: [{
              back_default : resp.sprites.back_default,
              back_shiny: resp.sprites.back_shiny,
              front_default: resp.sprites.front_default,
              front_shiny: resp.sprites.front_shiny,
             }]
          };

          this.clearData();

          //ponemos la data que viene del servicio en un arreglo
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;


        this.data.length>0? this.hayData: !this.hayData;


        },
        err => {
          if(!err.ok)
          {
            this.hayData = false;
            this.hayDataDetail = false;
            this.data = [];
            this.dataSource = new MatTableDataSource<any>(this.data);
            this.dataSource.paginator = this.paginator;
          }
          // console.log(err);
          alert(this.nothingDataMessage);
        }
      );

    } else {
      this.getPokemons();
    }

  }

  ngOnInit(): void {
    this.getPokemons();
  }

  clearData(){
    this.data = [];
  }


  getPokemons() {
    let pokemonData;

    this.clearData();

    for (let i = 1; i <= 250; i++) {
      this._pokemonService.getPokemonById(i).subscribe(
        (res:any) => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name,
            types: res.types[0].type.name,
            weight: res.weight,
            moves: res.moves[0].move.name,
            sprites: [{
              back_default : res.sprites.back_default,
              back_shiny: res.sprites.back_shiny,
              front_default: res.sprites.front_default,
              front_shiny: res.sprites.front_shiny,
             }]
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getRow(row:any){
  }

}
