import './App.css';
import './components/Orders'
import Orders from './components/Orders';
import {OrderContext} from './orderContext';
import {useState} from 'react';
import Details from './components/Details';

function App() {

  const [value, setValue] = useState(null);

  return (
    <div className='bg-[#F7F7F7] h-screen m-auto flex w-full'>
      <OrderContext.Provider value={[value,setValue]}>
        <Orders></Orders>
        <Details></Details>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
