import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { localize } from './common';
import { ConfigReader, ConfigCache } from './configReader';
import { contextManager } from './context';

export const RenderType = {
    Local: 'Local',
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

    exportOutDirName(uri: vscode.Uri): string {
        return this.read<string>('exportOutDirName', uri) || "out";
    }

    exportFormat(uri: vscode.Uri): string {
        return this.read<string>('exportFormat', uri);
    }

    exportSubFolder(uri: vscode.Uri): boolean {
        return this.read<boolean>('exportSubFolder', uri);
    }

    get exportConcurrency(): number {
        return this.read<number>('exportConcurrency') || 3;
    }

    exportMapFile(uri: vscode.Uri): boolean {
        return this.read<boolean>('exportMapFile', uri) || false;
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

    get urlFormat(): string {
        return this.read<string>('urlFormat');
    }

    get urlResult(): string {
        return this.read<string>('urlResult') || "MarkDown";
    }

    get render(): string {
        return this.read<string>('render');
    }

    includes(uri: vscode.Uri): string[] {
        return this.read<string[]>('includes', uri);
    }
    get commandArgs(): string[] {
        return this.read<string[]>('commandArgs') || [];
    }
   
}


function evalPathVar(p: string, uri: vscode.Uri) {
    if (!p) return "";
    const workspaceFolder = uri.fsPath;
    let result = eval('`' + p + '`');
    if (!path.isAbsolute(result))
        result = path.join(workspaceFolder, result);
    return result;
}

export const config = new Config();