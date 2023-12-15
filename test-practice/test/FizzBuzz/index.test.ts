import fizeBuzzFactory, { FizeBuzz } from "./../../src/FizzBuzz/index";
describe("FizzBuzz", () => {
  let fizeBuzz: FizeBuzz;
  let num: number | null;

  // Arrange
  beforeEach(() => {
    fizeBuzz = fizeBuzzFactory();
  });

  afterEach(() => {
    num = null;
  });

  describe("play", () => {
    describe("output: Fizz - 3의 배수", () => {
      const expected = "Fizz";

      it("input:3", () => {
        // Arrange
        num = 3;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:6", () => {
        // Arrange
        num = 6;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: Buzz - 5의 배수", () => {
      const expected = "Buzz";
      it("input:5", () => {
        // Arrange
        num = 5;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:10", () => {
        // Arrange
        num = 10;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: FizzBuzz - 3과 5의 배수", () => {
      const expected = "FizzBuzz";

      it("input:15", () => {
        // Arrange
        num = 15;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("input:30", () => {
        // Arrange
        num = 30;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: number - 그외", () => {
      it("input:1", () => {
        // Arrange
        num = 1;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });

      it("input:2", () => {
        // Arrange
        num = 2;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });
      it("input:4", () => {
        // Arrange
        num = 4;

        // Act
        const actual = fizeBuzz(num);

        // Assert
        expect(actual).toEqual(num);
      });
    });
  });
});
