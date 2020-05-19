/**
 * 针对菜单的配置管理
 */
import * as React from 'react';

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
    type: 'NavItem' | 'Dropdown' | 'DropdownMenu' | 'DropdownItem',
    /**
     * 是否显示,与权限无关 目前只有针对 NavItem 有效
     */
    show?: boolean,
    /**
     * 内容
     */
    content?: string,
    /**
     * 图标
     */
    ico?: string
    /**
     * 自定义头部 针对DropdownMenu与Dropdown
     */
    title?: any,
    /**
     * 打开的Tab标签属性 针对NavItem与DropdownItem
     */
    openTabs?: {
        key: string,
        title: string,
        route: string
    }
    /**
     * 子标签
     */
    items: Array<IMenuConfig>
}

export const MenuConfig: Array<IMenuConfig> = [
    {
        key: 'XX-3hds',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: '会员管理',
        openTabs: {
            key: 'XX',
            title: '会员管理',
            route: '/index/userManager'
        },
        items: []
    },
    {
        key: '2',
        type: 'Dropdown',
        ico: 'order-form',
        title: () => (<span>订单管理</span>),
        items: [
            {
                key: '2-1',
                type: 'DropdownItem',
                content: '纸板订单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '纸板订单管理',
                    route: '/index/orderCardboard'
                },
                items: []
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                content: '纸箱订单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-2',
                    title: '纸箱订单管理',
                    route: '/index/orderdistribute'
                },
                items: []
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                content: '辅料订单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-2',
                    title: '辅料订单管理',
                    route: '/index/orderdistribute'
                },
                items: []
            }
        ]
    },
    {
        key: '2-112',
        type: 'Dropdown',
        ico: 'order-form',
        title: () => (<span>定单管理</span>),
        items: [
            {
                key: '2-1',
                type: 'DropdownItem',
                content: '纸板订单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '纸板订单管理',
                    route: '/index/orderCardboard'
                },
                items: []
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                content: '纸箱订单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-2',
                    title: '纸箱订单管理',
                    route: '/index/orderdistribute'
                },
                items: []
            }
        ]
    },
    {
        key: 'XX-3xs',
        type: 'Dropdown',
        ico: 'cube',
        title: () => (<span>销售管理</span>),
        items: [
            {
                key: '2-1',
                type: 'DropdownMenu',
                ico: 'comments',
                title: () => (<span className={'asdasda'}>纸箱纸板营销</span>),
                items: [
                    {
                        key: '2-1',
                        type: 'DropdownItem',
                        content: '价格方案',
                        ico: 'order-form',
                        openTabs: {
                            key: '2-1',
                            title: '价格方案',
                            route: '/index/productOnlineMarketing'
                        },
                        items: []
                    },
                    {
                        key: '2-1',
                        type: 'DropdownItem',
                        content: '限时方案',
                        ico: 'order-form',
                        openTabs: {
                            key: '2-1',
                            title: '限时方案',
                            route: '/index/productOnlineMarketing'
                        },
                        items: []
                    },
                    {
                        key: '2-1',
                        type: 'DropdownItem',
                        content: '限量方案',
                        ico: 'order-form',
                        openTabs: {
                            key: '2-1',
                            title: '限量方案',
                            route: '/index/productOnlineMarketing'
                        },
                        items: []
                    }
                ]
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                content: '价格营销方案',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '价格营销方案',
                    route: '/index/productQuote'
                },
                items: []
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                content: '报价单管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '报价单管理',
                    route: '/index/productQuote'
                },
                items: []
            }
        ]
    },
    {
        key: 'XX-3',
        type: 'Dropdown',
        ico: 'cube',
        title: () => (<span>产品管理</span>),
        items: [
            {
                key: '2-1',
                type: 'DropdownItem',
                content: '原纸管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '原纸管理',
                    route: '/index/productBasePaper'
                },
                items: []
            },
            {
                key: '2-2',
                type: 'DropdownItem',
                ico: 'cube',
                content: '瓦楞管理',
                openTabs: {
                    key: '2-2',
                    title: '瓦楞管理',
                    route: '/index/productCorrugated'
                },
                items: []
            },
            {
                key: '2-3',
                type: 'DropdownItem',
                content: '纸板产品管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-4',
                    title: '纸板产品管理',
                    route: '/index/cardboardList'
                },
                items: []
            },
            {
                key: '2-4',
                type: 'DropdownItem',
                content: '纸箱产品管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '纸箱产品管理',
                    route: '/index/cartonList'
                },
                items: []
            },
            {
                key: '2-5',
                type: 'DropdownItem',
                content: '辅料产品管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-5',
                    title: '辅料产品管理',
                    route: '/index/product'
                },
                items: []
            }
        ]
    },
    {
        key: 'xxx-jcbz2',
        type: 'Dropdown',
        ico: 'order-form',
        title: () => (<span>门户管理</span>),
        items: [
            {
                key: '2-1',
                type: 'DropdownItem',
                content: '产品筛选管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '产品分类管理',
                    route: '/index/typeConfig'
                },
                items: []
            },
            {
                key: '2-1',
                type: 'DropdownItem',
                content: '轮播图管理',
                ico: 'order-form',
                openTabs: {
                    key: '2-1',
                    title: '产品分类管理',
                    route: '/index/bannerConfig'
                },
                items: []
            }
        ]
    },
    {
        key: 'XX-3',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'reactSplitGrid',
        openTabs: {
            key: 'XX',
            title:
                'reactSplitGrid',
            route:
                '/index/reactSplitGrid'
        },
        items: []
    },
    {
        key: 'XX-3',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'SqlQuery',
        openTabs: {
            key: 'XX',
            title:
                'SqlQuery',
            route:
                '/index/sqlQuery'
        },
        items: []
    },
    {
        key: 'XX-34',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'Mosaic',
        openTabs: {
            key: 'XX',
            title: 'Mosaic',
            route: '/index/mosaic'
        },
        items: []
    },
    {
        key: 'XX-3',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'ImageManager',
        openTabs: {
            key: 'XX',
            title:
                'ImageManager',
            route:
                '/index/imageManager'
        },
        items: []
    },
    {
        key: 'XX-3',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'LongPanel',
        openTabs: {
            key: 'XX',
            title: 'LongPanel',
            route: '/index/longPanel'
        },
        items: []
    },
    {
        key: 'XX-4',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'TreeDnd',
        openTabs: {
            key: 'XX',
            title: 'TreeDnd',
            route: '/index/treeDnd'
        },
        items: []
    },
    {
        key: 'XX-4dddfd',
        type: 'NavItem',
        show: true,
        ico: 'cube',
        content: 'CodeView',
        openTabs: {
            key: 'XX',
            title: 'CodeView',
            route: '/index/codeView'
        },
        items: []
    },
    {
        key: '3',
        type: 'Dropdown',
        ico: 'cube',
        title: () => (<span>商品管理</span>),
        items: [
            {
                key: '3-1',
                type: 'DropdownItem',
                content: '全部商品管理',
                ico: 'cubes',
                openTabs: {
                    key: '3-1',
                    title: '全部商品管理',
                    route: '/index/product'
                },
                items: []
            },
            {
                key: '3-2',
                type: 'DropdownItem',
                content: '商品上下架审核',
                ico: 'linode',
                openTabs: {
                    key: '3-2',
                    title: '商品上下架审核',
                    route: '/index/productapply'
                },
                items: []
            },
            {
                key: '3-3',
                type: 'DropdownItem',
                content: '价格方案管理',
                ico: 'tag',
                openTabs: {
                    key: '3-3',
                    title: '价格方案管理',
                    route: '/index/marketprice'
                },
                items: []
            },
            {
                key: '3-4',
                type: 'DropdownItem',
                content: '价格方案审核',
                ico: 'tag-authorize',
                openTabs: {
                    key: '3-4',
                    title: '价格方案审核',
                    route: '/index/marketpriceapply'
                },
                items: []
            },
            {
                key: '3-5',
                type: 'NavItem',
                show: false,
                ico: 'dashboard',
                content: '价格方案详情',
                openTabs: {
                    key: '3-5',
                    title: '价格方案详情',
                    route: '/index/marketpriceplandetail'
                },
                items: []
            }
        ]
    },
    {
        key: '4',
        type: 'Dropdown',
        ico: 'dashboard',
        title: () => (<span>合作方营销管理</span>),
        items: [
            {
                key: '4-1',
                type: 'DropdownItem',
                content: '优惠活动公告管理',
                ico: 'public-opinion',
                openTabs: {
                    key: '4-1',
                    title: '优惠活动公告管理',
                    route: '/index/marketingad'
                },
                items: []
            },
            {
                key: '4-1-1',
                type: 'DropdownItem',
                content: '客户群组管理',
                ico: 'peoples',
                openTabs: {
                    key: '4-1-1',
                    title: '客户群组管理',
                    route: '/index/clientgroup'
                },
                items: []
            }, {
                key: '4-1-2',
                type: 'DropdownItem',
                content: '合作方红包营销',
                ico: 'credit-card-alt',
                openTabs: {
                    key: '4-1-2',
                    title: '合作方红包营销',
                    route: '/index/redenvelopeindex'
                },
                items: []
            },
            {
                key: '4-3',
                type: 'DropdownMenu',
                ico: 'comments',
                title: () => (<span className={'asdasda'}>合作方客户管理</span>),
                items: [
                    {
                        key: '4-3-1',
                        type: 'DropdownItem',
                        content: '合作方客户管理',
                        ico: 'people-group',
                        openTabs: {
                            key: '4-3-1',
                            title: '合作方客户管理',
                            route: '/index/partnerclient'
                        },
                        items: []
                    },
                    {
                        key: '4-3-2',
                        type: 'DropdownItem',
                        content: '合作方客户地址管理',
                        ico: 'people-group',
                        openTabs: {
                            key: '4-3-2',
                            title: '合作方客户地址管理',
                            route: '/index/partnerclientaddress'
                        },
                        items: []
                    }
                ]
            },
            {
                key: '4-2',
                type: 'DropdownMenu',
                ico: 'comments',
                title: () => (<span className={'asdasda'}>合作方短信营销</span>),
                items: [
                    {
                        key: '4-2-1',
                        type: 'DropdownItem',
                        content: '合作方短信模版管理',
                        ico: 'comment',
                        openTabs: {
                            key: '4-2-1',
                            title: '合作方短信模版管理',
                            route: '/index/smstemplatemanage'
                        },
                        items: []
                    }, {
                        key: '4-2-2',
                        type: 'DropdownItem',
                        content: '合作方短信营销',
                        ico: 'commenting',
                        openTabs: {
                            key: '4-2-2',
                            title: '合作方短信营销',
                            route: '/index/smsadministration'
                        },
                        items: []
                    }
                ]
            }
        ]
    },
    {
        key: '5',
        type: 'Dropdown',
        ico: 'volume-control-phone',
        title: () => (<span className={'asdasda'}>平台营销管理</span>),
        items: [
            {
                key: '5-1',
                type: 'DropdownItem',
                content: '用户群组管理',
                ico: 'peoples',
                openTabs: {
                    key: '5-1',
                    title: '用户群组管理',
                    route: '/index/platformusergroupmanage'
                },
                items: []
            },
            {
                key: '5-2',
                type: 'DropdownMenu',
                ico: 'comments',
                title: () => (<span className={'asdasda'}>平台短信营销</span>),
                items: [
                    {
                        key: '5-2-1',
                        type: 'DropdownItem',
                        content: '平台短信模版管理',
                        ico: 'comment',
                        openTabs: {
                            key: '5-2-1',
                            title: '平台短信模版管理',
                            route: '/index/platformsmstemplatemanage'
                        },
                        items: []
                    }, {
                        key: '5-2-2',
                        type: 'DropdownItem',
                        content: '平台短信营销',
                        ico: 'commenting',
                        openTabs: {
                            key: '5-2-2',
                            title: '平台短信营销',
                            route: '/index/platformsmsadministration'
                        },
                        items: []
                    }
                ]
            }
        ]
    },
    {
        key: '6',
        type: 'Dropdown',
        ico: 'user-circle-o',
        title: () => (<span>用户管理</span>),
        items: [
            {
                key: '6-1',
                type: 'DropdownItem',
                content: '用户管理',
                ico: 'avatar',
                openTabs: {
                    key: '6-1',
                    title: '用户管理',
                    route: '/index/Factorymanagement'
                },
                items: []
            },
            {
                key: '6-2',
                type: 'DropdownItem',
                content: '用户认证审核',
                ico: 'character-authorize',
                openTabs: {
                    key: '6-2',
                    title: '用户认证审核',
                    route: '/index/Factoryaudit'
                },
                items: []
            },
            {
                key: '6-3',
                type: 'DropdownItem',
                content: '合作方管理',
                ico: 'group',
                openTabs: {
                    key: '6-3',
                    title: '合作方管理',
                    route: '/index/partnermanage'
                },
                items: []
            }
        ]
    },
    {
        key: '7',
        type: 'Dropdown',
        ico: 'flow',
        title: () => (<span>运营管理</span>),
        items: [
            {
                key: '7-2',
                type: 'DropdownItem',
                content: '余额管理',
                ico: 'cc-visa',
                openTabs: {
                    key: '7-2',
                    title: '余额管理',
                    route: '/index/balanceindex'
                },
                items: []
            }, {
                key: '7-2-1',
                type: 'NavItem',
                show: false,
                ico: 'money',
                content: '余额详情',
                openTabs: {
                    key: '7-2-1',
                    title: '余额详情',
                    route: '/index/balancedetails'
                },
                items: []
            },
            {
                key: '7-3',
                type: 'DropdownItem',
                content: '账期管理',
                ico: 'leanpub',
                openTabs:
                    {
                        key: '7-3',
                        title:
                            '账期管理',
                        route:
                            '/index/billdeadlineindex'
                    },
                items: []
            },
            {
                key: '7-4',
                type: 'DropdownItem',
                content: '开票管理',
                ico: 'wpforms',
                openTabs: {
                    key: '7-4',
                    title:
                        '开票管理',
                    route:
                        '/index/billingindex'
                },
                items: []
            }
        ]
    },
    {
        key: '10',
        type: 'Dropdown',
        ico: 'leanpub',
        title: () => (<span>销售管理</span>),
        items: [
            {
                key: '10-1',
                type: 'DropdownItem',
                content: '业务员管理',
                ico: 'drupal',
                openTabs: {
                    key: '10-1',
                    title: '业务员管理',
                    route: '/index/salesmanmanagement'
                },
                items: []
            }
        ]
    },
    {
        key: '8',
        type: 'Dropdown',
        ico: 'project',
        title: () => (<span>组织架构管理</span>),
        items: [
            {
                key: '8-1',
                type: 'DropdownItem',
                content: '南京智渠云组织架构',
                ico: 'project',
                openTabs: {
                    key: '8-1',
                    title: '南京智渠云组织架构',
                    route: '/index/platformorganization'
                },
                items: []
            },
            {
                key: '8-2',
                type: 'DropdownItem',
                content: '合作方组织架构',
                ico: 'project',
                openTabs: {
                    key: '8-2',
                    title: '合作方组织架构',
                    route: '/index/architecture'
                },
                items: []
            },
            {
                key: '8-3',
                type: 'DropdownItem',
                content: '角色管理',
                ico: 'avatar',
                openTabs: {
                    key: '8-3',
                    title: '角色管理',
                    route: '/index/organizationrole'
                },
                items: []
            }
        ]
    },
    {
        key: '9',
        type: 'Dropdown',
        ico: 'gears2',
        title: () => (<span>基础设置</span>),
        items: [
            {
                key: '9-1',
                type: 'DropdownItem',
                content: '平台基础管理',
                ico: 'gear2',
                openTabs: {
                    key: '9-1',
                    title: '平台基础管理',
                    route: '/index/platformconfig'
                },
                items: []
            },
            {
                key: '9-2',
                type: 'DropdownItem',
                content: '合作方基础配置',
                ico: 'gear2',
                openTabs: {
                    key: '9-2',
                    title: '合作方基础配置',
                    route: '/index/platformcofigindex'
                },
                items: []
            },
            {
                key: '9-3',
                type: 'DropdownItem',
                content: '平台权限管理',
                ico: 'setting',
                openTabs: {
                    key: '9-3',
                    title: '平台权限管理',
                    route: '/index/devauthindex'
                },
                items: []
            },
            {
                key: '9-4',
                type: 'DropdownItem',
                content: '广告位管理',
                ico: 'speaker',
                openTabs: {
                    key: '9-4',
                    title: '广告位管理',
                    route: '/index/marketadindex'
                },
                items: []
            }
        ]
    },
    {
        key: 'X',
        type: 'NavItem',
        show: false,
        ico: 'dashboard',
        content: '用户信息管理',
        openTabs: {
            key: 'X',
            title:
                '用户信息管理',
            route:
                '/index/internaluserinfo'
        },
        items: []
    },
    {
        key: 'XX',
        type: 'NavItem',
        show: false,
        ico: 'dashboard',
        content: '首页',
        openTabs: {
            key: 'XX',
            title:
                '首页',
            route:
                '/index/main'
        },
        items: []
    }
]

/**
 * 默认打开
 */
export const MenuOpenKeysConfig = ['2', '3', 'XX-3', 'xxx-jcbz2', 'XX-3xs', '4', '4-2', '5', '5-2', '6', '7', '8', '9', 'X', '10']
