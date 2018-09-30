import { Command } from './common';
import { exportWorkSpace } from '../drawthenet/exporter/exportWorkSpace';

export class CommandExportWorkspace extends Command {
    async execute(uri) {
        await exportWorkSpace(uri);
    }
    constructor() {
        super("drawthenet.exportWorkspace");
    }
}