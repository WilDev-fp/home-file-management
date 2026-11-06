import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { Login } from './login';

interface LoginTestApi {
  email: string;
  password: string;
  rememberMe: boolean;
  enterDashboard(): void;
  onRememberMeChange(remember: boolean): void;
}

describe('Login', () => {
  const rememberedEmailKey = 'homefile.rememberedEmail';

  beforeEach(async () => {
    localStorage.removeItem(rememberedEmailKey);
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'browser' });
  });

  afterEach(() => {
    localStorage.removeItem(rememberedEmailKey);
  });

  it('remembers only the email after a successful login when selected', () => {
    const fixture = TestBed.createComponent(Login);
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const login = fixture.componentInstance as unknown as LoginTestApi;
    login.email = 'mario.rossi@gmail.com';
    login.password = '0001';
    login.rememberMe = true;

    login.enterDashboard();

    expect(localStorage.getItem(rememberedEmailKey)).toBe('mario.rossi@gmail.com');
    expect(localStorage.length).toBe(1);
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);

    const nextFixture = TestBed.createComponent(Login);
    const nextLogin = nextFixture.componentInstance as unknown as LoginTestApi;
    expect(nextLogin.email).toBe('mario.rossi@gmail.com');
    expect(nextLogin.rememberMe).toBe(true);

    nextLogin.rememberMe = false;
    nextLogin.onRememberMeChange(false);
    expect(localStorage.getItem(rememberedEmailKey)).toBeNull();
  });

  it('toggles the checkbox when its label text is clicked', () => {
    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();

    const rememberLabel = fixture.nativeElement.querySelector('.remember span') as HTMLSpanElement;
    const rememberCheckbox = fixture.nativeElement.querySelector('.remember input') as HTMLInputElement;

    rememberLabel.click();

    expect(rememberCheckbox.checked).toBe(true);
  });
});
