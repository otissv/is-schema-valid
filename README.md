#Is Schema

Schema validation for object literals.

#Usage
isSchema method checks if object literal is the correct schema.


##Installation
`npm install is-schema`


##Usage
The isSchema method takes a schema and returns a function that takes an object.

```
isSchema(schema)(data);
```

###Schema
A schema is simply an object literal that another object literal can be validated against.

To define a schema create an object literal with the keys name as the keys to be evaluated and the value as the valid key types name.

```
const schema = { title: 'string' };

or

const schema = {
  title: { type: 'string' }
};
```


### Required keys
To make a key required set the required value to true.
```
const schema = {
  title: { type: 'string', required: true }
}
```


###Types
####Boolean
If value is set to 'boolean' it will only accept boolean values

####Number
If value is set to 'number' it will only accept number values

####String
If value is set to 'string' it will only accept string values

####Arrays
Arrays are defined with a single item which is the type of items the array with contain.
Arrays cannot have mixed types.

```
const schema = { tags: ['string']}
```


####Nested schemas
Schemas can be nested by setting a schema keys value to anther schema.


```
const commentSchema = {
  comment: 'string',
  commenter: 'string'
};

const schema = { comments: [commentSchema] }
```


##Example
```
import isSchema from 'is-schema';

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


##Scripts
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
