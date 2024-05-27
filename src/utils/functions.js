const removeByIds = (arrayOfElements, arrayOdIds) => arrayOfElements.filter(({ id }) => !arrayOdIds.includes(id));

export {removeByIds};