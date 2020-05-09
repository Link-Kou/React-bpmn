import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import TextSpan from '@component/textSpan';
import './index.scss'

interface IProps {
    title?: any
    tooltip?: string
    hideTitle?: boolean
    hideBorderBottom?: boolean
    leftStyle?: React.CSSProperties;
    rightStyle?: React.CSSProperties;
}

export default class HeadPanel extends React.Component<IProps> {


    private _hideTitle(children: any, rightStyle?: React.CSSProperties) {
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xsHidden={true}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end', ...rightStyle}}>
                        {children}
                    </div>
                </Col>
            </Row>
        )
    }

    public render() {
        const {
            leftStyle, rightStyle, title, tooltip, children, hideBorderBottom, hideTitle
        }
            = this.props
        return (
            <div id={'app-headPanel'}
                 style={{
                     padding: 10,
                     margin: '0 10px 0 10px',
                     borderBottom: hideBorderBottom ? '1px solid transparent' : '1px solid #E5E5EA',
                     ...leftStyle
                 }}
            >
                <Grid fluid={true}>
                    <Row>
                        {
                            hideTitle ? this._hideTitle(children, rightStyle) : <>
                                <Col xs={24} sm={9} md={9} lg={8}>
                                    <div style={{
                                        color: '#272c36',
                                        fontSize: 18,
                                        lineHeight: 1.25,
                                        minHeight: 35,
                                        alignItems: 'center',
                                        display: 'flex'
                                    }}>
                                        <TextSpan lineClamp={1} title={tooltip}>{title}</TextSpan>
                                    </div>
                                </Col>
                                <Col xs={16} sm={15} md={15} lg={16} xsHidden={true}>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end', ...rightStyle}}>
                                        {children}
                                    </div>
                                </Col>
                            </>
                        }

                    </Row>
                </Grid>
            </div>
        )
    }
}
