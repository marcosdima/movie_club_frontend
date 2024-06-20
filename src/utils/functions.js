const removeByIds = (arrayOfElements, arrayOdIds) => arrayOfElements.filter(({ id }) => !arrayOdIds.includes(id));

const findBy = (arr, field, value) => arr.find((element) => element[field] === value);

export {removeByIds, findBy};