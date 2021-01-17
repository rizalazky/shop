import React,{useEffect, useState} from 'react'
import './style.css'

const ItemKeranjang=({ker,countTotal})=>{
    const [qty,setQty]=useState(ker.jumlahTransaksi)

    const handlePlus=()=>{
        setQty(qty+1)
    }

    const handleMin=()=>{
        if(qty>0){
            setQty(qty-1)
        }
    }

    useEffect(()=>{
        countTotal(qty,ker.kodeBarang)
    },[qty])

    return(
        <li className='item-keranjang'>
            <div className='item-keranjang-container'>
                <img src={ker.gambarUrl} alt={ker.kodeBarang} className='item-keranjang-image'/>
                <div className='item-keranjang-desc'>
                    <p>{ker.namaBarang}</p>
                    <p>{ker.description}</p>
                    <p >Rp. {ker.harga}</p>
                </div>
                <div>
                    <div>
                        <button onClick={handlePlus} className='item-keranjang-plus'>+</button>
                        <input type='text' value={qty} onChange={(e)=>setQty(e.target.value)} className='item-keranjang-qty'/>
                        <button onClick={handleMin} className='item-keranjang-min'>-</button>
                    </div>
                    <p>Rp. {qty*ker.harga}</p>
                </div>
            </div>
        </li>
    )
}

export default ItemKeranjang