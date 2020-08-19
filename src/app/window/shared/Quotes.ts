import { IQuote, IQuoteItem, IQuoteHeaders } from '@apollo4u/types/backend/v3';


export class SectionHeaders implements IQuoteHeaders {
    message_id: string;
    from: string;
    to: string;
    subject: string;
    date: string;

    constructor(headers: IQuoteHeaders) {
        Object.assign(this, headers);
    }
}

export class QuoteSection implements IQuote {
    public headers: IQuoteHeaders;
    public items: Quote[];

    constructor(
        headers: SectionHeaders,
        items: Quote[]
    ) {
        this.headers = new SectionHeaders(headers);
        this.items = [];

        items.forEach(item => {
            this.items.push(
                new Quote(item.manager_id, item.text)
            );
        });
    }

    static getItems(items: Set<Quote>): Quote[] {
        return Array.from(items.values());
    }
}

export type TSectionTuple = [string, QuoteSection];

export class Quote implements IQuoteItem {
    constructor(
        public manager_id: string,
        public text: string
    ) {
    }
}

export class Quotes {
    sections: TSectionTuple[] = <TSectionTuple[]>[];

    constructor(
        sections?: QuoteSection[]
    ) {
        if (sections) {
            sections.forEach(section => {
                this.sections.push([
                    section.headers.subject,
                    new QuoteSection(section.headers, section.items)
                ]);
            });
        }
    }

    addSection(section: QuoteSection) {
        this.sections.push([
            section.headers.subject,
            new QuoteSection(section.headers, section.items)
        ]);
    }

    static getSections(sections: QuoteSection): QuoteSection[] {
        return Object.values(sections);
    }

    static findBySubject(subject: string, sections: TSectionTuple[]): QuoteSection {
        let section: TSectionTuple = null;

        sections.forEach((item: TSectionTuple, index: number) => {
            if (item[0] === subject) {
                section = item;
            }
        });

        if (section) {
            return section[1];
        }
    }

    getPrepared(): QuoteSection[] {
        return this.sections.map(item => item[1]);
    }

    getCount(){
        let count = 0;

        this.sections.forEach((section) => {
            count += section[1].items.length;
        });

        return count;
    }

    clear() {
        this.sections = [];
    }
}