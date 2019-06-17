import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genero-lista',
  templateUrl: './genero-lista.component.html',
  styleUrls: ['./genero-lista.component.css']
})
export class GeneroListaComponent implements OnInit {
  generos = null;
  excluirGenero = null;
  constructor(private genero$: GenerosService, private router: Router) { }


  ngOnInit() {
    this.atualizarListaGeneros();
  }


  atualizarListaGeneros() {
    this.genero$.lista()
      .subscribe(
        lista => this.generos = lista.results
      );
  }

  excluir(genero) {
    if (confirm(`Tem certeza que deseja excluir o artista "${genero.nome}" ?\nEssa ação não é reversível!`)) {
      this.genero$.excluir(genero.id)
        .subscribe(
          _ => {
            this.excluirGenero = true;
            this.atualizarListaGeneros();
          },
          err => {
            this.excluirGenero = err.error;
          }
        )
    }
  }

  editar(genero) {
    this.router.navigate(['generos', genero.id, 'editar']);
  }

  consultar(genero) {
    this.router.navigate(['generos', genero.id]);
  }

  cadastrar() {
    this.router.navigate(['generos', 'cadastrar']);
  }

}
