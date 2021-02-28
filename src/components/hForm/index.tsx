import React from "react";
import {useForm} from "react-hook-form";
import {Form} from '@tarojs/components';
import {ObjectSchema} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {DefaultValues} from 'react-hook-form/dist/types/form';

interface HFormProps<T> {
    defaultValues?: DefaultValues<T>,
    children?: any
    onSubmit?: (data: T) => void
    schema?: ObjectSchema<any>
}

export function HForm<T>({defaultValues, children, onSubmit, schema}: HFormProps<T>) {
    const methods = useForm<T>({
        defaultValues: defaultValues,
        resolver: schema ? yupResolver(schema) : undefined
    });
    const {handleSubmit} = methods;

    return (
        <Form onSubmit={() =>
            // @ts-ignore
            handleSubmit(onSubmit)()}
        >
            {Array.isArray(children)
                ? children.map(child => {
                    return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                                ...child.props,
                                control: methods.control,
                                errors: methods.errors,
                                key: child.props.name
                            }
                        })
                        : child;
                })
                : children}
        </Form>
    );
}



