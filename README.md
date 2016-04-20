#Is Schema Valid

Schema validation for object literals.


## Installation
`npm install is-schema-valid`


## Usage
The isSchemaValid method takes a schema and returns a function that takes an object literal to be validated.

The returning function validates the object against the schema and returns an object with a valid key. True if the object passes or false if the object fails.

```
import isSchema from 'is-schema-valid';

isSchema(schema)(data);
```

## Schema
A schema is simply an object literal that another object literal can be validated against.

To define a schema create an object literal with the keys name as the keys to be evaluated and the value as the valid key types name. An optional description property can be added.

```
const schema = { title: 'string' };

or

const schema = {
  title: { type: 'string' }
};
```

## Types

#### Boolean
If value is set to 'boolean' it will only accept boolean values

#### Number
If value is set to 'number' it will only accept number values

#### String
If value is set to 'string' it will only accept string values

#### Arrays
Arrays are defined with a single item which is the type of items the array with contain.
Arrays cannot have mixed types.

```
const schema = { tags: ['string'] }
```

#### Nested schemas
Schemas can be nested by setting a schema keys value to another schema.


```
const commentSchema = {
  comment: 'string',
  commenter: 'string'
};

const schema = { comments: [commentSchema] }
```

## Errors
When there is a failure an error object is returned.
```
{
  valid: false,
  name: 'TypeError'
  message: 'Error message'
  stack: error.stack,
}
```


## Built-in validation
 - All schema types have a type validation and an optional require validation.
 - max and min validation only works with number types.
 - length, maxLength, minLength and match validation only works with string types.

#### required
Value is required.
```
{
  str: { type: 'string', required: true }
}
```

#### max
Value cannot be higher than max.
```
{
  num: { type: 'number', max: 5 }
}
```

#### min
Value cannot be lower than min.
```
{
  num: { type: 'number', min: 1 }
}
```

#### length
Value length must be equal to length.

```
{
  str: { type: 'string', length: 5 }
}
```

#### maxLenth
Value length cannot be higher than max.
```
{
  str: { type: 'string', maxLenth: 5 }
}
```

#### minLenth
Value length cannot be lower than max.
```
{
  str: { type: 'string', maxLenth: 1 }
}
```

#### match
Value matches regex.
```
{
  str: { type: 'string', match: /[A-J]/gi }
}
```

## Custom validation
Custom validators can be added by using the validation key. The validation key takes an array of functions.

If the validaion fails an object with a error key must be returned where the error value is the message for this error error.

If the validation passes the function must return the input value so that it can be passed to the next validator.

The function must be pure and not mutate the value.

```
moreThan7 = function(value) {
  if (value.length < 8) {
    return { error: `Length Error: ${data} length cannot be less than 8` };
  }
  return value;
};

const schema = {
  title: { type: 'string', validation: [moreThan7] }
}
```

## Example
```
import isSchema from 'is-schema-valid';

const commentSchema = {
  comment: 'string',
  commenter: 'string'
};

const schema = {
  title: { type: 'string', required: true },
  author: 'string',
  summary: 'string',
  tags: ['string'],
  comments: [commentSchema],
  views: 'number'
};

const data = {
  title: 'A journey from krypton',
  author: 'Superman',
  summary: 'The story of how superman traveled to earth.',
  tags: ['superhero', 'DC comics', 'Metropolis'],
  comments: [
    {comment: 'firstComment', commenter: 'someone'},
    {comment: 'anotherComment', commenter: 'someoneElse'}
  ],
  views: 15000
};

isSchema(schema)(data);
```

## Why not JSONSchema?
I've previously used [JSONSchema](http://json-schema.org/) which worked nicely but wasn't quite what I was looking for.

While  [JSONSchema](http://json-schema.org/) does indeed cover the use cases of [is-schema-valid](https://github.com/otissv/is-schema-valid) but there are unnecessary fields for my needs and I wanted to have a schema that looked the same as object literal notation it was for. The same way that [mongoosejs](http://mongoosejs.com/docs/guide.html) schema looks like the objects literal notation I actually write.

Also the focus was not on describing an object but only validating it.

Below is some data.
```
{
    "id"      : 1,
    "name": "A green door",
    "price" : 12.50,
    "tags"  : ["home", "green"]
}
```

This is the JSONSchema schema for the above data.
```
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a product",
            "type": "integer"
        },
        "name": {
            "description": "Name of the product",
            "type": "string"
        }
    },
    "required": ["id", "name"]
}
```

And this is the is-schema-valid schema for the above data.
```
{
    "id":  {
        type: "number",
        required: true,
   },
    "name"{
        type: "string",
        required: true,
   }
    "price": "number",
    "tags" : ["string"]
}
```

Notice the main difference is in describing the schema. In is-valid-schema there is no need for $schema, title, description or type only properties of the object. The type is always an object literal and as for the others these are not needed for validating an objects properties.

So it mostly comes down to a matter of style and purpose of each.

The is-schema-valid method can always be wrapped inside another object if additional fields are needed.
```
const schema = {
    "id":  {
        type: "number",
        required: true,
   },
    "name"{
        type: "string",
        required: true,
   }
    "price": "number",
    "tags" : ["string"]
}

const productSchema = {
  title      : 'Product schema',
  description: 'This is a schema for a product',
  type       : 'object',
  properties : schema,
};


isSchema(productSchema.properties)(data)
```


## Scripts
Start/watch
```
npm run start
```

Flow
```
npm run flow
npm run flow:watch
```

Tests
```
npm run test
npm run test:spec
npm run test:watch
```

Build
```
npm run build
```

## License
MIT
