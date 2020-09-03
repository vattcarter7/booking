exports.convertJavascriptToPosgresTimestamp = (javascriptDateNow) => {
  return javascriptDateNow / 1000;
};
