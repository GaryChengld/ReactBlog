const HtmlLineBreaks = (text) => {
  if (typeof text === 'string') {
    return text.replace(/\n/g, '<br/>');
  }
  return text;
};

module.exports = { HtmlLineBreaks };
