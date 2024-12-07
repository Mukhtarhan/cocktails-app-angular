import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      getUser: () => of({ name: 'Admin', username: 'admin', id: 1 }), // Mock user
      logout: jasmine.createSpy('logout'),
    };

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Profile" if user is logged in', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Profile');
  });

  it('should display "Login" if no user is logged in', () => {
    // Simulate logout
    (authServiceStub.getUser as jasmine.Spy).and.returnValue(of(null));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Login');
  });

  it('should call logout on logout button click', () => {
    component.logout();
    expect(authServiceStub.logout).toHaveBeenCalled();
  });
});
