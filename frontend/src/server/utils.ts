export function termiateAwait(f: Function): [Function, () => Boolean] {
    let b = new Boolean();
    b = false;

    let wrapped = (...args: any[]) => {
        // @ts-ignore
        let res = f.apply(this, args);
        if (!(res instanceof Promise<any>)) {
            b = true;
            return;
        }
        let promise = res as Promise<any>;
        promise.finally(() => {
            b = true
        });
    }

    let terminated = () => {
        return b;
    }

    return [wrapped, terminated];
}