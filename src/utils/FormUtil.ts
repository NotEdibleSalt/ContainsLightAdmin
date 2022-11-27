export const submit = (formRef: any, fun: any, data: any): Promise<any> => {
  return formRef
    .validate()
    .then(() => {
      return fun(data);
    })
    .catch((err: any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const childSubmit = (
  formRef: any,
  fun: any,
  id: string,
  data: any
): Promise<any> => {
  return formRef
    .validate()
    .then(() => {
      return fun(id, data);
    })
    .catch((err: any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const putSubmit = (
  formRef: any,
  fun: any,
  id: string,
  data: any
): Promise<any> => {
  return formRef
    .validate()
    .then(() => {
      return fun(id, data);
    })
    .catch((err: any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const putChildSubmit = (
  formRef: any,
  fun: any,
  id: string,
  childId: string,
  data: any
): Promise<any> => {
  return formRef
    .validate()
    .then(() => {
      return fun(id, childId, data);
    })
    .catch((err: any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};
