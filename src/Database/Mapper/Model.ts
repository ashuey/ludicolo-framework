import { Model as BaseModel } from 'objection';
import * as pluralize from 'pluralize';
import * as moment from 'moment'
import * as _ from 'lodash'

export default class Model extends BaseModel {
    public created_at;

    public updated_at;

    static get tableName(): string {
        const parts = _.lowerCase(this.name).split(' ');
        const last_word = pluralize(parts.pop());
        parts.push(last_word);
        return _.snakeCase(parts.join(' '))
    }

    $beforeInsert() {
        this.created_at = this.updated_at = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }

    $beforeUpdate() {
        this.updated_at = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }
}