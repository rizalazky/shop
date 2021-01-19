import React,{useState,useEffect} from 'react'
import './keranjang.css'
import {auth,db} from '../config/Firebase'
import Navbar from '../components/navbar/Navbar'
import ItemKeranjang from '../components/itemKeranjang'
import firebase from 'firebase'

const Keranjang=()=>{
    const [id,setId]=useState('')
    const [user,setUser]=useState()
    const [keranjang,setKeranjang]=useState([])
    const [total,setTotal]=useState(0)
    const [barang,setBarang]=useState([])


    useEffect(()=>{
        auth.onAuthStateChanged((res)=>{
            setUser(res)
        })
        
		
        db.collection('barang').onSnapshot(snap=>{
            setBarang(snap.docs.map(doc=>doc.data()))
        })
    },[])

    useEffect(()=>{
        const getTransaksi=async()=>{
            db.collection('transaksi').where('checkout','==',"false").get()
            .then(res=>{
                if(!res.empty){
                    setId(res.docs[0].id)
                    db.collection('transaksi').doc(res.docs[0].id).collection('keranjang').onSnapshot(snapshot=>{
                        
                        setKeranjang(snapshot.docs.map(doc=>doc.data()))
                        
                        let tot=0
                        snapshot.docs.map(k=>{
                            // console.log(k.data().jumlahTransaksi)
                            tot+=k.data().jumlahTransaksi * k.data().harga
                        })
                        setTotal(tot)
                    })
                }
    
            })
        }

        getTransaksi()
    },[])

    const logout=()=>{
        auth.signOut()
        setUser(null)
    }

    const countTotal=(value,id)=>{
        let t=0;
        let dataBaru=keranjang
        
        for(let i=0;i<dataBaru.length;i++){
            if(dataBaru[i].kodeBarang === id){
                for(let j=0;j<barang.length;j++){
                    if(barang[j].kodeBarang === id){
                        if(barang[j].qty >= value){
                            dataBaru[i].jumlahTransaksi=value
                            
                        }else{
                            
                            alert('Maaf stock tidak cukup')
                            console.log(barang[j])
                        }
                    }
                }
            }
            t+=dataBaru[i].jumlahTransaksi*dataBaru[i].harga
        }
        setTotal(t)
        setKeranjang(dataBaru)
    }
    

    const checkOut=()=>{
        db.collection('transaksi').doc(id).set({
            checkout:"true",
            tglCheckout:firebase.firestore.FieldValue.serverTimestamp()
        })
        setKeranjang([])
    }
    return(
        <div>
            <Navbar user={user} logout={logout} keranjang={keranjang}/>
            <div className='keranjang-container'>
                
                <ul>
                    {
                        keranjang.length >0 ?
                        keranjang.map(ker=>{
                            
                            return(
                                <ItemKeranjang ker={ker} countTotal={countTotal} key={ker.kodeBarang}/>
                            )
                        })
                        :
                        (
                            <li>Keranjang Kosong</li>
                        )
                    }
                </ul>
                <div className='checkout-container'>
                    <div>
                        <p>Total Harga</p>
                        <p>Rp. {total}</p>
                    </div>
                    <button onClick={checkOut}>Checkout</button>
                </div>
            </div>
        </div>
    )
}




export default Keranjang