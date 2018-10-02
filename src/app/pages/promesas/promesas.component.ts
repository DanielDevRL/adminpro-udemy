import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contarTres().then(
      mesaje => console.log('Termino', mesaje)
    )
    .catch( erro => console.error('Error en la promesa', erro));

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

   return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo =   setInterval( () => {

        contador += 1;
        console.log(contador);

        if ( contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }

}
