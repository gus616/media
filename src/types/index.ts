export type User = {
    id: number,
    name: string,
}

export type Album ={
    id: number,
    title: string,
    userId: number,
}

export type Photo = {
    id: number,
    url: string,
    albumId: number,
}
