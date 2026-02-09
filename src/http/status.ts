export const getMessageInfo = (code: string | number): string => {
  // eslint-disable-next-line no-useless-assignment
  let msg = "";
  switch (code) {
    case 400:
      msg = "请求错误(400)";
      break;
    case 403:
      msg = "请求错误(403)";
      break;
    case 401:
      msg = "请求错误(401)";
      break;
    case 404:
      msg = "请求错误(404)";
      break;
    case 500:
      msg = "请求错误(500)";
      break;
    case 503:
      msg = "请求错误(503)";
      break;
    default:
      msg = "未知错误";
  }
  return msg;
};
