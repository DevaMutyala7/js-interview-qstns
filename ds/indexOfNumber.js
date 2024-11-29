function bsFirstOccurance(arr, num, start, end) {
  let mid = Math.round((start + end) / 2);
  let idx = +Infinity;

  if (start > end) {
    return idx;
  }

  if (arr[mid] > num) {
    return bsFirstOccurance(arr, num, start, mid - 1);
  } else if (arr[mid] < num) {
    return bsFirstOccurance(arr, num, mid + 1, end);
  } else {
    idx = mid;
    idx = Math.min(idx, bsFirstOccurance(arr, num, start, mid - 1));
  }

  return idx;
}

function bsLastOccurance(arr, num, start, end) {
  let mid = Math.round((start + end) / 2);
  let idx = -Infinity;

  if (start > end) {
    return idx;
  }

  if (arr[mid] > num) {
    return bsLastOccurance(arr, num, start, mid - 1);
  } else if (arr[mid] < num) {
    return bsLastOccurance(arr, num, mid + 1, end);
  } else {
    idx = mid;
    idx = Math.max(idx, bsLastOccurance(arr, num, mid + 1, end));
  }

  return idx;
}

function occurences(arr, num) {
  let firstOccurance = bsFirstOccurance(arr, num, 0, arr.length - 1, true);
  let lastOccurance = bsLastOccurance(arr, num, 0, arr.length - 1, false);

  return [firstOccurance, lastOccurance];
}

console.log(occurences([1, 1, 2, 3, 3, 3, 3, 3, 3, 4, 5, 6], 3));
