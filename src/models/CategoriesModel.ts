export class Category {
    id?: number | undefined;
    name: string = '';

    constructor(name: string, id?: number) {
        this.id = id;
        this.name = name;
    }
}

// kolla på alternativ för id? i ex math.random är det bra?
