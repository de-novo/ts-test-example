import { CsvFileWriter, Fs } from "@src/csv-file-writer";

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
 * 객체의 타입은 <T>로 받는다.
 * 즉, 정해진 타입이 아닌 임의의 타입을 받을 수 있다.
 * 객체의 키는 <T>의 키를 따른다.
 *
 */
describe("csv file writer", () => {
  describe("default csv file writer test", () => {
    describe("writeCsvFile", () => {
      let fs: Fs;
      let csvFileWriter: CsvFileWriter;

      beforeEach(() => {
        fs = {
          writeFileSync: jest.fn(),
        };
        csvFileWriter = new CsvFileWriter(fs);
      });
    });
  });
});
