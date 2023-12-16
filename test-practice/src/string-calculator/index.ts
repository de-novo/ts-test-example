export interface StringCalculator {
  add(input: string): number;
}

export class StringCalculator implements StringCalculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }
    const isCustomSplitter = input.startsWith("//");

    const customsplitter = isCustomSplitter
      ? input.split("\n")[0].replace("//", "")
      : /,|:/;

    //  , or :
    const numbers = isCustomSplitter
      ? input
          .split("\n")[1]
          .split(customsplitter)
          .map((number) => parseInt(number))
      : input.split(customsplitter).map((number) => parseInt(number));

    const result = numbers.reduce((acc, cur) => acc + cur, 0);
    if (isNaN(result)) {
      throw new Error("문자열에 숫자 이외의 값이 포함되어 있습니다.");
    }
    return result;
  }
}
