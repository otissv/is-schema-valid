'use strict';
import test from 'tape';
import isSchemaValid from '../lib';


// Flow types
type OBJECT = { [key: string]: any };


test('Schema Validation', (nested: OBJECT) => {

  nested.test('Object validation :: isSchemaValid(schema)({}) -> { valid }.', (assert: OBJECT) => {
    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      title     : { type: 'string', required: true },
      author    : 'string',
      summary   : 'string',
      tags      : ['string'],
      comments  : [commentSchema],
      published : { type: 'boolean', required: true },
      views     : 'number',
      likes     : { type: 'number', required: true }
    };

    const data = {
      title  : 'A journey from krypton',
      author : 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags   : ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      published: false,
      views: 15000,
      likes: 0
    };

    const collection = isSchemaValid(schema)(data);
    const expectCollection = { valid: true };
    assert.deepEqual(collection, expectCollection,
      'Object passes schema validation. Returns { valid: true }');


    const dataMissingRequiredField = {
      author  : 'Superman',
      summary : 'The story of how superman traveled to earth.',
      tags    : ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views: 15000
    };

    const missingRequireField = isSchemaValid(schema)(dataMissingRequiredField).valid;
    const expectMissingRequireField = false;
    assert.deepEqual(missingRequireField, expectMissingRequireField,
      'Object does not pass if require field is missing not in schema. Returns { valid: false }.');


    const dataWithExtraField = {
      title   : 'A journey from krypton',
      author  : 'Superman',
      summary : 'The story of how superman traveled to earth.',
      tags    : ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views : 15000,
      rating: 5
    };

    const invalidKey = isSchemaValid(schema)(dataWithExtraField).valid;
    const expectInvalidKey = false;
    assert.deepEqual(invalidKey, expectInvalidKey,
      'Object did not pass keys invalid keys. Returns { valid: false }.');


    const dataWithINcorrectType = {
      title   : 'A journey from krypton',
      author  : 'Superman',
      summary : 'The story of how superman traveled to earth.',
      tags    : ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views: '15000'
    };

    const invalidType = isSchemaValid(schema)(dataWithINcorrectType).valid;
    const expectInvalidType = false;
    assert.deepEqual(invalidType, expectInvalidType,
      'Object does not pass value if type is not the same as schema key/value. Returns { valid: false }.');

    assert.end();
  });


  nested.test('Collection validation :: [{}, {}].forEach(isSchemaValid(schema)({})) -> { valid }.', (assert: OBJECT) => {
    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      title   : { type: 'string', required: true },
      author  : { type: 'string', required: true },
      summary : { type: 'string', required: true },
      tags    : ['string'],
      comments: [commentSchema]
    };

    const data = [
      {
        title: 'A journey from krypton',
        author: 'Superman',
        summary: 'The story of how superman traveled to earth.',
        tags: ['superhero', 'DC comics', 'Metropolis'],
        comments: [{comment: 'comment1', commenter: 'someone'}]
      },
      {
        title: 'Gothem night',
        author: 'Batman',
        summary: 'Expling the night life in Gothem city.',
        tags: ['superhero', 'DC comics', 'Gothem'],
        comments: [{comment: 'comment1', commenter: 'someone'}]
      }
    ];

    const collection = data.map((element: OBJECT) => isSchemaValid(schema)(element)).every((o: OBJECT): bool => o.valid === true);
    const expectCollection = true;
    assert.deepEqual(collection, expectCollection,
      'Collection passed schema validation. Returns { valid: true }.');

    assert.end();
  });


  nested.test('length validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { length })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', length: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchemaValid(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is equal to length validator. Returns { valid: true }.');


    const invalidData = {
      ten: '123456789'
    };

    const invalidlength = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length is not equal to length validator. Returns { valid: false }.');

    assert.end();
  });


  nested.test('maxLength validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { length })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', maxLength: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchemaValid(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is does not exceed maximum length. Returns { valid: true }.');


    const invalidData = {
      ten: '012345678910'
    };

    const invalidlength = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length cannot exceeds maximum length. Returns { valid: false }.');

    assert.end();
  });


  nested.test('minLength validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { length })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', minLength: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchemaValid(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is higher minimum length. Returns { valid: true }.');


    const invalidData = {
      ten: '012345'
    };

    const invalidlength = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length cannot be lower minimum length. Returns { valid: false }.');

    assert.end();
  });


  nested.test('min validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { length })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      number: { type: 'number', min: 10 }
    };


    const validData = {
      number: 20
    };

    const validMin = isSchemaValid(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Number is higher minimum number. Returns { valid: true }.');


    const invalidData = {
      ten: 5
    };

    const invalidMin = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Number cannot be lower minimum number. Returns { valid: false }.');

    assert.end();
  });


  nested.test('max validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { length })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      number: { type: 'number', max: 10 }
    };


    const validData = {
      number: 6
    };

    const validMin = isSchemaValid(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Number is lower maximum number. Returns { valid: true }.');


    const invalidData = {
      ten: 100
    };

    const invalidMin = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Number cannot be higher maximum number. Returns { valid: false }.');

    assert.end();
  });


  nested.test('match validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { match })) -> { valid }.', (assert: OBJECT) => {
    const schema = {
      str: { type: 'string', match: /[A-J]/gi }
    };


    const validData = {
      str: 'kizomba'
    };

    const validMin = isSchemaValid(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Mathces regex. Returns { valid: true }.');


    const invalidData = {
      str: 'zouk'
    };

    const invalidMin = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Correctly does not match regex. Returns { valid: false }.');

    assert.end();
  });


  nested.test('oneOf validator :: [{}, {}].forEach(isSchemaValid(schema)({}, { oneOf })) -> { valid }..', (assert: OBJECT) => {
    const schema = {
      str: { type: 'string', oneOf: ['one', 'two', 'three'] }
    };


    const validData = {
      str: 'one'
    };

    const validMin = isSchemaValid(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Does allows only one of enum values. Returns { valid: true }.');

    const invalidData = {
      str: 'four'
    };

    const invalidMin = isSchemaValid(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Does allow a value not in the enum. Returns { valid: false }.');

    assert.end();
  });


  nested.test('Custom Validation :: [{}, {}].forEach(isSchemaValid(schema)({}, [validation])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      function (data: any): any {
        // data length cannot be less than 8
        if (data.length < 8) {
          return { error: `Length Error: ${data} length cannot be less than 8` };
        }
        return data;
      },

      function (data: any): any {
        // data first charater must be caitalised
        if (data.charAt(0) !== data.charAt(0).toUpperCase()) {
          return { error: 'Author name must start with a capital letter' };
        }
        return data;
      }
    ];

    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      title   : 'string',
      author  : { type: 'string', validation },
      summary : 'string',
      tags    : ['string'],
      comments: [commentSchema]
    };


    const supermanData = {
      title: 'A journey from krypton',
      author: 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags: ['superhero', 'DC comics', 'Metropolis'],
      comments: [{comment: 'comment1', commenter: 'someone'}]
    };

    const validArticle = isSchemaValid(schema)(supermanData).valid;
    const expectedValidArticle = true;
    assert.deepEqual(validArticle, expectedValidArticle,
      'Custom validation passed as expected. Returns { valid: true }.');


    const batmanData = {
      title: 'Gothem night',
      author: 'batman, The Dark Kninght',
      summary: 'Expling the night life in Gothem city.',
      tags: ['superhero', 'DC comics', 'Gothem'],
      comments: [{comment: 'comment1', commenter: 'someone'}]
    };

    const invalidArticle = isSchemaValid(schema)(batmanData).valid;
    const expectedInvalidArticle = false;
    assert.deepEqual(expectedInvalidArticle, invalidArticle,
      'Custom validation fails as expected. Returns { valid: false }.');

    assert.end();
  });

  nested.test('Nested schema :: isSchemaValid(schema)({}, [validation])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      function (data: any): any {
        // data length cannot be less than 8
        if (data.length < 8) {
          return { error: `Length Error: ${data} length cannot be less than 8` };
        }
        return data;
      }
    ];

    const commentSchema = {
      comment: { type: 'string', required: true, validation },
      commenter: 'string'
    };

    const schema = {
      title   : 'string',
      author  : { type: 'string' },
      summary : 'string',
      tags    : ['string'],
      comments: [commentSchema],
      nestedObj: { type: commentSchema }
    };


    const supermanData = {
      title: 'A journey from krypton',
      author: 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags: ['superhero', 'DC comics', 'Metropolis'],
      comments: [{comment: 'comment1', commenter: 'someone'}],
      nestedObj: {comment: 'comment1', commenter: 'someone'}
    };

    const validArticle = isSchemaValid(schema)(supermanData).valid;
    const expectedValidArticle = true;
    assert.deepEqual(validArticle, expectedValidArticle,
      'Nested is valid. Returns { valid: true }.');


    const batmanData = {
      title: 'Gothem night',
      author: 'batman, The Dark Kninght',
      summary: 'Expling the night life in Gothem city.',
      tags: ['superhero', 'DC comics', 'Gothem'],
      comments: [{comment: 'user1', commenter: 'someone'}],
      nestedObj: {comment: 'user1', commenter: 'someone'}
    };

    const invalidArticle = isSchemaValid(schema)(batmanData).valid;
    const expectedInvalidArticle = false;
    assert.deepEqual(invalidArticle, expectedInvalidArticle,
      'Does not validate nested schema. Returns { valid: false }.');


    const fullNameSchema = {
      firstName: 'string',
      lastName: 'string'
    };

    const categoriestSchema = {
      color: 'string',
      category: 'string'
    };

    const nestedSchema = {
      fullName : [fullNameSchema],
      categories : { type: [categoriestSchema] }
    };

    const nestedData = {
      fullName: [
        { firstName: 'otis', lastName: 'virginie' }
      ],
      categories: [
        { color: 'string', category: 'string' }
      ]
    };

    const collection = isSchemaValid(nestedSchema)(nestedData).valid;
    assert.deepEqual(collection, true,
      'Nested object type passes schema validation. Returns { valid: true }');

    assert.end();
  });


  nested.test('Empty schema', (assert: OBJECT) => {

    let str = { str: '' };
    const strSchema = { str: { type: 'string', empty: false } };
    let strEmpty = isSchemaValid(strSchema)(str).valid;
    assert.deepEqual(strEmpty, false,
      'String type should not be empty. Returns { valid: false }.');


    let num = { num: 0 };
    const numSchema = { num: { type: 'number', empty: false } };
    let numEmpty = isSchemaValid(numSchema)(num).valid;
    assert.deepEqual(numEmpty, false,
      'String type should not be empty. Returns { valid: false }.');


    let arry = { arry: [] };
    const arrySchema = {
      arry: { type: ['string'], empty: false }
    };
    let arryEmpty = isSchemaValid(arrySchema)(arry).valid;
    assert.deepEqual(arryEmpty, false,
      'String type should not be empty. Returns { valid: false }.');


    const validation = [
      function (data: any): any {
        // data first charater must be caitalised
        if (data.charAt(0) !== data.charAt(0).toUpperCase()) {
          return { error: 'Author name must start with a capital letter' };
        }
        return data;
      }
    ];

    const fullNameSchema = {
      firstName: 'string',
      lastName: 'string'
    };

    const nestedSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      fullName : [fullNameSchema],
      comments : { type: [nestedSchema], empty: false }
    };

    const nestedData = {
      fullName: [
        { firstName: 'otis', lastName: 'virginie' }
      ],
      comments: [
      ]
    };

    const collection = isSchemaValid(schema)(nestedData).valid;
    assert.deepEqual(collection, false,
      'Nested object type passes schema validation. Returns { valid: true }');

    assert.end();
  });
});
