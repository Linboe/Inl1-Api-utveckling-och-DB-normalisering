export class Category {
    id?: number;
    name: string = '';

    constructor(name: string, id?: number) {
        if (id !== undefined) {
            this.id = id;
        }
        this.name = name;
    }
}

// kolla på alternativ för id? 
// modell för products