import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../APIServices/posts/postsAPI";

const CreatePost = () => {

    //post mutation
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("El titulo es requerido"),
            description: Yup.string().required("La descripción es requerida"),
        }),
        onSubmit: (values) => {
            const postData ={
                title: values.title,
                description: values.description
            }
            postMutation.mutate(postData)
        },
    });

    const isLoading = postMutation.isPending;
    const isError = postMutation.isError;
    const isSuccess = postMutation.isSuccess;
    const error = postMutation.error;
    const errorMsg = postMutation?.error?.response?.data?.message

    return (
        <div>
            {isLoading && <p>Cargando...</p>}
            {isSuccess && <p>Post creado exitosamente</p>}
            {isError && <p>{errorMsg}</p>}

            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Ingrese el titulo"
                    {...formik.getFieldProps('title')} />
                {formik.touched.title && formik.errors.title && (
                    <span >{formik.errors.title}</span>
                )}
                <input
                    type="text"
                    name="description"
                    placeholder="Ingrese la descripción"
                    {...formik.getFieldProps('description')}
                />
                   {formik.touched.description && formik.errors.description && (
                    <span >{formik.errors.description}</span>
                )}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default CreatePost;