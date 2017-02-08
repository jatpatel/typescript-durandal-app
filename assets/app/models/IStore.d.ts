
interface IStoreSales {
    category:string;
    amount:number;
    progress:number;  // in percentage value
}

interface IStore {
    name:string;
    salesData: Array<IStoreSales>
}