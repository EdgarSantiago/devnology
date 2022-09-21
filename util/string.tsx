export function strSmartTrim(str: string, maxLength = 8) {
  if (!str) return str;
  if (maxLength < 1) return str;
  if (str.length <= maxLength) return str;
  if (maxLength == 1) return str.substring(0, 1) + "...";

  let midpoint = Math.ceil(str.length / 2);
  let toremove = str.length - maxLength;
  let lstrip = Math.ceil(toremove / 2);
  let rstrip = toremove - lstrip;
  return (
    str.substring(0, midpoint - lstrip) +
    " - " +
    str.substring(midpoint + rstrip)
  );
}
