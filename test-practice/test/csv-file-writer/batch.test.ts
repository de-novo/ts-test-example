import {
  CsvWriterAssert,
  createUsers,
  csvWriterAssertFactory,
} from "./test-helper";
/**
 * csv file writer - batch
 *
 * 한번에 csv 파일을 작성하니 파일이 너무 커져서 느린 문제가 발생했다
 * 그래서 데이터를 일정 개수만큼 묶어서 작성하려고 한다.
 * 해당 기능을 구현하라.
 *
 * 이전 요구 사항
 * /csv-file-writer/index.test.ts 참고
 *
 * 추가 요구 사항
 * 1. 이전 요구 사항을 모두 만족한다.
 * 2. 데이터를 일정 개수만큼 묶어서 작성할 수 있다.
 * 3. 이전 코드는 수정하지 않는다.
 * 4. 파일명은 기존과 동일하나, 넘버링을 추가한다.
 *  - 예시: users.csv -> users_1.csv, users_2.csv, ...
 *
 *
 *
 * ## 고민
 * 이미 /csv-file-writer/index.test.ts 에서 CsvFileWriter관련 테스트를 작성함.
 *
 * CsvFileWriter 관련 로직은 잘 작동한다 생각하고
 * CsvFileWriterBatch 관련 테스트는 Fs.writeFileSync호출 횟수만 체크하면 된다 생각함.
 *
 *
 * 문제점
 * 1. 데이터는 잘 넘어간다 가정할수 있으나, batch에서 파일명 관련 테스트를 하지 않음.
 *
 */

import { CsvFileWriter, CsvFileWriterBatch, Fs } from "@src/csv-file-writer";
import { User } from "./test-helper";

describe("csv file writer - batch", () => {
  let fs: Fs;
  // 기존 코드는 수정하지 않는다.
  let csvFileWriter: CsvFileWriter;
  let csvFileWriterMock: CsvFileWriter;
  let csvFileWriterBatch: CsvFileWriterBatch | null;
  let csvWriterAssert: CsvWriterAssert;
  let users: User[];
  const batchCounts = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

  // Arrange
  beforeEach(() => {
    fs = {
      writeFileSync: jest.fn(),
    };
    csvFileWriter = new CsvFileWriter(fs);
    csvFileWriterMock = new CsvFileWriter(fs);
    csvFileWriterMock.writeCsvFile = jest.fn();
    csvWriterAssert = csvWriterAssertFactory(fs);
  });

  // teardown
  afterEach(() => {
    jest.clearAllMocks();
    users = [];
    csvFileWriterBatch = null;
  });

  describe.each(batchCounts)("batch count: %i", (batchCount) => {
    // Arrange
    const userCounts = [1, 2, 3, 10, 20, 500, 100000];

    describe.each(userCounts)("user count: %i", (userCount) => {
      users = createUsers(userCount);
      it("should write csv file", () => {
        // Arrange
        csvFileWriterBatch = new CsvFileWriterBatch(csvFileWriter, batchCount);
        const fileName = "users.csv";
        const calledCount = Math.ceil(users.length / batchCount);

        // Act
        csvFileWriterBatch.writeCsvFile(fileName, users);

        // Assert
        csvWriterAssert.assertNumberOfWritten(calledCount);
      });
    });
  });

  describe.each(batchCounts)(
    "use Mock CsvFileWriter-batch count: %i",
    (batchCount) => {
      // Arrange
      const userCounts = [50, 100, 600];
      describe.each(userCounts)("user count: %i", (userCount) => {
        it("should write csv file", () => {
          // Arrange
          users = createUsers(userCount);
          csvFileWriterBatch = new CsvFileWriterBatch(
            csvFileWriterMock,
            batchCount
          );

          const fileName = "users.csv";
          const calledCount = Math.ceil(users.length / batchCount);
          const batchData = Array.from({ length: calledCount }, (_, i) => {
            const start = i * batchCount;
            const end = start + batchCount;
            const _fileName = `${fileName.split(".")[0]}_${i + 1}.csv`;
            return { users: users.slice(start, end), fileName: _fileName };
          });
          // Act
          csvFileWriterBatch.writeCsvFile(fileName, users);

          // Assert
          batchData.forEach(({ users, fileName }, i) => {
            expect(csvFileWriterMock.writeCsvFile).toHaveBeenCalledWith(
              fileName,
              users,
              undefined
            );
          });
        });

        it("should write csv file with headers", () => {
          users = createUsers(userCount);
          csvFileWriterBatch = new CsvFileWriterBatch(
            csvFileWriterMock,
            batchCount
          );

          const fileName = "users.csv";
          const calledCount = Math.ceil(users.length / batchCount);
          const batchData = Array.from({ length: calledCount }, (_, i) => {
            const start = i * batchCount;
            const end = start + batchCount;
            const _fileName = `${fileName.split(".")[0]}_${i + 1}.csv`;
            return { users: users.slice(start, end), fileName: _fileName };
          });
          const headers: (keyof User)[] = ["_id", "name", "age"];
          // Act
          csvFileWriterBatch.writeCsvFile(fileName, users, headers);

          // Assert
          batchData.forEach(({ users, fileName }, i) => {
            expect(csvFileWriterMock.writeCsvFile).toHaveBeenCalledWith(
              fileName,
              users,
              headers
            );
          });
        });
      });
    }
  );
});
