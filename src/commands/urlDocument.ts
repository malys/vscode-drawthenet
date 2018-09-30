import { Command } from './common';
import { makeDocumentURL } from '../drawthenet/urlMaker/urlDocument';

export class CommandURLDocument extends Command {
    async execute() {
        await makeDocumentURL(true);
    }
    constructor() {
        super("drawthenet.URLDocument");
    }
}