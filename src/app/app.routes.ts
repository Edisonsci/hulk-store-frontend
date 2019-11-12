import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/core';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { ProductoComponent } from './components/producto/producto.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { StockComponent } from './components/stock/stock.component';
import { HomeComponent } from './components/home/home.component';
import { ComprasRealizadasComponent } from './components/compras-realizadas/compras-realizadas.component';

export const router: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'singin',
        component: SinginComponent
    },
    {
        path: 'singup',
        component: SingupComponent
    },
    {
        path: 'producto',
        component: ProductoComponent
    },
    {
        path: 'ingreso',
        component: IngresoComponent
    },
    {
        path: 'stock',
        component: StockComponent
    },
    {
        path: 'mis-compras',
        component: ComprasRealizadasComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
