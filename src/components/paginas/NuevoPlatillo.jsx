import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const NuevoPlatillo = () => {

    //Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    //Hook para redireccionar
    const navigate = useNavigate();


    console.log(firebase);

    //validacion y leer los datos del form 
    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            categoria: '',
            imagen: '',
            descripcion: ''

        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, 'Los platillos deben tener al menos 3 caracteres')
                .required('El nombre dle platillo es obligatorio'),
            precio: Yup.number()
                .min(1, 'Debes agregar un numero')
                .required('El precio es obligatorio'),
            categoria: Yup.string()
                .required('La categoria es obligatorio'),
            descripcion: Yup.string()
                .min(10, 'La descripcion debe ser mas larga')
                .required('La descripcion es obligatoria'),

        }),
        onSubmit: platillo => {
           try {
               platillo.existencia = true;
               firebase.db.collection('productos').add(platillo);
               //redireccionar
               navigate('/menu');
           } catch (error) {
               console.log(error)
           }
        }
    })

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Agregar Nuevo</h1>

            <div className='flex justify-center'>
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="blocl text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null
                        }

                        <div className="mb-4">
                            <label className="blocl text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="$0.00"
                                min="0"

                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                            />
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null
                        }

                        <div className="mb-4">
                            <label className="blocl text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Categoria</label>
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                name="categoria"

                                onBlur={formik.handleBlur}
                                value={formik.values.categoria}
                                onChange={formik.handleChange}
                            >

                                <option value="">-- Seleccione --</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="comida">Comida</option>
                                <option value="cena">Cena</option>
                                <option value="bebida">Bebida</option>
                                <option value="postre">Postre</option>
                                <option value="ensalada">Ensalada</option>
                            </select>
                        </div>

                        {formik.touched.categoria && formik.errors.categoria ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.categoria}</p>
                            </div>
                        ) : null
                        }


                        <div className="mb-4">
                            <label className="blocl text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="imagen"
                                type="file"

                                onBlur={formik.handleBlur}
                                value={formik.values.imagen}
                                onChange={formik.handleChange}
                            />
                        </div>



                        <div className="mb-4">
                            <label className="blocl text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                type="text"
                                placeholder="Descripcion"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>

                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.descripcion}</p>
                            </div>
                        ) : null
                        }


                        <input
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar platillo"
                        />


                    </form>
                </div>
            </div>

        </>
    );
}
export default NuevoPlatillo;