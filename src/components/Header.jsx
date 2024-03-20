import { useBasketStore } from '../stores';
import { formatPrice } from '../utils';
import { MdOutlineShoppingBasket } from 'react-icons/md';

const Header = () => {
  const [money, basket] = useBasketStore((state) => [state.money, state.basket]);

  const totalQuantity = basket.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <header className="w-full bg-indigo-400 border-b border-indigo-700">
      <div className="py-4 max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://yt3.googleusercontent.com/0DojOe3tyTKxVSB8ZsHFVTvCZUWmhvyOHZE9JtsHjnfeGAPariPxBOyAqz5DqeKfbImOLLPn=s176-c-k-c0x00ffffff-no-rj"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <p className="text-white font-medium text-lg text-orange-500">EMektep</p>
        </div>
        <div className="text-white font-medium text-lg">{formatPrice(money)}</div>
        <div className="relative">
          <MdOutlineShoppingBasket fill="#fff" size="40px" />
          {basket.length > 0 && (
            <div
              className="absolute -top-2 -right-4 w-7 h-7 bg-indigo-600 text-white grid place-items-center rounded-full"
              style={{
                lineHeight: 1,
              }}
            >
              {totalQuantity < 9 ? `0${totalQuantity}` : totalQuantity}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
