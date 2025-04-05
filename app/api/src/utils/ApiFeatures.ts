import { QueryParams } from '@sis/types';
import { Query } from 'mongoose';

export class ApiFeatues<T> {
    private query: Query<T[], T>;
    private queryStr: QueryParams;

    constructor(query: Query<T[], T>, queryStr: QueryParams) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filterByYear() {
        if (this.queryStr.year) {
            this.query = this.query.find({ year: this.queryStr.year });
        }
        return this;
    }

    filterByResult() {
        if (this.queryStr.result) {
            const assignmentField = `results.${this.queryStr.result}`;
            this.query = this.query.select(`registerNo name year ${assignmentField}`) as Query<T[], T>;
        }
        return this;
    }

    filterByStatus() {
        const { result, status } = this.queryStr;

        if (result && typeof status !== 'undefined') {
            const statusBool = status === 'true';
            const fieldPath = `results.${result}`;

            this.query = this.query.find({
                [fieldPath]: { $elemMatch: { status: statusBool } },
            });
        }

        return this;
    }

    async exec() {
        return await this.query;
    }
}
