export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const API_TOKEN = "xDgLheJsv5r5x7bZm76VKgcws9rzWIPsTmP020Tf"

export const API_URL = "4um3nXtAjuvWiiMeB8tWTSsFvtwYQfpN40cnP9U0"

export function randomId(myArray) {
  // return Math.floor(Math.random() * (max - min + 1) + min)
  return Math.floor(Math.random() * myArray.length)
}
