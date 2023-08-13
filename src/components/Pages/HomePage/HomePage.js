import { useContext } from 'react';
import Layout from '../../Layouts/Layout';
import { MovieContext } from '../../../contexts/MovieContext';
import { Button, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import ProductListCard from '../../Card/ProductListCard/ProductListCard';

const HomePage = () => {
    const { movieState, dispatchMovie } = useContext(MovieContext);
    const { movies, search, filterGenre, filterReleaseYear, filterRating } = movieState;
    const navigate = useNavigate();

    const genreList = movies.reduce((acc, {genre}) => acc.indexOf(genre) === -1 ? acc.concat(genre): acc, []);

    const yearList = movies.reduce((acc, {year}) => acc.indexOf(year) === -1 ? acc.concat(year): acc, []);

    const ratingList = movies.reduce((acc, {rating}) => acc.indexOf(rating) === -1 ? acc.concat(rating): acc, []);

    const genreChangeHandler = (event) => {
        dispatchMovie({type: 'CHANGE_GENRE', payload: event.target.value});
    }

    const releaseYearChangeHandler = (event) => {
        dispatchMovie({type: 'CHANGE_RELEASE_YEAR', payload: event.target.value});
    }

    const ratingChangeHandler = (event) => {
        dispatchMovie({type: 'CHANGE_RATING', payload: event.target.value});
    }

    const getData = () => {
        let movieData = movies;

        if(filterGenre !== 'all'){
            movieData = movieData.filter((item) => item.genre.indexOf(filterGenre) !== -1);
        }

        if(filterReleaseYear !== '0'){
            movieData = movieData.filter((item) => item.year === +filterReleaseYear);
        }

        if(filterRating !== '0'){
            movieData = movieData.filter((item) => item.rating === +filterRating);
        }

        if(search.trim().length > 0){
            let s = search.trim().toLowerCase();
            movieData = movieData.filter((item) => (
                item.title.toLowerCase().indexOf(s) !== -1 || item.director.toLowerCase().indexOf(s) !== -1 || item.cast.join(' ').toLowerCase().indexOf(s) !== -1
            ));
        }

        return movieData;
    }

    return <Layout>
        <div className='productspage-header'>
            <div className='productspage-headername'>Movies</div>
            <div>
                <Select defaultValue={filterGenre} onChange = {genreChangeHandler} className = 'productspage-select' w={'10rem'}>                    
                    <option value={'all'}>All Genres</option>
                    {
                        genreList.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <Select defaultValue={filterReleaseYear} onChange = {releaseYearChangeHandler} className = 'productspage-select'>                    
                    <option value='0'>Release Year</option>
                    {
                        yearList.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <Select defaultValue={filterRating} onChange = {ratingChangeHandler} className = 'productspage-select'>                    
                    <option value='0'>Rating</option>
                    {
                        ratingList.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <Button onClick={()=>navigate('/movie/new')} backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>Add a Movie</Button>
            </div>
        </div>
        <div>
            <ProductListCard data={getData()} type='movie' />
        </div>
    </Layout>
}

export default HomePage;