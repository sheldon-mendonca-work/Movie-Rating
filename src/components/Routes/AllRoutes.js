import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import NewProductPage from "../Pages/NewProductPage/NewProductPage";
import SingleProductPage from "../Pages/SingleProductPage/SingleProductPage";
import WatchListPage from "../Pages/HomePage/WatchListPage";
import StarredPage from "../Pages/HomePage/StarredPage";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/new" element={<NewProductPage />} />
        <Route path="/movie/:movieID" element={<SingleProductPage />} />
        <Route path="/star" element={<StarredPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="*" element={<HomePage />} />
    </Routes>
}

export default AllRoutes;