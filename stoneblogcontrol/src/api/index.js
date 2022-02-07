const apiDictionary = [
  { VUE_APP_BASE_API: ["/getUserInfo", "/userlogin"] },
  { VUE_APP_SERVES_API: ["/getDocumentList"] },
];
const servesMap = new Map();
for (let item of apiDictionary) {
  Object.keys(item);
  servesMap.set(Object.keys(item)[0], item[Object.keys(item)[0]]);
}

export function getBaseUrl(val) {
  for (let [key, value] of servesMap.entries()) {
    if (value.includes(val)) {
      return key;
    }
  }
  return "VUE_APP_BASE_API";
}
