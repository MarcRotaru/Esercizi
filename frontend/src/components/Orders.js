import ordini from '../public/ordini.json';
import {OrderContext} from '../orderContext';
import { useContext } from "react";
import './Orders.css';

export default function Orders(){
    const [orderN,setOrderN] = useContext(OrderContext);
    return(
        <div className='ListContainer h-full overflow-y-scroll float-left w-1/5 shadow-xl'>
                {
                    ordini.sort((x,y) => (
                        new Date(y.data_ordine) - new Date(x.data_ordine) 
                        )).map(x => (
                            <div key={x.id} onClick={() => {setOrderN(x.id);} } className={`
                            ${(orderN === x.id) ? 
                                'border-2 border-solid border-[#6d8ce8] rounded-md text-[#4169E1] shadow-inner'
                            : ''} 
                            orderItemList p-6 m-1 shadow-md rounded-md
                            `}> 
                            <div className= 'text-right text-white mb-4'>
                                <span className={`rounded-full px-2 py-1`} style={{'backgroundColor' : colorHandler(x.stato_ordine)}}> {x.stato_ordine} </span>
                            </div>
                                <h1 className='font-bold'> {x.id_eCommerce} </h1>
                                <div className='flex'>
                                    <p className='text-gray-500'> {x.data_ordine} </p>
                                    <p className='text-gray-500 ml-auto'> Nr. prodotti : {x.totale_prodotti} </p>
                                </div>
                            </div>
                    ))
                }
        </div>
    );

    function colorHandler(status){
        switch(status) {
            case 'spedito' : return 'blue';
            case 'attesa'  : return 'orange';
            case 'consegnato' : return 'green'; 
            default: return 'blue'
        }
    }
};

