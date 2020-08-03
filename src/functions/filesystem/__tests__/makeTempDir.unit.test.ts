import fs from 'fs';
import path from 'path';
import { makeTempDir } from '../makeTempDir';
import { wipeDir } from '../wipeDir';

const baseDir = 'makeTempDir';

/* Create a single directory in which to create any other directories */
const tmpDir = makeTempDir(baseDir);
beforeAll(() => fs.existsSync(tmpDir) && wipeDir(tmpDir));
afterAll(() => fs.existsSync(tmpDir) && fs.rmdirSync(tmpDir, { recursive: true }));

describe('makeTempDir(relativePath:string, options)', () => {
  it('should create a temporary directory and return the path to it', () => {
    const subDirName = 'test1';
    const subDirPath = makeTempDir(subDirName, { baseDir });

    expect(subDirPath).toBe(path.resolve(tmpDir, subDirPath));
    expect(subDirPath.endsWith(subDirName)).toBe(true);
  });

  it('when `addRandomSuffix:true`, should add a random suffix to the name of the directory', () => {
    const subDirName = 'random';
    const subDirPath = makeTempDir(subDirName, { baseDir, addRandomSuffix: true });

    expect(subDirPath.startsWith(path.join(tmpDir, subDirName))).toBe(true);
    expect(subDirPath.endsWith(subDirName)).toBe(false);
  });

  it('when `disallowExisting: true` and the directory already exists, should throw an error', () => {
    const subDirName = 'test2';

    makeTempDir(subDirName, { baseDir, addRandomSuffix: false });
    expect(() => makeTempDir(subDirName, { baseDir })).not.toThrow();
    expect(() => makeTempDir(subDirName, { baseDir, disallowExisting: true })).toThrow();
  });
});