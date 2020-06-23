import * as React from 'react';
import {Icon} from 'rsuite';
import './index.scss'

export const {default: menu} = require('./menu.svg');

export class Svg {
    public static menu = <Icon className='fill-color' icon={menu}/>;
}


