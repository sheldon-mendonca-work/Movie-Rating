import './SearchBar.css';
import { useContext } from "react";
import { CrossIcon2, SearchIcon } from "../../components/Icons";
import { VideoLibraryContext } from '../../contexts/VideoLibraryContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
    const { placeholder } = props;
    const navigate = useNavigate();
    const { videos, dispatchVideos } = useContext(VideoLibraryContext);
    
    const inputChangeHandler = (event) => {
        dispatchVideos({type: 'UPDATE_SEARCH', payload: event.target.value});        
        if(event.target.value.trim().length > 0){
            navigate('/videos')
        }
    }

    const clearHandler = () => {
        dispatchVideos({type: 'UPDATE_SEARCH', payload: ""});
    }

    return <>
        <div className="searchBar">
            <div className="searchInputs">
                
            {videos.search.length === 0 && <SearchIcon className={"searchIcon"} />}
            {videos.search.length > 0 && <CrossIcon2 onClick={clearHandler} className={"searchIcon"} />}
                <input type="text" className="searchInput" value={videos.search} placeholder={placeholder} onChange={inputChangeHandler}/>
            </div>
        </div>
    </>
}

export default SearchBar;
