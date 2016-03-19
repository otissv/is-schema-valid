'use strict';

// Flow types
type OBJECT = { [key: string]: any };
type SCHEMA = { [key: string]: any };

// check object structure matches Collection schema
function keyValidation (key: string, type: string) {
  if (type == null) {
    throw new Error(`Invalid Schema Error: ${key} key is not a schema key.`);
  }
}

// check all object pairs values have the correst typeof as stated in Collection Schema
function valueValidation (element: OBJECT, key: string, type: string) {
  if (typeof element[key] !== type) {
    throw new Error(`Invalid Schema Error: ${key} value is not ${type} type.`);
  }
}


// check object has all requireds fields in the Collection schema
function requiredValidation (element: OBJECT, fields: Array<any>) {
  fields.forEach((item: any) => {
    if (!element[item]) {
      throw new Error(`Schema Required Field Error: Required field ${item} is missing.`);
    }
  });
}


// validate all elements in the Collection
function keyAndPairValidation (data: Array<any>, schema: SCHEMA, requiredFields: Array<string>) {
  data.forEach((element: OBJECT) => {
    requiredValidation(element, requiredFields);

    Object.keys(element).forEach((elKey: any) => {
      let schemaType;

      if (typeof schema[elKey] === 'object') {
        schemaType = schema[elKey].type;
      } else {
        schemaType = schema[elKey];
      }

      keyValidation(elKey, schemaType);
      valueValidation(element, elKey, schemaType);
    });
  });
}


// extract required fields from Collection schema
function requiredFieldValidation (data: Array<any>, schema: SCHEMA): Array<string> {
  return Object.keys(schema).map((key: string): string => {
    if (schema[key].required === true) return key;
  }).filter((items: 'string') => items);
}


// validate schema
export default function schemaValidation (data: Array<any>, schema: SCHEMA): bool {
  const requiredFields = requiredFieldValidation(data, schema);


  keyAndPairValidation(data, schema, requiredFields);

  // if pass validation return true else false if failed
  return true;
}
