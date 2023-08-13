import { useContext, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import './SingleProductPage.css';
import { MovieContext } from '../../../contexts/MovieContext';
import { Button, Flex } from '@chakra-ui/react';

const SingleProductPage = () => {
    const { movieState, dispatchMovie } = useContext(MovieContext);
    const { movieID } = useParams();
    const navigate = useNavigate();

    let foundProduct = movieState.movies.find(item => item.id === +movieID)
    
    const { starred, addToWatchList } = movieState;
    const isStarred = starred.indexOf(foundProduct.id) !== -1;
    const isWatched = addToWatchList.indexOf(foundProduct.id) !== -1;

    
    useEffect(()=>{
        if(foundProduct === undefined){
            navigate('/');
        }
    }, [foundProduct, navigate])

    const starChangeHandler = (event) => {
        event.stopPropagation();
        dispatchMovie({type: 'CHANGE_STARRED', payload: {id: foundProduct.id, isStarred}});
    }

    const addWatchlistHandler = (event) => {
        event.stopPropagation();
        dispatchMovie({type: 'CHANGE_WATCHLIST', payload: {id: foundProduct.id, isWatched}});
    }

    return <Layout>
        <div className='singleProduct-bg'>
        <div className='singleProduct'>
            <div className='singleProduct-imgDiv'>
                <img src={foundProduct?.imageURL} alt={foundProduct?.title} className='singleProduct-img'/>
            </div>
            <div className='singleProduct-content'>
                <h2 className='heading2'>{foundProduct?.title}</h2>
                <div className='singleProduct-item'>{foundProduct?.summary}</div>
                <div className='singleProduct-item'>Year: {foundProduct?.year}</div>
                <div className='singleProduct-item'>Genre: {foundProduct?.genre.join(', ')}</div>
                <div className='singleProduct-item'>Department: {foundProduct?.department}</div>
                <div className='singleProduct-item'>Director: {foundProduct?.director}</div>
                <div className='singleProduct-item'>Writer: {foundProduct?.writer}</div>
                <div className='singleProduct-item'>Cast: {foundProduct?.cast.join(', ')}</div>
                <Flex justifyContent={'space-between'} w={'100%'}>
                <Button onClick={starChangeHandler} backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>{isStarred ? 'Unstar': 'Star'}</Button>
                <Button onClick={addWatchlistHandler} backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>{isWatched? 'Remove from Watchlist': 'Add to Watchlist'}</Button>
            </Flex>
            </div>
        </div>
        </div>
    </Layout>
}

export default SingleProductPage;