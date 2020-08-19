export namespace AuthActions {
    export class Login {
        static readonly type = `[Auth] Login`;
        constructor(public login: string, public password: string) { }
    }

    export class UpdateToken {
        static readonly type = `[Auth] UpdateToken`;
        constructor(public token: string) { }
    }

    export class SignOut {
        static readonly type = `[Auth] SignOut`;
        constructor() { }
    }
}
