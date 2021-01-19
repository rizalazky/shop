// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import Post from '../components/post/Post'
import Navbar from '../components/navbar/Navbar'
import Modal from '../components/modal/Modal'
import './Barang.css'
import {auth,db,storage} from '../config/Firebase'
import Loading from '../components/loading/Loading'


function Barang() {
	const [isLoading,setIsLoading]=useState(false)
	const [barang,setBarang]=useState([])
	const [user,setUser]=useState(null)
	const [showModalAdd,setShowModalAdd]=useState(false)
	const [inpSearch,setInpSearch]=useState('')
	const [keranjang,setKeranjang]=useState({})
	// const [isKeranjang,setIsKeranjang]=useState(false)

	useEffect(()=>{
		
		auth.onAuthStateChanged(auth=>{
			if(auth){
				setUser(auth)
			}else{
				setUser(null)
				// history.push('/login')
			}
		})
	},[])



	useEffect(()=>{
		console.log('render')
		db.collection('barang').onSnapshot((snap)=>{
			setBarang(snap.docs.map(doc=>doc.data()))
		})
	        
	},[inpSearch])

	const logout=()=>{
		auth.signOut()
	}

	const deleteBarang=(e)=>{
		let con=window.confirm('Yakin ingin Menghapus data??')

		if(con===true){
			let id=e.target.id
			db.collection('barang').doc(id).delete()
			.then(()=>{
				alert('Berhasil Menghapus Data')
			}).catch(err=>{
				alert('Gagal Menghapus Data')
			})	
		}
		
	}

	const [dataModal,setDataModal]=useState({
		kodeBarang:'',
		nama_barang:'',
		qty:'',
		harga:'',
		description:'',
		gambar:null,
		submitType:''
	})

	const openModal=async(data)=>{
		setDataModal({
			kodeBarang:data.kodeBarang,
			namaBarang:data.namaBarang,
			qty:data.qty,
			harga:data.harga,
			gambar:data.gambarUrl,
			description:data.description,
			submitType:data.submitType
		})
		setShowModalAdd(true)
	}

	const changeDataModal=(event)=>{
		let target=event.target.name
		let value=event.target.value
		if(target==='gambar'){
			value=event.target.files[0]
		}
		setDataModal({...dataModal,[target]:value})
		
		console.log(dataModal)
	}

	const onSubmitModal=()=>{
		setIsLoading(true)
		if(dataModal.submitType === 'update'){
			if(dataModal.gambar.name){
				let photoRef=storage.ref(`images/barang/${dataModal.gambar.name}`)

				photoRef.put(dataModal.gambar)
						.then(()=>{
							storage.ref(`images/barang`)
								.child(dataModal.gambar.name)
								.getDownloadURL()
								.then(url=>{
									db.collection('barang').doc(dataModal.kodeBarang)
										.update({
											kodeBarang:dataModal.kodeBarang,
											namaBarang:dataModal.namaBarang,
											qty:dataModal.qty,
											harga:dataModal.harga,
											gambarUrl:url,
											uploadBy:user.email,
											description:dataModal.description
										}).then(()=>{
											alert('Berhasil Update Data')
											setShowModalAdd(false)
											setIsLoading(false)
										}).catch(err=>{
											console.log(err)
										})
								})
						})	
			}else{
				db.collection('barang').doc(dataModal.kodeBarang)
					.update({
						kodeBarang:dataModal.kodeBarang,
						namaBarang:dataModal.namaBarang,
						qty:dataModal.qty,
						harga:dataModal.harga,
						uploadBy:user.email,
						description:dataModal.description
					}).then(()=>{
						alert('Berhasil Update Data')
						setShowModalAdd(false)
						setIsLoading(false)
					}).catch(err=>{
						console.log(err)
					})
			}
		}else{
			if(dataModal.gambar !=null){
				storage.ref(`images/barang/${dataModal.gambar.name}`).put(dataModal.gambar)
				.then(res=>{
					storage.ref(`images/barang/`)
						.child(dataModal.gambar.name)
						.getDownloadURL()
						.then(url=>{
							db.collection(`barang`).doc(dataModal.kodeBarang).set({
								kodeBarang:dataModal.kodeBarang,
								namaBarang:dataModal.namaBarang,
								qty:dataModal.qty,
								harga:dataModal.harga,
								gambarUrl:url,
								uploadBy:user.email,
								description:dataModal.description
							}).then(()=>{
								alert('Berhasil Menambah Data')
								setShowModalAdd(false)
								setIsLoading(false)
							}).catch(err=>{
								console.log(err)
							})
						})
				})
			}else{
				db.collection(`barang`).doc(dataModal.kodeBarang).set({
						kodeBarang:dataModal.kodeBarang,
						namaBarang:dataModal.namaBarang,
						qty:dataModal.qty,
						harga:dataModal.harga,
						uploadBy:user.email,
						description:dataModal.description
					}).then(()=>{
						alert('Berhasil Menambah Data')
						setShowModalAdd(false)
						setIsLoading(false)
					}).catch(err=>{
						console.log(err)
					})
			}
			
		}
	}

	

	const handleSearch=()=>{
		console.log(inpSearch)
		let data=[]
		// let seacrh=barang.find(dt=>dt.namaBarang====inpSearch)
		for(let i=0;i<barang.length;i++){
			
			var patt = new RegExp(inpSearch.toLocaleLowerCase());
			var res = patt.exec(barang[i].namaBarang.toLowerCase());
			console.log(res)
			if(res !=null){
				data.push(barang[i])
			}
			// setBarang()
		}
		setBarang(data)
		
	}

	

	const insertKeranjang=(data)=>{
		if(data.qty<=0){
			alert('Sold Out')
		}else{
			db.collection('transaksi').where('checkout','==',"false").get()
				.then(res=>{
					
					if(res.empty===true){
						console.log('kosong')
						db.collection('transaksi').add({
							checkout:"false"
						}).then((d)=>{
							data.jumlahTransaksi=1
							db.collection('transaksi').doc(d.id).collection('keranjang').doc(data.kodeBarang)
								.set(data)
						})
					}else{
						let idTransaksi=res.docs[0].id
						console.log(idTransaksi)
						console.log(data.kodeBarang)
						db.collection('transaksi').doc(idTransaksi).collection('keranjang').doc(data.kodeBarang)
							.get().then(ker=>{
								// console.log(ker)
								if(ker.exists===false){
									data.jumlahTransaksi=1
									db.collection('transaksi').doc(idTransaksi)
										.collection('keranjang').doc(data.kodeBarang)
										.set(data)
								}else{
									// if exist
									// console.log(ker.data())
									data.jumlahTransaksi=ker.data().jumlahTransaksi + 1
									db.collection('transaksi').doc(idTransaksi)
										.collection('keranjang').doc(data.kodeBarang)
										.set(data)
								}
							})
					}
					// edit qty barang after add keranjang
					if(data.qty >= 0){
						data.qty=data.qty - 1
					}
					console.log(data)
					db.collection('barang').doc(data.kodeBarang).set(data)
					alert('berhasil memasukan ke keranjang')
					// setKeranjang({
					// 	id:idTransaksi,
					// 	data:[...keranjang.data,data]
					// })
				})
		}
	}

  return (
    <div>
    	{
    		isLoading && <Loading/>
    	}
    	{
    		showModalAdd && <Modal close={()=>setShowModalAdd(false)} onSubmit={onSubmitModal} data={dataModal} changeData={changeDataModal}/>
    	}
    	<Navbar user={user} logout={logout} keranjang={keranjang}/>
    	<div className='barang-container'>
    		<div className='container-search'>
    			<input className='inp-search' value={inpSearch} placeholder='search' onChange={(e)=>setInpSearch(e.target.value)}/>
    			<button className='btn-search' onClick={handleSearch}>Search</button>
	    	</div>
	    	{
	    		user && <button className='btn-add-product' onClick={openModal}>Add Product</button>
	    	}
	    	
	    	<div className='post-container'>
	    		{
	    			barang.map((b)=>{
	    				b.submitType='update'
	    				
	    				if(b.gambarUrl === undefined){
	    					b.gambarUrl='https://firebasestorage.googleapis.com/v0/b/klik-dokter-shop.appspot.com/o/images%2Fbarang%2FnullPhoto.png?alt=media&token=dc9e42d5-496b-4805-9f76-ba953accf63f'
	    				}
	    				return(
	    					<Post key={b.kodeBarang} imageUrl={b.gambarUrl} 
	    						title={b.namaBarang} 
	    						id={b.kodeBarang} 
	    						harga={b.harga} 
	    						desc={b.description}
	    						qty={b.qty} 
	    						user={user}
	    						update={()=>openModal(b)}
								deleteBarang={deleteBarang}
								insertKeranjang={()=>insertKeranjang(b)}
	    						/>
	    				)
	    			})
	    		}
	    	</div>

    	</div>
    	
    </div>
  );
}

export default Barang;
