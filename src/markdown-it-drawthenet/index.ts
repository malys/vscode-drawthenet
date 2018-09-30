import { renderHtml } from './render';
import { drawthenetWorker } from './rule';

export function drawthenetPlugin(md: any) {
    md.renderer.rules.drawthenet = renderHtml;
    md.core.ruler.push("drawthenet", drawthenetWorker);
}