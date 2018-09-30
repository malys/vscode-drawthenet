import { Command } from './common';
import { extractSource } from '../drawthenet/sourceExtracter/extractSource';

export class CommandExtractSource extends Command {
    async execute() {
        await extractSource();
    }
    constructor() {
        super("drawthenet.extractSource");
    }
}