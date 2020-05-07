import * as React from 'react';

import {SqlQueryData} from '../sqlPanel';

import './toggle.scss'

interface IProps {
    id: string,
    link?: 'AND' | 'OR'
}

export default class SqlToggle extends React.Component<IProps> {

    public state = {
        link: this.props.link === undefined ? 'AND' : this.props.link
    }

    public render() {
        const {link} = this.state
        const {id} = this.props
        return (
            <SqlQueryData.Consumer>
                {
                    (context: any) => (
                        <div className='app-sql-group-toggle'>
                            <div className='app-sql-group-toggle-button'>
                                <div
                                    className={`app-sql-group-toggle-buttonItem left ${link === 'AND' ? 'select' : ''}`}
                                    onClick={() => {
                                        this.setState({
                                            link: 'AND'
                                        }, () => {
                                            context.onToggleLink(id)
                                        })
                                    }}>
                                    <span>AND</span>
                                </div>
                                <div
                                    className={`app-sql-group-toggle-buttonItem right ${link === 'OR' ? 'select' : ''}`}
                                    onClick={() => {
                                        this.setState({
                                            link: 'OR'
                                        }, () => {
                                            context.onToggleLink(id)
                                        })
                                    }}>
                                    <span>OR</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </SqlQueryData.Consumer>

        )
    }
}

