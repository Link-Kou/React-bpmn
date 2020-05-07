import * as React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, InputNumber, InputPicker} from 'rsuite';
import {IArrayDatas, IFormValue} from '../../../index.types';
import {utilsObject} from '@utils/index';
import {FormInputPicker} from '@component/formControl';


interface IProps {

    configValueKey?: string

    configLabelKey?: string

    paperValueKey?: string

    paperLabelKey?: string

    formValue: IFormValue

    OutsourcingName?: string

    dataConfigList?: Array<IArrayDatas>

    paperProductList?: Array<IArrayDatas>

    callbackBasePaperChange?(value: any, data: any, callbackForm: () => void): void
}

export const HookRenderMakeModeForm = (props: IProps) => {
    const {formValue} = props
    const {makeMode} = formValue
    const makeModeVie = {
        1: <BuiltIn {...props}/>,
        2: <Outsourcing {...props}/>
    }
    return makeModeVie[makeMode]
}

/**
 * 内制
 */
const BuiltIn = (props: IProps) => {
    const {paperProductList, paperValueKey, paperLabelKey, callbackBasePaperChange} = props

    return (
        <>
            <Col xs={12} sm={12} md={12}>
                <FormGroup>
                    <ControlLabel>关联原纸</ControlLabel>
                    <FormControl
                        style={{width: '100%'}}
                        valueKey={paperValueKey}
                        labelKey={paperLabelKey}
                        name="basePaperId"
                        callbackChange={callbackBasePaperChange}
                        accepter={FormInputPicker}
                        data={paperProductList ?? []}
                        inline={true}
                    />
                </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={12}>
                <FormGroup>
                    <ControlLabel>平方价</ControlLabel>
                    <FormControl name="squarePrice" disabled={true} postfix={'元/m²'} accepter={InputNumber}/>
                </FormGroup>
            </Col>
        </>
    )
}

/**
 * 外协
 */
const Outsourcing = (props: IProps) => {
    const statedatas = [
        {
            value: 1,
            label: '供应商',
            name: 'supplier',
            children: undefined
        }
    ]
    const {dataConfigList, configValueKey, configLabelKey, OutsourcingName} = props
    const findStatedata = statedatas.find(x => x.name === OutsourcingName);
    const find = dataConfigList?.find(x => {
        const b = utilsObject.getKey({
            key: 'value',
            vlKey: configValueKey
        }, x)
        return b === findStatedata?.value;
    });
    return (
        <>
            <Col xs={12} sm={12} md={12}>
                <FormGroup>
                    <ControlLabel>供应商</ControlLabel>
                    <FormControl
                        style={{width: '100%'}}
                        valueKey={configLabelKey}
                        labelKey={configLabelKey}
                        name="supplier"
                        accepter={InputPicker}
                        data={find?.children ?? []}
                    />
                </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={12}>
                <FormGroup>
                    <ControlLabel>平方价</ControlLabel>
                    <FormControl name="squarePrice" postfix={'元/m²'} accepter={InputNumber}/>
                </FormGroup>
            </Col>
        </>
    )
}
