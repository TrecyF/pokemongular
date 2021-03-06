import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from '../service/pokemons.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.scss']
})
export class FormPokemonComponent implements OnInit {

  @Input() pokemon?: Pokemon; // propriété d'entrée du composant
  // @Input() pokemon!: Pokemon;
  isAddForm?: boolean;
  types: Array<string> = [] // types disponibles pour un pokémon : 'Eau', 'Feu', etc ...
  constructor(
    private pokemonsService: PokemonsService,
    private router: Router) { }

  ngOnInit(): void {
    // Initialisation de la propriété types
    this.types = this.pokemonsService.getPokemonTypes();
    this.isAddForm = this.router.url.includes('add');
  }
  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type: string): boolean {
    const index = this.pokemon!.types.indexOf(type);
    //if (index > -1) return true;
    if (~index) return true;
    return false;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectType($event: any, type: string): void {
    const checked = $event.target.checked;
    if (checked) {
      this.pokemon!.types.push(type);
    } else {
      const index = this.pokemon!.types.indexOf(type);
      if (index > -1) {
        this.pokemon!.types.splice(index, 1);
      }

    }
  }

  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
    if (this.pokemon!.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon!.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit(): void {
    if (this.isAddForm) {
      this.pokemonsService.addPokemon(this.pokemon!)
        .subscribe(pokemon => {
          this.pokemon = pokemon;
          this.goBack()
        });
    } else {
      this.pokemonsService.updatePokemon(this.pokemon!)
        .subscribe(_ => this.goBack());
    }
  }

  goBack(): void {
    let link = ['/pokemon', this.pokemon!.id];
    this.router.navigate(link);
  }

}