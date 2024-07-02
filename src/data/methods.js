// Description Trim
export const trimDescription = (string, length) => {
  if (string.length <= length) {
    return string;
  }

  let trimedString = string.slice(0, length);
  const lastPeriodIndex = trimedString.lastIndexOf(".");

  if (lastPeriodIndex !== -1) {
    // Trim at the last period
    trimedString = trimedString.slice(0, lastPeriodIndex + 1);
  } else {
    const lastCommaIndex = trimedString.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      // Trim at the last comma and replace it with a period
      trimedString = trimedString
        .slice(0, lastCommaIndex + 1)
        .replace(/,$/, ".");
    } else {
      // If no period or comma, just trim to 100 characters
      trimedString = trimedString + "..."; // Optionally add ellipsis to indicate truncation
    }
  }

  return trimedString;
};

export const trimShortDesc = (string, length) => {
  if (string.length <= length) {
    return string;
  }

  return string.slice(0, length) + "...";
};
