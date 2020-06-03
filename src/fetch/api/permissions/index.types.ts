export interface IRole {
    id: string
    /**
     * 角色名称
     */
    title: string
    /**
     * 权限数量
     */
    numberPermit: string
    /**
     * 人数
     */
    numberUser: string
    /**
     * 是否禁用 0:不禁用 1:禁用
     */
    isDisable: number
    /**
     * 创建时间
     */
    createtime: string
    updatedtime: string
}


export interface IRoleMenus {
    id: string
    /**
     * 角色id
     */
    roleId: string
    /**
     * 菜单id
     */
    menusId: string
    check: number
    /**
     * 创建时间
     */
    createtime: string
    updatedtime: string
}


export interface IMenuTreeNode {
    /**
     * 标题
     */
    title: string
    /**
     * id
     */
    id: string
    /**
     * 类型
     */
    type: string
    /**
     * keyid
     */
    keyId: string

}

export interface IAddMenuTreeNode {
    /**
     * 父id
     */
    parentId: string
    /**
     * 同级上id
     */
    preId: string
}

export interface IReturnTreeData {
    id: string
    title: string
    keyId: string
    parentId: string
    preId: string
    type: string
    createtime: string
    updatedtime: string
}


export interface IAdmin {
    /**
     * 名称
     */
    name: string
    /**
     * 手机
     */
    phone: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 备注
     */
    remarks: Array<string>
    /**
     * 角色
     */
    roles: Array<string>
}
