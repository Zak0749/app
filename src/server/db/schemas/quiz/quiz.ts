import questionSchema from './question';

const quizSchema = {
  bsonType: 'object',
  required: ['_id', 'title', 'emoji', 'description', 'date', 'featured', 'categoryId', 'questions', 'userId'],
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
    featured: {
      bsonType: 'bool',
      description: 'must be a boolian and is required',
    },
    categoryId: {
      bsonType: 'objectId',
      description: 'must be a objectId and is required and links to the categorys table',
    },
    plays: {
      bsonType: 'int',
      description: 'must be a int and not required',
    },
    questions: {
      bsonType: 'array',
      minItems: 0,
      uniqueItems: false,
      items: questionSchema,
    },

    userId: {
      bsonType: 'objectId',
      description: 'must be a objectId and is required and links to the users table',
    },
  },
};

const fullQuizSchema = {
  validator: {
    $jsonSchema: quizSchema,
  },
};

export default fullQuizSchema;
export { quizSchema };
