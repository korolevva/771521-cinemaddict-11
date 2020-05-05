export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
  }
};

// export const show = (parent, element) => {
//   parent.appendChild(element);
// };

export const hide = (component) => {
  component.getElement().remove();
};

export const show = (component) => {
  const parentElement = document.body;
  const newElement = component.getElement();
  const isExistElements = !!(parentElement && newElement);

  if (isExistElements) {
    parentElement.appendChild(newElement);
  }

};


export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
