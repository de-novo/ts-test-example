// 파일 시스템을 추상화한 인터페이스

export interface Fs {
  writeFileSync: (path: string, data: string) => void;
}

export class CsvFileWriter {
  constructor(private readonly fs: Fs) {}

  writeCsvFile<T>(path: string, data: T[]): void {}
}
