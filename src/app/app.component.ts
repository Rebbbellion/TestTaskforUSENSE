import { Component } from '@angular/core';
import { StatusId } from './enums';

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

  private regExpTest(): number {
    let numberOfRegExpMatches = 0;
    for (const regexp in this.regExps) {
      if (this.regExps[regexp as keyof regExps].test(this.inputText)) {
        numberOfRegExpMatches++;
      }
    }
    return numberOfRegExpMatches;
  }
  private colors: Map<number, string> = new Map([
    [StatusId.Weak, 'red'],
    [StatusId.Medium, '#eded1a'],
    [StatusId.Strong, 'lime'],
    [StatusId.Short, 'red'],
    [StatusId.Empty, 'gray'],
  ]);

  private getStatusIdByNumberOfMatches(numberOfMatches: number): number {
    switch (numberOfMatches) {
      case 3:
        return StatusId.Strong;
      case 2:
        return StatusId.Medium;
      default:
        return StatusId.Weak;
    }
  }

  private statuses: Map<number, string> = new Map([
    [StatusId.Weak, 'Weak password'],
    [StatusId.Medium, 'Middle strength password'],
    [StatusId.Strong, 'Strong password'],
    [StatusId.Short, 'Password is too short'],
    [StatusId.Empty, 'Field is empty'],
  ]);

  public getPasswordStrength(sectionNumber: number = 0): string | undefined {
    let numberOfRegExpMatches: number = this.regExpTest();
    if (this.inputText.length === 0) {
      this.passwordStatus = this.statuses.get(StatusId.Empty);
      return this.colors.get(StatusId.Empty);
    } else if (this.inputText.length < this.inputMinLength) {
      this.passwordStatus = this.statuses.get(StatusId.Short);
      return this.colors.get(StatusId.Short);
    } else if (numberOfRegExpMatches >= sectionNumber) {
      this.passwordStatus = this.statuses.get(
        this.getStatusIdByNumberOfMatches(numberOfRegExpMatches)
      );
      return this.colors.get(
        this.getStatusIdByNumberOfMatches(numberOfRegExpMatches)
      );
    }
    return this.colors.get(StatusId.Empty);
  }
}
