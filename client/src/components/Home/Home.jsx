import './home.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllBooks,getGenders } from '../../Actions/index';

export function Home (props) {

    useEffect(() => {
        // props.getAllBooks()
        props.getGenders()
    },[]);

    return (
        <div className='home'>

        </div>
    );
};

export default connect(null, { getAllBooks,getGenders } )(Home);