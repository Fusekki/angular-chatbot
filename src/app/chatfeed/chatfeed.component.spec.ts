import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatfeedComponent } from './chatfeed.component';

describe('ChatfeedComponent', () => {
  let component: ChatfeedComponent;
  let fixture: ComponentFixture<ChatfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatfeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
