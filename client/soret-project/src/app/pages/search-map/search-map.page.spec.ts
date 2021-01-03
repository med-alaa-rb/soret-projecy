import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMapPage } from './search-map.page';

describe('SearchMapPage', () => {
  let component: SearchMapPage;
  let fixture: ComponentFixture<SearchMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
