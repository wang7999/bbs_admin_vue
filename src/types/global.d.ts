export {}
declare global {
  interface IResponse {
    code: number;
    message: string;
    success: boolean;
    }
    interface IUser {
        email?: string
        role?: string
        token: string
        userId: string
        username: string
        message?: string
    }

    interface IObject<T> {
        [index: string]: T
    }

}
