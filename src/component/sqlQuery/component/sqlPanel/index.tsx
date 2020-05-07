import * as React from 'react';

import './panel.scss'

export const SqlQueryData: React.Context<any> = React.createContext('SqlQueryData');

interface IProps {
    data: any,

    onAdd(id: string, type: string, addtochildren: boolean): void

    onDelete(id: string): void

    onToggleLink(id: string): void

    onExtend(id: string, extendNode: any): void
}

export default class SqlPanel extends React.Component<IProps> {

    public state = {
        id: 1,
        toggleShow: false
    }


    public render() {

        return (
            <SqlQueryData.Provider value={{
                data: this.props.data,
                onAdd: this.props.onAdd,
                onDelete: this.props.onDelete,
                onToggleLink: this.props.onToggleLink,
                onExtend: this.props.onExtend
            }}>
                <div className='app-sql-panel'>
                    {this.props.children}
                </div>
            </SqlQueryData.Provider>

        )
    }
}

