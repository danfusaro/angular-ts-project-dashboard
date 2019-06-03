import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { Effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { FilterBuilderComponent } from './components/filter-builder/filter-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportsModule } from './modules/material-imports.module';
import { NgModule } from '@angular/core';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectCardListComponent } from './components/project-card-list/project-card-list.component';
import { ProjectCardViewComponent } from './components/project-card-view/project-card-view.component';
import { ProjectDashboardViewComponent } from './components/project-dashboard-view/project-dashboard-view.component';
import { ProjectService } from './services/project.service';
import { ProjectStatsViewComponent } from './components/project-stats-view/project-stats-view.component';
import { ProjectsTitlebarComponent } from './components/projects-titlebar/projects-titlebar.component';
import { ProjectsToolbarInfoComponent } from './components/projects-toolbar-info/projects-toolbar-info.component';
import { reducer } from './store/reducers';
import { StatusStringPipe } from './pipes/status-string.pipe';
import { StoreModule } from '@ngrx/store';
import { UniqueValuePipe } from './pipes/unique-value.pipe';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    ProjectCardComponent,
    ProjectCardListComponent,
    ProjectDashboardViewComponent,
    ProjectCardViewComponent,
    FilterBuilderComponent,
    ProjectsTitlebarComponent,
    ProjectsToolbarInfoComponent,
    UniqueValuePipe,
    CapitalizePipe,
    StatusStringPipe,
    ProjectStatsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    StoreModule.forRoot({ app: reducer }),
    EffectsModule.forRoot([Effects])
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
