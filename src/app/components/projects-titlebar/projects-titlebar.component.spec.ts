import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectsTitlebarComponent } from './projects-titlebar.component'


describe('ProjectsTitlebarComponent', () => {
  let component: ProjectsTitlebarComponent
  let fixture: ComponentFixture<ProjectsTitlebarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsTitlebarComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTitlebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
