import { CsvFileWriter, Fs } from "@src/csv-file-writer";

export type TestCase<T extends object> = {
  _test: string;
  data: T[];
  headers?: (keyof T)[];
  expected: string;
};

export interface User {
  _id: string;
  name: string;
  age: number;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
}

export function createCsvFileWriter(fs: Fs): CsvFileWriter {
  return new CsvFileWriter(fs);
}

export function createUsers(num: number): User[] {
  const users: User[] = Array.from({ length: num }, (_, i) => ({
    _id: `${i}`,
    name: `name${i}`,
    age: i,
  }));
  return users;
}
export function createPosts(num: number): Post[] {
  const posts = Array.from({ length: num }, (_, i) => ({
    _id: `post${i}`,
    title: `title${i}`,
    content: `content${i}`,
    userId: `user${i}`,
  }));
  return posts;
}

export function testCaseFactory() {
  return {
    createUsers,
    createPosts,
  };
}

export function assertNumberOfWritten(fs: Fs, expected: number) {
  expect(fs.writeFileSync).toHaveBeenCalledTimes(expected);
}
export function assertWritten(fs: Fs, path: string, expected: string) {
  expect(fs.writeFileSync).toHaveBeenCalledWith(path, expected);
}
export function assertThrownError(fn: () => void, expected: string) {
  expect(fn).toThrow(expected);
}

export function assertWrittenWithData<T extends object>(
  fs: Fs,
  path: string,
  datas: T[]
) {
  expect(fs.writeFileSync).toHaveBeenCalledWith(path, datas);
}
export interface CsvWriterAssert {
  assertNumberOfWritten: (expected: number) => void;
  assertWritten: (path: string, expected: string) => void;
  assertThrownError: (fn: () => void, expected: string) => void;
  assertWrittenWithData: <T extends object>(
    path: string,
    data: T[],
    headers?: (keyof T)[]
  ) => void;
}

export function csvWriterAssertFactory(fs: Fs) {
  return {
    assertNumberOfWritten: (expected: number) =>
      assertNumberOfWritten(fs, expected),
    assertWritten: (path: string, expected: string) =>
      assertWritten(fs, path, expected),
    assertThrownError: (fn: () => void, expected: string) =>
      assertThrownError(fn, expected),
    assertWrittenWithData: <T extends object>(
      path: string,
      data: T[],
      headers?: (keyof T)[]
    ) => assertWrittenWithData(fs, path, data),
  };
}
