// only works for single string argument (or no args) -- lightweight and fast
export default fn => {
  const memos = {};
  return arg => {
    const key = arg || '';
    return memos[key] || (memos[key] = fn(arg));
  };
};
