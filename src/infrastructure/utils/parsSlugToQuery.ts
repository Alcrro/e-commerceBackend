export function parseSlugToQuery(slug?: string): {
  category?: string | string[];
  filters: Record<string, any>;
} {
  if (!slug || typeof slug !== 'string') {
    return { category: undefined, filters: {} };
  }

  console.log('Raw Slug:', slug);

  let parts = slug
    .split('/')
    .filter((part) => part && part.toLowerCase() !== 'favicon.ico');

  console.log('Split Parts:', parts);

  let category: string | string[] | undefined;
  const filters: Record<string, any> = {};

  if (parts.length === 1) {
    category = parts[0].includes('-') ? parts[0].split('-') : parts[0];
  } else if (parts.length >= 2) {
    category = parts[0].includes('-') ? parts[0].split('-') : parts[0];
    parts = parts.slice(1); // Remove the first category part

    console.log('After Category Extraction:', parts);

    for (let i = 0; i < parts.length; i += 2) {
      if (parts[i + 1]) {
        filters[parts[i]] = parts[i + 1];
      }
    }
  }

  console.log('Final Output -> Category:', category, ', Filters:', filters);
  return { category, filters };
}
