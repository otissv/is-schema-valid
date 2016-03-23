'use strcit';

declare function MIDDLEWARE(value: any): bool;


export default function customValidation (middleWare: Array<any>): any {
  return function (data: Array<any>): Array<any> {

    const reducer = (value: any, fn: MIDDLEWARE): any => {
      if (Array.isArray(value)) {
        return value.map((el: any) => fn(el));
      } else {
        const valid = fn(value);

        if (valid.error) {
          throw new Error(valid.error);
        } else {
          return fn(value);
        }
      }
    };

    const pipe = (fns: Array<any>) => (current: any) => fns.reduce(reducer, current);

    return pipe(middleWare)(data);
  };
}
