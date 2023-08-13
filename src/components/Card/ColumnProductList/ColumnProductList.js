import VerticalProductCard from "../VerticalProductCard/VerticalProductCard";

const ColumnProductList = (props) => {
    const { data } = props;

    return <div>
        { data.length === 0 && <h3>No items on data...</h3> }
        {
            data.length > 0 && data.map((item) => {
                return <VerticalProductCard key={item._id} item={item} /> 
            })
        }
    </div>
};

export default ColumnProductList;