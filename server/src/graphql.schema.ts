
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
    site?: string;
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
    name?: string;
    shop?: string;
    menu?: string;
    total?: number;
    booked?: number;
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
    updateDish(id?: string, name?: string): Dish | Promise<Dish>;
    addItem(menu?: string, total?: number, name?: string): Item | Promise<Item>;
    addItemFromShop(menu?: string, shop?: string, items?: string, total?: number): boolean | Promise<boolean>;
    increaseItem(id?: string): Item | Promise<Item>;
    decreaseItem(id?: string): Item | Promise<Item>;
    deleteItem(id?: string): Item | Promise<Item>;
    updateItem(id?: string, name?: string, total?: number): boolean | Promise<boolean>;
    addMenu(site: string, status: MenuStatus, name: string): Menu | Promise<Menu>;
    deleteMenu(id: string): Menu | Promise<Menu>;
    updateMenu(id: string, status: MenuStatus, name: string): Menu | Promise<Menu>;
    addOrder(user?: string, item?: string, quantity?: number, note?: string): Result | Promise<Result>;
    increaseOrder(id?: string): Order | Promise<Order>;
    decreaseOrder(id?: string): Order | Promise<Order>;
    deleteOrder(id?: string): boolean | Promise<boolean>;
    confirmOrder(id?: string): boolean | Promise<boolean>;
    addShop(name: string): Shop | Promise<Shop>;
    deleteShop(id: string): Shop | Promise<Shop>;
    updateShop(id: string, name: string): Shop | Promise<Shop>;
    addSite(name?: string): Site | Promise<Site>;
    deleteSite(id?: string): Site | Promise<Site>;
    updateSite(id?: string, name?: string): Site | Promise<Site>;
    addUser(user?: AddUserInput): User | Promise<User>;
    deleteUser(id: string): User | Promise<User>;
    updateUser(id: string, data: string): User | Promise<User>;
    updateUserSelf(data: string): User | Promise<User>;
    changePassword(old?: string, password?: string): Result | Promise<Result>;
}

export interface Order {
    _id?: string;
    user?: string;
    site?: string;
    item?: string;
    note?: string;
    confirmed?: string;
    quantity?: number;
    created_date?: string;
}

export interface IQuery {
    dishes(shop?: string): Dish[] | Promise<Dish[]>;
    items(menu?: string): Item[] | Promise<Item[]>;
    menus(site: string): Menu[] | Promise<Menu[]>;
    userMenu(): Item[] | Promise<Item[]>;
    orders(): Order[] | Promise<Order[]>;
    orderOfUser(): Order[] | Promise<Order[]>;
    shops(): Shop[] | Promise<Shop[]>;
    sites(): Site[] | Promise<Site[]>;
    users(site?: string): User[] | Promise<User[]>;
    login(name: string, password: string): string | Promise<string>;
}

export interface Result {
    success?: string;
    error?: string;
}

export interface Shop {
    _id?: string;
    name?: string;
    dishes?: Dish[];
}

export interface Site {
    _id?: string;
    name?: string;
    count?: number;
}

export interface User {
    _id?: string;
    name?: string;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
    site?: Site;
}
