export function bubbleSort(numbers) {
  const sorted = [...numbers];

  for (let end = sorted.length - 1; end > 0; end -= 1) {
    let swapped = false;

    for (let index = 0; index < end; index += 1) {
      if (sorted[index] > sorted[index + 1]) {
        [sorted[index], sorted[index + 1]] = [sorted[index + 1], sorted[index]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return sorted;
}
