// 파일 시스템을 추상화한 인터페이스

export interface Fs {
  writeFileSync: (path: string, data: string) => void;
}

export class CsvFileWriter {
  constructor(private readonly fs: Fs) {}

  writeCsvFile<T extends object>(
    path: string,
    data: T[],
    headers?: (keyof T)[]
  ): void {
    if (data.length === 0) throw new Error("data is empty");

    const header = headers ?? Object.keys(data[0]);

    const headerString = header.join(",");
    const dataString = data
      .map((d) => header.map((h) => d[h]).join(","))
      .join("\n");
    const csvString = `${headerString}\n${dataString}`;

    this.fs.writeFileSync(path, csvString);
  }
}
