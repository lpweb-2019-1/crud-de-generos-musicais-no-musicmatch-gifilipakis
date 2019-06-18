import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { ValicacaoFormUtilService } from '../valicacao-form-util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {
  genero = null;

  constructor(private generos$: GenerosService,
    private route: ActivatedRoute,
    private validacao$: ValicacaoFormUtilService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = parseInt(params.get('id'));
        this.validacao$.erro = null;
        this.generos$.encontrar(id)
          .subscribe(
            artista => this.genero = artista
          );
      }
    );
  }

  salvar() {
    this.generos$.editar(this.genero.id, this.genero.nome)
      .subscribe(
        data => this.validacao$.erro = false,
        err => this.validacao$.erro = err.error
      );
  }

}
