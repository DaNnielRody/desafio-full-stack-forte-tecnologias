import { Component, OnDestroy, Renderer2, signal, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  private renderer = inject(Renderer2);
  private translate = inject(TranslateService);
  private elementRef = inject(ElementRef);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  currentLang = signal('pt-br');

  availableLangs = [
    { code: 'pt-br', name: 'Português Brasileiro', flagClass: 'fi-br' }, // Brasil
    { code: 'pt', name: 'Português', flagClass: 'fi-pt' }, // Portugal
    { code: 'en', name: 'English', flagClass: 'fi-gb' }, // Reino Unido (comum para inglês genérico)
    { code: 'es', name: 'Español', flagClass: 'fi-es' }, // Espanha
    { code: 'it', name: 'Italiano', flagClass: 'fi-it' }, // Itália
    { code: 'hi', name: 'हिंदी', flagClass: 'fi-in' }, // Hindi (Índia)
    { code: 'ch', name: '中文', flagClass: 'fi-cn' }, // Chinês (China)
  ];

  isLangDropdownOpen = false;

  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  closeLangDropdown() {
    this.isLangDropdownOpen = false;
  }


  currentLangFlagClass(): string {
    const lang = this.availableLangs.find(l => l.code === this.currentLang());
    return lang ? lang.flagClass : '';
  }

  changeLanguage(langCode: string) {
    this.currentLang.set(langCode);
    this.translate.use(langCode);
    localStorage.setItem('appLang', langCode);
    this.isLangDropdownOpen = false;
  }

  constructor() {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang('pt');

    const savedLang = localStorage.getItem('appLang');
    const lang = savedLang || 'pt';
    this.currentLang.set(lang);
    this.translate.use(lang);
  }

  toggleMenu(): void {
    const isOpen = !this.isMenuOpen();
    this.isMenuOpen.set(isOpen);
    if (isOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  closeMenu(): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Se o dropdown estiver aberto E o clique não ocorreu dentro do componente (language-select)
    // o dropdown fecha.
    if (this.isLangDropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeLangDropdown();
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
