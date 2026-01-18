export function toMysqlDatetime(value = new Date()) {
  const d = value instanceof Date ? value : new Date(value);

  return d.toISOString().slice(0, 19).replace("T", " ");
}

