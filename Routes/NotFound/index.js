import { get } from 'microrouter'

import Handler from './Handler'


export default get('/*', Handler)
