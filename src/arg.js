function getArg(argKey) {
  const param = process.argv.find((item) => item.startsWith(argKey));

  if (!param)
    throw Error(`Please set the ${argKey} param: ${argKey}=your-param`);

  const paramValue = param.substring(argKey.length + 1);

  if (!paramValue) throw Error(`Invalid ${argKey} value: ` + paramValue);

  return paramValue;
}

module.exports = getArg;
