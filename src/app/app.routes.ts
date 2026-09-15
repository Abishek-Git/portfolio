import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DesignPortfolioComponent } from './pages/design-portfolio/design-portfolio.component';

export const routes: Routes = [
  { path: '', component: DesignPortfolioComponent },
  { path: 'classic', component: HomeComponent },
  { path: 'portfolio', component: DesignPortfolioComponent },
  { path: 'design', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
