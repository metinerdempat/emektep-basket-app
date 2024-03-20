import { Header } from './components';
import { products } from './constants';
import { useBasketStore } from './stores';
import { formatPrice } from './utils';
import { clsx } from 'clsx';

const App = () => {
  const [basket, addProduct, getProduct, removeProduct, money] = useBasketStore((state) => [
    state.basket,
    state.addProduct,
    state.getProduct,
    state.removeProduct,
    state.money,
  ]);


  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1400px] w-full mt-16">
        <h1 className="text-center text-3xl font-medium text-indigo-800">EMektep Basket App</h1>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex items-center gap-2 w-full shadow-md rounded-md overflow-hidden bg-indigo-300"
            >
              <div className="w-[40%] shrink-0">
                <img
                  src={product.image}
                  alt={product.title + ' img'}
                  className="w-full h-[200px] object-cover object-center"
                />
              </div>
              <div className="p-2 self-start flex flex-col h-full">
                <h2 className="text-lg font-bold text-indigo-800">{product.title}</h2>
                <p className="text-sm mt-2 text-white">{product.description.slice(0, 50)}</p>
                <p className="text-sm mt-2 text-white">{formatPrice(product.price)}</p>

                <div className=" flex items-center gap-3 justify-center mt-auto">
                  <button
                    disabled={getProduct(product.id)?.quantity === 0}
                    className={clsx(
                      'text-white bg-indigo-400 w-10 h-10 grid place-items-center rounded-md font-medium text-lg',
                      {
                        'disabled:bg-gray-400': getProduct(product.id)?.quantity === 0,
                      },
                    )}
                    onClick={() => removeProduct(product.id)}
                  >
                    -
                  </button>
                  <button className="text-white bg-indigo-400 w-10 h-10 grid place-items-center rounded-md font-medium text-lg">
                    {getProduct(product.id)?.quantity || 0}
                  </button>
                  <button
                    disabled={product.price > money}
                    className={clsx(
                      'text-white bg-indigo-400 w-10 h-10 grid place-items-center rounded-md font-medium text-lg',
                      {
                        'disabled:bg-gray-400': product.price > money,
                      },
                    )}
                    onClick={() => {
                      addProduct(product.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
