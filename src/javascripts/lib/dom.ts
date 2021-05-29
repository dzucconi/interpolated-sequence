export const tag = (
  type: string,
  { id, klass }: { id?: string; klass?: string } = {},
  html?: string
) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;
  if (html) el.innerHTML = html;

  return el;
};
