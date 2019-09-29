import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatProperties = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (format, ast) => formatProperties[format](ast);
