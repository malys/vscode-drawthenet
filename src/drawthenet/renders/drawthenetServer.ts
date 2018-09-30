import * as vscode from 'vscode';
import * as fs from 'fs';
import * as zlib from 'zlib';

import { IRender, RenderTask, RenderError } from './interfaces'
import { Diagram, diagramStartReg } from '../diagram/diagram';
import { config } from '../config';
import { localize } from '../common';
import { addFileIndex } from '../tools';
const request = require('request');

interface DrawthenetServerError {
    error: string
    line: number
    description: string
}

class DrawthenetServer implements IRender {
    /**
     * Indicates the exporter should limt concurrency or not.
     * @returns boolean
     */
    limitConcurrency(): boolean {
        return false;
    }
    /**
     * formats return an string array of formats that the exporter supports.
     * @returns an array of supported formats
     */
    formats(): string[] {
        return [
            "svg"
        ];
    }
    /**
     * export a diagram to file or to Buffer.
     * @param diagram The diagram to export.
     * @param format format of export file.
     * @param savePath if savePath is given, it exports to a file, or, to Buffer.
     * @returns ExportTask.
     */
    render(diagram: Diagram, format: string, savePath: string): RenderTask {
        let allPms = [...Array(diagram.pageCount).keys()].map(
            (index) => {
                let requestUrl = config.server;
         
                let savePath2 = savePath ? addFileIndex(savePath, index, diagram.pageCount) : "";
                return this.httpWrapper(requestUrl,diagram, savePath2).then(
                    result => new Promise<Buffer>(
                        (resolve, reject) => {
                            let stdout = result[0];
                            let stderr = result[1];
                            if (stderr) {
                                let err = stderr.drawthenetError ?
                                    this.parseDrawthenetError(stderr.drawthenetError, diagram) :
                                    stderr.message
                                err = localize(10, null, diagram.title, err);
                                reject(err);
                            } else {
                                resolve(stdout)
                            };
                        }
                    )
                );
            },
            Promise.resolve(new Buffer(""))
        );
        return <RenderTask>{
            processes: [],
            promise: Promise.all(allPms),
        }
    }
    getMapData(diagram: Diagram, savePath: string): RenderTask {
        return this.render(diagram, "map", savePath);
    }
    private httpWrapper(requestUrl: string,diagram: Diagram, savePath?: string): Promise<[Buffer, any]> {
        return new Promise<[Buffer, any]>((resolve, reject) => {
            request(
                {
                    method: 'POST'
                    , uri: requestUrl
                    , headers: {'Content-Type': 'application/text'}
                    , body : diagram.content
                    , encoding: null // for byte encoding. Otherwise string.
                    , gzip: true
                }
                , (error, response, body) => {
                    let stdout = "";
                    let stderr = undefined;
                    if (!error) {
                        if (response.statusCode === 200) {
                            if (savePath) {
                                if (body.length) {
                                    fs.writeFileSync(savePath, body);
                                    stdout = savePath;
                                } else {
                                    stdout = "";
                                }
                            } else {
                                stdout = body
                            }
                        } else if (response.headers['x-drawthenet-diagram-error']) {
                            stderr = {
                                drawthenetError: <DrawthenetServerError>{
                                    error: response.headers['x-drawthenet-diagram-error'],
                                    line: parseInt(response.headers['x-drawthenet-diagram-error-line']),
                                    description: response.headers['x-drawthenet-diagram-description']
                                }
                            }
                            stdout = body
                        } else {
                            stderr = "Unexpected Error: "
                                + response.statusCode + "\n"
                                + "for POST " + requestUrl;
                        }
                    } else {
                        stderr = error;
                    }
                    resolve([new Buffer(stdout), stderr]);
                })
        });
    }
    private parseDrawthenetError(error: DrawthenetServerError, diagram: Diagram): any {
        let fileLine = error.line;
        if (diagramStartReg.test(diagram.lines[0])) fileLine += 1;
        let blankLineCount = 0;
        for (let i = 1; i < diagram.lines.length; i++) {
            if (diagram.lines[i].trim()) break;
            blankLineCount++;
        }
        fileLine += blankLineCount;
        let lineContent = diagram.lines[fileLine - 1];
        fileLine += diagram.start.line;
        return `${error.error} (@ Diagram Line ${error.line}, File Line ${fileLine})\n"${lineContent}"\n${error.description}\n`;
    }
}
export const drawthenetServer = new DrawthenetServer();