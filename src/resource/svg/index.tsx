import * as React from 'react';
import {Icon} from 'rsuite';
import './index.scss'

export const {default: Ztree} = require('./ztree.svg');
export const {default: ztreeChildAdd} = require('./ztreeChildAdd.svg');
export const {default: ztreePeerAdd} = require('./ztreePeerAdd.svg');
export const {default: rename} = require('./rename.svg');
export const {default: menuGroup} = require('./menuGroup.svg');
export const {default: menu} = require('./menu.svg');
export const {default: redata} = require('./redata.svg');

export class Svg {

    public static ztree = <Icon className='fill-color' icon={Ztree}/>;
    public static ztreeChildAdd = <Icon className='fill-color' icon={ztreeChildAdd}/>;
    public static ztreePeerAdd = <Icon className='fill-color' icon={ztreePeerAdd}/>;
    public static rename = <Icon className='fill-color' icon={rename}/>;
    public static menuGroup = <Icon className='fill-color' icon={menuGroup}/>;
    public static menu = <Icon className='fill-color' icon={menu}/>;
    public static redata = <Icon className='fill-color' icon={redata}/>;

    public static RedataCompon = (props: any) => <Icon className='fill-color' {...props} icon={redata}/>;
}


