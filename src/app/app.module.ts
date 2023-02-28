import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './clientes/formulario/formulario.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/formulario', component: FormularioComponent},
    {path: 'clientes/formulario/:id', component: FormularioComponent}

];

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        ClientesComponent,
        FormularioComponent,
        HeaderComponent,
    
    ],
    providers: [ClienteService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
    ]
})
export class AppModule { }
