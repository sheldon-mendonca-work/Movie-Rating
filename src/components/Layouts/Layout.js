import './Layout.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LeftArrowIcon } from '../Icons';
import { Input } from '@chakra-ui/react';
import { useContext } from 'react';
import { MovieContext } from '../../contexts/MovieContext';

const Layout = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dispatchMovie } = useContext(MovieContext);

    const searchInputHandler = (event) => {
        const s = event.target.value;
        dispatchMovie({type: 'CHANGE_SEARCH', payload: event.target.value});
        
        if(s.trim().length > 0){
            navigate('/');
        }
    }
    
    const locationType = location.pathname.split('/')[1];
    return <div className='layout'>
        <header className='layoutHeading'>
            <div>
            { locationType !== "" && <LeftArrowIcon className="layoutHeading-svg" onClick={()=>navigate(-1)} />}
            <h1 className='heading1' onClick={()=>navigate('/')}>IMDB</h1>
            </div>
            <div>
                <Input placeholder='Search movies by title, cast or director'  _placeholder={{ opacity: 1, color: 'gray.500' }} backgroundColor={'white'} color='gray' w={'30rem'} onChange={searchInputHandler}/>
            </div>
            <div className='heading-navList'>
                <NavLink to='/'>Movies</NavLink>
                <NavLink to='/watchlist'>Watch List</NavLink>
                <NavLink to='/star'>Starred Movies</NavLink>
            </div>
        </header>

        <main>
            {children}
        </main>
    </div>
};

export default Layout;