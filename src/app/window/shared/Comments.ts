import { IComment } from '@apollo4u/types/backend/v3';
import { clearObject } from "@/app/window/shared/utils";

export class Comments {
    items: Comment[] = [];

    constructor( items?: Comment[] ) {
        if ( items ) {
            items.forEach(item => {
                this.add(item);
            });
        }
    }

    add( item: Comment ) {
        item = clearObject(item);

        const comment = new Comment(item);

        this.items.push(comment);
    }

    remove( item: Comment ) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    getPrepared(): Comment[] {
        let prepared = Array.from(this.items);  // copy array

        // prepared.map(value => {
        //     delete value.update;
        // });

        return prepared;
    }

    clear() {
        this.items = [];
    }

    getCount() {
        return this.items.length;
    }
}

export class Comment implements IComment {
    user: {
        _id: string;
        name: string;
        avatar?: string;
    };
    text: string = '';
    created_on: string;
    updated_on?: string;

    constructor(
        data: IComment
    ) {
        if ( data ) {
            Object.assign(this, data, {
                clearUndefined: true,
                clearNull: true
            });
        }
    }
}