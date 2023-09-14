export default function getUniqueSpecValues(specType, productArray) {
  let uniqueSpecValues = [];
  for (const product of productArray) {
    if (specType !== 'brand' && !uniqueSpecValues.includes(product[specType])) {
      uniqueSpecValues.push(product[specType]);
    } else if (specType === 'brand' && !uniqueSpecValues.includes(product[specType].name)) {
      uniqueSpecValues.push(product[specType].name);
    }
  }

  return uniqueSpecValues;
}
