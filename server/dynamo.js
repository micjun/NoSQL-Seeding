const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "notes-api";

const getQuestion = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  const questions = await dynamoClient.scan(params).promise();
  return questions
}

const addOrUpdateQuestion = async (question) => {
  const params = {
    TableName: TABLE_NAME,
    Item: question
  }
  await dynamoClient.put(params).promise();
}

const getQuestionById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }
  return await dynamoClient.get(params).promise();
}

const deleteQuestion = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }
  await dynamoClient.delete(params).promise();
}

module.exports = {
  dynamoClient,
  getQuestion,
  addOrUpdateQuestion,
  getQuestionById,
  deleteQuestion
}