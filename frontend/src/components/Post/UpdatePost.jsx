import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { fetchPostAPI } from "../../APIServices/posts/postsAPI";

const UpdatePost = () => {
  const { postId } = useParams();

  const { isError, isLoading, isSuccess, data, error } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPostAPI(postId),
  });

  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: () => {},
  });

  const formik = useFormik({
    initialValues: {
      title: data?.postFound.title || "",
      description: data?.postFound.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El titulo es requerido"),
      description: Yup.string().required("La descripción es requerida"),
    }),
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
      };
      postMutation.mutate(postData);
    },
  });

  return (
    <div>
      <h1>Actualizar post - {data?.postFound.title}</h1>
      <div>
        {/* {isLoading && <p>Cargando...</p>}
        {isSuccess && <p>Post creado exitosamente</p>}
        {isError && <p>{error.message}</p>} */}

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Ingrese el titulo"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <span>{formik.errors.title}</span>
          )}
          <input
            type="text"
            name="description"
            placeholder="Ingrese la descripción"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <span>{formik.errors.description}</span>
          )}
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
