export interface StringCalculator {
  add(input: string): number;
}

export class StringCalculator implements StringCalculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }

    const isCustomDelimiter = input.startsWith("//");
    const lines = input.split("\n");
    const delimiter = isCustomDelimiter ? lines[0].replace("//", "") : /,|:/;

    const numbers = lines
      .slice(isCustomDelimiter ? 1 : 0)
      .flatMap((line) => line.split(delimiter))
      .map((s) => parseInt(s));

    const result = numbers.reduce((acc, cur) => acc + cur, 0);
    if (isNaN(result)) {
      throw new Error("문자열에 숫자 이외의 값이 포함되어 있습니다.");
    }
    return result;
  }
}
