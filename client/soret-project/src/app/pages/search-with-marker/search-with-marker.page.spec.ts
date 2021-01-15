import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchWithMarkerPage } from './search-with-marker.page';

describe('SearchWithMarkerPage', () => {
  let component: SearchWithMarkerPage;
  let fixture: ComponentFixture<SearchWithMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWithMarkerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWithMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
