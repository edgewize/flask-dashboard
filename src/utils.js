export const buildApiUrl = (url) => {
  let api_target =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "";
  return api_target + url;
};

export function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}


export function hexToRgbA(hex, alpha){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length === 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', '+ alpha + ')';
  }
  throw new Error('Bad Hex');
}