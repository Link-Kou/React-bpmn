import * as React from 'react';
import {Icon} from 'rsuite';

export const {default: Ztree} = require('./ztree.svg');
export const {default: ztreeChildAdd} = require('./ztreeChildAdd.svg');
export const {default: ztreePeerAdd} = require('./ztreePeerAdd.svg');
export const {default: rename} = require('./rename.svg');

export class Svg {
    public static ztree = <Icon className="fill-color"
                                icon={Ztree}/>;
    public static ztreeChildAdd = <Icon className="fill-color"
                                        icon={ztreeChildAdd}/>;
    public static ztreePeerAdd = <Icon className="fill-color"
                                       icon={ztreePeerAdd}/>;
    public static rename = <Icon className="fill-color"
                                       icon={rename}/>;
}


