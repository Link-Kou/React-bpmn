import {
    assign,
    isNumber
} from 'min-dash';

import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate
} from 'tiny-svg';

import {
    remove as domRemove
} from 'min-dom';

const DEFAULT_OPTIONS = {
    offset: {
        x: 150,
        y: 75
    },
    tolerance: 50,
    alignOnSave: true
};

export class ToolbarOriginAlign {

    private eventBus: any;

    private canvas: any;

    private config: any;

    private injector: any;

    private commandStack: any;

    public g: any

    /**
     * 是否执行对齐
     */
    private eventAlign: boolean = false
    /**
     * 显示对齐
     */
    private showAlign: boolean = false

    constructor(config: any, injector: any, eventBus: any, commandStack: any, canvas: any, modeling: any) {
        this.eventBus = eventBus;
        this.canvas = canvas;
        this.injector = injector;
        this.commandStack = commandStack;
        this.config = this.applyDefaults(config);
        this.DrawAlignBox(this.config)
        /**
         * A command handler that compensates the element movement
         * by applying the inverse move operation on the canvas.
         */
        commandStack.register('elements.alignToOrigin', {
            preExecute: function (context: any) {
                const delta = context.delta
                const elements = context.elements
                modeling.moveElements(elements, delta);
            },
            execute: this.movementCompensator(-1),
            revert: this.movementCompensator(1)
        });
        /**
         * 注册事件
         */
        this.eventBus.on('element.changed', (e: any) => {
            if (!this.eventAlign) {
                this.align();
            }
        });
    }

    /**
     * 获取到配置
     * @param config
     */
    applyDefaults(config: any) {
        const {originAlign} = config
        const c = assign({}, DEFAULT_OPTIONS, originAlign || {});
        if (isNumber(c.offset)) {
            c.offset = {
                x: c.offset,
                y: c.offset
            };
        }
        return c;
    }

    /**
     * Align the diagram content to the origin.
     *
     * @param {Object} options
     */
    align() {
        if (this.showAlign) {
            const config = this.config;
            const bounds = this.canvas.viewbox().inner;
            const elements = this.canvas?.getRootElement()?.children;
            if (elements) {
                const delta: any = this.computeAdjustment(bounds, config);
                this.DrawAlignBox(this.config);
                if (delta.x === 0 && delta.y === 0) {
                    return;
                }
                this.eventAlign = true
                this.commandStack.execute('elements.alignToOrigin', {
                    elements: elements,
                    delta: delta
                });
            }
        }
        this.DrawAlignBox(this.config);
    }

    /**
     * 根据给定的图原点进行计算调整
     * @param {Point} origin
     *
     * @return {Point} adjustment
     */
    computeAdjustment(origin: any, config: any) {
        const adjustment = {};
        if (config) {
            const offset = config.offset;
            const tolerance = config.tolerance;
            const quantize: any = this.quantize;
            const injector: any = this.injector;
            ['x', 'y'].forEach((axis) => {
                let delta = -origin[axis] + offset[axis];
                const gridSnapping = injector.get('gridSnapping', false);
                if (gridSnapping) {
                    delta = quantize(delta, gridSnapping.getGridSpacing());
                }
                adjustment[axis] = Math.abs(delta) < tolerance ? 0 : delta;
            });
        }
        return adjustment;
    }


    quantize(value: any, quantum: any, fn: any) {
        if (!fn) {
            fn = 'round';
        }
        return Math[fn](value / quantum) * quantum;
    }

    /**
     * Create a function that compensates the element movement
     * by moving applying the delta in the given direction.
     */
    movementCompensator(direction: any) {
        const eventBus = this.eventBus;
        const canvas = this.canvas;
        const eventRegist = () => {
            this.eventAlign = false
        }
        /**
         * Handler to executed
         */
        return function (context: any) {
            // adjust canvas after the commandstack got changed
            eventBus.once('commandStack.changed', () => {
                const delta = context.delta;
                const scale = canvas.viewbox().scale;
                canvas.scroll({
                    dx: direction * delta.x * scale,
                    dy: direction * delta.y * scale
                });
                eventRegist()
            });
        };
    }

    toggle(align?: boolean) {
        if (align) {
            this.showAlign = align
        }
        this.showAlign = !this.showAlign
        this.align()
    }

    /**
     * 绘制对齐框
     */
    DrawAlignBox(config: any) {
        const parent = this.canvas.getLayer('overlays-originAlign', -1);
        if (this.g) {
            domRemove(this.g)
        }
        if (!this.showAlign) {
            delete this.canvas._layers['overlays-originAlign']
            domRemove(parent)
            this.g = undefined
        }
        if (this.showAlign) {
            const g = this.g = this.createEl('g', {
                'pointer-events': 'none',
                'class': this.cls('g')
            });
            const h = 2;
            svgAppend(parent, g);
            // the tolerance area
            svgAppend(g, this.createEl('path', {
                'class': this.cls('border'),
                'd': this.path([
                    'M', config.offset.x - config.tolerance, config.offset.y - config.tolerance,
                    'H', 6000,
                    'v', config.tolerance * 2,
                    'H', config.offset.x + config.tolerance,
                    'V', 3000,
                    'h', -config.tolerance * 2,
                    'V', config.offset.y - config.tolerance,
                    'Z'
                ]),
                'fill': 'cadetblue',
                'fill-opacity': '.05',
                'stroke': 'cadetblue',
                'stroke-opacity': '.3',
                'stroke-width': '1px',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round'
            }));
            // the norm / origin
            svgAppend(g, this.createEl('path', {
                'class': this.cls('border'),
                'd': this.path([
                    'M', config.offset.x - h / 2, config.offset.y - h / 2,
                    'H', 6000,
                    'M', config.offset.x - h / 2, config.offset.y - h / 2,
                    'V', 3000
                ]),
                'fill': 'none',
                'stroke': 'cadetblue',
                'stroke-width': h + 'px',
                'stroke-dasharray': '2, 5',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round'
            }));
        }
    }

    path(parts: any) {
        return parts.join(' ');
    }

    cls(name: any) {
        return 'overlays-originAlign-' + name;
    }

    createEl(type: any, attrs: any) {
        const el = svgCreate(type);
        svgAttr(el, attrs);
        return el;
    }
}

(ToolbarOriginAlign as any).$inject = [
    'config',
    'injector',
    'eventBus',
    'commandStack',
    'canvas',
    'modeling'
];

export default {
    __init__: ['toolbarOriginAlign'],
    toolbarOriginAlign: ['type', ToolbarOriginAlign]
};
