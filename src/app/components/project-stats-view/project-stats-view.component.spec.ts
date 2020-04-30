import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectStatsViewComponent } from './project-stats-view.component'

describe('ProjectStatsViewComponent', () => {
  let component: ProjectStatsViewComponent
  let fixture: ComponentFixture<ProjectStatsViewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStatsViewComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatsViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
