
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum MenuStatus {
    UNPUBLISHED = "UNPUBLISHED",
    PUBLISHED = "PUBLISHED",
    CLOSED = "CLOSED",
    BLOCKED = "BLOCKED"
}

export enum UserRole {
    ADMIN = "ADMIN",
    MOD = "MOD",
    USER = "USER"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export interface AddMenuInput {
    name: string;
    site: string;
    status: MenuStatus;
}

export interface AddUserInput {
    name: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    site: string;
}

export interface Dish {
    _id?: string;
    name?: string;
    shop?: string;
}

export interface Item {
    _id?: string;
    dish?: string;
    menu?: string;
    total?: number;
    current?: number;
}

export interface Menu {
    _id?: string;
    name?: string;
    site?: Site;
    status?: MenuStatus;
    created_date?: string;
}

export interface IMutation {
    addDish(name?: string, shop?: string): Dish | Promise<Dish>;
    deleteDish(id?: string): Dish | Promise<Dish>;
    addItem(menu?: string, dish?: string, total?: number): Item | Promise<Item>;
    increaseItem(id?: string): Item | Promise<Item>;
    deleteItem(id?: string): Item | Promise<Item>;
    addMenu(menu: AddMenuInput): Menu | Promise<Menu>;
    deleteMenu(id: string): Menu | Promise<Menu>;
    updateMenu(id: string, status: MenuStatus, site: string): Menu | Promise<Menu>;
    addOrder(user?: string, item?: string, quantity?: number): Order | Promise<Order>;
    increaseOrder(id?: string): Order | Promise<Order>;
    decreaseOrder(id?: string): Order | Promise<Order>;
    deleteOrder(id?: string): Order | Promise<Order>;
    addShop(name: string): Shop | Promise<Shop>;
    deleteShop(id?: string): Shop | Promise<Shop>;
    addSite(name?: string): Site | Promise<Site>;
    deleteSite(id?: string): Site | Promise<Site>;
    updateSite(id?: string, name?: string): Site | Promise<Site>;
    addUser(user?: AddUserInput): User | Promise<User>;
    deleteUser(id: string): User | Promise<User>;
    updateUser(data: string): User | Promise<User>;
}

export interface Order {
    _id?: string;
    user?: string;
    item?: string;
    quantity?: number;
    created_date?: string;
}

export interface IQuery {
    dishes(shop?: string): Dish[] | Promise<Dish[]>;
    items(menu?: string): Item[] | Promise<Item[]>;
    menus(site: string): Menu[] | Promise<Menu[]>;
    orders(filter?: string): Order[] | Promise<Order[]>;
    shops(): Shop[] | Promise<Shop[]>;
    sites(): Site[] | Promise<Site[]>;
    users(site: string): User[] | Promise<User[]>;
    login(name: string, password: string): string | Promise<string>;
}

export interface Shop {
    _id?: string;
    name?: string;
}

export interface Site {
    _id?: string;
    name?: string;
}

export interface User {
    name?: string;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
    site?: Site;
}
