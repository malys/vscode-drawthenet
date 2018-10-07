import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { localize } from './common';
import { ConfigReader, ConfigCache } from './configReader';
import { contextManager } from './context';

export const RenderType = {
    DrawTheNetServer: 'DrawTheNetServer'
};

class Config extends ConfigReader {
    constructor() {
        super('drawthenet');
    }

    onChange() {
    }

    fileExtensions(uri: vscode.Uri): string {
        let extReaded = this.read<string>('fileExtensions', uri).replace(/\s/g, "");
        let exts = extReaded || ".*";
        if (exts.indexOf(",") > 0) exts = `{${exts}}`;
        //REG: .* | .wsd | {.wsd,.java}
        if (!exts.match(/^(.\*|\.\w+|\{\.\w+(,\.\w+)*\})$/)) {
            throw new Error(localize(18, null, extReaded));
        }
        return exts;
    }
    get previewAutoUpdate(): boolean {
        return this.read<boolean>('previewAutoUpdate');
    }

    get previewSnapIndicators(): boolean {
        return this.read<boolean>('previewSnapIndicators');
    }

    get server(): string {
        return "http://malys.fr.openode.io/draw"; //this.read<string>('server') || 
    }

    get serverIndexParameter(): string {
        return this.read<string>('serverIndexParameter');
    }

    get render(): string {
        return this.read<string>('render');
    }

    includes(uri: vscode.Uri): string[] {
        return this.read<string[]>('includes', uri);
    }

}

export const config = new Config();