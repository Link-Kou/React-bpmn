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
export const {default: greaterThanSign} = require('./greaterThanSign.svg');
export const {default: greaterThanOrEqualToSign} = require('./greaterThanOrEqualToSign.svg');
export const {default: lessThanOrEqualToSign} = require('./lessThanOrEqualToSign.svg');
export const {default: lessThanSign} = require('./lessThanSign.svg');
export const {default: select} = require('./select.svg');

export class SvgIcons {
    public static select = select;
    public static ztree = Ztree;
}

export class Svg {

    public static ztree = <Icon className='fill-color' icon={Ztree}/>;
    public static ztreeChildAdd = <Icon className='fill-color' icon={ztreeChildAdd}/>;
    public static ztreePeerAdd = <Icon className='fill-color' icon={ztreePeerAdd}/>;
    public static rename = <Icon className='fill-color' icon={rename}/>;
    public static menuGroup = <Icon className='fill-color' icon={menuGroup}/>;
    public static menu = <Icon className='fill-color' icon={menu}/>;
    public static redata = <Icon className='fill-color' icon={redata}/>;
    public static GreaterThanSign = (props: any) => <Icon className='app-rs-icon-8' icon={greaterThanSign}/>;
    public static GreaterThanOrEqualToSign = (props: any) => <Icon className='app-rs-icon-8'
                                                                   icon={greaterThanOrEqualToSign}/>;
    public static LessThanSign = (props: any) => <Icon className='app-rs-icon-8'
                                                       {...props}
                                                       icon={lessThanSign}/>;
    public static LessThanOrEqualToSign = (props: any) => <Icon className='app-rs-icon-8'
                                                                {...props}
                                                                icon={lessThanOrEqualToSign}/>;
    public static RedataCompon = (props: any) => <Icon className='fill-color' {...props} icon={redata}/>;

    public static Select = (props: any) => <Icon className='app-rs-icon-5' {...props} icon={select}/>;
}


