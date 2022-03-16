import { useContext,useState } from "react";
import { OrderContext } from "../orderContext";
import orders from '../public/ordini.json';
import indirizzi from '../public/indirizzi.json';
import clienti from '../public/clienti.json';
import prodotti from '../public/prodotti.json';
import note from '../public/note.json'

const cronologiaStati = [];
const ordini = orders;

export default function Details() {
    const [orderN] = useContext(OrderContext);
    const indexO = ordini.map(x => x.id).indexOf(orderN);
    const indexI = indirizzi.map(x => x.id).indexOf(orderN);
    const indexC = clienti.map(x => x.id).indexOf(orderN);
    const statiOrdine = cronologiaStati.filter( x => x.id === ordini[indexO].id);
    const [status, setStatus] = useState({value : '', r : 0});

    return (
    <div className="w-full h-screen relative">
        <div className={`p-6 pb-0 w-full float-left h-full ${ orderN ? 'overflow-y-scroll' : ''} pr-10`}>
            <div className="">
                <h1 className="text-3xl mb-4">
                    {orderN ? ` Ordine : ${ordini[indexO].id_eCommerce}` : 'Please Select an Order'}
                </h1>
            </div>
        { orderN ? 
            <div >
                <div className='grid grid-cols-[1.2fr,1fr,0.8fr] w-full text-l my-1 border-b-2
                border-y-2 border-solid border-[#6d8ce8] p-4'>
                    <div className="border-solid border-r-2 p-[1rem] pr-[3rem] 
                    pl-[2rem] border-[#6d8ce8] text-md">
                            <h1 className="text-2xl text-[#4169E1] font-bold">Dati Ordini</h1>
                            <br/>
                            <p><span className='text-gray-500'> Data Ordine:</span>&ensp;
                            { ordini[indexO].data_ordine } </p>
                            <p><span className='text-gray-500'> ID Ecommerce:</span>&ensp;
                            { ordini[indexO].id_eCommerce } </p>
                            <p><span className='text-gray-500'> Ecommerce:</span>&ensp;
                            { ordini[indexO].eCommerce } </p>
                            <p className="font-bold"><span className='text-gray-500 font-normal'> Corriere:</span>&ensp;
                            { ordini[indexO].corriere } </p>
                            <p><span className='text-gray-500'> Valuta:</span>&ensp;
                            { ordini[indexO].valuta } </p>
                            <p><span className='text-gray-500'> Tipo Pagamento:</span>&ensp;
                            { ordini[indexO].tipo_pagamento } </p>
                            <p><span className='text-gray-500'> Totale Sconti:</span>&ensp;
                            { ordini[indexO].totale_sconti } </p>
                            <p><span className='text-gray-500'> Totale Spedizione:</span>&ensp;
                            { ordini[indexO].totale_spedizione } </p>
                            <p><span className='text-gray-500'> Totale Incassato:</span>&ensp;
                            { ordini[indexO].totale_spedizione  +  ordini[indexO].totale_sconti } </p>
                            <p className="underline underline-offset-4 font-bold">
                                <span className='text-gray-500'> Totale Prodotti:</span>&ensp;
                                { ordini[indexO].totale_prodotti } </p>
                    </div>
                    <div className="ml-[2rem] p-[1rem] border-solid border-r-2 pr-[5rem] border-[#6d8ce8]">
                            <h1 className="text-2xl text-[#4169E1] font-bold"> Indirizzo </h1>
                            <br/>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Nome:</span>
                            &ensp;{indirizzi[indexI].nome} </p>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Cognome:</span>
                            &ensp;{indirizzi[indexI].cognome}</p>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Nazione:</span>
                            &ensp;{indirizzi[indexI].nazione} </p>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Indirizzo:</span>
                            &ensp;{indirizzi[indexI].indirizzo} </p>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Indirizzo2:</span>
                            &ensp;{indirizzi[indexI].indirizzo2} </p>
                            <p className="font-bold"><span className='text-gray-500 font-medium'> Telefono:</span>
                            &ensp;{indirizzi[indexI].telefono} </p>
                    </div>
                    <div className="p-[1rem] ml-[2rem]">
                            <h1 className="text-2xl text-[#4169E1] font-bold" > Dati cliente </h1>
                            <br/>
                            <p><span className='text-gray-500'> Nome:</span>&ensp;
                            { clienti[indexC].nome }</p>
                            <p><span className='text-gray-500'> Cognome:</span>&ensp;
                            { clienti[indexC].cognome }</p>
                            <p><span className='text-gray-500'> Sesso:</span>&ensp;
                            { clienti[indexC].sesso }</p>
                            <p><span className='text-gray-500'> Email:</span>&ensp;
                            { clienti[indexC].email}</p>
                    </div>
                </div>

                <div className="border-[#6d8ce8] border-b-2 grid grid-cols-[0.8fr,0.8fr,0.8fr,1.6fr] my-2 py-8">
                    <div className="text-center p-2 border-r-2 border-[#6d8ce8]">
                    <h1 className="text-[#4169E1] font-bold text-xl"> Cambio stato Ordine </h1>
                        <select className="p-2 pr-4 border-2 border-[#4169E1] rounded-full mx-auto my-4"
                        onChange={(e) => setStatus({value : e.target.value, r : status.r})}>
                            <option> attesa </option>
                            <option> spedito </option>
                            <option> consegnato </option>
                        </select>
                        <button className="border-2 font-bold text-[#4169E1] border-[#4169E1]
                        p-3 rounded-full hover:text-white
                    hover:bg-[#4169E1] hover:duration-300 mx-auto" onClick={() => cambioHandler()}> Conferma Cambio </button>
                    </div>
                    <div className="p-2 border-r-2 border-[#6d8ce8]">
                        <h1 className="text-[#4169E1] font-bold text-xl mx-auto text-center"> Note Cliente </h1>
                        <p className="mx-2 p-2"> {note[indexI].nota_cliente}</p>
                    </div>
                    <div className="p-2 border-r-2 border-[#6d8ce8]">
                        <h1 className="text-[#4169E1] font-bold text-xl mx-auto text-center"> Note Operatore </h1>
                        <p className="mx-auto p-2"> {note[indexI].nota_op}</p>
                    </div>
                    <div className="p-2">
                        <h1 className="text-[#4169E1] font-bold text-xl mx-auto text-center pb-1"> Cronologia Stato Ordine </h1>
                        {
                            statiOrdine.map((x,i) => {
                                return(
                                <div key={i} className="inline font-bold text-center">
                                    <p> {`${x.previous_date} : ${x.previous_status}`}&ensp; 
                                         👉&ensp; 
                                    {`${x.changedto_date} : ${x.changedto_status}`} </p>
                                </div>
                            )
                            }) 
                        }
                    </div>

                </div>

                <div className="">
                <div className="grid grid-cols-7 border-solid border-b-2 border-[#6d8ce8] p-8 
                text-[#4169E1] text-xl font-bold">
                    <br/>
                    <h1 className="m-auto">Nome Prodotto</h1>
                    <h1 className="m-auto">Quantita</h1>
                    <h1 className="m-auto">Prezzo</h1>
                    <h1 className="m-auto">Riferimento</h1>
                    <h1 className="m-auto">Skulocation</h1>
                    <h1 className="m-auto">Quantita Rimanente</h1>
                </div>
                    {
                        prodotti.map((x,i) => {
                            return(
                                <div key={i} className="grid grid-cols-7 border-solid 
                                border-b-2 border-[#6d8ce8] shadow-md m-2 text-l pr-2 pl-2">
                                    <img src= {`https://picsum.photos/id/${Math.floor(i * Math.random()+10)}/150/150`} 
                                    className='w-3/4 h-3/4 border m-auto rounded-md' alt=''></img>
                                    <p className="m-auto font-bold"> {x.nome_prodotto} </p>
                                    <p className="m-auto font-bold underline underline-offset-2"> {x.quantita} </p>
                                    <p className="m-auto"> {x.Prezzo}</p>
                                    <p className="m-auto"> {x.riferimento} </p>
                                    <p className="m-auto"> {x.skulocation}</p>
                                    <p className="m-auto"> {x.rimanente}</p>
                                </div>
                            );
                        })
                    }
                </div>
            <div className="sticky bg-[#F7F7F7] py-6 border-l-2 
            border-r-2 border-t-2 rounded-t-3xl drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] 
            bottom-0 flex w-full p-4">
                { ordini[indexO].stato_ordine === 'attesa' ?
                    <div className="grid grid-cols-[1fr,1fr,0.5fr] w-5/6">
                        <div className="m-auto inline">
                            <label className="mx-4 font-bold text-lg">Tracking code</label>
                            <input className="border-2 w-80 border-[#4169E1] rounded-full p-2"/>
                        </div>
                        <div className="m-auto">
                            <label className="mx-2 font-bold text-lg"> Seleziona Scatola </label>
                            <select className="p-2 pr-4 mx-8 border-2 border-[#4169E1] rounded-full" defaultValue={'Test1'}>
                                <option> Test1 </option>
                                <option> Test2 </option>
                                <option> Test3 </option>
                                <option> Test4 </option>
                            </select>
                        </div>
                        <div className="mx-auto">
                        <button className="border-2 font-bold text-[#4169E1] border-[#4169E1]
                        p-3 rounded-full hover:text-white
                    hover:bg-[#4169E1] hover:duration-300 mx-auto"> Conferma Dati </button>
                        </div>
                    </div> 
                : 
                <div className="text-center mx-auto w-5/6">
                    <h1 className="mx-auto p-2 font-bold text-xl"> Tracking e scatola gia inseriti. </h1>
                </div>
                }
                <div className="mx-auto">
                    <button className="border-2 font-bold text-red-500 border-red-500
                    p-3 rounded-full hover:text-white
                    hover:bg-red-500 hover:duration-300"> Chiusura Ordine </button>
                </div>
                </div>

            </div> : <></>
        }
        </div>

    </div>
    );

    function cambioHandler() {
        cronologiaStati.push(
            Object.create(
            {
                id : ordini[indexO].id,
                previous_status : ordini[indexO].stato_ordine,
                previous_date : ordini[indexO].data_ordine,
                changedto_status : status.value,
                changedto_date : new Date().toLocaleDateString('en-GB'),
            })
        );
        ordini[indexO].stato_ordine = status.value;
        setStatus({value : status.value, r : status.r + 1});
    }


}
