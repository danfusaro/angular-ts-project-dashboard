import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterBuilderComponent } from './filter-builder.component'

describe('FilterBuilderComponent', () => {
  let component: FilterBuilderComponent
  let fixture: ComponentFixture<FilterBuilderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBuilderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
