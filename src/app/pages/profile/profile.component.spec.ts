import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      getUser: () => of({ name: 'Admin', username: 'admin', id: 1 }),
      updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve(true)),
      logout: jasmine.createSpy('logout'),
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Admin');
  });

  it('should enable editing mode', () => {
    component.enableEdit();
    expect(component.isEditing).toBeTrue();
  });

  it('should cancel editing mode', () => {
    component.cancelEdit();
    expect(component.isEditing).toBeFalse();
  });

  it('should save profile changes', async () => {
    component.editableUser = { id: 1, name: 'New Admin', username: 'admin' };
    await component.saveChanges();
    expect(authServiceStub.updateUser).toHaveBeenCalledWith(component.editableUser);
    expect(component.isEditing).toBeFalse();
  });

  it('should call logout on logout button click', () => {
    component.logout();
    expect(authServiceStub.logout).toHaveBeenCalled();
  });
});
