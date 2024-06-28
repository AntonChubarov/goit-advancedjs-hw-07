import { v4 as uuid } from 'uuid';

class Key {
    private signature: string;

    constructor() {
        this.signature = uuid();
    }

    public getSignature(): string {
        return this.signature;
    }
}

class Person {
    public readonly name: string;
    private key: Key;

    constructor(name: string, key: Key) {
        this.key = key;
    }

    public getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected door: boolean = false;
    protected key: Key;
    protected tenants: Person[] = [];

    protected constructor(key: Key) {
        this.key = key;
    }

    public comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
            console.log(`${person.name} has entered the house.`);
        } else {
            console.log(`${person.name} was trying to enter the house, but the door is closed`);
        }
    }

    public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    constructor(key: Key) {
        super(key);
    }

    public openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log('the door is open');
        } else {
            console.log('the key does not match');
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person('John', key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};
