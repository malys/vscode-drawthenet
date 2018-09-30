'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as nls from "vscode-nls";

import { config } from './drawthenet/config';
import { previewer } from './providers/previewer';
import { Symbol } from "./providers/symboler";
import { Completion } from "./providers/completion";
import { Signature } from "./providers/signature";
import { Formatter } from "./providers/formatter";
import { notifyOnNewVersion } from "./drawthenet/messages";
import { outputPanel, bar } from "./drawthenet/common";
import { contextManager } from './drawthenet/context';

import { CommandExportCurrent } from './commands/exportCurrent';
import { CommandExportDocument } from './commands/exportDocument';
import { CommandExportWorkspace } from './commands/exportWorkspace';
import { CommandURLCurrent } from './commands/urlCurrent';
import { CommandURLDocument } from './commands/urlDocument';
import { CommandExtractSource } from './commands/extractSource';
import { CommandPreviewStatus } from './commands/previewStatus';
import { drawthenetPlugin } from './markdown-it-drawthenet/index';
import { Diagnoser } from './providers/diagnoser';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    contextManager.set(context);
    try {
        const ext = vscode.extensions.getExtension("malys.drawthenet");
        const version = ext.packageJSON.version;
        notifyOnNewVersion(context, version);

        context.subscriptions.push(
            new CommandExportCurrent(),
            new CommandExportDocument(),
            new CommandExportWorkspace(),
            new CommandURLCurrent(),
            new CommandURLDocument(),
            new CommandPreviewStatus(),
            new CommandExtractSource(),
            new Formatter(),
            new Symbol(),
            new Completion(),
            new Signature(),
            new Diagnoser(ext),
            previewer,
            config,
            outputPanel,
            bar,
        );
        return {
            extendMarkdownIt(md: any) {
                return md.use(drawthenetPlugin(md));
            }
        }
    } catch (error) {
        outputPanel.clear();
        outputPanel.append(error);
    }
}

// this method is called when your extension is deactivated
export function deactivate() { }