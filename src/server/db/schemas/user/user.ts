import draftSchema from './draft';
import historySchema from './history';
import savedSchema from './saved';

const userSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'password', 'emoji', 'date'],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: 'objectId',
        },
        username: {
          bsonType: 'string',
          description: 'must be a string and is required',
          maxLength: 32,
        },
        email: {
          bsonType: 'string',
          description: 'must be a string and is required',
          maxLength: 320,
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        emoji: {
          bsonType: 'string',
          description: 'must be a string and is required',
          maxLength: 1,
        },
        date: {
          bsonType: 'date',
          description: 'must be a date and is required',
        },

        history: {
          bsonType: 'array',
          minItems: 0,
          uniqueItems: false,
          items: historySchema,
        },

        saved: {
          bsonType: 'array',
          minItems: 0,
          uniqueItems: false,
          items: savedSchema,
        },

        drafts: {
          bsonType: 'array',
          minItems: 0,
          uniqueItems: false,
          items: draftSchema,
        },
      },
    },
  },
};

export default userSchema;
