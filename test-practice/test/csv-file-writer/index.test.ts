import { CsvFileWriter, Fs } from "@src/csv-file-writer";
import {
  CsvWriterAssert,
  User,
  csvWriterAssertFactory,
  testCaseFactory,
} from "./test-helper";

/**
 * csv file writer
 *
 * 요구사항
 * default
 * 1. 객체를 받아 csv 파일로 저장한다.
 * 2. 객체의 키는 csv 파일의 헤더가 된다.
 * 3. 객체의 값은 csv 파일의 값이 된다.
 * 4. 같은 키를 가진 객체는 같은 행에 저장된다.
 *
 * 예시
 * {_id:string, name:string, age:number}
 * _id, name, age
 * 1, denovo, 20
 * 2, jun-hyuck, 20
 * 3, jun, 20
 *
 * 추가 요구 사항
 * 1. 객체의 타입은 <T>로 받는다.
 * 즉, 정해진 타입이 아닌 임의의 타입을 받을 수 있다.
 * 2. 객체의 키는 <T>의 키를 따른다.
 * 3. 파일에 작성할 헤더를 선택할 수 있다. (headers) 기본적으로는 모든 키를 작성한다.
 * 4. 헤더를 작성할 때, 키의 순서를 정할 수 있다.
 *
 * 5. 빈 데이터를 받으면 에러를 던진다.
 */
describe("csv file writer", () => {
  let fs: Fs;
  let csvFileWriter: CsvFileWriter;
  let csvWriterAssert: CsvWriterAssert;
  type TestCase<T extends object> = {
    _test: string;
    data: T[];
    headers?: (keyof T)[];
    expected: string;
  };

  // Arrange
  beforeEach(() => {
    fs = {
      writeFileSync: jest.fn(),
    };
    csvWriterAssert = csvWriterAssertFactory(fs);
    csvFileWriter = new CsvFileWriter(fs);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("test users", () => {
    const users = testCaseFactory().createUsers(3);
    const testCases: TestCase<User>[] = [
      {
        _test: "users without headers",
        data: users,
        expected: "_id,name,age\n0,name0,0\n1,name1,1\n2,name2,2",
      },
      {
        _test: "users with all headers",
        data: users,
        headers: ["_id", "name", "age"],
        expected: "_id,name,age\n0,name0,0\n1,name1,1\n2,name2,2",
      },
      {
        _test: "users with some headers",
        data: users,
        headers: ["_id", "name"],
        expected: "_id,name\n0,name0\n1,name1\n2,name2",
      },
      {
        _test: "users with random headers",
        data: users,
        headers: ["name", "_id", "age"],
        expected: "name,_id,age\nname0,0,0\nname1,1,1\nname2,2,2",
      },
    ];

    test.each(testCases)("test: $_test", ({ data, headers, expected }) => {
      // Act
      csvFileWriter.writeCsvFile("test.csv", data, headers);
      // Assert
      csvWriterAssert.assertNumberOfWritten(1);
      csvWriterAssert.assertWritten("test.csv", expected);
    });
  });

  describe("data is empty (Error case)", () => {
    it("should throw error when data empty and header not empty", () => {
      // Arrange
      const data: User[] = [];
      const headers: (keyof User)[] = ["_id", "name", "age"];
      // Act
      // Assert
      expect(() =>
        csvFileWriter.writeCsvFile("test.csv", data, headers)
      ).toThrow("data is empty");
    });

    it("should throw error when data empty and header is undefined", () => {
      // Arrange
      const data: User[] = [];
      const headers: (keyof User)[] | undefined = undefined;
      // Act
      // Assert

      csvWriterAssert.assertThrownError(
        () => csvFileWriter.writeCsvFile("test.csv", data, headers),
        "data is empty"
      );
    });

    it("should throw error when data empty and header is null", () => {
      // Arrange
      const data: User[] = [];
      const headers: (keyof User)[] | null = null;
      // Act
      // Assert
      csvWriterAssert.assertThrownError(
        () => csvFileWriter.writeCsvFile("test.csv", data, headers!),
        "data is empty"
      );
    });

    it("should throw error when data empty and header is empty", () => {
      // Arrange
      const data: User[] = [];
      const headers: (keyof User)[] = [];
      // Act
      // Assert
      csvWriterAssert.assertThrownError(
        () => csvFileWriter.writeCsvFile("test.csv", data, headers),
        "data is empty"
      );
    });
  });
});
