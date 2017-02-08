


class Details {
    private storeId:number;

    public activate(storeIdStr:string) {
        this.storeId = parseInt(storeIdStr, 10);   
    }

}

export = Details;