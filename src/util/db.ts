export interface ICategory {
    name: string;   
}

export interface ICategorys extends Array<ICategory> {}

export interface ISignInfo { 
    id?: string;
    nickname?: string; 
    password?: string; 
    passwordCheck?: string; 
    phone1?: string; 
    phone2?: string; 
    phone3?: string; 
    marketing?: boolean; 
    agree?: boolean;
}

export interface IProductInfo {
    price: number;
    image_urls: IImgUrls[];
    name: string;
    brand: IBrand;
    category: ICategory;
    subscription_periods: IPeridos[];
    description: string;
    id?:string;
}

export interface IProductInfos extends Array<IProductInfo> {}

export interface IImgUrls {
    imgUrls: string;
}

export interface IBrand {
    name: string;
    id?: string;
    image_urls?: IImgUrls[];
}

export interface IBrands extends Array<IBrand> {}

export interface IPeridos {
    month: number;
}

export interface ISubscribeInfo {
    product: IMypageProduct;
    period: string;
    updated_at: string;
    mothly_price: number;
}

export interface ISubscribeInfos extends Array<ISubscribeInfo> {}

export interface IMypageProduct {
    image_urls: IImgUrls[];
    name: string;
}

export interface IModifyInfo {
    id?: string;
    nick_name?: string; 
    password?: string; 
    passwordCheck?: string; 
    phone?: string;
    marketing?: boolean; 
    agree?: boolean;
}

export interface IUserInfo {
    email: string;
    nick_name: string;
}
