'use strict';
import test from 'tape';
import schemaValidation from '../lib';


// Flow types
type OBJECT = { [key: string]: any };
type SCHEMA = { [key: string]: any };


test('Schema Validation : schemaValidation(data, schema) -> SCHEMA | Error', (nested: OBJECT) => {
  // nested.test('Schema Validation : schemaValidation(data, schema) -> SCHEMA | Error', (assert: OBJECT) => {
  //   const schema = {
  //     name    : { type: 'string', required: true },
  //     quantity: { type: 'number', required: true },
  //     country : 'string'
  //   };
  //
  //   const data = [
  //     { name: 'apples', quantity: 2, country: 'england' },
  //     { name: 'bananas', quantity: 5, country: 'jamaica' },
  //     { name: 'cherries', quantity: 1, country: 'spain' }
  //   ];
  //
  //   const collection = schemaValidation(data, schema);
  //   const expectCollection = true;
  //   assert.deepEqual(collection, expectCollection,
  //     'Collection passed schema validation. Returns true if passed else false if failed');
  //
  //
  //   const dataWithExtraField = [
  //     { name: 'apples', quantity: 2 },
  //     { name: 'bananas', quantity: 5, country: 'jamaica', taste: 'yuk' }
  //   ];
  //
  //   const testThrow1 = (): SCHEMA | string => {
  //     try {
  //       return schemaValidation(dataWithExtraField, schema);
  //     } catch (err) {
  //       return err.toString();
  //     }
  //   };
  //
  //   const invalidKey = testThrow1();
  //   const expectInvalidKey = 'Error: Invalid Schema Error: taste key is not a schema key.';
  //   assert.deepEqual(invalidKey, expectInvalidKey,
  //     'Collection did not pass keys not in schema');
  //
  //
  //   const dataWithINcorrectType = [
  //     { name: 'apples', quantity: '2' },
  //     { name: 'bananas', quantity: 5, country: 'jamaica' }
  //   ];
  //
  //   const testThrow2 = (): SCHEMA | string => {
  //     try {
  //       return schemaValidation(dataWithINcorrectType, schema);
  //     } catch (err) {
  //       return err.toString();
  //     }
  //   };
  //
  //   const invalidType = testThrow2();
  //   const expectInvalidType = 'Error: Invalid Schema Error: quantity value is not number type.';
  //   assert.deepEqual(invalidType, expectInvalidType,
  //     'Collection does not pass value if type is not the same as schema key/value');
  //
  //
  //   const dataMissingRequiredField = [
  //     { quantity: 3 },
  //     { name: 'bananas', quantity: 3, country: 'jamaica' }
  //   ];
  //
  //   const testThrow3 = (): SCHEMA | string => {
  //     try {
  //       return schemaValidation(dataMissingRequiredField, schema);
  //     } catch (err) {
  //       return err.toString();
  //     }
  //   };
  //
  //   const missingRequireField = testThrow3();
  //   const expectMissingRequireField = 'Error: Schema Required Field Error: Required field name is missing.';
  //   assert.deepEqual(missingRequireField, expectMissingRequireField,
  //     'Collection does not pass if require field is missing not in schema');
  //
  //
  //   assert.end();
  // });


  nested.test('Nested Schema Validation : schemaValidation(data, schema) -> SCHEMA | Error', (assert: OBJECT) => {
    const commentSchema = {
      comment: 'string',
      commenter: 'string'
    };

    const schema = {
      // title: 'string',
      // author: 'string',
      // summary: 'string',
      tags: ['string'],
      // comments: [commentSchema]
    };

    const data = [
      {
        // title: 'A journey from krypton',
        // author: 'Superman',
        // summary: 'The story of how superman traveled to earth.',
        tags: ['superhero', 'DC comics', 'Metropolis'],
        // comments: [{comment: 'comment1', commenter: 'someone'}]
      },
      {
        // title: 'Gothem night',
        // author: 'Batman',
        // summary: 'Expling the night life in Gothem city.',
        // tags: ['superhero', 'DC comics', 'Gothem'],
        // comments: [{comment: 'comment1', commenter: 'someone'}]
      }
    ];

    const collection = schemaValidation(data, schema);
    const expectCollection = true;
    assert.deepEqual(collection, expectCollection,
      'Collection passed schema validation. Returns true if passed else false if failed');


    // const dataWithExtraField = [
    //   { name: 'apples', quantity: 2 },
    //   { name: 'bananas', quantity: 5, country: 'jamaica', taste: 'yuk' }
    // ];
    //
    // const testThrow1 = (): SCHEMA | string => {
    //   try {
    //     return schemaValidation(dataWithExtraField, schema);
    //   } catch (err) {
    //     return err.toString();
    //   }
    // };
    //
    // const invalidKey = testThrow1();
    // const expectInvalidKey = 'Error: Invalid Schema Error: taste key is not a schema key.';
    // assert.deepEqual(invalidKey, expectInvalidKey,
    //   'Collection did not pass keys not in schema');
    //
    //
    // const dataWithINcorrectType = [
    //   { name: 'apples', quantity: '2' },
    //   { name: 'bananas', quantity: 5, country: 'jamaica' }
    // ];
    //
    // const testThrow2 = (): SCHEMA | string => {
    //   try {
    //     return schemaValidation(dataWithINcorrectType, schema);
    //   } catch (err) {
    //     return err.toString();
    //   }
    // };
    //
    // const invalidType = testThrow2();
    // const expectInvalidType = 'Error: Invalid Schema Error: quantity value is not number type.';
    // assert.deepEqual(invalidType, expectInvalidType,
    //   'Collection does not pass value if type is not the same as schema key/value');
    //
    //
    // const dataMissingRequiredField = [
    //   { quantity: 3 },
    //   { name: 'bananas', quantity: 3, country: 'jamaica' }
    // ];
    //
    // const testThrow3 = (): SCHEMA | string => {
    //   try {
    //     return schemaValidation(dataMissingRequiredField, schema);
    //   } catch (err) {
    //     return err.toString();
    //   }
    // };
    //
    // const missingRequireField = testThrow3();
    // const expectMissingRequireField = 'Error: Schema Required Field Error: Required field name is missing.';
    // assert.deepEqual(missingRequireField, expectMissingRequireField,
    //   'Collection does not pass if require field is missing not in schema');
    //

    assert.end();
  });
});
