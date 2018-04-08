import { statSync } from 'fs';

const exists = (uri) => {
  try {
    return statSync(uri).isFile();
  } catch (e) {
    return false;
  }
};

export default function namedDirectory(matcher) {
  const match = matcher || ['<dir>/<dir>.js'];

  return {
    resolveId(importee, importer) {
      return importee;
    },
  };
}
