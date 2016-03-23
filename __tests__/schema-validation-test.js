'use strict';
import test from 'tape';
import isSchema from '../lib';


// Flow types
type OBJECT = { [key: string]: any };


test('Schema Validation : isSchema(schema)([]) -> VALID.', (nested: OBJECT) => {

  nested.test('Object validation : isSchema({}, schema) -> VALID.', (assert: OBJECT) => {
    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      title  : { type: 'string', required: true },
      author : 'string',
      summary: 'string',
      tags   : ['string'],
      comments: [commentSchema],
      views: 'number'
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
      views: 15000
    };

    const collection = isSchema(schema)(data);
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

    const missingRequireField = isSchema(schema)(dataMissingRequiredField).valid;
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

    const invalidKey = isSchema(schema)(dataWithExtraField).valid;
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

    const invalidType = isSchema(schema)(dataWithINcorrectType).valid;
    const expectInvalidType = false;
    assert.deepEqual(invalidType, expectInvalidType,
      'Object does not pass value if type is not the same as schema key/value. Returns { valid: false }.');

    assert.end();
  });


  nested.test('Collection validation: [{}, {}].forEach(isSchema(schema)([])) -> VALID.', (assert: OBJECT) => {
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

    const collection = data.map((element: OBJECT) => isSchema(schema)(element)).every((o: OBJECT): bool => o.valid === true);
    const expectCollection = true;
    assert.deepEqual(collection, expectCollection,
      'Collection passed schema validation. Returns { valid: true }.');

    assert.end();
  });


  nested.test('validation length: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', length: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchema(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is the equal to length validator. Returns { valid: true }.');


    const invalidData = {
      ten: '123456789'
    };

    const invalidlength = isSchema(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length is not equal to length validator. Returns { valid: false }.');

    assert.end();
  });


  nested.test('validation maxLength: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', maxLength: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchema(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is does not exceed maximum length. Returns { valid: true }.');


    const invalidData = {
      ten: '012345678910'
    };

    const invalidlength = isSchema(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length cannot exceeds maximum length. Returns { valid: false }.');

    assert.end();
  });


  nested.test('validation minLength: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      ten   : { type: 'string', minLength: 10 }
    };


    const validData = {
      ten: '0123456789'
    };

    const validlength = isSchema(schema)(validData).valid;
    const expectedValidLength = true;
    assert.deepEqual(validlength, expectedValidLength,
      'String length is higher minimum length. Returns { valid: true }.');


    const invalidData = {
      ten: '012345'
    };

    const invalidlength = isSchema(schema)(invalidData).valid;
    const expectedInValidLength = false;
    assert.deepEqual(invalidlength, expectedInValidLength,
      'String length cannot be lower minimum length. Returns { valid: false }.');

    assert.end();
  });


  nested.test('validation min: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      number: { type: 'number', min: 10 }
    };


    const validData = {
      number: 20
    };

    const validMin = isSchema(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Number is higher minimum number. Returns { valid: true }.');


    const invalidData = {
      ten: 5
    };

    const invalidMin = isSchema(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Number cannot be lower minimum number. Returns { valid: false }.');

    assert.end();
  });


  nested.test('validation max: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      number: { type: 'number', max: 10 }
    };


    const validData = {
      number: 6
    };

    const validMin = isSchema(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Number is lower maximum number. Returns { valid: true }.');


    const invalidData = {
      ten: 100
    };

    const invalidMin = isSchema(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Number cannot be higher maximum number. Returns { valid: false }.');

    assert.end();
  });

  nested.test('match validator: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const schema = {
      str: { type: 'string', match: /[A-E]/gi }
    };


    const validData = {
      str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    };

    const validMin = isSchema(schema)(validData).valid;
    const expectedValidMin = true;
    assert.deepEqual(validMin, expectedValidMin,
      'Matxhex regex. Returns { valid: true }.');


    const invalidData = {
      str: 'HIJKLMNOPQRSTUVWXYZhijklmnopqrstuvwxyz'
    };

    const invalidMin = isSchema(schema)(invalidData).valid;
    const expectedInValidMin = false;
    assert.deepEqual(invalidMin, expectedInValidMin,
      'Does not match regex. Returns { valid: false }.');

    assert.end();
  });


  nested.test('Custom Validation: [{}, {}].forEach(isSchema(schema)([], [validation])) -> VALID.', (assert: OBJECT) => {
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

    const validArticle = isSchema(schema)(supermanData).valid;
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

    const invalidArticle = isSchema(schema)(batmanData).valid;
    const expectedInvalidArticle = false;
    assert.deepEqual(expectedInvalidArticle, invalidArticle,
      'Custom validation falis as expected. Returns { valid: false }.');

    assert.end();
  });
});
