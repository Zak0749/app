import answerSchema from './answer';

const questionSchema = {
  bsonType: 'object',
  required: ['body', 'answers'],
  additionalProperties: false,
  properties: {
    body: {
      bsonType: 'string',
      description: 'must be a string and is required',
      maxLength: 256,
    },
    answers: {
      bsonType: 'array',
      minItems: 2,
      uniqueItems: false,
      items: answerSchema,
    },
  },
};

export default questionSchema;
