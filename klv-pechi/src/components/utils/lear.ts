// TODO: Реализуйте абстрактный класс View
abstract class View {
  children: Array<View | string>;
  tag: string;
  abstract render(): string;

  constructor(children?: Array<View | string>) {
    this.children = children || [];
  }

  renderChildren() {
    return this.children
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        }

        return child.render();
      })
      .join('');
  }

  renderHTML(attributes?: Record<string, string>) {
    const attributesString = Object.entries(attributes || {})
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');

    const tag = this.tag;
    const childrenString = this.renderChildren();

    if (childrenString) {
      return `<${tag}${attributesString}>${childrenString}</${tag}>`;
    }

    return `<${tag}${attributesString} />`;
  }
}

// TODO: Наследуйте класс View
class Block extends View {
  tag = 'div';
  id?: string;

  constructor(children?: Array<View | string>, id?: string) {
    super(children);
    this.id = id;
  }

  render() {
    return this.renderHTML(this.id ? { id: this.id } : undefined);
  }
}

// TODO: Наследуйте класс View
class Picture extends View {
  tag = 'img';
  src: string;
  title: string;

  constructor(src: string, title: string, children?: Array<View | string>) {
    super(children);
    this.src = src;
    this.title = title;
  }

  render() {
    return this.renderHTML({ src: this.src, alt: this.title });
  }
}

const image = new Picture('https://some.ru/logo', 'Какой-то логотип');
const header = new Block([image, 'ООО "Космические аппараты"'], 'Header');

console.log(header.render());
