import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectDashboardViewComponent } from './project-dashboard-view.component'

describe('ProjectDashboardViewComponent', () => {
  let component: ProjectDashboardViewComponent
  let fixture: ComponentFixture<ProjectDashboardViewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDashboardViewComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDashboardViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
