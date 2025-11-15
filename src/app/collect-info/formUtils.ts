// formUtils.ts
export function getErrorMessage(errors: any, path: string) {
  // safe path resolution, returns string | undefined
  return path.split(".").reduce((acc: any, key) => acc?.[key], errors)?.message;
}
