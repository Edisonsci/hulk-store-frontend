import { LoginService } from './services/login.service';
import { VentaService } from './services/venta.service';
import { IngresoService } from './services/ingreso.service';
import { UsuarioService } from './services/usuario.service';
import { CategoriaService } from './services/categoria.service';
import { ProductoService } from './services/producto.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComprasRealizadasComponent } from './components/compras-realizadas/compras-realizadas.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { FormsModule } from '@angular/forms';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { StockComponent } from './components/stock/stock.component';

import {
  MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule,
  MatCardModule, MatDividerModule, MatTableModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
  MatPaginatorModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoComponent,
    NavbarComponent,
    ComprasRealizadasComponent,
    IngresoComponent,
    SinginComponent,
    SingupComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routes,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [ProductoService, CategoriaService, UsuarioService, IngresoService, VentaService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
