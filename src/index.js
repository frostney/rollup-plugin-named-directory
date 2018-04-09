import path from 'path';
import fs from 'fs';

// TODO: This might be an issue. Double-check
const PATH_SEPARATOR = '/';

const exists = (uri) => {
  try {
    return fs.statSync(uri).isFile();
  } catch (e) {
    return false;
  }
};

export default function namedDirectory(matcher) {
  const potentialMatches = matcher || ['<dir>/<dir>.js'];

  return {
    resolveId(importee, importer) {
      if (path.extname(importee) !== '') {
        return null;
      }

      const splitImportee = importee.split(PATH_SEPARATOR);
      const directory = splitImportee.pop();

      for (let i = 0, j = potentialMatches.length; i < j; i++) {
        const potentialMatch = potentialMatches[i].replace(/<dir>/g, directory);

        const updatedImportee = [
          ...splitImportee,
          ...potentialMatch.split(PATH_SEPARATOR),
        ].join(PATH_SEPARATOR);

        // TODO: Provider better fallback for importer
        const fullPath = path.resolve(
          path.dirname(importer || '.'),
          updatedImportee,
        );

        if (exists(fullPath)) {
          return fullPath;
        }
      }

      return null;
    },
  };
}
