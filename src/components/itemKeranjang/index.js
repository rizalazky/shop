import React,{useEffect, useState} from 'react'
import './style.css'

const ItemKeranjang=({ker,handleCahngeQty,countTotal})=>{
    // const [qty,setQty]=useState(ker.jumlahTransaksi)

    const handlePlus=()=>{
        // setQty(qty+1)
        countTotal(ker.jumlahTransaksi + 1,ker.kodeBarang)
    }

    const handleMin=()=>{
        if(ker.jumlahTransaksi>1){
            // setQty(qty-1)
            countTotal(ker.jumlahTransaksi - 1,ker.kodeBarang)
        }
    }

    

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
                        <input type='text' value={ker.jumlahTransaksi} 
                            onChange={(e)=>countTotal(e.target.value,ker.kodeBarang)} 
                            className='item-keranjang-qty'/>
                        <button onClick={handleMin} className='item-keranjang-min'>-</button>
                    </div>
                    <p>Rp. {ker.jumlahTransaksi*ker.harga}</p>
                </div>
            </div>
        </li>
    )
}

export default ItemKeranjang