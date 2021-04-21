import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonsService } from '../service/pokemons.service';


@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html',
  styleUrls: ['./details-pokemon.component.scss']
})
export class DetailsPokemonComponent implements OnInit {

  pokemon?: Pokemon;
  pokemons?: Pokemon[]

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService, private titleService: Title) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => {
      this.pokemon = pokemon,
      this.titleService.setTitle(`Informations sur ${pokemon.name}`);
    });

  }

  goBack(): void {
    this.router.navigate(['/pokemon/list']);
  }

  goEdit(pokemon: Pokemon): void {
    let link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

  delete(pokemon: Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon).subscribe(_ => this.goBack());
  }


}
