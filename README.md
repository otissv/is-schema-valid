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

To define a schema create an object literal with the keys name as the keys to be evaluated and the value as the valid key types name.

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
