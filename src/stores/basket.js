import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products } from '../constants';

const useBasketStore = create(
  persist(
    (set, get) => ({
      money: 10000,
      basket: [],
      addProduct(id) {
        const existProduct = get().basket.find((p) => p.id === id);
        if (existProduct) {
          const stateMoney = get().money;
          if (stateMoney - existProduct.price <= 0) {
            return;
          }
          set({
            basket: get().basket.map((product) => {
              if (product.id === existProduct.id) {
                return {
                  ...product,
                  quantity: existProduct.quantity + 1,
                };
              }

              return product;
            }),
            money: get().money - existProduct.price,
          });
        } else {
          const findedProduct = products.find((p) => p.id === id);
          const stateMoney = get().money;
          if (stateMoney - findedProduct.price <= 0) {
            return;
          }
          set({
            basket: [
              ...get().basket,
              {
                ...findedProduct,
                quantity: 1,
              },
            ],
            money: stateMoney - findedProduct.price,
          });
        }
      },
      getProduct(id) {
        const findedProduct = get().basket.find((product) => product.id === id);
        return findedProduct;
      },
      removeProduct(id) {
        const findedProduct = get().basket.find((product) => product.id === id);
        if (findedProduct.quantity - 1 === 0) {
          set({
            basket: get().basket.filter((product) => product.id !== id),
            money: get().money + findedProduct.price,
          });
        } else {
 
          set({
            basket: get().basket.map((product) => {
              if (product.id === findedProduct.id) {
                return {
                  ...product,
                  quantity: findedProduct.quantity - 1,
                };
              }

              return product;
            }),
            money: get().money + findedProduct.price,
          });
        }
      },
    }),
    {
      name: '@emektep-basket',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useBasketStore;
