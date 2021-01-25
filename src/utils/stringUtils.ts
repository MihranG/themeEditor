export function checkBracesToBeClosed(expr: string): boolean {
  const recordingArray = [];
  const openBrackets = ["(", "{", "["];
  const closedBrackets = [")", "}", "]"];
  for (let letter of expr) {
    if (openBrackets.includes(letter)) {
      recordingArray.push(letter);
    } else if (closedBrackets.includes(letter)) {
      const indexOfLetter = closedBrackets.indexOf(letter);
      const openingPair = openBrackets[indexOfLetter];
      if (recordingArray[recordingArray.length - 1] === openingPair) {
        recordingArray.splice(-1, 1);
      } else {
        recordingArray.push(letter);
        break;
      }
    }
  }
  console.log("checkBracesToBeClosed", expr, recordingArray);

  return recordingArray.length === 0;
}
