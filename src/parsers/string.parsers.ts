export function toLowerCase(value: any) {
  if (!value.toLowerCase)
    return value;

  return value.toLowerCase();
}

export function toUpperCase(value: any) {
  if (!value.toUpperCase)
    return value;

  return value.toUpperCase();
}

export function split(value: any, params: any) {
  if (!value.split)
    return value;

  const separator = params.separator || ',';

  return value.split(separator);
}