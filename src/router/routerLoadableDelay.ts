import * as NProgress from 'nprogress';
import {LoadLoable} from '@component/loadPanel';

const ConfigBaseThen = (e: any) => {
    NProgress.done()
    return e
}

export const RouterLoadableConfigBase = {
    loading: LoadLoable,
    delay: 1500,
    timeout: 5000
}

export function RouterLoadableDelay(imports: Promise<any>, ms: number = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    }).then(() => imports.then(ConfigBaseThen));
}
