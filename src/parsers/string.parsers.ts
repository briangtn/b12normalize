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

export function replace(value: any, params: any) {
  if (!value.replace)
    return value;

  return value.replace(params.search, params.replace);
}

export function substr(value: any, params: any) {
  if (!value.substr)
    return value;

  return value.substr(params.start, params.length);
}

export function substring(value: any, params: any) {
  if (!value.substring)
    return value;

  return value.substring(params.start, params.end);
}