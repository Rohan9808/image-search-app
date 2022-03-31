import React, { useState, Suspense, useEffect } from 'react';
import { InputGroup } from 'react-bootstrap';
import {FormControl} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import * as constants from './getConstants';
import {Spinner} from 'react-bootstrap'; 
import axios from 'axios';

const PaginatedItems =  React.lazy(() => {
    return import('./PaginatedItems')
});


const PhotoGallery = () => {

    const query = window.localStorage.getItem('searchQuery');
    const [searchQuery, setSearchQuery] = useState(query);
    const [images, setImage] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const searchImageHandler = (e) => {
        e.preventDefault();
        fetchImages();    
    }

    const fetchImages = () => {
        const url = `https://api.unsplash.com/search/photos?page=2&query=${searchQuery}&client_id=${constants.ACCESS_KEY}`;
        axios.get(url).then(response => {
            window.localStorage.setItem('searchQuery', searchQuery);
            setImage(response.data.results)});
    } 

    return (
        <React.Fragment>
            <h1 className="title">IMAGE GALLERY</h1>
            <form className="container" onSubmit={searchImageHandler}>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Enter any keyword to search Image"
                    aria-label="Enter any keyword to search Image"
                    aria-describedby="basic-addon2"
                    size="lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="success" id="button-addon2">
                    Button
                    </Button>
                </InputGroup>
            </form>
            
            <Suspense fallback={
                <div className="spinnerClass"><Spinner animation="grow" variant="primary" role="status"/></div>}>
                    <PaginatedItems itemsPerPage={4} images={images} />
                </Suspense>
        </React.Fragment>
    )
}

export default PhotoGallery;