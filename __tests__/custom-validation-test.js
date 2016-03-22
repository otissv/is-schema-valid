'use strict';
import test from 'tape';
import isSchema from '../lib';
import { validators } from '../lib';


// Flow types
type OBJECT = { [key: string]: any };


test('Built-in validators : isSchema(schema)([]) -> VALID.', (nested: OBJECT) => {
  nested.test('length validators: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      validators.length(10)
    ];

    const schema = {
      ten   : { type: 'string', validation }
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


  nested.test('maxLength validators: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      validators.maxLength(10)
    ];

    const schema = {
      ten   : { type: 'string', validation }
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


  nested.test('minLength validators: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      validators.minLength(8)
    ];

    const schema = {
      ten   : { type: 'string', validation }
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


  nested.test('min validators: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      validators.min(8)
    ];

    const schema = {
      number: { type: 'number', validation }
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


  nested.test('man validators: [{}, {}].forEach(isSchema(schema)([], [validators])) -> VALID.', (assert: OBJECT) => {
    const validation = [
      validators.max(8)
    ];

    const schema = {
      number: { type: 'number', validation }
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
});
