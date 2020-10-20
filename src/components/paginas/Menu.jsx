import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../UI/Platillo';

const Menu = () => {

    const [platillos, setPlatillos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //consultar la base de datos al cargar
    useEffect(() => {
        const obtenerPlatillos = () => {
            firebase.db.collection('productos').onSnapshot(manejarSnapshot);
        }

        obtenerPlatillos();
    }, []);

    //snapshot nos petmite ultilizar la base de datos en tiempo real de firestone
    function manejarSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setPlatillos(platillos);
        //console.log(platillos);
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Agregar nuevo</h1>

            <Link className=" bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold" to='/nuevo-platillo'>Nuevo</Link>

            {platillos.map(platillo => (
                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ))}
        </>
    );
}
export default Menu;