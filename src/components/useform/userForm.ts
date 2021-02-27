import {useState} from 'react';
import Schema, {Rules} from 'async-validator';

export function UseForm<T extends { [key: string]: any }, K extends keyof T>(
    initialData: T,
    schema?: Rules,
    cl?: (vs: T, setValue: (name: string, value: string) => void) => void
) {
    const [formData, setFormData] = useState<T>(initialData);
    // @ts-ignore
    const [error, setError] = useState<{ [key in keyof T]: string }>({});
    const setValue = (name: string, value: any, isCl = false) => {
        // @ts-ignore
        setFormData(d => {
            if (isCl && cl) {
                cl({...d, [name]: value}, setValue)
            }
            return {...d, [name]: value}
        });
    }
    const setValues = (vs: T) => {
        setFormData(vs)
    }
    //通用组件修改方法
    const onChange = (event: { name: string, value: any }) => {
        setValue(event.name, event.value, true)
    };
    //input组件修改方法
    const onInput = event => {
        setValue(event.target.name, event.target.value, true)
    };
    let validator: Schema
    if (schema) {
        validator = new Schema(schema);
    }
    //验证数据
    const handleSubmit = (fn: (data: T) => void) => {
        return function () {
            if (validator) {
                validator.validate(formData)
                    .then(() => {
                        fn(formData)
                    })
                    .catch(({errors}) => {
                        let ojb: any = {}
                        errors.map(err => {
                            ojb[err.field] = err.message
                        })
                        setError(ojb)
                    });
            } else {
                fn(formData)
            }
        }
    }
    //获取error方法
    const getError = function (name: K) {
        return error[name]
    }
    return {values: formData as T, onChange, onInput, handleSubmit, getError, setValues}
}
