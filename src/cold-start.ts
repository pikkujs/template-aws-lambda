import { AWSSecrets } from '@pikku/aws-services'
import {
  Config,
  SingletonServices,
} from '.././types/application-types.d.js'
import {
  createConfig,
  createSingletonServices,
} from './services.js'

let config: Config
let singletonServices: SingletonServices

export const coldStart = async () => {
  if (!config) {
    config = await createConfig()
  }
  if (!singletonServices) {
    singletonServices = await createSingletonServices(config, {
      // @ts-ignore: TODO AWS Region required for this to work..
      secrets: new AWSSecrets(config),
    })
  }
  return singletonServices
}
