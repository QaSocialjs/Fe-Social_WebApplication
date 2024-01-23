import { DependencyList, EffectCallback, useCallback, useEffect } from "react";
import { useDebouncyFn, useDebouncyEffect } from "use-debouncy";
export function useDebouncy(fn: () => {}, delayMs: number) {
  return useDebouncyFn(() => fn, delayMs);
}
export function useDedoncyEffectHook(
  fn: EffectCallback,
  wait?: number,
  deps?: DependencyList
) {
  useDebouncyEffect(fn, wait, deps);
}

export function coreUseDebounce(effect: any, dependencies: any, delay: any) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
