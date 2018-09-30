import { IRender } from '../renders/interfaces';
import { drawthenetServer } from '../renders/drawthenetServer';
import { config, RenderType } from '../config';

/**
 * get applied base exporter
 * @returns IBaseExporter of applied exporter
 */
export function appliedRender(): IRender {
    return drawthenetServer;
}
