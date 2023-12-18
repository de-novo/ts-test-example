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
    const csvString = this.dataToCsvString(data, headers);
    this.fs.writeFileSync(path, csvString);
  }
  dataToCsvString<T extends object>(data: T[], headers?: (keyof T)[]) {
    const _headers = headers ?? (Object.keys(data[0]) as (keyof T)[]);
    const headerString = _headers.join(",");
    const dataString = data
      .map((d) => _headers.map((h) => d[h]).join(","))
      .join("\n");
    const csvString = `${headerString}\n${dataString}`;
    return csvString;
  }
}

export class CsvFileWriterBatch {
  constructor(
    private readonly csvFileWriter: CsvFileWriter,
    private readonly batchSize: number = 1000
  ) {}

  writeCsvFile<T extends object>(
    path: string,
    data: T[],
    headers?: (keyof T)[]
  ) {
    const batchCount = Math.ceil(data.length / this.batchSize);
    const batchData = Array.from({ length: batchCount }, (_, i) => {
      const start = i * this.batchSize;
      const end = start + this.batchSize;
      return data.slice(start, end);
    });

    batchData.forEach((d, i) => {
      const fileName = `${path.split(".")[0]}_${i + 1}.csv`;
      this.csvFileWriter.writeCsvFile(fileName, d, headers);
    });
  }
}
