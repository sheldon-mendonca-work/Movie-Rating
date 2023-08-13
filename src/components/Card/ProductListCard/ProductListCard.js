import { Link } from 'react-router-dom';
import MovieCard from '../ProductCard/MovieCard';
import './ProductListCard.css';

export default function ProductListCard (props){
    const { data, type } = props;
    return <section className="productlist-section">
        <div className="productlist-list">
            { data.length === 0 && <h3>No movies here. Check out <Link to="/" className='productlist-link'>our collection.</Link></h3> }
            {
                data.length > 0 && data.map((item, index) => {
                    if(type === 'movie') { 
                        return <MovieCard key={item?.id ?? index} item={item} /> 
                    }else{ 
                        return <MovieCard key={item?.id ?? index} item={item} /> 
                    }
                })
            }
        </div>
    </section>
}