const answerSchema = {
  bsonType: 'object',
  required: ['body', 'correct'],
  additionalProperties: false,
  properties: {
    body: {
      bsonType: 'string',
      description: 'must be a string and is required',
      maxLength: 64,
    },
    correct: {
      bsonType: 'bool',
      description: 'must be a boolian and is required',
    },
  },
};

export default answerSchema;
