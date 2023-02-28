import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',

})
export class FormularioComponent implements OnInit{

  ngOnInit(){
    this.cargarCliente()
  }

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute){};  

  public cliente:Cliente = new Cliente();

  public titulo:string = "Crear Cliente!";

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) =>{ 
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    }
    )
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito`, 'success')
      }
    )
  }

  

}
