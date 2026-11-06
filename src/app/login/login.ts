import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const REMEMBERED_EMAIL_KEY = 'homefile.rememberedEmail';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly mockUser = {
    email: 'mario.rossi@gmail.com',
    password: '0001',
  };

  protected email = '';
  protected password = '';
  protected errorMessage = '';
  protected rememberMe = false;
  private hasRememberedEmail = false;

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    try {
      const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (rememberedEmail) {
        this.email = rememberedEmail;
        this.rememberMe = true;
        this.hasRememberedEmail = true;
      }
    } catch (error) {
      console.error('Impossibile leggere l’email ricordata.', error);
      this.errorMessage = 'Non è stato possibile leggere i dati salvati. Puoi comunque accedere senza ricordare l’email.';
    }
  }

  protected onRememberMeChange(remember: boolean): void {
    if (remember || !this.isBrowser || !this.hasRememberedEmail) {
      return;
    }

    try {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      this.hasRememberedEmail = false;
      this.errorMessage = '';
    } catch (error) {
      console.error('Impossibile rimuovere l’email ricordata.', error);
      this.errorMessage = 'Non è stato possibile rimuovere l’email salvata dal dispositivo.';
    }
  }

  protected enterDashboard(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Inserisci email e password.';
      return;
    }

    if (this.email.trim() !== this.mockUser.email || this.password !== this.mockUser.password) {
      this.errorMessage = 'Email o password non corretti.';
      return;
    }

    if (this.isBrowser) {
      try {
        if (this.rememberMe) {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, this.email.trim());
          this.hasRememberedEmail = true;
        } else if (this.hasRememberedEmail) {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
          this.hasRememberedEmail = false;
        }
      } catch (error) {
        console.error('Impossibile aggiornare l’email ricordata.', error);
        this.errorMessage = this.rememberMe
          ? 'Non è stato possibile ricordare l’email su questo dispositivo. Puoi deselezionare la casella e accedere senza salvarla.'
          : 'Non è stato possibile rimuovere l’email salvata. Riprova a deselezionare la casella.';
        return;
      }
    }

    this.errorMessage = '';
    void this.router.navigate(['/dashboard']);
  }
}
