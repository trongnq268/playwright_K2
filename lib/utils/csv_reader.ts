import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

/**
 * Tiện ích đọc dữ liệu từ tệp tin CSV và chuyển đổi thành mảng đối tượng có kiểu định nghĩa trước.
 * @param filePath Đường dẫn tuyệt đối hoặc đường dẫn tương đối từ process.cwd()
 */
export function readCsv<T>(filePath: string): T[] {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, { encoding: 'utf-8' });
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as T[];
}
