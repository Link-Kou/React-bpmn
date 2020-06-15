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
        key: '用户管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>用户管理</span>),
            items: [
                {
                    key: '商城会员管理',
                    type: 'DropdownItem',
                    content: '商城会员管理',
                    ico: 'order-form',
                    route: '/index/userCustomer'
                },
                {
                    key: '运营人员管理',
                    type: 'DropdownItem',
                    content: '运营人员管理',
                    ico: 'order-form',
                    route: '/index/userAdmin'
                }
            ]
        }
    },
    {
        key: '订单管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>订单管理</span>),
            items: [
                {
                    key: '纸板订单管理',
                    type: 'DropdownItem',
                    content: '纸板订单管理',
                    ico: 'order-form',
                    route: '/index/orderCardboard'
                },
                {
                    key: '纸板订单管理',
                    type: 'DropdownItem',
                    content: '纸板订单管理',
                    ico: 'order-form',
                    route: '/index/orderdistribute'
                },
                {
                    key: '辅料订单管理',
                    type: 'DropdownItem',
                    content: '辅料订单管理',
                    ico: 'order-form',
                    route: '/index/orderdistribute'
                },
                {
                    key: '报价单管理',
                    type: 'DropdownItem',
                    content: '报价单管理',
                    ico: 'order-form',
                    route: '/index/productQuote'
                }
            ]
        }
    },
    {
        key: '营销管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>营销管理</span>),
            items: [
                /*{
                     key: '纸箱纸板营销',
                     type: 'DropdownMenu',
                     title: () => (<span className={'asdasda'}>纸箱纸板营销</span>),
                     ico: 'order-form',
                     items: [
                         {
                             key: '价格方案',
                             type: 'DropdownItem',
                             content: '价格方案',
                             ico: 'order-form',
                             route: '/index/productOnlineMarketing'
                         },
                         {
                             key: '限时方案',
                             type: 'DropdownItem',
                             content: '限时方案',
                             ico: 'order-form',
                             route: '/index/productOnlineMarketing'
                         },
                         {
                             key: '2-1',
                             type: 'DropdownItem',
                             content: '限量方案',
                             ico: 'order-form',
                             route: '/index/productOnlineMarketing'
                         }
                     ]
                 },*/
                {
                    key: '团购管理',
                    type: 'DropdownItem',
                    content: '团购管理',
                    ico: 'order-form',
                    route: '/index/marketPrice2'
                },
                {
                    key: '价格营销方案',
                    type: 'DropdownItem',
                    content: '价格营销方案',
                    ico: 'order-form',
                    route: '/index/marketPrice'
                },
                {
                    key: '限时营销方案',
                    type: 'DropdownItem',
                    content: '限时营销方案',
                    ico: 'order-form',
                    route: '/index/marketTimeLimit'
                },
                {
                    key: '限量营销方案',
                    type: 'DropdownItem',
                    content: '限量营销方案',
                    ico: 'order-form',
                    route: '/index/marketQuantityLimit'
                },
                {
                    key: '会员等级优惠',
                    type: 'DropdownItem',
                    content: '会员等级优惠',
                    ico: 'order-form',
                    route: '/index/marketQuantityLimit'
                },
                {
                    key: '营业时间方案',
                    type: 'DropdownItem',
                    content: '营业时间方案',
                    ico: 'order-form',
                    route: '/index/marketBuyRest'
                }
            ]
        }
    },
    {
        key: '促销管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>促销管理</span>),
            items: [
                {
                    key: '余额充值送管理',
                    type: 'DropdownItem',
                    content: '余额充值送管理',
                    ico: 'order-form',
                    route: '/index/marketPrice2'
                },
                {
                    key: '优惠券营销方案',
                    type: 'DropdownItem',
                    content: '优惠券营销方案',
                    ico: 'order-form',
                    route: '/index/marketCoupon'
                },
                {
                    key: '新用户促销管理',
                    type: 'DropdownItem',
                    content: '新用户促销管理',
                    ico: 'order-form',
                    route: '/index/marketPrice2'
                },
                {
                    key: '运费管理',
                    type: 'DropdownItem',
                    content: '运费管理方案',
                    ico: 'order-form',
                    route: '/index/marketQuantityLimit'
                }
            ]
        }
    },
    {
        key: '产品管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>产品管理</span>),
            items: [
                {
                    key: '原纸管理',
                    type: 'DropdownItem',
                    content: '原纸管理',
                    ico: 'order-form',
                    route: '/index/productBasePaper'
                },
                {
                    key: '瓦楞管理',
                    type: 'DropdownItem',
                    content: '瓦楞管理',
                    ico: 'order-form',
                    route: '/index/productCorrugated'
                },
                {
                    key: '纸板产品管理',
                    type: 'DropdownItem',
                    content: '纸板产品管理',
                    ico: 'order-form',
                    route: '/index/cardboardList'
                },
                {
                    key: '纸箱产品管理',
                    type: 'DropdownItem',
                    content: '纸箱产品管理',
                    ico: 'order-form',
                    route: '/index/cartonList'
                },
                {
                    key: '辅料产品管理',
                    type: 'DropdownItem',
                    content: '辅料产品管理',
                    ico: 'order-form',
                    route: '/index/product'
                }
            ]
        }
    },
    {
        key: '门户管理',
        type: {
            type: 'Dropdown',
            ico: 'cube',
            title: () => (<span>门户管理</span>),
            items: [
                {
                    key: '产品筛选管理',
                    type: 'DropdownItem',
                    content: '产品筛选管理',
                    ico: 'order-form',
                    route: '/index/typeConfig'
                },
                {
                    key: '轮播图管理',
                    type: 'DropdownItem',
                    content: '轮播图管理',
                    ico: 'order-form',
                    route: '/index/bannerConfig'
                }
            ]
        }
    },
    {
        key: 'reactSplitGrid',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'reactSplitGrid',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/reactSplitGrid'
        }
    },
    {
        key: 'tree',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'tree',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/tree'
        }
    },
    {
        key: 'RoleManage',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'RoleManage',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/roleManage'
        }
    },
    {
        key: 'SqlQuery',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'SqlQuery',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/sqlQuery'
        }
    },
    {
        key: 'Mosaic',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'Mosaic',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/mosaic'
        }
    },
    {
        key: 'ImageManager',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'ImageManager',
            /**
             * 图标
             */
            ico: Svg.ztree,
            route: '/index/imageManager'
        }
    },
    {
        key: 'LongPanel',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'LongPanel',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/longPanel'
        }
    },
    {
        key: 'TreeDnd',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'TreeDnd',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/treeDnd'
        }
    },
    {
        key: 'CodeView',
        type: {
            type: 'NavItem',
            /**
             * 内容
             */
            content: 'CodeView',
            /**
             * 图标
             */
            ico: 'cube',
            route: '/index/codeView'
        }
    }
]

/**
 * 默认打开
 */
export const MenuOpenKeysConfig = ['用户管理', '订单管理', '销售管理', '产品管理', '门户管理']
