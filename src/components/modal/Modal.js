import React,{useState} from 'react'
import './Modal.css'
function Modal({close,data,gambar,changeData,onSubmit}){
	return(
		<div className='modal'>
			<div className='modal-header'>
				<h4>Tambah Product</h4>
			</div>
			<div className='modal-content'>
				<label>Kode Barang</label>
				<input type='text' name='kodeBarang' className='modal-inp' value={data.kodeBarang} onChange={(e)=>changeData(e)} disabled={data.submitType}/>
				<label>Nama Barang</label>
				<input type='text' name='namaBarang' className='modal-inp' value={data.namaBarang} onChange={(e)=>changeData(e)}/>
				<label>Qty</label>
				<input type='text' name='qty' className='modal-inp' value={data.qty} onChange={(e)=>changeData(e)}/>
				<label>Harga</label>
				<input type='text' name='harga' className='modal-inp' value={data.harga} onChange={(e)=>changeData(e)}/>
				<label>Desciption</label>
				<input type='text' name='description' className='modal-inp' value={data.description} onChange={(e)=>changeData(e)}/>
				<label>Gambar</label>
				<input type='file' name='gambar' className='modal-inp' onChange={(e)=>changeData(e)}/>
			</div>
			<div className='modal-footer'>
				<button onClick={onSubmit} className='btn btn-update'>{data.submitType?'Update':'Add'}</button>
				<button onClick={close} className='btn btn-update'>Close</button>
			</div>
		</div>
	)
}


export default Modal