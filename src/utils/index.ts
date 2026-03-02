import axios from 'axios'; // 发送请求获取数据

import sourceMap from 'source-map-js'; // 解析sourcemap 文件
const getSourceMapRange = async (url: string) => {
	const res = await axios.get(url);
	return res;
};

const findCodeBySourceMap = async (stackGrame) => {
	// 获取 map 文件
	// url + '存放map文件的服务地址'
	const sourceData = await getSourceMapRange(stackGrame.fileName + '.map');
	const fileContent = sourceData.data;
	// 解析 sourceMap 文件
	const comsumer = await new sourceMap.SourceMapConsumer(fileContent);
	// 通过报错的位置获取源代码的位置
	const originalPosition = comsumer.originalPositionFor({
		line: stackGrame.lineNumber,
		column: stackGrame.columnNumber
	});
	const code = comsumer.sourceContentFor(originalPosition.source);
	console.log(code, '-还原之后的代码-');
};

export { findCodeBySourceMap };
