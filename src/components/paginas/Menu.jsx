import React from 'react';
import { Link } from 'react-router-dom';
const Menu = () => {
    return (
        <>
           <h1 className="text-3xl font-light mb-4">Agregar nuevo</h1>

            <Link className=" bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold" exact to='/nuevo-platillo'>Nuevo</Link>
        </>
    );
}
export default Menu;