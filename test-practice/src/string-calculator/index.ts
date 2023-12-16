export interface StringCalculator {
  add(input: string): number;
}

export class StringCalculator implements StringCalculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }
    const isCustomSplitter = input.startsWith("//");
    const multiLineSplit = input.split("\n");

    const splitter = isCustomSplitter
      ? multiLineSplit[0].replace("//", "")
      : /,|:/;

    //  , or :
    const numbers = (
      isCustomSplitter
        ? multiLineSplit
            .slice(1)
            .map((a) => a.split(splitter))
            .flat()
        : multiLineSplit.map((a) => a.split(splitter)).flat()
    ).map((s) => parseInt(s));

    const result = numbers.reduce((acc, cur) => acc + cur, 0);
    if (isNaN(result)) {
      throw new Error("문자열에 숫자 이외의 값이 포함되어 있습니다.");
    }
    return result;
  }
}
