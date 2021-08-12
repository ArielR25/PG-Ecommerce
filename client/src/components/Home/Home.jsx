import './home.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllBooks,getGenders } from '../../Actions/index';
// import CreateProduct from '../CreateProduct/CreateProduct';
import EditProduct from '../EditProduct/EditProduct'

export function Home (props) {

    useEffect(() => {
        // props.getAllBooks()
        props.getGenders()
    },[props]);

    return (
        <div className='home'>
            <EditProduct />
        </div>
    );
};

export default connect(null, { getAllBooks,getGenders } )(Home);