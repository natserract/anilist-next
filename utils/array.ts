type Filters = {
  [key: string]: (value: unknown) => boolean
}

/**
 * Filters an array of objects using custom predicates.
 * From: https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 *
 * Example:
 * ```ts
 * (SENSITIVE CASE)
 * const data = [{ title: 'Title 1', title: 'Title 2 }]
 *
 * filterArray(data, {
 *  title: (t: string) => String(t).includes(event.target.value),
 * })
 * ```
 *
 * (UNSENSITIVE CASE)
 *  Note: if not sensitive, transform your value toLowerCase()
 *
 *  filterArray(searchRef.current, {
 *    title: (t: string) =>
 *      String(t.toLowerCase()).includes(value.toLowerCase()),
 *    })
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
export function filterArray<T>(array: Array<T>, filters: Filters) {
  const filterKeys = Object.keys(filters)

  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true

      return filters[key](item[key])
    })
  })
}