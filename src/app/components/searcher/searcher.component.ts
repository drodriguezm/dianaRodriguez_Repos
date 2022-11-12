import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  result:any[] = []
  termino!:string;

  productos: Pokemon[] = [];
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();




  //inicializando nuestro formulario

  miForm : FormGroup = this.fb.group(
    {
      termino      : ['']//, //valor asignado
                    //  Validators.required] //validaciones sincronas
     }
  )

  constructor(private fb: FormBuilder,
              private _pokemonService: PokemonService ) { }


  public search(value: string){
    console.log('value', value);

    this.onEnter.emit(value);
  }

  buscando() {


    if (this.miForm.invalid) {//si el formulario no es válido
      this.miForm.markAllAsTouched();
      return;
    }

    // if (!this.txtTermino.nativeElement.value) {
    //   return;
    // }

    // console.log('el valor es ', this.miForm.controls['termino'].value );

    this.onEnter.emit( this.miForm.controls['termino'].value );

  }

  nombreValido(): boolean
  {
    return this.miForm?.controls['termino']?.invalid
        && this.miForm?.controls['termino']?.touched

  }

  ngOnInit() {

    this._pokemonService.buscarPokemon(this.termino).subscribe(
      {
        next: resp => {
          this.result = resp;
          console.log( 'this.result', this.result );
        },
        error: err => {
          this.result = [];
        }
      }
    )
  }
}
