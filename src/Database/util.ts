import DatabaseManager from "../Contracts/Database/DatabaseManager";
import {app} from "../Support/helpers";

export async function updateOrInsert(table, attributes, values = {}): Promise<number | number[]> {
    const db: DatabaseManager = app('db');

    return db.transaction(async trx => {
        const result = await trx.table(table).where(attributes);

        if (result.length > 0) {
            return trx.table(table).where(attributes).update(values);
        } else {
            const combined = { ...attributes, ...values };

            return trx.table(table).insert(combined);
        }
    })
}