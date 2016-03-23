'use strcit';

// Flow types
type OBJECT = { [key: string]: any };
declare function FN_NUM(data: number): number;
declare function FN_LENGTH(data: number): string | Array<any>;
declare function FN_STRING(data: string): string;


// Length validator
export function length (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length !== num) {
      throw new Error(`Length Error: ${data} length is not equal to ${num}`);
    }
    return data;
  };
}


// Minimum length validator
export function minLength (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length < num) {
      throw new Error(`Length Error: ${data} length is less than to ${num}`);
    }

    return data;
  };
}

// Maximun length validator
export function maxLength (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length > num) {
      throw new Error(`Length Error: ${data} length is more than to ${num}`);
    }

    return data;
  };
}

// Match validator
export function match (re: OBJECT): FN_STRING {
  return function (data: string): string {

    if (!data.match(re)) {
      throw new Error(`Match Validator Error: ${data} does not match regex}`);
    }
    return data;
  };
}


// Minimum number validator
export function min (num: number): FN_NUM {
  return function (data: string | Array<any>): string | Array<any> {
    if (data < num) {
      throw new Error(`Min Validator Error: ${data} is less than ${num}`);
    }

    return data;
  };
}

// Maximum number validator
export function max (num: number): FN_NUM {
  return function (data: string | Array<any>): string | Array<any> {
    if (data > num) {
      throw new Error(`Max Validator Error: ${data} is more than ${num}`);
    }

    return data;
  };
}
