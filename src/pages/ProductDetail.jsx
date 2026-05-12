import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/Products.json"; 

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari data produk berdasarkan ID di JSON lokal
  const product = productsData.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Layanan Tidak Ditemukan!</h2>
        <button onClick={() => navigate("/products")} className="mt-4 text-blue-600 underline">
          Kembali ke Daftar Layanan
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-[#5e35b1] font-bold hover:underline"
      >
        ← Kembali ke Daftar
      </button>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto p-10">
        <div className="flex flex-col">
          <span className={`w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 ${
            product.kategori === 'Inventaris' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-[#5e35b1]'
          }`}>
            {product.kategori}
          </span>
          
          <h2 className="text-4xl font-black text-slate-800 mb-2">{product.titel}</h2>
          <p className="text-gray-400 font-mono text-sm mb-8">ID Layanan: {product.code}</p>
          
          <div className="space-y-4 mb-10 text-slate-600">
            <div className="flex justify-between border-b pb-3">
              <span>Brand/Provider</span>
              <span className="font-bold">{product.brand}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span>Status Stok</span>
              <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                {product.stock === 999 ? 'Tersedia (∞)' : `${product.stock} Unit`}
              </span>
            </div>
          </div>

          <div className="bg-[#5e35b1] rounded-3xl p-8 text-white shadow-xl shadow-purple-100">
            <p className="text-purple-200 text-xs mb-1 uppercase font-black tracking-widest">Harga Layanan</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              {product.kategori === "Layanan Kiloan" && <span className="text-purple-200 font-bold">/ kg</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}