import Login from './Components/Login/Login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import ProtuctedRoute from './Components/ProtuctedRoute/ProtuctedRoute';
import Jobs from './Components/Jobs/Jobs';
import Wrapper from './Components/JobItemDeals/Wrapper';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/Login' element= {<Login/>} />
        <Route element = {<ProtuctedRoute/>}>
          <Route exact path='/' element = {<Home />} />
          <Route exact path='/jobs' element = {<Jobs />} />
          <Route exact path='/jobs/:id' element ={<Wrapper/>}/>
        </Route>
        <Route path='*' element = {<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
