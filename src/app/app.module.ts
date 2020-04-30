import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FilterBuilderComponent } from './components/filter-builder/filter-builder.component'
import { ProjectCardListComponent } from './components/project-card-list/project-card-list.component'
import { ProjectCardComponent } from './components/project-card/project-card.component'
import { ProjectDashboardViewComponent } from './components/project-dashboard-view/project-dashboard-view.component'
import { ProjectStatsViewComponent } from './components/project-stats-view/project-stats-view.component'
import { ProjectsTitlebarComponent } from './components/projects-titlebar/projects-titlebar.component'
import { ProjectsToolbarInfoComponent } from './components/projects-toolbar-info/projects-toolbar-info.component'
import { MaterialImportsModule } from './modules/material-imports.module'
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { StatusStringPipe } from './pipes/status-string.pipe'
import { UniqueValuePipe } from './pipes/unique-value.pipe'
import { ProjectService } from './services/project.service'
import { Effects } from './store/effects'
import { reducer } from './store/reducers'

@NgModule({
  declarations: [
    AppComponent,
    ProjectCardComponent,
    ProjectCardListComponent,
    ProjectDashboardViewComponent,
    FilterBuilderComponent,
    ProjectsTitlebarComponent,
    ProjectsToolbarInfoComponent,
    UniqueValuePipe,
    CapitalizePipe,
    StatusStringPipe,
    ProjectStatsViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportsModule,
    StoreModule.forRoot({ app: reducer }),
    EffectsModule.forRoot([Effects]),
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
