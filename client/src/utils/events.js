import { diff } from 'deep-diff';

export function getDifferencesForEventInstance(originalData, instanceData) {
  let finalObject = {};
  let changes = diff(originalData, instanceData);

  if (changes) {
    changes.forEach(difference => {
      if (difference.kind === 'A') {
        //array
        // we will save the whole array, we don't need to determine the individual paths that were changed because the instance will contain the full array (there won't be a part of it stored on the series)
        let array = instanceData;
        difference.path.forEach(idx => {
          array = array[idx];
        });
        finalObject[difference.path.join('.')] = array;
      } else {
        finalObject[difference.path.join('.')] = difference.rhs;
      }
    });
  }

  return finalObject;
}
