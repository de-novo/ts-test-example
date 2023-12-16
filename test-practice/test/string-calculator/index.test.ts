/**
 * 문자열 계산기
 *
 * 요구사항
 * 1. 빈 문자열 또는 null 값을 입력할 경우 0을 반환해야 한다.
 * 2. 숫자 하나를 문자열로 입력할 경우 해당 숫자를 반환한다.
 * 3  숫자 두개 이상을 쉼표(,) 구분자로 입력할 경우 두 숫자의 합을 반환한다.
 * 4. 구분자를 쉼표(,) 이외에 콜론(:)을 사용할 수 있다.
 * 5. "//"와 "\n" 같이 문자 사이에 커스텀 구분자를 지정할 수 있다.
 *   - 즉, 커스텀 구분자를 입력을 받을 수 있다
 *   - 커스텀 구분자는 //[구분자]\n 형태로 입력해야 한다.
 * 6. 음수 또한 입력을 받을수 있다.
 * 7. 숫자 이외의 값 또는 숫자가 아닌 문자열을 입력할 경우 에러를 반환해야 한다.
 *   - 에러 메시지: "문자열에 숫자 이외의 값이 포함되어 있습니다."
 *
 * 8. 숫자 입력을 '\n'으로 구분할 수 있다.
 *    - 즉, '1,2,3\n4,5,6'과 같은 입력이 가능해야 한다.
 */

import { StringCalculator } from "@src/string-calculator";

describe("string calculator", () => {
  let calculator: StringCalculator;

  // Arrange
  beforeEach(() => {
    calculator = new StringCalculator();
  });

  describe("add", () => {
    describe("1. 빈 문자열 또는 null 값을 입력할 경우 0을 반환해야 한다.", () => {
      it("input: '' => output: 0", () => {
        // Arrange
        const expected = 0;

        // Act
        const result = calculator.add("");

        // Assert
        expect(result).toEqual(expected);
      });
    });

    describe("2. 숫자 하나를 문자열로 입력할 경우 해당 숫자를 반환한다.", () => {
      const testCases = [
        { input: "0", expected: 0 },
        { input: "1", expected: 1 },
        { input: "2", expected: 2 },
        { input: "3", expected: 3 },
        { input: "4", expected: 4 },
        { input: "5", expected: 5 },
        { input: "10000", expected: 10000 },
      ];
      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });

    describe("3. 숫자 두개 이상을 쉼표(,) 구분자로 입력할 경우 두 숫자의 합을 반환한다.", () => {
      const testCases = [
        { input: "1,2", expected: 3 },
        { input: "1,2,3", expected: 6 },
        { input: "1,2,3,4", expected: 10 },
        { input: "1,2,3,4,5", expected: 15 },
        { input: "1,2,3,4,5,6", expected: 21 },
        { input: "1,2,3,4,5,6,7", expected: 28 },
        { input: "1,2,3,4,5,6,7,8", expected: 36 },
        { input: "1,2,3,4,5,6,7,8,9", expected: 45 },
        { input: "1,2,3,4,5,6,7,8,9,10", expected: 55 },
      ];

      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });

    describe("4. 구분자를 쉼표(,) 이외에 콜론(:)을 사용할 수 있다.", () => {
      const testCases = [
        { input: "1:2", expected: 3 },
        { input: "1:2:3", expected: 6 },
        { input: "1:2:3:4", expected: 10 },
        { input: "1:2:3:4:5", expected: 15 },
        { input: "1:2:3:4:5:6", expected: 21 },
        { input: "1:2:3:4:5:6:7", expected: 28 },
        { input: "1:2:3:4:5:6:7:8", expected: 36 },
        { input: "1:2:3:4:5:6:7:8:9", expected: 45 },
        { input: "1:2:3:4:5:6:7:8:9:10", expected: 55 },
      ];

      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });

    describe('5. "//"와 "\\n" 같이 문자 사이에 커스텀 구분자를 지정할 수 있다.', () => {
      const testCases = [
        { input: "//;\n1;2", expected: 3 },
        { input: "//;\n1;2;3", expected: 6 },
        { input: "//;\n1;2;3;4", expected: 10 },
        { input: "//;\n1;2;3;4;5", expected: 15 },
        { input: "//;\n1;2;3;4;5;6", expected: 21 },
        { input: "//;\n1;2;3;4;5;6;7", expected: 28 },
        { input: "//;\n1;2;3;4;5;6;7;8", expected: 36 },
        { input: "//;\n1;2;3;4;5;6;7;8;9", expected: 45 },
        { input: "//;\n1;2;3;4;5;6;7;8;9;10", expected: 55 },
      ];

      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });

    describe("6. 음수 또한 입력을 받을수 있다.", () => {
      const testCases = [
        { input: "-1", expected: -1 },
        { input: "-1,-2", expected: -3 },
        { input: "-1,-2,-3", expected: -6 },
        { input: "-1,-2,-3,4", expected: -2 },
      ];

      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });

    describe("7. 숫자 이외의 값 또는 숫자가 아닌 문자열을 입력할 경우 에러를 반환해야 한다.", () => {
      const err = new Error("문자열에 숫자 이외의 값이 포함되어 있습니다.");
      const testCases = [
        {
          input: "a",
          expected: err,
        },
        {
          input: "a,b",
          expected: err,
        },
        {
          input: "a,b,1",
          expected: err,
        },
      ];

      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = () => calculator.add(input);

          // Assert
          expect(result).toThrow(expected);
        }
      );
    });

    describe("8. 숫자 입력을 '\\n'으로 구분할 수 있다.", () => {
      const testCases = [
        { input: "1\n2,3", expected: 6 },
        { input: "1\n2\n3", expected: 6 },
        { input: "1,2,3\n4,5,6", expected: 21 },
      ];
      test.each(testCases)(
        "input: $input => output: $expected",
        ({ input, expected }) => {
          // Act
          const result = calculator.add(input);

          // Assert
          expect(result).toEqual(expected);
        }
      );
    });
  });
});
