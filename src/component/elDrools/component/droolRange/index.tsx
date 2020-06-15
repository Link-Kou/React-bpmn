import * as React from 'react';
import {Button, Input, InputGroup} from 'rsuite';
import {Svg} from '@resource/svg';
import MaskedInput from 'react-text-mask'

/**
 *
 * @author lk
 * @date 2020/6/15 15:12
 * @version 1.0
 */
export default class droolRange extends React.Component {

    public state = {
        left: '>',
        leftVaule: ''
    }

    public render() {
        const {left} = this.state
        return (
            <InputGroup>
                <span className={'rs-input-number-btn-group-vertical'}>
                    <Button appearance={'subtle'}
                            className={'rs-input-number-touchspin-up'}
                            onClick={() => {
                                this.setState({
                                    left: '>'
                                })
                            }}>
                        <Svg.GreaterThanSign/>
                    </Button>
                    <Button
                        appearance={'subtle'}
                        className={'rs-input-number-touchspin-down'}
                        onClick={() => {
                            this.setState({
                                left: '>='
                            })
                        }}><Svg.GreaterThanOrEqualToSign/></Button>
                </span>
                <MaskedInput className={'rs-input'}
                             guide={true}
                             showMask={true}
                             keepCharPositions={false}
                             placeholderChar={' '}
                             mask={(e) => {
                                 let limt = 7 - 1
                                 if (left === '>=') {
                                     limt = 6
                                 }
                                 const regExps: Array<any> = e.trim().split('').map((k, i, a) => {
                                     if (k === '>' || k === '=') {
                                         return undefined;
                                     }
                                     return /[1-9]/
                                 }).filter((k, i, a) => k !== undefined).slice(0, limt)
                                 if (left === '>=') {
                                     return (
                                         ['>', '='].concat(regExps)
                                     )
                                 }
                                 return (
                                     ['>'].concat(regExps)
                                 )
                             }}
                             onChange={(e) => {
                                 this.setState({
                                     leftVaule: e.target.value
                                 })
                             }}
                />
                <InputGroup.Addon>~</InputGroup.Addon>
                <Input/>
                <span className={'rs-input-number-btn-group-vertical'}>
                    <Button appearance={'subtle'}
                            className={'rs-input-number-touchspin-up'}
                    ><Svg.LessThanSign/></Button>
                    <Button
                        appearance={'subtle'}
                        className={'rs-input-number-touchspin-down'}
                    ><Svg.LessThanOrEqualToSign/></Button>
                </span>
            </InputGroup>
        )
    }

}
