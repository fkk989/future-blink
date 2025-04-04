import { EmailTemplateType } from "../types";


type InjectMergeTagParams = {
  body: string;
  mergeTags: EmailTemplateType["mergeTags"];
  values: Record<string, string>;
};

export function injectMergeTagsFromSchema({
  body,
  mergeTags,
  values,
}: InjectMergeTagParams): string {
  
  let finalBody = body;
  if (!mergeTags) return finalBody;
  for (const tag of mergeTags) {
    const value = values[tag.tag];
    if (!value) continue; // skip if no value provided for this tag

    const placeholderRegex = new RegExp(tag.placeholder.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    finalBody = finalBody.replace(placeholderRegex, value);
  }

  return finalBody;
}
