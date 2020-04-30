import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCardViewComponent } from './components/project-card-view/project-card-view.component';
import { ProjectDashboardViewComponent } from './components/project-dashboard-view/project-dashboard-view.component';
import { ProjectStatsViewComponent } from './components/project-stats-view/project-stats-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ProjectDashboardViewComponent },
  { path: 'project/:id', component: ProjectCardViewComponent },
  { path: 'stats', component: ProjectStatsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
