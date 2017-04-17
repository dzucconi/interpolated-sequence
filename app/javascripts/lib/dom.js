export const tag = (type, { id, klass } = {}, html) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;

  if (html) el.innerHTML = html;

  return el;
};
