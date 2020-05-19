import * as React from 'react';

import './group.scss'

import {SqlQueryData} from '../sqlPanel'

import SqlToggle from '../sqlToggle';
import SqlTool from '../sqlTool';

interface IProps {
    /**
     * 唯一id
     */
    id: string
    /**
     *
     */
    link?: 'AND' | 'OR'
}

export default class SqlGroup extends React.Component<IProps> {

    public state = {
        toggleShow: true
    }

    public render() {
        const {toggleShow} = this.state
        const {id} = this.props
        return (
            <SqlQueryData.Consumer>
                {
                    (context: any) => (
                        <div className='app-sql-group'>
                            <div className={'app-sql-group-togglesh'}
                                 onClick={() => {
                                     this.setState({
                                         toggleShow: !this.state.toggleShow
                                     })
                                 }}>
                                <svg x="0px" y="0px" viewBox="0 0 492.002 492.002">
                                    <g style={{
                                        transform: toggleShow ? 'rotate(-180deg)' : 'rotate(0deg)',
                                        transformOrigin: '50% 50%',
                                        fill: '#606060'
                                    }}>
                                        <path
                                            d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844    L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124    c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064    c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132    C494.624,356.041,494.624,338.965,484.136,328.473z"/>
                                    </g>
                                </svg>
                            </div>
                            <div className={'app-sql-group-item'}
                                 style={{display: toggleShow ? 'block' : 'none'}}>
                                <SqlTool type={'group'} id={this.props.id}/>
                                <SqlToggle id={id} classname={'app-sql-group-toggle-first'}/>
                                {this.props.children}
                            </div>
                        </div>
                    )
                }
            </SqlQueryData.Consumer>
        )
    }
}

