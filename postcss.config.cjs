const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')
const postcssCustomMedia = require('postcss-custom-media')
const postcssImport = require('postcss-import')

const config = {
	plugins: [
		autoprefixer(),
		postcssImport(),
		postcssJitProps(OpenProps),
		postcssCustomMedia({
			importFrom: './src/styles/props.media.css'
		}),
		postcssNested
	]
}

module.exports = config
