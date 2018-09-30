import { Command } from './common';
import { makeDocumentURL } from '../drawthenet/urlMaker/urlDocument';

export class CommandURLCurrent extends Command {
    async execute() {
        await makeDocumentURL(false);
    }
    constructor() {
        super("drawthenet.URLCurrent");
    }
}