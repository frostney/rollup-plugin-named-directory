import { resolve } from 'path';
import { statSync } from 'fs';

const exists = (uri) => {
  try {
    return statSync(uri).isFile();
  } catch (e) {
    return false;
  }
};

export default function namedDirectory(matcher) {
  const potentialFiles = matcher || ['<dir>/<dir>.js', '<dir>.js'];

  return {
    resolveId(importee /* , importer */) {
      for (let i = 0, j = potentialFiles.length; i < j; i + 1) {
        const potentialFile = potentialFiles[i].replace(/<dir>/g, importee);

        if (exists(potentialFile)) {
          return resolve(potentialFile);
        }
      }

      return importee;
    },
  };
}
