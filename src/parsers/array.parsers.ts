export function splice(value: any, params: any) {
  if (!value.splice)
    return value;

  const pos = params.pos || 0;
  const length = params.length || 1;

  value.splice(pos, length);
  return value;
}

export function pop(value: any) {
  if (!value.pop)
    return value;

  value.pop();
  return value;
}

export function shift(value: any) {
  if (!value.shift)
    return value;

  value.shift();
  return value;
}

export function unshift(value: any, params: any) {
  if (!value.unshift)
    return value;

  value.unshift(params.value);
  return value;
}

export function push(value: any, params: any) {
  if (!value.push)
    return value;

  value.push(params.value);
  return value;
}

export function join(value: any, params: any) {
  if (!value.join)
    return '';

  return value.join(params.separator);
}

export function length(value: any) {
  if (!value.length)
    return 0;

  return value.length;
}

export function at(value: any, params: any) {
  if (!Array.isArray(params.index))
    return value[params.index];

  const result = [];

  for (const index of params.index) {
    result.push(value[index]);
  }
  return result;
}