import './Post.css'

function Post({id,imageUrl,title,harga,desc,user,update,deleteBarang,qty,insertKeranjang}){
	return(
		<div key={id} className='post'>
			<img src={imageUrl} className='post-image' alt={id}/>
			<div>
				<p>Kode SKU : {id}</p>
				<p>{title}</p>
				<p>Rp {harga}</p>
				<p>Stock : {qty}</p>
			</div>
			{
				user && (
					<>
						<div className='post-action'>
							<button className='btn btn-update' onClick={update}>Update</button>
							<button className='btn btn-delete' onClick={deleteBarang} id={id}>Delete</button>
						</div>
						<button className='btn btn-keranjang' onClick={insertKeranjang} id={id}>Masukan Keranjang</button>			
					</>
				)
			}
			
			
    	</div>
	)
}


export default Post