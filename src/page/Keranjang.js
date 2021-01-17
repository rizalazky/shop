import React,{useState,useEffect} from 'react'
import './keranjang.css'
import {auth,db} from '../config/Firebase'
import Navbar from '../components/navbar/Navbar'
import ItemKeranjang from '../components/itemKeranjang'
import {useParams} from 'react-router-dom'

const Keranjang=()=>{
    let {id}=useParams()

    const [user,setUser]=useState()
    const [keranjang,setKeranjang]=useState([])
    const [total,setTotal]=useState(0)


    useEffect(()=>{
        auth.onAuthStateChanged((res)=>{
            setUser(res)
        })
        db.collection('transaksi').doc(id).collection('keranjang').onSnapshot(snapshot=>{
            setKeranjang(snapshot.docs.map(doc=>doc.data()))
        })
    },[id])

    const logout=()=>{
        auth.signOut()
        setUser(null)
    }

    const countTotal=(value,id)=>{
        let t=0;
        let dataBaru=keranjang
        for(let i=0;i<dataBaru.length;i++){
            if(dataBaru[i].kodeBarang === id){
                dataBaru[i].jumlahTransaksi=value
            }
            t+=dataBaru[i].jumlahTransaksi*dataBaru[i].harga
        }
        setTotal(t)
        setKeranjang(dataBaru)
        
    }

    return(
        <div>
            <Navbar user={user} logout={logout} keranjang={keranjang}/>
            <div className='keranjang-container'>
                <ul>
                    {
                        keranjang.map(ker=>{
                            return(
                                <ItemKeranjang ker={ker} countTotal={countTotal} key={ker.kodeBarang}/>
                            )
                        })
                    }
                </ul>
                <div className='checkout-container'>
                    <div>
                        <p>Total Harga</p>
                        <p>Rp. {total}</p>
                    </div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    )
}




export default Keranjang