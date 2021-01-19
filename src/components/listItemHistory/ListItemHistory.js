import React,{useEffect, useState} from 'react'
import './style.css'
import {db} from '../../config/Firebase'

const ListItemHistory=({data})=>{
    const [showDetail,setShowDetail]=useState(false)
    const [detail,setDetail]=useState([])
    const [total,setTotal]=useState(0)

    useEffect(()=>{
        const getData=()=>{
            db.collection('transaksi').doc(data.id).collection('keranjang').onSnapshot(snap=>{
                setDetail(snap.docs.map(doc=>doc.data()))
                let t=0
                snap.docs.map(d=>{
                    t+=d.data().harga* d.data().jumlahTransaksi
                })
                setTotal(t)
                console.log(data.data)
            })
        }

        getData()
    },[data.id])

    const deleteHistory=()=>{
        let con=window.confirm('are you sure wanto delete??')
        if(con){
            db.collection('transaksi').doc(data.id).delete().then(res=>{
                alert('Deleted')
            })
        }else{
            alert('Canceled')
        }
    }
    
    return(
        <div className='history-item'>
            <div className='flex-row flex-end'>
                <div>
                    <p>Tanggal transaksi : {new Date(data.data.tglCheckout.seconds).toLocaleDateString('en-GB')}</p>
                    <p>Total transaksi : Rp. {total}</p>
                </div>
                <button onClick={deleteHistory}>delete</button>
            </div>
            <div className='btn-show-detail'>
                <button  onClick={()=>setShowDetail(!showDetail)}>{showDetail ? 'sembunyikan detail' :'tampilkan detail'}</button>
            </div>
            
            {
                showDetail && (
                    <ul>
                        {
                            detail.map(det=>{
                                return(
                                    <li className='flex-row list-detail' key={det.kodeBarang}>
                                        <img src={det.gambarUrl} alt={detail.kodeBarang} className='img-detail'/>
                                        <div>
                                            <p>{det.namaBarang}</p>
                                            <p>Rp. {det.harga} /pcs</p>
                                            <p>Jumlah Transaksi : {det.jumlahTransaksi}</p>
                                            <p>Total : Rp. {det.harga* det.jumlahTransaksi}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            } 
        </div>
    )
}

export default ListItemHistory