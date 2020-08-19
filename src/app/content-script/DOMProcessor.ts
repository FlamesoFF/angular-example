export abstract class AbstractComponent {
    element: HTMLElement;
    selector?: string;

    constructor(template: string, selector: string) {
        this.element = AbstractComponent.htmlToElement(template, selector);
        this.selector = selector;

        if (this.onCreated) {
            this.onCreated();
        }
    }

    static htmlToElement(html: string, selector?: string): HTMLElement {
        const element: HTMLElement = document.createElement(selector || 'div');

        html = html.trim();
        element.innerHTML = html;

        // console.log(element);

        if (selector) {
            return element;
        } else {
            return element.firstElementChild as HTMLElement;
        }
    }

    onCreated?(): void
}