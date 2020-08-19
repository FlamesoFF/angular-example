export abstract class InfoBlockModel {
    items: any[] = [];

    protected constructor(items?: any[]){}

    getCount() {
        return this.items.length;
    }
}