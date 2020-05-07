import * as React from 'react';
import {ControlLabel, FormControl, FormGroup, Radio, RadioGroup} from 'rsuite';
import {utilsObject} from '@utils/index';
import TextRequired from '@component/textRequired';
import {IArrayDatas} from '../../../index.types';

interface IProps {
    dataConfigList?: Array<IArrayDatas>
    /**
     *
     */
    valueKey?: string

    labelKey?: string
    /**
     *
     */
    name: string

    [x: string]: any
}

export const HookDataConfigList = (props: IProps) => {
    const statedatas = [
        {
            value: 2,
            label: '瓦楞类型',
            name: 'type',
            children: undefined
        }
    ]
    const {dataConfigList, valueKey, name} = props
    const findStatedata = statedatas.find(x => x.name === name);
    const filter = dataConfigList?.find(x => {
        const b = utilsObject.getKey({
            key: 'value',
            vlKey: valueKey
        }, x)
        return b === findStatedata?.value;
    });
    return (
        <FormGroup>
            <TextRequired accepter={ControlLabel}>{findStatedata?.label}</TextRequired>
            <FormControl
                {...props}
                name={findStatedata?.name}
                accepter={RadioGroup}
                inline={true}
            >
                {
                    filter?.children?.map((k, i, a) => {
                        const {_labelKey} = utilsObject.getLabeValuelKey(props, k)
                        return (
                            <Radio value={_labelKey}>
                                {_labelKey}
                            </Radio>
                        )
                    })
                }
            </FormControl>
        </FormGroup>
    )
}
