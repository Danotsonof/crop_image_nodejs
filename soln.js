const fs = require('fs')
const sharp = require('sharp')
const path = require('path')
const importFrom = path.join(__dirname, 'files');

const dir = './export';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const exportTo = path.join(__dirname, 'export');

const files = fs.readdirSync(importFrom)

for (let index = 0; index < files.length; index++) {
	const sourceFile = path.join(importFrom, files[index])
	let outputFilename = parseInt(files[index].slice(0, -4))
	let outputImage = path.join(exportTo, `page_${outputFilename * 2}.jpg`)
	let outputImage2 = path.join(exportTo, `page_${(outputFilename * 2) + 1}.jpg`)
	// width: (Number) width of cropped image
	const width = 956
	// height: (Number) height of cropped image
	const height = 607
	// left: (Number) Off-set from left on source image
	const left = 0
	// top: (Number) Off-set from top on source image
	sharp(sourceFile)
	.extract({width: width, height: height, left: left, top: 0})
	.rotate(-90)
	.toFile(outputImage)
	.then( _ => {
		sharp(sourceFile)
		.extract({width: width, height: height, left: left, top: 607})
		.rotate(-90)
		.toFile(outputImage2)
		.then(_ => {
			if(index === files.length - 1)
				console.log('Done.')
		})
	})
	.catch(function(err) {
		console.log(err)
	})
}