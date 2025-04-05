type InjectTagsFromValues = {
  body: string;
  values: Record<string, string>;
};

export function injectVariables({
  body,
  values,
}: InjectTagsFromValues): string {
  let finalBody = body;

  for (const [key, value] of Object.entries(values)) {
    const placeholderRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    finalBody = finalBody.replace(placeholderRegex, value);
  }

  return finalBody;
}
