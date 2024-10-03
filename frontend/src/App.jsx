import { Box } from '@chakra-ui/react';
import {Route,Routes} from "react-router-dom";
import CreatePage from './pages/CreatePage.jsx';
import HomePage from './pages/HomePage.jsx';
import Navbar from "./components/Navbar.jsx";
import { useProductStore } from './store/product.js';

function App() {

  const {products} = useProductStore();

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/create" element={<CreatePage/>}></Route>
        </Routes>
      </Box>
    </>
  )
}

export default App
