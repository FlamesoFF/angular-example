import {formatDate} from '@angular/common';
import {Injectable} from '@angular/core';


@Injectable()
export class DateTimeService {
    formatGenericDate(date: Date) {
        return formatDate(date, 'y-MM-dd h:mm', 'en-US');
    }

    formatQuoteDate(date: Date) {
        return this.formatGenericDate(date);
    }

    formatCommentDate(date: Date) {
        return this.formatGenericDate(date);
    }
}

