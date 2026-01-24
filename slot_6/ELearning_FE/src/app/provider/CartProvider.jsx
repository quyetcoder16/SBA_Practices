import React, { createContext, useReducer, useEffect, useMemo, useContext, useCallback } from 'react';

// 1. Khởi tạo Context
export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

// 2. Initial State & Action Types
const initialState = {
    items: JSON.parse(localStorage.getItem("cart_items")) || [],
};

const ACTION_TYPES = {
    ADD: "ADD_ITEM",
    REMOVE: "REMOVE_ITEM",
    INCREASE: "INCREASE_QTY",
    DECREASE: "DECREASE_QTY",
    CLEAR: "CLEAR_CART",
};

// 3. Reducer Function (Trái tim của logic)
// Pure function: Input giống nhau -> Output luôn giống nhau
const cartReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD: {
            const { items } = state;
            const product = action.payload;
            const idx = items.findIndex((i) => i.id === product.id);

            let newItems;
            if (idx > -1) {
                newItems = [...items];
                newItems[idx] = { ...newItems[idx], quantity: newItems[idx].quantity + 1 };
            } else {
                newItems = [...items, { ...product, quantity: 1 }];
            }
            return { ...state, items: newItems };
        }

        case ACTION_TYPES.INCREASE:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };

        case ACTION_TYPES.DECREASE:
            return {
                ...state,
                items: state.items
                    .map((item) =>
                        item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                    )
                    .filter((item) => item.quantity > 0),
            };

        case ACTION_TYPES.REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };

        case ACTION_TYPES.CLEAR:
            return { ...state, items: [] };

        default:
            return state;
    }
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);


    useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(state.items));
    }, [state.items]);

    const stats = useMemo(() => {
        const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
        const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return { count, total };
    }, [state.items]);


    const addToCart = useCallback((product) => {
        dispatch({ type: ACTION_TYPES.ADD, payload: product });
    }, []);

    const removeFromCart = useCallback((id) => {
        dispatch({ type: ACTION_TYPES.REMOVE, payload: id });
    }, []);

    const increaseQty = useCallback((id) => {
        dispatch({ type: ACTION_TYPES.INCREASE, payload: id });
    }, []);

    const decreaseQty = useCallback((id) => {
        dispatch({ type: ACTION_TYPES.DECREASE, payload: id });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: ACTION_TYPES.CLEAR });
    }, []);

    const stateValue = useMemo(() => ({
        items: state.items,
        stats
    }), [state.items, stats]);


    const dispatchValue = useMemo(() => ({
        addToCart, removeFromCart, increaseQty, decreaseQty, clearCart
    }), [addToCart, removeFromCart, increaseQty, decreaseQty, clearCart]);

    return (
        <CartStateContext.Provider value={stateValue}>
            <CartDispatchContext.Provider value={dispatchValue}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};


export const useCartState = () => {
    const context = useContext(CartStateContext);
    if (!context) throw new Error("useCartState must be used within CartProvider");
    return context;
};

export const useCartDispatch = () => {
    const context = useContext(CartDispatchContext);
    if (!context) throw new Error("useCartDispatch must be used within CartProvider");
    return context;
};


export const useCart = () => {
    return { ...useCartState(), ...useCartDispatch() };
};

export default CartProvider;