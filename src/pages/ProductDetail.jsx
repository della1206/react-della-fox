import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/Products.json"; 

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari data berdasarkan ID di file JSON lokal
  const product = productsData.find((item) => item.id === parseInt(id));

  const getLaundryImage = (item) => {
    if (!item) return "";
    // Gambar disesuaikan berdasarkan kategori layanan
    if (item.kategori === "Inventaris") return "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=800";
    if (item.titel.toLowerCase().includes("sepatu")) return "https://images.unsplash.com/photo-1512318283556-21b28c7e829a?w=800";
    return "https://images.unsplash.com/photo-1545173153-5dd9215c67e7?w=800"; // Default laundry image
  };

  if (!product) return <div className="p-8 text-center text-red-500">Layanan tidak ditemukan!</div>;

  return (
    <div className="p-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-[#5e35b1] font-bold">← Kembali</button>
      <div className="bg-white rounded-[2.5rem] shadow-xl border overflow-hidden max-w-5xl flex flex-col md:flex-row mx-auto">
        <div className="md:w-1/2 bg-purple-50 p-6 flex items-center justify-center">
          <img src={getLaundryImage(product)} alt={product.titel} className="rounded-[2rem] w-full h-[400px] object-cover" />
        </div>
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <span className="bg-purple-100 text-[#5e35b1] px-4 py-1.5 rounded-full text-xs font-black uppercase mb-4 w-fit">
            {product.kategori}
          </span>
          <h2 className="text-4xl font-black text-slate-800 mb-2">{product.titel}</h2>
          <p className="text-gray-400 mb-6">Kode: {product.code}</p>
          <div className="bg-[#5e35b1] rounded-3xl p-8 text-white">
            <p className="text-purple-200 text-xs mb-1 uppercase font-black">Harga Layanan</p>
            <p className="text-4xl font-black">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}