export default function queryString(query) {
  let parameters = {};
  const removedQuestionMark = query.split('?')[1];
  const removedAmpersandArray = removedQuestionMark.split('&');

  removedAmpersandArray.map(item => {
    const removedEqualSignArray = item.split('=');
    parameters[removedEqualSignArray[0]] = removedEqualSignArray[1];
  });

  return parameters;
}
