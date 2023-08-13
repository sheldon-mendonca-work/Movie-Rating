import { useNavigate } from 'react-router-dom';
import './VerticalProductCard.css'

const VerticalProductCard = (props) => {
    const { item } = props;
    const { _id, title, creator, thumbnail } = item;
    const navigate = useNavigate();

    return <div className="verticalCard" onClick={()=>navigate(`/video/${_id}`)}>
        <div className='verticalCard-img-div'>
            <img src={thumbnail} alt={title} className='verticalCard-img'/>
        </div>
        <div className='verticalCard-title'>{title}</div>
        <div className='verticalCard-creator'>{creator}</div>
    </div>
};

export default VerticalProductCard;