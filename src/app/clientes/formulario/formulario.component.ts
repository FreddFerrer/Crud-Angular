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

  public cliente:Cliente = new Cliente();
  public errores: string[];
  public titulo:string = "Crear Cliente!";

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute){};  

  

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) =>{ 
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    }
    )
  }

  //usamos el objeto para mostrar el mensaje
  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `${cliente.nombre}`, 'success')
      },
      err => {
        //toma el error desde el backend
        this.errores = err.error.errores as string[]
      }
    )
  }

  //otra forma de mostrar el mensaje: usando el mensaje de la bd
  public update(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualziado', `${json.mensaje}`, 'success')
      },
      err => {
        //toma el error desde el backend
        this.errores = err.error.errores as string[]
      }
    )
  }
  

}
