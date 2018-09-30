import { Command } from './common';
import { exportDocument } from '../drawthenet/exporter/exportDocument';

export class CommandExportCurrent extends Command {
    async execute() {
        await exportDocument(false);
    }
    constructor() {
        super("drawthenet.exportCurrent");
    }
}