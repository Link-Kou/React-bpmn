import * as React from 'react';

import './panel.scss'

export const SqlQueryData: React.Context<any> = React.createContext('SqlQueryData');

interface IProps {
    data: any,

    onAdd(id: string, type: string, addtochildren: boolean): void

    onDelete(id: string): void

    onToggleLink(id: string, type: 'AND' | 'OR'): void

    onExtend(id: string, extendNode: any, refresh?: boolean): void
}

export default class SqlPanel extends React.Component<IProps> {

    public state = {
        id: 1,
        toggleShow: false
    }


    public render() {
        const {data, onAdd, onDelete, onToggleLink, onExtend} = this.props
        return (
            <SqlQueryData.Provider value={{
                data: data,
                onAdd: onAdd,
                onDelete: onDelete,
                onToggleLink: onToggleLink,
                onExtend: onExtend
            }}>
                <div className='app-sql-panel'>
                    {this.props.children}
                </div>
            </SqlQueryData.Provider>

        )
    }
}

