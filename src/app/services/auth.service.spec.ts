import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', async () => {
    const mockUsers = [
      { id: 1, username: 'admin', password: 'admin', name: 'Admin' },
    ];

    service.login('admin', 'admin').then((result) => {
      expect(result).toBeTrue();
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fail login with incorrect credentials', async () => {
    const mockUsers = [
      { id: 1, username: 'admin', password: 'admin', name: 'Admin' },
    ];

    service.login('wrong', 'credentials').then((result) => {
      expect(result).toBeFalse();
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should update user successfully', async () => {
    const updatedUser = { id: 1, name: 'Admin Updated', username: 'admin' };

    service.updateUser(updatedUser).then((result) => {
      expect(result).toBeTrue();
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });
});
