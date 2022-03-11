import { useCallback, useMemo, useRef } from 'react'

import { filterArray } from '../utils/array'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type State = Record<string, any>
type Dispatch = React.Dispatch<React.SetStateAction<State>>

/**
 * Hooks for manage input search from query
 *
 * @param filterBy key or field in data object
 * @param setQueryState dispatch action from state
 *
 * @example
 * const { inputRef, changeState } = useSearch('name', setQueryState)
 *
 */
export const useSearch = (filterBy: string, setQueryState: Dispatch) => {
  const inputRef = useRef([])

  const onStateChange = useMemo(
    () => (value: string) => {
      return setQueryState(
        filterArray(inputRef.current, {
          [filterBy]: (t: string) =>
            String(t.toLowerCase()).includes(value.toLowerCase()),
        })
      )
    },
    [filterBy, setQueryState]
  )

  const inputState = useCallback(
    (event) => {
      if (onStateChange) return onStateChange(event.target.value)
    },
    [onStateChange]
  )

  return {
    inputRef,
    inputState,
  }
}