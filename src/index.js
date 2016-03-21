'use strict';

// Flow types
type OBJECT = { [key: string]: any };
type SCHEMA = { [key: OBJECT]: any };
type VALID = {
  [valid: string]: any,
  [name: ?string] : string,
  [message: ?string]: string,
  [stack: ?string]: OBJECT
};


// check object structure matches Collection schema
function keyValidation (type: string) {
  if (type == null) {
    throw new TypeError('Schema Key Error: A key is not a valid schema key.');
  }
}


// check all object pairs values have the correst typeof as stated in Collection Schema
function valueValidation (data: OBJECT, key: string, schemaType: string) {
  const { type } = schemaType;

  if (schemaType.type === 'array') {
    // if array call isSchema to validate nested array.
    data.forEach((element: any) => isSchemaValid(element, schemaType.schema));

  } else if (typeof data !== type) {
    throw new TypeError(`Schema Value Error: ${key} value is not ${type} type.`);
  }
}


// check object has all requireds fields in the Collection schema
function requiredValidation (data: OBJECT, fields: Array<any>) {
  fields.forEach((item: any) => {
    if (!data[item]) {
      throw new Error(`Schema Required Field Error: Required field ${item} is missing.`);
    }
  });
}


// validate all elements in the Collection
function keyAndPairValidation (data: OBJECT, schema: SCHEMA, requiredFields: Array<string>) {

  requiredValidation(data, requiredFields);

  if (typeof data === 'object') {
    Object.keys(data).forEach((key: any) => {
      let schemaType;

      if (Array.isArray(schema[key])) {
        schemaType = { type: 'array', schema: schema[key][0] };

      } else if (typeof schema[key] === 'object') {
        schemaType = { type: schema[key].type };

      } else {
        schemaType = { type: schema[key] };
      }

      keyValidation(schemaType.type);
      valueValidation(data[key], key, schemaType);
    });

  } else {
    // if element is not an object
    valueValidation(data, 'array', { type: schema });
  }
}


// extract required fields from Collection schema
function requiredFieldValidation (schema: SCHEMA): Array<string> {
  return Object.keys(schema).map((key: string): string => {
    if (schema[key].required === true) return key;
  }).filter((items: 'string') => items);
}


// validate schema
export default function isSchemaValid (schema: SCHEMA): VALID | OBJECT {
  return function (data: OBJECT): bool {
    const requiredFields = requiredFieldValidation(schema);


    try {
      keyAndPairValidation(data, schema, requiredFields);
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }
  };
}
