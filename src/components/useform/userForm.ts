import {useState} from 'react';
import Schema, {Rules} from 'async-validator';

export function UseForm<T extends { [key: string]: any }, K extends keyof T>(initialData: T, schema?: Rules) {
    const [values, setValues] = useState<T>(initialData);
    // @ts-ignore
    const [error, setError] = useState<{ [key in keyof T]: string }>({});
    //通用组件修改方法
    const onChange = (event: { name: string, value: any }) => {
        setValues({...values, [event.name]: event.value});
    };
    //input组件修改方法
    const onInput = event => {
        setValues({...values, [event.target.name]: event.target.value});
    };
    let validator: Schema
    if (schema) {
        validator = new Schema(schema);
    }
    const handleSubmit = (fn: (data: T) => void) => {
        return function () {
            if (validator) {
                validator.validate(values)
                    .then(() => {
                        fn(values)
                    })
                    .catch(({errors}) => {
                        let ojb: any = {}
                        errors.map(err => {
                            ojb[err.field] = err.message
                        })
                        setError(ojb)
                    });
            } else {
                fn(values)
            }
        }
    }
    //获取error方法
    const getError = function (name: K) {
        return error[name]
    }
    return {values: values as T, onChange, onInput, handleSubmit, getError}
}
