'use strcit';

export function length (num: number): any {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length !== num) {
      throw new Error(`Length Error: ${data} length is not equal to ${num}`);
    }
    return data;
  };
}


export function minLength (num: number): any {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length < num) {
      throw new Error(`Length Error: ${data} length is less than to ${num}`);
    }

    return data;
  };
}


export function maxLength (num: number): any {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length > num) {
      throw new Error(`Length Error: ${data} length is more than to ${num}`);
    }

    return data;
  };
}


export function min (num: number): any {
  return function (data: string | Array<any>): string | Array<any> {
    if (data < num) {
      throw new Error(`Min Validator Error: ${data} is less than ${num}`);
    }

    return data;
  };
}


export function max (num: number): any {
  return function (data: string | Array<any>): string | Array<any> {
    if (data > num) {
      throw new Error(`Max Validator Error: ${data} is more than ${num}`);
    }

    return data;
  };
}
