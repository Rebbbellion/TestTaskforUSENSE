import { Component } from '@angular/core';

type regExps = {
  letters: RegExp;
  numbers: RegExp;
  symbols: RegExp;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public inputText: string = '';
  public inputMinLength: number = 8;
  public passwordStatus: string | undefined = 'Field is empty';

  private regExps: regExps = {
    letters: /[a-zA-Z\u0400-\u04FF\s]+/,
    numbers: /[0-9]+/,
    symbols: /[^a-zA-Z0-9\s\u0400-\u04FF]/,
  };

  private numberOfRegExpMatches: number = 0;

  private regExpTest(): void {
    this.numberOfRegExpMatches = 0;
    for (const regexp in this.regExps) {
      if (this.regExps[regexp as keyof regExps].test(this.inputText)) {
        this.numberOfRegExpMatches++;
      }
    }
  }

  private colors: Map<number, string> = new Map([
    [1, 'red'],
    [2, '#c7c926'],
    [3, 'lime'],
    [4, 'gray'],
  ]);

  private statuses: Map<number, string> = new Map([
    [1, 'Weak password'],
    [2, 'Middle strength password'],
    [3, 'Strong password'],
    [4, 'Password is too short'],
    [5, 'Field is empty'],
  ]);

  public getPasswordStrength(sectionNumber: number = 0): string | undefined {
    this.regExpTest();
    if (this.inputText.length === 0) {
      this.passwordStatus = this.statuses.get(5);
      return this.colors.get(4);
    } else if (this.inputText.length < this.inputMinLength) {
      this.passwordStatus = this.statuses.get(4);
      return this.colors.get(1);
    } else if (this.numberOfRegExpMatches >= sectionNumber) {
      this.passwordStatus = this.statuses.get(this.numberOfRegExpMatches);
      return this.colors.get(this.numberOfRegExpMatches);
    }
    return this.colors.get(4);
  }
}
