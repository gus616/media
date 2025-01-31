export type User = {
    id: string,
    name: string,
}

export type Album ={
    id: string,
    title: string,
    userId: string,
}

export type Photo = {
    id: number,
    url: string,
    albumId: number,
}
