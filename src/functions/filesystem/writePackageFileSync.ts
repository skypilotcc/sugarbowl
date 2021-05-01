import fs from 'fs';
import path from 'path';
import { Integer, JsonMap } from '@skypilot/common-types';

import type { WriteFileResult } from 'src/functions';
import { findUpTree } from './findUpTree';

interface WritePackageFileOptions {
  content: JsonMap;
  filePath?: string;
  indentSize?: Integer;
}

// This is skeleton function for a more robust package-file writer

export function writePackageFileSync(options: WritePackageFileOptions): WriteFileResult {
  const {
    content,
    filePath = findUpTree('package.json'),
    indentSize = 2,
  } = options;
  const stringifiedData: string = JSON.stringify(content, undefined, indentSize);

  const fullPath = path.resolve(filePath);
  const fileExists = fs.existsSync(fullPath);

  fs.writeFileSync(filePath, `${stringifiedData}\n`);

  return {
    fullPath,
    overwritten: fileExists,
    status: 'OK',
  };
}
