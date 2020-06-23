import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate
} from 'tiny-svg';

import {
    remove as domRemove
} from 'min-dom';

const CROSS_COLOR = '#CCC';
const BORDER_COLOR = 'rgba(0,0,0,0.1)';

export class ToolbarOriginLine {

    private showBorder: any
    private borderColor: any
    private crossColor: any

    private canvas: any

    private g: any;

    constructor(config: any, canvas: any) {
        config = config || {};
        this.showBorder = config.showBorder ?? true
        this.borderColor = config.borderColor || BORDER_COLOR
        this.crossColor = config.crossColor || CROSS_COLOR
        this.canvas = canvas;
        this.render();
    }

    /**
     * 渲染
     */
    private render() {
        const w: any = 30;
        const h: any = 2;
        const whalf: any = w / 2;
        const s: any = -h / 2;
        const lineStart: any = whalf + 7;
        const parent = this.canvas.getLayer('overlays-originLine', -1);
        let line: any;
        if (this.g) {
            domRemove(this.g)
            this.g = undefined
        }
        if (this.showBorder) {
            const g = this.g = this.createEl('g', {
                'pointer-events': 'none',
                'class': this.cls('g')
            });
            svgAppend(parent, g);
            line = this.createEl('path', {
                'class': this.cls('border'),
                'd': this.path([
                    'M', -lineStart, s,
                    'H', -1000,
                    'M', lineStart, s,
                    'H', 6000,
                    'M', s, -lineStart,
                    'V', -1000,
                    'M', s, lineStart,
                    'V', 3000
                ]),
                'fill': 'none',
                'stroke': this.borderColor,
                'stroke-width': h + 'px',
                'stroke-dasharray': '6, 6',
                'shape-rendering': 'crispedges'
            });
            svgAppend(g, line);
            const cross = this.createEl('path', {
                d: this.path([
                    'M', -whalf, s,
                    'H', whalf,
                    'M', s, -whalf,
                    'V', whalf
                ]),
                'class': this.cls('cross'),
                'fill': 'none',
                'stroke': this.crossColor,
                'stroke-width': h + 'px',
                'stroke-linecap': 'round'
            });
            svgAppend(g, cross);
            const label = this.createEl('text', {
                x: -40,
                y: -10,
                fill: this.crossColor,
                'class': this.cls('label')
            });
            label.textContent = '(0, 0)';
            svgAppend(g, label);
        }
    }

    public toggle(show?: boolean) {
        if (show) {
            this.showBorder = show;
        }
        this.showBorder = !this.showBorder
        this.render()
    }

    private path(parts: any) {
        return parts.join(' ');
    }

    private cls(name: any) {
        return 'overlays-originLine-' + name;
    }

    private createEl(type: any, attrs: any) {
        const el = svgCreate(type);
        svgAttr(el, attrs);
        return el;
    }
}

(ToolbarOriginLine as any).$inject = [
    'config',
    'canvas'
];

export default {
    __init__: ['toolbarOriginLine'],
    toolbarOriginLine: ['type', ToolbarOriginLine]
};
