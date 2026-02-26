import * as Joi from 'joi'

export interface EnvVars {
  PORT: number
  NODE_ENV: string
  EXTERNAL_SERVICE_API_URL: string
  AWS_REGION: string
  SQS_QUEUE_URL: string
  AWS_ACCESS_KEY_ID?: string
  AWS_SECRET_ACCESS_KEY?: string
}

export enum Environment {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const EnvConfigJoiSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.required().valid(Environment.DEVELOPMENT, Environment.STAGING, Environment.PRODUCTION, Environment.TEST),
  EXTERNAL_SERVICE_API_URL: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  SQS_QUEUE_URL: Joi.string().uri().required(),
  AWS_ACCESS_KEY_ID: Joi.string().optional(),
  AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
})
