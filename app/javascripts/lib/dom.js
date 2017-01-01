export const tag = (type, { id, klass }, html) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;

  el.innerHTML = html;

  return el;
};
