import Card from "./Card";
import Button from "./Button";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden group">
      <div className="overflow-hidden rounded-xl mb-4 relative">
        <img src={image} alt={title} className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#5e35b1] text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wide">
          {category}
        </span>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">{description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
          <span className="text-lg font-extrabold text-[#5e35b1]">{price}</span>
          <Button type="primary" className="!px-3 !py-1.5 !text-xs">Kelola Paket</Button>
        </div>
      </div>
    </Card>
  );
}