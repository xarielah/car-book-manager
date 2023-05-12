function parseNumber(number: number): any {
  return Intl.NumberFormat("he-IL").format(number);
}

function parseDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IL");
}

function parseCarNumber(carNumber: string): string {
  // 0 1 - 2 3 4 - 5 6
  if (carNumber.length === 7)
    return [...carNumber]
      .map((digit, i) => (i === 2 || i === 5 ? "-" + digit : digit))
      .join("");

  // 0 1 2 - 3 4 - 5 6 7
  if (carNumber.length === 8)
    return [...carNumber]
      .map((digit, i) => (i === 3 || i === 5 ? "-" + digit : digit))
      .join("");

  return carNumber;
}

export { parseNumber, parseDate, parseCarNumber };
