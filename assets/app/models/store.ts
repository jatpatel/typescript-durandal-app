
export default class Store {
    private id:number;
    private name:string;
    private sales:Array<IStoreSales>;

    public constructor(id:number, name:string, salesData:IStoreSales[]) {
        this.id = id;
        this.name = name;
        this.sales = salesData;
    }

    public getStoreId() {
        return this.id;
    }

    public getStoreName() {
        return this.name;
    }
}