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

    filterByStatus() {
        if (this.queryStr.status) {
            this.query = this.query.find({
                $or: [
                    { 'results.one.status': this.queryStr.status },
                    { 'results.two.status': this.queryStr.status },
                    { 'results.three.status': this.queryStr.status },
                ],
            });
        }
        return this;
    }

    filterByResult() {
        if (this.queryStr.assignment) {
            const assignmentField = `results.${this.queryStr.assignment}`;
            this.query = this.query.select(`registerNo name ${assignmentField}`) as Query<T[], T>;
        }
        return this;
    }

    async exec() {
        return await this.query;
    }
}
