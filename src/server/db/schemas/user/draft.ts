import questionSchema from '../quiz/question';

const draftSchema = {
  bsonType: 'object',
  required: ['_id', 'title', 'emoji', 'description', 'date', 'categoryId', 'questions'],
  additionalProperties: false,
  properties: {
    _id: {
      bsonType: 'objectId',
    },
    title: {
      bsonType: 'string',
      description: 'must be a string and is required',
      maxLength: 32,
    },
    emoji: {
      bsonType: 'string',
      description: 'must be a string and is required',
      maxLength: 1,
    },
    description: {
      bsonType: 'string',
      description: 'must be a string and is required',
      maxLength: 512,
    },
    date: {
      bsonType: 'date',
      description: 'must be a date and is required',
    },
    categoryId: {
      bsonType: 'objectId',
      description: 'must be a objectId and is required and links to the categorys table',
    },
    questions: {
      bsonType: 'array',
      minItems: 0,
      uniqueItems: false,
      items: questionSchema,
    },
  },
};

export default draftSchema;
