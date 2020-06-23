import * as React from 'react';
import {Svg} from '@resource/svg';

/**
 * 针对菜单的配置管理
 */
export interface IMenuConfig {
    /**
     * 唯一
     */
    key: string,
    /**
     * 类型
     * NavItem:无子菜单的
     * Dropdown:一级包含子菜单
     * DropdownMenu:包含二级及二级以下包含子菜单
     * DropdownItem:子菜单
     */
    type: INavItem | IDropdown,

}

export interface INavItem {

    type: 'NavItem'

    show?: boolean
    /**
     * 内容
     */
    content: string
    /**
     * 图标
     */
    ico?: string | JSX.Element
    /**
     * 路由
     */
    route: string
}

export interface IDropdown {

    type: 'Dropdown' | 'DropdownMenu'
    /**
     * 自定义头部 针对DropdownMenu与Dropdown
     */
    title: () => any,
    /**
     * 图标
     */
    ico?: string | JSX.Element

    /**
     * 子标签
     */
    items: Array<IDropdownMenu | IDropdownItem>
}

export interface IDropdownMenu extends IDropdown {
    key: string
}

export interface IDropdownItem {
    /**
     * 唯一
     */
    key: string

    type: 'DropdownItem'
    /**
     * 内容
     */
    content?: string,
    /**
     * 图标
     */
    ico?: string | JSX.Element

    /**
     * 路由
     */
    route: string
}

export const MenuConfig: Array<IMenuConfig> = [
    {
        key: 'Flowable',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>Flowable</span>),
            items: [
                {
                    key: 'FlowableIndex',
                    type: 'DropdownItem',
                    content: 'Flowable',
                    ico: Svg.menu,
                    route: '/index/flowable'
                }
            ]
        }
    }
]

/**
 * 默认打开
 */
export const MenuOpenKeysConfig = ['Flowable']
