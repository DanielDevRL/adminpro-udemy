import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 // Rutas
import { APP_ROUTES } from './app.routes';

// Modulo
import { PagesModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResgiterComponent } from './login/resgiter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResgiterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
