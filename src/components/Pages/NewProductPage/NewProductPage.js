import { useContext, useState } from 'react';
import Layout from '../../Layouts/Layout';
import { useNavigate } from 'react-router-dom';
import './NewProductPage.css'
import { MovieContext } from '../../../contexts/MovieContext';
import { Button, Input } from '@chakra-ui/react';

const NewProductPage = () => {
    const { dispatchMovie, initFormData } = useContext(MovieContext);
    const navigate = useNavigate();

    const [ newForm, setNewForm ] = useState(initFormData);

    const titleChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, title: event.target.value}));
    }

    const yearChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, year: +event.target.value}));
    }

    const genreChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, genre: event.target.value}));
    }

    const ratingChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, rating: +event.target.value}));
    }

    const directorChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, director: event.target.value}));
    }

    const writerChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, writer: event.target.value}));
    }

    const castChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, cast: event.target.value}));
    }

    const summaryChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, summary: event.target.value}));
    }

    const imageUrlChangeHandler = (event) => {
        setNewForm(prevState => ({...prevState, imageURL: event.target.value}));
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const newGenres = newForm.genre.split(',').map(item => item.trim());
        const newCast = newForm.cast.split(',').map(item => item.trim());
        dispatchMovie({type: 'NEW_MOVIE', payload: {...newForm, genre: newGenres, cast: newCast}});
        navigate('/product');
    }

    return <Layout>
        <h2 className='heading2'>Add new Movie</h2>
        <form onSubmit={formSubmitHandler} className='newproduct-form'>
        <div className='newproduct-item'>
                <label>Title:</label>
                <div><Input type='text' value={newForm.title} onChange={titleChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Year:</label>
                <div><Input type='number' min={0} value={newForm.year} onChange={yearChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Genre:</label>
                <div><Input type='text' value={newForm.genre} onChange={genreChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Rating:</label>
                <div><Input type='number' min={0} value={newForm.rating} onChange={ratingChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Director:</label>
                <div><Input type='text' value={newForm.director} onChange={directorChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Writer:</label>
                <div><Input type='text' value={newForm.writer} onChange={writerChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Cast:</label>
                <div><Input type='text' value={newForm.cast} onChange={castChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Summary:</label>
                <div><Input type='text' value={newForm.summary} onChange={summaryChangeHandler} required={true} maxLength={'150'} className='newproduct-input'/></div>
            </div>

            <div className='newproduct-item'>
                <label>Image URL:</label>
                <div><Input type='text' value={newForm.imageURL} onChange={imageUrlChangeHandler} required={true} className='newproduct-input'/></div>
            </div>

            <div>
            <Button type='submit' backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>Add Movie</Button>
            </div>

        </form>
    </Layout>
}

export default NewProductPage;