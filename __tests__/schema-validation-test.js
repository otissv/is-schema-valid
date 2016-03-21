'use strict';
import test from 'tape';
import isSchema from '../lib';


// Flow types
type OBJECT = { [key: string]: any };
type SCHEMA = { [key: string]: any };


test('Schema Validation : isSchema(data, schema) -> SCHEMA | Error.', (nested: OBJECT) => {

  nested.test('Object validation : isSchema({}, schema) -> SCHEMA | Error.', (assert: OBJECT) => {
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

    const collection = isSchema(schema)(data);
    const expectCollection = true;
    assert.deepEqual(collection, expectCollection,
      'Object passes schema validation. Returns true if passed else false if failed');


    const dataMissingRequiredField = {
      author: 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags: ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views: 15000
    };

    const testThrow3 = (): SCHEMA | string => {
      try {
        return isSchema(schema)(dataMissingRequiredField);
      } catch (err) {
        return err.toString();
      }
    };

    const missingRequireField = testThrow3();
    const expectMissingRequireField = 'Error: Schema Required Field Error: Required field title is missing.';
    assert.deepEqual(missingRequireField, expectMissingRequireField,
      'Object does not pass if require field is missing not in schema. Throws Error.');


    const dataWithExtraField = {
      title: 'A journey from krypton',
      author: 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags: ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views: 15000,
      rating: 5
    };

    const testThrow1 = (): SCHEMA | string => {
      try {
        return isSchema(schema)(dataWithExtraField);
      } catch (err) {
        return err.toString();
      }
    };

    const invalidKey = testThrow1();
    const expectInvalidKey = 'Error: Schema Key Error: A key is not a valid schema key.';
    assert.deepEqual(invalidKey, expectInvalidKey,
      'Object did not pass keys invalid keys');


    const dataWithINcorrectType = {
      title: 'A journey from krypton',
      author: 'Superman',
      summary: 'The story of how superman traveled to earth.',
      tags: ['superhero', 'DC comics', 'Metropolis'],
      comments: [
        {comment: 'firstComment', commenter: 'someone'},
        {comment: 'anotherComment', commenter: 'someoneElse'}
      ],
      views: '15000'
    };

    const testThrow2 = (): SCHEMA | string => {
      try {
        return isSchema(schema)(dataWithINcorrectType);
      } catch (err) {
        return err.toString();
      }
    };

    const invalidType = testThrow2();
    const expectInvalidType = 'Error: Schema Value Error: views value is not number type.';
    assert.deepEqual(invalidType, expectInvalidType,
      'Object does not pass value if type is not the same as schema key/value. Throws Error.');

    assert.end();
  });


  nested.test('Collection validation: [{}, {}].forEach(isSchema([], schema)) -> SCHEMA | Error.', (assert: OBJECT) => {
    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      title: 'string',
      author: 'string',
      summary: 'string',
      tags: ['string'],
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

    const collection = data.map((element: OBJECT) => isSchema(schema)(element));
    const expectCollection = [ true, true ];
    assert.deepEqual(collection, expectCollection,
      'Collection passed schema validation. Returns array');

    assert.end();
  });
});
