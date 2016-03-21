'use strict';
import test from 'tape';
import isSchema from '../lib';


// Flow types
type OBJECT = { [key: string]: any };


test('Schema Validation : isSchema(data, schema) -> VALID.', (nested: OBJECT) => {

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


  nested.test('Collection validation: [{}, {}].forEach(isSchema([], schema)) -> VALID.', (assert: OBJECT) => {
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
});
