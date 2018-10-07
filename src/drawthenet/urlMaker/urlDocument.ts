import * as vscode from 'vscode';
import * as nls from "vscode-nls";

import { Diagram, diagramsOf, currentDiagram } from '../diagram/diagram';
import { config } from '../config';
import { outputPanel,localize, bar } from '../common';
import { drawthenetServer } from '../renders/drawthenetServer';

interface pURL {
    name: string;
    url: string;
}

export async function makeDocumentURL(all: boolean) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage(localize(14, null));
        return;
    }
    let diagrams: Diagram[] = [];
    if (all) {
        diagrams = diagramsOf(editor.document);
        if (!diagrams.length) {
            vscode.window.showWarningMessage(localize(15, null));
            return;
        }
    } else {
        let dg = currentDiagram();
        if (!dg) {
            vscode.window.showWarningMessage(localize(3, null));
            return;
        }
        diagrams.push(dg);
        editor.selections = [new vscode.Selection(dg.start, dg.end)];
    }
    let urls = config.server
    bar.hide();

    outputPanel.clear();
    outputPanel.show();

    return urls;
}
function makeURLs(diagrams: Diagram[], server: string, format: string, bar: vscode.StatusBarItem): pURL[] {
    return diagrams.map<pURL>((diagram: Diagram) => {
        return makeURL(diagram, server, format, bar);
    })
}
function makeURL(diagram: Diagram, server: string, format: string, bar: vscode.StatusBarItem): pURL {
    if (bar) {
        bar.show();
        bar.text = localize(16, null, diagram.title);
    }
    return <pURL>{ name: diagram.title, url: config.server };
}