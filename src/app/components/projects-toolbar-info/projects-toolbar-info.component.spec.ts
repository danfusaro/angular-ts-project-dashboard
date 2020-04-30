import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProjectsToolbarInfoComponent } from './projects-toolbar-info.component'

describe('ProjectsToolbarInfoComponent', () => {
  let component: ProjectsToolbarInfoComponent
  let fixture: ComponentFixture<ProjectsToolbarInfoComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsToolbarInfoComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsToolbarInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
