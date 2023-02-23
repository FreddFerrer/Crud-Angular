import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
  
})
export class ClientesComponent {
  clientes!: Cliente[];

  constructor(private clienteService: ClienteService){
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );
  }

}
