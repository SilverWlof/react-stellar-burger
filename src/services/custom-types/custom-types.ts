export { }

export type TIngredientPropType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};
export type TSelectedIngredientPropType = {
    pos: number;
    item: TIngredientPropType & { uniqueId: string|null };
};
export type TAllOrdersMessageType = {
    success?: boolean;
    orders: Array<TOrderPropType>;
    total: number;
    totalToday: number;
    token?: string;
}
export type TOrderPropType =
    {
        ingredients: Array<number|string>;
        _id: number | string;
        status: string;
        number: number;
        createdAt: string;
        updatedAt: string;
        name?: string;
    };
export type TApiConfigPropType = {
    baseUrl: string,
    headers: Headers,
};
export type TOrderElementDataPropType = {

    price?:number;
    title:string;
    img:string;
    count:number;
    id: string | number ;
}
export type TUserDataType = {

    email: string;
    password?: string;
    name: string;
}

export type TDragItemType = {
    dragItem: TDragItemDataType,
    actionType: (arg0: TDragItemDataType) => any,
}
export type TDragItemDataType = {
    
    oldPos: number | null,
    data: TIngredientPropType & { uniqueId: string | null },
}


export type TAuthPromiseResultType = { success: boolean, message: string }