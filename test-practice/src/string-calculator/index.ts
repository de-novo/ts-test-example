export interface StringCalculator {
  add(input: string): number;
}

export class StringCalculator implements StringCalculator {
  add(input: string): number {
    return 0;
  }
}
