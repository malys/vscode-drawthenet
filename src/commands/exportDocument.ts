import { Command } from './common';
import { exportDocument } from '../drawthenet/exporter/exportDocument';

export class CommandExportDocument extends Command {
    async execute() {
        await exportDocument(true);
    }
    constructor() {
        super("drawthenet.exportDocument");
    }
}