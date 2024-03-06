import { Component } from '@angular/core';

type regExps = {
  letters: RegExp;
  numbers: RegExp;
  symbols: RegExp;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public inputText: string = '';
  public inputMinLength: number = 8;

  private regExps: regExps = {
    letters: /[a-zA-Z\u0400-\u04FF\s]+/,
    numbers: /[0-9]+/,
    symbols: /[^a-zA-Z0-9\s\u0400-\u04FF]/,
  };

  private numberOfRegExpMatches: number = 0;

  private regExpTest():void {
    this.numberOfRegExpMatches = 0;
    for (const regexp in this.regExps) {
      if (this.regExps[regexp as keyof regExps].test(this.inputText)) {
        this.numberOfRegExpMatches++;
      }
    }
  }

  private colors: Map<number, string> = new Map([
    [1, 'red'],
    [2, '#eded1a'],
    [3, 'lime'],
    [4, 'gray'],
  ]);

  public getPasswordStrength(sectionNumber: number): string | undefined {
    this.regExpTest();
    if (this.inputText.length === 0) {
      return this.colors.get(4);
    } else if (this.inputText.length < this.inputMinLength) {
      return this.colors.get(1);
    } else if (this.numberOfRegExpMatches >= sectionNumber) {
      return this.colors.get(this.numberOfRegExpMatches);
    }
    return this.colors.get(4);
  }
}
