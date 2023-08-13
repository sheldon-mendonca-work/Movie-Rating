import { createContext, useEffect, useReducer } from "react";
import { movies } from "../backend/MovieData";

export const MovieContext = createContext();

const initMovieData = movies;
const initFormData = {
    id: "",
    title: '',
    year: 2023,
    genre: [],
    rating: 5,
    director: '',
    writer: '',
    cast: [],
    summary: '',
    imageURL: '',
}

const initMovieState = {
    movies : initMovieData,
    search : "",
    filterGenre: "all",
    filterReleaseYear: "0",
    filterRating: "0",
    starred: [],
    addToWatchList: []
}

const movieReducerFunction = (state, action) => {
    if(action.type === 'INITIALIZE_MOVIES'){
        return { ...state, movies: action.payload }
    }
    

    if(action.type === 'INITIALIZE_STARRED'){
        return { ...state, starred: action.payload }
    }

    if(action.type === 'INITIALIZE_WATCHED'){
        return { ...state, addToWatchList: action.payload }
    }

    if(action.type === 'CHANGE_GENRE'){
        return { ...state, filterGenre: action.payload }
    }

    if(action.type === 'CHANGE_RELEASE_YEAR'){
        return { ...state, filterReleaseYear: action.payload }
    }

    if(action.type === 'CHANGE_RATING'){
        return { ...state, filterRating: action.payload }
    }

    if(action.type === 'CHANGE_SEARCH'){
        return { ...state, search: action.payload }
    }

    if(action.type === 'CHANGE_WATCHLIST'){
        let newWatchList = state.addToWatchList;
        if(action.payload.isWatched){
            newWatchList = newWatchList.filter(item => item !== +action.payload.id)
        }else{
            newWatchList = newWatchList.concat(+action.payload.id)
        }
        localStorage.setItem('MovieWatched', JSON.stringify(newWatchList));
        return { ...state, addToWatchList: newWatchList }
    }

    if(action.type === 'CHANGE_STARRED'){
        let newStarList = state.starred;
        if(action.payload.isStarred){
            newStarList = newStarList.filter(item => item !== +action.payload.id)
        }else{
            newStarList = newStarList.concat(+action.payload.id)
        }
        localStorage.setItem('MovieStar', JSON.stringify(newStarList));
        return { ...state, starred: newStarList }
    }

    if(action.type === 'NEW_MOVIE'){
        const newMovie = {
            ...action.payload,
            id: state.movies.length+1,
        }

        const newMovieList = state.movies.concat(newMovie);
        localStorage.setItem('MovieList', JSON.stringify(newMovieList));
        return { ...state, movies: newMovieList };
    }

    return state;
}

export const MovieProvider = ({children}) => {

    const [ movieState, dispatchMovie ] = useReducer(movieReducerFunction, initMovieState);

    

    useEffect(()=>{
        if(localStorage.getItem('MovieList') === null){
            localStorage.setItem('MovieList', JSON.stringify(initMovieData));
        }else{
            dispatchMovie({type: 'INITIALIZE_MOVIES', payload: JSON.parse(localStorage.getItem('MovieList'))});
        }

        if(localStorage.getItem('MovieStar') === null){
            localStorage.setItem('MovieStar', JSON.stringify([]));
        }else{
            dispatchMovie({type: 'INITIALIZE_STARRED', payload: JSON.parse(localStorage.getItem('MovieStar'))});
        }

        if(localStorage.getItem('MovieWatched') === null){
            localStorage.setItem('MovieWatched', JSON.stringify([]));
        }else{
            dispatchMovie({type: 'INITIALIZE_WATCHED', payload: JSON.parse(localStorage.getItem('MovieWatched'))});
        }
    }, [])

    return <MovieContext.Provider value={{ movieState, dispatchMovie, initFormData }}>
        {children}
    </MovieContext.Provider>
};