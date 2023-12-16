import { AgeCalculator, createAgeCalculator } from "@src/age-calculator";

describe("age-calculator", () => {
  let ageCalculator: AgeCalculator;
  let now: Date | null;
  let birthDate: Date | null;

  // setup
  beforeEach(() => {
    ageCalculator = createAgeCalculator();
  });

  // teardown
  afterEach(() => {
    now = null;
    birthDate = null;
  });

  describe("calculateAge", () => {
    it("now: 2020-01-01, birthDate: 1990-01-01 :: age 30", () => {
      // Arrange
      now = new Date("2020-01-01");
      birthDate = new Date("1990-01-01");

      // Act
      const age = ageCalculator(birthDate, now);
      // Assert
      expect(age).toBe(30);
    });
  });

  describe("calculateAge each", () => {
    describe("same month", () => {
      const testCases = [
        // now, birthDate, expected
        ["2020-01-01", "2020-01-01", 0],
        ["2020-01-01", "1990-01-01", 30],
        ["2020-01-01", "1990-01-02", 29],
        ["2020-01-01", "1990-01-31", 29],
        ["2020-12-31", "1990-12-01", 30],
        ["2020-12-31", "1990-12-02", 30],
        ["2020-12-31", "1990-12-31", 30],
      ];

      test.each(testCases)(
        "now: %s, birthDate: %s :: age %i",
        (nowStr, birthDateStr, expected) => {
          // Arrange
          now = new Date(nowStr);
          birthDate = new Date(birthDateStr);

          // Act
          const age = ageCalculator(birthDate, now);
          // Assert
          expect(age).toBe(expected);
        }
      );
    });

    describe("same day", () => {
      const testCases = [
        ["2020-01-01", "2020-01-01", 0],
        ["2020-01-01", "1990-01-01", 30],
        ["2020-02-01", "1990-02-01", 30],
        ["2020-01-01", "1990-02-01", 29],
      ];
      test.each(testCases)(
        "now: %s, birthDate: %s :: age %i",
        (nowStr, birthDateStr, expected) => {
          // Arrange
          now = new Date(nowStr);
          birthDate = new Date(birthDateStr);

          // Act
          const age = ageCalculator(birthDate, now);
          // Assert
          expect(age).toBe(expected);
        }
      );
    });
    describe("random tests", () => {
      const testCases = [
        // now, birthDate, expected
        ["2020-01-01", "1990-01-01", 30],
        ["2020-01-01", "1990-01-02", 29],
        ["2020-01-01", "1990-02-01", 29],
        ["2020-01-01", "1991-01-01", 29],
        ["2020-01-01", "1989-12-31", 30],
        ["2020-01-01", "1990-01-01", 30],
        ["2020-01-01", "1990-01-02", 29],
        ["2020-01-01", "1990-02-01", 29],
        // 윤년
        ["2020-02-29", "1990-02-28", 30],
        ["2020-02-29", "1990-03-01", 29],
        ["2021-02-28", "2020-02-29", 0],
        ["2021-02-28", "2020-03-01", 0],
        ["2021-03-01", "2020-02-29", 1],
        ["2021-03-01", "2020-03-01", 1],
      ];

      test.each(testCases)(
        "now: %s, birthDate: %s :: age %i",
        (nowStr, birthDateStr, expected) => {
          // Arrange
          now = new Date(nowStr);
          birthDate = new Date(birthDateStr);

          // Act
          const age = ageCalculator(birthDate, now);
          // Assert
          expect(age).toBe(expected);
        }
      );
    });
  });
});
