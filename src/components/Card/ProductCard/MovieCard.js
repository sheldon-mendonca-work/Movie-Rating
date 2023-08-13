import { useNavigate } from 'react-router-dom';
import './ProductCard.css'
import { Box, Button,  Card, CardBody, CardFooter,  Flex, Heading,  Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { MovieContext } from '../../../contexts/MovieContext';

export default function MovieCard(props){
    const { item } = props;
    const { id, title, summary, imageURL } = item;
    const { movieState, dispatchMovie } = useContext(MovieContext);

    const { starred, addToWatchList } = movieState;
    const isStarred = starred.indexOf(id) !== -1;
    const isWatched = addToWatchList.indexOf(id) !== -1;

    const navigate = useNavigate();

    const starChangeHandler = (event) => {
        event.stopPropagation();
        dispatchMovie({type: 'CHANGE_STARRED', payload: {id, isStarred}});
    }

    const addWatchlistHandler = (event) => {
        event.stopPropagation();
        dispatchMovie({type: 'CHANGE_WATCHLIST', payload: {id, isWatched}});
    }

    return <Card w='24rem' h={'40rem'} cursor='pointer' onClick={()=>navigate(`/movie/${id}`)}>
    <CardBody p={'0'}>
      <Box h={'25rem'}>
        <img src={imageURL} alt={title} className='moviecard-img'/>
      </Box>
      <Stack mt='6' spacing='2'>
        <Heading size='md'>{title}</Heading>
        <Text px={'1rem'}>
          {summary}
        </Text>
      </Stack>
    </CardBody>
    <CardFooter>
      <Flex justifyContent={'space-between'} w={'100%'}>
        <Button onClick={starChangeHandler} backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>{isStarred ? 'Unstar': 'Star'}</Button>
        <Button onClick={addWatchlistHandler} backgroundColor={'#333'} _hover={{bg:'#777'}} color={'white'}>{isWatched? 'Remove from Watchlist': 'Add to Watchlist'}</Button>
      </Flex>
    </CardFooter>
  </Card>
}
