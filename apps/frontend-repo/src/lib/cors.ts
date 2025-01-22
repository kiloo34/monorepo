import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'OPTIONS'],
    origin: 'http://localhost:3000',
});

export function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
