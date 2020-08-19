import { AbstractComponent } from "@/app/content-script/DOMProcessor";

export type TAppComponent = AbstractComponent;

export class App {
    components: TAppComponent[];

    constructor(components: TAppComponent[]) {
        this.components = components;
    }

    findComponent(selector: string): TAppComponent {
        let component;

        this.components.forEach((item: TAppComponent) => {
            if (item.selector === selector) {
                component = item;
                return;
            }
        });

        return component;
    }
}

// export const Gg2App = new App([
//     new LaunchButtonComponent(),
//     new LaunchButtonMenuComponent()
// ]);