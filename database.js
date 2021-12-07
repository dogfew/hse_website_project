const fs = require('fs');
const path = require('path');
const DB_FILE_PATH = path.resolve('./database.json');

class Database {
    constructor() {
        this._database = {};

        try {
            // проверка, что файл базы данных существует
            if (fs.existsSync(DB_FILE_PATH)) {
                let content = fs.readFileSync(DB_FILE_PATH).toString();

                this._database = JSON.parse(content);
            }
        } catch (e) {
            console.error(e);
        }
    }

    add(collectionName, value, save) {
        save = save || true;

        if (typeof value !== 'object') {
            throw new Error('We can store only objects in database');
        }

        if (!this._database.hasOwnProperty(collectionName)) {
            this._database[collectionName] = [];
        }

        this._database[collectionName].push(value);

        if (save) {
            this.save();
        }

        return true;
    }

    get(collectionName, limit, offset) {
        limit = limit || 0;
        offset = offset || 0;

        if (!this._database.hasOwnProperty(collectionName)) {
            return [];
        }

        if (limit > 0) {
            return this._database[collectionName].slice(offset, limit);
        }

        return this._database[collectionName];
    }

    save() {
        try {
            fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this._database));
            console.log('База данных сохранена');
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = Database;