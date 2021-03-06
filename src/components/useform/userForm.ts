import {useState} from 'react';
import Schema from 'async-validator';

const set = (obj, path, value) => {
    if (Object(obj) !== obj) return obj; // When obj is not an object
    // If not yet an array, get the keys from the string-path
    if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
    path.slice(0, -1).reduce((a, c, i) => // Iterate all of them except the last one
            Object(a[c]) === a[c] // Does the key exist and is its value an object?
                // Yes: then follow that path
                ? a[c]
                // No: create the key. Is the next key a potential array-index?
                : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                ? [] // Yes: assign a new array object
                : {}, // No: assign a new plain object
        obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
    return obj; // Return the top-level object to allow chaining
};

export function UseForm<T extends { [key: string]: any }, K extends keyof T>(initialData: T, schema?: any) {
    const [formData, setFormData] = useState<T>(initialData)
    // @ts-ignore
    const [errors, setErrors] = useState<{ [key in K]: string }>({});
    const setValue = (name: K, value: any) => {
        setFormData(d => ({...d, [name]: value}))
    }

    //支持对象数组 例子“a.[2].c”
    const setDeepValue = (name: string, value: any) => {
        setFormData(d => {
            set(d, name, value)
            return d
        })
    }
    //具名input
    const injectInput = (name: K) => {
        return (e) => setValue(name, e.detail.value)
    }
    //具名change
    const injectChange = (name: K) => {
        return (v) => setValue(name, v)
    }

    let validator: Schema
    if (schema) {
        validator = new Schema(schema);
    }
    //验证数据
    const handleSubmit = (fn: (data: T) => void) => {
        return function () {
            if (schema) {
                validator.validate(formData, {}, function (err) {
                    if (err) {
                        let ojb: any = {}
                        err.map(error => {
                            ojb[error.field] = error.message
                        })
                        setErrors(ojb)
                        return
                    }
                    fn(formData)
                })
                // validator.validate(formData)
                //     .then(() => {
                //         fn(formData)
                //     })
                //     .catch((e) => {
                //         let ojb: any = {}
                //         console.log(e)
                //         e.errors.map(err => {
                //             ojb[err.field] = err.message
                //         })
                //         setErrors(ojb)
                //     });
            } else {
                fn(formData)
            }
        }
    }
    return {formData, setValue, errors, handleSubmit, injectInput, injectChange, setDeepValue, setFormData}
}
