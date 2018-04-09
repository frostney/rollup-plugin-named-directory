import path from 'path';
import fs from 'fs';

// TODO: This might be an issue. Double-check
const PATH_SEPARATOR = '/';
const DEFAULT_MATCHERS = ['<dir>/<dir>.js'];
const DEFAULT_FILTER = () => false;
const DEFAULT_OPTIONS = {
  matchers: DEFAULT_MATCHERS,
  filter: DEFAULT_FILTER,
};

const exists = (uri) => {
  try {
    return fs.statSync(uri).isFile();
  } catch (e) {
    return false;
  }
};

export default function namedDirectory({
  matchers = DEFAULT_MATCHERS,
  filter = DEFAULT_FILTER,
} = DEFAULT_OPTIONS) {
  return {
    resolveId(importee, importer) {
      if (path.extname(importee) !== '') {
        return null;
      }

      const splitImportee = importee.split(PATH_SEPARATOR);
      const directory = splitImportee.pop();

      for (let i = 0, j = matchers.length; i < j; i++) {
        const potentialMatch = matchers[i].replace(/<dir>/g, directory);

        if (filter(potentialMatch)) {
          break;
        }

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
