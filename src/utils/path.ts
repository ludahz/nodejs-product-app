import * as path from 'path'

// Use require.main?.filename to get the filename of the main module.
const mainDir: string = path.dirname(require.main?.filename || '')

export default mainDir
