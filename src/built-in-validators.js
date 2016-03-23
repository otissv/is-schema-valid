'use strcit';

// Flow types
type OBJECT = { [key: string]: any };
declare function FN_NUM(data: number): number;
declare function FN_LENGTH(data: number): string | Array<any>;
declare function FN_STRING(data: string): string;
declare function FN_ARRAY(data: any): Array<any>;


// Checks if number is equal to length
export function length (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length !== num) {
      throw new Error(`Length Error: ${data} length is not equal to ${num}`);
    }
    return data;
  };
}


// Checks if number is not less than minimum length
export function minLength (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length < num) {
      throw new Error(`Length Error: ${data} length is less than to ${num}`);
    }

    return data;
  };
}

// Checks if number is not more than the maximun length
export function maxLength (num: number): FN_LENGTH {
  return function (data: string | Array<any>): string | Array<any> {
    if (data.length > num) {
      throw new Error(`Length Error: ${data} length is more than to ${num}`);
    }

    return data;
  };
}


// Checks if string matches reqex
export function match (re: OBJECT): FN_STRING {
  return function (data: string): string {

    if (!data.match(re)) {
      throw new Error(`Match Validator Error: ${data} does not match regex}`);
    }
    return data;
  };
}


// Checks if number is not less than minimum number
export function min (num: number): FN_NUM {
  return function (data: string | Array<any>): string | Array<any> {
    if (data < num) {
      throw new Error(`Min Validator Error: ${data} is less than ${num}`);
    }

    return data;
  };
}


// Checks if number is not more than maximum number
export function max (num: number): FN_NUM {
  return function (data: string | Array<any>): string | Array<any> {
    if (data > num) {
      throw new Error(`Max Validator Error: ${data} is more than ${num}`);
    }

    return data;
  };
}


// Checks if data is one of the enum elements
export function oneOf (list: Array<any>): FN_ARRAY {
  return function (data: any): any {
    if (!list.includes(data)) {
      throw new Error(`One of Validator Error: ${data} is not one of [${list}]`);
    }

    return data;
  };
}
